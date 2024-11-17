import { createSlice } from "@reduxjs/toolkit";
import LocalStorage from "../services/localStorage";

function getThemeFromLocalStorage() {
  if (localStorage.getItem("dark")) {
    return JSON.parse(localStorage.getItem("dark"));
  }
  return (
    !!window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  );
}

// function setThemeToLocalStorage(value) {
//   window.localStorage.setItem("dark", value);
// }

const initialState = {
  theme: getThemeFromLocalStorage(),
  isSideMenuOpen: true,
  isAuthenticated: LocalStorage.get("token") ? true : false,
  userDetails:{},
  propertyList:[]
};

const commonSlice = createSlice({
  initialState,
  name: "common",
  reducers: {
    toggleTheme: (state) => ({
      ...state,
      theme: !state?.theme,
    }),
    toggleSideMenu: (state) => ({
      ...state,
      isSideMenuOpen: !state?.isSideMenuOpen,
    }),
    handleAuthentication: (state, action) => ({
      ...state,
      isAuthenticated: action?.payload,
    }),
    fetchUserDetails:(state,action) => ({
      ...state,
      userDetails:action.payload
    }),
    fetchPropertyList:(state,action) => ({
      ...state,
      propertyList:action.payload
    })
  },
  // extraReducers: (builder) => {},
});

export const { toggleTheme, toggleSideMenu, handleAuthentication,fetchUserDetails,fetchPropertyList } =
  commonSlice.actions;
export default commonSlice.reducer;
