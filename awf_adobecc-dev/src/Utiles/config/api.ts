import axios from "axios";
import LocalStorageService from "../localStroage";

/**
 * BE token
 */
axios.defaults.headers.common.Authorization = `${LocalStorageService.get_Id_Token()}`;
axios.defaults.headers.common.Authentication = `${LocalStorageService.get_Access_Token()}`;


/**
 *
 * Get API
 */
export const getApi = (url: any , config?:any) => axios.get(url , config);

/**
 *
 * Post API
 */
export const postApi = (url: any, data: any, config?: any) =>
  axios.post(url, data, config);

/**
 *
 * Put API
 */
export const putApi = (url: any, data?: any) => axios.put(url, data);

/**
 * Delete API
 */
export const deleteApi = (url: any) => axios.delete(url);
