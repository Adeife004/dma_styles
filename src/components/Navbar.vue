<template>
  <header class="navbar" :class="{ scrolled: isScrolled }">
    <div class="navbar-container">
      <!-- Logo -->
      <router-link to="/home" class="logo" @click="closeMenu">
        <img src="../assets/logo.png" alt="DMA Styles" />
      </router-link>

      <!-- Desktop Navigation -->
      <nav class="desktop-nav">
        <a href="#home" @click.prevent="scrollToSection('home')">Home</a>
        <a href="#about" @click.prevent="scrollToSection('about')">About</a>
        <a href="#services" @click.prevent="scrollToSection('services')">Services</a>
        <a href="#testimonials" @click.prevent="scrollToSection('testimonials')">Testimonials</a>
        <a href="#contact" @click.prevent="scrollToSection('contact')">Contact</a>
        <router-link to="/dashboard" @click="closeMenu">Dashboard</router-link>
      </nav>

      <!-- Desktop Auth Buttons -->
      <div class="auth-buttons desktop-auth">
        <router-link :to="{ path: '/auth', query: { mode: 'login' } }" class="btn-login">
          Login
        </router-link>
        <router-link :to="{ path: '/auth', query: { mode: 'signup' } }" class="btn-signup">
          Sign Up
        </router-link>
      </div>

      <!-- Hamburger Menu -->
      <button class="hamburger" :class="{ active: isMenuOpen }" @click="toggleMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>

    <!-- Mobile Menu -->
    <transition name="slide">
      <div v-if="isMenuOpen" class="mobile-menu">
        <nav class="mobile-nav">
          <a href="#home" @click.prevent="handleMobileClick('home')">Home</a>
          <a href="#about" @click.prevent="handleMobileClick('about')">About</a>
          <a href="#services" @click.prevent="handleMobileClick('services')">Services</a>
          <a href="#testimonials" @click.prevent="handleMobileClick('testimonials')">
            Testimonials
          </a>
          <a href="#contact" @click.prevent="handleMobileClick('contact')">Contact</a>
          <router-link to="/dashboard" @click="closeMenu">Dashboard</router-link>
        </nav>

        <div class="mobile-auth">
          <router-link
            :to="{ path: '/auth', query: { mode: 'login' } }"
            class="btn-login"
            @click="closeMenu"
          >
            Login
          </router-link>
          <router-link
            :to="{ path: '/auth', query: { mode: 'signup' } }"
            class="btn-signup"
            @click="closeMenu"
          >
            Sign Up
          </router-link>
        </div>
      </div>
    </transition>

    <!-- Overlay -->
    <transition name="fade">
      <div v-if="isMenuOpen" class="overlay" @click="closeMenu"></div>
    </transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useTheme } from '../composables/useTheme'

const router = useRouter()
const route = useRoute()
const isMenuOpen = ref(false)
const isScrolled = ref(false)

// Initialize theme
const { initTheme } = useTheme()

// Pages that should NOT scroll to sections (they don't have sections)
const excludedPages = ['/dashboard', '/auth', '/login', '/signup']

// Toggle mobile menu
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
  document.body.style.overflow = isMenuOpen.value ? 'hidden' : ''
}

// Close mobile menu
const closeMenu = () => {
  isMenuOpen.value = false
  document.body.style.overflow = ''
}

// Scroll to section with smart routing
const scrollToSection = (id) => {
  const currentPath = route.path

  // Check if we're on an excluded page (dashboard, auth, etc.)
  const isExcludedPage = excludedPages.some((page) => currentPath.startsWith(page))

  // Check if we're on home page (either / or /home)
  const isOnHomePage = currentPath === '/' || currentPath === '/home'

  // If we're on an excluded page OR not on home page, navigate to home first
  if (isExcludedPage || !isOnHomePage) {
    router.push('/home#' + id)
  } else {
    // We're already on home page, just scroll
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }
}

// Handle mobile menu clicks
const handleMobileClick = (id) => {
  closeMenu()
  // Wait for menu to close before scrolling
  setTimeout(() => scrollToSection(id), 400)
}

// Detect scroll
const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)

  // Initialize theme on mount
  initTheme()

  // Check if there's a hash in the URL on page load
  if (route.hash) {
    const sectionId = route.hash.substring(1)
    setTimeout(() => {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 500)
  }
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
/* ============================================
   NAVBAR BASE
============================================ */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(var(--accent-color-rgb, 255, 215, 0), 0.1);
  transition: all 0.4s ease;
}

