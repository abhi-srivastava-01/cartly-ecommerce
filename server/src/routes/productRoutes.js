import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deletePrdouct,
} from "../controllers/productController.js";
import {
  isAuthenticatedUser,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";
import { zodValidate } from "../middlewares/zodValidate.js";
import {
  productValidationSchema,
  updateProductValidationSchema,
} from "../validations/zodValidationSchema.js";

const router = Router();

/**
 * @route   GET /api/products
 * @desc    Get all products
 * @access  Public
 */
router.get("/", getAllProducts);

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Private (only authenticated users with seller or admin role)
 */
router.post(
  "/",
  isAuthenticatedUser,
  authorizeRoles("seller", "admin"),
  zodValidate(productValidationSchema),
  createProduct,
);

/**
 * @route   GET /api/products/:id
 * @desc    Get single product by ID
 * @access  Public
 */
router.get("/:id", getSingleProduct);

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product by ID
 * @access  Private (only authenticated users with seller or admin role)
 */
router.put(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("seller", "admin"),
  zodValidate(updateProductValidationSchema),
  updateProduct,
);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product by ID
 * @access  Private (only authenticated users with seller or admin role)
 */
router.delete(
  "/:id",
  isAuthenticatedUser,
  authorizeRoles("seller", "admin"),
  deletePrdouct,
);

export default router;
