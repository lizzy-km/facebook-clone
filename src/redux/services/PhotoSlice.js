import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  photo: [],
  searchTearm: "",
  userPhoto: [],
  adminPost: [],
  User: [],
  adminStory: [],
};

const STORAGE_KEY = "Post";

//____________________________________________________storedItems_____________________Null_____//
const storedItems = Cookies.get(STORAGE_KEY)
  ? JSON.parse(Cookies.get(STORAGE_KEY))
  : null;

if (storedItems) {
  initialState.photo = storedItems.photo;
  initialState.User = storedItems.User;

  initialState.userPhoto = storedItems.userPhoto;
  initialState.adminPost = storedItems.adminPost;
  initialState.adminStory = storedItems.adminStory;
}

export const PhotoSlice = createSlice({
  name: "PhotoSlice",
  initialState,
  reducers: {
    getPhoto: (state, { payload }) => {
      state.photo = payload.photo;
      Cookies.set(STORAGE_KEY, JSON.stringify(state));
    },
    getUserPhoto: (state, { payload }) => {
      state.userPhoto = payload.userPhoto;
      Cookies.set(STORAGE_KEY, JSON.stringify(state));
    },
    getUser: (state, { payload }) => {
      state.User = payload.User;
      Cookies.set(STORAGE_KEY, JSON.stringify(state));
    },
    adminPost: (state, { payload }) => {
      // (state.adminPost = payload.adminPost);
      return (
        (state.adminPost = [...state.adminPost, payload]),
        Cookies.set(STORAGE_KEY, JSON.stringify(state))
      );
    },
    deleteAdminPost: (state, { payload }) => {
      return (
        (state.adminPost = state.adminPost.filter(
          (data) => data.id !== payload.id
        )),
        Cookies.set(STORAGE_KEY, JSON.stringify(state)),
        window.location.reload(true)
      );
    },
    adminStory: (state, { payload }) => {
      // (state.adminPost = payload.adminPost);
      return (
        (state.adminStory = [...state.adminStory, payload]),
        Cookies.set(STORAGE_KEY, JSON.stringify(state))
      );
    },
    deleteAdminStory: (state, { payload }) => {
      return (
        (state.adminStory = state.adminStory.filter(
          (data) => data.id !== payload.id
        )),
        Cookies.set(STORAGE_KEY, JSON.stringify(state))
      );
    },
  },
});

export const {
  getPhoto,
  getUserPhoto,
  adminPost,
  getUser,
  deleteAdminPost,
  adminStory,
  deleteAdminStory,
} = PhotoSlice.actions;
export default PhotoSlice.reducer;
