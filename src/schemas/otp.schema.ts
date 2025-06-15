import { z } from "zod";

const otpValidationSchema = z.object({
  token: z.string().trim().min(6, "OTP needs to be at least 6 characters long"),
});

export default otpValidationSchema;
