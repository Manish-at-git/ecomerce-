import { apiSlice } from "../apiSlice";

export const LoginSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
          url: "/auth/login",
          method: "POST",
          body: data,
      }),
      invalidatesTags: ["login"],
    }),
  }),
});

export const { useLoginMutation } = LoginSlice;
