// src/components/RecentExpensesChart.jsx
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

// Group by Month Function
function groupExpensesByMonth(expenses = []) {
  const grouped = {};

  expenses.forEach((exp) => {
    const date = new Date(exp.createdAt);
    const month = date.toLocaleString("default", { month: "long", year: "numeric" });

    if (!grouped[month]) grouped[month] = [];
    grouped[month].push(exp);
  });

  return grouped;
}

export default function RecentExpensesChart({ expenses = [] }) {
  const [selectedMonth, setSelectedMonth] = useState("");

  const grouped = groupExpensesByMonth(expenses);
  const months = Object.keys(grouped);

  const currentExpenses = grouped[selectedMonth] || [];

  const sorted = [...currentExpenses]
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 7)
    .reverse();

  const data = {
    labels: sorted.map((e) =>
      new Date(e.createdAt).toLocaleDateString(undefined, {
        month: "short",
        day: "numeric",
      })
    ),
    datasets: [
      {
        label: "Expenses",
        data: sorted.map((e) => e.amount),
        backgroundColor: "#4D96FF",
        borderRadius: 8,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (ctx) => `$${ctx.parsed.y.toFixed(2)}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (val) => `$${val}`,
        },
      },
    },
  };

  return (
    <div style={{ margin: "2rem auto", maxWidth: "600px" }}>
      {/* Month Selector */}
      <div style={{ textAlign: "center", marginBottom: "1rem" }}>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">Select Month</option>
          {months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>

      {/* Only Show Graph if Month Selected */}
      {selectedMonth && currentExpenses.length > 0 ? (
        <Bar data={data} options={options} />
      ) : (
        <p style={{ textAlign: "center", color: "#888" }}>
          Please select a month to view expense details.
        </p>
      )}
    </div>
  );
}
