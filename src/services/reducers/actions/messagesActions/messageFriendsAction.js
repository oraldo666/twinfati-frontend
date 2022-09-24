import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../../constants/constatns";

export const getUserMessageFriends = createAsyncThunk(
  "messageFriends/getUserMessageFriends",
  async () => {
    return fetch(`${BACKEND_URL}api/user/friends/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json());
  }
);

const getUserMessageFriendsSlice = createSlice({
  name: "messageFriends",
  initialState: {
    friends: [],
    status: "loading",
    errMessage: "",
    loading: true,
  },
  extraReducers: {
    [getUserMessageFriends.pending]: (state) => {
      state.friends = [];
      state.loading = true;
    },
    [getUserMessageFriends.fulfilled]: (state, { payload }) => {
      state.friends = payload;
      state.loading = false;
      state.status = "fulfilled";
      console.log(payload);
      state.errMessage = payload?.detail;
    },
    [getUserMessageFriends.rejected]: (state, { payload }) => {
      state.errMessage = `${payload}`;
    },
  },
});

export default getUserMessageFriendsSlice;
