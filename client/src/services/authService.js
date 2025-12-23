import api from './api.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export const authService = {
  register: async (username, email, password, userType = 'freelancer') => {
    try {
      const response = await api.post('/auth/register/', {
        username,
        email,
        password,
        password_confirm: password,
        role: userType,
      });

      // Accept multiple possible response shapes: { token, user } or { access, refresh, user }
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('accessToken', response.data.token);
      }

      if (response.data.access) {
        localStorage.setItem('accessToken', response.data.access);
      }

      if (response.data.refresh) {
        localStorage.setItem('refreshToken', response.data.refresh);
      }

      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        localStorage.setItem('userRole', response.data.user.user_type || response.data.user.userType || userType);
      }

      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error.response?.data || error;
    }
  },
  login: async (username, password) => {
    try {
      const response = await api.post('/auth/login/', {
        username,
        password,
      });

      // Support JWT response shape { access, refresh, user }
      if (response.data.access) {
        localStorage.setItem('accessToken', response.data.access);
      }
      if (response.data.refresh) {
        localStorage.setItem('refreshToken', response.data.refresh);
      }
      if (response.data.user) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        const role = (response.data.user.user_type || response.data.user.role || 'freelancer').toLowerCase();
        localStorage.setItem('userRole', role);
      }

      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error.response?.data || error;
    }
  },
  logout: async () => {
    try {
      await api.post('/auth/logout/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
      localStorage.removeItem('userRole');
    }
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  getToken: () => {
    return localStorage.getItem('accessToken') || localStorage.getItem('token');
  },
  isAuthenticated: () => {
    return !!(localStorage.getItem('accessToken') || localStorage.getItem('token'));
  },
};

export default authService;
