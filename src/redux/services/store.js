import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../api/AuthApi";
import authSlice from "./authSlice";
import { PhotoApi } from "../api/PhotoApi";
import PhotoSlice from "./PhotoSlice";
import UserPhotoSlice from "./UserPhotoSlice";
import PostCategorySlice from "./PostCategorySlice";
import { MangaPhotoApi } from "../api/PostApi";

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [authApi.reducerPath]: authApi.reducer,
    [PhotoApi.reducerPath]: PhotoApi.reducer,
    [MangaPhotoApi.reducerPath]: MangaPhotoApi.reducer,

    authSlice: authSlice,
    PhotoSlice: PhotoSlice,
    UserPhotoSlice: UserPhotoSlice,
    PostCategorySlice: PostCategorySlice,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      PhotoApi.middleware,
      MangaPhotoApi.middleware
    ),
});
