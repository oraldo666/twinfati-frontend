import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../../constants/constatns";

export const registerUserAction = createAsyncThunk(
  "registerUser/registerUserAction",
  async (registerData) => {
    await fetch(`${BACKEND_URL}api/user/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(registerData),
    }).then((response) => response.json());
  }
);

const registerUserSlice = createSlice({
  name: "registerUser",
  initialState: {
    status: "loading",
  },
  extraReducers: {
    [registerUserAction.pending]: (state, { payload }) => {
      state.status = "pending";
    },
    [registerUserAction.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
    },
    [registerUserAction.rejected]: (state, { payload }) => {
      state.status = "rejected";
    },
  },
});

export default registerUserSlice;
