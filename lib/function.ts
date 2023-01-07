import { authAPI } from "../src/api/authAPI";

export const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem("token", token);
};
