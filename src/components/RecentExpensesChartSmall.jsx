// src/components/RecentExpensesChartSmall.jsx
import React from "react";
import BudgetPieChartSmall from "./BudgetPieChartSmall";
import expenseCategories from "../constants/expenseCategories";

const RecentExpensesChartSmall = ({ budgets, expenses }) => {
  if (!expenses?.length || !budgets?.length) return null;

  const validCategoryNames = expenseCategories.map(cat => cat.name);

  // Filter only valid category expenses
  const filteredExpenses = expenses.filter(exp =>
    validCategoryNames.includes(exp.category)
  );

  const budget = budgets[0]; // First budget context

  // Format data for pie chart
  const chartData = filteredExpenses.map((expense) => ({
    name: expense.category, // Or use expense.name if you prefer
    value: Math.abs(Number(expense.amount)),
  }));

  return (
    <section
      className="chart-section"
      style={{
        background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
        padding: "2rem",
        margin: "2rem auto",
        borderRadius: "1rem",
        maxWidth: "420px",
        boxShadow: "0 12px 30px rgba(0, 0, 0, 0.12)",
        textAlign: "center",
        border: "1px solid #e0e0e0",
        transition: "all 0.3s ease-in-out",
      }}
    >
      <h2
        className="h3"
        style={{
          fontSize: "1.6rem",
          fontWeight: "700",
          color: "#2C3E50",
          marginBottom: "1.5rem",
          letterSpacing: "0.5px",
        }}
      >
        {budget.name} Expense Breakdown
      </h2>

      <BudgetPieChartSmall chartData={chartData} />
    </section>
  );
};

export default RecentExpensesChartSmall;
