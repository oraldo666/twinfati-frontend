import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../../constants/constatns";
import { axiosCreatePostInstance } from "../../../axiosInstance";

export const createPost = createAsyncThunk(
  "post/createPost",
  async (dataInput) => {
    // const dataP = {
    //   post_img: dataInput.postImg,
    //   post_text: dataInput.postText,
    //   user: parseInt(localStorage.getItem("userId")),
    // };
    console.log(dataInput.postImg);
    let formdata = new FormData();
    if (dataInput.postImg) {
      formdata.append("post_img", dataInput.postImg, dataInput.postImg.name);
    }
    formdata.append("post_text", dataInput.postText);
    formdata.append("user", localStorage.getItem("userId"));
    console.log(formdata);

    const { data } = await axiosCreatePostInstance.post(
      "post/create/",
      formdata
    );
    return data;
  }
);

const createPostSlice = createSlice({
  name: "post",
  initialState: {
    result: "",
    status: "",
  },
  extraReducers: {
    [createPost.pending]: (state, { payload }) => {
      console.log(payload, "pending");
      state.status = "pending";
    },
    [createPost.fulfilled]: (state, { payload }) => {
      console.log(payload, "fulfilled");
      state.status = "fulfilled";
    },
    [createPost.rejected]: (state, { payload }) => {
      console.log(payload, "rejected");
      state.status = "rejected";
    },
  },
});

export default createPostSlice;
