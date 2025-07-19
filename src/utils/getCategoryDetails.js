// src/utils/getCategoryDetails.js
import expenseCategories from "../constants/expenseCategories";

export const getCategoryDetails = (categoryName) => {
  const match = expenseCategories.find(cat => cat.name === categoryName);
  return {
    icon: match?.icon || "❓",
    name: match?.name || categoryName || "Uncategorized",
  };
};
