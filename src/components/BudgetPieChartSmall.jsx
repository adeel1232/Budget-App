import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// 🎨 Unique color palette
const COLORS = [
  "#FF6B6B", "#6BCB77", "#4D96FF", "#FFD93D", "#FF9CEE",
  "#845EC2", "#00C9A7", "#F9F871", "#FF9671", "#00B8A9",
];

// 🔁 Combine categories with same name (case-insensitive)
const combineDuplicateCategories = (data) => {
  const combined = {};

  data.forEach((item) => {
    const key = item.category.trim().toLowerCase(); // normalize key
    if (!combined[key]) {
      combined[key] = {
        name: item.category.charAt(0).toUpperCase() + item.category.slice(1).toLowerCase(),
        value: item.value,
      };
    } else {
      combined[key].value += item.value;
    }
  });

  return Object.values(combined);
};

// 🎨 Generate color map based on unique category name
const getColorMap = (data) => {
  const colorMap = {};
  let colorIndex = 0;

  data.forEach((item) => {
    const name = item.name;
    if (!colorMap[name]) {
      colorMap[name] = COLORS[colorIndex % COLORS.length];
      colorIndex++;
    }
  });

  return colorMap;
};

// 📈 Budget pie chart component
const BudgetPieChartSmall = ({ chartData }) => {
  if (!chartData || chartData.length === 0) {
    return (
      <div style={{
        height: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666',
      }}>
        <p>No data available</p>
      </div>
    );
  }

  const processedData = combineDuplicateCategories(chartData);
  const colorMap = getColorMap(processedData);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={processedData}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100}
          labelLine={false}
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {processedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colorMap[entry.name]}
              stroke="#fff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
          contentStyle={{
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            fontSize: "0.9rem",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default BudgetPieChartSmall;
