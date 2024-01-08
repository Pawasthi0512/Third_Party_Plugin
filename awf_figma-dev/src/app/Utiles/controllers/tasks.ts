import { getApi, postApi } from "../config/api";
import { TASK_SERVER_URL, API } from "../constants";

/**
 * To list of tasks
 */
export const getAllTasks = ({
  size = 100,
  sortId,
  order,
  page,
  searchBy = "",
  taskType = "",
  projectName = "",
}: {
  size?: number;
  sortId?: string;
  order?: string;
  page: number;
  searchBy: string;
  taskType: string;
  projectName: string;
}) =>
  getApi(
    `${TASK_SERVER_URL}/${API.taskInstances}?size=${size}&page=${page}&sort=${sortId}&order=${order}&searchBy=${searchBy}&taskType=${taskType}&projectName=${projectName}`
  );

/**
 * To get one task as per the id
 */
export const getTaskById = ({ taskId }: { taskId: any }) =>
  getApi(`${TASK_SERVER_URL}/v2/${API.taskInstances}/${taskId}`);

/**
 * To download files of tasks
 */
export const downloadFile = ({
  fileId,
  token,
  version,
}: {
  fileId: number;
  token: string;
  version: number;
}) =>
  getApi(
    `${TASK_SERVER_URL}/${API.controlFiles}/${fileId}/download?token=${token}&versionId=${version}`
  );

/**
 * To get signed URL from the s3 bucket and upload file
 */
export const getSignedURLOnUpload = async ({
  fileName,
  file,
}: {
  fileName: string;
  file: any;
}) => {
  const url = await getApi(
    `${TASK_SERVER_URL}/${API.controlFiles}/upload-url?name=${fileName}`
  );
  if (url) {
    fetch(`${url.data.url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      body: file,
    });
  }

  return url;
};

/**
 * To upload s3 keys to backend
 */
export const updateUploadedFile = ({
  taskId,
  data,
}: {
  taskId: string;
  data: any;
}) => {
  return postApi(
    `${TASK_SERVER_URL}/v2/task-instances/${taskId}/complete`,
    data
  );
};
