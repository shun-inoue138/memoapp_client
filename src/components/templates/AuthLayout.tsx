import { useRouter } from "next/router";
import React, { FC, ReactNode, useEffect, useLayoutEffect } from "react";
import { tryTokenAuth } from "../../../lib/function";

const AuthLayout: FC<{ formContent: ReactNode }> = ({ formContent }) => {
  const router = useRouter();
  useEffect(() => {
    console.log("AuthLayout");

    tryTokenAuth(router);
  }, []);
  return (
    <div className="h-screen grid grid-cols-2 items-center justify-items-center">
      <div>
        <h1 className="text-5xl text-violet-600 font-bold font-sans">
          Real SNS
        </h1>
        <p>本格的なSNSを、自分の手で。</p>
      </div>
      <div className=" p-2 shadow-md rounded-sm w-[60%]">{formContent}</div>
    </div>
  );
};

export default AuthLayout;
