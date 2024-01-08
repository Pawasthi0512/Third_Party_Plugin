import { Box, styled } from "@mui/material";
import React from "react";
import CustomTypo from "../../Primitives/CustomTypo";
import NotFound from "../../Primitives/NotFound";

const BoxContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
  height: theme.spacing(280),
  overflowY: "scroll",
  overflowX: "hidden",
}));

const TypographyComp = ({ typographyList }) => {
  /**
   * To filter only fonts for typography list
   */
  const sortedTypo = typographyList.filter((_typo) => {
    if (_typo.sectionType === "FONT" && _typo.sectionDetails.style) {
      return _typo;
    }
  });

   console.log(sortedTypo, 'sortedTypo')

  return (
    <BoxContainer>
      {sortedTypo.length ? (
        <Box>
          {sortedTypo?.map((text , index) => {
            return (
              <CustomTypo
                key={index}
                fontName={text?.sectionDetails?.family}
                totalStyles={text.sectionDetails?.style?.length}
                fontURL={text?.sectionDetails?.style}
              />
            );
          })}
        </Box>
      ) : (
        <NotFound title="No fonts added yet!" type="search" />
      )}
    </BoxContainer>
  );
};

export default TypographyComp;
