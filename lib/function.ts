import { authAPI } from "../src/api/authAPI";

export const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem("token", token);
};

export const tryTokenAuth = async (router: {
  push: (route: string) => void;
}) => {
  const token = JSON.stringify(localStorage.getItem("token") || "null");
  console.log(token);
  if (!token) {
    return;
  }
  try {
    const res = await authAPI.jwtAuth();
    if (res.data) {
      console.log(res.data);
      router.push("/");
    }
  } catch (error) {
    console.log("error");
    console.log(error);
  }
};
