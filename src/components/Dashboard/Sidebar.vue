<template>
  <div>
    <!-- Overlay (for mobile) -->
    <div v-if="isOpen" class="overlay" @click="$emit('close')"></div>

    <!-- SIDEBAR -->
    <aside class="sidebar" :class="{ open: isOpen }">
      <div class="brand">
        <img src="../../assets/logo.jpg" alt="DMA Styles Logo" class="logo" />
        <h1>DMA Styles</h1>
      </div>

      <nav class="menu">
        <a
          v-for="item in menuItems"
          :key="item.path"
          href="#"
          @click.prevent="$emit('navigate', item.path)"
          :class="{ active: currentPath === item.path }"
        >
          <i :class="item.icon"></i> {{ item.label }}
        </a>
      </nav>

      <button class="logout-btn" @click="$emit('logout')">
        <i class="fas fa-sign-out-alt"></i> Logout
      </button>
    </aside>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  isOpen: Boolean,
  currentPath: String,
})

defineEmits(['close', 'navigate', 'logout'])

const menuItems = [
  { path: 'dashboard', label: 'Dashboard', icon: 'fas fa-home' },
  { path: 'home', label: 'Home', icon: 'fas fa-globe' },
  { path: 'gallery', label: 'Gallery', icon: 'fas fa-images' },
  { path: 'settings', label: 'Settings', icon: 'fas fa-cog' },
]
</script>

<style scoped>
.overlay {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1500;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.sidebar {
  width: 280px;
  height: 100vh;
  background: linear-gradient(180deg, #000 0%, #1a1a1a 100%);
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  box-shadow: 2px 0 20px rgba(var(--theme-color-rgb, 255, 215, 0), 0.1);
  position: fixed;
  top: 0;
  left: 0;
  overflow-y: auto;
  z-index: 1800;
  transition: left 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-thumb {
  background: rgba(var(--theme-color-rgb, 255, 215, 0), 0.3);
  border-radius: 10px;
}

.brand {
  text-align: center;
  margin-bottom: 2.5rem;
}

.brand .logo {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 25px rgba(var(--theme-color-rgb, 255, 215, 0), 0.5);
  margin-bottom: 1rem;
}

.brand h1 {
  color: var(--theme-color, #ffd700);
  font-size: 1.4rem;
  font-weight: 700;
  letter-spacing: 1px;
}

.menu {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.menu a {
  color: #ccc;
  text-decoration: none;
  padding: 14px 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
  font-weight: 500;
}

.menu a i {
  margin-right: 12px;
  width: 22px;
  font-size: 1.1rem;
}

.menu a:hover {
  background: rgba(var(--theme-color-rgb, 255, 215, 0), 0.15);
  color: var(--theme-color, #ffd700);
  transform: translateX(8px);
}

.menu a.active {
  background: var(--theme-color, #ffd700);
  color: #000;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(var(--theme-color-rgb, 255, 215, 0), 0.3);
}

.logout-btn {
  background: var(--theme-color, #ffd700);
  border: none;
  padding: 14px;
  color: #000;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 1rem;
}

.logout-btn:hover {
  filter: brightness(1.15);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(var(--theme-color-rgb, 255, 215, 0), 0.4);
}

@media (max-width: 768px) {
  .sidebar {
    left: -280px;
  }

  .sidebar.open {
    left: 0;
  }
}
</style>
