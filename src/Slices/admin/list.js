import { apiSlice } from "../apiSlice";

export const CategorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addList: builder.mutation({
      query: (data) => ({
        url: "/admin/addList",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["addCategory"],
    }),
    getList: builder.query({
      query: () => ({
        url: "retailer/getAllList",
        method: "GET",
      }),
      invalidatesTags: ["getCategory"],
    }),
    getListProducts: builder.query({
      query: (body) => ({
        url: `retailer/getListProducts?id=${body?.id}`,
        method: "GET",
      }),
      invalidatesTags: ["getListProducts"],
    }),
  }),
});

export const { useGetListQuery, useGetListProductsQuery, useAddListMutation } = CategorySlice;
