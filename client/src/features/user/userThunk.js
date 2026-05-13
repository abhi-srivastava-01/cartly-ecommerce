import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios/axiosInstance";

// Login
export const loginUser = createAsyncThunk(
  "user/login",

  async (userData, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/login", userData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed",
      );
    }
  },
);

// SignUp
export const signupUser = createAsyncThunk(
  "user/signup",

  async (data, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/register", data);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Signup failed",
      );
    }
  },
);

// Logout
export const logoutUser = createAsyncThunk(
  "user/logout",

  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.post("/auth/logout");

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Logout failed",
      );
    }
  },
);

// Update Profile
export const updateProfile = createAsyncThunk(
  "user/updateProfile",
  async ({ id, userData }, thunkAPI) => {
    try {
      const res = await axiosInstance.patch(`/auth/${id}`, userData);

      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Try Again",
      );
    }
  },
);

// Refresh Token
export const refreshToken = createAsyncThunk(
  "user/refresh",

  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get("/auth/refresh");
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Refresh failed",
      );
    }
  },
);
