// src/components/BudgetInOutChart.jsx
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BudgetInOutChart({ budgets = [], expenses = [] }) {
  const labels = budgets.map((budget) => budget.name);
  const totalAmounts = budgets.map((budget) => budget.amount);
  const usedAmounts = budgets.map((budget) =>
    expenses
      .filter((expense) => expense.budgetId === budget.id)
      .reduce((sum, exp) => sum + exp.amount, 0)
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Total Budget",
        data: totalAmounts,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
      {
        label: "Used Expense",
        data: usedAmounts,
        backgroundColor: "rgba(255, 99, 132, 0.6)",
      },
    ],
  };

  const options = {
    indexAxis: 'y', // ✅ افقی گراف کے لیے
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: "bottom" },
      title: { display: true, text: "Budget vs Expense (Horizontal View)" },
    },
    scales: {
      x: {
        beginAtZero: true,
        ticks: { stepSize: 100 },
      },
    },
  };

  return (
    <div style={{ width: "100%", height: `${labels.length * 60}px`, margin: "auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
}


