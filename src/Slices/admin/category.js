import { apiSlice } from "../apiSlice";

export const CategorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCategory: builder.mutation({
      query: (data) => ({
        url: "/admin/addCategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["addCategory"],
    }),
    getCategory: builder.query({
      query: () => ({
        url: "/admin/getCategory",
        method: "GET",
      }),
      invalidatesTags: ["getCategory"],
    }),
    getCategoryByType: builder.query({
      query: ({type}) => ({
        url: `/admin/getCategoryByType?type=${type}`,
        method: "GET",
      }),
      invalidatesTags: ["getCategory"],
    }),
  }),
});

export const { useAddCategoryMutation, useGetCategoryQuery, useGetCategoryByTypeQuery } = CategorySlice;
