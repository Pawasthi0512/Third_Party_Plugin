import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { RightTickmark } from "../../Assets/Icons/RightTickmark";
import { useOnClickOutside } from "../../Utiles/hooks/customHooks";
import ArrowDown from "../../Assets/Icons/ArrowDown";

const BoxContainer = styled(Box)(({ theme }) => ({
  margin: theme.spacing(0),
  paddingRight: theme.spacing(6),
  width: theme.spacing(40),
  position: "relative",
  ".header": {
    display: "flex",
    alignItems: "center",
    justifyContent:'flex-end',
    cursor: "pointer",
    paddingRight:'6px'
  },
  ".MuiOutlinedInput-notchedOutline": {
    border: "0",
  },
  ".drodown_wrapper": {
    position: "absolute",
    boxShadow:
      "0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12)",
    background: theme.palette.primary.contrastText,
    zIndex: "2",
    width: theme.spacing(105),
    right: 10,
    borderRadius: "8px",
    margin:'4px'
  },
  ".dropdown_content": {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    PointerEvent:"none",
    "&:hover *": {
      borderRadius: "8px",
      width:'180px',
      background: theme.misc.hoveblue,
      color: theme.text.buleText,
    },
  },

  ".list-hover" : {
    padding: theme.spacing(0, 0),
  },

  ".value_wrapper": {
    marginLeft: theme.spacing(14),
    padding: theme.spacing(4, 0),
    position: "relative",
  },
  ".tick_icon": {
    paddingTop:'5px',
    position: "absolute",
    left: "5%",
  },
}));

const Dropdown = ({Options , handleSort }) => {
  const [isSelected, setIsSelected] = React.useState(false);
  const [selectedOpt , setSelectedOpt] = React.useState('')

  const dropdownRef = React.useRef();

  useOnClickOutside(dropdownRef, () => setIsSelected(false));

  const handleShowDropDown = () => {
    setIsSelected(true);
  };
  
/**
 * Handle select option from sort by dropdown
 * @param sortBy option details
 */
  const handleSelectedText = (sortBy) => {
    setSelectedOpt(sortBy.name)
    handleSort(sortBy.value)
  };

  return (
    <BoxContainer ref={dropdownRef}>
      <Box onClick={handleShowDropDown} className="header">
        <Typography sx={{paddingRight:'5px'}} variant="h5">Sort by</Typography>
        <ArrowDown />
      </Box>
      {isSelected && (
        <Box className="drodown_wrapper">
          {Options.map((sortBy) => {
            return (
              <Box
                className="dropdown_content"
                onClick={() => handleSelectedText(sortBy)}
                key={sortBy.id}
              > 
              <Box className="list-hover">
                {selectedOpt === sortBy.name && (
                  <Box className="tick_icon">
                    <RightTickmark />
                  </Box>
                )}
                <Typography variant="h5" className="value_wrapper">
                  {sortBy.name}
                </Typography>
              </Box>
              </Box>
            );
          })}
        </Box>
      )}
    </BoxContainer>
  );
};
export default Dropdown;
