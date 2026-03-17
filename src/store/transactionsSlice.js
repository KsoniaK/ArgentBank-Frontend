// gère l’état des transactions dans projet

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // Initialisé vide, il sera rempli après un fetch depuis l’API ou via addTransaction
  transactions: [],
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setTransactions: (state, action) => {
      console.log(action);
      
      state.transactions = action.payload;
    },
    addTransaction: (state, action) => {
      state.transactions.push(action.payload);
    },
  },
});

export const { setTransactions, addTransaction } = transactionSlice.actions;
export default transactionSlice.reducer;
