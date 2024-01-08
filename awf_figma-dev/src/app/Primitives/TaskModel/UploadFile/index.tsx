import React from "react";
import { Box, Button, Modal, styled, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useAuth, useTask } from "../../../Utiles/hooks";

const UploadFileModel = styled(Modal)(({ theme }) => ({
  padding: theme.spacing(0),
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
    color: theme.palette.secondary.light,
    padding: "8px 0px",
    textAlign: "left",
    lineHeight: "16px",
  },
  ".upload-bottom": {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingTop: "9px",
    position: "fixed",
    bottom: 0,
    right: 0,
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
    color: theme.palette.info.main,
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
}));

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "232px",
  height: "196px",
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
  const { selectedFigmaFrame } = useAuth();
  const { checkFrame, setCheckFrame, checkFile, setCheckFile } = useTask();

  const handleRadioFrame = (e) => {
    setCheckFrame(e.target.checked);
    setCheckFile(false);
  };
  const handleRadioFile = (e) => {
    setCheckFile(e.target.checked);
    setCheckFrame(false);
  };

  const handleCancel = () => {
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
      <Box sx={style}>
        <Box>
          <Box className="dropTitle">
            <Typography className="upload-title">
              {variant === "revision" ? "Upload revision" : "Upload File"}{" "}
            </Typography>
            <CloseIcon className="close-icon" onClick={handleCancel} />
          </Box>
        </Box>

        <Typography className="upload-desc">
          You can choose to upload the selected frame as a File or upload a file
          from your computer
        </Typography>
        <Box className="radioInput">
          <Box className="inputWrapper1">
            <input
              type="radio"
              id="html"
              name="fav_language"
              checked={checkFrame}
              onChange={handleRadioFrame}
              disabled={!selectedFigmaFrame}
            />
            <label
              htmlFor="choose_file"
              className="choose-frame"
              style={{ color: !selectedFigmaFrame ? "#00000040" : "#333333" }}
            >
              Upload selected frame
            </label>
          </Box>
          {!selectedFigmaFrame ? (
            <p className="no-selected-frame">no selected frame</p>
          ) : (
            ""
          )}
          <Box className="inputWrapper2">
            <input
              type="radio"
              id="html"
              name="fav_language"
              checked={checkFile}
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
        <Box className="upload-bottom">
          <Button
            className="cancel-button"
            variant="outlined"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <Button
            // disabled={!uploadFile}
            onClick={handleContinue}
            className="continue-button"
            variant="contained"
          >
            Continue
          </Button>
        </Box>
      </Box>
    </UploadFileModel>
  );
};
export default CustomUploadFile;
