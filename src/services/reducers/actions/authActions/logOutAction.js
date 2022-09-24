import { createSlice } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { setLoggedIn } from "./loginAction";

const logOutSlice = createSlice({
  name: "log-out",
  initialState: {
    loggedOut: false,
  },
  reducers: {
    logOut(state) {
      console.log("Clicked");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userPhoto");
      state.loggedOut = true;
    },
  },
});

export const { logOut } = logOutSlice.actions;
export default logOutSlice;
