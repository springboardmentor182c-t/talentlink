import React from 'react';

const MonthlyEarningsChart = ({ data, loading }) => {
  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-64 bg-gray-200 rounded"></div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return <p className="text-gray-600">No monthly earnings data available.</p>;
  }

  // In a real application, you would integrate a charting library here (e.g., Recharts, Chart.js)
  // For now, we'll just display a placeholder message with the data.
  return (
    <div>
      <p className="text-gray-600">Monthly Earnings Chart (placeholder for real data):</p>
      <ul className="list-disc list-inside text-gray-600">
        {data.map((item, index) => (
          <li key={index}>{item.month}: ₹{item.earnings}</li>
        ))}
      </ul>
    </div>
  );
};

export default MonthlyEarningsChart;