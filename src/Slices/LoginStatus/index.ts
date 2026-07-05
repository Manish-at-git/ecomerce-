import { RootState } from "@/stores";
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  loginStatus: "login",
  userDetails: {},
  token: ""
};

export const filterTab = createSlice({
  name: "filterTab",
  initialState,
  reducers: {
    setFilterTabs: (state, action) => {
      console.log(action,'setFilterTabssetFilterTabs')
      state.loginStatus = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload
    }
  },
});

export const { setFilterTabs } = filterTab.actions;
export const { setUserDetails } = filterTab.actions;
export const { setToken } = filterTab.actions;

export const authLoginState = (state: RootState) => state.filterTab.loginState;
export default filterTab.reducer;
