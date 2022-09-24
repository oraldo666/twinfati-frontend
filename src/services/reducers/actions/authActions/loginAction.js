import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../../constants/constatns";

export const loginUser = createAsyncThunk(
  "loginData/loginUser",
  async (data) => {
    console.log(data);
    console.log(JSON.stringify(data));
    return fetch(`${BACKEND_URL}api/token/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        return res.json();
      })
      .catch((err) => console.log(err));
  }
);

const userLoginSlice = createSlice({
  name: "loginUser",
  initialState: {
    status: "loading",
    accessToken: "",
    refreshToken: "",
    details: null,
    loggedIn: false,
  },
  extraReducers: {
    [loginUser.pending]: (state, { payload }) => {
      state.status = "pending";
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      console.log(payload);
      localStorage.setItem("accessToken", payload.access);
      localStorage.setItem("refreshToken", payload.refresh);
      localStorage.setItem("userPhoto", payload);
      state.status = "fulfilled";
      if (payload.access) {
        localStorage.setItem("loggedIn", true);
      }
      state.accessToken = payload.access;
      state.refreshToken = payload.refresh;
      state.details = payload.detail;
      if (
        state.details === "No active account found with the given credentials"
      ) {
        state.loggedIn = false;
      } else {
        state.loggedIn = true;
      }
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.status = "rejected";
    },
  },
  reducers: {
    setLoggedIn: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { setLoggedIn } = userLoginSlice.actions;
export default userLoginSlice;
