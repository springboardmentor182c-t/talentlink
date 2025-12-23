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
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 💬 Messaging APIs (existing Group-A feature — DO NOT REMOVE)
export const messagingAPI = {
  getConversations: async () => {
    try {
      const response = await api.get("/messaging/conversations/");
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

// Freelancer API functions
export const freelancerAPI = {
  /**
   * Get freelancer dashboard data
   */
  getDashboardData: async () => {
    try {
      const response = await api.get("/api/freelancers/dashboard/");
      return response.data;
    } catch (error) {
      console.error("Error fetching freelancer dashboard:", error);
      throw error;
    }
  },

  /**
   * Get freelancer profile data
   */
  getProfile: async () => {
    try {
      const response = await api.get("/api/freelancers/profile/");
      return response.data;
    } catch (error) {
      console.error("Error fetching freelancer profile:", error);
      throw error;
    }
  },

  /**
   * Update freelancer profile
   */
  updateProfile: async (profileData) => {
    try {
      const response = await api.put("/api/freelancers/profile/", profileData);
      return response.data;
    } catch (error) {
      console.error("Error updating freelancer profile:", error);
      throw error;
    }
  },

  /**
   * Get freelancer proposals
   */
  getProposals: async (status = null) => {
    try {
      const url = status ? `/api/proposals/?status=${status}` : "/api/proposals/";
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching freelancer proposals:", error);
      throw error;
    }
  },

  /**
   * Create a new proposal
   */
  createProposal: async (proposalData) => {
    try {
      const response = await api.post("/api/proposals/", proposalData);
      return response.data;
    } catch (error) {
      console.error("Error creating proposal:", error);
      throw error;
    }
  },

  /**
   * Update a proposal
   */
  updateProposal: async (proposalId, proposalData) => {
    try {
      const response = await api.put(`/api/proposals/${proposalId}/`, proposalData);
      return response.data;
    } catch (error) {
      console.error("Error updating proposal:", error);
      throw error;
    }
  },

  /**
   * Delete a proposal
   */
  deleteProposal: async (proposalId) => {
    try {
      const response = await api.delete(`/api/proposals/${proposalId}/`);
      return response.data;
    } catch (error) {
      console.error("Error deleting proposal:", error);
      throw error;
    }
  },

  /**
   * Get freelancer contracts
   */
  getContracts: async (status = null, role = null) => {
    try {
      let url = "/api/contracts/";
      const params = new URLSearchParams();
      
      if (status) {
        params.append('status', status);
      }
      if (role) {
        params.append('role', role);
      }
      
      if (params.toString()) {
        url += `?${params.toString()}`;
      }
      
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching freelancer contracts:", error);
      throw error;
    }
  },

  /**
   * Get contract details
   */
  getContract: async (contractId) => {
    try {
      const response = await api.get(`/api/contracts/${contractId}/`);
      return response.data;
    } catch (error) {
      console.error("Error fetching contract details:", error);
      throw error;
    }
  },

  /**
   * Update contract status
   */
  updateContractStatus: async (contractId, status) => {
    try {
      const response = await api.patch(`/api/contracts/${contractId}/`, { status });
      return response.data;
    } catch (error) {
      console.error("Error updating contract status:", error);
      throw error;
    }
  },

  /**
   * Get freelancer jobs
   */
  getJobs: async (status = null) => {
    try {
      const url = status ? `/api/freelancers/jobs/?status=${status}` : "/api/freelancers/jobs/";
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching freelancer jobs:", error);
      throw error;
    }
  },

  /**
   * Update job status
   */
  updateJobStatus: async (jobId, status) => {
    try {
      const response = await api.patch(`/api/freelancers/jobs/${jobId}/`, { status });
      return response.data;
    } catch (error) {
      console.error("Error updating job status:", error);
      throw error;
    }
  },

  /**
   * Submit work for a job
   */
  submitWork: async (jobId, workData) => {
    try {
      const response = await api.post(`/api/freelancers/jobs/${jobId}/submit-work/`, workData);
      return response.data;
    } catch (error) {
      console.error("Error submitting work:", error);
      throw error;
    }
  },

  /**
   * Request payment for a job
   */
  requestPayment: async (jobId) => {
    try {
      const response = await api.post(`/api/freelancers/jobs/${jobId}/request-payment/`);
      return response.data;
    } catch (error) {
      console.error("Error requesting payment:", error);
      throw error;
    }
  },

  /**
   * Get freelancer earnings
   */
  getEarnings: async (period = 'monthly') => {
    try {
      const response = await api.get(`/api/freelancers/earnings/?period=${period}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching freelancer earnings:", error);
      throw error;
    }
  },

  /**
   * Get freelancer analytics
   */
  getAnalytics: async () => {
    try {
      const response = await api.get("/api/freelancers/analytics/");
      return response.data;
    } catch (error) {
      console.error("Error fetching freelancer analytics:", error);
      throw error;
    }
  },

  /**
   * Get freelancer reviews
   */
  getReviews: async () => {
    try {
      const response = await api.get("/api/freelancers/reviews/");
      return response.data;
    } catch (error) {
      console.error("Error fetching freelancer reviews:", error);
      throw error;
    }
  },

  /**
   * Get available projects for freelancers
   */
  getAvailableProjects: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams(filters).toString();
      const url = queryParams ? `/api/freelancers/projects/?${queryParams}` : "/api/freelancers/projects/";
      const response = await api.get(url);
      return response.data;
    } catch (error) {
      console.error("Error fetching available projects:", error);
      throw error;
    }
  },

  /**
   * Get freelancer skills
   */
  getSkills: async () => {
    try {
      const response = await api.get("/api/freelancers/skills/");
      return response.data;
    } catch (error) {
      console.error("Error fetching freelancer skills:", error);
      throw error;
    }
  },

  /**
   * Update freelancer skills
   */
  updateSkills: async (skillsData) => {
    try {
      const response = await api.put("/api/freelancers/skills/", skillsData);
      return response.data;
    } catch (error) {
      console.error("Error updating freelancer skills:", error);
      throw error;
    }
  },

  /**
   * Get freelancer portfolio
   */
  getPortfolio: async () => {
    try {
      const response = await api.get("/api/freelancers/portfolio/");
      return response.data;
    } catch (error) {
      console.error("Error fetching freelancer portfolio:", error);
      throw error;
    }
  },

  /**
   * Add portfolio item
   */
  addPortfolioItem: async (portfolioData) => {
    try {
      const response = await api.post("/api/freelancers/portfolio/", portfolioData);
      return response.data;
    } catch (error) {
      console.error("Error adding portfolio item:", error);
      throw error;
    }
  },

  /**
   * Update portfolio item
   */
  updatePortfolioItem: async (itemId, portfolioData) => {
    try {
      const response = await api.put(`/api/freelancers/portfolio/${itemId}/`, portfolioData);
      return response.data;
    } catch (error) {
      console.error("Error updating portfolio item:", error);
      throw error;
    }
  },

  /**
   * Delete portfolio item
   */
  deletePortfolioItem: async (itemId) => {
    try {
      const response = await api.delete(`/api/freelancers/portfolio/${itemId}/`);
      return response.data;
    } catch (error) {
      console.error("Error deleting portfolio item:", error);
      throw error;
    }
  },

  /**
   * Get freelancer notifications
   */
  getNotifications: async () => {
    try {
      const response = await api.get("/api/freelancers/notifications/");
      return response.data;
    } catch (error) {
      console.error("Error fetching freelancer notifications:", error);
      throw error;
    }
  },

  /**
   * Mark notification as read
   */
  markNotificationAsRead: async (notificationId) => {
    try {
      const response = await api.patch(`/api/freelancers/notifications/${notificationId}/`, { is_read: true });
      return response.data;
    } catch (error) {
      console.error("Error marking notification as read:", error);
      throw error;
    }
  },

  /**
   * Get freelancer messages
   */
  getMessages: async () => {
    try {
      const response = await api.get("/api/freelancers/messages/");
      return response.data;
    } catch (error) {
      console.error("Error fetching freelancer messages:", error);
      throw error;
    }
  },

  /**
   * Send message to client
   */
  sendMessageToClient: async (clientId, messageData) => {
    try {
      const response = await api.post(`/api/freelancers/messages/${clientId}/`, messageData);
      return response.data;
    } catch (error) {
      console.error("Error sending message to client:", error);
      throw error;
    }
  }
};

export default api;
