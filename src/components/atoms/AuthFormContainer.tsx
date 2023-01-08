import React, { FC, ReactNode } from "react";

const AuthFormContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <form className="flex flex-col gap-2  h-full my-4 mx-4">{children}</form>
  );
};

export default AuthFormContainer;
