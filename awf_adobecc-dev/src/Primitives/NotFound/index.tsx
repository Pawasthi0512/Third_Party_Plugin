import { Box, Button, styled, Typography } from "@mui/material";
import React from "react";

const BoxContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
  marginTop: theme.spacing(110),
  display: "felx",
  justifyContent: "center",
  alignItems: "center",
  overflowY: "hidden",
  overflowX: "hidden",
  ".EmptyAssetsContainer": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  ".EmptyAssetsTitle": {
    fontWeight: "500",
    fontSize: "16px",
    lineHeight: "24px",
    color: theme.palette.primary.main,
    marginBottom: "4px",
  },
  ".EmptyAssetsDesc": {
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "16px",
    margin: "0px 20px",
    color: theme.palette.secondary.light,
  },
  ".EmptyAssetsUpload": {
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "16px",
    color: theme.palette.info.main,
    boxShadow: "none",
    textTransform: "none",
    padding: "8px 35px",
    marginTop: "12px",
    cursor: "pointer",
    background: theme.palette.primary.main,
  },
}));
const NotFound = ({ title, description = "", type = null }) => {
  return (
    <BoxContainer>
      <Box className="EmptyAssetsContainer">
        <Typography className="EmptyAssetsTitle">{title}</Typography>
        <Typography className="EmptyAssetsDesc">{description}</Typography>
        {type === "search" ? (
          ""
        ) : (
          <Button className="EmptyAssetsUpload" variant="contained">
            Upload
          </Button>
        )}
      </Box>
    </BoxContainer>
  );
};
export default NotFound;
