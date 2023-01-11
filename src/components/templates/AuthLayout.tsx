import { useRouter } from "next/router";
import React, { FC, ReactNode, useEffect, useLayoutEffect } from "react";

import { useJwtAuth } from "../../hooks/useJwtAuth";

const AuthLayout: FC<{ formContent: ReactNode }> = ({ formContent }) => {
  useJwtAuth();
  return (
    <div className="h-screen grid grid-cols-2 items-center justify-items-center">
      <div>
        <h1 className="text-5xl text-violet-600 font-bold font-sans">
          authページ
        </h1>
        <p>
          この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています
        </p>
      </div>
      <div className=" p-2 shadow-md rounded-sm w-[60%]">{formContent}</div>
    </div>
  );
};

export default AuthLayout;
