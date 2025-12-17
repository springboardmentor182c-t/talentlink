import api from './api.js';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export const authService = {
  register: async (username, email, password, userType = 'freelancer') => {
    try {
      const response = await api.post('/api/users/auth/register/', {
        username,
        email,
        password,
        password_confirm: password,
        user_type: userType,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error.response?.data || error;
    }
  },
  login: async (username, password) => {
    try {
      const response = await api.post('/api/users/auth/login/', {
        username,
        password,
      });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error.response?.data || error;
    }
  },
  logout: async () => {
    try {
      await api.post('/api/users/auth/logout/');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  },
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },
  getToken: () => {
    return localStorage.getItem('token');
  },
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
};

export default authService;
