// import React, { useEffect, useMemo, useState } from "react";
// import NotificationItem from "../components/NotificationItem";
// import { useNavigate } from "react-router-dom";
// import "../components/NotificationItem.css";

// export default function NotificationsPage() {
//   const navigate = useNavigate();

//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Tabs: all, unread, favourites
//   const [tab, setTab] = useState("all");

//   useEffect(() => {
//     async function load() {
//       setItems(data);
//       setLoading(false);
//     }
//     load();
//   }, []);

//   const unreadCount = items.filter((i) => !i.read).length;

//   const visible = useMemo(() => {
//     return items.filter((i) => {
//       if (tab === "all") return true;
//       if (tab === "unread") return !i.read;
//       if (tab === "favourites") return i.category === "favourites";
//       return true;
//     });
//   }, [items, tab]);

//   function toggleRead(id) {
//     setItems((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, read: !p.read } : p))
//     );
//   }

//   function markAllRead() {
//     setItems((prev) => prev.map((p) => ({ ...p, read: true })));
//   }

//   if (loading) return <h3 style={{ padding: 28 }}>Loading…</h3>;

//   return (
//     <div style={{ padding: 24, fontFamily: "system-ui" }}>
//       {/* HEADER */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//           marginBottom: 16,
//         }}
//       >
//         {/* Title + unread badge */}
//         <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//           <h1 style={{ margin: 0, fontSize: 28 }}>Notifications</h1>

//           {unreadCount > 0 && (
//             <div
//               style={{
//                 background: "#2f8fff",
//                 color: "white",
//                 padding: "4px 10px",
//                 borderRadius: "20px",
//                 fontWeight: 600,
//                 fontSize: 14,
//               }}
//             >
//               {unreadCount}
//             </div>
//           )}
//         </div>

//         {/* Buttons */}
//         <div style={{ display: "flex", gap: 12 }}>
//           <button
//             onClick={() => navigate("/dashboard")}
//             style={{
//               background: "#1f7ed0",
//               color: "white",
//               border: "1px solid #1f7ed0",
//               padding: "8px 14px",
//               borderRadius: "6px",
//               cursor: "pointer",
//               fontWeight: 500,
//             }}
//           >
//             ⬅ Back to Dashboard
//           </button>

//           <button
//             onClick={() => navigate("/messages")}
//             style={{
//               background: "#1f7ed0",
//               color: "white",
//               border: "1px solid #1f7ed0",
//               padding: "8px 14px",
//               borderRadius: "6px",
//               cursor: "pointer",
//             }}
//           >
//             💬 Messages
//           </button>
//         </div>
//       </div>

//       {/* TABS: All — Show unread — Favourites */}
//       <div
//         style={{
//           display: "flex",
//           alignItems: "center",
//           gap: 28,
//           borderBottom: "1px solid #e6e6e6",
//           paddingBottom: 12,
//           marginBottom: 16,
//         }}
//       >
//         <button
//           onClick={() => setTab("all")}
//           style={{
//             background: "transparent",
//             border: "none",
//             cursor: "pointer",
//             fontSize: 15,
//             fontWeight: tab === "all" ? 700 : 500,
//           }}
//         >
//           All
//         </button>

//         <button
//           onClick={() => setTab("unread")}
//           style={{
//             background: "transparent",
//             border: "none",
//             cursor: "pointer",
//             fontSize: 15,
//             fontWeight: tab === "unread" ? 700 : 500,
//           }}
//         >
//           Show unread
//         </button>

//         <button
//           onClick={() => setTab("favourites")}
//           style={{
//             background: "transparent",
//             border: "none",
//             cursor: "pointer",
//             fontSize: 15,
//             fontWeight: tab === "favourites" ? 700 : 500,
//           }}
//         >
//           Favourites
//         </button>

//         {/* Mark all as read */}
//         <button
//           onClick={markAllRead}
//           style={{
//             marginLeft: "auto",
//             color: "#1f7ed0",
//             border: "none",
//             background: "transparent",
//             cursor: "pointer",
//             fontWeight: 600,
//           }}
//         >
//           Mark all as read
//         </button>
//       </div>

//       {/* Notification list */}
//       {visible.map((n) => (
//         <NotificationItem
//           key={n.id}
//           item={n}
//           onToggleRead={toggleRead}
//           onAvatarClick={() => navigate(`/messages/${n.id}`)}
//         />
//       ))}
//     </div>
//   );
// }



