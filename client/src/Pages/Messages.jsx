import React, { useState } from 'react';
import { Search, Send, Paperclip, MoreVertical, MessageSquare } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Messages() {
  const navigate = useNavigate();
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      name: 'Alex Torres',
      avatar: 'AT',
      lastMessage: 'Great work on the project!',
      time: '10:24 AM',
      unread: 2,
      online: true,
      conversation: [
        { sender: 'them', text: 'Hi! I reviewed your proposal.', time: '9:45 AM' },
        { sender: 'me', text: 'Thank you! Do you have any questions?', time: '9:50 AM' },
        { sender: 'them', text: 'Great work on the project!', time: '10:24 AM' }
      ]
    },
    {
      id: 2,
      name: 'Megan Simon',
      avatar: 'MS',
      lastMessage: 'When can we start?',
      time: '3:47 AM',
      unread: 0,
      online: false,
      conversation: [
        { sender: 'them', text: 'I like your portfolio!', time: '2:30 AM' },
        { sender: 'me', text: 'Thank you! I would love to work on your project.', time: '3:15 AM' },
        { sender: 'them', text: 'When can we start?', time: '3:47 AM' }
      ]
    },
    {
      id: 3,
      name: 'John Davis',
      avatar: 'JD',
      lastMessage: 'The deadline is next week',
      time: 'Yesterday',
      unread: 1,
      online: true,
      conversation: [
        { sender: 'them', text: 'The deadline is next week', time: 'Yesterday' }
      ]
    },
    {
      id: 4,
      name: 'Emma Wilson',
      avatar: 'EW',
      lastMessage: 'Can you send me the files?',
      time: 'Yesterday',
      unread: 0,
      online: false,
      conversation: [
        { sender: 'them', text: 'Hi, how are you?', time: '2 days ago' },
        { sender: 'me', text: 'I am good, thanks!', time: '2 days ago' },
        { sender: 'them', text: 'Can you send me the files?', time: 'Yesterday' }
      ]
    },
    {
      id: 5,
      name: 'Michael Brown',
      avatar: 'MB',
      lastMessage: 'Thanks for the update',
      time: '2 days ago',
      unread: 0,
      online: true,
      conversation: [
        { sender: 'me', text: 'Here is the latest update', time: '2 days ago' },
        { sender: 'them', text: 'Thanks for the update', time: '2 days ago' }
      ]
    }
  ]);

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedMessage) {
      setMessages(prevMessages =>
        prevMessages.map(msg => {
          if (msg.id === selectedMessage.id) {
            return {
              ...msg,
              conversation: [
                ...msg.conversation,
                { sender: 'me', text: messageInput, time: 'Just now' }
              ],
              lastMessage: messageInput,
              time: 'Just now'
            };
          }
          return msg;
        })
      );

      // Update selected message with new conversation
      setSelectedMessage(prev => ({
        ...prev,
        conversation: [
          ...prev.conversation,
          { sender: 'me', text: messageInput, time: 'Just now' }
        ]
      }));

      setMessageInput('');
    }
  };

  return (
    <div>
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
      >
        ← Back
      </button>

      <div className="bg-white rounded-lg shadow h-[calc(100vh-200px)] flex flex-col md:flex-row">
        {/* Messages List */}
        <div className={`${selectedMessage ? 'hidden md:block' : 'block'} md:w-1/3 border-r overflow-y-auto`}>
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div className="divide-y">
            {messages.map(msg => (
              <div
                key={msg.id}
                onClick={() => setSelectedMessage(msg)}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedMessage?.id === msg.id ? 'bg-blue-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {msg.avatar}
                    </div>
                    {msg.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-gray-800 truncate">{msg.name}</h4>
                      <span className="text-xs text-gray-500 ml-2">{msg.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-600 truncate">{msg.lastMessage}</p>
                      {msg.unread > 0 && (
                        <span className="ml-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center flex-shrink-0">
                          {msg.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className={`${selectedMessage ? 'block' : 'hidden md:block'} flex-1 flex flex-col`}>
          {selectedMessage ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="md:hidden text-gray-600 hover:text-gray-800"
                  >
                    ←
                  </button>
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
                      {selectedMessage.avatar}
                    </div>
                    {selectedMessage.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{selectedMessage.name}</h3>
                    <p className="text-xs text-gray-500">{selectedMessage.online ? 'Online' : 'Offline'}</p>
                  </div>
                </div>
                <button className="text-gray-600 hover:text-gray-800">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                {selectedMessage.conversation.map((conv, idx) => (
                  <div key={idx} className={`flex ${conv.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs md:max-w-md ${
                      conv.sender === 'me' 
                        ? 'bg-blue-600 text-white' 
                        : 'bg-white text-gray-800 border'
                    } rounded-lg p-3 shadow-sm`}>
                      <p className="text-sm">{conv.text}</p>
                      <p className={`text-xs mt-1 ${
                        conv.sender === 'me' ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {conv.time}
                      </p>
                    </div>
                  </div>
                ))}
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
                    disabled={!messageInput.trim()}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="hidden md:flex flex-1 items-center justify-center text-gray-400 bg-gray-50">
              <div className="text-center">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p className="text-lg">Select a conversation to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Messages;