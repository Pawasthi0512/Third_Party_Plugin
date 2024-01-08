import { postApi, getApi } from "../config/api";
import { TASK_SERVER_URL, API, LOGIN_URL } from "../constants";


/**
 * To send email on get to verify email
 */
export const sendEmail = ({email})=>{
  return getApi(`${LOGIN_URL}/api/login-options?email=${email}`)
}


/**
 * Login user
 */
export const loginUser = ({ auth }) => {
  const config = { auth };
  return postApi(`${TASK_SERVER_URL}/${API.login}`, {}, config);
};

/**
 * To get the user profile 
 */
export const userProfile = ()=>{
  return getApi(`${TASK_SERVER_URL}/users/profile`)
}


