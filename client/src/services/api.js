import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// 🔐 Authenticated API (JWT)
const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔓 Non-auth API (login, signup, otp)
export const noAuthApi = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔁 Attach JWT access token to every request
api.interceptors.request.use(
  (config) => {
    // Prefer 'accessToken' but fall back to legacy 'token' for compatibility
    const token = localStorage.getItem("accessToken") || localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 💬 Messaging APIs (existing Group-A feature — DO NOT REMOVE)
export const messagingAPI = {
  getConversations: async (userType) => {
    try {
      // Optionally filter by userType if backend supports it
      let url = "/messaging/conversations/";
      if (userType === "freelancer") {
        url += "?role=freelancer";
      } else if (userType === "client") {
        url += "?role=client";
      }
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching conversations:", error);
      throw error;
    }
  },

  getMessages: async (conversationId) => {
    try {
      const response = await api.get(
        `/messaging/conversations/${conversationId}/messages/`
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
        `/messaging/conversations/${conversationId}/messages/`,
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
