import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Divider,
  Drawer,
  FormControlLabel,
  FormGroup,
  List,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { AssetsExtension, AssetsType, ColorList } from "../../Utiles/constants";
import ArrowDown from "../../Assets/Icons/ArrowDown";
import ArrowRight from "../../Assets/Icons/ArrowRight";
import { RightTickmark } from "../../Assets/Icons/RightTickmark";
import { useAssets } from "../../Utiles/hooks";
import InputField from "../../Primitives/InputField";
import { SearchIcon } from "../../Assets/Icons/SearchIcon";
import { CloseIcon, SmallCloseIcon } from "../../Assets/Icons/CloseIcon";
import { WhiteRightTick } from "../../Assets/Icons/WhiteRightTick";

const DrawerContainer = styled(Drawer)(({ theme }) => ({
  padding: theme.spacing(0),
  ".MuiDrawer-paper": {
    width: "240px",
    marginTop: "84px",
    boxShadow: "none",
    paddingBottom: "100px",
  },
  ".filtereHeader": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 8px",
  },
  ".filterTitle": {
    fontSize: "12px",
    fontWeight: "500",
    color: theme.palette.primary.main,
  },
  ".filterClose": {
    cursor: "pointer",
  },
  ".filterFooter": {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    paading: "8px",
    margin: "8px",
  },
  ".filterBottom": {
    width: "240px",
    position: "fixed",
    top: "91%",
    right: "0%",
    backgroundColor: "#fff !important",
    paddingBottom: "20px",
  },
  ".clear-selection": {
    fontSize: "12px",
    fontWeight: "500",
    textTransform: "none",
    textDecoration: "underline !important",
    minWidth: "89px",
  },
  ".filter-apply": {
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: "16px",
    textTransform: "none",
    padding: "8px 0px",
    marginLeft: "6px",
    boxShadow: "none",
    borderRadius: "8px",
    minWidth: "49px",
  },
  ".customFilterCheckbox": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: "scale(0.9)",
    padding: "0px 0px 0px 0px",
    color: "#DFDFDF",
  },
  ".filter-option-title": {
    paddingLeft: "8px",
    color: theme.palette.primary.main,
  },
  ".MuiTypography-root": {
    fontSize: "12px",
  },
  ".tag_search": {
    hieght: "32px",
    padding: "0 12px 0 12px",
    ".css-b62m3t-container": {
      width: "216px !important",
    },

    ".inputBox": {
      width: theme.spacing(108),
      height: `${theme.spacing(16)} !important`,
      borderRadius: theme.spacing(2, 0, 0, 2),
      border: `1px solid ${theme.misc.borderGrey}`,
      marginBottom: "8px",
      "&:focused": {
        border: "1px solid #3A70FF",
      },
    },
  },
  ".Mui-focused": {
    border: "1px solid #3A70FF",
  },
  ".viewMoreButton": {
    fontWeight: "400",
    fontSize: "12px",
    color: "#3A70FF",
    textTransform: "none",
    paddingLeft: "16px",
    textDecoration: "underline !important",
  },
  ".colors_wrapper": {
    padding: theme.spacing(0, 6),
  },
  ".colorBox": {
    "& .MuiIconButton-label:after": {
      backgroundColor: "black",
    },
  },
  ".formControler": {
    color: theme.palette.primary.main,
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "16px",
    display: "flex",
    alignItems: "center",
    paddingTop: "4px",
  },
  ".iconContainer": {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: `1px solid ${theme.misc.borderGrey}`,
    width: theme.spacing(10),
    height: theme.spacing(10),
    borderRadius: theme.spacing(2),
  },
  ".MuiButton-contained": {
    width: "49px",
  },
  ".dateFiled": {
    padding: "10px 25px",
    display: "flex",
    justifyContent: "space-between",
 
    flexDirection:'column'
  },
  ".ant-picker-dropdown": {
    zIndex: 10560,
  },
  ".noTag_found": {
    marginLeft: theme.spacing(7.5),
    marginBottom: theme.spacing(4),
    color: "#A5A5A5",
    fontWeight: 400,
    lineHeight: "12px",
  },
  ".selectedListContainer": {
    padding: theme.spacing(0, 4, 4, 4),
    display: "flex",
    alignItems: "center",
  },
  ".selectedTag": {
    width: theme.spacing(40),
    height: theme.spacing(14),
    background: "#EBEBEB",
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: theme.spacing(4),
    marginLeft: theme.spacing(4),
  },
  "._oneTag": {
    fontSize: "10px",
    fontWeight: "400",
    color: "#333333",
    lineHeight: "12px",
  },
  ".tag_list": {
    width: "216px",
    maxHeight: "168px",
    position: "absolute",
    boxShadow:
      " 0px 9px 28px 8px rgba(0, 0, 0, 0.05), 0px 6px 16px rgba(0, 0, 0, 0.08), 0px 3px 6px -4px rgba(0, 0, 0, 0.12)",
    borderRadius: theme.spacing(4),
    zIndex: 1,
    left: 11,
    background: "#FFFFFF",
    marginTop: theme.spacing(2),
  },
  ".tag_": {
    color: "#333333",
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: "400",
    borderRadius: theme.spacing(4),
    padding: theme.spacing(6, 0, 4, 0),
    cursor: "pointer",
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    "&:hover": {
      background: "#F5F5F5",
    },
  },
  ".date_lable": {
    fontWeight: 400,
    fontSize: theme.spacing(6),
    lineHeight: "16px",
    color: "#A5A5A5",
  },
}));


