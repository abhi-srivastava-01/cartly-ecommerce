import { z } from "zod";

// Registration validation schema
export const registerValidationSchema = z.object({
  name: z.string().trim().min(3, "Name must be at least 3 characters").max(40),
  email: z.string().trim().email("Invalid email"),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(10, "Less than 11"),
});

// Login validation schema
export const loginValidationSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Address
const addressSchema = z.object({
  state: z.string().trim(),
  city: z.string().trim(),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Invalid pincode"),
});

// Update User validation schema
export const updateUserValidationSchema = z.object({
  name: z.coerce
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(40)
    .optional(),
  age: z
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

// Product Schema ------

// Sub schemas
// const imageSchema = z.object({
//   url: z.string().url(),
//   public_id: z.string().optional(),
// });

const variantSchema = z.object({
  size: z.string().optional(),
  color: z.string().optional(),
});

const reviewSchema = z.object({
  rating: z.coerce.number().min(1).max(5),
  comment: z.string().min(1),
});

// Product Schema
export const productValidationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),

  description: z.string().min(10, "Description must be at least 10 characters"),

  price: z.coerce.number().positive("Price must be a positive number"),

  discountPrice: z.coerce.number().optional(),

  category: z.string().min(1, "Category must be at least 1 character"),

  brand: z.string().optional(),

  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),

  // images: z.array(imageSchema).min(1),

  variants: z.array(variantSchema).optional(),

  tags: z.array(z.string()).optional(),

  reviews: z.array(reviewSchema).optional(),
});

// Update Product Schema
export const updateProductValidationSchema = productValidationSchema.partial();
