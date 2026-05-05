import { Router } from "express";
import {
  loginUser,
  registerUser,
  refreshUserToken,
  logoutUser,
} from "../controllers/authController.js";
import { zodValidate } from "../middlewares/zodValidate.js";
import {
  registerValidationSchema,
  loginValidationSchema,
} from "../validations/userValidationSchema.js";
import { isAuthenticatedUser } from '../middlewares/authMiddleware.js'


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
router.post("/refresh", refreshUserToken);



export default router;
