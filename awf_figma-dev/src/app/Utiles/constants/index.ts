const TASK_SERVER_URL =  process.env.TASK_URL || "https://artworkflowapi.bizongo.com/plugin";

const LOGIN_URL = process.env.LOGIN_URL || "https://af-ums.bizongo.com";

const GUIDELINE_SERVER_URL = process.env.GUIDELINE_SERVER_URL || "https://dam-service.bizongo.com/plugin" ;

const REDIRECT_SERVER_URL = process.env.RESET_PASSWORD ||  "https://artworkflow.bizongo.com";

/**
 * Api path
 */
const API = {
  login: "login",
  taskInstances: "task-instances",
  controlFiles: "files",
  guidelines: "guideline/all",
  logo: "section",
};

/**
 * Static color list for filter
 */
const ColorList = [
  {
    id: "1",
    colorName: "Dark Red",
    color: "#EE2C32",
    tick : "white"
  },
  {
    id: "2",
    colorName: "Smothe Orange",
    color: "#000000",
    tick : "white"
  },
  {
    id: "3",
    colorName: "Light Pink",
    color: "#F68A21",
    tick : 'black'
  },
  {
    id: "4",
    colorName: "Palette Yellow",
    color: "#FDF104",
    tick : 'black'
  },
  {
    id: "5",
    colorName: "Blue Sky",
    color: "#00FEFF",
    tick : "black"
  },
  {
    id: "6",
    colorName: "Dark Green",
    color: "#00A653",
    tick : "white"
  },
  {
    id: "7",
    colorName: "Grass Green",
    color: "#01FA9F",
    tick : 'black'
  },
  {
    id: "8",
    colorName: "Blue Bird",
    color: "#0F81C5",
    tick : "white"
  },
  {
    id: "9",
    colorName: "Purple Bird",
    color: "#683090",
    tick : "white"
  },
  {
    id: "10",
    colorName: "Red Voolet",
    color: "#C81689",
    tick : 'white'
  },
  {
    id: "11",
    colorName: "Pure white",
    color: "#FFFFFF",
    tick : 'black'
  },
];

/**
 * Assets Type for filter 
 */

const AssetsType = [
  {
    id: "1",
    name: "Image",
    type: ["jpg", "tiff", "bmp", "svg", "png", "ai", "webp", "jpeg"],
  },

  {
    id: "2",
    name: "Document",
    type: ["xlsx", "docx", "pptx", "pdf"],
  },
  {
    id: "3",
    name: "Audio",
    type: "mp3",
  },
  {
    id: "4",
    name: "Video",
    type: ["webm", "mp4", "mov"],
  },
  {
    id: "5",
    name: "Others",
    type: ["jpg", "heic", "json"],
  },
];

/**
 * Assets Extension type for filter
 */
const AssetsExtension = [
  {
    id: "1",
    name: "JPEG",
    type: "jpeg",
  },
  {
    id: "2",
    name: "PNG",
    type: "png",
  },
  {
    id: "3",
    name: "JPG",
    type: "jpg",
  },
  {
    id: "4",
    name: "GIF",
    type: "gif",
  },
  {
    id: "5",
    name: "HEIC",
    type: "heic",
  },
  {
    id: "6",
    name: "AI",
    type: "ai",
  },
  {
    id: "7",
    name: "BMP",
    type: "bmp",
  },
  {
    id: "8",
    name: "DOCX",
    type: "docx",
  },
  {
    id: "9",
    name: "JSON",
    type: "json",
  },
  {
    id: "10",
    name: "MOV",
    type: "mov",
  },
  {
    id: "11",
    name: "MP4",
    type: "mp4",
  },
  {
    id: "12",
    name: "MP3",
    type: "mp3",
  },
  {
    id: "13",
    name: "PDF",
    type: "pdf",
  },
  {
    id: "14",
    name: "PPTX",
    type: "pptx",
  },
  {
    id: "15",
    name: "SVG",
    type: "svg",
  },
  {
    id: "16",
    name: "TIFF",
    type: "tiff",
  },
  {
    id: "17",
    name: "WEBM",
    type: "webm",
  },
  {
    id: "18",
    name: "WEBP",
    type: "webp",
  },
  {
    id: "19",
    name: "XLSX",
    type: "xlsx",
  },
];

/**
 * Task filter type 
 */
const TaskFilterType = [
  {
    id: "1",
    name: "UPLOAD",
  },
  {
    id: "2",
    name: "REVIEW",
  },
  {
    id: "3",
    name: "TODO",
  },
  {
    id: "4",
    name: "DECISION",
  },
];


export {
  API,
  TASK_SERVER_URL,
  GUIDELINE_SERVER_URL,
  REDIRECT_SERVER_URL,
  ColorList,
  AssetsType,
  AssetsExtension,
  TaskFilterType,
  LOGIN_URL,
};
