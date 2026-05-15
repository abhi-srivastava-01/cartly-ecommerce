import { Router } from "express";
import {
  loginUser,
  registerUser,
  refreshUserToken,
  logoutUser,
  updateUser,
  uploadAvatar,
  deleteAvatar,
} from "../controllers/authController.js";
import { zodValidate } from "../middlewares/zodValidate.js";
import {
  registerValidationSchema,
  loginValidationSchema,
  updateUserValidationSchema,
} from "../validations/zodValidationSchema.js";
import { isAuthenticatedUser } from "../middlewares/authMiddleware.js";
import upload from "../middlewares/uploadMiddleware.js";

const router = Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 * @body    { name, email, password }
 */

router.post("/register", zodValidate(registerValidationSchema), registerUser);

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate user & get token
 * @access  Public
 * @body    { email, password }
 */
router.post("/login", zodValidate(loginValidationSchema), loginUser);

/**
 * @route   POST /api/auth/:id
 * @desc    Update user
 */
router.patch(
  "/:id",
  isAuthenticatedUser,
  zodValidate(updateUserValidationSchema),
  updateUser,
);

/**
 * @route   POST /api/auth/logout
 * @desc    Logout user (clear refresh token cookie)
 * @access  Public
 */
router.post("/logout", isAuthenticatedUser, logoutUser);

/**
 * @route   POST /api/auth/refresh
 * @desc    Refresh access token
 * @access  Public (but requires refresh token in cookie)
 */
router.get("/refresh", refreshUserToken);

/**
 * @route   PATCH /api/auth/avatar/:id
 * @desc    Upload or update user profile image
 * @access  Private
 * @body    form-data { image }
 */
router.patch(
  "/avatar/:id",
  isAuthenticatedUser,
  upload.single("image"),
  uploadAvatar,
);

/**
 * @route   DELETE /api/auth/avatar/:id
 * @desc    Delete user profile image
 * @access  Private
 */
router.delete("/avatar/:id", isAuthenticatedUser, deleteAvatar);

export default router;
