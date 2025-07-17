import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { formatCurrency } from "../utils/helpers";

const COLORS = ["#4CAF50", "#F44336", "#2196F3", "#FF9800", "#9C27B0"];

const Graph = ({ title = "Spending Chart", data = [] }) => {
  const chartData = data.map((item, index) => ({
    name: item.name,
    value: item.spent,
    color: COLORS[index % COLORS.length],
  }));

  const total = chartData.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="graph">
      <h2>{title}</h2>
      {total === 0 ? (
        <p>No spending yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
              label={({ name, value }) =>
                `${name}: ${formatCurrency(value)}`
              }
            >
              {chartData.map((entry, index) => (
                <Cell key={index} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => formatCurrency(value)} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default Graph;
