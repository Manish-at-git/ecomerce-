import { apiSlice } from "../apiSlice";

export const BrandSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addBrand: builder.mutation({
      query: (data) => ({
        url: "/admin/addBrand",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["addBrand"],
    }),
    getBrand: builder.query({
      query: () => ({
        url: "/admin/getBrand",
        method: "GET",
      }),
      invalidatesTags: ["getBrand"],
    }),
  }),
});

export const { useAddBrandMutation, useGetBrandQuery } = BrandSlice;
