
// rrd imports
import { Link, useLoaderData } from "react-router-dom";

// components
import Intro from "../components/Intro";
import AddBudgetForm from "../components/AddBudgetForm";
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import BudgetPieChart from "../components/BudgetPieChart";
import BudgetCard from "../components/BudgetCard";
// helper functions
import {
  createBudget,
  createExpense,
  deleteItem,
  fetchData,
  waait,
} from "../utils/helpers";

// loader
export function dashboardLoader() {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");

  const budgetsWithExpenses = budgets?.map((budget) => ({
    ...budget,
    expenses: expenses?.filter((expense) => expense.budgetId === budget.id),
  })) || [];

  return { userName, budgets: budgetsWithExpenses, expenses };
}

// action (must return at least null)
export async function dashboardAction({ request }) {
  const formData = await request.formData();
  const { _action, ...values } = Object.fromEntries(formData);

  await waait();

  try {
    if (_action === "newUser") {
      localStorage.setItem("userName", JSON.stringify(values.userName));
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
      });
      return null;
    }

    if (_action === "deleteExpense") {
      deleteItem({ key: "expenses", id: values.expenseId });
      return null;
    }

  } catch (e) {
    throw new Error("There was a problem processing your request");
  }
}

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();

  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back, <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetForm />
                  <AddExpenseForm budgets={budgets} />
                </div>

                {/* Budget Chart */}
                <div className="chart-section">
                  <h2>Budget Overview</h2>
                  <BudgetPieChart budgets={budgets} />
                </div>

                <h2>Existing Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>

                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                    />
                    {expenses.length > 8 && (
                      <Link to="expenses" className="btn btn--dark">
                        View all expenses
                      </Link>
                    )}
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
};

export default Dashboard;
