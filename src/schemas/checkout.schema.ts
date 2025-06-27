import { z } from "zod";

const checkoutValidationSchema = z.object({
    fullAddress: z.string().min(1, "Please enter your full address!"),
    contactNumber: z
        .string()
        .regex(/^\+?\d{1,15}$/, "Please enter a valid contact number!"), // You can adjust the regex to your format
    contactEmail: z.string().email("Please enter a valid email address!"),
    shippingMethod: z.string().min(1, "Please select a shipping method!"),
    additionalNotes: z.string().optional(), // Optional field
    zipcode: z.string().min(5, "Please enter a valid zipcode!"),
    sameBilling: z.boolean(),
    billingAddress: z
        .object({
            line1: z.string().min(1, "Billing address line 1 is required!"),
            line2: z.string().optional(),
            city: z.string().min(1, "Billing city is required!"),
            country: z.string().min(1, "Billing country is required!"),
        })
        .optional(),
});

export default checkoutValidationSchema;
