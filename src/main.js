// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/appRouter';
import store from './store/rootStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import 'vue3-toastify/dist/index.css';
import { ToastifyContainer, toast } from 'vue3-toastify';


const app = createApp(App);
const VUE_FLAGS = {
    __VUE_OPTIONS_API__: true,
    __VUE_PROD_DEVTOOLS__: false,
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
};

app.config.globalProperties.$vueFlags = VUE_FLAGS;
app.use(router);
app.use(store);
app.component('ToastifyContainer', ToastifyContainer);
app.config.globalProperties.$toast = toast;
app.mount('#app');

