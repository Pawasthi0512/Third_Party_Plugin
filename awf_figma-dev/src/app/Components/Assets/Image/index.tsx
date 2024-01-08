import { Box, ImageList, ImageListItem, styled } from "@mui/material";
import React from "react";
import FileDetailsDrawer from "../../../Primitives/FileDetailsDrawer";
import { helpers, useAssets, useAuth } from "../../../Utiles/hooks";
import Loader from "../../../Primitives/Loader";
import { downloadAssetImage } from "../../../Utiles/controllers/assets";

const BoxContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
  height: theme.spacing(250),
  overflowY: "scroll",
  overflowX: "hidden",
  ".MuiImageListItem-root": {
    maxWidth: "130px",
    margin: "0px",
  },
  ".image-container": {
    width: "124px",
    height: "124px",
    border: "1px solid #DFDFDF",
    borderRadius: "4px",
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifycontent: "center",
    "&:focus": {
      border: "2px solid red",
      background: "red",
    },
  },
  ".imageContainer": {
    cursor: "pointer",
    width: "124px",
    height: "120px",
  },
}));

const AssetsImage = ({ assetsList }) => {
  const { token, idToken, user } = useAuth();
  const assetImageRef = React.useRef(null);

  const {
    sizeOfList,
    setSizeOfList,
    totalResult,
    isUploadLoading,
    isAssetsLoading,
    setSelectedAssetID,
  } = useAssets();
  const [openFileDrawer, setOpenFileDrawer] = React.useState(false);
  const [convertedBase64, setConvertedBase64] = React.useState<any>();
  const [borderColor, setBorderColor] = React.useState({
    id: "",
    color: "transparent",
  });
   const [isImageDragEnded, setIsImageDragEnded] = React.useState(false)

  /**
   * Function to open file drawer
   * @param item file details
   */
  function handleOpenFile(item, Itmid) {
    setOpenFileDrawer(!openFileDrawer);
    setSelectedAssetID(item.id);
    setBorderColor({ id: Itmid, color: "#333333" });
  }

  /**
   * Function to close file drawer
   */
  function handleCloseFile() {
    setOpenFileDrawer(false);
    setBorderColor({ id: "", color: "#DFDFDF" });
  }

  /**
   * Handle infinity scroll
   * @param e event
   */
  const handleInfinityScroll = (e: any) => {
    const btm =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 50;
    if (btm && sizeOfList && sizeOfList < totalResult) {
      setSizeOfList(sizeOfList + 24);
    }
  };
  /**
   *
   * @param selectedImage converted into Uint8Array and send to figma as the figma only accepts binanry files
   */
  const handleDragEnd = async ({ id, versionId }) => {
    /**
     * The below fires  download api and the redirect response url will be set to convert bas364
     */
    setIsImageDragEnded(true)
    const response = await downloadAssetImage({
      fileId: id,
      fileVersionId: versionId,
      idToken: idToken,
      token: token,
      tenantId: user.tenant_id,
    });
    helpers.getBase64Image(response.url).then(
      function (base64image) {
        const conteted8Array = helpers._base64ToUint8Array(base64image);
        setConvertedBase64(conteted8Array);
      },
      function (reason) {
        console.log(reason);
      }
    );
    setIsImageDragEnded(false)
  };

  /**
   * Fires whenver new converted file is created and send message to figma  with the converted Uint8Array code
   */
  React.useEffect(() => {
    if (convertedBase64) {
      parent.postMessage(
        {
          pluginMessage: { type: "onDragAssets", convertedBase64 },
        },
        "*"
      );
    }
    setConvertedBase64(null);
  }, [convertedBase64]);

  return (
    <>
      <BoxContainer onScroll={handleInfinityScroll} sx={(()=>({
        opacity: !!(isImageDragEnded && !openFileDrawer ) ? 0.5 : 'initial' 
      }))}>
        {(isUploadLoading || isAssetsLoading) && sizeOfList <= 24 ? (
          <Loader />
        ) : (
          <ImageList
            sx={{ width: 420, padding: "5px", margin: "0px" }}
            cols={3}
            rowHeight={135}
          >
            {assetsList.map((item) => {
              const selectedImage =
                helpers.showDefaultImage(item.name) ||
                helpers.handlePreviewAssetsImage({
                  fileId: item.id,
                  token,
                  idToken,
                  tenantId: user.tenant_id,
                });
              return (
                <ImageListItem key={item.id}>
                  <Box
                    className="image-container"
                    key={item.id}
                    onClick={() => handleOpenFile(item, item.id)}
                    style={
                      borderColor.id === item.id
                        ? { border: `1px solid ${borderColor.color}` }
                        : { border: `1px solid #DFDFDF` }
                    }
                  >
                    <img
                      draggable="true"
                      onDragEnd={() => {
                        if (selectedImage) {
                          handleDragEnd({
                            id: item.id,
                            versionId: item.currentVersion,
                          });
                        }
                      }}
                      className="imageContainer"
                      ref={assetImageRef}
                      src={selectedImage}
                      alt={item.name}
                      loading="lazy"
                    />
                  </Box>
                </ImageListItem>
              );
            })}
          </ImageList>
        )}
      </BoxContainer>
      <FileDetailsDrawer
        isDrawerImageSelected={!!(isImageDragEnded && openFileDrawer)}
        openFileDrawer={openFileDrawer}
        handleCloseFile={handleCloseFile}
        handleDoubleClickOnImage={({ id, versionId }) =>
          handleDragEnd({ id: id, versionId: versionId })
        }
      />
    </>
  );
};
export default AssetsImage;
