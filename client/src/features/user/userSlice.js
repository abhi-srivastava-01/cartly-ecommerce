import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser, refreshToken, logoutUser } from "./userThunk";

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

  reducers: {
    logout: (state) => {
      clearAuthState(state);
      state.isCheckingAuth = false;
    },
  },

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

      // Login
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        clearAuthState(state);
        state.isCheckingAuth = false;
      })

      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Regresh Token
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
      })

      .addCase(refreshToken.rejected, (state) => {
        clearAuthState(state);
        state.isCheckingAuth = false;
      });
  },
});

export const { logout } = userSlice.actions;

export default userSlice.reducer;
