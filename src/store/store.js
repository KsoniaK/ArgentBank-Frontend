// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import transactionReducer from "./transactionsSlice"; // <-- ajouté

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer, // <-- intégré
  },
});
