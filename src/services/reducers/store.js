import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./actions/postActions/getAllPosts";
import menuSlice from "./uiActions/openMenu";

import userLoginSlice from "./actions/authActions/loginAction";
import logOutSlice from "./actions/authActions/logOutAction";
import getUserDataSlice from "./actions/authActions/userAction";
import refreshTokenAction from "./actions/authActions/refreshTokenAction";
import registerUserSlice from "./actions/authActions/registerUserActions";

import createPostSlice from "./actions/postActions/createPost";
import searchUsersSlice from "./actions/searchActions/searchUserAction";
import getSearchUserDataSlice from "./actions/searchActions/searchSingleUser";

import postUserSlice from "./actions/postActions/getUserPostsAction";

import getUserMessageFriendsSlice from "./actions/messagesActions/messageFriendsAction";
import getUserSlice from "./actions/messagesActions/getUserMessages";
import getFriendSlice from "./actions/messagesActions/getFriendMessages";
import addFriendsSlice from "./actions/friendsActions/addFriends";

// import logger from "redux-logger";
// import thunk from "redux-thunk";

export const store = configureStore({
  reducer: {
    postData: postSlice.reducer,
    openMenu: menuSlice.reducer,
    userLogin: userLoginSlice.reducer,
    registerUser: registerUserSlice.reducer,
    logOutSlice: logOutSlice.reducer,
    refreshToken: refreshTokenAction.reducer,
    userData: getUserDataSlice.reducer,
    createPost: createPostSlice.reducer,
    searchUsers: searchUsersSlice.reducer,
    searchSingleUser: getSearchUserDataSlice.reducer,
    searchUserPosts: postUserSlice.reducer,
    userMessageFriends: getUserMessageFriendsSlice.reducer,
    getUserMessages: getUserSlice.reducer,
    addFriends: addFriendsSlice.reducer,
    // getFriendMessages: getFriendSlice.reducer,
  },
  // middleware: [thunk],
});

// , logger
