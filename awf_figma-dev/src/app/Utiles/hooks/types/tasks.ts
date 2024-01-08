export interface UserI {
  company_id: string;
  company_name: string;
  email: string;
  first_name: string;
  id: string;
  is_active: boolean;
  last_name: string;
  name: string;
  role: string;
  tenant_id: string;
}

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
  _id?: string;
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

