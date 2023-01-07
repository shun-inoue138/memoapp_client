import { useRouter } from "next/router";
import { useEffect } from "react";
import { authAPI } from "../api/authAPI";

export const useJwtAuth = () => {
  const router = useRouter();

  const tryTokenAuth = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      const res = await authAPI.jwtAuth();
      if (res.data) {
        console.log(res.data);

        router.push(
          { pathname: "/", query: { message: res.data.user.username } },
          "/"
        );
      }
    } catch (error) {
      console.log("error");
      console.log(error);
    }
  };

  useEffect(() => {
    tryTokenAuth();
  }, []);
};
