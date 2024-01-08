import React, { useState, useContext, createContext, useEffect } from "react";
import {
  getAllTasks,
  getSignedURLOnUpload,
  updateUploadedFile,
  getTaskById,
} from "../../controllers/tasks";
import { TaskListI, TaskFileInfoI } from "../types/tasks";
import { useAuth } from "../auth/useAuth";
import { useSnackBar } from "../Snackbar";
import { generateRandomID } from "../../helpers";
interface ProvideTaskI {
  children: React.ReactNode;
}

const taskContex = createContext<any>(null);

export const useTask = () => useContext(taskContex);

function useProvideTask() {
  const { currentTab, setSelectedfigmaFrame } = useAuth();
  const { ShowApiErrorSnackBar, ShowSuccessSnackBar } = useSnackBar();

  const [taskList, setTaskList] = useState<TaskListI[] | any>([]);
  const [isTaskLoading, setIsTaskLoading] = useState(false);
  const [taskPage, setTaskPage] = useState(0);
  const [taskPageSize, setTaskPageSize] = useState(10);
  const [totalResultTask, setTotalResultTask] = useState("");
  const [searchedForTask, setSearchedForTask] = useState("");
  const [sortTasksByType, setSortTasksByType] = useState("");
  const [taskType, setTaskType] = useState("");
  const [projectName, setProjectName] = useState("");
  const [loadMoreData, setLoadMoreData] = useState(false);
  const [isRevision, setIsRevision] = useState(false);
  const [revesionFileId, setRevisionFileId] = useState("");
  const [openSelectedTask, setOpenSelectedTask] = useState(false);
  const [openUploadFile, setOpenUploadFile] = useState(false);
  const [checkFrame, setCheckFrame] = useState(false);
  const [checkFile, setCheckFile] = useState(false);
  const [openFileRevision, setOpenFileRevision] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [isSingleTaskLoading, setIsSingleTaskLoading] = useState(false);
  const [isFileRemoveLoading, setIsFileRemoveLoading] = useState(false);
  const [isFilesUploaded, setIsFielsUploaded] = useState(false);
  const [uploadFile, setUploadFile] = useState<any[]>([]);
  const [isImageFromFigma, setIsImageFromFigma] = useState(false);
  const [figmaTaskFile, setFigmaTaskFile] = useState<any[]>([]);
  const [fileKeysList, setFileKeyList] = useState("");
  const [isImageUpoladed, setIsImageUploaded] = useState(false);

  /**
   * To get list of task as per selected TAB
   */
  const task = async () => {
    try {
      setIsTaskLoading(true);
      const response = await getAllTasks({
        sortId: sortTasksByType,
        size: taskPageSize,
        order: "DESCENDING",
        page: taskPage,
        searchBy: searchedForTask,
        taskType: taskType,
        projectName: projectName,
      });
      setTotalResultTask(response.data.metaData.totalSize);
      const data = response.data.data;
      if (loadMoreData) {
        setTaskList([...taskList, ...data]);
      } else {
        setTaskList(data);
      }
    } catch (err) {
      ShowApiErrorSnackBar(err);
    }
    setIsTaskLoading(false);
  };

  /**
   * To get single task based on the ID
   */

  const getOneTask = async () => {
    setIsSingleTaskLoading(true);
    try {
      const response = await getTaskById({
        taskId: selectedTaskId,
      });
      setSelectedTask(response.data);
    } catch (err) {
      ShowApiErrorSnackBar(err);
    }
    setIsSingleTaskLoading(false);
  };

  useEffect(() => {
    if (selectedTaskId) {
      getOneTask();
    }
  }, [selectedTaskId]);

  /**
   * To call the api when the header type is task
   */
  useEffect(() => {
    if (currentTab === "5") {
      task();
    }
  }, [currentTab, taskPage, searchedForTask, projectName, taskType]);

  /**
   *
   * React selected task images
   */
  const readTaskImage = (image) => {
    const newTaskList: TaskFileInfoI[] = [];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = function imageLoader() {
      newTaskList.push({
        documentFileVersionId: +revesionFileId || null,
        fileType: null,
        id: null,
        image:image,
        isCurrentFile: true,
        mimeType: image?.type,
        name: image?.name,
        path: image?.path,
        showForResources: false,
        size: null,
        status: "Uploaded",
        thumbnailPresignedPath: reader.result,
        version: null,
        _id: generateRandomID(5),
      });
      setUploadFile(newTaskList);
    };
  };

  /**
   * To get the file from the input to uplaod and preview
   */
  const handleFileChange = (e) => {
    const selectedLocalImage = e.target.files[0];
    if (selectedLocalImage) {
      readTaskImage(selectedLocalImage);
    }
  };

  /**
   *
   * Upload selected image from figma
   */
  const handleUploadFigmaFiles = (image) => {
    if (image.name) {
      readTaskImage(image);
    }
  };

  useEffect(() => {
    if (isImageFromFigma) {
      handleUploadFigmaFiles(figmaTaskFile);
      setIsImageFromFigma(false);
    }
  }, [figmaTaskFile, isImageFromFigma]);

  /**
   * Fires when user clicks on continue on file upload modal and upload image to s3
   */
  const handleContinue = () => {
    if (!uploadFile) {
      setOpenFileRevision(false);
      setOpenUploadFile(false);
    } else {
      setSelectedTask({
        ...selectedTask,
        files: [...selectedTask.files, ...uploadFile].flat(),
      });
      setIsFielsUploaded(true);
      setOpenUploadFile(false);
      setOpenFileRevision(false);
      setRevisionFileId("");
      setSelectedfigmaFrame(false);
    }
  };

  /**
   * To filter only uploaded images to upload
   */
  const uploadOnlyNewFiles = uploadFile.filter((_file) => !_file.id);
  /**
   * Upload file to s3 using url and store keys
   */
  const uploadNewTaskFile = async () => {
    try {
      if (uploadFile) {
        
        const response = await getSignedURLOnUpload({
          fileName: uploadOnlyNewFiles[0].name,
          file: uploadOnlyNewFiles[0].image,
        });
        if (response) {
          setIsImageUploaded(true);
          setFileKeyList(response.data.key);
          if (isRevision) {
            ShowSuccessSnackBar("Revision uploaded successfully");
          } else {
            ShowSuccessSnackBar("File uploaded successfully");
          }
        }
      }
    } catch (err) {
      ShowApiErrorSnackBar(err);
    }
  };

  useEffect(() => {
    if (isImageUpoladed && fileKeysList) {
      let dummbyOfFiles = [...selectedTask.files];
      const lastElement = dummbyOfFiles[dummbyOfFiles.length - 1];
      lastElement.s3key = fileKeysList;
      dummbyOfFiles[dummbyOfFiles.length - 1] = lastElement;
      setSelectedTask({ ...selectedTask, files: dummbyOfFiles });
      setIsImageUploaded(false);
    }
  }, [isImageUpoladed, fileKeysList]);

  /**
   * Uplaode files to backend when user hits continue button
   */
  useEffect(() => {
    if (isFilesUploaded) {
      uploadNewTaskFile();
      setIsFielsUploaded(false);
      setCheckFile(false);
      setCheckFrame(false);
    }
  }, [isFilesUploaded]);

  /**
   * To upload s3 bucket keys to backend
   */
  const handleCompleteTask = async () => {
    /**
     * Filter only required keys to send backend
     */
    const sendFilesWithS3Key = selectedTask?.files
      ?.filter((file) => !file.id)
      .map((file) => {
        let fileTobeUploaded = {
          documentFileVersionId: file.documentFileVersionId,
          name: file.name,
          s3Key: file.s3key,
          mime_type: file?.mimeType,
        };

        if (!file.documentFileVersionId) {
          delete fileTobeUploaded.documentFileVersionId;
        }

        return fileTobeUploaded;
      });
    try {
      if (sendFilesWithS3Key) {
        const response = await updateUploadedFile({
          taskId: selectedTaskId,
          data: {
            upload: {
              files: sendFilesWithS3Key,
            },
          },
        });
        if (response) {
          setSelectedTask(null);
          setUploadFile([]);
          setFileKeyList(null);
          setIsRevision(false);
          setOpenSelectedTask(false);
          task();
          ShowSuccessSnackBar(`"${selectedTask.projectName}" task completed.`);
        }
      }
    } catch (err) {
      ShowApiErrorSnackBar(err);
    }
  };

  /**
   * To replace or remove uploaded files
   */
  const handleControlAddedFiles = (_task) => {
    if (_task._id) {
      setIsFileRemoveLoading(true);
      const filterSelectedTask = selectedTask.files.filter((file) => {
        return file._id !== _task._id;
      });
      setSelectedTask({
        ...selectedTask,
        files: filterSelectedTask.flat(),
      });
    }
    setIsFileRemoveLoading(false);
  };

  return {


    openSelectedTask,
    setOpenSelectedTask,
    isTaskLoading,
    taskList,
    taskPage,
    setTaskPage,
    taskPageSize,
    setTaskPageSize,
    totalResultTask,
    setSortTasksByType,
    searchedForTask,
    setSearchedForTask,
    taskType,
    setTaskType,
    setProjectName,
    setLoadMoreData,
    isSingleTaskLoading,
    selectedTaskId,
    setSelectedTaskId,
    selectedTask,
    setSelectedTask,

    /**
     * File uploads
     */
    checkFrame,
    setCheckFrame,
    checkFile,
    setCheckFile,
    openUploadFile,
    setOpenUploadFile,
    openFileRevision,
    setOpenFileRevision,
    isFileRemoveLoading,
    handleControlAddedFiles,
    uploadFile,
    setUploadFile,
    handleFileChange,
    handleContinue,
    fileKeysList,
    handleCompleteTask,
    isRevision,
    setRevisionFileId,
    setIsRevision,

  

    /**
     * Figma file control
     */
    isImageFromFigma,
    setIsImageFromFigma,
    figmaTaskFile,
    setFigmaTaskFile,
  };
}

export function ProvieTasks({ children }: ProvideTaskI) {
  const auth = useProvideTask();
  return <taskContex.Provider value={auth}>{children}</taskContex.Provider>;
}
