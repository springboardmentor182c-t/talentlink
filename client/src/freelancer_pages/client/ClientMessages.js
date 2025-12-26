import React, { useState } from "react";
import { FaSearch, FaPaperPlane, FaPhoneAlt, FaVideo, FaEllipsisV } from "react-icons/fa";

export default function ClientMessages() {
  const [selectedChat, setSelectedChat] = useState(1);
  const [input, setInput] = useState("");

  // Mock Contacts
  const contacts = [
    { id: 1, name: "Aarav", avatar: "https://i.pravatar.cc/150?img=12", status: "online", lastMsg: "Sure, let's meet tomorrow.", time: "2m" },
    { id: 2, name: "Nathesha", avatar: "https://i.pravatar.cc/150?img=5", status: "offline", lastMsg: "Project update?", time: "1h" },
    { id: 3, name: "Bobby", avatar: "https://i.pravatar.cc/150?img=33", status: "online", lastMsg: "Thanks for the payment!", time: "3h" },
  ];

  // Mock Messages for the active chat
  const [messages, setMessages] = useState([
    { id: 1, sender: "them", text: "Hi Kumar, did you check the design?", time: "10:30 AM" },
    { id: 2, sender: "me", text: "Yes! It looks great. I have a few comments though.", time: "10:32 AM" },
    { id: 3, sender: "them", text: "Sure, send them over.", time: "10:33 AM" },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMsg = {
      id: messages.length + 1,
      sender: "me",
      text: input,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMessages([...messages, newMsg]);
    setInput("");
  };

  const activeContact = contacts.find(c => c.id === selectedChat);

  return (
    <div style={styles.container}>
      
      {/* --- LEFT SIDEBAR (Contacts) --- */}
      <div style={styles.sidebar}>
        <div style={styles.sidebarHeader}>
          <h2 style={styles.headerTitle}>Messages</h2>
          <div style={styles.searchBox}>
            <FaSearch style={{ color: "#94a3b8" }} />
            <input type="text" placeholder="Search..." style={styles.searchInput} />
          </div>
        </div>

        <div style={styles.contactList}>
          {contacts.map((c) => (
            <div 
              key={c.id} 
              style={{ ...styles.contactItem, ...(selectedChat === c.id ? styles.activeContact : {}) }}
              onClick={() => setSelectedChat(c.id)}
            >
              <div style={styles.avatarWrapper}>
                <img src={c.avatar} alt={c.name} style={styles.avatar} />
                {c.status === "online" && <div style={styles.onlineDot} />}
              </div>
              <div style={styles.contactInfo}>
                <div style={styles.contactTop}>
                  <span style={styles.contactName}>{c.name}</span>
                  <span style={styles.contactTime}>{c.time}</span>
                </div>
                <div style={styles.lastMsg}>{c.lastMsg}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- RIGHT SIDE (Chat Area) --- */}
      <div style={styles.chatArea}>
        {/* Chat Header */}
        <div style={styles.chatHeader}>
          <div style={styles.headerLeft}>
            <img src={activeContact.avatar} alt="" style={styles.headerAvatar} />
            <div>
              <div style={styles.headerName}>{activeContact.name}</div>
              <div style={styles.headerStatus}>{activeContact.status === "online" ? "Active now" : "Offline"}</div>
            </div>
          </div>
          <div style={styles.headerIcons}>
            <FaPhoneAlt style={styles.icon} />
            <FaVideo style={styles.icon} />
            <FaEllipsisV style={styles.icon} />
          </div>
        </div>

        {/* Messages Feed */}
        <div style={styles.messagesList}>
          {messages.map((m) => (
            <div key={m.id} style={{ ...styles.msgRow, justifyContent: m.sender === "me" ? "flex-end" : "flex-start" }}>
              <div style={{ ...styles.msgBubble, ...(m.sender === "me" ? styles.bubbleMe : styles.bubbleThem) }}>
                {m.text}
                <div style={styles.msgTime}>{m.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Input Area */}
        <form style={styles.inputArea} onSubmit={handleSend}>
          <input 
            type="text" 
            placeholder="Type a message..." 
            style={styles.messageInput} 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" style={styles.sendBtn}>
            <FaPaperPlane />
          </button>
        </form>
      </div>

    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "calc(100vh - 100px)", // Adjust based on your Navbar height
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
    fontFamily: "'Inter', sans-serif",
  },
  // Sidebar
  sidebar: {
    width: "320px",
    borderRight: "1px solid #e2e8f0",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#f8fafc",
  },
  sidebarHeader: {
    padding: "20px",
    borderBottom: "1px solid #e2e8f0",
  },
  headerTitle: {
    margin: "0 0 15px 0",
    fontSize: "22px",
    color: "#1e293b",
  },
  searchBox: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "white",
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
  },
  searchInput: {
    border: "none",
    outline: "none",
    marginLeft: "10px",
    width: "100%",
    fontSize: "14px",
  },
  contactList: {
    flex: 1,
    overflowY: "auto",
  },
  contactItem: {
    display: "flex",
    alignItems: "center",
    padding: "15px 20px",
    cursor: "pointer",
    transition: "0.2s",
    borderBottom: "1px solid #f1f5f9",
  },
  activeContact: {
    backgroundColor: "#e0f2fe", // Light blue
    borderLeft: "4px solid #3b82f6",
  },
  avatarWrapper: {
    position: "relative",
    marginRight: "15px",
  },
  avatar: {
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  onlineDot: {
    position: "absolute",
    bottom: "2px",
    right: "2px",
    width: "10px",
    height: "10px",
    backgroundColor: "#22c55e",
    borderRadius: "50%",
    border: "2px solid white",
  },
  contactInfo: {
    flex: 1,
    minWidth: 0,
  },
  contactTop: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "4px",
  },
  contactName: {
    fontWeight: "600",
    color: "#334155",
    fontSize: "15px",
  },
  contactTime: {
    fontSize: "12px",
    color: "#94a3b8",
  },
  lastMsg: {
    fontSize: "13px",
    color: "#64748b",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },

  // Chat Area
  chatArea: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
  chatHeader: {
    padding: "15px 25px",
    borderBottom: "1px solid #e2e8f0",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerLeft: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
  },
  headerAvatar: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    objectFit: "cover",
  },
  headerName: {
    fontWeight: "700",
    fontSize: "16px",
    color: "#1e293b",
  },
  headerStatus: {
    fontSize: "12px",
    color: "#22c55e",
  },
  headerIcons: {
    display: "flex",
    gap: "20px",
    color: "#64748b",
  },
  icon: {
    cursor: "pointer",
    fontSize: "18px",
  },
  
  // Messages List
  messagesList: {
    flex: 1,
    padding: "20px",
    overflowY: "auto",
    backgroundColor: "#f1f5f9",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  msgRow: {
    display: "flex",
  },
  msgBubble: {
    maxWidth: "60%",
    padding: "12px 18px",
    borderRadius: "12px",
    fontSize: "14px",
    lineHeight: "1.5",
    position: "relative",
  },
  bubbleMe: {
    backgroundColor: "#3b82f6",
    color: "white",
    borderRadius: "12px 12px 0 12px",
  },
  bubbleThem: {
    backgroundColor: "white",
    color: "#1e293b",
    borderRadius: "12px 12px 12px 0",
    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
  },
  msgTime: {
    fontSize: "10px",
    marginTop: "5px",
    textAlign: "right",
    opacity: 0.8,
  },

  // Input Area
  inputArea: {
    padding: "20px",
    borderTop: "1px solid #e2e8f0",
    display: "flex",
    gap: "10px",
  },
  messageInput: {
    flex: 1,
    padding: "12px 20px",
    borderRadius: "25px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    outline: "none",
  },
  sendBtn: {
    width: "46px",
    height: "46px",
    borderRadius: "50%",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
  },
};