// import React, { useEffect, useMemo, useState } from "react";
// import NotificationItem from "../components/NotificationItem";
// import { useNavigate } from "react-router-dom";
// import "../components/NotificationItem.css";

// export default function NotificationsPage() {
//   const navigate = useNavigate();

//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Tabs: all, unread, favourites
//   const [tab, setTab] = useState("all");

//   useEffect(() => {
//     async function load() {
//       // Simulate fetch
//       setItems(data);
//       setLoading(false);
//     }
//     load();
//   }, []);

//   const unreadCount = items.filter((i) => !i.read).length;

//   const visible = useMemo(() => {
//     return items.filter((i) => {
//       if (tab === "all") return true;
//       if (tab === "unread") return !i.read;
//       if (tab === "favourites") return i.category === "favourites";
//       return true;
//     });
//   }, [items, tab]);

//   function toggleRead(id) {
//     setItems((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, read: !p.read } : p))
//     );
//   }

//   function markAllRead() {
//     setItems((prev) => prev.map((p) => ({ ...p, read: true })));
//   }

//   if (loading) return <div style={styles.loading}>Loading...</div>;

//   return (
//     <div style={styles.pageContainer}>
//       <div style={styles.contentWrapper}>
        
//         {/* HEADER SECTION */}
//         <div style={styles.headerRow}>
//           {/* Title + Badge */}
//           <div style={styles.titleGroup}>
//             <h1 style={styles.pageTitle}>Notifications</h1>
//             {unreadCount > 0 && (
//               <span style={styles.badge}>{unreadCount}</span>
//             )}
//           </div>

//           {/* Action Buttons */}
//           <div style={styles.buttonGroup}>
//             <button 
//               onClick={() => navigate("/dashboard")} 
//               style={styles.primaryBtn}
//             >
//                Back to Dashboard
//             </button>
//             <button 
//               onClick={() => navigate("/messages")} 
//               style={styles.secondaryBtn}
//             >
//                Messages
//             </button>
//           </div>
//         </div>

//         {/* TABS SECTION */}
//         <div style={styles.tabsRow}>
//           <div style={styles.tabsLeft}>
//             <button
//               onClick={() => setTab("all")}
//               style={{ ...styles.tabBtn, ...(tab === "all" ? styles.activeTab : {}) }}
//             >
//               All
//             </button>

//             <button
//               onClick={() => setTab("unread")}
//               style={{ ...styles.tabBtn, ...(tab === "unread" ? styles.activeTab : {}) }}
//             >
//               Unread
//             </button>

//             <button
//               onClick={() => setTab("favourites")}
//               style={{ ...styles.tabBtn, ...(tab === "favourites" ? styles.activeTab : {}) }}
//             >
//               Favourites
//             </button>
//           </div>

//           <button onClick={markAllRead} style={styles.linkBtn}>
//             Mark all as read
//           </button>
//         </div>

//         {/* NOTIFICATION LIST */}
//         <div style={styles.listContainer}>
//           {visible.length > 0 ? (
//             visible.map((n) => (
//               <NotificationItem
//                 key={n.id}
//                 item={n}
//                 onToggleRead={toggleRead}
//                 onAvatarClick={() => navigate(`/messages/${n.id}`)}
//               />
//             ))
//           ) : (
//             <div style={styles.emptyState}>
//               No notifications found.
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }

// // --- PROFESSIONAL STYLES ---
// const styles = {
//   // 1. Full Page Background
//   pageContainer: {
//     minHeight: "100vh",
//     backgroundColor: "#f8fafc", // Light gray background makes cards pop
//     fontFamily: "'Inter', sans-serif",
//     padding: "40px 20px",
//   },
  
//   // 2. The "Container" that fixes the width issue
//   contentWrapper: {
//     maxWidth: "850px", // Limits width so it looks like a feed
//     margin: "0 auto",  // Centers it horizontally
//   },

//   loading: {
//     padding: "40px",
//     textAlign: "center",
//     color: "#64748b",
//     fontSize: "18px",
//   },

//   // Header Styles
//   headerRow: {
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     marginBottom: "24px",
//     flexWrap: "wrap",
//     gap: "16px",
//   },
//   titleGroup: {
//     display: "flex",
//     alignItems: "center",
//     gap: "12px",
//   },
//   pageTitle: {
//     margin: 0,
//     fontSize: "28px",
//     fontWeight: "700",
//     color: "#1e293b",
//   },
//   badge: {
//     background: "#ef4444",
//     color: "white",
//     padding: "2px 10px",
//     borderRadius: "12px",
//     fontWeight: "600",
//     fontSize: "13px",
//   },

