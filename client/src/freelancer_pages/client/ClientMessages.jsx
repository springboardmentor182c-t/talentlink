import React, { useState, useEffect, useRef } from 'react';
import { fetchConversations, fetchMessages, sendMessage } from '../../services/messageService';
import { useUser } from '../../context/UserContext';

// --- SVG Icons ---
const Icons = {
  Send: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>,
  Search: () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
  Circle: () => <svg width="8" height="8" viewBox="0 0 24 24" fill="#10b981" stroke="none"><circle cx="12" cy="12" r="10"></circle></svg>,
  Loader: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin"><circle cx="12" cy="12" r="10"></circle><path d="M12 2 A 10 10 0 0 1 22 12"></path></svg>
};

const ClientMessages = () => {
  const { user } = useUser();
  const [conversations, setConversations] = useState([]);
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Load conversations on mount
  useEffect(() => {
    loadConversations();
  }, []);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Load conversations
  const loadConversations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchConversations();
      setConversations(data);
    } catch (err) {
      setError('Failed to load conversations. Please try again.');
      console.error('Error loading conversations:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load messages for selected conversation
  const loadMessages = async (conversationId) => {
    try {
      setLoadingMessages(true);
      setError(null);
      const data = await fetchMessages(conversationId);
      setMessages(data);
    } catch (err) {
      setError('Failed to load messages. Please try again.');
      console.error('Error loading messages:', err);
    } finally {
      setLoadingMessages(false);
    }
  };

  // Handle conversation selection
  const handleConversationSelect = (conversation) => {
    setSelectedConversation(conversation);
    loadMessages(conversation.id);
  };

  // Handle send message
  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedConversation || sendingMessage) return;

    try {
      setSendingMessage(true);
      const newMessage = await sendMessage(selectedConversation.id, messageInput.trim());
      setMessages([...messages, newMessage]);
      setMessageInput('');
      
      // Update last message in conversations list
      setConversations(conversations.map(conv => 
        conv.id === selectedConversation.id 
          ? { ...conv, last_message: newMessage }
          : conv
      ));
    } catch (err) {
      setError('Failed to send message. Please try again.');
      console.error('Error sending message:', err);
    } finally {
      setSendingMessage(false);
    }
  };

  // Handle enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // Filter conversations based on search
  const filteredConversations = conversations.filter(conv => {
    if (!searchQuery.trim()) return true;
    
    // Get other participant name from proposal
    const otherParticipant = conv.participants?.find(p => p.id !== user?.id);
    const participantName = otherParticipant?.username || otherParticipant?.email || '';
    const projectTitle = conv.proposal?.project_title || '';
    
    return participantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
           projectTitle.toLowerCase().includes(searchQuery.toLowerCase());
  });

  // Get other participant from conversation
  const getOtherParticipant = (conversation) => {
    return conversation.participants?.find(p => p.id !== user?.id) || {};
  };

  // Format time
  const formatTime = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  // Count unread messages
  const getUnreadCount = (conversation) => {
    if (!conversation.last_message) return 0;
    return conversation.last_message.is_read ? 0 : 1;
  };

  return (
    <div style={styles.container}>
      {error && (
        <div style={styles.errorBanner}>
          <span>{error}</span>
          <button onClick={() => setError(null)} style={styles.closeError}>×</button>
        </div>
      )}
      
      <div style={styles.chatLayout}>
        
        {/* Sidebar: Contacts */}
        <div style={styles.sidebar}>
          <div style={styles.searchBar}>
            <div style={{marginRight: '10px', display:'flex'}}><Icons.Search /></div>
            <input 
              type="text" 
              placeholder="Search chats" 
              style={styles.input}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div style={styles.contactList}>
            {loading ? (
              <div style={styles.loadingState}>
                <Icons.Loader />
                <p style={{marginTop: '10px', color: '#64748b'}}>Loading conversations...</p>
              </div>
            ) : filteredConversations.length === 0 ? (
              <div style={styles.emptyState}>
                <p style={{color: '#64748b', textAlign: 'center', padding: '20px'}}>
                  {searchQuery ? 'No conversations found' : 'No conversations yet'}
                </p>
              </div>
            ) : (
              filteredConversations.map(conv => {
                const otherUser = getOtherParticipant(conv);
                const userName = otherUser.username || otherUser.email || 'Unknown User';
                const lastMessage = conv.last_message?.text || 'No messages yet';
                const lastMessageTime = formatTime(conv.last_message?.created_at);
                const unreadCount = getUnreadCount(conv);
                
                return (
                  <div 
                    key={conv.id} 
                    onClick={() => handleConversationSelect(conv)}
                    style={{
                      ...styles.contactItem, 
                      backgroundColor: selectedConversation?.id === conv.id ? '#eff6ff' : 'transparent'
                    }}
                  >
                    <div style={styles.avatar}>{userName[0].toUpperCase()}</div>
                    <div style={styles.contactInfo}>
                      <div style={styles.contactHeader}>
                        <span style={styles.name}>{userName}</span>
                        <span style={styles.time}>{lastMessageTime}</span>
                      </div>
                      <div style={styles.projectTitle}>{conv.proposal?.project_title || 'Project'}</div>
                      <div style={styles.lastMsg}>{lastMessage}</div>
                    </div>
                    {unreadCount > 0 && <span style={styles.unreadBadge}>{unreadCount}</span>}
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Main Chat Area */}
        <div style={styles.chatArea}>
          {selectedConversation ? (
            <>
              <div style={styles.chatHeader}>
                <div style={styles.avatar}>
                  {getOtherParticipant(selectedConversation).username?.[0]?.toUpperCase() || 'U'}
                </div>
                <div style={{marginLeft: '12px'}}>
                  <div style={styles.headerName}>
                    {getOtherParticipant(selectedConversation).username || 
                     getOtherParticipant(selectedConversation).email || 
                     'Unknown User'}
                  </div>
                  <div style={styles.headerStatus}>
                    {selectedConversation.proposal?.project_title || 'Project Discussion'}
                  </div>
                </div>
              </div>

              <div style={styles.messages}>
                {loadingMessages ? (
                  <div style={styles.loadingState}>
                    <Icons.Loader />
                    <p style={{marginTop: '10px', color: '#64748b'}}>Loading messages...</p>
                  </div>
                ) : messages.length === 0 ? (
                  <div style={styles.emptyState}>
                    <p style={{color: '#64748b'}}>No messages yet. Start the conversation!</p>
                  </div>
                ) : (
                  messages.map((msg, idx) => {
                    const isOwnMessage = msg.sender === user?.id || msg.sender?.id === user?.id;
                    const msgTime = formatTime(msg.created_at);
                    
                    return (
                      <div key={msg.id || idx} style={isOwnMessage ? styles.msgSent : styles.msgReceived}>
                        <div style={isOwnMessage ? styles.bubbleSent : styles.bubbleReceived}>
                          {msg.text}
                        </div>
                        <div style={styles.msgTime}>{msgTime}</div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              <div style={styles.inputArea}>
                <input 
                  type="text" 
                  placeholder="Type a message..." 
                  style={styles.messageInput}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={sendingMessage}
                />
                <button 
                  style={{...styles.sendBtn, opacity: sendingMessage || !messageInput.trim() ? 0.5 : 1}}
                  onClick={handleSendMessage}
                  disabled={sendingMessage || !messageInput.trim()}
                >
                  {sendingMessage ? <Icons.Loader /> : <Icons.Send />}
                </button>
              </div>
            </>
          ) : (
            <div style={styles.emptyState}>
              <p style={{color: '#64748b', fontSize: '18px'}}>
                Select a conversation to start messaging
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

const styles = {
  container: { height: 'calc(100vh - 100px)', maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', position: 'relative' },
  errorBanner: { position: 'absolute', top: '10px', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#fee2e2', color: '#991b1b', padding: '12px 20px', borderRadius: '8px', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
  closeError: { background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#991b1b', padding: '0 5px' },
  chatLayout: { display: 'flex', flex: 1, backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', overflow: 'hidden', border: '1px solid #e2e8f0' },
  sidebar: { width: '320px', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column' },
  searchBar: { padding: '20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center' },
  input: { border: 'none', outline: 'none', width: '100%', fontSize: '14px', color: '#334155' },
  contactList: { flex: 1, overflowY: 'auto' },
  contactItem: { padding: '15px 20px', display: 'flex', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #f8fafc', transition: 'background-color 0.2s' },
  avatar: { width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#e2e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#475569', flexShrink: 0 },
  contactInfo: { marginLeft: '12px', flex: 1, minWidth: 0 },
  contactHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '4px' },
  name: { fontSize: '14px', fontWeight: '600', color: '#1e293b' },
  time: { fontSize: '11px', color: '#94a3b8', flexShrink: 0 },
  projectTitle: { fontSize: '11px', color: '#3b82f6', fontWeight: '500', marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  lastMsg: { fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  unreadBadge: { backgroundColor: '#ef4444', color: 'white', fontSize: '10px', fontWeight: 'bold', padding: '2px 6px', borderRadius: '10px', flexShrink: 0 },
  
  chatArea: { flex: 1, display: 'flex', flexDirection: 'column' },
  chatHeader: { padding: '15px 20px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', backgroundColor: '#f8fafc' },
  headerName: { fontWeight: 'bold', fontSize: '15px', color: '#1e293b' },
  headerStatus: { fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center' },
  messages: { flex: 1, padding: '20px', overflowY: 'auto', backgroundColor: '#ffffff', display: 'flex', flexDirection: 'column', gap: '15px' },
  msgReceived: { alignSelf: 'flex-start', maxWidth: '70%' },
  msgSent: { alignSelf: 'flex-end', maxWidth: '70%', alignItems: 'flex-end', display: 'flex', flexDirection: 'column' },
  bubbleReceived: { backgroundColor: '#f1f5f9', padding: '10px 15px', borderRadius: '12px 12px 12px 0', fontSize: '14px', color: '#334155', wordWrap: 'break-word' },
  bubbleSent: { backgroundColor: '#3b82f6', color: 'white', padding: '10px 15px', borderRadius: '12px 12px 0 12px', fontSize: '14px', wordWrap: 'break-word' },
  msgTime: { fontSize: '10px', color: '#94a3b8', marginTop: '4px', marginLeft: '5px' },
  inputArea: { padding: '20px', borderTop: '1px solid #e2e8f0', display: 'flex', gap: '10px' },
  messageInput: { flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '14px' },
  sendBtn: { backgroundColor: '#3b82f6', color: 'white', border: 'none', width: '45px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'opacity 0.2s' },
  loadingState: { display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '40px' },
  emptyState: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '40px' }
};

export default ClientMessages;