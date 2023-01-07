import React from "react";

import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/router";
import InputItemComponent from "../src/components/molecules/InputItemComponent";
import Button from "../src/components/atoms/Button";
import AuthLayout from "../src/components/templates/AuthLayout";
import { authAPI } from "../src/api/authAPI";
import { saveTokenToLocalStorage } from "../lib/function";

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

  const inputArray = [
    {
      sr: "Name",
      placeholder: "ユーザー名",
      type: "text",
      registerReturn: register("username", {
        required: "必須です",
        maxLength: { value: 10, message: "10文字以内です" },
        minLength: { value: 2, message: "2文字以上です" },
        pattern: { value: /^[A-Za-z0-9]+$/i, message: "半角英字のみです" },
      }),
      errors: errors.username?.message,
    },
    {
      sr: "Email",
      placeholder: "Eメール",
      type: "email",
      registerReturn: register("email", {
        required: "必須です",
        pattern: {
          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          message: "有効なメールアドレスではありません",
        },
      }),
      errors: errors.email?.message,
    },
    {
      sr: "Password",
      placeholder: "パスワード",
      type: "password",
      registerReturn: register("password", {
        required: "必須です",
        maxLength: { value: 10, message: "10文字以内です" },
        minLength: { value: 2, message: "2文字以上です" },
        pattern: { value: /^[A-Za-z0-9]+$/i, message: "半角英字のみです" },
      }),
      errors: errors.password?.message,
    },
    {
      sr: "Password Confirmation",
      placeholder: "パスワード確認",
      type: "password",
      registerReturn: register("password_confirmation", {
        required: "必須です",
        validate: (value) =>
          value === getValues("password") || "パスワードが一致しません",
      }),
      errors: errors.password_confirmation?.message,
    },
  ];

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
