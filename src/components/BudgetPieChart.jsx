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

const BudgetPieChartSmall = ({ budgets = [] }) => {
  // Filter out budgets with no expenses
  const filteredBudgets = budgets.filter(b => b.expenses?.length > 0);

  if (filteredBudgets.length === 0) return null;

  const data = {
    labels: filteredBudgets.map(b => b.name),
    datasets: [
      {
        label: "Total Spent",
        data: filteredBudgets.map(b =>
          b.expenses.reduce((total, exp) => total + (exp.amount || 0), 0)
        ),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0",
          "#9966FF", "#FF9F40", "#8BC34A", "#D2691E",
          "#6495ED", "#FFD700", "#20B2AA", "#A0522D"
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
        text: "Total Spent per Budget",
        font: { size: 14 },
      },
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div style={{ width: "300px", height: "300px", margin: "auto" }}>
      <Pie data={data} options={options} />
    </div>
  );
};

export default BudgetPieChartSmall;
