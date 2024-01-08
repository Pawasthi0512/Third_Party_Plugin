import { Box, styled } from "@mui/material";
import React from "react";
import FilterLogo from "../../../Assets/Icons/FilterLogo";
import UploadIcon from "../../../Assets/Icons/UploadIcon";
import CustomFilter from "../../../Primitives/CustomFilter";
import CustomUpload from "../../../Primitives/CustomUpload";
import InputField from "../../../Primitives/InputField";
import { SearchIcon } from "../../../Assets/Icons/SearchIcon";
import { helpers, useAssets } from "../../../Utiles/hooks";
import { CloseIcon } from "../../../Assets/Icons/CloseIcon";


const BoxContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0px 8px",
  maxHeight: "48px",
  ".searcBar": {
    ".inputBox": {
      width: theme.spacing(166),
      height: `${theme.spacing(16)} !important`,
      borderRadius: theme.spacing(2, 0, 0, 2),
      border: `1px solid ${theme.misc.borderGrey}`,
      marginBottom: "8px",
    },
    ".inputBox::after": {
      background: "red",
    },
  },
  ".filter-logo": {
    border: "1px solid #DFDFDF",
    borderRadius: "0px 4px 4px 0px",
    width: "38px",
    height: "30px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ".wrapper": {
    padding: theme.spacing(0),
    display: "flex",
    alignItems: "center",
  },
  ".uploadWrapper": {
    borderRadius: "4px",
    padding: "6px",
    width: "20px",
    cursor: "pointer",
    backgroundColor: theme.palette.primary.main,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
const SearchAndUpload = ({
  openFileUpload,
  setOpenFileUpload,
  searchedAssets,
  setSearchAssets,
  handleSearchAssets,
  handleFilter,
  handleChangeFileUpload,
  handleSubmitNewFile,
}) => {
  const {openFilterDrawer, setOpenFilterDrawer, filterObj } = useAssets();

  /**
   * Handles open assest upload file
   * @returns
   */
  const handleOpen = () => {
    setOpenFileUpload(true);

  }

  /**
   * Handles open assest upload file
   * @returns
   */
  const handleClose = (event, reason) => {
    console.log(event);
    if (reason && reason === "backdropClick") return;
    setOpenFileUpload(false);
  };

  /**
   * Handles open filter drawer
   * @returns
   */
  const handleOpenFilterDrawer = () => setOpenFilterDrawer(true);

  /**
   * Handles close filter drawer
   * @returns
   */
  const handleCloseFilterDrawer = () => setOpenFilterDrawer(false);

  return (
    <>
      <BoxContainer>
        <Box className="wrapper">
          <Box sx={{ width: 332 }}>
            <Box className="searcBar">
              <InputField
                placeholder="Search Assets "
                handleInputField={handleSearchAssets}
                value={searchedAssets}
                inputIcon={
                  searchedAssets?.length === 0 ? (
                    <SearchIcon />
                  ) : (
                    <CloseIcon onClick={() => setSearchAssets("")} />
                  )
                }
                isInputIcon
                inputType="text"
              />
            </Box>
          </Box>
          <Box className="filter-logo" onClick={handleOpenFilterDrawer}>
            <FilterLogo />
            <span
              style={{
                fontWeight: 500,
                fontSize: "12px",
                padding: "2px",
              }}
            >
              {helpers.filterCount(filterObj) !== 0
                ? `0${helpers.filterCount(filterObj)}`
                : ""}
            </span>
          </Box>
        </Box>
        <Box className="uploadWrapper" onClick={handleOpen}>
          <UploadIcon />
        </Box>
      </BoxContainer>

      {openFileUpload && (
        <CustomUpload
          open={openFileUpload}
          handleClose={handleClose}
          handleChangeFile={handleChangeFileUpload}
          handleContinues={handleSubmitNewFile}
        />
      )}
        <CustomFilter
          openFilterDrawer={openFilterDrawer}
          handleCloseFilter={handleCloseFilterDrawer}
          handleApplyFilter={handleFilter}
        />
    </>
  );
};
export default SearchAndUpload;
