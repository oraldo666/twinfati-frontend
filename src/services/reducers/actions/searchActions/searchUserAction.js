import { BACKEND_URL } from "../../../constants/constatns";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const searchUsers = createAsyncThunk(
  "userSearch/searchUsers",
  async (searchParam) => {
    return fetch(`${BACKEND_URL}api/user/search?search=${searchParam}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    }).then((res) => res.json());
  }
);

const searchUsersSlice = createSlice({
  name: "userSearch",
  initialState: {
    users: [],
    status: "pending",
  },
  extraReducers: {
    [searchUsers.pending]: (state, { payload }) => {
      state.status = "pending";
    },
    [searchUsers.fulfilled]: (state, { payload }) => {
      state.users = payload;
      state.status = "fulfilled";
    },
    [searchUsers.rejected]: (state, { payload }) => {
      state.status = "rejected";
    },
  },
  reducers: {
    eraseUsersList: (state) => {
      state.users = [];
    },
  },
});

export const { eraseUsersList } = searchUsersSlice.actions;

export default searchUsersSlice;
