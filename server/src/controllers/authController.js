import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { sendResponse } from "../utils/sendResponse.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";

/**
 * @desc    Register new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  // console.log(req.body);

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next (new apiError(409, "User already exists"));
  }

  const user = await User.create({ name, email, password });
  // console.log("Registered user:", user);


  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };

  return res.status(201).json(
    new sendResponse("User registered successfully", {
      user: userData,
    }),
  );
});


/**
 * @desc    Login user & return tokens
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(req.body);

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next (new apiError(401, "Invalid email and password"));
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next (new apiError(401, "Invalid email and password"));
  }

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: process.env.MAX_AGE * 24 * 60 * 60 * 1000,
  });


  const userData = {
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
  };


  return res.status(200).json(
  new sendResponse("Login successful", {
    accessToken, user: userData
  })
);
});

/**
 * @desc    Logout user
 * @route   POST /api/auth/logout
 * @access  Public
 */
export const logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });


  return res.status(200).json(
    new sendResponse("Logged out successfully")
  );
});

/**
 * @desc    Refresh access token
 * @route   POST /api/auth/refresh
 * @access  Public
 */
export const refreshUserToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return next(apiError(401, "No token provided"));
  }

  const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
  // console.log("Decoded token:", decoded);
  const newAccessToken = generateAccessToken({ _id: decoded.userId });
  const newRefreshToken = generateRefreshToken({ _id: decoded.userId });

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json(
    new sendResponse("Token refreshed", { accessToken: newAccessToken })
  );
});
