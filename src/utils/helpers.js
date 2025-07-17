// Delay Function
export const waait = () =>
  new Promise((res) => setTimeout(res, Math.random() * 800));

// Generate Random Color
const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;
  return `${existingBudgetLength * 34} 65% 50%`;
};

// Fetch data from localStorage
export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

// Get matching items
export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];
  return data.filter((item) => item[key] === value);
};

// Delete item from localStorage
export const deleteItem = ({ key, id }) => {
  const existingData = fetchData(key);
  if (id) {
    const newData = existingData.filter((item) => item.id !== id);
    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

// Create Budget
export const createBudget = ({ name, amount }) => {
  const numericAmount = Math.abs(+amount); // Convert negative to positive

  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: numericAmount,
    color: generateRandomColor(),
  };

  const existingBudgets = fetchData("budgets") ?? [];
  existingBudgets.push(newItem);
  localStorage.setItem("budgets", JSON.stringify(existingBudgets));

  return newItem;
};

// Create Expense
export const createExpense = ({ name, amount, budgetId }) => {
  const numericAmount = Math.abs(+amount); // Convert negative to positive

  const newItem = {
    id: crypto.randomUUID(),
    name,
    createdAt: Date.now(),
    amount: numericAmount,
    budgetId,
  };

  const existingExpenses = fetchData("expenses") ?? [];
  localStorage.setItem("expenses", JSON.stringify([...existingExpenses, newItem]));

  return newItem;
};

// Total Spent by Budget
export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];
  return expenses.reduce((acc, expense) => {
    if (expense.budgetId !== budgetId) return acc;
    return acc + expense.amount;
  }, 0);
};

// Format Date
export const formatDateToLocaleString = (epoch) =>
  new Date(epoch).toLocaleDateString();

// Format Percentage
export const formatPercentage = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

// Format Currency
export const formatCurrency = (amt) => {
  return amt.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};
