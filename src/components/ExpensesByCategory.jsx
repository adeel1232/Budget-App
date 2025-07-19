// src/components/ExpensesByCategory.jsx
import React from "react";
import { getCategoryDetails } from "../utils/getCategoryDetails";

// Helper function to group expenses
const groupExpensesByCategory = (expenses) => {
  const grouped = {};

  expenses.forEach((expense) => {
    const category = expense.category || "No Category";
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(expense);
  });

  return grouped;
};

const ExpensesByCategory = ({ expenses }) => {
  if (!expenses?.length) return <p>No expenses to display.</p>;

  const groupedExpenses = groupExpensesByCategory(expenses);

  return (
    <div className="expenses-grouped" style={{ padding: "1rem" }}>
      {Object.entries(groupedExpenses).map(([category, items]) => {
        const { icon, name: categoryName } = getCategoryDetails(category);

        return (
          <div
            key={category}
            style={{
              marginBottom: "2rem",
              padding: "1rem",
              border: "1px solid #ddd",
              borderRadius: "10px",
              background: "#f9f9f9",
            }}
          >
            <h3 style={{ marginBottom: "1rem", color: "#2c3e50" }}>
              {icon} {categoryName}
            </h3>
            <ul>
              {items.map((expense) => (
                <li key={expense.id} style={{ marginBottom: "0.5rem" }}>
                  <strong>{expense.name}</strong>: ${Math.abs(expense.amount).toFixed(2)}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ExpensesByCategory;
