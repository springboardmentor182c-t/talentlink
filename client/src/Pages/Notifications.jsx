import React from "react";
import { useNavigate } from "react-router-dom";

function Notifications() {
  const navigate = useNavigate();

  const newNotifications = [
    {
      id: 1,
      title: "Contract Awaiting Signature",
      description: "A Talent Link contract is ready for your signature.",
      linkText: "View Contract",
      time: "Yesterday"
    },
    {
      id: 2,
      title: "Approval Needed",
      description: "Please review and approve the updated project brief for \"Project Alpha.\"",
      linkText: "Review Now",
      time: "Yesterday"
    },
  ];

  const earlierNotifications = [
    {
      id: 3,
      title: "System Update Complete",
      description: "You have a new message and updated search filters.",
      linkText: "Read Message",
      time: "1 day ago"
    },
    {
      id: 4,
      title: "Interview Scheduled",
      description: "Your interview with Jane Smith is confirmed for Friday.",
      linkText: "Add to Calendar",
      time: "4 days ago"
    },
  ];

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-100 px-4 py-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-xl font-semibold text-gray-900">Talent Link</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-sm text-blue-600 hover:underline"
          >
            ← Back
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
            <button className="text-sm text-blue-600 hover:underline">
              Mark All As Read
            </button>
          </div>

          {/* New section */}
          <p className="text-xs font-semibold text-gray-500 mb-2">New ({newNotifications.length})</p>
          <div className="space-y-3 mb-6">
            {newNotifications.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between bg-blue-50 rounded-lg px-4 py-3"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-2 w-3 h-3 rounded-full bg-blue-500"></span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-600">
                      {item.description}
                    </p>
                    <button className="mt-1 text-xs text-blue-600 font-medium hover:underline">
                      {item.linkText}
                    </button>
                  </div>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap mt-1">
                  {item.time} ago
                </span>
              </div>
            ))}
          </div>

          {/* Earlier section */}
          <p className="text-xs font-semibold text-gray-500 mb-2">Earlier This Week</p>
          <div className="space-y-3 mb-4">
            {earlierNotifications.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between bg-gray-50 rounded-lg px-4 py-3"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-2 w-3 h-3 rounded-full bg-gray-300"></span>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">
                      {item.title}
                    </p>
                    <p className="text-xs text-gray-600">
                      {item.description}
                    </p>
                    <button className="mt-1 text-xs text-blue-600 font-medium hover:underline">
                      {item.linkText}
                    </button>
                  </div>
                </div>
                <span className="text-xs text-gray-400 whitespace-nowrap mt-1">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
