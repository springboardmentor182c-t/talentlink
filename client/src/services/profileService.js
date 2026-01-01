import axiosInstance from '../utils/axiosInstance';
import axios from 'axios';

// Create a no-auth axios instance for public endpoints
const noAuthApi = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const profileService = {
  freelancer: {
    getProfile: async () => {
      try {
        const response = await axiosInstance.get('profile/me/');
        return response.data;
      } catch (error) {
        console.error('Error fetching freelancer profile:', error);
        throw error;
      }
    },
    createProfile: async (profileData) => {
      try {
        const formData = new FormData();

        Object.keys(profileData).forEach(key => {
          if (profileData[key] !== null && profileData[key] !== undefined) {
            if (key === 'profile_image' || key === 'documents') {
              if (profileData[key] instanceof File) {
                formData.append(key, profileData[key]);
              }
            } else {
              formData.append(key, profileData[key]);
            }
          }
        });
        const response = await axiosInstance.post('profile/me/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
      } catch (error) {
        console.error('Error creating freelancer profile:', error);
        throw error;
      }
    },
    updateProfile: async (profileData) => {
      try {
        const formData = new FormData();
        
        Object.keys(profileData).forEach(key => {
          if (profileData[key] !== null && profileData[key] !== undefined) {
            if (key === 'profile_image' || key === 'documents') {
              if (profileData[key] instanceof File) {
                formData.append(key, profileData[key]);
              }
            } else {
              formData.append(key, profileData[key]);
            }
          }
        });
        const response = await axiosInstance.post('profile/me/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
      } catch (error) {
        console.error('Error updating freelancer profile:', error);
        throw error;
      }
    },
    getProfileById: async (id) => {
      try {
        const response = await noAuthApi.get(`profile/freelancer-profile/${id}/`);
        return response.data;
      } catch (error) {
        console.error('Error fetching freelancer profile:', error);
        throw error;
      }
    },

    listProfiles: async (params = {}) => {
      try {
        const response = await noAuthApi.get('profile/freelancer-profile/', { params });
        return response.data;
      } catch (error) {
        console.error('Error listing freelancer profiles:', error);
        throw error;
      }
    },
    deleteProfile: async (id) => {
      try {
        await axiosInstance.delete(`profile/freelancer-profile/${id}/`);
      } catch (error) {
        console.error('Error deleting freelancer profile:', error);
        throw error;
      }
    },
  },

  client: {
    getProfile: async () => {
      try {
        const response = await axiosInstance.get('profile/me/');
        return response.data;
      } catch (error) {
        console.error('Error fetching client profile:', error);
        throw error;
      }
    },
    createProfile: async (profileData) => {
      try {
        const formData = new FormData();
        
        Object.keys(profileData).forEach(key => {
          if (profileData[key] !== null && profileData[key] !== undefined) {
            if (key === 'profile_image' || key === 'documents') {
              if (profileData[key] instanceof File) {
                formData.append(key, profileData[key]);
              }
            } else {
              formData.append(key, profileData[key]);
            }
          }
        });
        const response = await axiosInstance.post('profile/me/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
      } catch (error) {
        console.error('Error creating client profile:', error);
        throw error;
      }
    },
    updateProfile: async (profileData) => {
      try {
        const formData = new FormData();
        
        Object.keys(profileData).forEach(key => {
          if (profileData[key] !== null && profileData[key] !== undefined) {
            if (key === 'profile_image' || key === 'documents') {
              if (profileData[key] instanceof File) {
                formData.append(key, profileData[key]);
              }
            } else {
              formData.append(key, profileData[key]);
            }
          }
        });
        const response = await axiosInstance.post('profile/me/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
      } catch (error) {
        console.error('Error updating client profile:', error);
        throw error;
      }
    },
    getProfileById: async (id) => {
      try {
        const response = await noAuthApi.get(`profile/client-profile/${id}/`);
        return response.data;
      } catch (error) {
        console.error('Error fetching client profile:', error);
        throw error;
      }
    },
    listProfiles: async (params = {}) => {
      try {
        const response = await noAuthApi.get('profile/client-profile/', { params });
        return response.data;
      } catch (error) {
        console.error('Error listing client profiles:', error);
        throw error;
      }
    },
    deleteProfile: async (id) => {
      try {
        await axiosInstance.delete(`profile/client-profile/${id}/`);
      } catch (error) {
        console.error('Error deleting client profile:', error);
        throw error;
      }
    },
  },
};

export default profileService;

