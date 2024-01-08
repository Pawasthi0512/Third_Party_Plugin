import { Box, Button, styled, Typography } from "@mui/material";
import React from "react";
import { helpers, useAuth } from "../../../Utiles/hooks";

const BoxContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  margin: "8px",
  border: "1px solid #DFDFDF",
  borderRadius: "4px",
  ".referenceFileWrapper1": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ".referenceFileContainer1": {
    display: "flex",
    alignItems: "center",
  },
  ".referenceFileImage": {
    borderRadius: "4px",
  },
  ".referenceFileName": {
    color: theme.palette.primary.main,
    fontWeight: "400",
    fontSize: "12px",
    marginLeft: "8px",
    lineHeight: "16px",
  },
  ".referenceFileContainer2": {
    display: "flex",
    alignItems: "center",
  },
  ".referenceFileVersion": {
    fontWeight: "400",
    fontSize: "12px",
    padding: "3px 8px",
    border: "1px solid #6A6A6A",
    borderRadius: "4px",
    margin: "4px",
    color: theme.palette.primary.main,
    lineHeight: "16px",
  },
  ".referenceFileStatus": {
    fontWeight: "400",
    fontSize: "12px",
    padding: "3px 8px",
    borderRadius: "4px",
    lineHeight: "16px",
  },
  ".referenceFileWrapper2": {},
  ".referenceFileDownload": {
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "none",
    lineHeight: "16px",
    color: theme.palette.warning.light,
    margin: "12px 16px 8px 0px",
    padding: "0px",
    boxShadow: "none",
    display: "flex",
  },
}));

const ReferenceComp = ({ fileId, fileName, version, status }) => {
  const { token, idToken, user } = useAuth();

  /**
   * Handles download file in reference tab
   */
  const handleDownloadFile = () => {
    helpers.handleDownloadFile({
      fileId,
      version,
      token,
      idToken,
      tenantId: user.tenant_id,
    });
  };

  return (
    <BoxContainer>
      <Box className="referenceFileWrapper1">
        <Box className="referenceFileContainer1">
          <img
            className="referenceFileImage"
            width={32}
            height={32}
            src={
              helpers.showDefaultImage(fileName) ||
              helpers.handlePreviewImage({
                imageId: fileId,
                version,
                token,
                idToken,
                tenantId: user.tenant_id,
              })
            }
            alt={fileName}
          />
          <Typography className="referenceFileName">{fileName}</Typography>
        </Box>
        <Box className="referenceFileContainer2">
          <Typography className="referenceFileVersion">V{version}</Typography>
          <Typography
            className="referenceFileStatus"
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
      <Box className="referenceFileWrapper2">
        <Button
          onClick={handleDownloadFile}
          variant="text"
          className="referenceFileDownload"
        >
          Download
        </Button>
      </Box>
    </BoxContainer>
  );
};
export default ReferenceComp;