const CustomCheckbox = styled(Checkbox)(() => ({
  root: {
    "&$checked": {
      position: "relative",
      "&:after": {
        content: '""',
        left: 13,
        top: 13,
        height: 15,
        width: 15,
        position: "absolute",
        backgroundColor: "lightgreen",
        zIndex: -1,
      },
    },
  },
}));

/**
 * Function to create filter option component
 * @param checkedNum chekedNum is the no of checkboxes checked
 * @param filterType filterType is the option name of the filter
 * @param open open to check status of option
 * @returns Component with Title and Count
 */
const CheckedCount = ({ checkedNum, filterType, open }) => {
  return (
    <Box sx={{ pl: "4px", display: "flex", alignItems: "center" }}>
      <Typography
        sx={
          open
            ? { paddingRight: "4px", fontWeight: "500" }
            : { paddingRight: "4px", fontWeight: "400" }
        }
      >
        {filterType}
      </Typography>
      <Typography
        sx={
          checkedNum > 0
            ? {
                background: "#F5F5F5",
                borderRadius: "12px",
                width: "19px",
                height: "14px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }
            : {
                display: "none",
              }
        }
      >
        {checkedNum === 0
          ? ""
          : checkedNum < 10
          ? `0${checkedNum}`
          : checkedNum}
      </Typography>
    </Box>
  );
};

/**
 * Function to create user image along with user name for uploaded by option
 * @param imgUrl user image url
 * @param uploadName user name
 * @returns
 */
const UploadedBy = ({ imgUrl, uploadedName }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center", pl: "6px" }}>
      <img
        width={24}
        height={24}
        style={{ borderRadius: "32px" }}
        src={imgUrl}
        alt={imgUrl}
      />
      <Typography sx={{ paddingLeft: "4px" }}>{uploadedName}</Typography>
    </Box>
  );
};

