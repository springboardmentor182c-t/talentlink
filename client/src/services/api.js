import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

const api = axios.create({
  baseURL: API_BASE_URL,
});
export const noAuthApi = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Token ${token}`;
  }
  return config;
});

export const messagingAPI = {
  getConversations: async () => {
    try {
      const response = await api.get("/api/messaging/conversations/");
      return response.data;
    } catch (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }
  },
  getMessages: async (conversationId) => {
    try {
      const response = await api.get(
        `/api/messaging/conversations/${conversationId}/messages/`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching messages:", error);
      throw error;
    }
  },
  sendMessage: async (conversationId, text) => {
    try {
      const response = await api.post(
        `/api/messaging/conversations/${conversationId}/messages/`,
        { text }
      );
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw error;
    }
  },
};

export default api;
