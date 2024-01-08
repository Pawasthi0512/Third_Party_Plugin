import { Box, Divider, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import Dropdown from "../../Primitives/Dropdown";
import Image from "./Image";
import SearchAndUpload from "./SearchAndUpload";
import { useAssets, useSnackBar } from "../../Utiles/hooks";
import { useDebounce } from "../../Utiles/hooks/customHooks";
import NotFound from "../../Primitives/NotFound";

const SortBy = [
  {
    id: "1",
    name: "Date uploaded (Ascending)",
    value: { updatedAt: "Asc" },
  },
  {
    id: "2",
    name: "Date uploaded (Descending)",
    value: { updatedAt: "Desc" },
  },
  {
    id: "3",
    name: "Date modified (Ascending)",
    value: { createdAt: "Asc" },
  },
  {
    id: "4",
    name: "Date modified (Descending)",
    value: { createdAt: "Desc" },
  },
  {
    id: "5",
    name: "Name (A-Z)",
    value: { name: "Asc" },
  },
  {
    id: "6",
    name: "Name (Z-A)",
    value: { name: "Desc" },
  },
  {
    id: "7",
    name: "Size (Ascending)",
    value: { size: "Asc" },
  },
  {
    id: "8",
    name: "Size (Descending)",
    value: { size: "Desc" },
  },
];

const BoxContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
  margin: "0px",
  ".assetsWrapper": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0px",
  },
  ".assetsContainer": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: "12px",
  },
  ".showing": {
    fontWeight: "400",
    fontSize: "12px",
    color: theme.palette.secondary.main,
  },
  ".no-of-assets": {
    fontWeight: "400",
    fontSize: "12px",
    paddingLeft: "5px",
    color: theme.palette.primary.main,
  },
}));
const Assets = ({ assetsList }) => {
  const {
    isAssetsLoading,
    setFilterObj,
    openFileUpload,
    setOpenFileUpload,
    handleChangeFileUpload,
    handleSubmitNewFile,
  } = useAssets();

  const { ShowSuccessSnackBar } = useSnackBar();

  const [searchAssets, setSearchAssets] = React.useState("");

  /**
   * Handles filter in assets
   * @param extension extension data --> asset type + asset extention type
   * @param manualTags tags
   * @param createdBy uploaded by
   * @param hexcodes colors
   */
  const handleFilter = (
    extension,
    manualTags,
    createdBy,
    hexcodes,
    createdAt
  ) => {
    let filterOpt = {
      filter: {
        extension,
        manualTags,
        createdBy,
      },
      range: {
        createdAt,
      },
      hexcodes,
      sort: {},
      search: "",
    };
    setFilterObj(filterOpt);
  };

  /**
   * Deboucne to prevent delay in api call and search
   */
  const debouncedValue = useDebounce(searchAssets, 300);

  /**
   * Handle asset search
   */
  const handleSearch = () => {
    let filterOpt = {
      filter: {},
      range: {},
      hexcodes: [],
      sort: {},
      search: debouncedValue,
    };
    setFilterObj(filterOpt);
  };

  /**
   * Handle asset sort
   */
  const handleSort = (sortOpt) => {
    let filterOpt = {
      filter: {},
      range: {},
      hexcodes: [],
      sort: sortOpt,
      search: "",
    };
    setFilterObj(filterOpt);
  };

  useEffect(() => {
    handleSearch();
  }, [debouncedValue]);

  React.useEffect(() => {
    ShowSuccessSnackBar(
      "Drag & drop items to the canvas or double click an item to replace selected layers."
    );
  }, []);

  return (
    <BoxContainer>
      <SearchAndUpload
        searchedAssets={searchAssets}
        setSearchAssets={setSearchAssets}
        handleSearchAssets={(e) => setSearchAssets(e.target.value)}
        handleFilter={handleFilter}
        openFileUpload={openFileUpload}
        setOpenFileUpload={setOpenFileUpload}
        handleChangeFileUpload={handleChangeFileUpload}
        handleSubmitNewFile={handleSubmitNewFile}
      />
      <Divider />
      {assetsList.length === 0 && !isAssetsLoading ? (
        <NotFound
          title="No results Found"
          description="Try adjusting your search or filters to find what you’re looking for"
          type="search"
        />
      ) : (
        <div className="assetsWrapper">
          <div className="assetsContainer">
            <Typography className="showing">Showing</Typography>
            <Typography className="no-of-assets">
              {assetsList.length} assets
            </Typography>
          </div>
          <Dropdown Options={SortBy} handleSort={handleSort} />
        </div>
      )}
      {<Image assetsList={assetsList} />}
    </BoxContainer>
  );
};
export default Assets;
