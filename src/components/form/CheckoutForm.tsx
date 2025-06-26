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

const CheckoutForm = () => {
    const { cart, clearCart } = useCart();

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
        console.log("Form submission started with data:", data);
        
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

            console.log("Sending request with payload:", requestData);

            const result = await createCheckoutSession(requestData);
            console.log("API response:", result);

            // ✅ Redirect to Stripe Checkout if URL exists
            if (result?.data?.url) {
                window.location.href = result.data.url;
                clearCart();
            } else {
                throw new Error("Checkout session created but redirect URL was not provided.");
            }

        } catch (error) {
            console.error("Full error details:", error);
            
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
        <div className="w-2/3 mx-auto px-4 pb-8">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delivery Address</h2>

                        {errors.root && (
                            <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
                                {errors.root.message}
                            </div>
                        )}

                        <JudyInput
                            label="Full Address"
                            name="fullAddress"
                            required={true}
                            className="mb-2"
                        />

                        <JudyInput
                            label="Contact Number"
                            name="contactNumber"
                            required={true}
                            className="mb-2"
                        />

                        <JudyInput
                            label="Contact Email"
                            name="contactEmail"
                            required={true}
                            type="email"
                            className="mb-2"
                        />

                        <JudyInput
                            label="Zipcode"
                            name="zipcode"
                            required={true}
                            className="mb-2"
                        />

                        <div className="mb-4">
                            <label className="flex items-center">
                                <Checkbox
                                    {...register("sameBilling")}
                                    checked={sameBilling}
                                    onChange={(e) => methods.setValue("sameBilling", e.target.checked)}
                                />
                                <span className="ml-2">Same as shipping address</span>
                            </label>
                        </div>

                        <div className="mb-4">
                            <label className="block my-2  text-gray-700">Shipping Method</label>
                            <select
                                {...register("shippingMethod")}
                                className="w-full p-2 border rounded-md"
                            >
                                <option value="inSideCity">In Side City</option>
                                <option value="outSideCity">Out of Side City</option>
                            </select>
                        </div>

                        <div className="mb-4">
                            <label className="block mt-2 text-gray-700">Additional Notes</label>
                            <Textarea
                                rows={4}
                                placeholder="Additional notes"
                                {...register("additionalNotes")}
                                className="w-full p-2 border rounded-md"
                            />
                        </div>

                        {!sameBilling && (
                            <div className="mb-4 space-y-2">
                                <JudyInput
                                    label="Billing Address Line 1"
                                    name="billingAddress.line1"
                                    required={true}
                                />
                                <JudyInput
                                    label="Billing Address Line 2"
                                    name="billingAddress.line2"
                                />
                                <JudyInput
                                    label="Billing City"
                                    name="billingAddress.city"
                                    required={true}
                                />
                                <JudyInput
                                    label="Billing Country"
                                    name="billingAddress.country"
                                    required={true}
                                />
                            </div>
                        )}

                        <div className="text-center">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                className={`bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 ${
                                    isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                                }`}
                            >
                                {isSubmitting ? 'Processing...' : 'Checkout'}
                            </Button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default CheckoutForm;
