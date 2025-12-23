// import axios from 'axios';

// const axiosInstance = axios.create({
//     baseURL: 'http://127.0.0.1:8000/api/users/', // Your Django Backend URL
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// export default axiosInstance;


import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000', 
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.request.use(
    (config) => {
        // 1. Get the token using the CORRECT key from your screenshot
        const token = localStorage.getItem('access_token');

        if (token) {
            // 2. Use 'Bearer' because your token is a JWT (starts with eyJ...)
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn("No access_token found in Local Storage!");
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;