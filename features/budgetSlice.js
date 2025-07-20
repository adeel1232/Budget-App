// src/redux/slices/budgetSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  budgets: [],
};

const budgetSlice = createSlice({
  name: 'budget',
  initialState,
  reducers: {
    createBudget: (state, action) => {
      const { name, amount } = action.payload;
      state.budgets.push({
        id: Date.now(),
        name,
        amount: Math.abs(Number(amount)),
        createdAt: new Date().toISOString(),
      });
    },
    deleteBudget: (state, action) => {
      state.budgets = state.budgets.filter(b => b.id !== action.payload);
    },
  },
});

export const { createBudget, deleteBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
