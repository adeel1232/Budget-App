// Delay utility (simulate wait)
export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// ========== Local Storage Helpers ==========
export const fetchData = (key) => JSON.parse(sessionStorage.getItem(key));

export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return sessionStorage.setItem(key, JSON.stringify(newData));
  }
  return sessionStorage.removeItem(key);
};

export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

// ========== Random Color Generator ==========
const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`; // HSL format
};

// ========== Budget and Expense Creation ==========
export const createBudget = ({ name, amount, type = "expense" }) => {
  const numericAmount = Math.abs(+amount);
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: numericAmount,
    type, // 'income' or 'expense'
    color: generateRandomColor(),
  };
  const existingBudgets = fetchData("budgets") ?? [];
  existingBudgets.push(newItem);
  sessionStorage.setItem("budgets", JSON.stringify(existingBudgets));
  return newItem;
};

export const createExpense = ({ name, amount, budgetId,category }) => {
  const numericAmount = Math.abs(+amount);
  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: numericAmount,
    budgetId,
    category
  };
  const existingExpenses = fetchData("expenses") ?? [];
  sessionStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]));
  return newItem;
};

// ========== Calculations ==========
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  return expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;
    return acc + expense.amount;
  }, 0);
};

export const calculateIncomeAndExpense = (budgets = []) => {
  let income = 0;
  let expense = 0;
  budgets.forEach((budget) => {
    if (budget.type === "income") {
      income += Math.abs(budget.amount);
    } else {
      expense += Math.abs(budget.amount);
    }
  });
  return { income, expense };
};

// ========== Formatters ==========
export const formatCurrency = (amt) =>
  amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });

export const formatPercentage = (amt) =>
  amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });

export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();
