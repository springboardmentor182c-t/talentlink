import React from 'react';

const BarChartPlaceholder = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
        <h3 className="text-base sm:text-lg font-semibold mb-6">Candidates By Position</h3>
        <div className="text-center text-gray-500 py-12">
          <p>No data available</p>
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(item => item.count));
  
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6">Candidates By Position</h3>
      <div className="flex items-end justify-around gap-2 sm:gap-3 md:gap-4" style={{ height: '250px' }}>
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1 w-full">
            {/* Bar Container */}
            <div className="w-full flex items-end justify-center flex-1 mb-2">
              <div 
                className="w-full max-w-[60px] rounded-t-lg transition-all duration-300 hover:opacity-75 cursor-pointer shadow-sm hover:shadow-md"
                style={{ 
                  height: `${(item.count / maxValue) * 100}%`,
                  backgroundColor: ['#7C3AED', '#4F46E5', '#2563EB', '#0EA5E9'][index % 4],
                  minHeight: '20px'
                }}
                title={`${item.position}: ${item.count}`}
              />
            </div>
            
            {/* Labels */}
            <div className="text-center w-full px-1">
              <div className="text-xs sm:text-sm font-medium text-gray-900">{item.count}</div>
              <div className="text-xs text-gray-600 truncate">{item.position}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChartPlaceholder;