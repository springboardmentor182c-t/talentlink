import React, { useEffect, useMemo, useState } from "react";
import NotificationItem from "../components/NotificationItem";
import { getNotificationsMock } from "../services/notificationService";
import { useNavigate } from "react-router-dom";
import "../components/NotificationItem.css";

export default function NotificationsPage() {
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Tabs: all, unread, favourites
  const [tab, setTab] = useState("all");

  useEffect(() => {
    async function load() {
      const data = await getNotificationsMock();
      setItems(data);
      setLoading(false);
    }
    load();
  }, []);

  const unreadCount = items.filter((i) => !i.read).length;

  const visible = useMemo(() => {
    return items.filter((i) => {
      if (tab === "all") return true;
      if (tab === "unread") return !i.read;
      if (tab === "favourites") return i.category === "favourites";
      return true;
    });
  }, [items, tab]);

  function toggleRead(id) {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, read: !p.read } : p))
    );
  }

  function markAllRead() {
    setItems((prev) => prev.map((p) => ({ ...p, read: true })));
  }

  if (loading) return <h3 style={{ padding: 28 }}>Loading…</h3>;

  return (
    <div style={{ padding: 24, fontFamily: "system-ui" }}>
      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        {/* Title + unread badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <h1 style={{ margin: 0, fontSize: 28 }}>Notifications</h1>

          {unreadCount > 0 && (
            <div
              style={{
                background: "#2f8fff",
                color: "white",
                padding: "4px 10px",
                borderRadius: "20px",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              {unreadCount}
            </div>
          )}
        </div>

        {/* Buttons */}
        <div style={{ display: "flex", gap: 12 }}>
          <button
            onClick={() => navigate("/dashboard")}
            style={{
              background: "#1f7ed0",
              color: "white",
              border: "1px solid #1f7ed0",
              padding: "8px 14px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            ⬅ Back to Dashboard
          </button>

          <button
            onClick={() => navigate("/messages")}
            style={{
              background: "#1f7ed0",
              color: "white",
              border: "1px solid #1f7ed0",
              padding: "8px 14px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            💬 Messages
          </button>
        </div>
      </div>

      {/* TABS: All — Show unread — Favourites */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
          borderBottom: "1px solid #e6e6e6",
          paddingBottom: 12,
          marginBottom: 16,
        }}
      >
        <button
          onClick={() => setTab("all")}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: 15,
            fontWeight: tab === "all" ? 700 : 500,
          }}
        >
          All
        </button>

        <button
          onClick={() => setTab("unread")}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: 15,
            fontWeight: tab === "unread" ? 700 : 500,
          }}
        >
          Show unread
        </button>

        <button
          onClick={() => setTab("favourites")}
          style={{
            background: "transparent",
            border: "none",
            cursor: "pointer",
            fontSize: 15,
            fontWeight: tab === "favourites" ? 700 : 500,
          }}
        >
          Favourites
        </button>

        {/* Mark all as read */}
        <button
          onClick={markAllRead}
          style={{
            marginLeft: "auto",
            color: "#1f7ed0",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Mark all as read
        </button>
      </div>

      {/* Notification list */}
      {visible.map((n) => (
        <NotificationItem
          key={n.id}
          item={n}
          onToggleRead={toggleRead}
          onAvatarClick={() => navigate(`/messages/${n.id}`)}
        />
      ))}
    </div>
  );
}
