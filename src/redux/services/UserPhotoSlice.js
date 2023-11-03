import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
  userPhoto: [],
  user: [],
  profileImage: "",
  coverImage: "",
  sharePost: [],
  savePost: [],
  friend: [],
  Post: [],
};

const STORAGE_KEY = "User";

//____________________________________________________storedItems_____________________Null_____//
const storedItems = Cookies.get(STORAGE_KEY)
  ? JSON.parse(Cookies.get(STORAGE_KEY))
  : null;

if (storedItems) {
  initialState.userPhoto = storedItems.userPhoto;
  initialState.user = storedItems.user;
  initialState.sharePost = storedItems.sharePost;
  initialState.savePost = storedItems.savePost;
  initialState.friend = storedItems.friend;
  initialState.post = storedItems.post;
}

export const UserPhotoSlice = createSlice({
  name: "UserPhotoSlice",
  initialState,
  reducers: {
    getUserPhoto: (state, { payload }) => {
      state.userPhoto = payload.userPhoto;
      Cookies.set(STORAGE_KEY, JSON.stringify(state));
    },
    admin: (state, { payload }) => {
      // (state.adminPost = payload.adminPost );
      state.user = [
        ...state.user,
        {
          ...payload,
          profileImage:
            "https://raw.githubusercontent.com/lizzy-km/lizzy_k/3e5288dd90e953b80d8fdd0678a5fb9f0adde1e6/src/assets/Alogo.svg",
          coverImage:
            "https://i.pinimg.com/originals/67/fa/e0/67fae0fe4255777324693d95d3484e8c.jpg",
        },
      ];

      Cookies.set(STORAGE_KEY, JSON.stringify(state));
    },
    SharePost: (state, { payload }) => {
      state.sharePost = [...state.sharePost, payload];
      Cookies.set(STORAGE_KEY, JSON.stringify(state));
    },
    deleteSharePost: (state, { payload }) => {
      state.sharePost = state.sharePost.filter(
        (data) => data.id !== payload.id
      );

      Cookies.set(STORAGE_KEY, JSON.stringify(state));
    },
    SavePost: (state, { payload }) => {
      state.savePost = [...state.savePost, payload];
      Cookies.set(STORAGE_KEY, JSON.stringify(state));
    },
    deleteSavePost: (state, { payload }) => {
      state.savePost = state.savePost.filter((data) => data.id !== payload.id);

      Cookies.set(STORAGE_KEY, JSON.stringify(state));
    },
    addFriend: (state, { payload }) => {
      (state.friend = [...state.friend, payload]),
        Cookies.set(STORAGE_KEY, JSON.stringify(state));
    },
    unFriend: (state, { payload }) => {
      state.friend = state.friend.filter((data) => data.id !== payload.id);

      Cookies.set(STORAGE_KEY, JSON.stringify(state));
    },
    getPost: (state, { payload }) => {
      state.Post = [state.Post, payload];
      // Cookies.set(STORAGE_KEY, JSON.stringify(state));
    },
  },
});

export const {
  unFriend,
  addFriend,
  getUserPhoto,
  admin,
  SharePost,
  deleteSharePost,
  deleteSavePost,
  SavePost,
  getPost,
} = UserPhotoSlice.actions;
export default UserPhotoSlice.reducer;
