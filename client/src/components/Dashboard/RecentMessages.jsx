import React from 'react';

const RecentMessages = ({ messages }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h3 className="text-lg font-semibold mb-4 text-gray-900">Recent Messages</h3>
      <div className="space-y-4">
        {messages.map((msg, index) => (
          <div key={index} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
              {msg.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-2">
                <h4 className="font-semibold text-gray-900 text-sm">{msg.name}</h4>
                <span className="text-xs text-gray-500 flex-shrink-0">{msg.time}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{msg.message}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentMessages;