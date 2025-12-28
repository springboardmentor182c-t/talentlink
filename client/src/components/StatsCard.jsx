import React from 'react';

const StatsCard = ({ title, value, icon: Icon, color = "indigo" }) => {
  const colorClasses = {
    indigo: 'bg-indigo-50 text-indigo-600',
    green: 'bg-green-50 text-green-600',
    yellow: 'bg-yellow-50 text-yellow-600',
    blue: 'bg-blue-50 text-blue-600'
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 md:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-3 sm:gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="text-xs sm:text-sm font-medium text-gray-600 mb-1 sm:mb-2 truncate">
            {title}
          </h3>
          <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 break-words">
            {value}
          </p>
        </div>
        {Icon && (
          <div className={`p-2 sm:p-3 rounded-lg ${colorClasses[color]} flex-shrink-0`}>
            <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;