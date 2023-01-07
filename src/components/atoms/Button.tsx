import clsx from "clsx";
import React, { ComponentProps, FC } from "react";

const Button: FC<
  ComponentProps<"button"> & {
    children: string;
    Btype?: "primary" | "secondary" | "alarm";
  }
> = ({ children, Btype = "primary", className, ...restProps }) => {
  return (
    <button
      className={clsx(
        "text-center py-2 px-6 bg-blue-600 rounded-md shadow-sm text-white font-bold hover:button-hover-filter",
        className
      )}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
