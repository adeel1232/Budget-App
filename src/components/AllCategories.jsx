import React from "react";
import expenseCategories from "../constants/expenseCategories";

const AllCategories = () => {
  return (
    <div className="all-categories" style={{ padding: "1rem" }}>
      <h2 style={{ marginBottom: "1rem" }}>Expense Categories</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "flex-start",
        }}
      >
        {expenseCategories.map((cat) => (
          <div
            key={cat.name}
            style={{
              padding: "0.75rem 1.25rem",
              border: "1px solid #ddd",
              borderRadius: "12px",
              background: "#f9f9f9",
              display: "flex",
              alignItems: "center",
              fontSize: "1rem",
              fontWeight: "500",
              gap: "0.5rem",
              minWidth: "150px",
              justifyContent: "center",
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>{cat.icon}</span>
            {cat.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllCategories;
