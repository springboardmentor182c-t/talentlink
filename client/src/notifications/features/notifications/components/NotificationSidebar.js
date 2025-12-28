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
import { getNotificationsMock } from "../services/notificationService"; 
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
          const data = await getNotificationsMock();
          // Show only first 6 items in the sidebar
          setItems(data.slice(0, 6)); 
        } catch (error) {
          console.error("Failed to load notifications", error);
        } finally {
          setLoading(false);
        }
      }
      load();
    }
  }, [isOpen]);

  const handleToggleRead = (id) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, read: !p.read } : p))
    );
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