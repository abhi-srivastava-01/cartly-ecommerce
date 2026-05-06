import { apiError } from "../utils/apiError.js";

// Global error handling middleware
const GlobalErrors = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";


  // Handle Mongoose duplicate key errors
  if (err.code === 11000) {
    const message = `Duplicate field value entered for ${Object.keys(err.keyValue)}. Please use another value!`;
    err = new apiError(400, message);
  }

  // Handle Mongoose bad ObjectId errors
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid ${err.path}: ${err.value}`;
    err = new apiError(404, message);
  }



  const errorMessage = err.errors ? Object.values(err.errors).map((val) => val.message).join(", ") : err.message;

  

  return res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};

export { GlobalErrors };
