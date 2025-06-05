import { z } from "zod";

const emailValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
});

export default emailValidationSchema;
