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
import { helpers, useAssets } from "../../Utiles/hooks";
import FavoriteFilled from "../../Assets/Icons/FavoriteFilled";
import Loader from "../../Primitives/Loader";
import csInterface from "../../CSInterface.js"

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
  },
  ".Conatiner": {
    padding: "0px 8px",
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
    width: "240px",
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
  ".fileWrapper2": {},
  ".fileWrapperBy": {
    fontWeight: "500",
    fontSize: "10px",
    lineHeight: "12px",
    color: theme.palette.primary.main,
    padding: "4px 0px",
  },
  ".fileWrapper3": {},
  ".fileWrapperModified": {
    fontWeight: "500",
    fontSize: "10px",
    lineHeight: "12px",
    color: theme.palette.primary.main,
    padding: "4px 0px",
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
    padding: "3px 4px",
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

const FileDetailsDrawer = ({ openFileDrawer, handleCloseFile }) => {
  const { setFavourite, isAssetByIdLoading, fileData, isFavourite } =
    useAssets();


  /**
   * Handles Favourite icon in file drawer
   * @param resId File id
   */
  const handleFavourite =  (resId) => {
    setFavourite({
      resourceId: resId,
      type: "FILE",
    });
  };

  /**
   * Handle to import assest into system (Local)
   * @param fileData Assest file Details
   */
  const  handleImport = (fileData) => {
    helpers.handleDownloadAssetFile(fileData?.id , fileData?.fileVersions?.id )
  }

  /**
   * Handle to fetch assets and apply directly into illustrator canvas
   * @param fileData Assest file Details
   */
  const handleFetch = (fileData) => {
    console.log('fileData' , fileData);
    
    helpers.handleDownloadAssetFile(fileData?.id , fileData?.fileVersions?.id )
    const url = helpers.handleIllustratorAssetFile(fileData?.id , fileData?.fileVersions?.id )
    fetch(url).then((res) => csInterface.evalScript(`fillImage('${res.url}' , '${fileData?.name}')`)) 
  }

  return (
    <DrawerContainer
      sx={{ borderRadius: "6px" }}
      anchor={"bottom"}
      open={openFileDrawer}
      onClose={handleCloseFile}
    >
      {isAssetByIdLoading || isFavourite ? (
        <Loader />
      ) : (
        <>
          <Box className="topFilecontaier">
            <Typography className="titleFile">File details</Typography>
            <Box onClick={handleCloseFile}>
              <CloseIcon className="closeFileIcon" />
            </Box>
          </Box>
          <Divider />
          <Box className="middleFilecontaier">
            <Box>
              <img
                className="fileImage"
                width={64}
                height={64}
                src={
                  helpers.showDefaultImage(fileData?.name) ||
                  helpers.handlePreviewAssetsImage({ fileId: fileData?.id })
                }
                alt=""
              />
            </Box>
            <Box className="Conatiner">
              <Box className="fileWrapper1">
                <Typography
                  style={{ wordWrap: "break-word" }}
                  className="fileWrapperTitle"
                >
                  {fileData.name}
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
              onClick={() => {
                handleImport(fileData)
              }
              }
            >
              Import
            </Button>
            <Button
              sx={{marginLeft : '4px' , padding:'0px 4px'}}
              className="contained"
              variant="contained"
              onClick={() => {
                handleFetch(fileData)
              }
              }
            >
              Import & Apply
            </Button>
          </Box>
        </>
      )}
    </DrawerContainer>
  );
};
export default FileDetailsDrawer;
