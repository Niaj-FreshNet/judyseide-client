"use server";

import { FieldValues } from "react-hook-form";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

import axiosInstance from "@/src/lib/AxiosInstance";

export const registerUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/register", userData);

    if (data.success) {
      const cookieStore = await cookies();

      cookieStore.set("accessToken", data?.data?.accessToken);
      cookieStore.set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Registration failed. Please try again.");
  }
};

export const verifyUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/verify-email", userData);

    if (data.success) {
      const cookieStore = await cookies();

      cookieStore.set("accessToken", data?.data?.accessToken);
      cookieStore.set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Verification failed. Please try again.");
  }
};

export const resendVerifyEmailToken = async (email: string) => {
  try {
    const { data } = await axiosInstance.post("/auth/resend-verify-email-token", { email });
    
    if (data.success) {
      return data;
    }    
    throw new Error("Failed to resend OTP. Please try again.");
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Failed to resend OTP. Please try again.");
  }
};

export const loginUser = async (userData: FieldValues) => {
  try {
    const { data } = await axiosInstance.post("/auth/login", userData);

    if (data.success) {
      const cookieStore = await cookies();

      cookieStore.set("accessToken", data?.data?.accessToken);
      cookieStore.set("refreshToken", data?.data?.refreshToken);
      cookieStore.set("userName", data?.data?.user?.name);  // Store name directly in cookie
      cookieStore.set("userImg", data?.data?.user?.imageUrl);  // Store imageUrl directly in cookie

    }

    console.log(data?.data?.user?.name)
    return data?.data?.user;
  } catch (error: any) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Login failed. Please try again.");
  }
};

export const logout = async () => {
  const cookieStore = await cookies();

  cookieStore.delete("accessToken");
  cookieStore.delete("refreshToken");
  cookieStore.delete("userName");
  cookieStore.delete("imageUrl");
};

export const getCurrentUser = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) return null;

  try {
    const decodedToken = jwtDecode(accessToken) as {
      userId: string;
      email: string;
      mobileNumber?: string;
      role: string;
      status: string;
      // Add other claims you expect in the token
    };

    return {
      _id: decodedToken.userId,
      name: cookieStore.get("userName")?.value,
      email: decodedToken.email,
      mobileNumber: decodedToken.mobileNumber,
      role: decodedToken.role,
      status: decodedToken.status,
      profilePhoto: cookieStore.get("userImg")?.value,
    };
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};
