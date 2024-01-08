import React from "react";
import { Box, Divider, Popover, styled, Typography } from "@mui/material";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Assets from "../Assets";
import Colors from "../Colors";
import Logos from "../Logos";
import TypographyComp from "../Typography";
import Tasks from "../Tasks";
import Menu from "../../Assets/Icons/Menu";
import { useAuth, useGuidelines, useAssets } from "../../Utiles/hooks";
import {
  AssetsTabInActive,
  AssetsTabActive,
  ColorsTabInActive,
  ColorsTabActive,
  LogoTabActive,
  LogoTabInActive,
  TypoTabInactive,
  TypoTabActive,
  TaskTabInActive,
  TaskTabActive,
} from "../../Assets/Icons/TabIcons";

const BoxContainer = styled(Box)(({ theme }) => ({
  width: "428px",
  paddingLeft: "0",
  ".wrapper": {},
  ".MuiTab-root": {
    textTransform: "none",
    padding: "4px",
    fontSize: "12px",
    minHeight: "16px",
    minWidth: "63px",
    color: theme.palette.secondary.main,
    maxHeight: "35px",
  },
  ".MuiTabs-root": {
    minHeight: "41px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  ".MuiTabs-scroller": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    maxHeight: "35px",
  },

  ".MuiTabs-indicator": {
    backgroundColor: "white",
  },
  ".MuiTabPanel-root": {
    padding: "0px",
  },
  ".MuiTab-root.Mui-selected": {
    color: theme.palette.primary.light,
  },
  ".switchMenu": {
    margin: "10px",
    cursor: "pointer",
  },
  ".topbarWrapper": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ".tabStyle": {
    marginRight: "5px !important",
  },
}));

const colorActionButton = {
  width: "134px",
  fontSize: "12px",
  fontWeight: "400",
  lineHeight: "16px",
  padding: "8px",
  borderRadius: "4px",
  cursor: "pointer",
  color: "#333333",
  boxShadow: "none",
  "&:hover": {
    color: "#7D69FF",
  },
};
const TopbarTop = ({ handleLogout }) => {
  const { currentTab, setCurrentTab } = useAuth();
  const { allTypes } = useGuidelines();
  const { listOfAssets } = useAssets();

  /**
   * Toggle between tabs
   */
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);

    console.log(event);
  };

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <BoxContainer>
      <Box>
        <TabContext value={currentTab}>
          <Box className="topbarWrapper">
            <TabList
              onChange={handleChange}
              aria-label="lab API tabs example"
              TabIndicatorProps={{
                style: {
                  color: "red",
                },
              }}
            >
              <Tab
                sx={{ ml: "5px", mr: "5px" }}
                icon={
                  <Box className="tabStyle">
                    {currentTab === "1" ? (
                      <AssetsTabActive />
                    ) : (
                      <AssetsTabInActive />
                    )}
                  </Box>
                }
                iconPosition="start"
                label=" Assets"
                value="1"
              />
              <Tab
                sx={{ mr: "5px" }}
                icon={
                  <Box className="tabStyle">
                    {currentTab === "2" ? (
                      <ColorsTabActive />
                    ) : (
                      <ColorsTabInActive />
                    )}
                  </Box>
                }
                iconPosition="start"
                label="Colors"
                value="2"
              />
              <Tab
                sx={{ mr: "5px" }}
                icon={
                  <Box className="tabStyle">
                    {currentTab === "3" ? (
                      <LogoTabActive />
                    ) : (
                      <LogoTabInActive />
                    )}
                  </Box>
                }
                iconPosition="start"
                label="Logos"
                value="3"
              />
              <Tab
                sx={{ mr: "5px" }}
                icon={
                  <Box className="tabStyle">
                    {currentTab === "4" ? (
                      <TypoTabActive />
                    ) : (
                      <TypoTabInactive />
                    )}
                  </Box>
                }
                iconPosition="start"
                label="Fonts"
                value="4"
              />
              <Tab
                icon={
                  <Box className="tabStyle">
                    {currentTab === "5" ? (
                      <TaskTabActive />
                    ) : (
                      <TaskTabInActive />
                    )}
                  </Box>
                }
                iconPosition="start"
                label="Tasks"
                value="5"
              />
            </TabList>
            <Box className="switchMenu" onClick={handleClick}>
              <Menu />
            </Box>
          </Box>
          <Divider />
          <TabPanel value="1">
            <Assets assetsList={listOfAssets} />
          </TabPanel>
          <TabPanel value="2">
            <Colors colorList={allTypes} />
          </TabPanel>
          <TabPanel value="3">
            <Logos logoList={allTypes} />
          </TabPanel>
          <TabPanel value="4">
            <TypographyComp typographyList={allTypes} />
          </TabPanel>
          <TabPanel value="5">
            <Tasks />
          </TabPanel>
        </TabContext>
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        elevation={1}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Box onClick={handleLogout}>
          <Typography sx={colorActionButton}>Logout</Typography>
        </Box>
      </Popover>
    </BoxContainer>
  );
};
export default TopbarTop;
