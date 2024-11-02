import { createRouter, createWebHistory } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import AudioCallView from '../views/AudioCallView.vue';
import MatchingView  from "@/views/MatchingView.vue";

const routes = [
    { path: '/login', name: 'Login', component: LoginView },
    { path: '/register', name: 'Register', component: RegisterView },
    {path: '/call', name: 'AudioCall', component: AudioCallView, meta: { requiresAuth: true }},
    {path: '/match', name: 'Matching', component: MatchingView, meta: { requiresAuth: true }},
    { path: '/', redirect: '/login' }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const isAuthenticated = localStorage.getItem('token');
        if (!isAuthenticated) {
            next('/login');
        } else {
            next();
        }
    } else {
        next();
    }
});

export default router;
