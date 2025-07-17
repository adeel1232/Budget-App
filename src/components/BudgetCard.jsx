import React from "react";
import PropTypes from "prop-types";

const BudgetCard = ({ budget }) => {
  if (!budget) return null;

  const { name = "Unnamed Budget", amount = 0, expenses = [] } = budget;

  // Calculate total spent
  const totalSpent = expenses.reduce((total, exp) => total + (exp.amount || 0), 0);
  const remaining = amount - totalSpent;

  // Calculate percentage used
  const percentage = amount > 0
    ? Math.min((totalSpent / amount) * 100, 100).toFixed(1)
    : 0;

  return (
    <div className="budget-card" style={styles.card}>
      <h3>{name}</h3>
      <p><strong>Budget:</strong> Rs {amount.toLocaleString()}</p>
      <p><strong>Spent:</strong> Rs {totalSpent.toLocaleString()}</p>
      <p><strong>Remaining:</strong> Rs {remaining.toLocaleString()}</p>

      <div style={styles.progressBar}>
        <div
          style={{
            ...styles.filled,
            width: `${percentage}%`,
            backgroundColor: percentage > 80 ? "#e74c3c" : "#2ecc71",
          }}
        />
      </div>

      <p><small>{percentage}% used</small></p>
    </div>
  );
};

// Prop types for validation
BudgetCard.propTypes = {
  budget: PropTypes.shape({
    name: PropTypes.string,
    amount: PropTypes.number,
    expenses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        name: PropTypes.string,
        amount: PropTypes.number,
      })
    ),
  }),
};

// Inline styles (optional)
const styles = {
  card: {
    padding: "1rem",
    margin: "1rem 0",
    border: "1px solid #ccc",
    borderRadius: "8px",
    background: "#fafafa",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  },
  progressBar: {
    height: "12px",
    background: "#eee",
    borderRadius: "8px",
    overflow: "hidden",
    margin: "8px 0",
  },
  filled: {
    height: "100%",
    transition: "width 0.4s ease-in-out",
  },
};

export default BudgetCard;
