// Le cœur de la gestion d’authentification dans projet

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // token → stocke le JWT pour authentifier les requêtes vers le backend. / Récupération depuis localStorage pour persistance après refresh.
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
  // reducers → définit les fonctions qui modifient l’état.
  reducers: {
    loginSuccess: (state, action) => {      
      state.token = action.payload.token;      
      state.user.firstName = action.payload.user.firstName;
      state.user.lastName = action.payload.user.lastName;
      state.isLoggedIn = true;
      // permet de persister la session même après refresh
      localStorage.setItem("token", action.payload.token);  
    },
    logout: (state) => {
      // Supprime le token et l’état utilisateur.
      state.token = null;
      // Réinitialise l’état pour revenir à une UI non connectée.
      state.user = { firstName: "", lastName: "" };
      state.isLoggedIn = false;
      // Supprime le token de localStorage pour la sécurité.
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
