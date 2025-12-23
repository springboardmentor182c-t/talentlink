import React, { useState, useEffect } from 'react';
import { Search, Send, Paperclip, MoreVertical, MessageSquare, Loader } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { messagingAPI } from '../services/api.js';

function Messages({ userType }) {
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [conversations, setConversations] = useState([]);
  const [conversationMessages, setConversationMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch user info from localStorage
  useEffect(() => {
    try {
      const userData = localStorage.getItem('user');
      if (userData) {
        const user = JSON.parse(userData);
        setCurrentUserId(user.id);
      }
    } catch (err) {
      console.error('Error parsing user data:', err);
    }
  }, []);

  // Fetch conversations on component mount
  useEffect(() => {
    const fetchConversations = async () => {
      setLoading(true);
      setError(null);
      try {
        // Optionally pass userType to API for role-based filtering
        const data = await messagingAPI.getConversations(userType);
        setConversations(data || []);
      } catch (err) {
        setError('Failed to load conversations');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (currentUserId) {
      fetchConversations();
    }
  }, [currentUserId, userType]);

  // Fetch messages when conversation is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (selectedConversation?.id) {
        try {
          const data = await messagingAPI.getMessages(selectedConversation.id);
          setConversationMessages(data || []);
        } catch (err) {
          console.error('Failed to load messages:', err);
        }
      }
    };

    fetchMessages();
  }, [selectedConversation]);

  // Format time for display
  const formatTime = (dateString) => {
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMs / 3600000);
      const diffDays = Math.floor(diffMs / 86400000);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffHours < 24) return `${diffHours}h ago`;
      if (diffDays < 7) return `${diffDays}d ago`;

      return date.toLocaleDateString();
    } catch {
      return 'Unknown';
    }
  };

  // Get participant name from conversation
  const getParticipantName = (conversation) => {
    const participants = conversation.participants || [];
    const otherParticipant = participants.find(p => p.id !== currentUserId);
    return otherParticipant?.username || 'Unknown';
  };

  // Get participant avatar
  const getParticipantAvatar = (conversation) => {
    const participants = conversation.participants || [];
    const otherParticipant = participants.find(p => p.id !== currentUserId);
    return otherParticipant?.username?.substring(0, 2).toUpperCase() || 'U';
  };

  // Get last message text
  const getLastMessage = (conversation) => {
    const lastMsg = conversation.last_message;
    if (lastMsg) {
      return lastMsg.text || '';
    }
    return 'No messages yet';
  };

  // Handle send message
  const handleSendMessage = async () => {
    if (!messageInput.trim() || !selectedConversation || sendingMessage) return;

    setSendingMessage(true);
    try {
      const newMessage = await messagingAPI.sendMessage(
        selectedConversation.id,
        messageInput
      );

      // Add new message to the list
      setConversationMessages(prev => [...prev, newMessage]);

      // Update conversation's last message
      setConversations(prev =>
        prev.map(conv =>
          conv.id === selectedConversation.id
            ? { ...conv, last_message: newMessage }
            : conv
        )
      );

      setMessageInput('');
    } catch (err) {
      console.error('Failed to send message:', err);
      setError('Failed to send message');
    } finally {
      setSendingMessage(false);
    }
  };

  const filteredConversations = conversations.filter(conv => {
    const name = getParticipantName(conv).toLowerCase();
    return name.includes(searchQuery.toLowerCase());
  });

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => {
          if (userType === 'freelancer') {
            navigate('/freelancer/messages');
          } else {
            navigate('/client/messages');
          }
        }}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
      >
        ← Back
      </button>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow h-[calc(100vh-200px)] flex flex-col md:flex-row">
        {/* Conversations List */}
        <div className={`${selectedConversation ? 'hidden md:block' : 'block'} md:w-1/3 border-r overflow-y-auto`}>
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {(loading || conversations.length === 0) ? (
            <div className="flex items-center justify-center h-64 text-gray-500">
              <div className="text-center max-w-md">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-600 text-white mx-auto mb-3 font-semibold">
                  TL
                </div>
                <h3 className="text-lg font-semibold mb-1">No conversation history</h3>
                <p className="mb-3">Welcome to TalentLink! Start by creating your profile and exploring projects.</p>

                <div className="bg-white border rounded-lg p-3 text-left shadow-sm">
                  <div className="font-semibold text-sm text-gray-700">TALENTLINK</div>
                  <p className="text-sm text-gray-600">Welcome to TalentLink! We're excited to have you — start by creating your profile and exploring projects. If you need help, check the Help Center or contact support.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="divide-y">
              {filteredConversations.map(conv => (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv)}
                  className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation?.id === conv.id ? 'bg-blue-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                        {getParticipantAvatar(conv)}
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <h4 className="font-semibold text-gray-800 truncate">
                          {getParticipantName(conv)}
                        </h4>
                        <span className="text-xs text-gray-500 ml-2">
                          {conv.last_message ? formatTime(conv.last_message.created_at) : ''}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 truncate">
                        {getLastMessage(conv)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Chat Area */}
        <div className={`${selectedConversation ? 'block' : 'hidden md:block'} flex-1 flex flex-col`}>
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedConversation(null)}
                    className="md:hidden text-gray-600 hover:text-gray-800"
                  >
                    ←
                  </button>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {getParticipantAvatar(selectedConversation)}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      {getParticipantName(selectedConversation)}
                    </h3>
                    <p className="text-xs text-gray-500">Online</p>
                  </div>
                </div>
                <button className="text-gray-600 hover:text-gray-800">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {conversationMessages.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    <p>No messages yet</p>
                  </div>
                ) : (
                  conversationMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === currentUserId ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs md:max-w-md ${
                          msg.sender === currentUserId
                            ? 'bg-blue-600 text-white'
                            : 'bg-white text-gray-800 border'
                        } rounded-lg p-3 shadow-sm`}
                      >
                        <p className="text-sm">{msg.text}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender === currentUserId ? 'text-blue-100' : 'text-gray-500'
                          }`}
                        >
                          {formatTime(msg.created_at)}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t bg-white">
                <div className="flex items-center space-x-2">
                  <button className="text-gray-600 hover:text-gray-800 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Paperclip className="w-5 h-5" />
                  </button>
                  <input
                    type="text"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!messageInput.trim() || sendingMessage}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    {sendingMessage ? (
                      <Loader className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center text-gray-400 bg-gray-50">
              <div className="text-center max-w-md">
                {conversations.length === 0 ? (
                  <>
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mx-auto mb-4 font-semibold">TL</div>
                    <h3 className="text-lg font-semibold mb-2">No conversation history</h3>
                    <p className="text-sm">Welcome to TalentLink! We're excited to have you — start by creating your profile and exploring projects. If you need help, check the Help Center or contact support.</p>
                  </>
                ) : (
                  <>
                    <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Select a conversation to start messaging</p>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;
