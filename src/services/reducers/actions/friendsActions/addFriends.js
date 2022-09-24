import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../../constants/constatns";

export const addFriendsAction = createAsyncThunk(
  "addFreinds/addFriendsAction",
  async (friendId) => {
    let data = {
      user: localStorage.getItem("userId"),
      friend: friendId,
    };
    return fetch(`${BACKEND_URL}api/add/friend/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify(data),
    }).then((res) => res.json());
  }
);

const addFriendsSlice = createSlice({
  name: "addFreinds",
  initialState: {
    details: "",
  },
  extraReducers: {
    [addFriendsAction.pending]: (state, { payload }) => {
      state.details = payload;
    },
    [addFriendsAction.fulfilled]: (state, { payload }) => {
      state.details = payload;
    },
    [addFriendsAction.rejected]: (state, { payload }) => {
      state.details = payload;
    },
  },
});

export default addFriendsSlice;
