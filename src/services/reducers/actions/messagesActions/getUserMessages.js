import { BACKEND_URL } from "../../../constants/constatns";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUserMessages = createAsyncThunk(
  "messageFriends/getUserMessages",
  async (friendId) => {
    return fetch(`${BACKEND_URL}api/message/${friendId}/`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json());
  }
);

const getUserSlice = createSlice({
  name: "messageFriends",
  initialState: {
    messages: [],
    friendName: "",
    status: "loading",
    errMessage: "",
    loading: true,
  },
  extraReducers: {
    [getUserMessages.pending]: (state) => {
      state.messages = [];
      state.loading = true;
    },
    [getUserMessages.fulfilled]: (state, { payload }) => {
      if (state.messages !== payload) {
        state.messages = payload;
      }
      state.loading = false;
      state.status = "fulfilled";
      console.log(payload);
      state.errMessage = payload?.detail;
    },
    [getUserMessages.rejected]: (state, { payload }) => {
      state.errMessage = `${payload}`;
    },
  },
  reducers: {
    setFriendName: (state, { payload }) => {
      console.log(payload);
      state.friendName = payload;
    },
  },
});

export const { setFriendName } = getUserSlice.actions;

export default getUserSlice;
