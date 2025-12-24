import React from 'react';
import { MessageSquare } from 'lucide-react';

const RecentMessages = ({ messages }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-indigo-600" />
          Recent Messages
        </h3>
      </div>
      
      {messages && messages.length > 0 ? (
        <div className="space-y-2 sm:space-y-3">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className="flex items-start gap-3 p-3 sm:p-4 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold flex-shrink-0 text-xs sm:text-sm group-hover:shadow-md transition-shadow">
                {msg.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-2">
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
                    {msg.name}
                  </h4>
                  <span className="text-xs text-gray-500 flex-shrink-0">
                    {msg.time}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mt-1">
                  {msg.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 sm:py-12 text-gray-500">
          <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p className="text-sm sm:text-base">No recent messages</p>
        </div>
      )}
    </div>
  );
};

export default RecentMessages;