import React from "react";
import { Box, Button,  styled } from "@mui/material";
import InputField from "../../Primitives/InputField";
import logo from "../../Assets/Images/Vector.png";
// import GoogleLogo from "../../../Assets/Icons/GoogleLogo";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../../Utiles/hooks";

const SignInWrapper = styled(Box)(({ theme }) => ({
  width: theme.spacing(214),
  height: theme.spacing(280),
  paddingTop: theme.spacing(20),
  margin: "auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  ".contentWrapper": {
    width: "332px",
  },
  ".header_wrapper": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(4),
    borderBottom: `1px solid ${theme.misc.borderGrey}`,
  },
  ".close_icon": {
    marginRight: theme.spacing(4),
  },
  ".logo": {
    padding: theme.spacing(6, 0),
    display: "flex",
    justifyContent: "center",
  },
  ".inputWrapper": {
    paddingTop: theme.spacing(6),
    width: "332px",
  },
  ".MuiInputBase-input": {
    padding: "11px",
    fontWeight: "400",
    fontSize: "12px",
    lineHeight: "16px",
    // color:'#C1C1C1'
  },
  ".loginButton": {
    padding: theme.spacing(6, 75),
    marginTop: theme.spacing(6),
    borderRadius: 28,
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText,
    fontSize: 12,
    textTransform: "none",
    fontWeight: "400",
    lineHeight: "16px",
    width: "332px",
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  ".loginGoogleutton": {
    padding: theme.spacing(6, 45),
    borderRadius: 28,
    color: theme.palette.primary.dark,
    fontSize: 12,
    fontWeight: "400",
    textTransform: "none",
    lineHeight: "16px",
    textAlignment: "center",
    height: "40px",
    "&:hover": {
      background: "white",
    },
  },
  ".divider": {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "36.5px 0px",
  },
  ".forgot": {
    marginTop: theme.spacing(6),
    marginRight: theme.spacing(0),
    display: "flex",
    justifyContent: "flex-end",
  },
  ".or": {
    fontWeight: "400",
    fontSize: "12px",
    color: "#C1C1C1",
    lineHeight: "16px",
  },
  ".visibleIcon": {
    width: "20px",
    height: "16px",
    color: theme.misc.inputBorder,
  },
}));

const SignIn = () => {
  const { signIn, setSignIn, handleForgotPassword , handleCheckingEmail , handleLoginUser , isEmailVerified  } =
    useAuth();
  const [emailError, setEmailError] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);


  /**
   * 
   * On email changes
   */
  const handleEmail = (e) => {
    setEmailError(false);
    setSignIn({
      ...signIn,
      username: e.target.value,
    });
  };

/**
 * 
 * On password change
 */
  const handelePassword = (e) => {
    setPasswordError(false);
    setSignIn({
      ...signIn,
      password: e.target.value,
    });
  };

  /**
   * check email  for verfication
   */
  const handleEmailVerification = () => {
    if (!signIn.username) {
      setEmailError(true);
    } else {
        handleCheckingEmail(signIn.username);
    }
  };

  /**
   * Handle submit login
   */
const handleSubmitLogin = () => {
    if (!signIn.password) {
        setPasswordError(true);
      }else {
        handleLoginUser(signIn);
      }
}

  /**
   * 
   * To show passoword onlcik on show-password icon
   */
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <SignInWrapper>
      <Box className="contentWrapper">
        <Box className="logo">
          <img width="200px" src={logo} alt="logo" />
        </Box>
        <Box display="flex" flexDirection="column" alignItems="center">
        {!isEmailVerified ? 
          <Box className="inputWrapper">
            
            <InputField
              inputType="email"
              inputLabel="Email address"
              value={signIn.username}
              handleInputField={handleEmail}
              placeholder="eg: john.doe@example.com"
              error={emailError}
              errorMessage={!signIn.username ? 'Please enter your email address' : 'Invalid Email'}
            />
          </Box>
          :
          <Box className="inputWrapper">
            <InputField
              inputType={showPassword ? "text" : "password"}
              inputLabel="Password"
              value={signIn.password}
              handleInputField={handelePassword}
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              placeholder="********"
              defaultValue=""
              error={passwordError}
              errorMessage="Password is required"
              isInputIcon
              inputIcon={
                showPassword ? (
                  <Visibility className="visibleIcon" />
                ) : (
                  <VisibilityOff className="visibleIcon" />
                )
              }
            />
          </Box>
          }
        </Box>
        <Box className="forgot">
            {
           isEmailVerified ? 
            <Button
                sx={{
                textTransform: "none",
                padding: "0px",
                fontSize: "12px",
                color: "#7D69FF",
                }}
                onClick={handleForgotPassword}
            >
                Forgot password?
            </Button>
            :
            ''
            }
        </Box>
        <Box display="flex" justifyContent="center">
          <Button onClick={!isEmailVerified  ? handleEmailVerification : handleSubmitLogin} className="loginButton">
            {!isEmailVerified  ? "Next" : "Login"}
          </Button>
        </Box>
        {/* <Box className="divider">
          <Divider sx={{ width: "134px" }} />
          <Typography className="or">or</Typography>
          <Divider sx={{ width: "134px" }} />
        </Box> */}
        {/* <Box sx={{ margin: "0px" }}>
          <Button className="loginGoogleutton" variant="outlined">
            <span
              style={{
                paddingRight: "24px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GoogleLogo />
            </span>
            Log in with Google
          </Button>
        </Box> */}
      </Box>
    </SignInWrapper>
  );
};
export default SignIn;
