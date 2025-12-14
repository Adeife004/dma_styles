import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AuthView from '@/views/AuthView.vue'
import PreloaderView from '@/views/PreloaderView.vue'
import CompleteProfile from '@/components/CompleteProfile.vue'
import DashboardView from '@/views/DashboardLayout.vue'
import SettingsView from '@/components/Dashboard/Settings.vue'
import Swal from 'sweetalert2'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    // Handle hash scrolling
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            behavior: 'smooth',
          })
        }, 500)
      })
    }
    // Handle saved position (browser back/forward)
    if (savedPosition) {
      return savedPosition
    }
    // Default to top
    return { top: 0 }
  },
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
      meta: { requiresAuth: true, transition: 'fade' },
    },
    {
      path: '/settings',
      name: 'settings',
      component: SettingsView,
      meta: { transition: 'fade' },
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: { transition: 'fade' },
    },
    // Section routes - redirect to home with hash
    {
      path: '/about',
      redirect: () => {
        return { path: '/home', hash: '#about' }
      },
    },
    {
      path: '/services',
      redirect: () => {
        return { path: '/home', hash: '#services' }
      },
    },
    {
      path: '/testimonials',
      redirect: () => {
        return { path: '/home', hash: '#testimonials' }
      },
    },
    {
      path: '/contact',
      redirect: () => {
        return { path: '/home', hash: '#contact' }
      },
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
      confirmButtonColor: 'var(--theme-color)',
      confirmButtonText: 'Go to Login / Signup',
    }).then(() => {
      next('/auth')
    })
  } else {
    next()
  }
})

export default router