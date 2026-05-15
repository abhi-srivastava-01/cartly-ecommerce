import { User } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import { sendResponse } from "../utils/sendResponse.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../services/cloudinaryService.js";

// Registration
export const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return next(new apiError(409, "User already exists"));
  }

  const user = await User.create({ name, email, password });

  // Token
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

  return res.status(201).json(
    new sendResponse("User registered successfully", {
      accessToken,
      user: userData,
    }),
  );
});

// Login
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new apiError(401, "Invalid email and password"));
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    return next(new apiError(401, "Invalid email and password"));
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
      accessToken,
      user: userData,
    }),
  );
});

// Logout
export const logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json(new sendResponse("Logged out successfully"));
});

// Refresh token
export const refreshUserToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return next(new apiError(401, "No token provided"));
  }

  const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
  const newAccessToken = generateAccessToken({ _id: decoded.userId });
  const newRefreshToken = generateRefreshToken({ _id: decoded.userId });

  const user = await User.findById(decoded.userId).select(
    "-password -createdAt -updatedAt -__v",
  );

  res.cookie("refreshToken", newRefreshToken, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  return res.status(200).json(
    new sendResponse("Token refreshed", {
      accessToken: newAccessToken,
      user,
    }),
  );
});

// Update User
export const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id).select(
    "-password -createdAt -updatedAt -__v",
  );

  if (!user) {
    return next(new apiError(404, "User not found"));
  }

  if (user._id.toString() !== req.user.id.toString()) {
    return next(new apiError(403, "You can update only your profile"));
  }

  Object.assign(user, req.body);

  await user.save();

  return res
    .status(200)
    .json(new sendResponse("User updated successfully", user));
});

// image uploadToCloudinary
export const uploadAvatar = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id);

  if (!user) {
    return next(new apiError(404, "User not found"));
  }

  if (user._id.toString() !== req.user.id.toString()) {
    return next(new apiError(403, "You can update only your profile"));
  }

  if (!req.file) {
    return next(new apiError(400, "Image is required"));
  }

  // delete old image
  if (user.avatar?.public_id) {
    await deleteFromCloudinary(user.avatar.public_id);
  }

  const result = await uploadToCloudinary(req.file.buffer, "users");

  user.avatar = {
    url: result.secure_url,
    public_id: result.public_id,
  };

  await user.save();

  return res
    .status(200)
    .json(new sendResponse("Profile image updated successfully", user.avatar));
});


// delete image 
export const deleteAvatar = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const user = await User.findById(id)

  if (!user) {
    return next(new apiError(404, "User not found"));
  }

  if (user._id.toString() !== req.user.id.toString()) {
    return next(new apiError(403, "You can delete only your profile avatar"));
  }

  if (!user.avatar?.public_id) {
    return next(new apiError(400, "Avatar not found"));
  }

  // delete from cloudinary
  await deleteFromCloudinary(user.avatar.public_id);

  // remove from database
  user.avatar = undefined;

  await user.save();

  return res.status(200).json(new sendResponse("Avatar deleted successfully"));
});