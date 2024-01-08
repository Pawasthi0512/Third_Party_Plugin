import { getApi , postApi } from "../config/api";
import { API, AUTH_SERVER_URL , TASK_SERVER_URL } from "../constants";

/**
 * Login user
 */
export const loginUser = ({ auth }) => {
  const config = { auth };
  return postApi(`${TASK_SERVER_URL}/${API.login}`, {}, config);
};

export const checkingEmail = ({email}) => {
  console.log(AUTH_SERVER_URL)
  return getApi(`${AUTH_SERVER_URL}/${API.auth}?email=${email}`);
};



export const userProfile  = ({config}) => {
  return getApi(`${TASK_SERVER_URL}/${API.user_profile}` , config);
};

