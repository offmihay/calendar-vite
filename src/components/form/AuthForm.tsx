import React, { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

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
    register,
    handleSubmit,
    formState: { errors },
    watch,
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

  const email = watch("email");
  const password = watch("password");
  useEffect(() => {
    if (errors.root?.message) {
      clearErrors("root");
    }
  }, [email, password, errors, clearErrors]);

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label
          htmlFor="email"
          className="block text-sm/6 font-medium text-gray-900"
        >
          Email address
        </label>
        <div className="mt-2">
          <input
            id="email"
            {...register("email", {
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email format",
              },
            })}
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          {errors.email && (
            <p className="text-red-600 mt-1 text-sm">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-sm/6 font-medium text-gray-900"
          >
            Password
          </label>
        </div>
        <div className="mt-2">
          <input
            id="password"
            type="password"
            {...register("password", {
              minLength: {
                value: 4,
                message: "Password must be at least 4 characters",
              },
            })}
            autoComplete="current-password"
            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
          />
          {errors.password && (
            <p className="text-red-600 mt-1 text-sm">
              {errors.password.message}
            </p>
          )}
        </div>
        {errors.root && (
          <p className="text-red-600 mt-1 text-sm">{errors.root.message}</p>
        )}
      </div>

      <div>
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
