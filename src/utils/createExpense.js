// src/utils/createExpense.js
import { fetchData, saveData } from "./helpers";

export const createExpense = ({ name, amount, budgetId, category, createdAt }) => {
  const newExpense = {
    id: crypto.randomUUID(),
    name: name.trim(),
    amount: Math.abs(Number(amount)),
    budgetId,
    category: category || "Uncategorized",
    createdAt: createdAt || Date.now(),
  };

  const existing = fetchData("expenses") || [];
  const updated = [...existing, newExpense];
  saveData("expenses", updated);
};
