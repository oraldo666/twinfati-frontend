import { createSlice } from "@reduxjs/toolkit";

const initialState = { openMenu: false };

const menuSlice = createSlice({
  name: "menuOpener",
  initialState: initialState,
  reducers: {
    openCloseMenu(state) {
      state.openMenu = !state.openMenu;
    },
    openMenu(state) {
      state.openMenu = true;
    },
    closeMenu(state) {
      state.openMenu = false;
    },
  },
});

export const { openMenu, closeMenu, openCloseMenu } = menuSlice.actions;

export default menuSlice;
