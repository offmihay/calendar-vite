import React, { useEffect } from "react";
import { useForm, SubmitHandler, useWatch } from "react-hook-form";
import Input from "../input/Input";

type Props = {
  onSubmit: SubmitHandler<AuthFormData>;
  submitText: string;
  serverErrorMessage?: string;
};

export type AuthFormData = {
  email: string;
  password: string;
};

const AuthForm: React.FC<Props> = ({
  onSubmit,
  submitText,
  serverErrorMessage,
}) => {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<AuthFormData>({
    mode: "onSubmit",
  });

  useEffect(() => {
    setError("root", {
      message: serverErrorMessage,
    });
  }, [serverErrorMessage, setError]);

  const formValues = useWatch({ control });

  useEffect(() => {
    if (errors.root?.message) {
      clearErrors("root");
    }
  }, [formValues, errors, clearErrors]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          label="Email"
          id="email"
          {...register("email", {
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email format",
            },
          })}
        />
        {errors.email && (
          <p className="text-red-600 mt-2 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Input
          label="Password"
          id="password"
          type="password"
          {...register("password", {
            minLength: {
              value: 4,
              message: "Password must be at least 4 characters",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-600 mt-2 text-sm">{errors.password.message}</p>
        )}
      </div>
      {errors.root && (
        <p className="text-red-600 mt-2 text-sm">{errors.root.message}</p>
      )}

      <div className="mt-12">
        <button
          type="submit"
          className="cursor-pointer flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          {submitText}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
