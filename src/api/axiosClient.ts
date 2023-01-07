import { BASE_API_URL } from "./../../lib/const";
import axios from "axios";

const getToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

const axiosClient = axios.create({
  baseURL: BASE_API_URL,
  timeout: 1000,
});

axiosClient.interceptors.request.use(
  (config) => {
    return {
      ...config,
      headers: {
        authorization: `bearer ${getToken()}`,
        "Content-Type": "application/json",
      },
    };
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
