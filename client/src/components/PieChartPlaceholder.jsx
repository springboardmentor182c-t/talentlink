import React, { useMemo } from "react";

export default function PieChartPlaceholder({ data = {} }) {
  const chartData = useMemo(() => {
    const vals = Object.values(data);
    const total = vals.reduce((s, a) => s + a, 0) || 1;

    const p1 = total > 0 ? Math.round((vals[0] / total) * 100) : 0;
    const p2 = total > 0 ? Math.round((vals[1] / total) * 100) : 0;
    const p3 = total > 0 ? Math.round((vals[2] / total) * 100) : 0;
    const p4 = 100 - p1 - p2 - p3;

    return {
      percentages: [p1, p2, p3, p4],
      values: vals,
      total,
      labels: Object.keys(data)
    };
  }, [data]);

  const colors = ["#7C3AED", "#4F46E5", "#2563EB", "#0EA5E9"];

  const [p1, p2, p3, p4] = chartData.percentages;
  const gradient = `conic-gradient(
    ${colors[0]} 0 ${p1}%, 
    ${colors[1]} ${p1}% ${p1 + p2}%, 
    ${colors[2]} ${p1 + p2}% ${p1 + p2 + p3}%, 
    ${colors[3]} ${p1 + p2 + p3}% 100%
  )`;

  if (chartData.labels.length === 0) {
    return (
      <div className="w-full">
        <div className="text-base sm:text-lg font-semibold mb-4">Candidates By Status</div>
        <div className="text-center text-gray-500 py-8">
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="font-semibold text-base sm:text-lg mb-4 text-gray-900">
        Candidates By Status
      </div>
      
      {/* Pie Chart */}
      <div className="flex justify-center mb-6">
        <div
          style={{
            width: "clamp(120px, 80vw, 180px)",
            height: "clamp(120px, 80vw, 180px)",
            background: gradient,
            borderRadius: "50%",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
          }}
        />
      </div>

      {/* Legend */}
      <div className="space-y-2 sm:space-y-3">
        {chartData.labels.map((label, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between gap-2 text-xs sm:text-sm"
          >
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <div
                className="w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: colors[idx] }}
              />
              <span className="truncate text-gray-700">{label}</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <span className="font-semibold text-gray-900 text-right min-w-[30px] sm:min-w-[35px]">
                {chartData.percentages[idx]}%
              </span>
              <span className="text-gray-500 text-right min-w-[35px] sm:min-w-[40px]">
                ({chartData.values[idx]})
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}