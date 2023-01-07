import React, { useEffect, useLayoutEffect } from "react";

import { useForm } from "react-hook-form";

import Link from "next/link";
import { Router, useRouter } from "next/router";

import AuthLayout from "../src/components/templates/AuthLayout";
import InputItemComponent from "../src/components/molecules/InputItemComponent";
import Button from "../src/components/atoms/Button";
import axios from "axios";
import { authAPI } from "../src/api/authAPI";
import { saveTokenToLocalStorage } from "../lib/function";

type IFormInputs = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const Login = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  //todo:下記２行をhooksに切り出す
  const router = useRouter();
  const { email = "", password = "" } = router.query;

  //todo:下記をhooksに切り出す
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
      const res = await authAPI.signin(data);
      saveTokenToLocalStorage(res.data.token);
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

  //定数だが、コンポーネントの中に入れているので、毎回再生成されてしまう。registerの部分をcbとしてなんとかできないだろうか
  const inputArray = [
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
  ];

  const formContent = (
    <div>
      <div className="text-center">ログインはこちらから</div>
      <form className="flex flex-col gap-2 items-stretch  h-full my-4 mx-4">
        {inputArray.map((inputItem) => {
          return <InputItemComponent {...inputItem} key={inputItem.sr} />;
        })}
        <Button
          Btype="primary"
          className="bg-green-500"
          onClick={handleSubmit(onSubmitHandler)}
        >
          {isLoading ? "Loading..." : "ログイン"}
        </Button>
        <Button className="bg-white text-black"> パスワードを忘れた方</Button>

        <Button
          Btype="secondary"
          className="w-full"
          //todo:下記をlib/function.tsに切り出す。getvaluesはcbにする。
          onClick={(e) => {
            e.preventDefault();
            router.push(
              {
                pathname: "/signup",
                query: {
                  email: getValues("email"),
                  password: getValues("password"),
                },
              },
              "/signup"
            );
          }}
        >
          アカウント作成
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

export default Login;
