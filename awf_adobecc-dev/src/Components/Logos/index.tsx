import { Box, styled } from "@mui/material";
import React from "react";
import CustomLogo from "../../Primitives/CustomLogo";
import NotFound from "../../Primitives/NotFound";

const BoxContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
  height: theme.spacing(270),
  overflowY: "scroll",
  overflowX: "hidden",
}));
const Logos = ({ logoList }) => {
  /**
   * To filter only LOGO's
   */
  const sortedLogos = logoList.filter((_color) => {
    if (
      _color.sectionType === "LOGO" &&
      Object.keys(_color.sectionDetails).length !== 0
    ) {
      return _color;
    }
  });

  /**
   * To create and array of section details and section id
   */
  const appendSectionIdandLogoId = () => {
    const newList = sortedLogos.map((_logo) => {
      let updatedSectionID = [];
      for (let logoId in _logo.sectionDetails) {
        _logo.sectionDetails[logoId] = {
          ..._logo.sectionDetails[logoId],
          logoId,
          sectionId: _logo.id,
        };
        updatedSectionID.push(_logo.sectionDetails[logoId]);
      }

      return { ..._logo, updatedSectionID };
    });
    return newList;
  };

  return (
    <BoxContainer>
      {sortedLogos.length ? (
        <Box>
          <CustomLogo itemData={appendSectionIdandLogoId()} />
        </Box>
      ) : (
        <NotFound title="No logos added yet!" type="search" />
      )}
    </BoxContainer>
  );
};
export default Logos;
