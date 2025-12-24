import api from './api';

export const freelancerDashboardService = {
  getFreelancerStats: async () => {
    try {
      const response = await api.get('/freelancer/dashboard/stats');
      return response.data;
    } catch (error) {
      console.error("Error fetching freelancer dashboard stats:", error);
      throw error;
    }
  },
  getFreelancerReviews: async () => {
    try {
      const response = await api.get('/freelancer/dashboard/reviews');
      return response.data;
    } catch (error) {
      console.error("Error fetching freelancer reviews:", error);
      throw error;
    }
  },
  getMonthlyEarnings: async () => {
    try {
      const response = await api.get('/freelancer/dashboard/monthly-earnings');
      return response.data;
    } catch (error) {
      console.error("Error fetching monthly earnings:", error);
      throw error;
    }
  },
};