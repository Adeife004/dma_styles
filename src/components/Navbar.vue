<template>
  <header class="navbar">
    <div class="navbar-container">
      <!-- LOGO -->
      <router-link to="/" class="logo">
        <img src="../assets/logo.png" alt="DMA Styles Logo" />
      </router-link>

      <!-- HAMBURGER ICON -->
      <button class="menu-toggle" @click="toggleMenu">
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
        <span :class="{ open: isMenuOpen }"></span>
      </button>

      <!-- NAV LINKS -->
      <nav :class="['nav-links', { open: isMenuOpen }]">
        <!-- Scroll Links (same page sections) -->
        <a href="#home" @click="scrollToSection('home')">Home</a>
        <a href="#about" @click="scrollToSection('about')">About</a>
        <a href="#testimonials" @click="scrollToSection('testimonials')">Testimonials</a>
        <a href="#contact" @click="scrollToSection('contact')">Contact</a>

        <!-- Router Links (navigate to other pages) -->
        <router-link to="/services" exact-active-class="active" @click="closeMenu"
          >Services</router-link
        >
        <router-link to="/dashboard" exact-active-class="active" @click="closeMenu"
          >Dashboard</router-link
        >

        <!-- AUTH BUTTONS (mobile view inside menu) -->
        <div class="auth-buttons mobile">
          <router-link
            :to="{ path: '/auth', query: { mode: 'login' } }"
            class="btn login"
            @click="closeMenu"
            >Login</router-link
          >
          <router-link
            :to="{ path: '/auth', query: { mode: 'signup' } }"
            class="btn signup"
            @click="closeMenu"
            >Sign Up</router-link
          >
        </div>
      </nav>

      <!-- AUTH BUTTONS (desktop only) -->
      <div class="auth-buttons desktop">
        <router-link :to="{ path: '/auth', query: { mode: 'login' } }" class="btn login"
          >Login</router-link
        >
        <router-link :to="{ path: '/auth', query: { mode: 'signup' } }" class="btn signup"
          >Sign Up</router-link
        >
      </div>
    </div>

    <!-- OVERLAY -->
    <div v-if="isMenuOpen" class="overlay" @click="closeMenu"></div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' // Add this import

const router = useRouter() // Initialize router
const isMenuOpen = ref(false)

const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value)
const closeMenu = () => (isMenuOpen.value = false)

function scrollToSection(id) {
  // close menu on mobile
  closeMenu()

  // if not already on home page, go there first, then scroll
  if (router.currentRoute.value.path !== '/') {
    router.push('/').then(() => {
      setTimeout(() => {
        const section = document.getElementById(id)
        if (section) section.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    })
  } else {
    const section = document.getElementById(id)
    if (section) section.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.navbar {
  background: rgba(13, 13, 13, 0.9);
  backdrop-filter: blur(14px) saturate(180%);
  -webkit-backdrop-filter: blur(14px) saturate(180%);
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 1000;
  width: 100%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  transition: all 0.4s ease;
}

/* ✨ Optional shimmer reflection when scrolling */
.navbar.scrolled {
  background: rgba(13, 13, 13, 0.85);
  box-shadow: 0 6px 25px rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(16px);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 12px 25px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: center;
}

/* LOGO */
.logo img {
  width: 75px;
  height: 75px;
  object-fit: cover;
}

/* NAV LINKS */
.nav-links {
  display: flex;
  gap: 1.5rem;
  transition: all 0.3s ease;
}

.nav-links a {
  position: relative;
  text-decoration: none;
  color: #ccc;
  font-weight: 500;
  font-size: 1rem;
  padding: 6px 10px;
  transition: transform 0.3s ease;
  overflow: hidden;
}

/* Animated gold hover effect */
.nav-links a::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 255, 255, 0));
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s ease;
  z-index: -1;
}

.nav-links a:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.nav-links a:hover {
  color: #ffd700;
  transform: translateY(-3px);
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
}

/* Active link */
.nav-links .active {
  color: #ffd700;
}

/* AUTH BUTTONS */
.auth-buttons {
  display: flex;
  gap: 0.8rem;
}

.auth-buttons.mobile {
  display: none;
}

.btn {
  padding: 6px 15px;
  border-radius: 8px;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn.login {
  background: transparent;
  color: #ffd700;
  border: 1px solid #ffd700;
}

.btn.login:hover {
  background: #ffd700;
  color: #000;
  transform: scale(1.05);
}

.btn.signup {
  background: #ffd700;
  color: #000;
}

.btn.signup:hover {
  background: transparent;
  color: #ffd700;
  border: 1px solid #ffd700;
  transform: scale(1.05);
}

/* ========== HAMBURGER BUTTON ========== */
.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: center;
  width: 28px;
  height: 22px;
  background: none;
  border: none;
  cursor: pointer;
  gap: 5px;
  z-index: 1100;
}

.menu-toggle span {
  width: 100%;
  height: 3px;
  background: #ffd700;
  border-radius: 3px;
  transition: all 0.4s ease;
}

.menu-toggle span.open:nth-child(1) {
  transform: rotate(45deg) translateY(8px);
}

.menu-toggle span.open:nth-child(2) {
  opacity: 0;
}

.menu-toggle span.open:nth-child(3) {
  transform: rotate(-45deg) translateY(-8px);
}

/* RESPONSIVE DESIGN */
@media (max-width: 1024px) {
  .menu-toggle {
    display: flex;
  }

  .nav-links {
    position: fixed;
    top: 0;
    right: -100%;
    width: 100%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 6rem 2rem;
    gap: 1.5rem;
    z-index: 1000;
    transition: right 0.4s ease;
  }

  .nav-links.open {
    right: 0;
  }

  .auth-buttons.desktop {
    display: none;
  }

  .auth-buttons.mobile {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .overlay {
    position: fixed;
    inset: 0;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(12px) saturate(180%);
    -webkit-backdrop-filter: blur(12px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.25);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
    height: 100vh;
    z-index: 900;
    overflow: hidden;
    animation: fadeIn 0.5s ease forwards;
  }

  /* Add a shimmer reflection layer */
  .overlay::before {
    content: '';
    position: absolute;
    top: 0;
    left: -150%;
    width: 150%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent 20%,
      rgba(255, 255, 255, 0.2) 40%,
      rgba(255, 255, 255, 0.4) 50%,
      rgba(255, 255, 255, 0.2) 60%,
      transparent 80%
    );
    animation: shimmer 5s linear infinite;
  }

  /* Smooth fade-in animation */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(1.02);
    }

    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  /* Light shimmer animation */
  @keyframes shimmer {
    0% {
      left: -150%;
    }

    100% {
      left: 150%;
    }
  }
}
</style>
