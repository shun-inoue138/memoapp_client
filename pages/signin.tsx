import React, { useEffect, useLayoutEffect, useMemo } from "react";

import { useForm } from "react-hook-form";

import Link from "next/link";
import { Router, useRouter } from "next/router";

import AuthLayout from "../src/components/templates/AuthLayout";
import InputItemComponent from "../src/components/molecules/InputItemComponent";
import Button from "../src/components/atoms/Button";
import axios from "axios";
import { authAPI } from "../src/api/authAPI";
import { saveTokenToLocalStorage } from "../src/utils/function";
import { signinInputArrayFactory } from "../src/utils/const";
import { useAuthRouter } from "../src/hooks/useAuthRouter";
import { IFormInputs, useAuthForm } from "../src/hooks/useAuthForm";
import AuthFormContainer from "../src/components/atoms/AuthFormContainer";
import useUserStore from "../src/stores/useUserStore";

const Login = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  //todo:下記２行をhooksに切り出す
  const { router, email, password } = useAuthRouter();
  const { register, handleSubmit, getValues, errors, reset } = useAuthForm({
    defaultEmail: email,
    defaultPassword: password,
  });
  const { currentUser, setCurrentUser } = useUserStore(
    (state) => state,
    (prev, next) => prev.currentUser === next.currentUser
  );

  const onSubmitHandler = async (data: IFormInputs) => {
    setIsLoading(true);
    try {
      const res = await authAPI.signin(data);
      await saveTokenToLocalStorage(res.data.token);
      setCurrentUser(res.data.user);
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      alert(error);
      setIsLoading(false);
    }
  };

  //useMemoを使うと、errorsが更新されない。
  // const inputArray = useMemo(() => {
  //   return signinInputArrayFactory(register, errors);
  // }, [errors]);
  const inputArray = signinInputArrayFactory(register, errors);
  // const inputArray = [
  //   {
  //     sr: "Email",
  //     placeholder: "Eメール",
  //     type: "email",
  //     registerReturn: register("email", {
  //       required: "必須です",
  //       pattern: {
  //         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  //         message: "有効なメールアドレスではありません",
  //       },
  //     }),
  //     errors: errors.email?.message,
  //   },
  //   {
  //     sr: "Password",
  //     placeholder: "パスワード",
  //     type: "password",
  //     registerReturn: register("password", {
  //       required: "必須です",
  //       maxLength: { value: 10, message: "10文字以内です" },
  //       minLength: { value: 2, message: "2文字以上です" },
  //       pattern: { value: /^[A-Za-z0-9]+$/i, message: "半角英字のみです" },
  //     }),
  //     errors: errors.password?.message,
  //   },
  // ];
  const formContent = (
    <div>
      <div className="text-center">ログインはこちらから</div>
      {/* todo:formのコンポーネント化 */}
      <AuthFormContainer>
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
      </AuthFormContainer>
    </div>
  );
  return (
    <>
      <AuthLayout formContent={formContent} />
    </>
  );
};

export default Login;
