<template>
  <header class="navbar">
    <div class="navbar-container">
      <!-- LOGO -->
      <router-link to="/" class="logo">
        <img src="../assets/logo.jpg" alt="DMA Styles Logo" />
        <!-- <span>DMA Styles</span> -->
      </router-link>

      <!-- NAV LINKS -->
      <nav class="nav-links">
        <router-link to="/" exact-active-class="active">Home</router-link>
        <router-link to="/about" exact-active-class="active">About</router-link>
        <router-link to="/collections" exact-active-class="active">Collections</router-link>
        <router-link to="/book-fittings" exact-active-class="active">Book Fitting</router-link>
        <router-link to="/services" exact-active-class="active">Services</router-link>
        <router-link to="/testimonials" exact-active-class="active">Testimonials</router-link>
        <router-link to="/contact" exact-active-class="active">Contact</router-link>
        <router-link to="/dashboard" exact-active-class="active">Dashboard</router-link>
      </nav>

      <!-- AUTH BUTTONS -->
      <!-- <div class="auth-buttons">
        <router-link to="/login" class="btn login">Login</router-link>
        <router-link to="/signup" class="btn signup">Sign Up</router-link>
      </div> -->
    </div>
  </header>
</template>

<script setup></script>

<style scoped>
.navbar {
  background: #0d0d0d;
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
  color: #fff;
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.8rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* LOGO */
.logo {
  align-items: center;
  gap: 8px;
}

.logo img {
  width: 70px;
  height: 70px;
  border-radius: 25%;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.4);
  object-fit: cover;
}

/* NAV LINKS */
.nav-links {
  display: flex;
  gap: 1.5rem;
}

.nav-links a {
  text-decoration: none;
  color: #ccc;
  font-weight: 500;
  transition: all 0.3s ease;
}

.nav-links a:hover,
.nav-links .active {
  color: #ffd700;
  text-shadow: 0 0 5px rgba(255, 215, 0, 0.4);
}

/* AUTH BUTTONS */
.auth-buttons {
  display: flex;
  gap: 0.8rem;
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
}

.btn.signup {
  background: #ffd700;
  color: #000;
}

.btn.signup:hover {
  background: #fff;
  color: #000;
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .navbar-container {
    flex-direction: column;
    align-items: flex-start;
  }

  .nav-links {
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 0.5rem;
  }

  .auth-buttons {
    margin-top: 0.8rem;
  }
}
</style>
