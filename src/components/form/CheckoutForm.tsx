'use client';

import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Checkbox } from '@heroui/checkbox';
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import checkoutValidationSchema from "@/src/schemas/checkout.schema";
import JudyInput from "@/src/components/form/JudyInput";
import { createCheckoutSession } from "@/src/services/Checkout";
import { useCart } from "@/src/context/cart.context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useUser } from "@/src/context/user.proider";

const CheckoutForm = () => {
    const { cart, clearCart } = useCart();
    const router = useRouter();
    const { user, isLoading: isUserLoading } = useUser();

    const methods = useForm({
        resolver: zodResolver(checkoutValidationSchema),
        defaultValues: {
            sameBilling: true,
            shippingMethod: "inSideCity",
            billingAddress: {
                line1: "",
                line2: "",
                city: "",
                country: ""
            }
        }
    });

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        watch,
        setError
    } = methods;

    const sameBilling = watch("sameBilling");

    const onSubmit = async (data: any) => {
        if (!user && !isUserLoading) {
            toast.error("You need to login first to proceed to checkout");
            router.push("/login");
            return;
        }

        try {
            if (!cart || cart.length === 0) {
                throw new Error("Your cart is empty");
            }

            const cartData = cart.map(item => ({
                variantId: item.variantId,
                quantity: item.quantity,
            }));

            const requestData = {
                cart: cartData,
                phone: data.contactNumber,
                address: sameBilling
                    ? {
                        line1: data.fullAddress,
                        line2: "",
                        city: "Dhaka",
                        country: "BD",
                    }
                    : {
                        line1: data.billingAddress.line1,
                        line2: data.billingAddress.line2,
                        city: data.billingAddress.city,
                        country: data.billingAddress.country,
                    },
                zipcode: data.zipcode,
                note: data.additionalNotes,
            };

            const result = await createCheckoutSession(requestData);

            if (result?.data?.url) {
                window.location.href = result.data.url;
                clearCart();
            } else {
                throw new Error("Checkout session created but redirect URL was not provided.");
            }

        } catch (error) {
            let errorMessage = "Checkout failed. Please try again.";

            if (error instanceof Error) {
                errorMessage = error.message;
                if (error.message.includes("Unexpected token '<'")) {
                    errorMessage = "Server returned an invalid response. Please contact support.";
                }
            }

            setError("root", {
                type: "manual",
                message: errorMessage
            });
        }
    };

    return (
        <div className="w-full md:w-4/5 lg:w-2/3 mx-auto px-4 sm:px-6 py-6 md:py-8">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
                        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">Delivery Address</h2>

                        {errors.root && (
                            <div className="mb-4 p-3 sm:p-4 bg-red-100 text-red-700 rounded text-sm sm:text-base">
                                {errors.root.message}
                            </div>
                        )}

                        <div className="space-y-4">
                            <JudyInput
                                label="Full Address"
                                name="fullAddress"
                                required={true}
                                className="w-full"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <JudyInput
                                    label="Contact Number"
                                    name="contactNumber"
                                    required={true}
                                    className="w-full"
                                />

                                <JudyInput
                                    label="Contact Email"
                                    name="contactEmail"
                                    required={true}
                                    type="email"
                                    className="w-full"
                                />
                            </div>

                            <JudyInput
                                label="Zipcode"
                                name="zipcode"
                                required={true}
                                className="w-full"
                            />

                            <div className="mb-4">
                                <label className="block text-sm sm:text-base text-gray-700 mb-2">Shipping Method</label>
                                <select
                                    {...register("shippingMethod")}
                                    className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base"
                                >
                                    <option value="inSideCity">In Side City</option>
                                    <option value="outSideCity">Out of Side City</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm sm:text-base text-gray-700 mb-2">Additional Notes</label>
                                <Textarea
                                    rows={3}
                                    placeholder="Additional notes"
                                    {...register("additionalNotes")}
                                    className="w-full p-2 sm:p-3 border rounded-md text-sm sm:text-base"
                                />
                            </div>

                            <div className="space-y-4">
                                <h3 className="text-lg font-medium text-gray-800">Billing Address</h3>
                                <JudyInput
                                    label="Billing Address Line 1"
                                    name="billingAddress.line1"
                                    required={true}
                                    className="w-full"
                                />
                                <JudyInput
                                    label="Billing Address Line 2"
                                    name="billingAddress.line2"
                                    className="w-full"
                                />
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <JudyInput
                                        label="Billing City"
                                        name="billingAddress.city"
                                        required={true}
                                        className="w-full"
                                    />
                                    <JudyInput
                                        label="Billing Country"
                                        name="billingAddress.country"
                                        required={true}
                                        className="w-full"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className={`w-full sm:w-auto bg-orange-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-md hover:bg-orange-600 transition-colors ${
                                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {isSubmitting ? 'Processing...' : 'Proceed to Checkout'}
                            </Button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default CheckoutForm;