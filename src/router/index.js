import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'
import PreloaderView from '@/views/PreloaderView.vue'
import CompleteProfile from '@/views/CompleteProfile.vue'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'preloader',
      component: PreloaderView,
    },
    {
      path: '/auth',
      name: 'auth',
      component: AuthView,
      meta: { transition: 'fade' },
    },
    {
      path: '/complete-profile',
      name: 'CompleteProfile',
      component: CompleteProfile,
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { transition: 'fade' },
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { transition: 'fade' },
    },
  ],
})

export default router
