import { apiSlice } from "@/Slices/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import type { MiddlewareAPI, Middleware } from "@reduxjs/toolkit";


export const rtkQueryErrorLogger: Middleware =
  (api: MiddlewareAPI) => (next) => (action:any) => {
    if (isRejectedWithValue(action)) {
      const routeTo = process.env.NEXT_PUBLIC_APP_LOGIN || "http://localhost:3001/login";
      console.warn(`We got a rejected action! ${action.error.message}`);
      if(action.payload.status === 401){
        // Cookies.remove("authToken");
      localStorage.removeItem("sidebarData");
      window.location.replace(routeTo);
      }
    }
    return next(action);
  };





export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware:any) =>
    getDefaultMiddleware().concat(
      apiSlice.middleware,
      rtkQueryErrorLogger
    ),
  devTools: true,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
