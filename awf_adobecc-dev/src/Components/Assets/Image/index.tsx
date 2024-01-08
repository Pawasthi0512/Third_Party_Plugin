import { Box, ImageList, ImageListItem, styled } from "@mui/material";
import React from "react";
import FileDetailsDrawer from "../../../Primitives/FileDetailsDrawer";
import { helpers, useAssets } from "../../../Utiles/hooks";
import Loader from "../../../Primitives/Loader";

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
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    justifycontent: "center",
    "&:focus": {
      border: "2px solid red",
      background: "red",
    },
  },
}));

const Image = ({ assetsList }) => {
  const {
    isAssetsLoading,
    isUploadLoading,
    sizeOfList,
    setSizeOfList,
    totalResult,
    setSelectedAssetID,
  } = useAssets();
  const [openFileDrawer, setOpenFileDrawer] = React.useState(false);
  const [borderColor, setBorderColor] = React.useState({
    id: "",
    color: "transparent",
  });

  /**
   * Function to open file drawer
   * @param item file details
   */
  async function handleOpenFile(item , Itmid) {
    
   
    setSelectedAssetID(item.id);
    setBorderColor({id:Itmid , color:'#333333'})
    setOpenFileDrawer(!openFileDrawer);
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



  return (
    <BoxContainer onScroll={handleInfinityScroll}>
      {(isAssetsLoading || isUploadLoading) && sizeOfList <= 24 ? (
        <Loader />
      ) : (
        <ImageList
          sx={{ width: 420, padding: "4px", margin: "0px" }}
          cols={3}
          rowHeight={135}
        >
          {assetsList.map((item) => (
            <ImageListItem key={item.id}>
              <Box
                className="image-container"
                key={item.id}
                style={
                  borderColor.id === item.id
                    ? { border: `1px solid ${borderColor.color}` }
                    : { border: `1px solid #DFDFDF` }
                }
              >
                <img
                  width="124px"
                  height="120px"
                  src={
                    helpers.showDefaultImage(item.name) ||
                    helpers.handlePreviewAssetsImage({ fileId: item.id })
                  }
                  alt={item.name}
                  loading="lazy"
                  onClick={() => handleOpenFile(item, item.id)}
                />
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
      )}
      <FileDetailsDrawer
        openFileDrawer={openFileDrawer}
        handleCloseFile={handleCloseFile}
      />
    </BoxContainer>
  );
};
export default Image;
