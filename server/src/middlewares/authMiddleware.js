import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { apiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const isAuthenticatedUser = asyncHandler(async (req, res, next) => {


  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }


  if (!token) {
    return next (new apiError(401, "Login first"));
  }

  const decoded = jwt.verify(token, process.env.ACCESS_SECRET);
  

  const user = await User.findById(decoded.userId);

  if (!user) {
    return next (new apiError(401, "User not found"));
  }


  req.user = user;

  return next();
});



const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new apiError(401, "Unauthorized"));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new apiError(403, `Role (${req.user.role}) is not allowed`)
      );
    }

    next();
  };
};



export { isAuthenticatedUser, authorizeRoles };