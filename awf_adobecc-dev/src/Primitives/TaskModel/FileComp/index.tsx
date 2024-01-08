import { Box, Button, styled, Typography } from "@mui/material";
import React from "react";
import { helpers, useTask } from "../../../Utiles/hooks";

const BoxContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  margin: "8px",
  border: "1px solid #DFDFDF",
  borderRadius: "4px",
  ".fileWrapper1": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ".fileContainer1": {
    display: "flex",
    alignItems: "center",
  },
  ".fileImage": {
    borderRadius: "4px",
  },
  ".fileName": {
    color: theme.palette.primary.main,
    fontWeight: "400",
    fontSize: "12px",
    marginLeft: "8px",
    lineHeight: "16px",
  },
  ".fileContainer2": {
    display: "flex",
    alignItems: "center",
  },
  ".fileVersion": {
    fontWeight: "400",
    fontSize: "12px",
    padding: "3px 8px",
    border: "1px solid #6A6A6A",
    borderRadius: "4px",
    margin: "4px",
    lineHeight: "16px",
    color: theme.palette.primary.main,
  },
  ".fileStatus": {
    fontWeight: "400",
    fontSize: "12px",
    padding: "3px 8px",
    borderRadius: "4px",
    lineHeight: "16px",
    textTransform: "capitalize",
  },
  ".fileWrapper2": {
    display: "flex",
    alignItems: "center",
  },
  ".fileUploadRevision": {
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "none",
    lineHeight: "16px",
    margin: "12px 8px 8px 0px",
    padding: "0px",
    display: "flex",
    boxShadow: "none",
  },
  ".fileDownload": {
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "none",
    lineHeight: "16px",
    color: theme.palette.warning.light,
    margin: "12px 8px 8px 8px",
    padding: "0px",
    display: "flex",
    boxShadow: "none",
    textDecoration:'none'
  },
}));


const FileComp = ({
  _id,
  revisionId,
  fileName,
  version,
  status,
  fileId,
  thumbnailPath,
  handleControlAddedFiles,
}) => {
  const {
    setOpenFileRevision,
    setIsRevision,
    setRevisionFileId,
    setUploadFile,
  } = useTask();

  const handleOpen = () => {
    setRevisionFileId(revisionId);
    setUploadFile([]);
    setOpenFileRevision(true);
  };


  /**
   * To download file as per give path
   */
  const handleDownloadFile = async () => {
    helpers.handleDownloadFile({ fileId, version });
  };

  return (
    <>
      <BoxContainer>
        <Box className="fileWrapper1">
          <Box className="fileContainer1">
            <img
              className="fileImage"
              width={32}
              height={32}
              src={
                !fileId
                  ? thumbnailPath
                  : helpers.handlePreviewImage({ imageId: fileId, version })
              }
              alt=""
            />
            <Typography className="fileName">{fileName}</Typography>
          </Box>
          <Box className="fileContainer2">
            <Typography className="fileVersion">V{version}</Typography>
            <Typography
                className="fileStatus"
                sx={{
                  border: "1px solid #3A70FF",
                  color: "#3A70FF",
                  textTransform: "capitalize",
                }}
            >
              {status.toLowerCase()}
            </Typography>
          </Box>
        </Box>
        <Box className="fileWrapper2">
          <Button
            variant="text"
            className="fileUploadRevision"
            onClick={() => {
              if (revisionId) {
                handleOpen();
                setIsRevision(true);
              }
              if (_id) {
                handleControlAddedFiles();
              }
            }}
            sx={(theme) => ({
              color: !revisionId
                ? theme.palette.secondary.dark
                : theme.palette.warning.light,
            })}
          >
            {!fileId && revisionId
              ? "Replace"
              : !revisionId
              ? "Remove"
              : "Upload revision"}
          </Button>
          {fileId && revisionId ? (
            <Button
              variant="text"
              className="fileDownload"
              onClick={handleDownloadFile}
            >
              Download
            </Button>
          ) : (
            <a className="fileDownload" href={thumbnailPath} download>
              Download
            </a>
          )}
        </Box>
      </BoxContainer>
    </>
  );
};
export default FileComp;
