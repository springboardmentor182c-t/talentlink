import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function ChartArea({ labels, dataPoints }) {
  const data = {
    labels: labels || ["Jan","Feb","Mar","Apr","May","Jun","Jul"],
    datasets: [
      { label: "New Clients", data: dataPoints || [4,8,10,12,9,15,20], borderColor: "#1f6feb", tension: 0.3, fill:false }
    ]
  };
  const options = { responsive: true, plugins:{ legend:{ display:false } } };
  return (
    <div className="chart-box">
      <Line data={data} options={options} />
    </div>
  );
}

