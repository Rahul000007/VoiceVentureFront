import { createStore } from 'vuex';
import authStore from './authStore';
import audioStore from './audioStore';
import matchingStore from "./matchingStore";

const store = createStore({
    modules: {
        auth: authStore,
        audio: audioStore,
        matching: matchingStore
    }
});

export default store;

