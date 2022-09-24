import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../../constants/constatns";

export const getRefreshToken = createAsyncThunk(
  "refreshToken/getRefreshToken",
  async () => {
    let data = {
      refresh: localStorage.getItem("refreshToken"),
    };
    const getToken = await fetch(`${BACKEND_URL}api/token/refresh/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
    return await getToken;
  }
);

const refreshTokenAction = createSlice({
  name: "refreshToken",
  initialState: {
    accessToken: "",
    status: "loading",
  },
  extraReducers: {
    [getRefreshToken.pending]: (state, { payload }) => {
      state.status = "loading";
    },
    [getRefreshToken.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      localStorage.setItem("accessToken", payload.access);
      state.accessToken = payload.access;
    },
    [getRefreshToken.rejected]: (state, { payload }) => {
      state.status = "rejected";
    },
  },
});

export default refreshTokenAction;
