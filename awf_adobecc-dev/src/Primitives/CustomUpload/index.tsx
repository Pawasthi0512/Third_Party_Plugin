import React, { useState } from "react";
import { Box, Button, Modal, styled, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import csInterface from "../../CSInterface.js"
import { useAssets } from "../../Utiles/hooks/assets/index";

const UploadModel = styled(Modal)(({ theme }) => ({
  padding: theme.spacing(6),
  ".dropTitle": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ".upload-title": {
    fontWeight: "500",
    fontSize: "12px",
    color: theme.palette.primary.main,
  },
  ".close-icon": {
    fontWeight: "500",
    fontSize: "16px",
    cursor: "pointer",
  },
  ".upload-desc": {
    fontWeight: "400",
    fontSize: "12px",
    lineHeight:'16px',
    color: theme.palette.secondary.light,
    padding: "8px 0px",
    textAlign: "left",
  },
  ".upload-bottom": {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    position:'fixed',
    bottom:0,
    right:0,
    marginRight: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  ".cancel-button": {
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
  ".continue-button": {
    textTransform: "none",
    borderRadius: "8px",
    fontWeight: "500",
    fontSize: "12px",
    padding: "8px",
    lineHeight: "16px",
    boxShadow: "none",
    background: theme.palette.primary.main,
  },
  ".radioInput": {},
  ".choose-frame": {
    fontWeight: "400",
    fontSize: "12px",
    padding: "4px 0px 0px 6px",
    color: theme.palette.primary.main,
  },
  ".choose-file": {
    fontWeight: "400",
    fontSize: "12px",
    padding: "4px 0px 0px 6px",
  },
  ".inputWrapper1": {
    display: "flex",
    alignItems: "center",
  },
  ".inputWrapper2": {
    paddingTop: "8px",
    display: "flex",
    alignItems: "center",
  },
  ".no-selected-frame": {
    fontWeight: "400",
    fontSize: "10px",
    lineHeight: "12px",
    paddingLeft: "28px",
    paddingTop: "4px",
    color: theme.palette.secondary.dark,
    margin: "0px",
    display: "flex",
  },
  ".selected-frame": {
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

const style = {
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
const CustomUpload = ({
  handleClose,
  open,
  handleChangeFile,
  handleContinues,
}) => {

  const {checkFrame, setCheckFrame,checkFile, setCheckFile , handleChangeFrameUpload   } = useAssets()

  const [selectedFramName , setSelectedFrameName] = useState("")
  const [notSelected , setNotSelected] = useState(false)


  /**
   * Handles radio frame button
   * @param e event
   */

  const handleRadioFrame = async (e) => {
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
          handleChangeFrameUpload(fileUrl)
      } else {
        setSelectedFrameName(resData.imagePath)
        setNotSelected(true)
      }

    })
  }; 

  /**
   * Handles radio file
   * @param e event
   */
  const handleRadioFile = (e) => {
    setCheckFile(e.target.checked);
    setCheckFrame(false)
  };

  console.log('check frame',checkFrame)
  console.log('check file',checkFile)

  console.log('frame name' , selectedFramName);
  

  /**
   * Handles cancel button
   */
  const handleCancel = () => {

    handleClose();
    setCheckFile(false);
    setCheckFrame(false)
  };


  return (
    <UploadModel
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box>
          <Box className="dropTitle">
            <Typography className="upload-title">Upload asset</Typography>
            <CloseIcon className="close-icon" onClick={handleCancel} />
          </Box>
        </Box>

        <Typography className="upload-desc">
          You 1 can choose to upload the selected frame as a new asset or upload a
          file from your computer
        </Typography>
        <Box className="radioInput">
          <Box className="inputWrapper1">
            <input
              type="radio"
              style={{ width: "16px", height: "16px" }}
              id="html"
              name="fav_language"
              checked={checkFrame}
              disabled = {checkFile ? true : false}
              onChange={handleRadioFrame}
            />
            <label htmlFor="choose_file" className="choose-frame">
              Upload selected frame
            </label>
          </Box>
          {checkFrame ? (
            <p className={notSelected ? "no-selected-frame" : "selected-frame"}>{selectedFramName}</p>
          ) : (
            ""
          )}
          <Box className="inputWrapper2">
            <input
              type="radio"
              id="html"
              style={{ width: "16px", height: "16px" }}
              name="fav_language"
              checked={checkFile}
              disabled = {checkFrame ? true : false}
              onChange={handleRadioFile}
            />
            <label htmlFor="choose_file" className="choose-frame">
              Choose a file
            </label>
          </Box>
          {checkFile === true ? (
            <input
              type="file"
              id="choose_file"
              name="Choose a file"
              onChange={handleChangeFile}
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
        <Box className="upload-bottom">
          <Button
            className="cancel-button"
            variant="outlined"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            className="continue-button"
            variant="contained"
            onClick={handleContinues}
            disabled={checkFile || checkFrame ? false : true}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </UploadModel>
  );
};
export default CustomUpload;
