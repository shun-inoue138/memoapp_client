import { authAPI } from "../api/authAPI";

export const saveTokenToLocalStorage = (token: string) => {
  localStorage.setItem("token", token);
};
