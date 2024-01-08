import { Box, Button, styled, Typography } from "@mui/material";
import React from "react";
import csInterface from "../../CSInterface.js"

const BoxContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
  ".typographyWrapper": {
    margin: "8px",
    borderRadius: "4px",
    border: "1px solid  #DFDFDF",
    padding: "8px",
  },
  ".typographyConatiner1": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ".typographyBox1": {
    display: "flex",
    alignItems: "center",
  },
  ".typographyBox2": {
    width: "32px",
    height: "32px",
    background: theme.palette.warning.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ".typographyShort": {
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "16px",
    color: theme.palette.primary.main,
  },
  ".typographyTitle": {
    fontWeight: "500",
    fontSize: "14px",
    lineHeight: "24px",
    margin: "0px 8px",
    color: theme.palette.primary.main,
  },
  ".typographyStyles": {
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "16px",
    color: theme.palette.secondary.main,
  },
  ".typographyConatiner2": {
    marginTop: "8px",
  },
  ".typographyButton": {
    textTransform: "none",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "16px",
    color: theme.palette.warning.light,
  },
  '.downloadFont':{
    textDecoration:'none'
  }
}));
const CustomTypo = ({ fontName, totalStyles, fontURL }) => {

  const handleFontURL = (styleURL) => {
    csInterface.openURLInDefaultBrowser(styleURL)
  }
  return (
    <BoxContainer>
      <Box className="typographyWrapper">
        <Box className="typographyConatiner1">
          <Box className="typographyBox1">
            <Box className="typographyBox2">
              <Typography className="typographyShort">Aa</Typography>
            </Box>
            <Typography className="typographyTitle">{fontName}</Typography>
          </Box>
          <Typography className="typographyStyles">
            {totalStyles} styles
          </Typography>
        </Box>
        <Box className="typographyConatiner2">
          {fontURL.map((style) => {
            return (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Button variant="text" className="typographyButton" onClick={() => handleFontURL(style.url)}>
                  <a className='downloadFont' href={style.url} download>
                    Download font
                  </a>
                </Button>
                <Typography className="typographyStyles">
                  {style.name.toUpperCase()}
                </Typography>
              </Box>
            );
          })}
        </Box>
      </Box>
    </BoxContainer>
  );
};
export default CustomTypo;
