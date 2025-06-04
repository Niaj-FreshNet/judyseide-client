import { z } from "zod";

const loginValidationSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),
  password: z.string().trim().min(6, "Passwod needs to be at least 6 characters long"),
});

export default loginValidationSchema;
