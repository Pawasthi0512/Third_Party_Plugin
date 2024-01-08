import React from "react";
import {
  Box,
  IconButton,
  InputAdornment,
  InputBase,
  Typography,
  styled,
} from "@mui/material";

const BoxContainer = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
  ".error_message": {
    position: "absolute",
    color: theme.palette.secondary.dark,
    fontSize: theme.spacing(6),
  },

}));

const InputContainer = styled(InputBase)(({ theme }) => ({
  // borderRadius: 8,
  width: "100%",
  height: "100%",
  borderRadius: theme.spacing(4),
  "Mui-focused":{
    border:'1px solid red'
  },
  "label + &": {
    marginTop: theme.spacing(6),
  },
  ".inputLabel": {
    marginBottom: "8px",
  },
  ".MuiInputBase-input": {
    position: "relative",
    fontSize: 12,
    padding: "12px",
    "&:focused": {
      borderColor: theme.palette.primary.main,
    },
  },
}));

function InputField({
  inputLabel = "",
  handleInputField,
  placeholder,
  defaultValue = "",
  inputType,
  value,
  inputIcon = null,
  onClick = null,
  onMouseDown = null,
  isInputIcon = false,
  error = false,
  errorMessage = ""
}) {
  return (
    <BoxContainer>
      <Typography
        className="inputLabel"
        sx={{ marginBottom: "8px" }}
        variant="h5"
      >
        {inputLabel}
      </Typography>
      {isInputIcon ? (
        <InputContainer
        sx={(theme)=>({
          border: error ? `1px solid ${theme.palette.secondary.dark}` : `1px solid ${theme.misc.borderGrey}`
        })}
          id="bootstrap-input"
          value={value}
          className="inputBox"
          type={inputType}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={handleInputField}
          autoComplete="off"
          error={error}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                edge="end"
                size="small"
                sx={{ marginRight: "5px" }}
                onClick={onClick}
                onMouseDown={onMouseDown}
              >
                {inputIcon}
              </IconButton>
            </InputAdornment>
          }
        />
      ) : (
        <InputContainer
          className="inputBox"
          id="bootstrap-input"
          type={inputType}
          placeholder={placeholder}
          defaultValue={defaultValue}
          onChange={handleInputField}
          value={value}
          error={error}
          sx={(theme)=>({
            border: error ? `1px solid ${theme.palette.secondary.dark}` : `1px solid ${theme.misc.borderGrey}`
          })}
        />
      )}
       {error && (
        <Typography className="error_message">{errorMessage}</Typography>
      )}

    </BoxContainer>
  );
}
export default InputField;
