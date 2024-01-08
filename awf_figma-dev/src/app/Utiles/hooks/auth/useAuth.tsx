import React, { useState, useContext, createContext, useEffect } from "react";
import { sendEmail, loginUser, userProfile } from "../../controllers/auth";
import LocalStorageService from "../../localStorage";
import axios from "axios";
import { useSnackBar } from "../Snackbar";
import { parseJwt } from "../../helpers";
import type { UserI } from "../types/tasks";

interface ProvideAuthI {
  children: React.ReactNode;
}


const authContext = createContext<any>(null);

export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const localStroage = LocalStorageService;
  const { ShowApiErrorSnackBar, ShowSuccessSnackBar } = useSnackBar();

  /**
   * Login initial values
   */
  const initialLogin = {
    username: "",
    password: "",
  };
/**
 * to store the received token from figma in onmessage call
 */
  const pluginToken = {
    token: "",
    id_token: "",
    user: null
  }
  /**
   * state control variables
   */
  const [figmaToken, setFigmaToken] = useState(pluginToken);
  const [token, setToken] = useState("");
  const [idToken, setIdToken] = useState("");
  const [user, setUser] = useState<UserI>(null);
  const [isUserLoading, setIsUserLoading] = useState(false);
  const [currentTab, setCurrentTab] = useState("1");
  const [selectedFigmaFrame, setSelectedfigmaFrame] = useState(false);
  const [email, setEmail] = useState("");
  const [isEmailVerified, setEmailVerified] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [signIn, setSignIn] = useState(initialLogin);

  /**
   * To set default authorization and authentication token
   */
  useEffect(() => {
    if (token && idToken) {
      axios.defaults.headers.common.Authorization = idToken;
      axios.defaults.headers.common.Authentication = token;
    }
  }, [token, idToken]);

  /**
   * To set default tenant id as default header
   */
  useEffect(() => {
    if (user) {
      axios.defaults.headers.common.Tenant = user.tenant_id;
    }
  }, [user]);


  /**
   * Send email to check if the email is present or not
   */

  const handleSubmitEmail = async () => {
    const encodeEmail = email.replace(/[^\w\s]/g, '%')
    try {
      const response = await sendEmail({ email:encodeEmail });
      if (response.status === 200) {
        setEmailVerified(true);
      }
    } catch (err) {
      ShowApiErrorSnackBar(err);
    }
  };

  /**
   * To login api to submit user and store token in localstroage
   */
  const handleLoginUser = async () => {
    setIsUserLoading(true);
    try {
      const response = await loginUser({
        auth: signIn,
      });
      if (response.status === 200) {
        localStroage.setToken(response.data.accessToken);
        localStroage.setIdToken(response.data.idToken);
        setToken(response.data.accessToken);
        setIdToken(response.data.idToken);
        ShowSuccessSnackBar("Login success- Welcome to Artwork flow");
      }
    } catch (err) {
      ShowApiErrorSnackBar(err);
    }
    setIsUserLoading(false);
  };

  /**
   * To get the user profile
   */
  const getUserProfile = async () => {
    try {
      const response = await userProfile();
      setUser(response.data.user);
      localStroage.setUser(response.data.user);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (idToken && token) {
      getUserProfile();
    }
  }, [idToken, token]);

  /**
   * To route to forgot password url and open in tab
   */

  const handleForgotPassword = () => {
    setEmail("");
    setSignIn(initialLogin);
    setEmailVerified(false)
    return window.open(process.env.RESET_PASSWORD);
  };

  /**
   * Logout and empty all states
   */

  const handleSigOut = () => {
    setIsLogoutLoading(true);
    LocalStorageService.clearToken();
    setToken("");
    setEmailVerified(false);
    setFigmaToken(pluginToken);
    setUser(null);
    setEmail("");
    setSignIn(initialLogin);
    setIsLogoutLoading(false);
    setCurrentTab("1");
    ShowSuccessSnackBar("Logout Successful");
  };

  /**
   * To check if user token present in the local-storage
   */
  useEffect(() => {
    setIsUserLoading(true);
    if (figmaToken) {
      const decodedJwt = parseJwt(figmaToken.id_token);
      if (decodedJwt.exp * 1000 < Date.now()) {
        handleSigOut();
      } else {
        setToken(figmaToken.token);
        setIdToken(figmaToken.id_token);
        setUser(figmaToken.user);
      }
    }
    setIsUserLoading(false);
  }, [figmaToken]);


  return {
    /**
     * Figma controls
     */
    selectedFigmaFrame,
    setSelectedfigmaFrame,
    setFigmaToken,
    /**
     * Auth
     */
    email,
    setEmail,
    isEmailVerified,
    handleSubmitEmail,
    isUserLoading,
    idToken,
    token,
    setToken,
    user,
    setUser,
    signIn,
    setSignIn,
    handleLoginUser,
    handleForgotPassword,

    /**
     * Home screen tabs
     */
    currentTab,
    setCurrentTab,
    /**
     * Logout
     */
    handleSigOut,
    isLogoutLoading,
  };
}

export function ProvideAuth({ children }: ProvideAuthI) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
