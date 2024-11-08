import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import store from '../store/rootStore';

const WS_URL = 'http://192.168.108.98:8080/ws';

class WebSocketService {

    constructor() {
        this.socket = null;
        this.stompClient = null;
        this.eventListeners = {};
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectDelay = 2000;
    }

    init() {
        this.socket = new SockJS(WS_URL);
        this.stompClient = Stomp.over(this.socket);
        const token = localStorage.getItem('token')
        this.stompClient.connect({ Authorization: `Bearer ${token}`}, () => {

            store.commit('audio/setConnectionStatus', true);

            this.stompClient.subscribe('/topic/response', (message) => {
                const data = JSON.parse(message.body);
                if (this.eventListeners[data.type]) {
                    this.eventListeners[data.type](data.payload);
                }
            });

            this.stompClient.subscribe('/user/queue/call-request', (message) => {
                const data = JSON.parse(message.body);
                const callerName = data.payload;
                const callerId=data.senderId;
                store.dispatch('audio/receiveCallRequest', { callerName,callerId});
            });

            this.stompClient.subscribe('/user/queue/call-reject', () => {
                store.commit('audio/setInCall',false)
            });

            this.stompClient.subscribe('/user/queue/call-accept', () => {
                store.commit('audio/setInCall',true)
                store.dispatch('audio/startCall');
            });

            this.stompClient.subscribe('/user/queue/offer', (message) => {
                const data = JSON.parse(message.body);

                if (this.eventListeners['OFFER']) {
                    this.eventListeners['OFFER'](data.payload);
                }

            });

            this.stompClient.subscribe('/user/queue/answer', (message) => {
                const data = JSON.parse(message.body);
                if (this.eventListeners['ANSWER']) {
                    this.eventListeners['ANSWER'](data.payload);
                }
            });

            this.stompClient.subscribe('/user/queue/ice-candidate', (message) => {
                const data = JSON.parse(message.body);

                if (this.eventListeners['ICE_CANDIDATE']) {
                    this.eventListeners['ICE_CANDIDATE'](data.payload);
                }
            });

            this.stompClient.subscribe('/user/queue/call-end', (message) => {
                const data = JSON.parse(message.body);
                console.log("CALL END => ", data.payload);
            });

            this.stompClient.subscribe("/user/queue/matching",(message) =>{
                const data=JSON.parse(message.body);
                console.log("Matching Data => "+data)
                store.commit('matching/setCurrentMatchedUser',data);
            })

        }, (error) => {
            console.log('STOMP error: ->', error);
            store.commit('audio/setConnectionStatus', false);
            this.reconnect();
        });

        this.socket.onclose = () => {
            store.commit('audio/setConnectionStatus', false);
            this.reconnect();
        };

        this.socket.onerror = (error) => {
            console.log('SockJS error:', error);
        };
    }


    sendMessage(type, payload, senderId, receiverId) {
        const signalingMessage = {senderId: senderId, receiverId: receiverId, payload: payload, type: type,};
        const message = JSON.stringify(signalingMessage);
        if (this.stompClient && this.stompClient.connected) {
            this.stompClient.send("/app/signal", {}, message);
        } else {
            console.error('STOMP connection is not open');
        }
    }


    reconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            setTimeout(() => {
                this.reconnectAttempts++;
                this.init();
            }, this.reconnectDelay);
        } else {
            console.log('Max reconnect attempts reached. Please check your connection.');
        }
    }

    addEventListener(type, callback) {
        this.eventListeners[type] = callback;
    }

    removeEventListener(type) {
        delete this.eventListeners[type];
    }

    close() {
        if (this.stompClient) {
            this.stompClient.disconnect();
        }
        if (this.socket) {
            this.socket.close();
        }
    }
}

const webSocketService = new WebSocketService();
export default webSocketService;