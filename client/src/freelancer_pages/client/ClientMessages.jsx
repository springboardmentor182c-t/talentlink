import React from 'react';

// --- SVG Icons ---
const Icons = {
  Send: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>,
  Search: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Circle: () => <svg width="8" height="8" viewBox="0 0 24 24" fill="#10b981" stroke="none"><circle cx="12" cy="12" r="10"></circle></svg>
};

const contacts = [
  { id: 1, name: 'Sarah Smith', lastMsg: 'I have uploaded the new designs.', time: '10:30 AM', unread: 2, active: true },
  { id: 2, name: 'Mike Johnson', lastMsg: 'Thanks for the payment!', time: 'Yesterday', unread: 0, active: false },
  { id: 3, name: 'Support Team', lastMsg: 'Ticket #492 resolved.', time: 'Nov 28', unread: 0, active: false },
];

const ClientMessages = () => {
  return (
    <div style={styles.container}>
      <div style={styles.chatLayout}>
        
        {/* Sidebar: Contacts */}
        <div style={styles.sidebar}>
          <div style={styles.searchBar}>
            <div style={{marginRight: '10px', display:'flex'}}><Icons.Search /></div>
            <input type="text" placeholder="Search chats" style={styles.input} />
          </div>
          <div style={styles.contactList}>
            {contacts.map(c => (
              <div key={c.id} style={{...styles.contactItem, backgroundColor: c.active ? '#eff6ff' : 'transparent'}}>
                <div style={styles.avatar}>{c.name[0]}</div>
                <div style={styles.contactInfo}>
                  <div style={styles.contactHeader}>
                    <span style={styles.name}>{c.name}</span>
                    <span style={styles.time}>{c.time}</span>
                  </div>
                  <div style={styles.lastMsg}>{c.lastMsg}</div>
                </div>
                {c.unread > 0 && <span style={styles.unreadBadge}>{c.unread}</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Main Chat Area */}
        <div style={styles.chatArea}>
          <div style={styles.chatHeader}>
            <div style={styles.avatar}>S</div>
            <div style={{marginLeft: '12px'}}>
              <div style={styles.headerName}>Sarah Smith</div>
              <div style={styles.headerStatus}>
                <span style={{marginRight: '5px', display:'flex'}}><Icons.Circle /></span> Online
              </div>
            </div>
          </div>

          <div style={styles.messages}>
            <div style={styles.msgReceived}>
              <div style={styles.bubbleReceived}>Hi! How is the new draft?</div>
              <div style={styles.msgTime}>10:00 AM</div>
            </div>
            <div style={styles.msgSent}>
              <div style={styles.bubbleSent}>It looks great! Can we tweak the header color?</div>
              <div style={styles.msgTime}>10:05 AM</div>
            </div>
            <div style={styles.msgReceived}>
              <div style={styles.bubbleReceived}>Sure, I have uploaded the new designs.</div>
              <div style={styles.msgTime}>10:30 AM</div>
            </div>
          </div>

          <div style={styles.inputArea}>
            <input type="text" placeholder="Type a message..." style={styles.messageInput} />
            <button style={styles.sendBtn}><Icons.Send /></button>
          </div>
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: { height: 'calc(100vh - 100px)', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column' },
  chatLayout: { display: 'flex', flex: 1, backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #e2e8f0' },
  sidebar: { width: '320px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' },
  searchBar: { padding: '20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center' },
  input: { border: 'none', outline: 'none', width: '100%', fontSize: '14px', color: '#334155' },
  contactList: { flex: 1, overflowY: 'auto' },
  contactItem: { padding: '15px 20px', display: 'flex', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #f8fafc' },
  avatar: { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#475569', flexShrink: 0 },
  contactInfo: { marginLeft: '12px', flex: 1 },
  contactHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' },
  name: { fontSize: '14px', fontWeight: '600', color: '#1e293b' },
  time: { fontSize: '11px', color: '#94a3b8' },
  lastMsg: { fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '150px' },
  unreadBadge: { backgroundColor: '#ef4444', color: 'white', fontSize: '10px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '10px' },
  
  chatArea: { flex: 1, display: 'flex', flexDirection: 'column' },
  chatHeader: { padding: '15px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc' },
  headerName: { fontWeight: 'bold', fontSize: '15px', color: '#1e293b' },
  headerStatus: { fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center' },
  messages: { flex: 1, padding: '20px', overflowY: 'auto', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: '15px' },
  msgReceived: { alignSelf: 'flex-start', maxWidth: '70%' },
  msgSent: { alignSelf: 'flex-end', maxWidth: '70%', alignItems: 'flex-end', display: 'flex', flexDirection: 'column' },
  bubbleReceived: { backgroundColor: '#f1f5f9', padding: '10px 15px', borderRadius: '12px 12px 12px 0', fontSize: '14px', color: '#334155' },
  bubbleSent: { backgroundColor: '#3b82f6', color: 'white', padding: '10px 15px', borderRadius: '12px 12px 0 12px', fontSize: '14px' },
  msgTime: { fontSize: '10px', color: '#94a3b8', marginTop: '4px', marginLeft: '5px' },
  inputArea: { padding: '20px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px' },
  messageInput: { flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none' },
  sendBtn: { backgroundColor: '#3b82f6', color: 'white', border: 'none', width: '45px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }
};

export default ClientMessages;