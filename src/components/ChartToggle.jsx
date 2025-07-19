import { useState } from "react";
import RecentExpensesChartSmall from "./RecentExpensesChartSmall";

const ChartToggle = ({ budgets, expenses }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="chart-toggle">
      <button className="btn" onClick={() => setVisible(!visible)}>
        {visible ? "Hide" : "Show"} Recent Expense Breakdown
      </button>

      {visible && (
        <div className="chart-wrapper">
          <h2 className="h3">Recent Expenses</h2>
          <RecentExpensesChartSmall budgets={budgets} expenses={expenses} />
        </div>
      )}
    </div>
  );
};

export default ChartToggle;
