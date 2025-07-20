export const getChartDataByBudget = (expenses = [], budgetId) => {
  const grouped = {};

  expenses
    .filter(exp => exp.budgetId === budgetId)
    .forEach(exp => {
      const name = exp.category || "Other";
      const amount = Math.abs(Number(exp.amount)) || 0;

      if (grouped[name]) {
        grouped[name] += amount;
      } else {
        grouped[name] = amount;
      }
    });

  // Convert grouped object to array for Recharts PieChart
  return Object.entries(grouped).map(([name, value]) => ({
    name,
    value,
  }));
};
