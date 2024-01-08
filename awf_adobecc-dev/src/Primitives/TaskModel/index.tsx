import {
  Box,
  Button,
  Dialog,
  Divider,
  styled,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import TaskListUpload from "../../Assets/Icons/TaskListUpload";
import Close from "@mui/icons-material/Close";
import ArrowBack from "../../Assets/Icons/ArrowBack";
import FileComp from "./FileComp";
import ReferenceComp from "./ReferenceComp";
import dayjs from "dayjs";
import { TaskFileInfoI } from "../../Utiles/hooks/types/task";
import UploadFile from "./UploadFile";
import { useTask } from "../../Utiles/hooks";
import Loader from "../../Primitives/Loader";

const BoxContainer = styled(Dialog)(({ theme }) => ({
  padding: theme.spacing(0),
  ".taskModelContainer1": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "12px 8px",
  },
  ".taskModelUpper": {
    display: "flex",
    alignItems: "center",
  },
  ".taskModelBack": {
    width: "16px",
    height: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  ".taskModelAll": {
    fontWeight: "500",
    fontSize: "12px",
    color: theme.palette.primary.main,
    paddingLeft: "8px",
  },
  ".taskModelClose": {
    width: "16px",
    height: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },
  ".taskModelContainer2": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "46px",
    marginBottom: "8px",
  },
  ".taskModelWrapper1": {
    display: "flex",
    alignItems: "center",
  },
  ".taskModelUploadIcon": {
    width: "24px",
    height: "24px",
    background: theme.palette.secondary.contrastText,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "4px",
    marginLeft: "8px",
  },
  ".taskModelBox": {
    padding: "12px 8px",
  },
  ".taskModelTitle": {
    fontWeight: "400",
    fontSize: "12px",
    color: theme.palette.primary.main,
  },
  ".taskModelUploadDesc": {
    fontWeight: "400",
    fontSize: "10px",
    color: theme.palette.secondary.light,
  },
  ".taskModelDue": {
    fontWeight: "400",
    fontSize: "12px",
    padding: "4px 8px",
    color: theme.palette.warning.contrastText,
    background: theme.palette.error.main,
    margin: "11px 8px",
  },
  ".taskModelContainer3": {
    height: "630px",
    overflowY: "scroll",
  },
  ".taskModelTabs": {
    display: "flex",
    alignItems: "center",
  },
  ".taskModelFiles": {
    fontWeight: "400",
    fontSize: "12px",
    margin: "0px 12px 8px 8px",
    cursor: "pointer",
  },
  ".taskModelReference": {
    fontWeight: "400",
    fontSize: "12px",
    margin: "0px 12px 8px 0px",
    cursor: "pointer",
  },
  ".taskModelContainer4": {
    position: "fixed",
    bottom: 0,
    width: "100%",
    right: "10px",
    background: "white",
  },
  ".taskModelFooter": {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    padding: "8px",
  },
  ".taskModelUpload": {
    boxShadow: "none",
    border: "1px solid #333333",
    borderRadius: "8px",
    textTransform: "none",
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "16px",
    padding: "8px",
    color: theme.palette.primary.main,
    marginRight: "8px",
  },
  ".taskModelCompleteTask": {
    boxShadow: "none",
    borderRadius: "8px",
    textTransform: "none",
    fontWeight: "500",
    fontSize: "12px",
    lineHeight: "16px",
    padding: "8px",
    color: theme.palette.info.main,
    background: theme.palette.primary.main,
  },
}));
const TaskModel = ({
  open,
  close,
  fullScreen,
  isLoading,
  taskDetails,
  handleFileChange,
  handleContinue,
  handleCompleteTask,
}) => {
  const {
    isFileRemoveLoading,
    openUploadFile,
    setOpenUploadFile,
    setRevisionFileId,
    setIsRevision,
    setUploadFile,
    handleControlAddedFiles,
    openFileRevision,
    setOpenFileRevision,
  } = useTask();

  const [openFile, setOpenFile] = useState(true);
  const [openReference, setOpenReference] = useState(false);

  const handleFileTab = () => {
    setOpenFile(true);
    setOpenReference(false);
  };

  const handleReferenceTab = () => {
    setOpenReference(true);
    setOpenFile(false);
  };

  /**
   * To calculate day diffrence between due date
   */
  const calculateDueDate = (dueDate) => {
    const date = dayjs(dueDate);
    const diffDate = date.diff(dayjs(), "day");
    if (Math.sign(diffDate) === -1) {
      return "Expired";
    } else {
      return `Due in ${diffDate} days`;
    }
  };

  /**
   * Handles open upload model
   */
  const handleOpenUploadModal = () => {
    setRevisionFileId("");
    setIsRevision(false);
    setUploadFile([]);
    setOpenUploadFile(true);
  };

  const handleClose = () => {
    setRevisionFileId("");
    setUploadFile([]);
    setOpenFileRevision(false);
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <BoxContainer open={open} onClose={close} fullScreen={fullScreen}>
          <Box className="taskModelContainer1">
            <Box className="taskModelUpper">
              <Box className="taskModelBack" onClick={close}>
                <ArrowBack />
              </Box>
              <Typography className="taskModelAll">All Tasks</Typography>
            </Box>
            <Box className="taskModelClose" onClick={close}>
              <Close sx={{ fontSize: "16px" }} />
            </Box>
          </Box>
          <Divider />
          <Box className="taskModelContainer2">
            <Box className="taskModelWrapper1">
              <Box className="taskModelUploadIcon">
                <TaskListUpload />
              </Box>
              <Box className="taskModelBox">
                <Typography className="taskModelTitle">
                  {taskDetails.taskName}
                </Typography>
                <Typography className="taskModelUploadDesc">
                  {taskDetails.projectName}
                </Typography>
              </Box>
            </Box>
            <Typography className="taskModelDue">
              {calculateDueDate(taskDetails.dueDate)}
            </Typography>
          </Box>
          <Box className="taskModelContainer3">
            <Box className="taskModelTabs">
              <Typography
                className="taskModelFiles"
                sx={
                  openFile === true
                    ? { color: "#7D69FF" }
                    : { color: "#A5A5A5" }
                }
                onClick={handleFileTab}
              >
                Files
              </Typography>
              <Typography
                className="taskModelReference"
                sx={
                  openReference === true
                    ? { color: "#7D69FF" }
                    : { color: "#A5A5A5" }
                }
                onClick={handleReferenceTab}
              >
                Reference files
              </Typography>
            </Box>
            <Divider />
            {openFile && (
              <Box>
                {taskDetails?.files.map((_task: TaskFileInfoI) => {
                  if (_task.isCurrentFile) {
                    return (
                      <>
                        {isFileRemoveLoading ? (
                          <Loader />
                        ) : (
                          <FileComp
                            key={_task?.id}
                            fileName={_task?.name}
                            version={_task?.version}
                            status={_task?.status}
                            fileId={_task?.id}
                            revisionId={_task.documentFileVersionId}
                            thumbnailPath={_task.thumbnailPresignedPath}
                            _id={_task?._id}
                            handleControlAddedFiles={() =>
                              handleControlAddedFiles(_task)
                            }
                          />
                        )}
                      </>
                    );
                  }
                })}
              </Box>
            )}
            {openReference && (
              <Box>
                {taskDetails?.files.map((task: TaskFileInfoI) => {
                  if (!task.isCurrentFile && task.showForResources) {
                    return (
                      <ReferenceComp
                        key={task.id}
                        fileName={task.name}
                        version={task.version}
                        status={task.status}
                        fileId={task.id}
                        // imageId={task.thumbnailPresignedPath}
                      />
                    );
                  }
                })}
              </Box>
            )}
          </Box>
          <Box className="taskModelContainer4">
            <Divider />
            <Box className="taskModelFooter">
              <Button
                onClick={handleOpenUploadModal}
                variant="outlined"
                className="taskModelUpload"
                disabled={
                  openReference || taskDetails.flowTask.type !== "UPLOAD"
                }
              >
                Upload File
              </Button>
              <Button
                variant="contained"
                className="taskModelCompleteTask"
                onClick={handleCompleteTask}
                disabled={
                  openReference || taskDetails.flowTask.type !== "UPLOAD"
                }
              >
                Complete task
              </Button>
            </Box>
          </Box>
        </BoxContainer>
      )}
      <UploadFile
        open={openUploadFile}
        handleFileChange={handleFileChange}
        handleContinue={handleContinue}
        handleClose={() => {
          setOpenUploadFile(false);
          setUploadFile([]);
        }}
      />
      {openFileRevision && (
        <UploadFile
          variant="revision"
          open={openFileRevision}
          handleClose={handleClose}
          handleContinue={handleContinue}
          handleFileChange={handleFileChange}
        />
      )}
    </>
  );
};
export default TaskModel;
