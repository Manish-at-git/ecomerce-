import { apiSlice } from "../apiSlice";

export const ImageSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addImages: builder.mutation({
      query: (data) => ({
        url: "/upload",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["upload"],
    }),
  }),
});

export const { useAddImagesMutation } = ImageSlice;
