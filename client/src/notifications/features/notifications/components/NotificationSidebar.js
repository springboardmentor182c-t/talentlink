// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import NotificationItem from "./NotificationItem";
// import { getNotificationsMock } from "../services/notificationService"; 
// import "./NotificationSidebar.css";
// import "./NotificationItem.css"; // We need this for the item styles

// export default function NotificationSidebar({ isOpen, onClose }) {
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Load data when sidebar opens
//   useEffect(() => {
//     if (isOpen) {
//       async function load() {
//         try {
//           const data = await getNotificationsMock();
//           // Show only first 6 items in the sidebar
//           setItems(data.slice(0, 6)); 
//         } catch (error) {
//           console.error("Failed to load notifications", error);
//         } finally {
//           setLoading(false);
//         }
//       }
//       load();
//     }
//   }, [isOpen]);

//   const handleToggleRead = (id) => {
//     setItems((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, read: !p.read } : p))
//     );
//   };

//   const handleViewAll = () => {
//     onClose(); 
//     navigate("/notifications");
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Dark Overlay - Click to close */}
//       <div className="notif-sidebar-overlay" onClick={onClose} />

//       {/* The Sliding Sidebar */}
//       <div className="notif-sidebar open">
        
//         {/* Header */}
//         <div className="notif-sidebar-header">
//           <h3>Notifications</h3>
//           <button className="close-btn" onClick={onClose}>&times;</button>
//         </div>

//         {/* List Content */}
//         <div className="notif-sidebar-content">
//           {loading ? (
//             <p className="loading-text">Loading...</p>
//           ) : items.length > 0 ? (
//             items.map((item) => (
//               <NotificationItem
//                 key={item.id}
//                 item={item}
//                 onToggleRead={handleToggleRead}
//                 onAvatarClick={() => {
//                    onClose();
//                    navigate(`/messages/${item.id}`);
//                 }}
//               />
//             ))
//           ) : (
//             <p className="empty-text">No new notifications</p>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="notif-sidebar-footer">
//           <button className="view-all-btn" onClick={handleViewAll}>
//             View All Notifications
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationItem from "./NotificationItem";
import { getNotifications, markRead } from "../services/notificationService";
import "./NotificationSidebar.css";
import "./NotificationItem.css"; 

export default function NotificationSidebar({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load data when sidebar opens
  useEffect(() => {
    if (isOpen) {
      async function load() {
        try {
          const response = await getNotifications();
          const payload = response.data?.results || response.data || [];
          const mapped = payload.map(mapFromApi).slice(0, 6);
          setItems(mapped);
        } catch (error) {
          console.error("Failed to load notifications", error);
        } finally {
          setLoading(false);
        }
      }
      load();
    }
  }, [isOpen]);

  const handleToggleRead = async (id) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, read: true } : p)));
    try {
      await markRead(id);
    } catch (error) {
      console.error("Failed to mark read", error);
    }
  };

  const handleViewAll = () => {
    onClose(); 
    // UPDATED PATH: Points to the route inside ClientLayout
    navigate("/client/notifications");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Dark Overlay - Click to close */}
      <div className="notif-sidebar-overlay" onClick={onClose} />

      {/* The Sliding Sidebar */}
      <div className="notif-sidebar open">
        
        {/* Header */}
        <div className="notif-sidebar-header">
          <h3>Notifications</h3>
          <button className="close-btn" onClick={onClose}>&times;</button>
        </div>

        {/* List Content */}
        <div className="notif-sidebar-content">
          {loading ? (
            <p className="loading-text">Loading...</p>
          ) : items.length > 0 ? (
            items.map((item) => (
              <NotificationItem
                key={item.id}
                item={item}
                onToggleRead={handleToggleRead}
                onAvatarClick={() => {
                   onClose();
                   navigate(`/messages/${item.id}`);
                }}
              />
            ))
          ) : (
            <p className="empty-text">No new notifications</p>
          )}
        </div>

        {/* Footer */}
        <div className="notif-sidebar-footer">
          <button className="view-all-btn" onClick={handleViewAll}>
            View All Notifications
          </button>
        </div>
      </div>
    </>
  );
}

function mapFromApi(item) {
  const created = item.created_at ? new Date(item.created_at) : null;
  const safeTitle = item.title || "Notification";
  return {
    id: item.id,
    title: safeTitle,
    message: item.body || "",
    read: !!item.is_read,
    category: item.is_starred ? "favourites" : "all",
    time: created ? created.toLocaleTimeString() : "",
    relative: created ? formatRelative(created) : "",
    avatar: `https://ui-avatars.com/api/?background=3b82f6&color=fff&name=${encodeURIComponent(item.actor_name || safeTitle)}`,
    raw: item,
  };
}

function formatRelative(dateObj) {
  const diffMs = Date.now() - dateObj.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  if (diffMinutes < 1) return "Just now";
  if (diffMinutes < 60) return `${diffMinutes}m ago`;
  const diffHours = Math.floor(diffMinutes / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}