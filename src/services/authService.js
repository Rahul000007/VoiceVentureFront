// src/services/AuthService.js
import api from './apiService';

const authService = {
    login(credentials) {
        return api.post('/login', credentials);
    },
    register(userData) {
        return api.post('/register', userData);
    },
    startMatching(){
        return api.get('/matching/start')
    },


};

export default authService;
