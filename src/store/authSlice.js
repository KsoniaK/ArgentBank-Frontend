import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: {
    firstName: "",
    lastName: "",
  },
  isLoggedIn: !!localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      // console.log(action);
      
      state.token = action.payload.token;      
      state.user.firstName = action.payload.user.firstName;
      state.user.lastName = action.payload.user.lastName;
      state.isLoggedIn = true;
      localStorage.setItem("token", action.payload.token);      
    },
    logout: (state) => {
      state.token = null;
      state.user = { firstName: "", lastName: "" };
      state.isLoggedIn = false;
      localStorage.removeItem("token");
    },
    updateUserProfile: (state, action) => {
      // IMPORTANT : on remplace tout l'objet user pour forcer le re-render
      state.user = {
        firstName: action.payload.firstName || "",
        lastName: action.payload.lastName || "",
      };
    }
  },
});

export const { loginSuccess, logout, updateUserProfile } = authSlice.actions;
export default authSlice.reducer;
