import authStore from "@/store/authStore";
import authService from '../services/authService';

const matchingStore={

    namespaced: true,
    state : {
        matching: false,
        currentMatchedUser: null,
        matchAcceptanceStatus: 'PENDING',
    },
    mutations: {
        setMatching(state, status) {
            state.matching = status;
        },
        setCurrentMatchedUser(state, user) {
            state.currentMatchedUser = user;
        },
        setMatchAcceptanceStatus(state, status) {
            state.matchAcceptanceStatus = status;
        },
        resetMatching(state) {
            state.matching = false;
            state.currentMatchedUser = null;
            state.matchAcceptanceStatus = 'PENDING';
        },
    },
    actions:{

       async startMatching({ commit }) {
            commit('setMatching', true);
             await authService.startMatching(authStore.state.userId);
        },

        // acceptMatch({ commit, state }) {
        //     // WebSocket send acceptance
        //     websocket.send('/app/matchAcceptance', {
        //         userId: store.state.user.id,
        //         matchedUserId: state.currentMatchedUser.id,
        //         acceptanceStatus: 'ACCEPTED',
        //     });
        //     commit('setMatchAcceptanceStatus', 'ACCEPTED');
        // },
        // declineMatch({ commit, state }) {
        //     websocket.send('/app/matchAcceptance', {
        //         userId: store.state.user.id,
        //         matchedUserId: state.currentMatchedUser.id,
        //         acceptanceStatus: 'DECLINED',
        //     });
        //     commit('resetMatching');
        // },

        // listenForMatchAcceptance({ commit }) {
        //     websocket.subscribe('/topic/matches', (message) => {
        //         const event = JSON.parse(message.body);
        //         if (event.acceptanceStatus === 'ACCEPTED') {
        //             commit('setMatchAcceptanceStatus', 'ACCEPTED');
        //             if (store.state.matchAcceptanceStatus === 'ACCEPTED') {
        //                 // Trigger call if both accept
        //                 this.dispatch('triggerCall');
        //             }
        //         } else if (event.acceptanceStatus === 'DECLINED') {
        //             commit('resetMatching');
        //             alert('Match declined, finding a new match...');
        //             this.dispatch('startMatching');
        //         }
        //     });
        // },
    },

    getters: {
        matching:(state) => state.matching,
        currentMatchedUser:(state) => state.currentMatchedUser,
        matchAcceptanceStatus:(state)=>state.matchAcceptanceStatus,
    },

};

export default matchingStore;
