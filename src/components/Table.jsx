// src/components/Table.jsx
import { formatDate } from "../utils/formatDate";
import expenseCategories from "../constants/expenseCategories";
import { Form } from "react-router-dom";

const getCategoryIcon = (categoryName) => {
  const match = expenseCategories.find((cat) => cat.name === categoryName);
  return match?.icon || "❓";
};

const Table = ({ expenses, showBudget = true }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Date</th>
            {showBudget && <th>Budget</th>}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.name}</td>
                <td>
                  <span className={`badge badge--${expense.category?.toLowerCase() || "default"}`}>
                    {getCategoryIcon(expense.category)} {expense.category || "Uncategorized"}
                  </span>
                </td>
                <td>${parseFloat(expense.amount).toFixed(2)}</td>
                <td>{formatDate(expense.createdAt)}</td>
                {showBudget && <td>{expense.budgetName || "N/A"}</td>}
                <td>
                  <Form method="post">
                    <input type="hidden" name="_action" value="deleteExpense" />
                    <input type="hidden" name="expenseId" value={expense.id} />
                    <button className="btn btn--warning" type="submit">
                      Delete
                    </button>
                  </Form>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={showBudget ? 6 : 5}>No expenses found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
