// src/pages/CategorySummary.jsx
import React from "react";
import expenseCategories from "../constants/expenseCategories";

const CategorySummary = () => {
  return (
    <div className="grid-lg">
      <h1>All Expense Categories</h1>
      <div className="grid-md categories">
        {expenseCategories.map((cat, index) => (
          <div key={index} className="category-card">
            <span className="icon">{cat.icon}</span>
            <span className="name">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySummary;
