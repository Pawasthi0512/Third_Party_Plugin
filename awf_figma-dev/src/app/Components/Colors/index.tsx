import { Box, Divider, styled, Button } from "@mui/material";
import React from "react";
import Pallete from "./Palette";
import NotFound from "../../Primitives/NotFound";

const BoxConatiner = styled(Box)(({ theme }) => ({
  paddingBottom: theme.spacing(25),
  ".colorBottomLine": {
    position: "fixed",
    top: "91%",
    left: "0%",
    marginTop: "8px",
    marginBottom: "8px",
    background: theme.palette.primary.contrastText,
  },
  ".containedColor": {
    width: "412px",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "none",
    boxShadow: "none",
    background: theme.palette.primary.main,
    borderRadius: "8px",
    margin: "8px",
    color: theme.palette.info.main,
  },
  ".colorWrap": {
    height: theme.spacing(280),
    overflowY: "scroll",
    overflowX: "hidden",
  },
}));
const Colors = ({ colorList }) => {
  /**
   * To filter only colors
   */
  const sortedList = colorList.filter((_color) => {
    if (_color.sectionType === "COLOR") {
      return _color;
    }
  });



  /**
   * To iterate to array and create new array with fetched header name from guideline name
   */
  const sortedColorList = () => {
    const newColorList = sortedList.map((clr) => {
      let sectionWithName = [];
      for (let clrId in clr.sectionDetails) {
        clr.sectionDetails[clrId] = {
          ...clr.sectionDetails[clrId],
          clrId,
          colorHeader: clr.guideline.name,
          guidelineId : clr.guideline.id
        };
        sectionWithName.push(clr.sectionDetails[clrId]);
      }
      return { ...clr, sectionWithName };
    });
    
    return newColorList;
  };


  /**
   * To lsit a objects as array
   */
  const list = sortedColorList().map((_sec) => {
    return Object.values(_sec.sectionDetails );
  });

  const mergeListColors = list.flat().filter((clr)=>{
      if(clr.name){
        return clr
      }
  })

  function groupDuplicates(arr) {
    const elementGroups = {};

    arr.forEach(element => {
        if (!elementGroups[element.guidelineId]) {
            elementGroups[element.guidelineId] = [element];
        } else {
            elementGroups[element.guidelineId].push(element);
        }
    });

    return Object.values(elementGroups);
}


const groupedDuplicates = groupDuplicates(mergeListColors);

  

  /**
   * To send message with colors to figma
   */
  const handleImportColorToFrame = () => {
    parent.postMessage(
      {
        pluginMessage: { type: "importColors", mergeListColors },
      },
      "*"
    );
  };



  return (
    <BoxConatiner>
      <Box className="colorWrap">
        <Box>
          {list.length ? (
            <Box>
              {groupedDuplicates.map((_color, index) => {
               
                  return (
                    <Pallete
                      key={index}
                      colorData = {_color}
                      // header={_color.colorHeader}
                      // colorName={_color.name}
                      // colorHexCode={_color.hex}
                      // colorRGBCode={_color.rgb}
                    />
                  );
               
              })}
              <Box className="colorBottomLine">
                <Divider />
                <Button
                  onClick={handleImportColorToFrame}
                  className="containedColor"
                  variant="contained"
                >
                  Import colors to local styles
                </Button>
              </Box>
            </Box>
          ) : (
            <NotFound title="No palettes added yet!" type="search" />
          )}
        </Box>
      </Box>
    </BoxConatiner>
  );
};
export default Colors;
