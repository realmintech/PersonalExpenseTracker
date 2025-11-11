import { useMemo } from "react";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Transaction } from "../App";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface FinanceChartProps {
  transactions: Transaction[];
}

const FinanceChart: React.FC<FinanceChartProps> = ({ transactions }) => {
  const barChartData = useMemo(() => {
    const categories = [...new Set(transactions.map((t) => t.category))];

    const incomeData = categories.map((cat) =>
      transactions
        .filter((t) => t.category === cat && t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0)
    );

    const expenseData = categories.map((cat) =>
      transactions
        .filter((t) => t.category === cat && t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0)
    );

    return {
      labels: categories,
      datasets: [
        {
          label: "Income",
          data: incomeData,
          backgroundColor: "rgba(229, 168, 35, 0.7)",
          borderRadius: 8,
        },
        {
          label: "Expense",
          data: expenseData,
          backgroundColor: "rgba(23,68,68,0.8)", 
          borderRadius: 8,
        },
      ],
    };
  }, [transactions]);

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const, labels: { color: "#350802" } },
      title: {
        display: true,
        text: "Income vs Expense by Category",
        color: "#350802",
        font: { size: 18, weight: "bold", family: "Poppins" },
      },
      tooltip: {
        backgroundColor: "#350802",
        titleColor: "#E5A823",
        bodyColor: "#F9F5EC",
      },
    },
    scales: {
      x: { ticks: { color: "#350802" }, grid: { color: "rgba(53,8,2,0.1)" } },
      y: { ticks: { color: "#350802" }, grid: { color: "rgba(53,8,2,0.05)" } },
    },
  };

  const pieChartData = useMemo(() => {
    const categories = [...new Set(transactions.map((t) => t.category))];
    const totalPerCategory = categories.map((cat) =>
      transactions
        .filter((t) => t.category === cat)
        .reduce((sum, t) => sum + t.amount, 0)
    );

    const backgroundColors = categories.map((cat) => {
      const income = transactions
        .filter((t) => t.category === cat && t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
      const expense = transactions
        .filter((t) => t.category === cat && t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
      return income >= expense ? "rgba(34,197,94,0.7)" : "rgba(239,68,68,0.7)";
    });

    return {
      labels: categories,
      datasets: [
        {
          label: "Total Amount per Category",
          data: totalPerCategory,
          backgroundColor: backgroundColors,
          borderColor: "#fff",
          borderWidth: 2,
        },
      ],
    };
  }, [transactions]);

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
        labels: { color: "#350802", font: { family: "Poppins", size: 14 } },
      },
      title: {
        display: true,
        text: "Proportion of Transactions by Category",
        color: "#350802",
        font: { size: 18, weight: "bold", family: "Poppins" },
      },
      tooltip: {
        backgroundColor: "#350802",
        titleColor: "#E5A823",
        bodyColor: "#F9F5EC",
      },
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="bg-gradient-to-br from-[#F9F5EC] to-[#fff] p-6 rounded-2xl shadow-lg border border-[#E5A823]/30 backdrop-blur-md">
        <Bar data={barChartData} options={barOptions} />
      </div>

      {/* Pie Chart */}
      <div className="bg-gradient-to-br from-[#F9F5EC] to-[#fff] p-6 rounded-2xl shadow-lg border border-[#E5A823]/30 backdrop-blur-md">
        <Pie data={pieChartData} options={pieOptions} />
      </div>
    </div>
  );
};

export default FinanceChart;
