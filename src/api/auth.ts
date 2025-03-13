import { useMutation } from "@tanstack/react-query";
import useApi from "../hooks/useApi";
import { useAuth } from "../hooks/useAuth";

type AuthBody = {
  email: string;
  password: string;
};

type AuthResponse = {
  token: string;
};

export const useAuthMutation = () => {
  const { fetchData } = useApi();
  const { signIn } = useAuth();

  const signInMutation = useMutation({
    mutationFn: async (body: AuthBody) => {
      return fetchData(`/auth/signin`, { body, method: "POST" });
    },
    onSuccess: (data: AuthResponse) => {
      signIn(data.token);
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async (body: AuthBody) => {
      return fetchData(`/auth/signUp`, { body, method: "POST" });
    },
    onSuccess: (data: AuthResponse) => {
      signIn(data.token);
    },
  });

  return { signInMutation, signUpMutation };
};
