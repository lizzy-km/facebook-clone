import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const MangaPhotoApi = createApi({
  reducerPath: "MangaPhotoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.escuelajs.co/api/v1",
  }),

  tagTypes: ["fakeAuth"],
  endpoints: (builder) => ({
    fakeLogin: builder.mutation({
      query: (user) => ({
        url: "/users/",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["fakeAuth"],
    }),
    userLogin: builder.mutation({
      query: (user) => ({
        url: "/auth/login",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["fakeAuth"],
    }),
    getProducts: builder.query({
      query: () => ({
        url: `/products/`,
        method: "GET",
      }),
      providesTags: ["fakeAuth"],
    }),
    getCategories: builder.query({
      query: () => ({
        url: `/categories`,
        method: "GET",
      }),
      providesTags: ["fakeAuth"],
    }),
    getSingleProducts: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["fakeAuth"],
    }),
    deleteProducts: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["fakeAuth"],
    }),
    getSingleUser: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["fakeAuth"],
    }),
    createProducts: builder.mutation({
      query: (products) => ({
        url: `/products/`,
        method: "POST",
        body: products,
      }),
      invalidatesTags: ["fakeAuth"],
    }),
    createCategories: builder.mutation({
      query: (category) => ({
        url: `/categories/`,
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["fakeAuth"],
    }),
    search: builder.query({
      query: (id) => ({
        url: `/search/users?query=${id}`,
      }),

      providesTags: ["photo"],
    })
  }),
});

export const {
  useFakeLoginMutation,
  useGetProductsQuery,
  useGetSingleProductsQuery,
  useGetSingleUserQuery,
  useGetCategoriesQuery,
  useCreateProductsMutation,
  useCreateCategoriesMutation,
  useDeleteProductsMutation,
  useUserLoginMutation
} = MangaPhotoApi;
