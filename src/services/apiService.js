// src/apiService.js
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.VUE_APP_API_URL|| 'http://localhost:8080/api', // API URL in .env file
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
