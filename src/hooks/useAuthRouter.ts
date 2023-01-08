import { useRouter } from "next/router";

export const useAuthRouter = () => {
  const router = useRouter();
  const { email = "", password = "" } = router.query;

  return { email, password, router };
};
