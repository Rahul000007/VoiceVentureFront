// src/Store/AuthStore.js
import authService from '../services/authService';

const authStore = {
    state: {
        user: null,
        userId:null,
        userName:null,
        token: localStorage.getItem('token') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
    },
    mutations: {
        setUser(state, user) {
            state.user = user;
        },
        setUserId(state, userId) {
            state.userId=userId;
        },
        setUsername(state, userName) {
            state.userName=userName;
        },
        setToken(state, { token, refreshToken }) {
            state.token = token;
            state.refreshToken = refreshToken;
            localStorage.setItem('token', token);
            localStorage.setItem('refreshToken', refreshToken);
        },
        logout(state) {
            state.user = null;
            state.token = null;
            state.refreshToken = null;
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        },
    },
    actions: {
        async login({ commit }, credentials) {
            const response = await authService.login(credentials);
            const { token, refreshToken, username,userId, roles } = response.data;
            commit('audio/setLocalUserId',userId)
            commit('setUserId',userId)
            commit("setUsername",username)
            commit('setToken', { token, refreshToken });
            commit('setUser', { username, roles });
            return response;
        },
        async register(_, userData) {
            return authService.register(userData);
        },

        async refreshToken({ commit, state }) {
            const response = await authService.refreshToken(state.refreshToken);
            commit('setToken', {
                token: response.data.token,
                refreshToken: response.data.refreshToken,
            });
            return response;
        },

        logout({ commit }) {
            commit('logout');
        },

        async resetPassword(_, email) {
            return authService.resetPassword(email);
        },

    },
    getters: {
        isAuthenticated: (state) => !!state.token,
        user: (state) => state.user,
        username:(state)=>state.userName,
        userId:(state)=>state.userId
    },

};

export default authStore;
