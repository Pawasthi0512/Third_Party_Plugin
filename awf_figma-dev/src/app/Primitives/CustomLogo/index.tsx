import { Box, ImageList, ImageListItem, styled } from "@mui/material";
import React from "react";
import { helpers, useAuth } from "../../Utiles/hooks";
import { downloadLogo } from "../../Utiles/controllers/guidelines";

const BoxContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
  ".MuiImageListItem-root": {
    maxWidth: "130px",
    margin: "0px",
  },
  ".image-container": {
    width: "124px",
    height: "124px",
    border: "1px solid #DFDFDF",
    borderRadius: "4px",
    padding: "3px",
    display: "flex",
    alignItems: "center",
    justifycontent: "center",
  },
  ".logoContainer": {
    cursor: "pointer",
    height: "124px",
    width: "120px",
  },
}));
const CustomLogo = ({ itemData }) => {
  const { token, idToken, user } = useAuth();
  const [openFileDrawer, setOpenFileDrawer] = React.useState(false);
  const [convertedBase64, setConvertedBase64] = React.useState<any>();
  const [isImageDragged, setIsImageDragged] = React.useState(false);

  const handleOpenFile = () => {
    setOpenFileDrawer(!openFileDrawer);
  };

  /**
   * To list the all the logos
   */
  const listCreateArray = itemData.map((_updatedSection) => {
    return _updatedSection.updatedSectionID;
  });

  /**
   * Fires when a image is dragged to figma or double clicked on image, the image will downloaded and conveted into Uint8Array
   */
  const handleDragEnd = async ({ sectionEntityId, logoId }) => {
    /**
     * Fires when image is dragged and image will downloaded and proceded to conversion
     */
    setIsImageDragged(true);
    const response = await downloadLogo({
      sectionEntityId: sectionEntityId,
      logoId: logoId,
      sectionType: "LOGO",
      idToken,
      token,
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
    setIsImageDragged(false);
  };

  /**
   * To send message to figma along with conveted to Uint8array type
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
    <BoxContainer sx={{opacity: isImageDragged ? 0.5 : 'initial' }}>
        <ImageList
          sx={{ width: 420, padding: "5px", margin: "0px" }}
          cols={3}
          rowHeight={135}
        >
          {listCreateArray.flat().map((item) => {
            const selectedLogo =
              helpers.showDefaultImage(item.title) ||
              helpers.handlePreviewLogo({
                sectionId: item.sectionId,
                logoId: item.logoId,
                token,
                idToken,
                tenantId: user.tenant_id,
              });
            return (
              <ImageListItem key={item.id}>
                <Box className="image-container">
                  <img
                    className="logoContainer"
                    src={selectedLogo}
                    onDragEnd={() => {
                      if (selectedLogo) {
                        handleDragEnd({
                          sectionEntityId: item.sectionId,
                          logoId: item.logoId,
                        });
                      }
                    }}
                    alt={item.title}
                    loading="lazy"
                    onDoubleClick={() =>
                      handleDragEnd({
                        sectionEntityId: item.sectionId,
                        logoId: item.logoId,
                      })
                    }
                    onClick={handleOpenFile}
                  />
                </Box>
              </ImageListItem>
            );
          })}
        </ImageList>
    </BoxContainer>
  );
};
export default CustomLogo;
