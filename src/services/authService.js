// src/services/AuthService.js
import api from './apiService';

const authService = {
    login(credentials) {
        return api.post('/auth/login', credentials);
    },
    register(userData) {
        return api.post('/auth/register', userData);
    },
    refreshToken(refreshToken) {
        return api.post('/auth/refresh-token', { refreshToken });
    },
    resetPassword(email) {
        return api.post('/auth/reset-password', { email });
    },
    startMatching(userId){
        return api.post('/matching/start',userId)
    }
};

export default authService;
