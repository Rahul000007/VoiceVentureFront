// src/Store/AuthStore.js
import authService from '../services/authService';

const authStore = {
    state: {
        token: localStorage.getItem('token') || null,
        refreshToken: localStorage.getItem('refreshToken') || null,
        expiry: localStorage.getItem('expiry') || null,
        userName:null,
        profilePic:null,
    },
    mutations: {
        setToken(state, { accessToken, refreshToken, expiry }) {
            state.token = accessToken;
            state.refreshToken = refreshToken;
            state.expiry = expiry;
            localStorage.setItem('token', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('expiry',expiry);
        },
        setUserDetails(state, {userName,profilePic}){
            state.userName = userName,
            state.profilePic = profilePic
        }
    },
    actions: {
        async login({ commit ,dispatch}, credentials) {
            const response = await authService.login(credentials);
            const { accessToken, refreshToken, expiry, userId, name, profilePic } = response.data.data;
            commit('setToken', { accessToken, refreshToken,expiry });
            commit('setUserDetails',{ name, profilePic})
            commit('audio/setLocalUserId',userId)
            dispatch('audio/connectSocket');
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

    },
    getters: {
        isAuthenticated: (state) => !!state.token,
    },

};

export default authStore;
