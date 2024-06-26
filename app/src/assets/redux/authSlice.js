import { createSlice } from "@reduxjs/toolkit";
import { register, login, logout, getCurrentUser } from "./authOperations";

const initialState = {
  user: { _id: null, name: null, email: null, role: ["user"] },
  token: null,
  isLoggedIn: false,
  isGettingCurrent: false,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    renewError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isGettingCurrent = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.role = action.payload.role;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
        state.isGettingCurrent = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.isGettingCurrent = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.role = action.payload.role;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.error = null;
        state.isGettingCurrent = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.isGettingCurrent = false;
      })
      .addCase(logout.pending, (state) => {
        state.isGettingCurrent = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = { name: null, email: null };
        state.token = null;
        state.isLoggedIn = false;
        state.isGettingCurrent = false;
      })
      .addCase(getCurrentUser.pending, (state) => {
        state.isGettingCurrent = true;
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.user.name = action.payload.name;
        state.user.email = action.payload.email;
        state.user.role = action.payload.role;
        state.isLoggedIn = true;
        state.isGettingCurrent = false;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.isGettingCurrent = false;
        state.isLoggedIn = false;
        state.error = action.payload;
      });
  },
});

export const { renewError } = authSlice.actions;
