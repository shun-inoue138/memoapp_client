import axiosClient from "./axiosClient";

export const authAPI = {
  signin: (data) => {
    const url = "/signin";
    return axiosClient.post(url, data);
  },
  signup: (data) => {
    const url = "/signup";
    return axiosClient.post(url, data);
  },
  jwtAuth: () => {
    const url = "/verify-token";

    return axiosClient.post(url);
  },
};
