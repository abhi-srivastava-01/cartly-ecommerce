import { asyncHandler } from "../utils/asyncHandler.js";
import { Product } from "../models/productModel.js";
import { sendResponse } from "../utils/sendResponse.js";
import { apiError } from "../utils/ApiError.js";
import mongoose from "mongoose";

// Create a new product
export const createProduct = asyncHandler(async (req, res) => {
  const productData = { ...req.body };
  productData.user = req.user._id;

  const product = await Product.create(productData);

  return res
    .status(201)
    .json(new sendResponse("Product created successfully", product));
});

// Get all products
export const getAllProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().select("-createdAt -updatedAt -__v");
  return res
    .status(200)
    .json(new sendResponse("Products retrieved successfully", products));
});

// Get a single product by ID
export const getSingleProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new apiError(400, "Invalid product id"));
  }
  const product = await Product.findById(id).select(
    "-createdAt -updatedAt -__v",
  );

  if (!product) {
    return next(new apiError(404, "Product not found"));
  }
  return res
    .status(200)
    .json(new sendResponse("Product retrieved successfully", product));
});

// Update a product
export const updateProduct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new apiError(400, "Invalid product id"));
  }

  const updatedProduct = await Product.findById(id).select(
    "-createdAt -updatedAt -__v",
  );

  if (!updatedProduct) {
    return next(new apiError(404, "Product not found"));
  }

  if (updatedProduct.user.toString() !== req.user.id) {
    return next(new apiError(403, "You can update only your products"));
  }

  Object.assign(updatedProduct, req.body);

  await updatedProduct.save();

  return res
    .status(200)
    .json(new sendResponse("Product updated successfully", updatedProduct));
});

// delete product
export const deletePrdouct = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new apiError(400, "Invalid product id"));
  }

  const deleteProduct = await Product.findByIdAndDelete(id);
  if (!deleteProduct) {
    return next(new apiError(404, "Product not found"));
  }
  return res.status(200).json(new sendResponse("Delete successfully"));
});
