import React from 'react';

const PieChartPlaceholder = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  let currentAngle = 0;
  
  const segments = data.map(item => {
    const percentage = (item.count / total) * 100;
    const angle = (item.count / total) * 360;
    const segment = {
      ...item,
      percentage,
      startAngle: currentAngle,
      endAngle: currentAngle + angle
    };
    currentAngle += angle;
    return segment;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold mb-6 text-gray-900">Candidates By Status</h3>
      <div className="flex items-center justify-center">
        <svg viewBox="0 0 200 200" className="w-48 h-48">
          {segments.map((segment, index) => {
            const startAngle = (segment.startAngle - 90) * (Math.PI / 180);
            const endAngle = (segment.endAngle - 90) * (Math.PI / 180);
            const largeArcFlag = segment.endAngle - segment.startAngle > 180 ? 1 : 0;
            
            const x1 = 100 + 80 * Math.cos(startAngle);
            const y1 = 100 + 80 * Math.sin(startAngle);
            const x2 = 100 + 80 * Math.cos(endAngle);
            const y2 = 100 + 80 * Math.sin(endAngle);
            
            return (
              <path
                key={index}
                d={`M 100 100 L ${x1} ${y1} A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                fill={segment.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              />
            );
          })}
        </svg>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-gray-600">{item.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PieChartPlaceholder;