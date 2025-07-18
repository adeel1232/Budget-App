import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const RecentExpensesChartSmall = ({ expenses = [] }) => {
  const recentExpenses = expenses
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 7);

  // Don't show chart if no expenses
  if (recentExpenses.length === 0) return null;

  const data = {
    labels: recentExpenses.map((e) => e.name),
    datasets: [
      {
        label: "Amount",
        data: recentExpenses.map((e) => e.amount),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
          "#9966FF", "#FF9F40", "#8BC34A",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Recent Expenses",
        font: { size: 14 },
      },
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div style={{ width: "250px", height: "250px", margin: "auto" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default RecentExpensesChartSmall;
