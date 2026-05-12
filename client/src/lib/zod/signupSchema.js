import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(2, "Name required"),

    email: z.string().email("Valid email required"),

    password: z.string().min(6, "Min 6 characters"),

    confirmPassword: z.string(),
  })

  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
  });