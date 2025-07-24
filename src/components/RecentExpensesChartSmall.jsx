import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { useState } from "react";


// Custom color array
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AB63FA", "#F36265"];

const RecentExpensesChartSmall = ({ expenses }) => {
  const [hovered, setHovered] = useState(null);

  const total = expenses.reduce((sum, expense) => sum + Number(expense.amount), 0);

  const data = expenses.map((expense) => ({
    name: expense.category,
    value: Number(expense.amount),
    percentage: ((Number(expense.amount) / total) * 100).toFixed(1),
  }));

  return (
    <div className="chart-container">
      <PieChart width={300} height={300}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          onMouseEnter={(data, index) => setHovered(data.payload)}
          onMouseLeave={() => setHovered(null)}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>

      {/* Hover Info Box */}
      {hovered && (
        <div className="hover-info">
          <strong>Category:</strong> {hovered.name} <br />
          <strong>Spent:</strong> {hovered.percentage}%
        </div>
      )}
    </div>
  );
};

export default RecentExpensesChartSmall;
