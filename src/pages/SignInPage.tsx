import React from "react";
import AuthForm, { AuthFormData } from "../components/form/AuthForm";
import { SubmitHandler } from "react-hook-form";
import { useAuthMutation } from "../api/auth";
import { useNavigate } from "react-router-dom";

const SignInPage: React.FC = () => {
  const navigate = useNavigate();
  const { signInMutation } = useAuthMutation();
  const handleSubmit: SubmitHandler<AuthFormData> = (data) => {
    signInMutation.mutate(data, {
      onSuccess: () => {
        navigate("/home", { replace: true });
      },
    });
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 pb-20 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <AuthForm
          submitText="Sign In"
          onSubmit={handleSubmit}
          serverErrorMessage={signInMutation.error?.message}
        />
        <p className="mt-10 text-center text-sm/6 text-gray-500">
          Dont have an account?{" "}
          <a
            className="font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;
