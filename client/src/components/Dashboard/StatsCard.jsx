import React from 'react';

const StatsCard = ({ title, value }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 hover:shadow-md transition-shadow">
      <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
      <p className="text-4xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default StatsCard;