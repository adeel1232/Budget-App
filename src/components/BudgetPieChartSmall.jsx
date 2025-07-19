import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// 🌈 Beautiful modern color palette
const COLORS = [
  "#FF6B6B", // Coral Red
  "#6BCB77", // Mint Green
  "#4D96FF", // Soft Blue
  "#FFD93D", // Sunny Yellow
  "#FF9CEE", // Baby Pink
  "#845EC2", // Violet
  "#00C9A7", // Aqua
  "#F9F871", // Lemon Yellow
  "#FF9671", // Orange
  "#00B8A9", // Cyan Green
];

// 🧁 Styled pie chart component
const BudgetPieChartSmall = ({ chartData }) => {
  if (!chartData || !chartData.length) return <p>No data available</p>;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          labelLine={false}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {chartData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke="#ffffff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "#ffffff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "0.9rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
          cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BudgetPieChartSmall;
