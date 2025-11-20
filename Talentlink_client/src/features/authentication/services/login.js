import axiosInstance from '../../../utils/axiosInstance';

export const loginUser = async (email, password) => {
    try {
        const response = await axiosInstance.post('login/', { 
            email, 
            password 
        });

        if (response.data.access) {
            // Store tokens securely
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            localStorage.setItem('user_email', email); // Optional: store user info
        }

        return response.data;
    } catch (error) {
        // Return a clean error message
        throw error.response ? error.response.data : { detail: "Network Error" };
    }
};

export const logoutUser = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user_email');
};