import axiosInstance from '../utils/axiosInstance';

export const userService = {
    // Auth: Login
    login: async (credentials) => {
        // Because baseURL is now '/api/', we manually add 'users/' here
        // Final URL: http://127.0.0.1:8000/api/users/login/
        const response = await axiosInstance.post('users/login/', credentials);
        return response.data;
    },

    // Auth: Register (Client)
    registerClient: async (userData) => {
        const response = await axiosInstance.post('users/register/client/', userData);
        return response.data;
    },

    // Auth: Register (Freelancer)
    registerFreelancer: async (userData) => {
        const response = await axiosInstance.post('users/register/freelancer/', userData);
        return response.data;
    },

    // Profile: Get current user details
    getProfile: async () => {
        const response = await axiosInstance.get('users/profile/');
        return response.data;
    },

    // Profile: Update user details
    updateProfile: async (data) => {
        const response = await axiosInstance.patch('users/profile/', data);
        return response.data;
    }
};

export default userService;