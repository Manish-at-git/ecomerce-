import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders(headers) {
      let token = null;
      if (typeof window !== 'undefined') {
        // token = getCookie("authToken");
    }
      headers.set("authorization", `Bearer ${token && token}`);
      return headers;
    },
  }),
  tagTypes: [
    "login",
  ],
  endpoints: (builder) => ({}),
});