.navbar.scrolled {
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(25px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  border-bottom: 1px solid rgba(var(--accent-color-rgb, 255, 215, 0), 0.2);
}

.navbar-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 16px 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* ============================================
   LOGO
============================================ */
.logo {
  z-index: 1100;
}

.logo img {
  height: 70px;
  width: auto;
  filter: drop-shadow(0 0 15px rgba(var(--accent-color-rgb, 255, 215, 0), 0.3));
  transition: all 0.3s ease;
}

.logo:hover img {
  transform: scale(1.05);
  filter: drop-shadow(0 0 20px rgba(var(--accent-color-rgb, 255, 215, 0), 0.6));
}

/* ============================================
   DESKTOP NAVIGATION
============================================ */
.desktop-nav {
  display: flex;
  gap: 2rem;
  align-items: center;
}

.desktop-nav a {
  color: #e0e0e0;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.5px;
  position: relative;
  transition: all 0.3s ease;
  cursor: pointer;
}

.desktop-nav a::before {
  content: '';
  position: absolute;
  inset: -8px -12px;
  background: linear-gradient(
    135deg,
    rgba(var(--accent-color-rgb, 255, 215, 0), 0.15),
    rgba(var(--accent-color-rgb, 255, 215, 0), 0.05)
  );
  border: 1px solid rgba(var(--accent-color-rgb, 255, 215, 0), 0.3);
  border-radius: 8px;
  opacity: 0;
  transform: scale(0.8);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
}

.desktop-nav a:hover::before,
.desktop-nav a.router-link-active::before {
  opacity: 1;
  transform: scale(1);
}

.desktop-nav a:hover,
.desktop-nav a.router-link-active {
  color: var(--accent-color, #ffd700);
  text-shadow: 0 0 10px rgba(var(--accent-color-rgb, 255, 215, 0), 0.5);
}

/* ============================================
   AUTH BUTTONS
============================================ */
.auth-buttons {
  display: flex;
  gap: 12px;
}

.btn-login,
.btn-signup {
  padding: 10px 24px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.btn-login {
  color: var(--accent-color, #ffd700);
  border: 2px solid var(--accent-color, #ffd700);
  background: transparent;
}

.btn-login:hover {
  background: rgba(var(--accent-color-rgb, 255, 215, 0), 0.1);
  transform: translateY(-2px);
}

.btn-signup {
  color: #000;
  background: var(--accent-color, #ffd700);
  border: 2px solid var(--accent-color, #ffd700);
}

.btn-signup:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
  box-shadow: 0 5px 20px rgba(var(--accent-color-rgb, 255, 215, 0), 0.4);
}

/* ============================================
   HAMBURGER MENU
============================================ */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 24px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1100;
}

.hamburger span {
  width: 100%;
  height: 3px;
  background: var(--accent-color, #ffd700);
  border-radius: 3px;
  transition: all 0.4s ease;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(8px, 8px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(8px, -8px);
}

/* ============================================
   MOBILE MENU
============================================ */
.mobile-menu {
  position: fixed;
  top: 0;
  right: 0;
  width: 320px;
  max-width: 85%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  border-left: 1px solid rgba(var(--accent-color-rgb, 255, 215, 0), 0.2);
  padding: 100px 30px 40px;
  z-index: 1000;
  overflow-y: auto;
}

.mobile-nav {
  display: flex;
  flex-direction: column;
}

.mobile-nav a {
  color: #e0e0e0;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  padding: 16px 0;
  border-bottom: 1px solid rgba(var(--accent-color-rgb, 255, 215, 0), 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.mobile-nav a:hover,
.mobile-nav a.router-link-active {
  color: var(--accent-color, #ffd700);
  transform: translateX(10px);
}

.mobile-auth {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 30px;
  padding-top: 30px;
  border-top: 1px solid rgba(var(--accent-color-rgb, 255, 215, 0), 0.2);
}

.mobile-auth .btn-login,
.mobile-auth .btn-signup {
  width: 100%;
  text-align: center;
}

/* ============================================
   OVERLAY
============================================ */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  z-index: 999;
}

/* ============================================
   TRANSITIONS
============================================ */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.4s ease;
}

.slide-enter-from {
  transform: translateX(100%);
}

.slide-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* ============================================
   RESPONSIVE
============================================ */
@media (max-width: 1024px) {
  .desktop-nav,
  .desktop-auth {
    display: none;
  }

  .hamburger {
    display: flex;
  }
}

@media (max-width: 768px) {
  .navbar-container {
    padding: 12px 20px;
  }

  .logo img {
    height: 60px;
  }

  .mobile-menu {
    width: 100%;
    max-width: 100%;
  }
}
</style>
