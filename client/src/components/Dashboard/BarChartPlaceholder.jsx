import React from 'react';

const BarChartPlaceholder = ({ data }) => {
  const maxValue = Math.max(...data.map(item => item.count));
  
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200 h-full">
      <h3 className="text-lg font-semibold mb-6 text-gray-900">Candidate By Position</h3>
      <div className="flex items-end justify-around h-64 gap-4">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <div className="w-full flex items-end justify-center" style={{ height: '200px' }}>
              <div 
                className="w-full max-w-[60px] rounded-t-lg transition-all duration-500 hover:opacity-80 cursor-pointer"
                style={{ 
                  height: `${(item.count / maxValue) * 100}%`,
                  backgroundColor: ['#7C3AED', '#4F46E5', '#2563EB', '#0EA5E9'][index]
                }}
              />
            </div>
            <div className="mt-2 text-center">
              <div className="text-sm font-medium text-gray-700">{item.count}</div>
              <div className="text-xs text-gray-500">{item.position}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarChartPlaceholder;