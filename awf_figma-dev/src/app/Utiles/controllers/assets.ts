import { getApi, postApi } from "../config/api";
import { GUIDELINE_SERVER_URL, TASK_SERVER_URL } from "../constants";

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
    filterObj
  );

/**
 *
 * @returns Get assets by id
 */
export const getAssetById = ({ fileId }: { fileId: string }) =>
  getApi(`${GUIDELINE_SERVER_URL}/file/${fileId}`);

/**
 *
 * @returns user list for filter
 */
export const getUserList = () =>
  getApi(`${TASK_SERVER_URL}/users?per_page=200`);

/**
 * Returns Tags list
 */

export const getTagList = () =>
  getApi(`${GUIDELINE_SERVER_URL}/elastic/file/suggestion?text=poster`);

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
    `${GUIDELINE_SERVER_URL}/file/upload-dam-url?name=${fileName}&fileUUID=${fileUUID}`
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
  postApi(`${GUIDELINE_SERVER_URL}/file`, uploadData);
/**
 * Upload the asset file
 * @param uploadData
 * @returns
 */

export const postAssetFile = (uploadData) =>
  postApi(`${GUIDELINE_SERVER_URL}/file`, uploadData);

/**
 * Add and Remove fav asset file
 */
export const postAddRemoveFav = (favourite) =>
  postApi(`${GUIDELINE_SERVER_URL}/favourite`, favourite);


/**
 * 
 * Download assets image selected drag and drop
 */
export const downloadAssetImage = async({
  fileId,
  fileVersionId,
  idToken,
  token,
  tenantId,
}:{
  fileId: string;
  fileVersionId: string;
  idToken: string;
  token: string;
  tenantId: string;
}) => {
  let urlData: any
  try {
    const response = await fetch(
      `${GUIDELINE_SERVER_URL}/file/${fileId}/versions/${fileVersionId}/download?idToken=${idToken}&accessToken=${token}&tenant=${tenantId}`,
      { redirect: 'follow' }
    )
    if (response.redirected) {
      const redirectUrl = response.url;
      urlData = await fetch(redirectUrl);
    }
  }catch(err){
    console.log(err)
  }
  return urlData
};
