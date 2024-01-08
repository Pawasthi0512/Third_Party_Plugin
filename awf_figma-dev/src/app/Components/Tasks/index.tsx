import { Box, Divider, styled, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
// import FilterLogo from "../../Assets/Icons/FilterLogo";
// import TaskFilter from "../../Primitives/TaskFilter";
import TaskModel from "../../Primitives/TaskModel";
import TaskList from "./TaskList";
import InputField from "../../Primitives/InputField";
import { useTask } from "../../Utiles/hooks";
import { SearchIcon } from "../../Assets/Icons/SearchIcon";
import { useDebounce } from "../../Utiles/hooks/customHooks";
import NotFound from "../../Primitives/NotFound";
import { CloseIcon } from "../../Assets/Icons/CloseIcon";

const BoxContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
  ".searcBar": {
    ".inputBox": {
      width: theme.spacing(200),
      height: theme.spacing(16),
      borderRadius: theme.spacing(2, 0, 0, 2),
      border: `1px solid ${theme.misc.borderGrey}`,
      marginBottom: "8px",
      marginLeft:'8px'
    },
  },
  ".task-filter-logo": {
    border: "1px solid #DFDFDF",
    borderRadius: "0px 4px 4px 0px",
    width: "67px",
    height: "30px",
    cursor: "pointer",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  ".taskWrapper1": {
    width: "400",
    padding: "0px,2px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: theme.spacing(4),
  },
  ".taskWrapper2": {
    padding: "12px 8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: theme.palette.info.main,
  },
  ".taskWrapper3": {
    height: theme.spacing(240),
    overflowY: "scroll",
  },
  ".taskName": {
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: "16px",
    color: theme.palette.primary.main,
  },
  ".dueDate": {
    width: "128px",
    fontSize: "12px",
    fontWeight: "500",
    lineHeight: "16px",
    color: theme.palette.primary.main,
    textAlign: "left",
  },
  ".filterCounts": {
    display: "flex",
    justifyContent: "center",
    background: theme.palette.warning.main,
    width: theme.spacing(11.5),
    borderRadius: theme.spacing(6),
    fontSize: theme.spacing(6),
    marginLeft: theme.spacing(2),
  },
  ".countText": {
    fontSize: theme.spacing(6),
  },
}));

const Tasks = () => {
  const {
    // isTaskLoading,
    isSingleTaskLoading,
    setSelectedTaskId,
    selectedTask,
    openSelectedTask,
    setOpenSelectedTask,
    taskList,
    taskPage,
    totalResultTask,
    setTaskPage,
    taskType,
    // setTaskType,
    // setProjectName,
    handleFileChange,
    handleContinue,
    handleCompleteTask,
    searchedForTask,
    setSearchedForTask,
    setLoadMoreData,
  } = useTask();

  // const [openFilterDrawer, setOpenFilterDrawer] =
  //   React.useState<boolean>(false);

  const [searchForTask, setSearchForTask] = useState("");
  // const [totalFilter] = useState(0);

  // const handleOpenFilterDrawer = () => setOpenFilterDrawer(true);

  // const handleCloseFilterDrawer = () => {
  //   setOpenFilterDrawer(false);
  // };

  /**
   * Open Task upload model
   * @param selectedTaks
   */
  const handleOpenDialog = (selectedTaks) => {
    setSelectedTaskId(selectedTaks.taskId);
    setOpenSelectedTask(true);
  };

  /**
   * Open Task upload model
   */
  const handleCloseDialog = () => {
    setOpenSelectedTask(false);
  };

  /**
   * Deboucne to prevent delay in api call and search
   */
  const debouncedValue = useDebounce(searchForTask, 300);

  /**
   * To call the api as per the search value
   */
  useEffect(() => {
    setLoadMoreData(false);
    setTaskPage(0);
    setSearchedForTask(debouncedValue);
  }, [debouncedValue]);

  /**
   * Apply's the filter as per the selected filters
   */
  // const handleApplyTaskFilter = (taskType, projectName) => {
  //   setLoadMoreData(false);
  //   setTaskType(taskType);
  //   setProjectName(projectName);
  //   setTaskPage(0);
  // };

  /**
   * Infity scroll to list task list
   */
  const handleScroll = (e: any) => {
    const btm =
      e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight + 10;
    if (btm && taskList.length < totalResultTask) {
      setLoadMoreData(true);
      setTaskPage(taskPage + 1);
    }
  };

  /**
   * To filter tasks based on the only upload type and which has taskname
   */
  const filteredTaskList = taskList.filter((task_) => {
    if (task_.taskName && task_.taskType === "UPLOAD") {
      return task_;
    }
  });


  return (
    <>
      <BoxContainer>
        <Box className="taskWrapper1">
          <Box className="searcBar">
            <InputField
              placeholder="Search Tasks "
              handleInputField={(e) => setSearchForTask(e.target.value)}
              value={searchForTask}
              inputIcon={
                searchForTask?.length === 0 ? (
                  <SearchIcon />
                ) : (
                  <CloseIcon onClick={() => setSearchForTask("")} />
                )
              }
              isInputIcon
              inputType="text"
            />
          </Box>
          {/* <Box className="task-filter-logo"
          //  onClick={handleOpenFilterDrawer}
           >
            <Box>
              <FilterLogo />
            </Box>
            {totalFilter > 0 && (
              <Box className="filterCounts">
                <Typography className="countText">0{totalFilter}</Typography>
              </Box>
            )}
          </Box> */}
        </Box>
        <Divider />
        {/* {isTaskLoading ? (
          <Loader />
        ) : ( */}
        <Box>
          {!filteredTaskList.length ? (
            <NotFound
              title={
                searchedForTask || taskType
                  ? "No results found!"
                  : "You have no pending tasks!"
              }
              description={
                (searchedForTask || taskType) &&
                "Try adjusting your search or filters to find what you’re looking for"
              }
              type="search"
            />
          ) : (
            <Box>
              <Box className="taskWrapper2">
                <Typography className="taskName">Task Name</Typography>
                <Typography className="dueDate">Due Date</Typography>
              </Box>
              <Divider />
              <Box className="taskWrapper3" onScroll={handleScroll}>
                {filteredTaskList.map((task) => {
                  return (
                    <Box
                      onClick={() => handleOpenDialog(task)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TaskList
                        key={task.taskId}
                        title={task.taskName}
                        subTitle={task.projectName}
                        dueDate={task.dueDate}
                      />
                    </Box>
                  );
                })}
              </Box>
            </Box>
          )}
        </Box>
        {/* )} */}
      </BoxContainer>
      {openSelectedTask && selectedTask && (
        <TaskModel
          isLoading={isSingleTaskLoading}
          taskDetails={selectedTask}
          open={openSelectedTask}
          close={handleCloseDialog}
          fullScreen="true"
          handleFileChange={handleFileChange}
          handleContinue={handleContinue}
          handleCompleteTask={() => handleCompleteTask(selectedTask)}
        />
      )}
      {/* <TaskFilter
        handleApplyTaskFilter={handleApplyTaskFilter}
        openFilterDrawer={openFilterDrawer}
        handleCloseFilter={handleCloseFilterDrawer}
        setTotalFilter={setTotalFilter}
      /> */}
    </>
  );
};
export default Tasks;
