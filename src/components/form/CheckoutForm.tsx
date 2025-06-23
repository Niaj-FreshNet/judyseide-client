'use client';

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from '@heroui/checkbox';
import { Button } from "@heroui/button";
import { Textarea } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import checkoutValidationSchema from "@/src/schemas/checkout.schema"; // Import your checkout schema
import JudyForm from "@/src/components/form/JudyForm";
import JudyInput from "@/src/components/form/JudyInput";
import { createCheckoutSession } from "@/src/services/Checkout";
import { useCart } from "@/src/context/cart.context";


const CheckoutForm = () => {
    const [sameBilling, setSameBilling] = useState(true);

    const { cart } = useCart(); // ✅ Get cart from context

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(checkoutValidationSchema),
    });

const onSubmit = async (data: any) => {
        console.log("Form submitted", data);

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
                    line1: data.billingAddress?.line1,
                    line2: data.billingAddress?.line2,
                    city: data.billingAddress?.city,
                    country: data.billingAddress?.country,
                },
            zipcode: data.zipcode,
            note: data.additionalNotes,
        };

        console.log("Request Data:", requestData); // 🔍 Log request data

        try {
            const result = await createCheckoutSession(requestData);
            console.log("Checkout session created:", result); // Log API response
        } catch (error) {
            console.error("Error creating checkout session:", error); // Log error if API call fails
        }
    };

    return (
        <div className="w-2/3 mx-auto px-4 pb-8">
            <JudyForm resolver={zodResolver(checkoutValidationSchema)} onSubmit={onSubmit}>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delivery Address</h2>

                    {/* Shipping Address Fields */}
                    <div className="mb-2">
                        <JudyInput
                            label="Full Address"
                            name="fullAddress"
                            required={true}
                            className="w-full py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        {errors.fullAddress && <span className="text-red-500 text-sm">{errors.fullAddress.message}</span>}
                    </div>

                    <div className="mb-2">
                        <JudyInput
                            label="Contact Number"
                            name="contactNumber"
                            required={true}
                            className="w-full py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        {errors.contactNumber && <span className="text-red-500 text-sm">{errors.contactNumber.message}</span>}
                    </div>

                    <div className="mb-2">
                        <JudyInput
                            label="Contact Email"
                            name="contactEmail"
                            required={true}
                            type="email"
                            className="w-full py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                        {errors.contactEmail && <span className="text-red-500 text-sm">{errors.contactEmail.message}</span>}
                    </div>

                    {/* Same Billing Address Checkbox */}
                    <div className="mb-2">
                        <Checkbox
                            checked={sameBilling}
                            onChange={() => setSameBilling(!sameBilling)}
                        >
                            Same as shipping address
                        </Checkbox>
                    </div>

                    {/* Shipping Method */}
                    <div className="mb-2">
                        <label htmlFor="shippingMethod" className="block my-2 text-gray-700">Shipping Method</label>
                        <select
                            {...register("shippingMethod")}
                            className="w-full p-2 rounded-md outline-none focus:outline-none ring-2 focus:ring-2 ring-gray-200 focus:ring-orange-500"
                        >
                            <option value="inSideCity">In Side City</option>
                            <option value="outSideCity">Out of Side City</option>
                        </select>
                        {errors.shippingMethod && <span className="text-red-500 text-sm">{errors.shippingMethod.message}</span>}
                    </div>

                    {/* Additional Notes */}
                    <div className="mb-2">
                        <label htmlFor="additionalNotes" className="block mt-2 text-gray-700">Additional Notes</label>
                        <Textarea
                            id="additionalNotes"
                            rows={4}
                            placeholder="Additional notes"
                            {...register("additionalNotes")}
                            className="w-full py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                    </div>

                    {/* Billing Address Fields (Only show if sameBilling is false) */}
                    {!sameBilling && (
                        <>
                            <div className="mb-2">
                                <JudyInput
                                    label="Billing Address Line 1"
                                    name="billingAddress.line1" // Access as part of the billingAddress object
                                    required={!sameBilling}
                                    className="w-full py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                {errors.billingAddress?.line1 && <span className="text-red-500 text-sm">{errors.billingAddress?.line1?.message}</span>}
                            </div>

                            <div className="mb-2">
                                <JudyInput
                                    label="Billing Address Line 2"
                                    name="billingAddress.line2" // Access as part of the billingAddress object
                                    className="w-full py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                {errors.billingAddress?.line2 && <span className="text-red-500 text-sm">{errors.billingAddress?.line2?.message}</span>}
                            </div>

                            <div className="mb-2">
                                <JudyInput
                                    label="Billing City"
                                    name="billingAddress.city" // Access as part of the billingAddress object
                                    required={!sameBilling}
                                    className="w-full py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                {errors.billingAddress?.city && <span className="text-red-500 text-sm">{errors.billingAddress?.city?.message}</span>}
                            </div>

                            <div className="mb-2">
                                <JudyInput
                                    label="Billing Country"
                                    name="billingAddress.country" // Access as part of the billingAddress object
                                    required={!sameBilling}
                                    className="w-full py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                                {errors.billingAddress?.country && <span className="text-red-500 text-sm">{errors.billingAddress?.country?.message}</span>}
                            </div>
                        </>
                    )}

                    {/* Submit Button */}
                    <div className="text-center">
                        <Button
                            type="submit"
                            className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                            Checkout
                        </Button>
                    </div>
                </div>
            </JudyForm>
        </div>
    );
};

export default CheckoutForm;