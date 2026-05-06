import { z } from "zod";

// Registration validation schema
export const registerValidationSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Login validation schema
export const loginValidationSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});


// 

// Sub schemas
// const imageSchema = z.object({
//   url: z.string().url(),
//   public_id: z.string().optional(),
// });

const variantSchema = z.object({
  size: z.string().optional(),
  color: z.string().optional(),
  stock: z.number().int().min(0),
});

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(1),
});

// Product Schema
export const productValidationSchema = z.object({
  
  name: z.string().min(3, "Name must be at least 3 characters"),

  description: z.string().min(10, "Description must be at least 10 characters"),

  price: z.number().positive("Price must be a positive number"),

  discountPrice: z.number().optional(),

  category: z.string().min(1, "Category must be at least 1 character"),

  brand: z.string().optional(),

  stock: z.number().int().min(0, "Stock cannot be negative"),

  // images: z.array(imageSchema).min(1),

  variants: z.array(variantSchema).optional(),

  tags: z.array(z.string()).optional(),

  reviews: z.array(reviewSchema).optional(),
});

// Update Product Schema
export const updateProductValidationSchema = productValidationSchema.partial();
