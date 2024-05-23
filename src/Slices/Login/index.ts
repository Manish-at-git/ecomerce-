import { apiSlice } from "../apiSlice";

export const LoginSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    authLogin: builder.mutation<any, any>({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["login"],
    }),
    // disableAccount: builder.mutation<any,any>({
    //   query(id) {
    //     return {
    //       url: `/BankAccount/DisableAccount/${id}`,
    //       method: "PUT",
    //     };
    //   },
    //   invalidatesTags: ["login"],
    // }),
    // AddBankAccount: builder.mutation<any, any>({
    //   query: (data) => ({
    //     url: "/BankAccount/AddAccount",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["login"],
    // }),
  }),
  
});

export const {
 useAuthLoginMutation
} = LoginSlice;
