import React from "react";
import BudgetItem from "./BudgetItem";
import BudgetPieChartSmall from "./BudgetPieChartSmall";
import { getChartDataByBudget } from "../features/expenses/getChartDataByBudget";

export default function BudgetListWithCharts({ budgets, expenses }) {
  return (
    <div>
      <h2>Existing Budgets</h2>
      <div className="budgets">
        {budgets.map((budget) => {
          const chartData = getChartDataByBudget(expenses, budget.id);

          return (
            <div key={budget.id} className="budget-with-chart">
              <BudgetItem budget={budget} />
              {chartData.length > 0 && (
                <div className="chart-small">
                  <BudgetPieChartSmall chartData={chartData} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
