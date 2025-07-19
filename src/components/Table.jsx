// component import
import { formatDate } from "../utils/formatDate";

const Table = ({ expenses, showBudget = true }) => {
  return (
    <div className="table">
      <table>
        <thead>
          <tr>
            {["Name", "Category", "Amount", "Date", showBudget ? "Budget" : "", ""].map(
              (heading, index) => (
                <th key={index}>{heading}</th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.name}</td>
              <td>
               <span className={`badge badge--${expense.category ? expense.category.toLowerCase() : "default"}`}>
  {expense.category || "No Category"}
</span>

              </td>
              <td>{expense.amount}</td>
              <td>{formatDate(expense.createdAt)}</td>
              {showBudget && <td>{expense.budgetName}</td>}
              <td>
                {/* Optional actions like Delete/Edit buttons can go here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
