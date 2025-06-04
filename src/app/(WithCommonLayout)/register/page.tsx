"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";

import registerValidationSchema from "@/src/schemas/register.schema";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import JudyForm from "@/src/components/form/JudyForm";
import JudyInput from "@/src/components/form/JudyInput";
import Image from "next/image";

export default function RegisterPage() {
  const { mutate: handleUserRegistration, isPending } = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
    };

    console.log("Inside form user data: ", userData);
    handleUserRegistration(userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-md overflow-hidden">
        {/* Left Side - Image Placeholder */}
        <div className="hidden md:block md:w-1/2 bg-indigo-600">
          <div className="h-full flex items-center justify-center p-10">
            <div className="text-white text-center">
              <Image
                src="/hero1.jpg"
                alt="Registration Illustration"
                width={708}
                height={1024}
                className="mx-auto"
              />
              <h2 className="text-2xl font-bold mt-6">Welcome to Our Platform</h2>
              <p className="mt-2">Join thousands of happy users today</p>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full md:w-1/2 p-8 border">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Register</h2>
            <p className="mt-2 text-sm text-gray-500">Sign up to your account</p>
          </div>

          {/* Form */}
          <JudyForm
            defaultValues={{
              name: "Mir Hussain",
              email: "mir@gmail.com",
              mobileNumber: "01711223344",
              password: "123456",
            }}
            resolver={zodResolver(registerValidationSchema)}
            onSubmit={onSubmit}
          >
            <div className="space-y-8">
              <JudyInput
                label="Full Name"
                name="name"
                size="sm"
              />
              <JudyInput
                label="Email Address"
                name="email"
                size="sm"
              />
              <JudyInput
                label="Mobile Number"
                name="mobileNumber"
                size="sm"
              />
              <JudyInput
                label="Password"
                name="password"
                type="password"
                size="sm"
              />
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <Button
                type="submit"
                size="lg"
                className="w-full rounded-none bg-orange-500 py-2 text-sm font-semibold text-white hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                disabled={isPending}
              >
                {isPending ? "Registering..." : "Register"}
              </Button>
            </div>
          </JudyForm>

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-600">Other log in options</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Social Auth Buttons */}
          <div className="flex flex-col space-y-2">
            <h1>Log In with Open Account</h1>
            <Button
              type="button"
              size="sm"
              className="flex items-center justify-center rounded-none border border-gray-300 bg-white py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Log In with Google
            </Button>
          </div>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-indigo-600 hover:underline">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
