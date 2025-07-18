// src/components/BudgetListWithCharts.jsx
import React from "react";
import BudgetItem from "./BudgetItem";
import RecentExpensesChartSmall from "./RecentExpensesChartSmall";
import "../styles/BudgetListWithCharts.css"; // Optional CSS file

export default function BudgetListWithCharts({ budgets, expenses }) {
  return (
    <div>
      <h2>Existing Budgets</h2>
      <div className="budgets">
        {budgets.map((budget) => {
          const relatedExpenses = expenses.filter(
            (expense) => expense.budgetId === budget.id
          );

          return (
            <div key={budget.id} className="budget-with-chart">
              <BudgetItem budget={budget} />

              {relatedExpenses.length > 0 && (
                <div className="chart-small">
                  <RecentExpensesChartSmall expenses={relatedExpenses} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
