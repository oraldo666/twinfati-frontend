import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../../constants/constatns";

export const getUserPostData = createAsyncThunk(
  "postUserData/getUserPostData",
  async (id) => {
    return fetch(`${BACKEND_URL}post/user/search/${id}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json());
  }
);
const postUserSlice = createSlice({
  name: "postUserData",
  initialState: {
    posts: [],
    status: "loading",
    errMessage: "",
    loading: true,
  },
  extraReducers: {
    [getUserPostData.pending]: (state) => {
      state.posts = [];
      state.loading = true;
    },
    [getUserPostData.fulfilled]: (state, { payload }) => {
      state.posts = payload.results;
      state.loading = false;
      state.status = "fulfilled";
      state.errMessage = payload?.detail;
    },
    [getUserPostData.rejected]: (state, { payload }) => {
      state.errMessage = `${payload}`;
    },
  },
});
export default postUserSlice;
