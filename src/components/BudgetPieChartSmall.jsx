import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// 🎨 Color palette
const COLORS = [
  "#FF6B6B", "#6BCB77", "#4D96FF", "#FFD93D", "#FF9CEE",
  "#845EC2", "#00C9A7", "#F9F871", "#FF9671", "#00B8A9",
];

// 📊 Pie Chart Component
const BudgetPieChartSmall = ({ chartData }) => {
  if (!chartData || !chartData.length) return <p>No data available</p>;

  // 🧮 Calculate total for percentage
  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div style={{ width: "100%", maxWidth: "250px", margin: "0 auto" }}>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            labelLine={false}
            label={false}
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
            formatter={(value, name) => {
              const percent = ((value / total) * 100).toFixed(1);
              return [`${percent}%`, name]; // 🟡 Show: 25%, CategoryName
            }}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #ddd",
              borderRadius: "8px",
              fontSize: "0.75rem",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.05)",
              padding: "8px",
            }}
            cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetPieChartSmall;
