import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../../constants/constatns";

export const removeFriendsAction = async (freindshipId) => {
  const response = fetch(`${BACKEND_URL}api/delete/friend/${freindshipId}/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  });
};

// export const removeFriendsAction = createAsyncThunk(
//   "removeFreinds/removeFriendsAction",
//   async (friendId) => {
//     let data = {
//       user: localStorage.getItem("userId"),
//       friend: friendId,
//     };
//     return fetch(`${BACKEND_URL}api/remove/friend/`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
//       },
//       body: JSON.stringify(data),
//     }).then((res) => res.json());
//   }
// );

// const removeFriendsSlice = createSlice({
//   name: "removeFreinds",
//   initialState: {
//     details: "",
//   },
//   extraReducers: {
//     [removeFriendsAction.pending]: (state, { payload }) => {
//       state.details = payload;
//     },
//     [removeFriendsAction.fulfilled]: (state, { payload }) => {
//       state.details = payload;
//     },
//     [removeFriendsAction.rejected]: (state, { payload }) => {
//       state.details = payload;
//     },
//   },
// });

// export default removeFriendsSlice;
