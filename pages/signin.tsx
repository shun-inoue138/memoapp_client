import React, { useEffect, useLayoutEffect, useMemo } from "react";

import { useForm } from "react-hook-form";

import Link from "next/link";
import { Router, useRouter } from "next/router";

import AuthLayout from "../src/components/templates/AuthLayout";
import InputItemComponent from "../src/components/molecules/InputItemComponent";
import Button from "../src/components/atoms/Button";
import axios from "axios";
import { authAPI } from "../src/api/authAPI";
import { saveTokenToLocalStorage } from "../lib/function";
import { signinInputArrayFactory } from "../lib/const";
import { useAuthRouter } from "../src/hooks/useAuthRouter";
import { IFormInputs, useAuthForm } from "../src/hooks/useAuthForm";
import AuthFormContainer from "../src/components/atoms/AuthFormContainer";

const Login = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  //todo:下記２行をhooksに切り出す
  const { router, email, password } = useAuthRouter();
  const { register, handleSubmit, getValues, errors, reset } = useAuthForm({
    defaultEmail: email,
    defaultPassword: password,
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
  const inputArray = useMemo(() => {
    return signinInputArrayFactory(register, errors);
  }, [register, errors]);

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
