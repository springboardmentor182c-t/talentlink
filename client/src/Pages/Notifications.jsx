import { notificationApi } from "../services/notificationApi";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await notificationApi.fetchNotifications();
        setNotifications(data);
      } catch (err) {
        setError("Failed to load notifications");
      } finally {
        setLoading(false);
      }
    };
    loadNotifications();
  }, []);

  const markAsRead = async (id) => {
    await notificationApi.markAsRead(id);
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n))
    );
  };

  const markAllAsRead = async () => {
    const unread = notifications.filter((n) => !n.is_read);
    await Promise.all(unread.map((n) => notificationApi.markAsRead(n.id)));
    setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-100 dark:bg-gray-900 px-4 py-6">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
          <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
            Talent Link
          </h1>
          <button
            onClick={() => navigate("/client")}
            className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
          >
            ← Back
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Notifications
            </h2>

            {notifications.some((n) => !n.is_read) && (
              <button
                onClick={markAllAsRead}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Mark all as read
              </button>
            )}
          </div>

          {/* States */}
          {loading && (
            <div className="text-gray-500 dark:text-gray-400">
              Loading notifications...
            </div>
          )}

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          {!loading && notifications.length === 0 && (
            <div className="text-gray-500 dark:text-gray-400">
              No notifications yet
            </div>
          )}

          {/* Notifications List */}
          <div className="space-y-3">
            {notifications.map((item) => (
              <div
                key={item.id}
                className={`flex justify-between items-start gap-4 rounded-xl px-4 py-3 transition
                  ${
                    item.is_read
                      ? "bg-gray-50 dark:bg-gray-700"
                      : "bg-blue-50 dark:bg-blue-900/30"
                  }
                `}
              >
                <div className="flex gap-3">
                  {!item.is_read && (
                    <span className="mt-1 h-2 w-2 rounded-full bg-blue-600 flex-shrink-0" />
                  )}

                  <div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {item.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {new Date(item.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>

                {!item.is_read && (
                  <button
                    onClick={() => markAsRead(item.id)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notifications;
