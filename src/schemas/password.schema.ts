import { z } from "zod";

const passwordValidationSchema = z.object({
  password: z.string().trim().min(6, "Passwod needs to be at least 6 characters long"),
});

export default passwordValidationSchema;