//   // Buttons
//   buttonGroup: {
//     display: "flex",
//     gap: "12px",
//   },
//   primaryBtn: {
//     background: "#3b82f6",
//     color: "white",
//     border: "none",
//     padding: "10px 16px",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "14px",
//     transition: "0.2s",
//   },
//   secondaryBtn: {
//     background: "white",
//     color: "#3b82f6",
//     border: "1px solid #3b82f6",
//     padding: "10px 16px",
//     borderRadius: "8px",
//     cursor: "pointer",
//     fontWeight: "600",
//     fontSize: "14px",
//     transition: "0.2s",
//   },

//   // Tabs
//   tabsRow: {
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     borderBottom: "1px solid #e2e8f0",
//     paddingBottom: "0px",
//     marginBottom: "20px",
//   },
//   tabsLeft: {
//     display: "flex",
//     gap: "24px",
//   },
//   tabBtn: {
//     background: "transparent",
//     border: "none",
//     cursor: "pointer",
//     fontSize: "15px",
//     fontWeight: "500",
//     color: "#64748b",
//     padding: "10px 0",
//     borderBottom: "2px solid transparent",
//     transition: "all 0.2s",
//   },
//   activeTab: {
//     color: "#3b82f6",
//     fontWeight: "700",
//     borderBottom: "2px solid #3b82f6",
//   },
//   linkBtn: {
//     background: "transparent",
//     border: "none",
//     color: "#3b82f6",
//     cursor: "pointer",
//     fontSize: "14px",
//     fontWeight: "600",
//   },

//   // List
//   listContainer: {
//     display: "flex",
//     flexDirection: "column",
//     gap: "0px", // Gap handled by NotificationItem margins
//   },
//   emptyState: {
//     textAlign: "center",
//     padding: "40px",
//     color: "#94a3b8",
//     fontSize: "16px",
//   }
// };


//first code is working 

// import React, { useEffect, useMemo, useState } from "react";
// import NotificationItem from "../components/NotificationItem";
// import { useNavigate } from "react-router-dom";
// import "../components/NotificationItem.css";

// export default function NotificationsPage() {
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [tab, setTab] = useState("all");

//   useEffect(() => {
//     async function load() {
//       setItems(data);
//       setLoading(false);
//     }
//     load();
//   }, []);

//   // Filter Logic
//   const visible = useMemo(() => {
//     return items.filter((i) => {
//       if (tab === "all") return true;
//       if (tab === "unread") return !i.read;
//       if (tab === "favourites") return i.category === "favourites";
//       return true;
//     });
//   }, [items, tab]);

//   // Actions
//   function toggleRead(id) {
//     setItems((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, read: !p.read } : p))
//     );
//   }

//   function markAllRead() {
//     setItems((prev) => prev.map((p) => ({ ...p, read: true })));
//   }

//   // --- NEW: Delete Handler ---
//   function deleteNotification(id) {
//     if(window.confirm("Are you sure you want to delete this notification?")) {
//         setItems((prev) => prev.filter((p) => p.id !== id));
//     }
//   }

//   if (loading) return <div style={styles.loading}>Loading...</div>;

//   return (
//     <div style={styles.innerContainer}>
//       <div style={styles.contentWrapper}>
        
//         {/* HEADER SECTION */}
//         <div style={styles.headerRow}>
//           <div style={styles.titleGroup}>
//             {/* UPDATED: Removed the red badge here */}
//             <h1 style={styles.pageTitle}>Notifications</h1>
//           </div>

//           <div style={styles.buttonGroup}>
//             <button 
//               onClick={() => navigate("/messages")} 
//               style={styles.secondaryBtn}
//             >
//                Messages
//             </button>
//           </div>
//         </div>

//         {/* TABS SECTION */}
//         <div style={styles.tabsRow}>
//           <div style={styles.tabsLeft}>
//             <button
//               onClick={() => setTab("all")}
//               style={{ ...styles.tabBtn, ...(tab === "all" ? styles.activeTab : {}) }}
//             >
//               All
//             </button>
//             <button
//               onClick={() => setTab("unread")}
//               style={{ ...styles.tabBtn, ...(tab === "unread" ? styles.activeTab : {}) }}
//             >
//               Unread
//             </button>
//             <button
//               onClick={() => setTab("favourites")}
//               style={{ ...styles.tabBtn, ...(tab === "favourites" ? styles.activeTab : {}) }}
//             >
//               Favourites
//             </button>
//           </div>

