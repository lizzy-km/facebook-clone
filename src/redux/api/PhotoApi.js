import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

const tokent = "l7f7mZ9cndj8TpoHa_NFF4rmaVpr4Cg5aJzu2H-km-c";
const token = "ylL5zepFhVMRG83PZlafjutXYHqohSopCAndQmmMMY4";

export const PhotoApi = createApi({
  reducerPath: "PhotoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.unsplash.com",
  }),

  tagTypes: ["photo"],

  endpoints: (builder) => ({
    photo: builder.query({
      query: () => ({
        url: "/photos",
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["photo"],
    }),
    photoAdd: builder.mutation({
      query: (data) => ({
        url: "/photos",
        body: data,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["photo"],
    }),
    photoLikes: builder.mutation({
      query: (id) => ({
        url: `/photos/${id}/like`,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["photo"],
    }),
    photoUnLikes: builder.mutation({
      query: (id) => ({
        url: `/photos/${id}/like`,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["photo"],
    }),
    user: builder.query({
      query: () => ({
        url: `/me`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["photo"],
    }),
    userP: builder.query({
      query: (id) => ({
        url: `/users/${id}/photos`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["photo"],
    }),
    userCollection: builder.query({
      query: () => ({
        url: `/users/Lizzy_02/collections`,
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["photo"],
    }),
    CreateNewCollection: builder.mutation({
      query: (data) => ({
        url: `/collections/`,
        body: data,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["photo"],
    }),
    AddPhotoToCollection: builder.mutation({
      query: (id, data) => ({
        url: `/collections/${id}/add/`,
        body: data,
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["photo"],
    }),
    deleteCollection: builder.mutation({
      query: (id) => ({
        url: `/collections/${id}`,
        // body:data,
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }),
      invalidatesTags: ["photo"],
    }),

    search: builder.query({
      query: (id) => ({
        url: `/search/users?query=${id}`,
        body: token,
        headers: { Authorization: `Bearer ${token}` },
        params: {
          per_page: 30,
        },
      }),

      providesTags: ["photo"],
    }),
  }),
});
export const {
  usePhotoQuery,
  useUserQuery,
  useSearchQuery,
  useCreateNewCollectionMutation,
  useAddPhotoToCollectionMutation,
  useUserCollectionQuery,
  useDeleteCollectionMutation,
  usePhotoLikesMutation,
  usePhotoUnLikesMutation,
  useUserPQuery,
  usePhotoAddMutation,
} = PhotoApi;
