import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../../constants/constatns";

export const getSearchUserData = createAsyncThunk(
  "userSearchData/getSearchUserData",
  async (userId) => {
    return fetch(`${BACKEND_URL}api/user/search/profile/${userId}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json());
  }
);

const getSearchUserDataSlice = createSlice({
  name: "userSearchData",
  initialState: {
    userData: [],
    status: "loading",
    errMessage: "",
    loading: true,
  },
  extraReducers: {
    [getSearchUserData.pending]: (state, { payload }) => {
      state.status = "pending";
    },
    [getSearchUserData.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.status = "fulfilled";
      state.userData = payload;
      state.details = payload.details;
      state.loading = false;
    },
    [getSearchUserData.rejected]: (state, { payload }) => {
      console.log(payload);
      state.errMessage = "payload";
    },
  },
});

export default getSearchUserDataSlice;
