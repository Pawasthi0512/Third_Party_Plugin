import React, { useState, useContext, createContext } from "react";
import { checkingEmail, loginUser , userProfile } from "../../controllers/auth";
import LocalStorageService from "../../localStroage";
import { useSnackBar } from "../Snackbar";
import csInterface from "../../../CSInterface.js"


interface ProvideAuthI {
  children: React.ReactNode;
}

const authContext = createContext<any>(null);

export const useAuth = () => useContext(authContext);

function useProvideAuth() {
  const localStroage = LocalStorageService;
  const {ShowApiErrorSnackBar, ShowSuccessSnackBar} = useSnackBar()
  const [user, setUser] = useState<boolean>(false);
  const [isUserLoading, setIsUserLoading] = React.useState(false);
  const [currentTab, setCurrentTab] = React.useState("1");
  const [isEmailVerified , setIsEmailVerified] = React.useState(false)

  const [signIn, setSignIn] = useState({
    username: "",
    password: "",
  });

  /**
   * To check if user token present in the localstorage
   */
  React.useEffect(() => {
    setIsUserLoading(true);
    if (!!localStroage.get_Id_Token()) {
      setUser(true);
    }
    setIsUserLoading(false);
  }, [localStroage, user]);

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
        localStroage.setIdToken(response?.data?.idToken);
        localStroage.setAccessToken(response?.data?.accessToken);
        let config = {
          headers : {
            Authentication : response?.data?.accessToken,
            Authorization : response?.data?.idToken
          }
        }
        const userProfileResponse = await handleUserProfile(config)
        if(userProfileResponse?.data?.user?.tenant_id){
            setUser(true)
            window.location.reload()
            ShowSuccessSnackBar("Login success- Welcome to Artwork flow")
        }
      }
    } catch (err) {
      ShowApiErrorSnackBar(err)
    }
    setIsUserLoading(false);
  };

/**
 * To validate the user's email
 */
  const handleCheckingEmail = async () => {
    const encodeEmail = signIn.username.replace(/[^\w\s]/g, '%')
    try{
      const response = await checkingEmail({email : encodeEmail})
      if(response.status === 200){
        setIsEmailVerified(true)
      }
    }catch (err)  {
      ShowApiErrorSnackBar(err)
    }
  }

  /**
   * User Profile Api call
   */

  const handleUserProfile = async (config) => {
    try{
      const response = await userProfile({config});
      if(response.status === 200){
        localStroage.setTanantId(response?.data?.user?.tenant_id)
        return response
      }
    }catch (err) {
      console.log(err)
    }
  }

  /**
   * To route to forgot password url and open in tab
   */

  const handleForgotPassword = ()=>{
    const resetUrl = process.env.RESET_PASSWORD
   return csInterface.openURLInDefaultBrowser(resetUrl);
  }

  /**
   * To check the token is expired or not, if expired user will be throw to login screen
   */
  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  React.useEffect(() => {
    if (localStroage.get_Id_Token()) {
      const decodedJwt = parseJwt(localStroage.get_Id_Token());
      if (decodedJwt.exp * 1000 < Date.now()) {
        localStroage.clearToken();
        setUser(false);
      }
    }
  }, [localStroage]);


  return {
    isUserLoading,
    user,
    setUser,
    currentTab,
    setCurrentTab,
    signIn,
    setSignIn,
    handleLoginUser,
    handleCheckingEmail,
    handleForgotPassword,
    isEmailVerified
  };
}

export function ProvideAuth({ children }: ProvideAuthI) {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
