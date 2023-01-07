import React, { FC } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputItem = {
  sr: string;
  placeholder: string;
  type: string;
  registerReturn: any;
  errors: string | undefined;
  key: string;
};

const InputItemComponent: FC<InputItem> = (inputItem) => {
  return (
    <div className="mb-1 last:mb-0" key={inputItem.key}>
      <label>
        <span className="sr-only">{inputItem.sr}</span>
        <input
          type={inputItem.type}
          placeholder={inputItem.placeholder}
          {...inputItem.registerReturn}
          className="outline rounded-md py-2 px-4 w-full"
        />
        <p className="h-6">{inputItem.errors}</p>
      </label>
    </div>
  );
};

export default InputItemComponent;
