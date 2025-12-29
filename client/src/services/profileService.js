import api, { noAuthApi } from './api.js';

export const profileService = {
  freelancer: {
    getProfile: async () => {
      try {
        const response = await api.get('/profile/freelancer/profile/edit');
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
        const response = await api.post('/profile/freelancer/profile/create', formData, {
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
        const response = await api.patch('/profile/freelancer/profile/edit', formData, {
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
        const response = await noAuthApi.get(`/profile/freelancer-profile/${id}/`);
        return response.data;
      } catch (error) {
        console.error('Error fetching freelancer profile:', error);
        throw error;
      }
    },

    listProfiles: async (params = {}) => {
      try {
        const response = await noAuthApi.get('/profile/freelancer-profile/', { params });
        return response.data;
      } catch (error) {
        console.error('Error listing freelancer profiles:', error);
        throw error;
      }
    },
    deleteProfile: async (id) => {
      try {
        await noAuthApi.delete(`/profile/freelancer-profile/${id}/`);
      } catch (error) {
        console.error('Error deleting freelancer profile:', error);
        throw error;
      }
    },
  },

  client: {
    getProfile: async () => {
      try {
        const response = await api.get('/profile/client/profile/edit');
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
        const response = await api.post('/profile/client/profile/create', formData, {
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
        const response = await api.patch('/profile/client/profile/edit', formData, {
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
        const response = await noAuthApi.get(`/profile/client-profile/${id}/`);
        return response.data;
      } catch (error) {
        console.error('Error fetching client profile:', error);
        throw error;
      }
    },
    listProfiles: async (params = {}) => {
      try {
        const response = await noAuthApi.get('/profile/client-profile/', { params });
        return response.data;
      } catch (error) {
        console.error('Error listing client profiles:', error);
        throw error;
      }
    },
    deleteProfile: async (id) => {
      try {
        await noAuthApi.delete(`/profile/client-profile/${id}/`);
      } catch (error) {
        console.error('Error deleting client profile:', error);
        throw error;
      }
    },
  },
};

export default profileService;
