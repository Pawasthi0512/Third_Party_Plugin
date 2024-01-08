import { Box, Popover, styled, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";

const BoxConatiner = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  border: "1px solid #EBEBEB",
  borderRadius: "4px",
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
const ColorContainer = () => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const color = {
    r: 255,
    g: 127,
    b: 80,
  };
  const handleApply = () => {
    parent.postMessage(
      { pluginMessage: { type: "create-color", color }, pluginId: "123456" },
      "https://www.figma.com"
    );
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <BoxConatiner>
      <Box className="wrapperColorContainer1">
        <Box
          className="colorBox"
          sx={{
            width: "24px",
            height: "24px",
            background: "#F1F9F4",
            borderRadius: "4px",
            margin: "4px",
          }}
        ></Box>
        <Typography className="colorContainerTitle">Green 50</Typography>
      </Box>
      <Box className="wrapperColorContainer1">
        <Typography className="colorHexCode">#F1F9F4</Typography>
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
        <Typography sx={colorActionButton} onClick={handleApply}>
          Applying as fill
        </Typography>
        <Typography sx={colorActionButton}>Apply as border</Typography>
        <Typography sx={colorActionButton}>Apply as inner shadow</Typography>
        <Typography sx={colorActionButton}>Apply as drop shadow</Typography>
      </Popover>
    </BoxConatiner>
  );
};
export default ColorContainer;
