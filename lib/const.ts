export const BASE_API_URL = "http://localhost:3003/api/v1";

export const signinInputArrayFactory = (register, errors) => {
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
  return inputArray;
};

export const signupInputArrayFactory = (register, errors, getValues) => {
  const inputArray = [
    {
      sr: "Name",
      placeholder: "ユーザー名",
      type: "text",
      registerReturn: register("username", {
        required: "必須です",
        maxLength: { value: 10, message: "10文字以内です" },
        minLength: { value: 2, message: "2文字以上です" },
        pattern: { value: /^[A-Za-z0-9]+$/i, message: "半角英字のみです" },
      }),
      errors: errors.username?.message,
    },
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
    {
      sr: "Password Confirmation",
      placeholder: "パスワード確認",
      type: "password",
      registerReturn: register("password_confirmation", {
        required: "必須です",
        validate: (value) =>
          value === getValues("password") || "パスワードが一致しません",
      }),
      errors: errors.password_confirmation?.message,
    },
  ];

  return inputArray;
};
