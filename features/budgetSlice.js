import { createSlice } from '@reduxjs/toolkit';

const budgetSlice = createSlice({
  name: 'budget',
  initialState: [],
  reducers: {
    addBudget: (state, action) => {
      state.push(action.payload);
    },
    deleteBudget: (state, action) => {
      return state.filter(b => b.id !== action.payload);
    },
  },
});

export const { addBudget, deleteBudget } = budgetSlice.actions;
export default budgetSlice.reducer;
