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
    handleUserRegistration(data);
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white border border-gray-100 rounded-md shadow-lg overflow-hidden">
        
        {/* Image Side */}
        <div className="w-full md:w-1/2 h-64 md:h-auto">
          <Image
            alt="Registration Illustration"
            className="object-cover w-full h-full"
            src="/products/bracelet.jpg"
            width={1024}
            height={1024}
          />
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-2 md:p-12 flex justify-center items-center">
          <div className="w-full max-w-md">
            <h2 className="text-3xl sm:text-4xl font-bold text-orange-500 text-center mb-4">
              Register
            </h2>

            <div className="bg-white rounded-md shadow-md px-4 pt-4 pb-8 md:px-8 md:pt-8 md:pb-16 space-y-6 border border-gray-50">
              <JudyForm
                resolver={zodResolver(registerValidationSchema)}
                onSubmit={onSubmit}
              >
                <p className="text-xl sm:text-2xl text-center font-semibold text-gray-800 mb-6">
                  Sign up to your account
                </p>
                <div className="space-y-4">
                  <JudyInput label="Name" name="name" size="lg" />
                  <JudyInput label="Email Address" name="email" size="lg" />
                  {/* <JudyInput label="Mobile Number" name="mobileNumber" size="lg" /> */}
                  <JudyInput label="Password" name="password" size="lg" type="password" />
                </div>

                <div className="mt-6">
                  <Button
                    className="w-full bg-orange-500 py-2 text-lg font-semibold text-white hover:bg-orange-400 rounded-md"
                    disabled={isPending}
                    size="lg"
                    type="submit"
                  >
                    {isPending ? "Registering..." : "Register"}
                  </Button>
                </div>
              </JudyForm>

              {/* Divider */}
              {/* <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-600">Other log in options</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div> */}

              {/* Social Auth */}
              {/* <div className="space-y-2">
                <Button
                  className="w-full bg-white text-sm font-medium text-gray-700 border-2 border-gray-200 hover:bg-gray-50 flex items-center justify-center space-x-2 rounded-md py-3"
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
              </div> */}
            </div>

            {/* Login Link */}
            <p className="text-sm text-center text-gray-600 mt-6">
              Already have an account?{" "}
              <Link href="/login" className="text-orange-500 font-medium hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
