// src/pages/Dashboard.jsx
import React, { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";

// Components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import BudgetPieChart from "../components/BudgetPieChart";
import RecentExpensesChartSmall from "../components/RecentExpensesChartSmall";

// Utils
import {
  fetchData,
  createBudget,
  createExpense,
  deleteItem,
  waait,
} from "../utils/helpers";

// 📦 Loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets") || [];
  const expenses = fetchData("expenses") || [];

  const budgetsWithExpenses = budgets.map((budget) => ({
    ...budget,
    expenses: expenses.filter((expense) => expense.budgetId === budget.id),
  }));

  return { userName, budgets: budgetsWithExpenses, expenses };
}

// 🚀 Action Handler
export async function dashboardAction({ request }) {
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);
  await waait();

  try {
    if (_action === "newUser") {
      sessionStorage.setItem("userName", JSON.stringify(values.userName));
      return null;
    }

    if (_action === "createBudget") {
      createBudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return null;
    }

    if (_action === "createExpense") {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
        category: values.expenseCategory,
        createdAt: new Date(values.createdAt).getTime(),
      });
      return null;
    }

    if (_action === "deleteExpense") {
      deleteItem({ key: "expenses", id: values.expenseId });
      return null;
    }
  } catch (error) {
    throw new Error("There was a problem processing your request.");
  }
}

// 🧠 Dashboard Component
export default function Dashboard() {
  const { userName, budgets, expenses } = useLoaderData();
  const [showChart, setShowChart] = useState(false);

  const handleToggleChart = () => setShowChart((prev) => !prev);

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>

          <div className="grid-sm">
            {budgets.length > 0 ? (
              <div className="grid-lg">
                {/* Forms */}
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>

                {/* Toggle Chart */}
                <button onClick={handleToggleChart} style={styles.button}>
                  {showChart ? "Hide" : "View"} Existing Budgets Chart
                </button>

                {showChart && (
                  <div className="chart-section">
                    <h2>Budget Overview</h2>
                    <BudgetPieChart budgets={budgets} />
                  </div>
                )}

                {/* Budget List */}
                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>

                {/* Recent Expenses Chart only (Table removed) */}
                {expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <RecentExpensesChartSmall expenses={expenses} />
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetForm />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
}

// 🔷 Button Style
const styles = {
  button: {
    padding: "10px 20px",
    backgroundColor: "#4D96FF",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    margin: "1rem 0",
    fontSize: "1rem",
  },
};
