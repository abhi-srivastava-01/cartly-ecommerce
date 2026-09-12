import { z } from "zod";

const addressSchema = z.object({
  state: z.string().trim(),
  city: z.string().trim(),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Invalid pincode"),
});

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(40)
    .optional(),

  age: z.coerce
    .number()
    .int("Age must be an integer")
    .min(8, "Age must be at least 8")
    .max(80, "Age must be below 80")
    .optional(),

  mobileNumber: z
    .string()
    .regex(/^[6-9]\d{9}$/, "Invalid Indian mobile number")
    .optional(),

  address: addressSchema.optional(),
});
