import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expense',
  initialState: [],
  reducers: {
    addExpense: (state, action) => {
      state.push(action.payload);
    },
    deleteExpense: (state, action) => {
      return state.filter(e => e.id !== action.payload);
    },
  },
});

export const { addExpense, deleteExpense } = expenseSlice.actions;
export default expenseSlice.reducer;
