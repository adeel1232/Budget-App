import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { Pie } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

// Register plugins
ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

const BudgetPieChart = ({ budgets }) => {
  if (!budgets || budgets.length === 0) return null;

  const total = budgets.reduce((sum, b) => sum + b.amount, 0);

  const data = {
    labels: budgets.map(b => b.name),
    datasets: [
      {
        data: budgets.map(b => b.amount),
        backgroundColor: [
          '#FF6B6B', '#6BCB77', '#4D96FF',
          '#FFC75F', '#A66DD4', '#FFA07A'
        ],
        borderColor: '#fff',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          boxWidth: 16,
          padding: 10,
          color: '#333',
          font: { size: 13 },
        },
      },
      datalabels: {
        color: '#fff',
        formatter: (value, context) => {
          const percent = ((value / total) * 100).toFixed(1);
          return `${percent}%`;
        },
        font: {
          size: 12,
          weight: 'bold',
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.heading}>Budget Overview</h3>
      <Pie data={data} options={options} />
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '380px',
    background: '#ffffff',
    margin: '2rem auto',
    padding: '1rem',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '1rem',
    fontSize: '1.1rem',
    color: '#444',
  },
};

export default BudgetPieChart;