const CustomFilter = ({
  openFilterDrawer,
  handleCloseFilter,
  handleApplyFilter,
}) => {
  const { userList, tagList } = useAssets();

  const [openAssets, setOpenAssets] = React.useState(true);
  const [openTags, setOpenTags] = React.useState(false);
  const [openColors, setOpenColors] = React.useState(false);
  const [openExtension, setOpenExtension] = React.useState(false);
  const [openBy, setOpenBy] = React.useState(false);
  const [openDate, setOpenDate] = React.useState(false);
  const [showTagList, setShowTagList] = React.useState(false);

  /**
   * State for User list and Asset extension list
   */
  const [extensionList, setExtensionList] = useState([]);

  /**
   * State for user search result
   */

  /**
   * State for View more button in Uploaded by and asset extension
   */
  const [assetExtViewMore, setAssetExtViewMore] = useState<number>(5);
  const [userExtViewMore, setUserExtViewMore] = useState<number>(3);

  /**
   * State for checked and selected option for all 5 categories
   */

  const [selectedAsset, setSelectedAsset] = useState([]);
  const [tagListData, setTagListData] = useState(tagList);
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedTagList, setSeelctedTagList] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedAssetExt, setSelectedAssetExt] = useState([]);
  const [selectedBy, setSelectedBy] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [uploadedUserList, setUplaodedUserList] = useState([]);

  const [searchedForExtention, setSearchedForExtention] = useState("");
  const [searchedForUploadedBy, setSearchedForUploadedBy] = useState("");

  /**
   * Function to handle toggeling the filter option
   * @param type category type
   */
  const handleClick = (type) => {
    if (type === "asset") {
      setOpenAssets(!openAssets);
    } else if (type === "tags") {
      setOpenTags(!openTags);
    } else if (type === "colors") {
      setOpenColors(!openColors);
    } else if (type === "extension") {
      setOpenExtension(!openExtension);
    } else if (type === "by") {
      setOpenBy(!openBy);
    } else if (type === "date") {
      setOpenDate(!openDate);
    }
  };

  /**
   * function to Asset filter type checkboxes
   */
  const handleChangeAssetTypeFilter = (e) => {
    if (!!e.target.checked) {
      setSelectedAsset([...selectedAsset, e.target.value]);
    } else {
      const filtertedType = selectedAsset.filter((name) => {
        return name !== e.target.value;
      });
      setSelectedAsset([...filtertedType]);
    }
  };

  /**
   * function to Colors filter checkboxes
   */
  const handleChangeColorsFilter = (e) => {
    if (!!e.target.checked) {
      setSelectedColors([...selectedColors, e.target.value]);
    } else {
      const filtertedType = selectedColors.filter((name) => {
        return name !== e.target.value;
      });
      setSelectedColors([...filtertedType]);
    }
  };

  /**
   * function to Uploaded by filter type checkboxes
   */
  const handleChangeUploadedByFilter = (e) => {
    if (!!e.target.checked) {
      setSelectedBy([...selectedBy, e.target.value]);
    } else {
      const filtertedType = selectedBy.filter((name) => {
        return name !== e.target.value;
      });
      setSelectedBy([...filtertedType]);
    }
  };

  /**
   * function to Asset Extension filter type checkboxes
   */
  const handleAssetExtensionFilter = (e) => {
    if (!!e.target.checked) {
      setSelectedAssetExt([...selectedAssetExt, e.target.value]);
    } else {
      const filtertedType = selectedAssetExt.filter((name) => {
        return name !== e.target.value;
      });
      setSelectedAssetExt([...filtertedType]);
    }
  };

  /**
   * selectedAsset (Assets type) and selectedAssetExt (Asset Extension )
   * both are in extension for filter
   */
  const extension = [...selectedAsset, ...selectedAssetExt];

  // Calculate total for handle clear selection
  const isSelected =
    selectedAsset.length +
    selectedAssetExt.length +
    selectedTagList.length +
    selectedColors.length +
    (startDate || endDate ? 1 : 0) +
    selectedBy.length;

  /**
   * Handle assets apply filter
   */
  /**
   * To make dates as key value pair
   */
  const key = `${startDate} 00:00:00.000`;
  let obj = {};
  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  obj[key];
  obj = { ...obj, [key]: `${endDate} 23:59:59.999` };

  const handleApplyAssetfilter = () => {
  
    if (startDate && endDate) {
      handleApplyFilter(
        extension,
        selectedTagList,
        selectedBy,
        selectedColors,
        obj
      );
    } else {
      handleApplyFilter(extension, selectedTagList, selectedBy, selectedColors);
    }
    handleCloseFilter();
  };

  /**
   * To clear all the filter options
   */
  const handleClearFilter = () => {
    setSelectedAsset([]);
    setSelectedAssetExt([]);
    setSelectedBy([]);
    setSelectedColors([]);
    setSelectedTag("");
    handleApplyFilter();
    setSeelctedTagList([]);
    setStartDate("");
    setEndDate("");
  };

  const handleChangeTags = (e) => {
    setSelectedTag(e.target.value);
    setShowTagList(true);
  };

  /**
   *
   * Fires when user selectes a tag from the dropdown
   */
  const handleSelectTag = (_tag) => {
    setSeelctedTagList([...selectedTagList, _tag]);
    setShowTagList(false);
  };

  /**
   * To filter as per searched tags
   */
  React.useEffect(() => {
    if (selectedTag) {
      const filteredTags = tagListData.filter((tag) =>
        tag.toLocaleLowerCase().includes(selectedTag.toLocaleLowerCase())
      );
      setTagListData(filteredTags);
    } else {
      setTagListData(tagList);
    }
  }, [selectedTag, tagList]);

  /**
   *
   * To remove selected tag
   */
  const handleRemoveTag = (tag) => {
    const removeTag = selectedTagList.filter((_tag) => {
      return _tag !== tag;
    });
    setSeelctedTagList(removeTag);
  };

  /**
   * Assets extentions
   */

  React.useEffect(() => {
    if (searchedForExtention) {
      const filteredExtention = AssetsExtension.filter((_exe) =>
        _exe.type
          .toLocaleLowerCase()
          .includes(searchedForExtention.toLocaleLowerCase())
      );
      setExtensionList(filteredExtention);
    } else {
      setExtensionList(AssetsExtension);
    }
  }, [searchedForExtention]);

  /**
   * Uploaded by user list
   */

  React.useEffect(() => {
    if (searchedForUploadedBy) {
      const filteredUser = userList.filter((user) =>
        user.first_name.toLocaleLowerCase().includes(searchedForUploadedBy)
      );
      setUplaodedUserList(filteredUser);
    } else {
      setUplaodedUserList(userList);
    }
  }, [searchedForUploadedBy, userList]);

    /**
   * Filtered tags list 
   */

    const filteredTagList  = tagListData
    .filter((elem) => !selectedTagList.includes(elem))
    .concat(selectedTagList.filter((elem) => !tagListData.includes(elem)));
  

  return (
    <DrawerContainer
      sx={{ width: "240px" }}
      anchor={"right"}
      open={openFilterDrawer}
      onClose={handleCloseFilter}
    >
      <Box className="filtereHeader">
        <Typography className="filterTitle">Filters</Typography>
        <Box className="filterClose" onClick={handleCloseFilter}>
          <CloseIcon />
        </Box>
      </Box>
      <Divider />
      <Box sx={{width: "230px" }}>
        <List
          sx={{
            width: "100%",
            mixWidth: 240,
            bgcolor: "background.paper",
            paddingBottom: "200px",
          }}
          component="nav"
          aria-labelledby="nested-list-subheader"
        >
          {/* Asset Type option  */}

          <ListItemButton
            onClick={() => handleClick("asset")}
            sx={{ padding: "10px 10px", "&:hover": { background: "none" } }}
          >
            {openAssets ? <ArrowDown /> : <ArrowRight />}
            <ListItemText
              sx={{ fontWeight: "400", fontSize: "12px" }}
              className="filter-option-title"
              primary={
                <CheckedCount
                  open={openAssets}
                  checkedNum={selectedAsset.length}
                  filterType="Asset Type"
                />
              }
            />
          </ListItemButton>

          <Collapse in={openAssets} timeout="auto">
            <Box sx={{ pl: 10 }}>
              {AssetsType.map((d) => {
                const checkedItems = !!selectedAsset.find(
                  (name) => name === d.type.toString()
                );
                return (
                  <FormControlLabel
                    className="formControler"
                    key={d.id}
                    control={
                      <Checkbox
                        checked={checkedItems}
                        name={d.name}
                        size="small"
                        className="customFilterCheckbox"
                        onChange={handleChangeAssetTypeFilter}
                        value={d.type}
                        sx={{
                          color: "#DFDFDF",
                          "&.Mui-checked": {
                            color: "#333333 !important",
                          },
                          "&:hover": {
                            color: "#333333 !important",
                          },
                        }}
                      />
                    }
                    label={d.name}
                  />
                );
              })}
            </Box>
          </Collapse>

          {/* Tags option */}
          <ListItemButton
            onClick={() => handleClick("tags")}
            sx={{ padding: "10px 10px", "&:hover": { background: "none" } }}
          >
            {openTags ? <ArrowDown /> : <ArrowRight />}
            <ListItemText
              className="filter-option-title"
              primary={
                <CheckedCount
                  open={openTags}
                  checkedNum={selectedTagList.length}
                  filterType="Tags"
                />
              }
            />
          </ListItemButton>

          {openTags && (
            <>
              <Box
                onClick={() => setShowTagList(true)}
                className="tag_search"
                sx={{
                  width: 216,
                  height: 32,
                  marginBottom: 6,
                  borderRadius: "8px !important",
                  position: "relative",
                }}
              >
                <InputField
                  placeholder="Search tags"
                  handleInputField={handleChangeTags}
                  value={selectedTag}
                  inputIcon={
                    !selectedTag ? (
                      <SearchIcon />
                    ) : (
                      <CloseIcon onClick={() => setSelectedTag("")} />
                    )
                  }
                  isInputIcon
                  inputType="text"
                />
              </Box>
              {selectedTag && !tagListData.length ? (
                <Typography className="noTag_found">no tags found</Typography>
              ) : null}
              {selectedTagList.length ? (
                <Box>
                  <Box className="selectedListContainer">
                    {selectedTagList.map((_tag) => {
                      return (
                        <Box className="selectedTag" key={_tag.id}>
                          <Typography className="_oneTag">{_tag}</Typography>
                          <SmallCloseIcon onClick={() => handleRemoveTag(_tag)} />
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              ) : null}
              {showTagList && (
                <Box className="tag_list">
                  {filteredTagList.map((_d) => {
                    return (
                      <Typography
                        onClick={() => handleSelectTag(_d)}
                        className="tag_"
                        key={_d.id
                        }
                      >
                        {_d}
                      </Typography>
                    );
                  })}
                </Box>
              )}
            </>
          )}

          {/* Colors option  */}
          <ListItemButton
            onClick={() => handleClick("colors")}
            sx={{ padding: "10px 10px", "&:hover": { background: "none" } }}
          >
            {openColors ? <ArrowDown /> : <ArrowRight />}
            <ListItemText
              className="filter-option-title"
              primary={
                <CheckedCount
                  open={openColors}
                  checkedNum={selectedColors.length}
                  filterType="Colors"
                />
              }
            />
          </ListItemButton>

          <Collapse in={openColors} timeout="auto" sx={{ pl: "5px" }}>
            {ColorList.map((_color) => {
              const checkedColor = !!selectedColors.find(
                (clr) => clr === _color.color.toString()
              );
              return (
                <CustomCheckbox
                  key={_color.id}
                  className="colorBox"
                  checked={checkedColor}
                  title={_color.colorName}
                  onChange={handleChangeColorsFilter}
                  value={_color.color}
                  checkedIcon={
                    <Box
                      className="iconContainer"
                      sx={() => ({
                        background: _color.color,
                      })}
                    >
                      {_color.tick !== "white" ? (
                        <RightTickmark />
                      ) : (
                        <WhiteRightTick />
                      )}
                    </Box>
                  }
                  sx={(theme) => ({
                    color: _color.color,
                    padding: "4px",
                    ".MuiSvgIcon-root ": {
                      background: _color.color,
                      border: `1px solid ${theme.misc.borderGrey}`,
                      borderRadius: theme.spacing(2),
                      width: "20px",
                      height: "20px",
                      margin: "0px",
                    },
                  })}
                />
              );
            })}
          </Collapse>

          {/* Asset Extension option */}
          <ListItemButton
            onClick={() => handleClick("extension")}
            sx={{ padding: "10px 10px", "&:hover": { background: "none" } }}
          >
            {openExtension ? <ArrowDown /> : <ArrowRight />}
            <ListItemText
              className="filter-option-title"
              primary={
                <CheckedCount
                  open={openExtension}
                  checkedNum={selectedAssetExt.length}
                  filterType="Asset Extension"
                />
              }
            />
          </ListItemButton>

          {openExtension && (
            <Box className="tag_search" sx={{ width: 216, height: 32 }}>
              <InputField
                placeholder="Search extensions"
                handleInputField={(e) => setSearchedForExtention(e.target.value)}
                value={searchedForExtention}
                inputIcon={
                  !searchedForExtention ? (
                    <SearchIcon />
                  ) : (
                    <CloseIcon onClick={() => setSearchedForExtention("")} />
                  )
                }
                isInputIcon
                inputType="text"
              />
            </Box>
          )}
          {searchedForExtention && !extensionList.length ? (
            <Typography className="noTag_found">no extensions found</Typography>
          ) : null}
          <Collapse in={openExtension} timeout="auto">
            <Box sx={{ pl: 10, pt: 4 }}>
              {extensionList.slice(0, assetExtViewMore).map((_assetExtData) => {
                const checkedAssetExe = !!selectedAssetExt.find(
                  (exe) => exe === _assetExtData.type.toString()
                );
                return (
                  <FormControlLabel
                    className="formControler"
                    key={_assetExtData.id}
                    control={
                      <Checkbox
                        checked={checkedAssetExe}
                        name={_assetExtData.type}
                        size="small"
                        className="customFilterCheckbox"
                        onChange={handleAssetExtensionFilter}
                        value={_assetExtData.type}
                        sx={{
                          color: "#DFDFDF",
                          "&.Mui-checked": {
                            color: "#333333",
                          },
                          "&:hover": {
                            color: "#333333",
                          },
                        }}
                      />
                    }
                    label={_assetExtData.name}
                  />
                );
              })}
            </Box>
            <Button
              variant="text"
              className="viewMoreButton"
              onClick={(_view) =>
                setAssetExtViewMore((_viewMore) =>
                  assetExtViewMore <= extensionList.length
                    ? _viewMore + 3
                    : _viewMore
                )
              }
            >
              {assetExtViewMore < 20 ? "view more" : ""}
            </Button>
          </Collapse>

          {/* Uploaded by option */}
          <ListItemButton
            onClick={() => handleClick("by")}
            sx={{ padding: "10px 10px", "&:hover": { background: "none" } }}
          >
            {openBy ? <ArrowDown /> : <ArrowRight />}
            <ListItemText
              className="filter-option-title"
              primary={
                <CheckedCount
                  open={openBy}
                  checkedNum={selectedBy.length}
                  filterType="Upload by"
                />
              }
            />
          </ListItemButton>

          {openBy && (
            <Box className="tag_search" sx={{ width: 216, height: 32 }}>
              <InputField
                placeholder="Search Uploaded by"
                handleInputField={(e) => setSearchedForUploadedBy(e.target.value)}
                value={searchedForUploadedBy}
                inputIcon={
                  !searchedForUploadedBy ? (
                    <SearchIcon />
                  ) : (
                    <CloseIcon onClick={() => setSearchedForUploadedBy("")} />
                  )
                }
                isInputIcon
                inputType="text"
              />
            </Box>
          )}
          {searchedForUploadedBy && !uploadedUserList.length ? (
            <Typography className="noTag_found">no users found</Typography>
          ) : null}
          <Collapse in={openBy} timeout="auto">
            <List component="div" disablePadding>
              <FormGroup sx={{ pl: 10, pt: 4 }}>
                {uploadedUserList?.slice(0, userExtViewMore).map((_userList) => {
                  const checkedUser = !!selectedBy.find(
                    (user) => user === _userList.id.toString()
                  );
                  return (
                    <FormControlLabel
                      sx={{ padding: "4px 0px" }}
                      className="formControler"
                      key={_userList.id}
                      control={
                        <Checkbox
                          checked={checkedUser}
                          name={_userList.name}
                          size="small"
                          className="customFilterCheckbox"
                          onChange={handleChangeUploadedByFilter}
                          value={_userList.id}
                          sx={{
                            color: "#DFDFDF",
                            "&.Mui-checked": {
                              color: "#333333",
                            },
                            "&:hover": {
                              color: "#333333",
                            },
                          }}
                        />
                      }
                      label={
                        <UploadedBy
                          imgUrl={
                            _userList.profile_picture !== null
                              ? _userList.profile_picture
                              : "https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png"
                          }
                          uploadedName={_userList.name}
                        />
                      }
                    />
                  );
                })}
              </FormGroup>
              <Button
                variant="text"
                className="viewMoreButton"
                onClick={(_view) =>
                  setUserExtViewMore((_viewMore) => _viewMore + 2)
                }
              >
                view more
              </Button>
            </List>
          </Collapse>

          {/* Uploaded date options */}
          <ListItemButton
            onClick={() => handleClick("date")}
            sx={{ padding: "10px 10px", "&:hover": { background: "none" } }}
          >
            {openDate ? <ArrowDown /> : <ArrowRight />}
            <ListItemText
              className="filter-option-title"
              primary={
                <CheckedCount
                  open={openDate}
                  checkedNum={startDate || endDate}
                  filterType="Uploaded date"
                />
              }
            />
          </ListItemButton>

          <Collapse in={openDate} timeout="auto">
            <Box className="dateFiled">
              <Box>
                <Typography className="date_lable">From date</Typography>
                <input
                  type="date"
                  placeholder="From Date"
                  value={startDate}
                  style={{
                    padding: "7px",
                    border: "1px solid #DFDFDF",
                    borderRadius: "6px",
                    width: "120px",
                    fontSize: "12px",
                  }}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Box>
              <Box sx={{marginTop:'10px',}}>
                <Typography className="date_lable">To date</Typography>
                <input
                  type="date"
                  placeholder="To Date"
                  value={endDate}
                  min={startDate}
                  style={{
               
                    padding: "7px",
                    border: "1px solid #DFDFDF",
                    borderRadius: "6px",
                    width: "120px",
                    fontSize: "12px",
                  }}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Box>
            </Box>
          </Collapse>
        </List>
      </Box>
      <Box className="filterBottom">
        <Divider />
        <Box className="filterFooter">
          {isSelected >= 1 ? (
            <Button className="clear-selection" onClick={handleClearFilter}>
              Clear selection
            </Button>
          ) : (
            ""
          )}
          <Button
            className="filter-apply"
            sx={{ width: "49px" }}
            variant="contained"
            onClick={handleApplyAssetfilter}
          >
            Apply
          </Button>
        </Box>
      </Box>
    </DrawerContainer>
  );
};
export default CustomFilter;
