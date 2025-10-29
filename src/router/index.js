import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'
import PreloaderView from '@/views/PreloaderView.vue'
import CompleteProfile from '@/components/CompleteProfile.vue'
import DashboardView from '@/views/DashboardView.vue'
import Swal from 'sweetalert2'

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
      path: '/completeprofile',
      name: 'CompleteProfile',
      component: CompleteProfile,
      meta: { transition: 'fade' },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true, transition: 'fade' }, // 🔒 protected
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { transition: 'fade' },
    },
  ],
})

// Route Guard
router.beforeEach((to, from, next) => {
  const user = localStorage.getItem('user')

  if (to.path === '/dashboard' && !user) {
    Swal.fire({
      icon: 'warning',
      title: 'Login Required',
      text: 'Please login or sign up to access your dashboard.',
      confirmButtonColor: '#ffd700',
      confirmButtonText: 'Go to Login / Signup',
    }).then(() => {
      next('/auth')
    })
  } else {
    next()
  }
})

export default router
