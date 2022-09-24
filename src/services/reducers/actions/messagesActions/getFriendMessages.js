import { BACKEND_URL } from "../../../constants/constatns";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getFriendMessages = createAsyncThunk(
  "messageFriends/getFriendMessages",
  async (friendId) => {
    return fetch(`${BACKEND_URL}api/friend/message/${friendId}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json());
  }
);

const getFriendSlice = createSlice({
  name: "messageFriends",
  initialState: {
    messages: [],
    status: "loading",
    errMessage: "",
    loading: true,
  },
  extraReducers: {
    [getFriendMessages.pending]: (state) => {
      state.messages = [];
      state.loading = true;
    },
    [getFriendMessages.fulfilled]: (state, { payload }) => {
      state.messages = payload;
      state.loading = false;
      state.status = "fulfilled";
      console.log(payload);
      state.errMessage = payload?.detail;
    },
    [getFriendMessages.rejected]: (state, { payload }) => {
      state.errMessage = `${payload}`;
    },
  },
});

export default getFriendSlice;
