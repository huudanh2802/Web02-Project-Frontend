import axios from "axios";
import { memoizedRefreshToken } from "./refreshToken";

axios.defaults.baseURL = process.env.REACT_APP_API_SERVER;

axios.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers = {
        ...config.headers,
        authorization: `Bearer ${token}`
      };
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config;
    console.log("Hello World");
    if (error?.response?.status === 401 && !config?.sent) {
      config.sent = true;

      const result = await memoizedRefreshToken();

      if (result?.token) {
        config.headers = {
          ...config.headers,
          authorization: `Bearer ${result?.token}`
        };
      }

      return axios(config);
    }
    return Promise.reject(error);
  }
);
// eslint-disable-next-line import/prefer-default-export
export const axiosPrivate = axios;