//           <button onClick={markAllRead} style={styles.linkBtn}>
//             Mark all as read
//           </button>
//         </div>

//         {/* NOTIFICATION LIST */}
//         <div style={styles.listContainer}>
//           {visible.length > 0 ? (
//             visible.map((n) => (
//               <NotificationItem
//                 key={n.id}
//                 item={n}
//                 onToggleRead={toggleRead}
//                 // Pass the delete handler
//                 onDelete={deleteNotification}
//                 onAvatarClick={() => navigate(`/messages/${n.id}`)}
//               />
//             ))
//           ) : (
//             <div style={styles.emptyState}>
//               No notifications found.
//             </div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }

// // Styles (Same as before)
// const styles = {
//   innerContainer: { width: "100%", fontFamily: "'Inter', sans-serif" },
//   contentWrapper: { maxWidth: "850px", margin: "0 auto", paddingBottom: "40px" },
//   loading: { padding: "40px", textAlign: "center", color: "#64748b", fontSize: "18px" },
//   headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px", paddingTop: "10px" },
//   titleGroup: { display: "flex", alignItems: "center", gap: "12px" },
//   pageTitle: { margin: 0, fontSize: "28px", fontWeight: "700", color: "#1e293b" },
//   // Badge style removed as it's no longer used in header
//   buttonGroup: { display: "flex", gap: "12px" },
//   secondaryBtn: { background: "white", color: "#3b82f6", border: "1px solid #3b82f6", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px", transition: "0.2s" },
//   tabsRow: { display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e2e8f0", paddingBottom: "0px", marginBottom: "20px" },
//   tabsLeft: { display: "flex", gap: "24px" },
//   tabBtn: { background: "transparent", border: "none", cursor: "pointer", fontSize: "15px", fontWeight: "500", color: "#64748b", padding: "10px 0", borderBottom: "2px solid transparent", transition: "all 0.2s" },
//   activeTab: { color: "#3b82f6", fontWeight: "700", borderBottom: "2px solid #3b82f6" },
//   linkBtn: { background: "transparent", border: "none", color: "#3b82f6", cursor: "pointer", fontSize: "14px", fontWeight: "600" },
//   listContainer: { display: "flex", flexDirection: "column", gap: "0px" },
//   emptyState: { textAlign: "center", padding: "40px", color: "#94a3b8", fontSize: "16px" }
// };



// import React, { useEffect, useMemo, useState } from "react";
// import NotificationItem from "../components/NotificationItem";
// import { useNavigate } from "react-router-dom";
// import "../components/NotificationItem.css";

// export default function NotificationsPage() {
//   const navigate = useNavigate();
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [tab, setTab] = useState("all");

//   useEffect(() => {
//     async function load() {
//       setItems(data);
//       setLoading(false);
//     }
//     load();
//   }, []);

//   const visible = useMemo(() => {
//     return items.filter((i) => {
//       if (tab === "all") return true;
//       if (tab === "unread") return !i.read;
//       if (tab === "favourites") return i.category === "favourites";
//       return true;
//     });
//   }, [items, tab]);

//   function toggleRead(id) {
//     setItems((prev) =>
//       prev.map((p) => (p.id === id ? { ...p, read: !p.read } : p))
//     );
//   }

//   // --- NEW: Toggle Favourite ---
//   function toggleFavourite(id) {
//     setItems((prev) =>
//       prev.map((p) => {
//         if (p.id === id) {
//           // If currently favourite, remove it (set to 'all'). If not, set to 'favourites'
//           const newCategory = p.category === 'favourites' ? 'all' : 'favourites';
//           return { ...p, category: newCategory };
//         }
//         return p;
//       })
//     );
//   }

//   function deleteNotification(id) {
//     if(window.confirm("Delete this notification?")) {
//         setItems((prev) => prev.filter((p) => p.id !== id));
//     }
//   }

//   function markAllRead() {
//     setItems((prev) => prev.map((p) => ({ ...p, read: true })));
//   }

//   if (loading) return <div style={styles.loading}>Loading...</div>;

//   return (
//     <div style={styles.innerContainer}>
//       <div style={styles.contentWrapper}>
        
//         {/* HEADER */}
//         <div style={styles.headerRow}>
//           <div style={styles.titleGroup}>
//             <h1 style={styles.pageTitle}>Notifications</h1>
//           </div>
//           <div style={styles.buttonGroup}>
//             <button onClick={() => navigate("/messages")} style={styles.secondaryBtn}>
//                Messages
//             </button>
//           </div>
//         </div>

