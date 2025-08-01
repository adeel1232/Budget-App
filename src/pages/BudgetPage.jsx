// rrd imports
import { useLoaderData } from "react-router-dom";

// library
import { toast } from "react-toastify";
import { useState } from "react";

// components
import AddExpenseForm from "../components/AddExpenseForm";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";
import RecentExpensesChartSmall from "../components/RecentExpensesChartSmall";

// helpers
import {
  createExpense,
  deleteItem,
  getAllMatchingItems,
} from "../utils/helpers";

// loader
export async function budgetLoader({ params }) {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget you’re trying to find doesn’t exist");
  }

  return { budget, expenses };
}

// action
export async function budgetAction({ request }) {
  const data = await request.formData();
  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "createExpense") {
    try {
      
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        category:values.expenseCategory,
        budgetId: values.newExpenseBudget,
      });
      console.log("called from budget",{
        name: values.newExpense,
        amount: values.newExpenseAmount,
        category:values.expenseCategory,
        budgetId: values.newExpenseBudget,
      })
      return toast.success(`Expense ${values.newExpense} created!`);
    } catch (e) {
      throw new Error("There was a problem creating your expense.");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });
      return toast.success("Expense deleted!");
    } catch (e) {
      throw new Error("There was a problem deleting your expense.");
    }
  }
}

// component
const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();
  const [showChart, setShowChart] = useState(false);

  return (
    <div className="grid-lg" style={{ "--accent": budget.color }}>
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>

      {/* Budget + Add Expense Form */}
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseForm budgets={[budget]} />
      </div>

      {/* ✅ Toggle Chart Section */}
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>Recent Expenses Breakdown</h2>
          <button
            className="btn"
            onClick={() => setShowChart(!showChart)}
          >
            {showChart ? "Hide" : "Show"} Recent Expenses Chart
          </button>

          {showChart && (
            <RecentExpensesChartSmall
              budgets={[budget]}
              expenses={expenses}
            />
          )}
        </div>
      )}

      {/* ✅ Expenses Table */}
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
