import LocalStorageService from "../localStroage";
import { getApi, postApi } from "../config/api";
import { GUIDELINE_SERVER_URL, TASK_SERVER_URL } from "../constants";

const config = {
  headers : {
    tenant : `${LocalStorageService.get_Tenant_Id()}`,
  }
}


/**
 * To get the assets list
 */
export const getListOfAssets = ({
  from = 0,
  size = 24,
  filterObj,
}: {
  from: number;
  size: number;
  filterObj: any;
}) =>
  postApi(
    `${GUIDELINE_SERVER_URL}/elastic/file/filter?from=${from}&size=${size}`,
    filterObj,
    config
  );

/**
 *
 * @returns Get assets by id
 */
export const getAssetById = ({ fileId }: { fileId: string }) =>
  getApi(`${GUIDELINE_SERVER_URL}/file/${fileId}` , config);

/**
 *
 * @returns user list for filter
 */
export const getUserList = () =>
  getApi(`${TASK_SERVER_URL}/users?per_page=200`, config);

/**
 * Returns Tags list
 */

export const getTagList = () =>
  getApi(`${GUIDELINE_SERVER_URL}/elastic/file/suggestion?text=poster` , config);

/**
 * Upload the asset file
 * @param uploadData
 * @returns
 */

/**
 * File upload aws s3 and get keys
 */

export const getSignedURLOnUpload = async ({
  fileName,
  file,
  fileUUID,
}: {
  fileName: string;
  file: any;
  fileUUID: any;
}) => {
  const url = await getApi(
    `${GUIDELINE_SERVER_URL}/file/upload-dam-url?name=${fileName}&fileUUID=${fileUUID}`,
    config
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

export const updateUploadedS3file = ({ uploadData }: { uploadData: any }) =>
  postApi(`${GUIDELINE_SERVER_URL}/file`, uploadData , config);
/**
 * Upload the asset file
 * @param uploadData
 * @returns
 */

export const postAssetFile = (uploadData) =>
  postApi(`${GUIDELINE_SERVER_URL}/file`, uploadData , config);

/**
 * Add and Remove fav asset file
 */
export const postAddRemoveFav = (favourite) =>
  postApi(`${GUIDELINE_SERVER_URL}/favourite`, favourite , config);
