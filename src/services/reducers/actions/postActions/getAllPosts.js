import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../../constants/constatns";

export const getPostData = createAsyncThunk(
  "postData/getPostData",
  async () => {
    const getPosts = fetch(`${BACKEND_URL}posts/?page=1`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => {
      return res.json();
    });
    return getPosts;
  }
);
const postSlice = createSlice({
  name: "postData",
  initialState: {
    posts: [],
    status: "loading",
    errMessage: "",
    loading: true,
  },
  extraReducers: {
    [getPostData.pending]: (state) => {
      state.posts = [];
      state.loading = true;
    },
    [getPostData.fulfilled]: (state, { payload }) => {
      state.posts = payload;
      state.loading = false;
      state.status = "fulfilled";
      state.errMessage = payload?.detail;
      if (state.errMessage) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
      }
    },
    [getPostData.rejected]: (state, { payload }) => {
      console.log(payload);
      state.errMessage = `${payload}`;
    },
  },
});
export default postSlice;
