"use client";

import JudyForm from "@/src/components/form/JudyForm";
import JudyInput from "@/src/components/form/JudyInput";
import { useUser } from "@/src/context/user.proider";
import { useResendOtp, useUserVerification } from "@/src/hooks/auth.hook";
import otpValidationSchema from "@/src/schemas/otp.schema";
import { Button } from "@heroui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

export default function EmailVerificationForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { setIsLoading: userLoading } = useUser();

    const email = searchParams.get("email");
    const redirect = searchParams.get("redirect");

    const [isOtpResent, setIsOtpResent] = useState(false); // State for OTP resend confirmation

    const { mutate: handleUserVerification, isPending, isSuccess } = useUserVerification();
    const { mutate: resendOtp, isPending: isResendingOtp } = useResendOtp(); // Hook for resend OTP

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        const formData = { ...data, email };
        console.log("Form Data:", formData); // Check if email is passed correctly

        handleUserVerification(formData); // Submit form data with email
        userLoading(true);
    };

    useEffect(() => {
        if (!isPending && isSuccess) {
            if (redirect) {
                router.push(redirect);
            } else {
                router.push("/");
            }
        }
    }, [isPending, isSuccess]);

    const handleResendOtp = () => {
        if (email) {
            resendOtp({ email });
            setIsOtpResent(true); // Show confirmation that OTP is resent
        }
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

                            {/* OTP Sent Message */}
                            {email && (
                                <div className="text-center mb-6 text-lg text-gray-700">
                                    <p>An OTP has been sent to <strong>{email}</strong>.</p>
                                </div>
                            )}

                            {/* Form */}
                            <JudyForm
                                resolver={zodResolver(otpValidationSchema)}
                                onSubmit={onSubmit}
                            >
                                <div className="space-y-4">
                                    <JudyInput label="OTP" name="token" size="lg" />
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

                            {/* Resend OTP Button */}
                            <div className="text-center mt-4">
                                {isOtpResent ? (
                                    <p className="text-green-500 text-sm">OTP has been resent to your email.</p>
                                ) : (
                                    <Button
                                        onClick={handleResendOtp}
                                        className="text-sm text-orange-500 hover:underline"
                                        disabled={isResendingOtp}
                                    >
                                        {isResendingOtp ? "Resending..." : "Resend OTP"}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
