import { apiSlice } from "../apiSlice";

export const AddProductSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/admin/addProduct",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["addProduct"],
    }),
    getProduct: builder.query({
      query: () => ({
        url: "/admin/getProduct",
        method: "GET",
      }),
      invalidatesTags: ["getProduct"],
    }),
    getProductById: builder.query({
      query: (body) => ({
        url: `/admin/getProductById?id=${body?.id}`,
        method: "GET",
      }),
      invalidatesTags: ["getProductById"],
    }),
  }),
});

export const { useAddProductMutation, useGetProductQuery, useGetProductByIdQuery} = AddProductSlice;
