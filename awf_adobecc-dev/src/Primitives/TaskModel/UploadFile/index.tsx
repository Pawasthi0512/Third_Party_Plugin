import { Box, Button, Modal, styled, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import csInterface from "../../../CSInterface.js"
import { useTask } from "../../../Utiles/hooks";

const UploadFileModel = styled(Modal)(({ theme }) => ({
  padding: theme.spacing(0),
  ".drop-taskTitle": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ".upload-task-title": {
    fontWeight: "500",
    fontSize: "12px",
    color: theme.palette.primary.main,
  },
  ".close-task-icon": {
    fontWeight: "500",
    fontSize: "16px",
    cursor: "pointer",
  },
  ".upload-task-desc": {
    fontWeight: "400",
    fontSize: "12px",
    color: theme.palette.secondary.light,
    padding: "8px 0px",
    textAlign: "left",
    lineHeight:'16px',
  },
  ".upload-task-bottom": {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    position:'fixed',
    bottom:0,
    right:0,
    marginRight: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  ".cancel-task-button": {
    textTransform: "none",
    border: "1px solid #333333",
    borderRadius: "8px",
    fontWeight: "500",
    fontSize: "12px",
    padding: "8px",
    marginRight: "8px",
    lineHeight: "16px",
    color: theme.palette.primary.main,
  },
  ".continue-task-button": {
    textTransform: "none",
    borderRadius: "8px",
    fontWeight: "500",
    fontSize: "12px",
    padding: "8px",
    lineHeight: "16px",
    boxShadow: "none",
    color: theme.palette.info.main,
    background:theme.palette.primary.main,
  },
  ".radioInput": {},
  ".choose-task-frame": {
    fontWeight: "400",
    fontSize: "12px",
    padding: "4px 0px 0px 6px",
    color: theme.palette.primary.main,
  },
  ".choose-task-file": {
    fontWeight: "400",
    fontSize: "12px",
    padding: "4px 0px 0px 6px",
  },
  ".input-taskWrapper1": {
    display: "flex",
    alignItems: "center",
  },
  ".input-taskWrapper2": {
    paddingTop: "8px",
    display: "flex",
    alignItems: "center",
  },
  ".no-selected-task-frame": {
    fontWeight: "400",
    fontSize: "10px",
    lineHeight: "12px",
    paddingLeft: "28px",
    paddingTop: "4px",
    color: theme.palette.secondary.dark,
    margin: "0px",
    display: "flex",
  },
  ".selected-task-frame": {
    fontWeight: "400",
    fontSize: "10px",
    lineHeight: "12px",
    paddingLeft: "28px",
    paddingTop: "4px",
    color: theme.palette.secondary.light,
    margin: "0px",
    display: "flex",
  },
}));

const taskStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "232px",
  height: "183px",
  bgcolor: "background.paper",
  borderRadius: "8px",
  p: 6,
  outline: "none",
};
const CustomUploadFile = ({
  handleClose,
  open,
  handleContinue,
  handleFileChange,
  variant = "file",
}) => {

  const {checkFrame, setCheckFrame,checkFile, setCheckFile , handleSelectedFrame} = useTask()
  const [selectedFramName , setSelectedFrameName] = useState("")
  const [notSelected , setNotSelected] = useState(false)

 
  const handleTaskRadioFrame = (e) => {
    setCheckFrame(e.target.checked);
    setCheckFile(false);

    csInterface.evalScript(`uploadAssets()`, async (res) => {
      const resData = JSON.parse(res)

      if(resData.imageData !== null) {
        // Image binary data
        const binData = resData.imageData
  
        //Image file path
        const imgPath = resData.imagePath
      
        const splitModifiedPath = imgPath.split('/');
  
        // Name of the file
        const fileName = splitModifiedPath[splitModifiedPath.length - 1];
       
        const fileArray = fileName.split(".")
  
        // file extension
        const extension = fileArray[fileArray.length - 1]
  
  
        const buffer = new ArrayBuffer(binData.length);
        const view = new Uint8Array(buffer);
  
        for (let n = 0; n < binData.length; n++) {
          view[n] = binData.charCodeAt(n);
        }
        const type = `${extension}`;
        const blob = new Blob([buffer], { type });
        const fileUrl = new File([blob], fileName , {
          lastModified: new Date().getTime(),
          type,
        });
  
        setSelectedFrameName(fileUrl.name)
        handleSelectedFrame(fileUrl)
        
      } else {
        setSelectedFrameName(resData.imagePath)
        setNotSelected(true)
      }
    })

  };
  const handleTaskRadioFile = (e) => {
    setCheckFile(e.target.checked);
    setCheckFrame(false);
  };

  const handleTaskCancel = () => {
    handleClose();
    setCheckFile(false);
    setCheckFrame(false);
  };
  return (
    <UploadFileModel
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={taskStyle}>
        <Box>
          <Box className="drop-taskTitle">
            <Typography className="upload-task-title">
              {variant === "revision" ? "Upload revision" : "Upload File"}{" "}
            </Typography>
            <CloseIcon className="close-task-icon" onClick={handleTaskCancel} />
          </Box>
        </Box>

        <Typography className="upload-task-desc">
          You 1 can choose to upload the selected frame as a File or upload a file
          from your computer
        </Typography>
        <Box className="radioInput">
          <Box className="input-taskWrapper1">
            <input
              type="radio"
              style={{ width: "16px", height: "16px" }}
              id="html"
              name="fav_language"
              checked={checkFrame}
              disabled = {checkFile ? true : false}
              onChange={handleTaskRadioFrame}
            />
            <label htmlFor="choose_file" className="choose-task-frame">
              Upload selected frame
            </label>
          </Box>
          { checkFrame ? (
            <p className={notSelected ? "no-selected-task-frame" : "selected-task-frame"}>{selectedFramName}</p>
          ) : (
            ""
          )}
          <Box className="input-taskWrapper2">
            <input
              type="radio"
              style={{ width: "16px", height: "16px" }}
              id="html"
              name="fav_language"
              checked={checkFile}
              disabled = {checkFrame ? true : false}
              onChange={handleTaskRadioFile}
            />
            <label htmlFor="choose_file" className="choose-task-frame">
              Choose a file
            </label>
          </Box>
          {checkFile === true ? (
            <input
              type="file"
              id="choose_file"
              name="Choose a file"
              onChange={handleFileChange}
              style={{
                paddingTop: "6px",
                fontSize: "7px",
                cursor: "pointer",
                paddingLeft: "28px",
              }}
            />
          ) : (
            ""
          )}
        </Box>
        <Box className="upload-task-bottom">
          <Button
            className="cancel-task-button"
            variant="outlined"
            onClick={handleTaskCancel}
          >
            Cancel
          </Button>
          <Button
            className="continue-task-button"
            variant="contained"
            onClick={handleContinue}
            disabled={checkFile || checkFrame ? true : false}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </UploadFileModel>
  );
};
export default CustomUploadFile;
