import React from "react";
import { Pie } from "react-chartjs-2";

// Chart.js konfiguratsiyasi
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

function Chart({ transactions }) {
  // Xarajatlarni kategoriyalar bo‘yicha guruhlash
  const expenseData = transactions
    .filter((t) => t.type === "expense") // Faqat xarajatlarni tanlash
    .reduce((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
      return acc;
    }, {});

  // Diagramma uchun ma’lumotlar
  const data = {
    labels: Object.keys(expenseData), // Kategoriyalar nomlari
    datasets: [
      {
        label: "Xarajatlar",
        data: Object.values(expenseData), // Kategoriyalar summasi
        backgroundColor: [
          "#FF6384", // Ranglar (har bir kategoriya uchun)
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
        ],
      },
    ],
  };

  return (
    <div style={{ maxWidth: "400px", margin: "48px auto" }}>
      <h3 className="text-center">Xarajat Kategoriyalari</h3>
      <Pie data={data} />
    </div>
  );
}

export default Chart;
