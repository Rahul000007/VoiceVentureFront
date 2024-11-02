import webSocketService from '../services/webSocketService';
import authStore from "@/store/authStore";

const audioStore = {
    namespaced: true,
    state: {
        localStream: null,
        remoteStream: null,
        peerConnection: null,
        inCall: false,
        isCaller: false,
        isConnected: false,
        showIncomingCallModal: false,
        callerName: '',
        localUserId: null,
        remoteUserId: null,
        pendingIceCandidates: []
    },
    mutations: {
        setLocalStream(state, stream) {
            state.localStream = stream;
        },
        setRemoteStream(state, stream) {
            state.remoteStream = stream;
        },
        setPeerConnection(state, peerConnection) {
            state.peerConnection = peerConnection;
        },
        setInCall(state, status) {
            state.inCall = status;
        },
        setIsCaller(state, status) {
            state.isCaller = status;
        },
        setConnectionStatus(state, status) {
            state.isConnected = status;
        },
        showIncomingCallModal(state, callerName) {
            state.showIncomingCallModal = true;
            state.callerName = callerName;
        },
        hideIncomingCallModal(state) {
            state.showIncomingCallModal = false;
            state.callerName = '';
        },
        setLocalUserId(state, userId) {
            state.localUserId = userId;
        },
        setRemoteUserId(state, userId) {
            state.remoteUserId = userId;
        },
    },
    actions: {
        async connectSocket() {
            webSocketService.init();
        },

        async startCall({dispatch, state}) {
            await dispatch('initializePeerConnection');
            if (state.isCaller) {
                await dispatch('sendOffer');
            }
        },

        async callRequest({commit, state}) {
            commit('setIsCaller', true)
            commit('setInCall', true);
            commit('setRemoteUserId', 2)
            webSocketService.sendMessage('CALL_REQUEST', authStore.state.userName, state.localUserId, state.remoteUserId);
        },

        async callAcceptReject({commit, state, dispatch}, {action}) {
            commit('hideIncomingCallModal');
            if (action === 'accept') {
                dispatch('startCall')
                webSocketService.sendMessage('CALL_ACCEPT', authStore.state.userName, state.localUserId, state.remoteUserId);
            } else if (action === 'decline') {
                commit('setInCall', false);
                commit('setIsCaller', false);
                webSocketService.sendMessage('CALL_REJECT', authStore.state.userName, state.localUserId, state.remoteUserId);
            }
        },

        async receiveCallRequest({commit}, {callerName, callerId}) {
            commit('showIncomingCallModal', callerName);
            commit('setInCall', true);
            commit('setIsCaller', false);
            commit('setRemoteUserId', callerId);
        },

        async initializePeerConnection({commit, dispatch, state}) {
            const peerConnection = new RTCPeerConnection({iceServers: [{urls: 'STUN:stun.l.google.com:19302'}]});

            peerConnection.onicecandidate = (event) => {
                if (event.candidate) {
                    webSocketService.sendMessage('ICE_CANDIDATE', event.candidate, state.localUserId, state.remoteUserId);
                }
            };

            peerConnection.ontrack = (event) => {
                const [remoteStream] = event.streams;
                commit('setRemoteStream', remoteStream);
            };

            commit('setPeerConnection', peerConnection);

            const localStream = await navigator.mediaDevices.getUserMedia({audio: true});

            commit('setLocalStream', localStream);

            localStream.getTracks().forEach((track) => {
                peerConnection.addTrack(track, localStream);
            });

            dispatch('handleWebSocketMessages');
        },


        async handleWebSocketMessages({state}) {

            webSocketService.addEventListener('OFFER', async (message) => {
                try {
                    if (!state.isCaller) {
                        await state.peerConnection.setRemoteDescription(new RTCSessionDescription(message.sdp));
                        state.pendingIceCandidates.forEach(candidate => {
                            state.peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
                        });
                        state.pendingIceCandidates = [];
                        const answer = await state.peerConnection.createAnswer();
                        await state.peerConnection.setLocalDescription(answer);
                        webSocketService.sendMessage('ANSWER', answer, state.localUserId, state.remoteUserId);
                    }
                } catch (error) {
                    console.error('Error handling OFFER:', error);
                }
            });

            webSocketService.addEventListener('ANSWER', async (message) => {
                try {
                    if (state.isCaller) {
                        await state.peerConnection.setRemoteDescription(new RTCSessionDescription({
                            type: message.type,
                            sdp: message.sdp
                        }));
                    }
                } catch (error) {
                    console.error('Error handling ANSWER:', error);
                }
            });


            webSocketService.addEventListener('ICE_CANDIDATE', async (message) => {
                try {
                    if (state.peerConnection.remoteDescription) {
                        await state.peerConnection.addIceCandidate(new RTCIceCandidate(message));
                    } else {
                        state.pendingIceCandidates.push(message);
                    }
                } catch (error) {
                    console.error('Error handling CANDIDATE:', error);
                }
            });
        },


        async sendOffer({state}) {
            const offer = await state.peerConnection.createOffer();
            await state.peerConnection.setLocalDescription(offer);
            webSocketService.sendMessage('OFFER', {sdp: offer}, state.localUserId, state.remoteUserId);
        },

        endCall({commit, state}) {
            state.localStream.getTracks().forEach((track) => track.stop());
            state.peerConnection.close();
            commit('setInCall', false);
            commit('setLocalStream', null);
            commit('setRemoteStream', null);
            webSocketService.close();
        }
    },
    getters: {
        inCall: (state) => state.inCall,
        localStream: (state) => state.localStream,
        remoteStream: (state) => state.remoteStream,
        isConnected: (state) => state.isConnected,
        showIncomingCallModal: (state) => state.showIncomingCallModal,
        callerName: (state) => state.callerName,
        localUserId: (state) => state.localUserId,
    }
};

export default audioStore;
