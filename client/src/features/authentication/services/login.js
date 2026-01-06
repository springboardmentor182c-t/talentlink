import axiosInstance from '../../../utils/axiosInstance';
import { performLogout } from '../../../utils/logout';

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
                        if (response.data.role) {
                                localStorage.setItem('role', response.data.role);
                        }

                        const nameFromResponse =
                            response.data.username ||
                            response.data.name ||
                            `${response.data.first_name || ""} ${response.data.last_name || ""}`.trim();

                        if (nameFromResponse) {
                            localStorage.setItem('user_name', nameFromResponse);
                        }
                }

        return response.data;
    } catch (error) {
        // Return a clean error message
        throw error.response ? error.response.data : { detail: "Network Error" };
    }
};

export const logoutUser = () => performLogout();