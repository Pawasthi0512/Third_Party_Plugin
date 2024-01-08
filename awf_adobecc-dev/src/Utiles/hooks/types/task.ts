export interface TaskFileInfoI {
  createdAt?: string;
  createdBy?: string;
  documentFileVersionId: number;
  fileType: null;
  id: number;
  isCurrentFile: boolean;
  mimeType: string;
  name: string;
  path: string;
  showForResources: boolean;
  size: number;
  status: string;
  thumbnailPresignedPath: string | any;
  version: number;
  _id?:string;
  image: any;
}

export interface TaskListI {
  files: TaskFileInfoI[];
  dueDate: string;
  projectName: string;
  taskId: string;
  taskName: string;
  taskType: string;
  fileInfoResponse: TaskFileInfoI[];
}
