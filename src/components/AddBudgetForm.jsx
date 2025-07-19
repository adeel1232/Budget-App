// reacts
import { useEffect, useRef } from "react";

// rrd imports
import { useFetcher } from "react-router-dom";

// library imports
import { CurrencyDollarIcon } from "@heroicons/react/24/solid";

const AddBudgetForm = () => {
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

  const handleSubmit = (e) => {
    const name = formRef.current.elements["newBudget"].value.trim();
    const amount = formRef.current.elements["newBudgetAmount"].value;

    const budgetData = {
      name,
      amount,
    };

    // Optionally save the last budget to sessionStorage
    sessionStorage.setItem("lastBudget", JSON.stringify(budgetData));
  };

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create Budget</h2>

      <fetcher.Form
        method="post"
        className="grid-sm"
        ref={formRef}
        onSubmit={handleSubmit}
      >
        {/* Budget Name */}
        <div className="grid-xs">
          <label htmlFor="newBudget">Budget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
            ref={focusRef}
          />
        </div>

        {/* Budget Amount */}
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step="0.01"
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., 350"
            required
            inputMode="decimal"
          />
        </div>

        {/* Hidden action */}
        <input type="hidden" name="_action" value="createBudget" />

        {/* Submit Button */}
        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting…</span>
          ) : (
            <>
              <span>Create Budget</span>
              <CurrencyDollarIcon width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetForm;
