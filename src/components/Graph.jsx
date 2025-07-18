// src/components/Graph.jsx
import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Graph = ({ budgets }) => {
  const income = budgets
    .filter((b) => b.type === "income")
    .reduce((acc, b) => acc + b.amount, 0);

  const expense = budgets
    .filter((b) => b.type === "expense")
    .reduce(
      (acc, b) => acc + (b.expenses?.reduce((eacc, e) => eacc + e.amount, 0) || 0),
      0
    );

  const data = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Budget Stats",
        data: [income, expense],
        backgroundColor: ["#4ade80", "#f87171"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div className="chart-wrapper">
      <h2 style={{ textAlign: "center", marginBottom: "0.5rem" }}>
        Income vs Expense
      </h2>
      <div style={{ width: "250px", height: "250px", margin: "auto" }}>
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default Graph;
