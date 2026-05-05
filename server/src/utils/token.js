import jwt from "jsonwebtoken";

// Access token generation
export function generateAccessToken (user){
  const payload = {
    userId: user._id,
    email: user.email,
  };
  return jwt.sign(payload, process.env.ACCESS_SECRET, {
    expiresIn: process.env.ACCESS_SECRET_EXPIRY,
  });
};

// Refresh token generation
export function generateRefreshToken(user){
  const payload = {
    userId: user._id,
    email: user.email,
  };
  return jwt.sign(payload, process.env.REFRESH_SECRET, {
    expiresIn: process.env.REFRESH_SECRE_EXPIRY,
  });
};
