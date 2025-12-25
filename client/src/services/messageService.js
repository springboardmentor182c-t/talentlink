import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api/messaging/';

// Create axios instance for messaging
const messageAxios = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
messageAxios.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Fetch all conversations for the authenticated user
 * @returns {Promise} List of conversations
 */
export const fetchConversations = async () => {
    try {
        const response = await messageAxios.get('conversations/');
        return response.data;
    } catch (error) {
        console.error('Error fetching conversations:', error);
        throw error;
    }
};

/**
 * Fetch messages for a specific conversation
 * @param {number} conversationId - The conversation ID
 * @returns {Promise} List of messages
 */
export const fetchMessages = async (conversationId) => {
    try {
        const response = await messageAxios.get(`conversations/${conversationId}/messages/`);
        return response.data;
    } catch (error) {
        console.error('Error fetching messages:', error);
        throw error;
    }
};

/**
 * Send a new message in a conversation
 * @param {number} conversationId - The conversation ID
 * @param {string} text - The message text
 * @returns {Promise} The created message
 */
export const sendMessage = async (conversationId, text) => {
    try {
        const response = await messageAxios.post(
            `conversations/${conversationId}/messages/`,
            { text }
        );
        return response.data;
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
};

/**
 * Mark a message as read
 * @param {number} conversationId - The conversation ID
 * @param {number} messageId - The message ID
 * @returns {Promise} Updated message
 */
export const markMessageAsRead = async (conversationId, messageId) => {
    try {
        const response = await messageAxios.patch(
            `conversations/${conversationId}/messages/${messageId}/`,
            { is_read: true }
        );
        return response.data;
    } catch (error) {
        console.error('Error marking message as read:', error);
        throw error;
    }
};

const messageService = {
    fetchConversations,
    fetchMessages,
    sendMessage,
    markMessageAsRead,
};

export default messageService;