//         {/* TABS */}
//         <div style={styles.tabsRow}>
//           <div style={styles.tabsLeft}>
//             <button onClick={() => setTab("all")} style={{ ...styles.tabBtn, ...(tab === "all" ? styles.activeTab : {}) }}>All</button>
//             <button onClick={() => setTab("unread")} style={{ ...styles.tabBtn, ...(tab === "unread" ? styles.activeTab : {}) }}>Unread</button>
//             <button onClick={() => setTab("favourites")} style={{ ...styles.tabBtn, ...(tab === "favourites" ? styles.activeTab : {}) }}>Favourites</button>
//           </div>
//           <button onClick={markAllRead} style={styles.linkBtn}>Mark all as read</button>
//         </div>

//         {/* LIST */}
//         <div style={styles.listContainer}>
//           {visible.length > 0 ? (
//             visible.map((n) => (
//               <NotificationItem
//                 key={n.id}
//                 item={n}
//                 onToggleRead={toggleRead}
//                 onDelete={deleteNotification}
//                 onToggleFavourite={toggleFavourite} // <--- Pass the new handler
//                 onAvatarClick={() => navigate(`/messages/${n.id}`)}
//               />
//             ))
//           ) : (
//             <div style={styles.emptyState}>No notifications found.</div>
//           )}
//         </div>

//       </div>
//     </div>
//   );
// }

// // ... Styles remain the same as previous response ...
// const styles = {
//   innerContainer: { width: "100%", fontFamily: "'Inter', sans-serif" },
//   contentWrapper: { maxWidth: "850px", margin: "0 auto", paddingBottom: "40px" },
//   loading: { padding: "40px", textAlign: "center", color: "#64748b", fontSize: "18px" },
//   headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px", paddingTop: "10px" },
//   titleGroup: { display: "flex", alignItems: "center", gap: "12px" },
//   pageTitle: { margin: 0, fontSize: "28px", fontWeight: "700", color: "#1e293b" },
//   buttonGroup: { display: "flex", gap: "12px" },
//   secondaryBtn: { background: "white", color: "#3b82f6", border: "1px solid #3b82f6", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px", transition: "0.2s" },
//   tabsRow: { display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e2e8f0", paddingBottom: "0px", marginBottom: "20px" },
//   tabsLeft: { display: "flex", gap: "24px" },
//   tabBtn: { background: "transparent", border: "none", cursor: "pointer", fontSize: "15px", fontWeight: "500", color: "#64748b", padding: "10px 0", borderBottom: "2px solid transparent", transition: "all 0.2s" },
//   activeTab: { color: "#3b82f6", fontWeight: "700", borderBottom: "2px solid #3b82f6" },
//   linkBtn: { background: "transparent", border: "none", color: "#3b82f6", cursor: "pointer", fontSize: "14px", fontWeight: "600" },
//   listContainer: { display: "flex", flexDirection: "column", gap: "0px" },
//   emptyState: { textAlign: "center", padding: "40px", color: "#94a3b8", fontSize: "16px" }
// };



import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import NotificationItem from "../components/NotificationItem";
import { deleteNotification, getNotifications, markAllRead, markRead, toggleStar } from "../services/notificationService";
import "../components/NotificationItem.css";

