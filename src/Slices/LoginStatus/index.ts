import { RootState } from "@/stores";
import { createSlice } from "@reduxjs/toolkit";
// Ensure this path is correct

const initialState: any = {
  authLogin: false,
  loginStatus: null,
};

export const filterTab = createSlice({
  name: "filterTab",
  initialState,
  reducers: {
    setFilterTabs: (state, action) => {
      state.loginStatus = action.payload;
    },
  },
});

export const { setFilterTabs } = filterTab.actions;
export const selectLoginStatus = (state: RootState) => state.filterTab.loginStatus;
export default filterTab.reducer;
