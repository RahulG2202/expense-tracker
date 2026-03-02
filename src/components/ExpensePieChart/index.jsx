//* Package imports */
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const ExpensePieChart = () => {
  const { expenses } = useSelector((state) => state.expenses);

  const chartData = useMemo(() => {
    const approved = expenses.filter((e) => e.status === "Approved");

    const categoriesMap = approved.reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + Number(curr.amount);
      return acc;
    }, {});

    const labels = Object.keys(categoriesMap);
    const data = Object.values(categoriesMap);

    return {
      labels,
      datasets: [
        {
          label: "Total Funding (₹)",
          data,
          backgroundColor: [
            "#4A1D46", // Brand Purple
            "#FF9F8E", // Brand Coral
            "#AF7AC5", // Lavender
            "#7FB3D5", // Soft Blue
            "#76D7C4", // Teal
            "#F7DC6F", // Muted Yellow
          ],
          borderWidth: 0,
          hoverOffset: 15,
        },
      ],
    };
  }, [expenses]);

  const options = {
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          padding: 20,
          usePointStyle: true,
          font: {
            size: 11,
            weight: "bold",
            family: "'Inter', sans-serif",
          },
          color: "#9CA3AF", // Gray-400
        },
      },
      tooltip: {
        backgroundColor: "#4A1D46",
        titleFont: { size: 14 },
        bodyFont: { size: 14 },
        padding: 12,
        displayColors: false,
        callbacks: {
          label: (context) => ` ₹${context.raw.toLocaleString()}`,
        },
      },
    },
    maintainAspectRatio: false,
    cutout: "65%",
  };

  return (
    <div className="bg-white p-8 rounded-[3rem] shadow-sm border border-purple-50 flex flex-col items-center justify-center h-full min-h-100">
      <div className="text-center mb-6">
        <h3 className="text-xl font-bold text-gray-800">Budget Distribution</h3>
        <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
          By Funding Category
        </p>
      </div>

      <div className="relative w-full h-64">
        {chartData.labels.length > 0 ? (
          <Pie data={chartData} options={options} />
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-gray-300">
            <svg
              className="w-12 h-12 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
              />
            </svg>
            <p className="text-sm font-medium">No approved data to display</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExpensePieChart;
