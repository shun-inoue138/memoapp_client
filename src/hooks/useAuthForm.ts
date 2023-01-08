import { useForm } from "react-hook-form";

export type IFormInputs = {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
};

export const useAuthForm = ({ defaultEmail, defaultPassword }) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm<IFormInputs>({
    mode: "onChange",
    defaultValues: { email: defaultEmail, password: defaultPassword },
  });

  return { register, handleSubmit, getValues, errors, reset };
};
