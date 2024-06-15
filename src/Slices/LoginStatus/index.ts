import { RootState } from "@/stores";
import { createSlice } from "@reduxjs/toolkit";
// Ensure this path is correct

const initialState: any = {
  loginStatus: "login",
};

export const filterTab = createSlice({
  name: "filterTab",
  initialState,
  reducers: {
    setFilterTabs: (state, action) => {
      console.log(action,'setFilterTabssetFilterTabs')
      state.loginStatus = action.payload;
    },
  },
});

export const { setFilterTabs } = filterTab.actions;
export const authLoginState = (state: RootState) => state.filterTab.loginState;
export default filterTab.reducer;
