import { Link, useFetcher } from "react-router-dom";
import { TrashIcon } from "@heroicons/react/24/solid";
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../utils/helpers";
import { useRef } from "react";
import expenseCategories from "../constants/expenseCategories";

const ExpenseItem = ({ expense, showBudget = true }) => {
  const fetcher = useFetcher();

  // Store categories in ref to avoid re-initialization
  const categoriesRef = useRef(expenseCategories);

  // Get matching budget
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  // Show original category if not in list
  const formattedCategory = categoriesRef.current.includes(expense.category?.toUpperCase())
    ? expense.category.toUpperCase()
    : expense.category;

  return (
    <>
      <td>{expense.name}</td>
      <td>{formattedCategory}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>

      {showBudget && budget && (
        <td>
          <Link
            to={`/budget/${budget.id}`}
            style={{ "--accent": budget.color }}
          >
            {budget.name}
          </Link>
        </td>
      )}

      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button
            type="submit"
            className="btn btn--warning"
            aria-label={`Delete ${expense.name} expense`}
          >
            <TrashIcon width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

export default ExpenseItem;
