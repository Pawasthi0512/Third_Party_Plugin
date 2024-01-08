import { Box, Button, Modal, styled, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";

const UploadFileModel = styled(Modal)(({ theme }) => ({
  ".MuiBackdrop-root": {
    ".MuiModal-backdrop ": {
      opacity: "0",
    },
  },
  padding: theme.spacing(0),
  ".drop-FileTitle": {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ".upload-File-title": {
    fontWeight: "500",
    fontSize: "12px",
    color: theme.palette.primary.main,
  },
  ".close-File-icon": {
    fontWeight: "500",
    fontSize: "16px",
    cursor: "pointer",
  },
  ".upload-File-desc": {
    fontWeight: "400",
    fontSize: "12px",
    color: theme.palette.secondary.light,
    padding: "12px 0px",
  },
  ".upload-File-bottom": {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: "9px",
  },
  ".cancel-File-button": {
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
  ".continue-File-button": {
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
  ".choose-File-frame": {
    fontWeight: "400",
    fontSize: "12px",
    padding: "4px 0px 0px 6px",
    color: theme.palette.primary.main,
  },
  ".choose-File-file": {
    fontWeight: "400",
    fontSize: "12px",
    padding: "4px 0px 0px 6px",
  },
  ".input-FileWrapper1": {
    display: "flex",
    alignItems: "center",
  },
  ".input-FileWrapper2": {
    paddingTop: "8px",
    display: "flex",
    alignItems: "center",
  },
  ".no-selected-File-frame": {
    fontWeight: "400",
    fontSize: "10px",
    lineHeight: "12px",
    paddingLeft: "28px",
    paddingTop: "4px",
    color: theme.palette.secondary.dark,
    margin: "0px",
  },
}));

const fileStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "256px",
    height:'204px',
    bgcolor: 'background.paper',
    borderRadius:'8px',
    p: 6,
    outline:'none'
};
const CustomUploadFile = ({ handleClose, open }) => {
  const [checkFrame, setCheckFrame] = useState(false);
  const [checkFile, setCheckFile] = useState(false);

  /**
   * Handles radio button of frame in task upload model
   * @param e event
   */
  const handleFileRadioFrame = (e) => {
    setCheckFrame(e.target.checked);
    setCheckFile(false);
  };

  /**
   * Handles radio button of file in task upload model
   * @param e event
   */
  const handleFileRadioFile = (e) => {
    setCheckFile(e.target.checked);
    setCheckFrame(false);
  };

  /**
   * Handles cancel in task upload model
   */
  const handleFileCancel = () => {
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
      hideBackdrop
    >
      <Box sx={fileStyle}>
        <Box>
          <Box className="drop-FileTitle">
            <Typography className="upload-File-title">Upload File</Typography>
            <CloseIcon className="close-File-icon" onClick={handleFileCancel} />
          </Box>
        </Box>

        <Typography className="upload-File-desc">
          You can choose to upload the selected frame as a File or upload a file
          from your computer{" "}
        </Typography>
        <Box className="radio-FileInput">
          <Box className="input-FileWrapper1">
            <input
              type="radio"
              id="html"
              style={{ width: "16px", height: "16px" }}
              name="fav_language"
              value="HTML"
              onChange={handleFileRadioFrame}
            />
            <label htmlFor="choose_file" className="choose-File-frame">
              Upload selected frame
            </label>
          </Box>
          <p className="no-selected-File-frame">no selected frame</p>
          {checkFrame === true ? (
            <input
              type="file"
              id="choose_frame"
              name="Choose a file"
              style={{
                paddingTop: "6px",
                fontSize: "10px",
                cursor: "pointer",
                paddingLeft: "28px",
              }}
            />
          ) : (
            ""
          )}
          <Box className="input-FileWrapper2">
            <input
              type="radio"
              id="html"
              style={{ width: "16px", height: "16px" }}
              name="fav_language"
              value="HTML"
              onChange={handleFileRadioFile}
            />
            <label htmlFor="choose_file" className="choose-File-frame">
              Choose a file
            </label>
          </Box>
          {checkFile === true ? (
            <input
              type="file"
              id="choose_file"
              name="Choose a file"
              style={{
                paddingTop: "6px",
                fontSize: "10px",
                cursor: "pointer",
                paddingLeft: "28px",
              }}
            />
          ) : (
            ""
          )}
        </Box>
        <Box className="upload-File-bottom">
          <Button
            className="cancel-File-button"
            variant="outlined"
            onClick={handleFileCancel}
          >
            Cancel
          </Button>
          <Button className="continue-File-button" variant="contained">
            Continue
          </Button>
        </Box>
      </Box>
    </UploadFileModel>
  );
};
export default CustomUploadFile;
