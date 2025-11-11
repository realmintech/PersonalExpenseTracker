import { useMemo } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function FinanceChart({ transactions }) {
  const chartData = useMemo(() => {
    const categories = [...new Set(transactions.map((t) => t.category))];
    const incomeData = categories.map((cat) =>
      transactions
        .filter((t) => t.category === cat && t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)
    );
    const expenseData = categories.map((cat) =>
      transactions
        .filter((t) => t.category === cat && t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)
    );

    return {
      labels: categories,
      datasets: [
        {
          label: 'Income',
          data: incomeData,
          backgroundColor: 'rgba(75, 192, 192, 0.6)'
        },
        {
          label: 'Expense',
          data: expenseData,
          backgroundColor: 'rgba(255, 99, 132, 0.6)'
        }
      ]
    };
  }, [transactions]);

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: 'Income vs. Expense by Category' }
    }
  };

  return (
    <div className="card">
      <Bar data={chartData} options={options} />
    </div>
  );
}

export default FinanceChart;