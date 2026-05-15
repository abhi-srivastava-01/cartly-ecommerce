import { createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  signupUser,
  refreshToken,
  logoutUser,
  updateProfile,
  uploadAvatar,
  deleteAvatar,
} from "./userThunk";

const initialState = {
  user: null,
  accessToken: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  isCheckingAuth: true,
};

const clearAuthState = (state) => {
  state.user = null;
  state.accessToken = null;
  state.loading = false;
  state.error = null;
  state.isAuthenticated = false;
  state.isCheckingAuth = false;
};

const userSlice = createSlice({
  name: "user",
  initialState,

  extraReducers: (builder) => {
    builder

      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.isAuthenticated = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // SignUp
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.isAuthenticated = true;
      })

      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.isAuthenticated = false;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        clearAuthState(state);
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.error = null;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Refresh Token
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.isCheckingAuth = true;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.isAuthenticated = true;
        state.isCheckingAuth = false;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state) => {
        clearAuthState(state);
      })
      
      // upload image
      .addCase(uploadAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.loading = false;
        state.user.avatar = action.payload.data;
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //delete image
      .addCase(deleteAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAvatar.fulfilled, (state) => {
        state.loading = false;
        state.user.avatar = null;
      })
      .addCase(deleteAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
