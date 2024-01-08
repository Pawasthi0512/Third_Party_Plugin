import axios from "axios";

  axios.interceptors.request.use(config => {
    config.headers['x-client'] = 'figma';
    return config;
  });



 /*
 * Get API
 */
export const getApi = (url: any) =>   axios.get(url);

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
