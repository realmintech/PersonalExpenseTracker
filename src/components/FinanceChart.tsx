"use client";

import { useMemo } from "react";
import { Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
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
          backgroundColor: "rgba(34,197,94,0.8)",
          borderRadius: 8,
        },
        {
          label: "Expense",
          data: expenseData,
          backgroundColor: "rgba(239,68,68,0.8)",
          borderRadius: 8,
        },
      ],
    };
  }, [transactions]);

  const barOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false, 
    plugins: {
      legend: {
        position: "top",
        labels: { color: "#350802", font: { family: "Poppins" } },
      },
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

  const doughnutData = useMemo(() => {
    const categories = [...new Set(transactions.map((t) => t.category))];
    const totalPerCategory = categories.map((cat) =>
      transactions
        .filter((t) => t.category === cat)
        .reduce((sum, t) => sum + t.amount, 0)
    );

    const colorPalette = [
      "rgba(255,99,132,0.8)",
      "rgba(54,162,235,0.8)",
      "rgba(255,206,86,0.8)",
      "rgba(75,192,192,0.8)",
      "rgba(153,102,255,0.8)",
      "rgba(255,159,64,0.8)",
      "rgba(34,197,94,0.8)",
    ];

    return {
      labels: categories,
      datasets: [
        {
          label: "Total by Category",
          data: totalPerCategory,
          backgroundColor: colorPalette.slice(0, categories.length),
          borderColor: "#fff",
          borderWidth: 2,
          hoverOffset: 12,
        },
      ],
    };
  }, [transactions]);

  const doughnutOptions: ChartOptions<"doughnut"> = {
    responsive: true,
    cutout: "70%",
    plugins: {
      legend: {
        position: "right",
        labels: {
          color: "#350802",
          font: { family: "Poppins", size: 14 },
        },
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
      
      <div className="bg-gradient-to-br from-[#F9F5EC] to-[#fff] p-6 rounded-2xl shadow-lg border border-[#E5A823]/30 backdrop-blur-md h-[400px] md:h-[500px]">
        <Bar data={barChartData} options={barOptions} />
      </div>

     
      <div className="bg-gradient-to-br from-[#F9F5EC] to-[#fff] p-6 rounded-2xl shadow-lg border border-[#E5A823]/30 backdrop-blur-md flex justify-center items-center h-[400px] md:h-[500px]">
        <Doughnut data={doughnutData} options={doughnutOptions} />
      </div>
    </div>
  );
};

export default FinanceChart;
