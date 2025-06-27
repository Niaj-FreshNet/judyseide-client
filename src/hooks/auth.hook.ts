import { useMutation } from "@tanstack/react-query";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

import { loginUser, registerUser, resendVerifyEmailToken, verifyUser } from "../services/AuthService";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const useUserRegistration = () => {
  const router = useRouter();

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER.REGISTRATION"],
    mutationFn: async (userData) => await registerUser(userData),
    onSuccess: (data) => {
      toast.success("User registration successful", data);
      router.push(`/email-verification?email=${encodeURIComponent(data?.data?.email)}`);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useUserVerification = () => {
  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER.VERIFICATION"],
    mutationFn: async (userData) => await verifyUser(userData),
    onSuccess: (data) => {
      toast.success("User verification successful", data);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};

export const useResendOtp = () => {
  return useMutation({
    mutationKey: ["USER.RESENDOTP"],
    mutationFn: resendVerifyEmailToken,
    onSuccess: () => {
      toast.success("OTP has been resent successfully.");
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};

export const useUserLogin = () => {
  const [userName, setUserName] = useState<string | null>(null); // Local state to store user name

  return useMutation<any, Error, FieldValues>({
    mutationKey: ["USER.LOGIN"],
    mutationFn: async (userData) => await loginUser(userData),
    onSuccess: (data) => {
      toast.success("User login successful", data);
      const name = data?.name;

      if (name) {
        setUserName(name); // Set the name in local state
      }

      // Optionally, you can store the name in cookies (if needed for persistent session)
      document.cookie = `userName=${name}; path=/`;
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
};
