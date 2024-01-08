import {
  Box,
  Button,
  Checkbox,
  Collapse,
  Divider,
  Drawer,
  FormControlLabel,
  List,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import ArrowRight from "../../Assets/Icons/ArrowRight";
import ArrowDown from "../../Assets/Icons/ArrowDown";
import { TaskFilterType } from "../../Utiles/constants";
import InputField from "../../Primitives/InputField";
import { CloseIcon } from "../../Assets/Icons/CloseIcon";
import { SearchIcon } from "../../Assets/Icons/SearchIcon";

const DrawerContainer = styled(Drawer)(({ theme }) => ({
  padding: theme.spacing(0),
  ".MuiDrawer-paper": {
    width: "240px",
    marginTop: "83px",
    boxShadow: "none",
  },
  ".MuiTypography-root": {
    fontWeight: "400",
    fontSize: "12px",
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
  ".taskFilterCheckbox": {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transform: "scale(0.9)",
    padding: "0px 0px 0px 0px",
  },
  ".filter-option-title": {
    paddingLeft: "8px",
    color: theme.palette.primary.main,
    fontWeight: "400",
    fontSize: "12px",
  },
  ".projectSearch": {
    margin: "0px 12px",
    ".inputBox": {
      width: theme.spacing(108),
      height: theme.spacing(16),
      borderRadius: theme.spacing(4, 3, 3, 4),
      border: `1px solid ${theme.misc.borderGrey}`,
      marginBottom: "8px",
    },
  },
  ".taskFilterFooter": {
    position: "absolute",
    top: "76%",
    right: "0%",
    left: "0%",
  },
  ".taskFilterButton": {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "8px",
  },
  ".clearSection": {
    fontsize: "12px !important",
    textTransform: "none",
    color: theme.palette.primary.main,
    lineHeight: "16px",
    padding: "8px",
    margin: "4px",
    fontWeight: "500",
    boxShadow: "none",
    textDecoration: "underline !important",
    minWidth: "89px",
  },
  ".apply": {
    textTransform: "none",
    background: theme.palette.primary.main,
    color: theme.palette.info.main,
    borderRadius: "8px",
    lineHeight: "16px",
    padding: "8px",
    // margin: "4px",
    fontWeight: "500",
    fontSize: "12px",
    boxShadow: "none",
    minWidth: "49px",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  ".TaskFormControler": {
    color: theme.palette.primary.main,
    fontSize: "12px",
    fontWeight: "400",
    lineHeight: "16px",
    paddingTop: "4px",
  },
  ".task_typeWrapper": {
    display: "flex",
    flexDirection: "column",
    marginLeft: theme.spacing(8),
  },
  ".PrivateSwitchBase-root":{
    color:'#333333',
    borderColor:'grey !important'
  }
}));

const CheckedCount = ({ checkedNum }) => {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography sx={{ paddingRight: "4px" }}>Task Type</Typography>
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

const TaskFilter = ({
  openFilterDrawer,
  handleCloseFilter,
  handleApplyTaskFilter,
  setTotalFilter,
}) => {
  const [openTask, setOpenAssets] = React.useState(true);
  const [openProject, setOpenProject] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState("");
  const [selectedType, setSelectedType] = React.useState([]);
  const [filterCount, setFilterCount] = React.useState(null);

  const handleOpenTaskType = () => {
    setOpenAssets(!openTask);
  };
  const handleOpenProject = () => {
    setOpenProject(!openProject);
  };

  /**
   * Control task filter type checkboxes
   */
  const handleChangeTaskFilter = (e) => {
    if (!!e.target.checked) {
      setSelectedType([...selectedType, e.target.value]);
    } else {
      const filtertedType = selectedType.filter((name) => {
        return name !== e.target.value;
      });
      setSelectedType([...filtertedType]);
    }
  };

  /**
   * To get input company name
   */
  const handleSearchedProject = (e) => {
    setSelectedProject(e.target.value);
  };

  /**
   * To suply data to higher component as props
   */
  const handleSupplyFilter = () => {
    if (selectedType || selectedProject) {
      const typeCount = selectedType?.length > 0 ? 1 : 0;
      const projectCount = selectedProject ? 1 : 0;
      setFilterCount(typeCount + projectCount);
    }
    handleApplyTaskFilter(selectedType, selectedProject);
    handleCloseFilter();
  };

  React.useEffect(() => {
    if (filterCount || selectedProject) {
      setTotalFilter(filterCount);
    }
  }, [filterCount, selectedProject]);

  /**
   * To clear all the filter options
   */
  const handleClearFilter = () => {
    setTotalFilter(0);
    setSelectedType([]);
    setSelectedProject("");
    handleApplyTaskFilter();
    setFilterCount(null);
  };

  return (
    <DrawerContainer
      sx={{ width: "250px" }}
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
      <List
        sx={{
          width: "100%",
          mixWidth: 250,
          bgcolor: "background.paper",
          p: "0",
        }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton
          onClick={handleOpenTaskType}
          sx={{ padding: "12px 10px", "&:hover": { background: "none" } }}
        >
          {openTask ? <ArrowDown /> : <ArrowRight />}
          <ListItemText
            sx={{ fontWeight: "400", fontSize: "12px" }}
            className="filter-option-title"
            primary={<CheckedCount checkedNum={selectedType.length} />}
          />
        </ListItemButton>
        <Collapse in={openTask} timeout="auto">
          <Box className="task_typeWrapper">
            {TaskFilterType.map((taskType) => {
              const checkedItems = !!selectedType.find(
                (name) => name === taskType.name
              );
              return (
                <FormControlLabel
                  sx={{
                    lineHeight: "16px",
                    padding: "0px",
                    textTransform: "capitalize",
                  }}
                  className="TaskFormControler"
                  control={
                    <Checkbox
                      checked={checkedItems}
                      name={taskType.name}
                      size="small"
                      className="taskFilterCheckbox"
                      onChange={handleChangeTaskFilter}
                      value={taskType.name}
                      sx={{
                        color: "#DFDFDF !important",
                        "&.Mui-checked": {
                          color: "#333333 !important",
                        },
                        "&:hover": {
                          color: "#333333 !important",
                        },
                      }}
                    />
                  }
                  label={taskType.name.toLowerCase()}
                />
              );
            })}
          </Box>
        </Collapse>

        <ListItemButton
          onClick={handleOpenProject}
          sx={{ padding: "12px 10px", "&:hover": { background: "none" } }}
        >
          {openProject ? <ArrowDown /> : <ArrowRight />}
          <ListItemText
            sx={{ fontWeight: "400", fontSize: "12px" }}
            className="filter-option-title"
            primary="Project Name"
          />
        </ListItemButton>
        <Collapse in={openProject} timeout="auto">
          <Box className="projectSearch">
            <InputField
              placeholder="Enter project name"
              handleInputField={handleSearchedProject}
              value={selectedProject}
              inputIcon={
                !selectedProject ? (
                  <SearchIcon />
                ) : (
                  <CloseIcon onClick={() => setSelectedProject("")} />
                )
              }
              isInputIcon
              inputType="text"
            />
          </Box>
        </Collapse>
      </List>
      <Box className="taskFilterFooter">
        <Divider />
        <Box className="taskFilterButton">
          {(selectedProject || selectedType.length) ? (
            <Button className="clearSection" sx={{fontSize:'12px'}} onClick={handleClearFilter}>
              Clear selection
            </Button>
          ):('')}
          <Button className="apply" onClick={handleSupplyFilter}>
            Apply
          </Button>
        </Box>
      </Box>
    </DrawerContainer>
  );
};
export default TaskFilter;
