import { configureStore } from '@reduxjs/toolkit';
import budgetReducer from '../../features/budgetSlice';
import expenseReducer from '../../features/expenseSlice';

export const store = configureStore({
  reducer: {
    budgets: budgetReducer,
    expenses: expenseReducer,
  },
});
