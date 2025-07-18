import { useEffect, useRef } from "react";
import { useFetcher } from "react-router-dom";
import { PlusCircleIcon } from "@heroicons/react/24/solid";

const categories = [
 

"MEDICAL" , 
 "TRANSPORT",  
 "OFFICE"  ,
 "INSURANCE",  
 "ELECTRONICS",  
 "GROCERY"  ,
 "WEDDING"  ,
 "INSTALLMENT",  
 "PERSONAL"  ,
 "FAMILY"  ,
 "COMMITTEE",  
 "GIFT"  ,
 "LOAN"  ,
 "PAID"  ,
 "MOBILE" , 
 "EDUCATION",  
 "HEALTH"  ,
 "FITNESS"  ,
"ENTERTAINMENT",  
 "SHOPPING"  ,
 "RENT"  ,
 "BILLS"  ,
 "FOOD"  , "DRINK"  ,

];

const AddExpenseForm = ({ budgets }) => {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  const validateForm = (e) => {
    const name = formRef.current.elements["newExpense"].value.trim();
    const amount = formRef.current.elements["newExpenseAmount"].value;
    const category = formRef.current.elements["expenseCategory"].value;
    const budgetSelect = formRef.current.elements["newExpenseBudget"];
    const budgetName =
      budgets.length === 1
        ? budgets[0].name
        : budgetSelect.options[budgetSelect.selectedIndex]?.text;

    const nameOnlyRegex = /^[A-Za-z ]+$/;

    if (!nameOnlyRegex.test(name)) {
      e.preventDefault();
      alert("❌ Expense Name must contain only letters.");
      return false;
    }

    if (!nameOnlyRegex.test(budgetName)) {
      e.preventDefault();
      alert("❌ Budget Name must contain only letters.");
      return false;
    }

    // ✅ Save to sessionStorage
    const expenseData = {
      name,
      amount,
      category,
      budget: budgetName,
    };
    sessionStorage.setItem("lastExpense", JSON.stringify(expenseData));

    return true;
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">
        Add New{" "}
        <span className="accent">
          {budgets.length === 1 && `${budgets[0].name}`}
        </span>{" "}
        Expense
      </h2>

      <fetcher.Form
        method="post"
        className="grid-sm"
        ref={formRef}
        onSubmit={validateForm}
      >
        <div className="expense-inputs">
          <div className="grid-xs">
            <label htmlFor="newExpense">Expense Name</label>
            <input
              type="text"
              name="newExpense"
              id="newExpense"
              placeholder="e.g., Coffee"
              ref={focusRef}
              required
            />
          </div>

          <div className="grid-xs">
            <label htmlFor="newExpenseAmount">Amount</label>
            <input
              type="number"
              step="0.01"
              inputMode="decimal"
              name="newExpenseAmount"
              id="newExpenseAmount"
              placeholder="e.g., 3.50"
              required
            />
          </div>

          <div className="grid-xs">
            <label htmlFor="expenseCategory">Category</label>
            <select name="expenseCategory" id="expenseCategory" required>
              <option value="">-- Choose Category --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Budget Selector (hidden if only one) */}
        <div className="grid-xs" hidden={budgets.length === 1}>
          <label htmlFor="newExpenseBudget">Budget Category</label>
          <select name="newExpenseBudget" id="newExpenseBudget" required>
            {budgets
              .sort((a, b) => a.createdAt - b.createdAt)
              .map((budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
          </select>
        </div>

        <input type="hidden" name="_action" value="createExpense" />
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
         <input
  type="date"
  name="createdAt"
  required
  defaultValue={new Date().toISOString().split("T")[0]}
/>

         
          {isSubmitting ? (
            <span>Submitting…</span>
          ) : (
            <>
              <span>Add Expense</span>
              <PlusCircleIcon width={20} />
            </>
          )}
          
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddExpenseForm;
