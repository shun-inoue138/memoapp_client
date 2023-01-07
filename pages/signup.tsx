import React from "react";

import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/router";
import InputItemComponent from "../src/components/molecules/InputItemComponent";
import Button from "../src/components/atoms/Button";
import AuthLayout from "../src/components/templates/AuthLayout";
import { authAPI } from "../src/api/authAPI";
import { saveTokenToLocalStorage } from "../lib/function";
import { signupInputArrayFactory } from "../lib/const";

type IFormInputs = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const Signup = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const router = useRouter();
  //初回訪問時はrouter.queryが空なので、空の文字列を代入しておく
  const { email = "", password = "" } = router.query;
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({
    mode: "onChange",
    defaultValues: { email: email, password: password },
  });
  const onSubmitHandler = async (data: IFormInputs) => {
    setIsLoading(true);
    try {
      const res = await authAPI.signup({
        email: data.email,
        password: data.password,
        username: data.username,
      });
      saveTokenToLocalStorage(res.data.token);
      setIsLoading(false);
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

  const inputArray = signupInputArrayFactory(register, errors, getValues);
  const formContent = (
    <div>
      <div className="text-center">新規登録はこちらから</div>
      {/* todo:formをコンポーネント化する */}
      <form className="flex flex-col gap-2 items-stretch  h-full my-4 mx-4">
        {inputArray.map((inputItem) => {
          return <InputItemComponent {...inputItem} key={inputItem.sr} />;
        })}
        <Button
          Btype="primary"
          className="bg-green-500"
          onClick={handleSubmit(onSubmitHandler)}
        >
          {isLoading ? "Loading..." : "新規登録"}
        </Button>

        <Button
          Btype="secondary"
          onClick={(event) => {
            event.preventDefault();
            router.push(
              {
                pathname: "/signin",
                query: {
                  email: getValues("email"),
                  password: getValues("password"),
                },
              },
              "/signin"
            );
          }}
        >
          ログイン
        </Button>
      </form>
    </div>
  );
  return (
    <>
      <AuthLayout formContent={formContent} />
    </>
  );
};

export default Signup;
