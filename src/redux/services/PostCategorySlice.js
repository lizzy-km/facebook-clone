import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

export const CatData = [
  "Spam",
  "Shit",
  "Fun",
  "Tech",
  "Trend",
  "All",
  "Art",
  "Edu",
  "Job",
  "Ecommerce",
  "Friends",
];

const initialState = {
  // items : {
  Spam: [],
  Shit: [],
  Fun: [],
  Tech: [],
  Trend: [],
  All: [],
  Art: [],
  Edu: [],
  Job: [],
  Ecommerce: [],
  Friends: [],
  // },
};

const STORAGE_KEY = "Posts";

//____________________________________________________storedItems_____________________Null_____//
const storedItems = Cookies.get(STORAGE_KEY)
  ? JSON.parse(Cookies.get(STORAGE_KEY))
  : null;

if (storedItems) {
  initialState.Fun = storedItems.Fun;
  initialState.Spam = storedItems.Spam;
  initialState.Shit = storedItems.Shit;
  initialState.Tech = storedItems.Tech;
  initialState.Trend = storedItems.Trend;
  initialState.All = storedItems.All;
  initialState.Edu = storedItems.Edu;
  initialState.Job = storedItems.Job;
  initialState.Ecommerce = storedItems.Ecommerce;
  initialState.Friends = storedItems.Friends;
}

export const PostCategorySlice = createSlice({
  name: "PostCatSlice",
  initialState,
  reducers: {
    addSpam: (state, { payload }) => {
      state.Spam = [...state.Spam, payload];
      Cookies.set(STORAGE_KEY, JSON.stringify(state));
    },
    addShit: (state, { payload }) => {
      state.Shit = [...state.Shit, payload];
      Cookies.set(STORAGE_KEY, JSON.stringify(state));
    },
    addFun: (state, { payload }) => {
      state.Fun = [...state.Fun, payload];
      Cookies.set(STORAGE_KEY, JSON.stringify(state));
    },
  },
});

export const { addSpam, addFun } = PostCategorySlice.actions;
export default PostCategorySlice.reducer;