export default function NotificationsPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState("all");

  useEffect(() => {
    async function load() {
      try {
        const response = await getNotifications();
        const payload = response.data?.results || response.data || [];
        setItems(payload.map(mapFromApi));
      } catch (error) {
        console.error("Notifications fetch failed", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const visible = useMemo(() => {
    return items.filter((i) => {
      if (tab === "all") return true;
      if (tab === "unread") return !i.read;
      if (tab === "favourites") return i.category === "favourites";
      return true;
    });
  }, [items, tab]);

  async function toggleRead(id) {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, read: true } : p)));
    try {
      await markRead(id);
    } catch (error) {
      console.error("Failed to mark read", error);
    }
  }

  // Toggle Favourite
  async function toggleFavourite(id) {
    let nextStar = false;
    setItems((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          nextStar = p.category !== "favourites";
          return { ...p, category: nextStar ? "favourites" : "all" };
        }
        return p;
      })
    );
    try {
      await toggleStar(id, nextStar);
    } catch (error) {
      console.error("Failed to toggle favourite", error);
      // Revert on failure
      setItems((prev) =>
        prev.map((p) => {
          if (p.id === id) {
            return { ...p, category: nextStar ? "all" : "favourites" };
          }
          return p;
        })
      );
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this notification?")) return;
    setItems((prev) => prev.filter((p) => p.id !== id));
    try {
      await deleteNotification(id);
    } catch (error) {
      console.error("Failed to delete notification", error);
    }
  }

  async function handleMarkAllRead() {
    setItems((prev) => prev.map((p) => ({ ...p, read: true })));
    try {
      await markAllRead();
    } catch (error) {
      console.error("Failed to mark all read", error);
    }
  }

  if (loading) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.innerContainer}>
      <div style={styles.contentWrapper}>
        
        {/* HEADER */}
        <div style={styles.headerRow}>
          <div style={styles.titleGroup}>
            <h1 style={styles.pageTitle}>Notifications</h1>
          </div>
          <div style={styles.buttonGroup}>
            {/* --- FIX 1: Point to correct Client Messages route --- */}
            <button 
              onClick={() => navigate("/client/messages")} 
              style={styles.secondaryBtn}
            >
               Messages
            </button>
          </div>
        </div>

        {/* TABS */}
        <div style={styles.tabsRow}>
          <div style={styles.tabsLeft}>
            <button onClick={() => setTab("all")} style={{ ...styles.tabBtn, ...(tab === "all" ? styles.activeTab : {}) }}>All</button>
            <button onClick={() => setTab("unread")} style={{ ...styles.tabBtn, ...(tab === "unread" ? styles.activeTab : {}) }}>Unread</button>
            <button onClick={() => setTab("favourites")} style={{ ...styles.tabBtn, ...(tab === "favourites" ? styles.activeTab : {}) }}>Favourites</button>
          </div>
          <button onClick={handleMarkAllRead} style={styles.linkBtn}>Mark all as read</button>
        </div>

        {/* LIST */}
        <div style={styles.listContainer}>
          {visible.length > 0 ? (
            visible.map((n) => (
              <NotificationItem
                key={n.id}
                item={n}
                onToggleRead={toggleRead}
                onDelete={handleDelete}
                onToggleFavourite={toggleFavourite}
                onAvatarClick={() => navigate(resolveTargetRoute(n))}
              />
            ))
          ) : (
            <div style={styles.emptyState}>No notifications found.</div>
          )}
        </div>

      </div>
    </div>
  );
}

// Styles
const styles = {
  innerContainer: { width: "100%", fontFamily: "'Inter', sans-serif" },
  contentWrapper: { maxWidth: "850px", margin: "0 auto", paddingBottom: "40px" },
  loading: { padding: "40px", textAlign: "center", color: "#64748b", fontSize: "18px" },
  headerRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "16px", paddingTop: "10px" },
  titleGroup: { display: "flex", alignItems: "center", gap: "12px" },
  pageTitle: { margin: 0, fontSize: "28px", fontWeight: "700", color: "#1e293b" },
  buttonGroup: { display: "flex", gap: "12px" },
  secondaryBtn: { background: "white", color: "#3b82f6", border: "1px solid #3b82f6", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontWeight: "600", fontSize: "14px", transition: "0.2s" },
  tabsRow: { display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid #e2e8f0", paddingBottom: "0px", marginBottom: "20px" },
  tabsLeft: { display: "flex", gap: "24px" },
  tabBtn: { background: "transparent", border: "none", cursor: "pointer", fontSize: "15px", fontWeight: "500", color: "#64748b", padding: "10px 0", borderBottom: "2px solid transparent", transition: "all 0.2s" },
  activeTab: { color: "#3b82f6", fontWeight: "700", borderBottom: "2px solid #3b82f6" },
  linkBtn: { background: "transparent", border: "none", color: "#3b82f6", cursor: "pointer", fontSize: "14px", fontWeight: "600" },
  listContainer: { display: "flex", flexDirection: "column", gap: "0px" },
  emptyState: { textAlign: "center", padding: "40px", color: "#94a3b8", fontSize: "16px" }
};

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

function resolveTargetRoute(item) {
  const targetType = item.raw?.target_type;
  const targetId = item.raw?.target_id;

  if (targetType === "project" && targetId) return `/projects/${targetId}`;
  if (targetType === "contract") return "/contracts";
  if (targetType === "conversation") return "/client/messages";
  if (targetType === "message") return "/client/messages";
  return "/client/messages";
}