// src/components/BudgetPieChartSmall.jsx
import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = [
  "#FF6B6B", "#FFA94D", "#FFD43B", "#69DB7C",
  "#4DABF7", "#845EF7", "#F783AC", "#66D9E8"
];

const BudgetPieChartSmall = ({ chartData }) => {
  if (!chartData?.length) return null;

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          outerRadius={80}
          innerRadius={45}
          dataKey="value"
          label={({ name, percent }) =>
            `${name.length > 10 ? name.slice(0, 10) + "…" : name} (${(percent * 100).toFixed(0)}%)`
          }
          style={{ fontSize: "0.85rem", fill: "#333" }}
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => [`$${value}`, "Amount"]}
          contentStyle={{ fontSize: "0.9rem" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BudgetPieChartSmall;
