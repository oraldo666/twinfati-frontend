import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../../constants/constatns";

export const getUserData = createAsyncThunk(
  "userData/getUserData",
  async () => {
    return fetch(
      `${BACKEND_URL}api/user/details/${localStorage.getItem("userId")}/`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    ).then((res) => res.json());
  }
);

const getUserDataSlice = createSlice({
  name: "userData",
  initialState: {
    userData: [],
    status: "loading",
    errMessage: "",
    loading: true,
  },
  extraReducers: {
    [getUserData.pending]: (state, { payload }) => {
      state.status = "pending";
    },
    [getUserData.fulfilled]: (state, { payload }) => {
      state.status = "fulfilled";
      state.userData = payload;
      state.details = payload.details;
      state.loading = false;
    },
    [getUserData.rejected]: (state, { payload }) => {
      state.errMessage = "payload";
    },
  },
});

export default getUserDataSlice;
