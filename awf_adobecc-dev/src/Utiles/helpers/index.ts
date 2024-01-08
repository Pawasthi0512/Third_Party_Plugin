import LocalStorageService from "../localStroage";
import {
  TASK_SERVER_URL,
  GUIDELINE_SERVER_URL,
  REDIRECT_SERVER_URL,
} from "../constants";
import defaultImage from "../../Assets/Images/defaultImage.png";
import csInterface from "../../CSInterface.js"

/**
 * To get he token from the local storage
 */
const idToken = LocalStorageService.get_Id_Token();
const accessToken = LocalStorageService.get_Access_Token();
const tenantId = LocalStorageService.get_Tenant_Id();



/**
 * To download and open file in new tab of task section
 */
const handleDownloadFile = ({ fileId, version }) => {
  csInterface.openURLInDefaultBrowser(
    `${TASK_SERVER_URL}/files/${fileId}/download?idToken=${idToken}&accessToken=${accessToken}&tenant=${tenantId}&versionId=${version}`
  );
};

/**
 * To preview the task list thumbnail images
 */
const handlePreviewImage = ({ imageId, version }) => {
  return `${TASK_SERVER_URL}/files/${imageId}/thumbnail?idToken={${idToken}}&accessToken={${accessToken}}&tenant={${tenantId}}&versionId=${version}`;
};

/**
 * To preview the assets tab images
 */
const handlePreviewAssetsImage = ({ fileId }) => {
  return `${GUIDELINE_SERVER_URL}/file/${fileId}/thumbnail?idToken=${idToken}&accessToken=${accessToken}&tenant=${tenantId}`;
};

/**
 * To preview the logo's from logo tab
 */
const handlePreviewLogo = ({ sectionId, logoId }) => {
  return `${GUIDELINE_SERVER_URL}/section/${sectionId}/logo/${logoId}/download?idToken=${idToken}&accessToken=${accessToken}&tenant=${tenantId}`;
};

/**
 * Get Date and Time formate
 * @param dateData Asset last modified date
 * @returns
 */
const getDateAndMonthFormate = (dateData) => {
  const monthArr = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const d = new Date(dateData);
  const date = d.getDate();
  const month = d.getMonth();
  const year = d.getFullYear();
  const time = d.getHours();
  const min = d.getMinutes();
  return `Last modified on: 
  ${date} 
  ${monthArr[month]} 
  ${year}, 
  ${time}:${min < 10 ? `0${min}` : min} 
  ${time < 12 ? "AM" : "PM"}`;
};


/* Redirect to app from file drawer
 * @param id File id
 */
const redirectToApp = (id) => {
  csInterface.openURLInDefaultBrowser(`${REDIRECT_SERVER_URL}/file-viewer/${id}`);
};

/**
 * To download and open file in new tab of task section
 */
const handleDownloadAssetFile = (fileId, fileVersionId) => {
  csInterface.openURLInDefaultBrowser(
    `${GUIDELINE_SERVER_URL}/file/${fileId}/versions/${fileVersionId}/download?idToken=${idToken}&accessToken=${accessToken}&tenant=${tenantId}`,
    "_blank"
  );
};

/**
 * To fetch data and apply to canvas in illustrator
 */
const handleIllustratorAssetFile = (fileId, fileVersionId) => {
    return `${GUIDELINE_SERVER_URL}/file/${fileId}/versions/${fileVersionId}/download?idToken=${idToken}&accessToken=${accessToken}&tenant=${tenantId}`;
};

/**
 * To generate random id using givine charactors
 */
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const generateRandomID = (length) => {
  let result: string = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

/**
 * Handle filter count
 */
const filterCount = (filterObj) => {

  function countExt(arrData){
    for(let i = 0 ; i < arrData.length ; i++){
            if(arrData[i].split(',').length > 1 ){
              for( let j = 0 ; j < arrData.length ; j ++){
                 if(arrData[j].split(",").length === 1){
                  return 2
              
                 }
              }
            }else{
              return 1
            }
        }
   
  }

  const extFilt =
    filterObj?.filter?.extension !== undefined
      ? Object.keys(filterObj.filter.extension).length === 0
        ? 0
        : countExt(filterObj.filter.extension) || 1
      : 0;
  const manualFilt =
    filterObj?.filter?.manualTags !== undefined
      ? filterObj?.filter?.manualTags.length === 0
        ? 0
        : 1
      : 0;
  const createdByFilt =
    filterObj?.filter?.createdBy !== undefined
      ? filterObj?.filter?.createdBy.length === 0
        ? 0
        : 1
      : 0;

  const colorFilt =
    filterObj?.hexcodes !== undefined
      ? filterObj?.hexcodes.length === 0
        ? 0
        : 1
      : 0;
  const rangeFilt =
    filterObj?.range !== undefined && filterObj?.range.createdAt !== undefined
      ? Object.keys(filterObj?.range).length === 0
        ? 0
        : 1
      : 0;

  const total =
    Number(extFilt) + manualFilt + createdByFilt + colorFilt + rangeFilt;

  return total;
};
/**
 * To check the file extention and show default image
 */

const showDefaultImage = (fileName) => {
  const extentionName = fileName?.split(".").pop();
  if (
    extentionName === "mp4" ||
    extentionName === "gif" ||
    extentionName === "mp3" ||
    extentionName === "mov" ||
    extentionName === "svg" ||
    extentionName === "xlsx" ||
    extentionName === "json" ||
    extentionName === "tiff" ||
    extentionName === "pptx" ||
    extentionName === "pdf" ||
    extentionName === "docx" ||
    extentionName === "bmp" ||
    extentionName === "ai" ||
    extentionName === "avif" ||
    extentionName === "html" ||
    extentionName === "csv" ||
    extentionName === ""
  ) {
    return defaultImage;
  }
};

const RegexPatterns = {
  email: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
  mobile: /^([+]\d{2})?[6-9]\d{9}$/,
};

/**
 * Function to convert into KB or MB
 */

const convertSizeToFormat = (bytes) => {
  const kb = bytes / 1000

  if(kb > 1000){
    const mb = kb / 1000
    return `${mb.toFixed(1)} MB`
  }else{
    return `${kb.toFixed(1)} KB`
  }
}

export {
  handleDownloadFile,
  handlePreviewImage,
  handlePreviewAssetsImage,
  handlePreviewLogo,
  getDateAndMonthFormate,
  generateRandomID,
  redirectToApp,
  filterCount,
  showDefaultImage,
  handleDownloadAssetFile,
  RegexPatterns,
  handleIllustratorAssetFile,
  convertSizeToFormat
};
