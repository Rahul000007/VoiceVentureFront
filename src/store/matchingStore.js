import authStore from "@/store/authStore";
import authService from '../services/authService';
import websocket from "sockjs-client/lib/transport/iframe";
import store from "@/store/rootStore";
import webSocketService from "@/services/webSocketService";

const matchingStore = {

    namespaced: true,
    state: {
        matching: false,
        matchedUserId: null,
        matchedUserName:null,
        matchedEmail:null,
        matchedFullName:null,
        matchedProficiencyLevel:null,
        matchedRating:null,
        matchedAchievement:null,
        matchAcceptanceStatus: 'PENDING',
        matchedUserMatchAcceptanceStatus: 'PENDING',
    },
    mutations: {
        setMatching(state, status) {
            state.matching = status;
        },
        setMatchedUserId(state, user) {
            state.matchedUserId = user;
        },
        setMatchedUserName(state, status) {
            state.matchedUserName=status;
        },
        setMatchedEmail(state, status) {
            state.matchedEmail = status;
        },
        setMatchedFullName(state, status) {
            state.matchedFullName = status;
        },
        setMatchedProficiencyLevel(state, status) {
            state.matchedProficiencyLevel = status;
        },
        setMatchedRating(state, status) {
            state.matchedRating = status;
        },
        setMatchedAchievement(state, status) {
            state.matchedAchievement = status;
        },
        setMatchAcceptanceStatus(state, status) {
            state.matchAcceptanceStatus = status;
        },
        setMatchedUserMatchAcceptanceStatus(state, status) {
            state.matchedUserMatchAcceptanceStatus=status;
        },
        resetMatching(state) {
            state.matching = false;
            state.matchedUserId = null;
            state.matchedUserName=null;
            state.matchedEmail = null;
            state.matchedFullName = null;
            state.matchedProficiencyLevel=null;
            state.matchedRating=null;
            state.matchedAchievement=null;
            state.matchAcceptanceStatus = 'PENDING';
            state.matchedUserMatchAcceptanceStatus = 'PENDING';
        },
    },
    actions: {

        async startMatching({commit}) {
            commit('setMatching', true);
            store.commit('audio/setInCall', true)
            store.commit('audio/setLocalUserId', authStore.state.userId);
            await authService.startMatching(authStore.state.userId);
        },

        acceptMatch({commit, state}) {
            webSocketService.sendMessageStatus(authStore.state.userId, state.matchedUserId, 'ACCEPTED');
            commit('setMatchAcceptanceStatus', 'ACCEPTED');
        },

        declineMatch({commit, state}) {
            webSocketService.sendMessageStatus(authStore.state.userId, state.matchedUserId, 'DECLINED');
            commit('resetMatching');
        },

        listenForMatchAcceptance({commit}) {
            websocket.subscribe('/topic/matches', (message) => {
                const event = JSON.parse(message.body);
                if (event.acceptanceStatus === 'ACCEPTED') {
                    commit('setMatchAcceptanceStatus', 'ACCEPTED');
                    if (store.state.matchAcceptanceStatus === 'ACCEPTED') {
                        // Trigger call if both accept
                        this.dispatch('triggerCall');
                    }
                } else if (event.acceptanceStatus === 'DECLINED') {
                    commit('resetMatching');
                    alert('Match declined, finding a new match...');
                    this.dispatch('startMatching');
                }
            });
        },
    },

    getters: {
        matching: (state) => state.matching,
        matchedUserId: (state) => state.matchedUserId,
        matchedUserName: (state) => state.matchedUserName,
        matchedEmail: (state) => state.matchedEmail,
        matchedFullName: (state) => state.matchedFullName,
        matchedProficiencyLevel: (state) => state.matchedProficiencyLevel,
        matchedRating: (state) => state.matchedRating,
        matchedAchievement: (state) => state.matchedAchievement,
        matchAcceptanceStatus: (state) => state.matchAcceptanceStatus,
        matchedUserMatchAcceptanceStatus: (state) => state.matchedUserMatchAcceptanceStatus,
    },

};

export default matchingStore;
