"use client";

import JudyForm from "@/src/components/form/JudyForm";
import JudyInput from "@/src/components/form/JudyInput";
import { useUser } from "@/src/context/user.proider";
import { useUserLogin } from "@/src/hooks/auth.hook";
import otpValidationSchema from "@/src/schemas/otp.schema";
import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useEffect } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

export default function ForgotPasswordPage() {
    // const searchParams = useSearchParams();
    // const router = useRouter();
    const { setIsLoading: userLoading } = useUser();

    // const redirect = searchParams.get("redirect");

    const { mutate: handleUserLogin, isPending, isSuccess } = useUserLogin();

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        handleUserLogin(data);
        userLoading(true);
    };

    useEffect(() => {
        if (!isPending && isSuccess) {
            // if (redirect) {
            //   router.push(redirect);
            // } else {
            //   router.push("/");
            // }
        }
    }, [isPending, isSuccess]);

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
                                src="/products/earring2.jpg"
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
                            <h2 className="text-4xl font-bold text-orange-500 mb-4">Email Verification</h2>
                        </div>

                        <div className="px-8 pt-16 pb-16  rounded-md shadow-2xl border border-gray-50 space-y-6">
                            {/* Form */}
                            <JudyForm
                                resolver={zodResolver(otpValidationSchema)}
                                onSubmit={onSubmit}
                            >
                                <div className="space-y-4">
                                    <JudyInput label="OTP" name="otp" size="lg" />
                                </div>

                                {/* Submit Button */}
                                <div className="mt-6">
                                    <Button
                                        className="w-full rounded-none bg-orange-500 py-2 text-lg font-normal text-white hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                                        disabled={isPending}
                                        size="lg"
                                        type="submit"
                                    >
                                        {isPending ? "Please wait..." : "Continue"}
                                    </Button>
                                </div>
                            </JudyForm>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
