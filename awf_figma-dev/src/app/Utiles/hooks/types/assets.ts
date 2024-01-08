export interface AssetsI {
    createdAt: string;
    createdBy: string;
    currentVersion: number;
    currentVersionNumber: number;
    deletedAt: null;
    downloadPath: string;
    extension: string;
    fileUUID: string;
    folderId: number;
    id: number;
    isUserFavourite: boolean;
    meta: null;
    name: string;
    resolution: string;
    s3Key: string;
    size: number;
    status: string;
    thumbnailPresignedUrl: string;
    title: string;
    type: string;
    updatedAt: string;
    updatedBy: string;
    viewPath: string;
  }
  
  export interface AssetI {
    companyId: string;
    createdAt: string;
    currentVersionNumber: number;
    description: string;
    downloadPath: string;
    extension: string;
    fileUUID: string;
    fileVersions: {
      id: number;
      createdAt: string;
      updatedAt: string;
    };
    folderId: number;
    hexcodes: any[];
    id: string;
    isCurrentVersion: boolean;
    isDeleted: boolean;
    isUserFavourite: boolean;
    labels: any[];
    manualTagList: [{ id: number; name: string; companyId: string }];
    meta: any;
    name: string;
    path: string;
    resolution: string;
    s3Key: string;
    size: number;
    status: string;
    thumbnailPresignedUrl: string;
    title: string;
    type: string;
    uploadedBy: {
      company_id: null;
      company_name: null;
      email: string;
      first_name: string;
      id: string;
      is_active: null;
      last_name: string;
      name: string;
      role: null;
    };
    viewPath: string;
  }
  