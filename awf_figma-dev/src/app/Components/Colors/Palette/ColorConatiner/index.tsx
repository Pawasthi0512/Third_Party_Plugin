import { Box, Popover, styled, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";

const BoxConatiner = styled(Box)(({ theme }) => ({
  margin: "0px 0px",
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
  textAlign:'left',
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
const ColorContainer = ({ colorName, colorHexCode, colorRGBCode }) => {
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

  /**
   * To send message to figma app to fill selected container with color
   */
  const handleApplyAsFill = () => {
    parent.postMessage(
      { pluginMessage: { type: "fillColor", colorRGBCode } },
      "*"
    );
  };

  /**
   * To send message to figma app to apply border selected container
   */
  const handleAppyAsBorder = () => {
    parent.postMessage(
      { pluginMessage: { type: "borderColor", colorRGBCode } },
      "*"
    );
  };

  /**
   * These constants required for inner shadow and drop shadow
   */
  const offsetX = 2;
  const offsetY = 2;
  const radius = 10;

  /**
   * To send message to figma app to apply inner shadow of an selected container
   */
  const handleApplyInnerShadow = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "innerShadow",
          colorRGBCode,
          offsetX,
          offsetY,
          radius,
        },
      },
      "*"
    );
  };

  /**
   * To send message to figma app to apply drop shadow of an selected container
   */
  const handleAppyDropShadow = () => {
    parent.postMessage(
      {
        pluginMessage: {
          type: "dropShadow",
          colorRGBCode,
          offsetX,
          offsetY,
          radius,
        },
      },
      "*"
    );
  };

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
        <Typography onClick={handleApplyAsFill} sx={colorActionButton}>
          Apply as fill
        </Typography>
        <Typography onClick={handleAppyAsBorder} sx={colorActionButton}>
          Apply as border
        </Typography>
        <Typography onClick={handleApplyInnerShadow} sx={colorActionButton}>
          Apply as inner shadow
        </Typography>
        <Typography onClick={handleAppyDropShadow} sx={colorActionButton}>
          Apply as drop shadow
        </Typography>
      </Popover>
    </BoxConatiner>
  );
};
export default ColorContainer;
