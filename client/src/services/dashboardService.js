import api from './api';

const dashboardService = {
  async getStats() {
    const response = await api.get('/analytics/dashboard/');
    return response.data;
  },
  async getRecentMessages() {
    const response = await api.get('/messaging/recent/');
    return response.data;
  }
};

export default dashboardService;
