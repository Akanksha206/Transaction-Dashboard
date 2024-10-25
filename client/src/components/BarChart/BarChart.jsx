import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

import './BarChart.css';

// Register chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({ month }) => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    fetchChartData(month);
  }, [month]);

  const fetchChartData = async (selectedMonth) => {
    try {
      const response = await fetch(`http://localhost:5000/api/transactions/bar-chart?month=${selectedMonth}`);
      const data = await response.json();

      const labels = Object.keys(data); // Price ranges (e.g., '0-100', '101-200', etc.)
      const values = Object.values(data); // Number of items in each price range

      setChartData({
        labels: labels,
        datasets: [
          {
            label: `Items sold in each price range (${selectedMonth})`,
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      });
    } catch (error) {
      console.error("Error fetching bar chart data: ", error);
    }
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: `Price Range vs Items Sold (${month})`,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="barchart-container">
      <h3>Bar Chart Stats - {month}</h3>
      <div className="canvas-container">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
