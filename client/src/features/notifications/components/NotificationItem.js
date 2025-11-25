import React from "react";
import "./NotificationItem.css";

export default function NotificationItem({
  item,
  onToggleRead,
  onAvatarClick,
}) {
  return (
    <div className={`notif-row ${item.read ? "read" : "unread"}`}>
      {/* LEFT SIDE */}
      <div className="notif-left">
        <img
          className="notif-avatar"
          src={item.avatar}
          alt=""
          onClick={onAvatarClick}
          style={{ cursor: "pointer" }}
        />

        <div className="notif-main">
          <div className="notif-title">{item.title}</div>
          <div className="notif-message">{item.message}</div>
        </div>
      </div>

      {/* RIGHT SIDE (time ABOVE relative time) */}
      <div className="notif-right">
        <div className="notif-time-right">{item.time}</div>
        <div className="notif-relative">{item.relative}</div>

        <div
          onClick={() => onToggleRead(item.id)}
          className={`notif-dot ${item.read ? "dot-read" : "dot-unread"}`}
        />
      </div>
    </div>
  );
}
