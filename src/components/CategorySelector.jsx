import React, { useState } from 'react';
import expenseCategories from '../constants/expenseCategories';

const CategorySelector = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [expenses, setExpenses] = useState([]);
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedCategory || !expenseName || !expenseAmount) return;
    
    const newExpense = {
      id: Date.now(),
      name: expenseName,
      amount: parseFloat(expenseAmount),
      category: selectedCategory
    };
    
    setExpenses([...expenses, newExpense]);
    setExpenseName('');
    setExpenseAmount('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add New Expense</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="category">Category: </label>
          <select
            id="category"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {expenseCategories.map((cat) => (
              <option key={cat.name} value={cat.name}>
                {cat.icon} {cat.name}
              </option>
            ))}
          </select>
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="name">Expense Name: </label>
          <input
            id="name"
            type="text"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
            required
          />
        </div>
        
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="amount">Amount: </label>
          <input
            id="amount"
            type="number"
            step="0.01"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
            required
          />
        </div>
        
        <button type="submit">Add Expense</button>
      </form>

      <div style={{ marginTop: '30px' }}>
        <h3>Your Expenses</h3>
        {expenses.length === 0 ? (
          <p>No expenses added yet</p>
        ) : (
          <ul>
            {expenses.map((expense) => {
              const category = expenseCategories.find(cat => cat.name === expense.category);
              return (
                <li key={expense.id} style={{ marginBottom: '10px' }}>
                  <span style={{ marginRight: '10px' }}>{category?.icon || '❓'}</span>
                  <strong>{expense.name}</strong>: ${expense.amount.toFixed(2)} 
                  <span style={{ marginLeft: '10px', color: '#666' }}>
                    ({category?.name || 'Uncategorized'})
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default CategorySelector;