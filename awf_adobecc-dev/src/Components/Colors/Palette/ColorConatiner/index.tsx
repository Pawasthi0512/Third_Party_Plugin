import { Box, Popover, styled, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import csInterface from "../../../../CSInterface.js";
import React from "react";

const BoxConatiner = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid #EBEBEB",
  borderRadius: "4px",
  height: "32px",
  ".wrapperColorContainer1": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ".wrapperColorContainer2": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ".colorBox": {},
  ".colorContainerTitle": {
    fontWeight: "400",
    fontSize: "12px",
    marginLeft: "4px",
    color: theme.palette.primary.main,
  },
  ".colorHexCode": {
    fontWeight: "400",
    fontSize: "12px",
    marginRight: "8px",
    color: theme.palette.info.contrastText,
  },
  ".threeDotIcon": {
    width: "16px",
    height: "16px",
    margin: "8px",
    fontSize: "14px",
    cursor: "pointer",
    color: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": {
      background: "#D9D9D9",
      borderRadius: "3px",
    },
  },
  ".colorActionButton": {
    fontWeight: "400",
    fontSize: "12px",
  },
}));

const colorActionButton = {
  fontSize: "12px",
  fontWeight: "400",
  lineHeight: "16px",
  margin: "4px",
  padding: "8px",
  borderRadius: "4px",
  cursor: "pointer",
  "&:hover": {
    background: "#F2F0FF",
    color: "#7D69FF",
  },
  color: "#333333",
};
const ColorContainer = ({ colorName, colorHexCode , colorRGB }) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  /**
   * Open popover
   * @param event 
   */
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Close popover
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;


  function fillColor(R,G,B){
    // var myCurrentAdobeApp = csInterface.getHostEnvironment().appName;
    // alert(myCurrentAdobeApp)
    csInterface.evalScript(`fillColor('${R}','${G}','${B}')`);

  }

  function fillBorderColor(R,G,B){
    csInterface.evalScript(`BorderColor('${R}','${G}',${B})`);
  }

  function dropShadowColor(R,G,B){
    csInterface.evalScript(`DropShadow('${R}','${G}',${B})`);
  }

  // function innerShadowColor(R,G,B){
  //   csInterface.evalScript(`InnerShadow('${R}','${G}',${B})`);
  // }


  return (
    <BoxConatiner>
      <Box className="wrapperColorContainer1">
        <Box
          className="colorBox"
          sx={{
            width: "24px",
            height: "24px",
            background: colorHexCode,
            borderRadius: "4px",
            margin: "4px",
          }}
        ></Box>
        <Typography className="colorContainerTitle">{colorName}</Typography>
      </Box>
      <Box className="wrapperColorContainer1">
        <Typography className="colorHexCode">{colorHexCode}</Typography>
        <Box className="threeDotIcon" onClick={handleClick}>
          <MoreVertIcon sx={{ fontSize: "16px" }} />
        </Box>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Typography sx={colorActionButton} onClick={() => fillColor(colorRGB.r , colorRGB.g , colorRGB.b)}>Apply as fill</Typography>
        <Typography sx={colorActionButton} onClick={() => fillBorderColor(colorRGB.r , colorRGB.g , colorRGB.b)}>Apply as border</Typography>
        {/* <Typography sx={colorActionButton} onClick={() => innerShadowColor(colorRGB.r , colorRGB.g , colorRGB.b)}>Apply as inner shadow</Typography> */}
        <Typography sx={colorActionButton} onClick={() => dropShadowColor(colorRGB.r , colorRGB.g , colorRGB.b)} >Apply as drop shadow</Typography>
      </Popover>
    </BoxConatiner>
  );
};
export default ColorContainer;
