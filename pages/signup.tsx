import React, { useMemo } from "react";

import { useForm } from "react-hook-form";

import Link from "next/link";
import { useRouter } from "next/router";
import InputItemComponent from "../src/components/molecules/InputItemComponent";
import Button from "../src/components/atoms/Button";
import AuthLayout from "../src/components/templates/AuthLayout";
import { authAPI } from "../src/api/authAPI";
import { saveTokenToLocalStorage } from "../src/utils/function";
import { signupInputArrayFactory } from "../src/utils/const";
import { useAuthRouter } from "../src/hooks/useAuthRouter";
import { IFormInputs, useAuthForm } from "../src/hooks/useAuthForm";
import AuthFormContainer from "../src/components/atoms/AuthFormContainer";

const Signup = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const { router, email, password } = useAuthRouter();

  const { register, handleSubmit, getValues, errors, reset } = useAuthForm({
    defaultEmail: email,
    defaultPassword: password,
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
  //useMemoを使うと、errorsが更新されない。
  // const inputArray = useMemo(() => {
  //   return signupInputArrayFactory(register, errors, getValues);
  // }, [register, errors, getValues]);
  const inputArray = signupInputArrayFactory(register, errors, getValues);

  const formContent = (
    <div>
      <div className="text-center">新規登録はこちらから</div>
      {/* todo:formをコンポーネント化する */}
      <AuthFormContainer>
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
      </AuthFormContainer>
    </div>
  );
  return (
    <>
      <AuthLayout formContent={formContent} />
    </>
  );
};

export default Signup;
