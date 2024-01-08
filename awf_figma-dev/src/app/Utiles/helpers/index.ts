import {
  TASK_SERVER_URL,
  GUIDELINE_SERVER_URL,
  REDIRECT_SERVER_URL,
} from "../constants";
import defaultImage from "../../Assets/Images/defaultImage.png";

/**
 * To get he token from the local storage
 */

/**
 * To download and open file in new tab of task section
 */
const handleDownloadFile = ({ fileId, version, token, idToken, tenantId }) => {
  window.open(
    `${TASK_SERVER_URL}/files/${fileId}/download?idToken=${idToken}&accessToken=${token}&tenant=${tenantId}&versionId=${version}`
  );
};

/**
 * To preview the task list thumbnail images
 */
const handlePreviewImage = ({ imageId, version, idToken, token, tenantId }) => {
  return `${TASK_SERVER_URL}/files/${imageId}/thumbnail?idToken=${idToken}&accessToken=${token}&tenant=${tenantId}&versionId=${version}`;
};

/**
 * To preview the assets tab images
 */
const handlePreviewAssetsImage = ({ fileId, token, idToken, tenantId }) => {
  return `${GUIDELINE_SERVER_URL}/file/${fileId}/thumbnail?idToken=${idToken}&accessToken=${token}&tenant=${tenantId}`;
};

/**
 * To preview the logo's from logo tab
 */
const handlePreviewLogo = ({ sectionId, logoId, idToken, token, tenantId }) => {
  return `${GUIDELINE_SERVER_URL}/section/${sectionId}/logo/${logoId}/download?idToken=${idToken}&accessToken=${token}&tenant=${tenantId}`;
};

/**
 * To download and open file in new tab of task section
 */
const handleDownloadAssetFile = ({
  fileId,
  fileVersionId,
  idToken,
  token,
  tenantId,
}) => {
  window.open(
    `${GUIDELINE_SERVER_URL}/file/${fileId}/versions/${fileVersionId}/download?idToken=${idToken}&accessToken=${token}&tenant=${tenantId}`
  );
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

/**
 * To generate random id using givine charactors
 */

/* Redirect to app from file drawer
 * @param id File id
 */
const redirectToApp = (id) => {
  window.open(`${REDIRECT_SERVER_URL}/file-viewer/${id}`);
};

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

/**
 * To convert from base64 to file object
 */
const getFileFromBase64 = (string64: string, fileName: string) => {
  const trimmedString = string64.replace("dataimage/jpegbase64", "");
  const imageContent = atob(trimmedString);
  const buffer = new ArrayBuffer(imageContent.length);
  const view = new Uint8Array(buffer);

  for (let n = 0; n < imageContent.length; n++) {
    view[n] = imageContent.charCodeAt(n);
  }
  const type = "image/png";
  const blob = new Blob([buffer], { type });
  return new File([blob], fileName, {
    lastModified: new Date().getTime(),
    type,
  });
};

/**
 * Convert url image to base64 string
 */
const getBase64Image = (imgUrl) => {
  return new Promise(function (resolve, reject) {
    let img = new Image();
    img.src = imgUrl;
    img.setAttribute("crossOrigin", "anonymous");

    img.onload = function () {
      let canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      let ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      let dataURL = canvas.toDataURL("image/png");
      resolve(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
    };
    img.onerror = function () {
      reject("The image could not be loaded.");
    };
  });
};

/**
 *
 * To convert base64 string into uintArray format
 */
function _base64ToUint8Array(base64) {
  let binary_string = atob(base64);
  let len = binary_string.length;
  let bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  return new Uint8Array(bytes.buffer);
}

/**
 * To convert uint8array to file format
 */

const convertBinanrytofile = (binaryData) => {
  let TYPED_ARRAY = new Uint8Array(binaryData);

  const STRING_CHAR = TYPED_ARRAY.reduce((data, byte) => {
    return data + String.fromCharCode(byte);
  }, "");
  let file;
  let base64String = btoa(STRING_CHAR);
  if (base64String) {
    file = getFileFromBase64(base64String, `${generateRandomID(4)}.png`);
  }
  return file;
};

/**
 *
 * @parse jw token
 */
const parseJwt = (token) => {
  try {
    const base64Url = token?.split(".")[1];
    const base64 = base64Url?.replace(/-/g, "+")?.replace(/_/g, "/");
    const parseData = JSON.parse(atob(base64));
    return parseData;
  } catch (e) {
    return e;
  }
};

const regexPattern = {
  email: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
} as const;


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
  handleDownloadAssetFile,
  filterCount,
  showDefaultImage,
  getFileFromBase64,
  getBase64Image,
  _base64ToUint8Array,
  convertBinanrytofile,
  parseJwt,
  regexPattern,
  convertSizeToFormat
};
