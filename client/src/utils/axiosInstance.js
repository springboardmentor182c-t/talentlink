
import axios from 'axios';

const axiosInstance = axios.create({
    // CHANGE THIS LINE: Remove 'users/' from the end
    baseURL: 'http://127.0.0.1:8000/api/', 
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;