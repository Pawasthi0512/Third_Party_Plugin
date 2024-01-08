import {
  Box,
  Button,
  Divider,
  Drawer,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import OpenNew from "../../Assets/Icons/OpenNew";
import Favorite from "../../Assets/Icons/Favorite";
import { helpers, useAssets, useAuth } from "../../Utiles/hooks";
import FavoriteFilled from "../../Assets/Icons/FavoriteFilled";
import Loader from "../../Primitives/Loader";

const DrawerContainer = styled(Drawer)(({ theme }) => ({
  padding: theme.spacing(0),
  ".file-drawer": {
    borderRadius: "6px",
  },
  ".MuiDrawer-root": {
    borderRadius: "40px",
  },
  ".topFilecontaier": {
    display: "flex",
    alignItems: "center",
    padding: "12px",
  },
  ".titleFile": {
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "16px",
    width: "396px",
    textAlignement: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.main,
  },
  ".closeFileIcon": {
    fontWeight: "400",
    fontSize: "16px",
    cursor: "pointer",
  },
  ".middleFilecontaier": {
    padding: "8px",
    display: "flex",
    alignItems: "center",
  },
  ".fileImage": {
    borderRadius: "4px",
    cursor: "pointer",
  },
  ".Conatiner": {
    padding: "8px",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "column",
    textAlign: "right",
  },
  ".fileWrapper1": {
    display: "flex",
    alignItems: "center",
  },
  ".vNa": {
    display: "flex",
    alignItems: "center",
  },
  ".fileWrapperTitle": {
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "16px",
    paddingRight: "16px",
    color: theme.palette.primary.main,
    width: "200px",
    textAlign: "left",
  },
  ".fileWrapperVersion": {
    background: theme.palette.info.main,
    border: "1px solid #A5A5A5",
    borderRadius: "4px",
    padding: "4px",
    fontWeight: "400",
    fontSize: "10px",
    lineHeight: "12px",
    color: theme.palette.primary.main,
  },
  ".fileWrappeApproved": {
    background: theme.palette.info.light,
    border: "1px solid #70C78E",
    borderRadius: "4px",
    padding: "4px",
    fontWeight: "400",
    fontSize: "10px",
    lineHeight: "12px",
    marginLeft: "4px",
    color: theme.palette.info.dark,
    textTransform: "capitalize",
  },
  ".fileWrapper2": {
    textAlign: "left",
  },
  ".fileWrapperBy": {
    fontWeight: "500",
    fontSize: "10px",
    lineHeight: "12px",
    color: theme.palette.primary.main,
    padding: "8px 0px",
    width: "300px",
    textAlign: "left",
  },
  ".fileWrapper3": {},
  ".fileWrapperModified": {
    fontWeight: "500",
    fontSize: "10px",
    lineHeight: "12px",
    color: theme.palette.primary.main,
    padding: "8px 0px",
    width: "300px",
    textAlign: "left",
  },
  ".bottomFilecontaier": {
    padding: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  ".openNew": {
    width: "12px",
    height: "12px",
    border: "1px solid #DFDFDF",
    padding: "5px",
    borderRadius: "8px",
    margin: "0px 4px",
    cursor: "pointer",
    color: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ".favorite": {
    width: "16px",
    height: "16px",
    border: "1px solid #DFDFDF",
    padding: "3px",
    borderRadius: "8px",
    margin: "0px 4px",
    cursor: "pointer",
    color: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ".file-upload": {
    border: "1px solid #DFDFDF",
    padding: "5px",
    borderRadius: "8px",
    margin: "0px 4px",
    cursor: "pointer",
    color: theme.palette.primary.main,
  },
  ".contained": {
    padding: "3px 0px",
    textTransform: "none",
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "18px",
    boxShadow: "none",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: theme.palette.primary.main,
    color: theme.palette.info.main,
    minWidth: "56px",
  },
}));

const FileDetailsDrawer = ({
  isDrawerImageSelected,
  openFileDrawer,
  handleCloseFile,
  handleDoubleClickOnImage,
}) => {
  const { setFavourite, isAssetByIdLoading, fileData, isFavourite } =
    useAssets();
  const { token, idToken, user } = useAuth();

  /**
   * Handles Favourite icon in file drawer
   * @param resId File id
   */
  const handleFavourite = (resId) => {
    setFavourite({
      resourceId: resId,
      type: "FILE",
    });
  };


  /**
   * To get selected image thumbnail and set to preview
   */
  const seletedAssetImage =
    helpers.showDefaultImage(fileData?.name) ||
    helpers.handlePreviewAssetsImage({
      fileId: fileData?.id,
      token,
      idToken,
      tenantId: user.tenant_id,
    });


  return (
    <DrawerContainer
      sx={{ borderRadius: "6px"}}
      anchor={"bottom"}
      open={openFileDrawer}
      onClose={handleCloseFile}
    >
      {isAssetByIdLoading || isFavourite ? (
        <Box display="flex" alignItems="center" height="192px">
          <Loader />
        </Box>
      ) : (
        <Box sx={{opacity: isDrawerImageSelected ? 0.5  : 'initial'}}>
          <Box className="topFilecontaier" >
            <Typography className="titleFile">File details</Typography>
            <Box onClick={handleCloseFile}>
              <CloseIcon className="closeFileIcon" />
            </Box>
          </Box>
          <Divider />
          <Box className="middleFilecontaier">
            <Box>
              <img
                onDoubleClick={() =>
                  handleDoubleClickOnImage({
                    id: fileData.id,
                    versionId: fileData.fileVersions.id,
                  })
                }
                className="fileImage"
                width={64}
                height={64}
                src={seletedAssetImage}
                alt=""
              />
            </Box>
            <Box className="Conatiner">
              <Box className="fileWrapper1">
                <Typography
                  style={{ wordWrap: "break-word" }}
                  className="fileWrapperTitle"
                >
                  {fileData?.name?.length > 30
                    ? fileData?.name.substr(fileData?.name?.length - 30)
                    : fileData?.name}
                </Typography>
                <Box className="vNa">
                  <Typography className="fileWrapperVersion">
                    V{fileData?.currentVersionNumber}
                  </Typography>
                  <Typography className="fileWrappeApproved">
                    {fileData?.status?.toLowerCase()}
                  </Typography>
                </Box>
              </Box>
              <Box className="fileWrapper2">
                <Typography className="fileWrapperBy">
                  Uploaded by:{" "}
                  {`${fileData?.uploadedBy?.first_name}  ${fileData?.uploadedBy?.last_name}`}
                </Typography>
              </Box>
              <Box className="fileWrapper3">
                <Typography className="fileWrapperModified">
                  {helpers.getDateAndMonthFormate(
                    fileData?.fileVersions?.updatedAt
                  )}
                </Typography>
              </Box>
              <Box className="fileWrapper3">
                <Typography className="fileWrapperModified">
                  Size : {helpers.convertSizeToFormat(fileData?.size)}
                </Typography>
              </Box>
            </Box>
          </Box>
          <Divider />
          <Box className="bottomFilecontaier">
            <Box
              className="openNew"
              onClick={() => helpers.redirectToApp(fileData.id)}
            >
              <OpenNew />
            </Box>
            <Box
              className="favorite"
              onClick={() => handleFavourite(fileData.id)}
            >
              {fileData.isUserFavourite ? <FavoriteFilled /> : <Favorite />}
            </Box>
            <Button
              className="contained"
              variant="contained"
              onClick={() =>
                // helpers.handleDownloadAssetFile({
                //   fileId: fileData.id,
                //   fileVersionId: fileData?.fileVersions.id,
                //   token,
                //   idToken,
                //   tenantId: user.tenant_id,
                // })
                handleDoubleClickOnImage({
                  id: fileData.id,
                  versionId: fileData.fileVersions.id,
                })
              }
            >
              Import
            </Button>
          </Box>
        </Box>
      )}
    </DrawerContainer>
  );
};
export default FileDetailsDrawer;
