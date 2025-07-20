import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

// 🌈 Beautiful modern color palette
const COLORS = [
  "#FF6B6B", "#6BCB77", "#4D96FF", "#FFD93D", "#FF9CEE",
  "#845EC2", "#00C9A7", "#F9F871", "#FF9671", "#00B8A9",
];

// 📊 Function to combine duplicate categories and sum their values
const combineDuplicateCategories = (data) => {
  const combined = {};
  
  data.forEach(item => {
    const key = item.name.toLowerCase().trim(); // Normalize the category name
    if (!combined[key]) {
      combined[key] = { ...item };
    } else {
      combined[key].value += item.value;
    }
  });
  
  return Object.values(combined);
};

// 🧁 Styled pie chart component
const BudgetPieChartSmall = ({ chartData }) => {
  if (!chartData || !chartData.length) {
    return (
      <div style={{
        height: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#666'
      }}>
        <p>No data available</p>
      </div>
    );
  }

  // Combine duplicate categories
  const processedData = combineDuplicateCategories(chartData);

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
          label={({ percent }) => `${(percent * 100).toFixed(0)}%`} // Only show percentage
        >
          {processedData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
              stroke="#ffffff"
              strokeWidth={2}
            />
          ))}
        </Pie>
        <Tooltip
          formatter={(value, name) => [
            `$${value.toFixed(2)}`, 
            name
          ]}
          contentStyle={{
            backgroundColor: "#ffffff",
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