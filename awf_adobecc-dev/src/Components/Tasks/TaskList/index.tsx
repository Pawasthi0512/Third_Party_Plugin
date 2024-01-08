import { Box, styled, Typography } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import React from "react";
import TaskListUpload from "../../../Assets/Icons/TaskListUpload";
import dayjs from "dayjs";

const BoxContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid #DFDFDF",
  ".taskListUploadIcon": {
    width: "24px",
    height: "24px",
    background: theme.palette.secondary.contrastText,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    marginLeft: "8px",
  },
  ".taskListWrapper1": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ".taskListWrapper2": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ".taskUploadTitle": {
    fontWeight: "400",
    fontSize: "12px",
    color: theme.palette.primary.main,
  },
  ".taskUploadDesc": {
    fontWeight: "400",
    fontSize: "10px",
    color: theme.palette.secondary.light,
  },
  ".taskListBox": {
    padding: "12px 8px",
  },
  ".taskListDueDate": {
    width: "88px",
    margin: "15px 8px",
    fontSize: "12px",
    fontWeight: "400",
  },
  ".taskArrowForward": {
    width: "16px",
    height: "16px",
    margin: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.warning.dark,
    cursor: "pointer",
  },
}));

const TaskList = ({ title, subTitle, dueDate }) => {
  return (
    <BoxContainer>
      <Box className="taskListWrapper1">
        <Box className="taskListUploadIcon">
          <TaskListUpload />
        </Box>
        <Box className="taskListBox">
          <Typography className="taskUploadTitle">{title}</Typography>
          <Typography className="taskUploadDesc">{subTitle}</Typography>
        </Box>
      </Box>
      <Box className="taskListWrapper2">
        <Typography
          className="taskListDueDate"
          sx={(theme) => ({
            color: dayjs().isBefore(dayjs(dueDate))
              ? theme.misc.lightYellow
              : theme.palette.secondary.dark
          })}
        >
          {dayjs(dueDate).format("DD MMM YYYY")}
        </Typography>
        <Box className="taskArrowForward">
          <ChevronRightIcon />
        </Box>
      </Box>
    </BoxContainer>
  );
};
export default TaskList;
