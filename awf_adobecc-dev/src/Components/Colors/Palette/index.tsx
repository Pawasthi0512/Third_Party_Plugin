import { Box, styled, Typography } from "@mui/material";
import React from "react";
import ColorContainer from "./ColorConatiner";

const BoxConatiner = styled(Box)(({ theme }) => ({
  border: "1px solid #DFDFDF",
  borderRadius: "8px",
  margin: "8px",
  padding: "4px",
  ".colorContainer": {
    margin: "4px",
  },
  ".paletteTitle": {
    margin:"4px 4px",
    fontWeight: "600",
    fontSize: "12px",
    color: theme.palette.primary.main,
  },
}));

const Pallete = ({colorData}) => {
  return (
    <BoxConatiner>
      <Typography className="paletteTitle">{colorData[0].colorHeader}</Typography>
      {
        colorData.map((color ) => (

      <Box className="colorContainer" key={color.clrId}>
        <ColorContainer colorName={color.name} colorHexCode={color.hex} colorRGB ={color.rgb} />
      </Box>
        ))
      }
    </BoxConatiner>
  );
};
export default Pallete;
