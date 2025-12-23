import api from './api';

export const notificationApi = {
  async fetchNotifications() {
    const response = await api.get('/notifications/');
    return response.data;
  },
  async markAsRead(notificationId) {
    const response = await api.patch(`/notifications/${notificationId}/read/`);
    return response.data;
  }
};
