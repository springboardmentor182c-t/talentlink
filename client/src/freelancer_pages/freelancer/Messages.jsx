import React, { useState, useEffect, useRef } from 'react';
import { fetchConversations, fetchMessages, sendMessage } from '../../services/messageService';
import { useUser } from '../../context/UserContext';
import FreelancerLayout from '../../freelancer_layouts/FreelancerLayout';
import { Box, Paper, Typography, TextField, IconButton, Avatar, Chip, CircularProgress, Alert } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';

const FreelancerMessages = () => {
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
    <FreelancerLayout>
      <Box sx={{ height: 'calc(100vh - 100px)', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {error && (
          <Alert severity="error" onClose={() => setError(null)} sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <Paper sx={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Sidebar: Conversations */}
          <Box sx={{ width: 350, borderRight: 1, borderColor: 'divider', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
                }}
              />
            </Box>
            
            <Box sx={{ flex: 1, overflowY: 'auto' }}>
              {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <CircularProgress />
                </Box>
              ) : filteredConversations.length === 0 ? (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                  <Typography color="text.secondary">
                    {searchQuery ? 'No conversations found' : 'No conversations yet'}
                  </Typography>
                </Box>
              ) : (
                filteredConversations.map(conv => {
                  const otherUser = getOtherParticipant(conv);
                  const userName = otherUser.username || otherUser.email || 'Unknown User';
                  const lastMessage = conv.last_message?.text || 'No messages yet';
                  const lastMessageTime = formatTime(conv.last_message?.created_at);
                  const unreadCount = getUnreadCount(conv);
                  
                  return (
                    <Box
                      key={conv.id}
                      onClick={() => handleConversationSelect(conv)}
                      sx={{
                        p: 2,
                        cursor: 'pointer',
                        borderBottom: 1,
                        borderColor: 'divider',
                        bgcolor: selectedConversation?.id === conv.id ? 'action.selected' : 'transparent',
                        '&:hover': { bgcolor: 'action.hover' },
                        display: 'flex',
                        gap: 1.5
                      }}
                    >
                      <Avatar sx={{ bgcolor: 'primary.main' }}>
                        {userName[0]?.toUpperCase()}
                      </Avatar>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                          <Typography variant="subtitle2" noWrap>
                            {userName}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {lastMessageTime}
                          </Typography>
                        </Box>
                        <Typography variant="caption" color="primary" noWrap sx={{ display: 'block', mb: 0.5 }}>
                          {conv.proposal?.project_title || 'Project'}
                        </Typography>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary" noWrap sx={{ flex: 1 }}>
                            {lastMessage}
                          </Typography>
                          {unreadCount > 0 && (
                            <Chip label={unreadCount} size="small" color="error" sx={{ ml: 1, height: 20 }} />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  );
                })
              )}
            </Box>
          </Box>

          {/* Main Chat Area */}
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', bgcolor: 'background.default' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main' }}>
                      {getOtherParticipant(selectedConversation).username?.[0]?.toUpperCase() || 'U'}
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {getOtherParticipant(selectedConversation).username || 
                         getOtherParticipant(selectedConversation).email || 
                         'Unknown User'}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {selectedConversation.proposal?.project_title || 'Project Discussion'}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                {/* Messages */}
                <Box sx={{ flex: 1, overflowY: 'auto', p: 2, bgcolor: 'grey.50' }}>
                  {loadingMessages ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <CircularProgress />
                    </Box>
                  ) : messages.length === 0 ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                      <Typography color="text.secondary">
                        No messages yet. Start the conversation!
                      </Typography>
                    </Box>
                  ) : (
                    messages.map((msg, idx) => {
                      const isOwnMessage = msg.sender === user?.id || msg.sender?.id === user?.id;
                      const msgTime = formatTime(msg.created_at);
                      
                      return (
                        <Box
                          key={msg.id || idx}
                          sx={{
                            display: 'flex',
                            justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                            mb: 2
                          }}
                        >
                          <Box sx={{ maxWidth: '70%' }}>
                            <Paper
                              sx={{
                                p: 1.5,
                                bgcolor: isOwnMessage ? 'primary.main' : 'white',
                                color: isOwnMessage ? 'white' : 'text.primary',
                                borderRadius: isOwnMessage ? '12px 12px 0 12px' : '12px 12px 12px 0'
                              }}
                            >
                              <Typography variant="body2">{msg.text}</Typography>
                            </Paper>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              sx={{ display: 'block', mt: 0.5, ml: 1 }}
                            >
                              {msgTime}
                            </Typography>
                          </Box>
                        </Box>
                      );
                    })
                  )}
                  <div ref={messagesEndRef} />
                </Box>

                {/* Message Input */}
                <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider', bgcolor: 'background.paper' }}>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Type a message..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      disabled={sendingMessage}
                    />
                    <IconButton
                      color="primary"
                      onClick={handleSendMessage}
                      disabled={sendingMessage || !messageInput.trim()}
                    >
                      {sendingMessage ? <CircularProgress size={24} /> : <SendIcon />}
                    </IconButton>
                  </Box>
                </Box>
              </>
            ) : (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <Typography variant="h6" color="text.secondary">
                  Select a conversation to start messaging
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Box>
    </FreelancerLayout>
  );
};

export default FreelancerMessages;
