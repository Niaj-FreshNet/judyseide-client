/* eslint-disable no-console */
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@heroui/button";
import Link from "next/link";
import { FieldValues, SubmitHandler } from "react-hook-form";
import Image from "next/image";

import registerValidationSchema from "@/src/schemas/register.schema";
import { useUserRegistration } from "@/src/hooks/auth.hook";
import JudyForm from "@/src/components/form/JudyForm";
import JudyInput from "@/src/components/form/JudyInput";

export default function RegisterPage() {
  const { mutate: handleUserRegistration, isPending } = useUserRegistration();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userData = {
      ...data,
    };
    handleUserRegistration(userData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex w-full bg-white border border-gray-100 rounded-md shadow-lg overflow-hidden">
        {/* Left Side - Image Placeholder */}
        <div className="hidden md:block md:w-1/2 border-r-2">
          <div className="h-full flex items-center justify-center p-10">
            <div className="text-white text-center">
              <Image
                alt="Registration Illustration"
                className="object-cover w-full h-full mx-auto"
                src="/products/bracelet.jpg"
                width={1024}
                height={1024}
              />
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full md:w-1/2 p-12 flex justify-center items-center">
          <div className="w-full">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-orange-500 mb-4">Register</h2>
            </div>

            <div className="px-8 pt-8 pb-16 rounded-md shadow-2xl border border-gray-50 space-y-6">
              {/* Form */}
              <JudyForm
                // defaultValues={{
                //   name: "Mir Hussain",
                //   email: "mir@gmail.com",
                //   mobileNumber: "01711223344",
                //   password: "123456",
                // }}
                resolver={zodResolver(registerValidationSchema)}
                onSubmit={onSubmit}
              >
                <p className="mt-2 text-2xl text-center text-default-800 font-semibold mb-6 ml-2">Sign up to your account</p>
                <div className="space-y-4">
                  <JudyInput label="Name" name="name" size="lg" />
                  <JudyInput label="Email Address" name="email" size="lg" />
                  <JudyInput label="Mobile Number" name="mobileNumber" size="lg" />
                  <JudyInput label="Password" name="password" size="lg" type="password" />
                </div>

                {/* Submit Button */}
                <div className="mt-6">
                  <Button
                    className="w-full rounded-none bg-orange-500 py-2 text-lg font-semibold text-white hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                    disabled={isPending}
                    size="lg"
                    type="submit"
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
                  className="w-full rounded-md bg-white py-4 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 border-2 border-gray-200 flex items-center justify-center space-x-2"
                  size="sm"
                  type="button"
                >
                  <Image
                    src="/google.svg"
                    alt="Google"
                    width={20}
                    height={20}
                  />
                  <span>Log In with Google</span>
                </Button>
              </div>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-default-600 mt-8">
              Already have an account?{" "}
              <Link className="underline font-medium text-orange-500 hover:underline" href="/login">
                Login
              </Link>
            </p>

          </div>
        </div>
      </div>
    </div>
  );
}
