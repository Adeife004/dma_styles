<template>
  <div class="dashboard-wrapper">
    <!-- MOBILE MENU TOGGLE -->
    <button class="menu-toggle" @click="toggleSidebar" :class="{ active: sidebarOpen }">
      <i :class="sidebarOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
    </button>

    <!-- SIDEBAR -->
    <Sidebar
      :is-open="sidebarOpen"
      :current-path="currentView"
      @close="closeSidebar"
      @navigate="navigateTo"
      @logout="logoutUser"
    />

    <!-- MAIN CONTENT -->
    <main class="main-content">
      <!-- TOPBAR -->
      <header class="topbar">
        <div class="topbar-left">
          <h2>Welcome, {{ userName }}</h2>
          <p class="sub">Here's what's happening with your fashion today</p>
        </div>

        <div class="topbar-right">
          <div class="user-profile">
            <div class="avatar">{{ userInitials }}</div>
            <div class="user-info">
              <p class="user-name">{{ userName }}</p>
              <p class="user-email">{{ userEmail }}</p>
            </div>
          </div>
        </div>
      </header>

      <!-- LOADING STATE -->
      <div v-if="loading" class="loading-state">
        <div class="spinner"></div>
        <p>Loading your dashboard...</p>
      </div>

      <!-- DYNAMIC CONTENT BASED ON CURRENT VIEW -->
      <component
        v-else
        :is="currentComponent"
        :user-email="userEmail"
        :user-phone="userPhone"
        :user-address="userAddress"
        :member-since="memberSince"
        @navigate="navigateTo"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref as dbRef, get } from 'firebase/database'
import Swal from 'sweetalert2'

import Sidebar from '../components/Dashboard/Sidebar.vue'
import DashboardContent from '../components/Dashboard/DashboardContent.vue'
import SettingsPage from '../components/Dashboard/Settings.vue'

const router = useRouter()
const loading = ref(true)
const userName = ref('User')
const userEmail = ref('')
const userPhone = ref('')
const userAddress = ref('')
const memberSince = ref('')
const sidebarOpen = ref(false)
const currentView = ref('dashboard')

const components = {
  dashboard: DashboardContent,
  settings: SettingsPage,
}

const currentComponent = computed(() => components[currentView.value])

const userInitials = computed(() => {
  if (!userName.value || userName.value === 'User') return 'U'
  const names = userName.value.split(' ')
  if (names.length >= 2) {
    return (names[0][0] + names[1][0]).toUpperCase()
  }
  return userName.value[0].toUpperCase()
})

function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function closeSidebar() {
  sidebarOpen.value = false
}

function navigateTo(view) {
  if (view === 'home') {
    router.push('/home')
  } else {
    currentView.value = view
    closeSidebar()
  }
}

onMounted(() => {
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userEmail.value = user.email

      if (user.displayName) {
        userName.value = user.displayName
      } else {
        const db = getDatabase()
        const userRef = dbRef(db, `users/${user.uid}`)
        const snapshot = await get(userRef)
        if (snapshot.exists()) {
          const userData = snapshot.val()
          userName.value = `${userData.firstName} ${userData.lastName}`
          userPhone.value = userData.phoneNumber || ''
          userAddress.value = userData.address || ''
        } else {
          userName.value = 'DMA User'
        }
      }

      setTimeout(() => {
        loading.value = false
      }, 1000)
    } else {
      router.push('/')
    }
  })
})

async function logoutUser() {
  const result = await Swal.fire({
    title: 'Logout Confirmation',
    text: 'Are you sure you want to logout?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes, Logout',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#000000',
    cancelButtonColor: '#888',
  })

  if (result.isConfirmed) {
    try {
      await signOut(auth)
      localStorage.removeItem('user')
      await Swal.fire({
        title: 'Logged Out',
        text: 'You have been successfully logged out.',
        icon: 'success',
        confirmButtonColor: '#000000',
        timer: 1500,
        showConfirmButton: false,
      })
      router.push('/home')
    } catch (error) {
      console.error('Logout error:', error)
      Swal.fire({
        title: 'Error',
        text: 'Something went wrong while logging out.',
        icon: 'error',
        confirmButtonColor: '#000000',
      })
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.dashboard-wrapper {
  display: flex;
  min-height: 100vh;
  background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%);
  color: #fff;
  position: relative;
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    sans-serif;
}

/* MOBILE MENU TOGGLE */
.menu-toggle {
  display: none;
  position: fixed;
  top: 1rem;
  left: 1rem;
  background: var(--theme-color, #ffd700);
  border: none;
  color: #000;
  font-size: 1.4rem;
  z-index: 2000;
  cursor: pointer;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(var(--theme-color-rgb, 255, 215, 0), 0.5);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.menu-toggle:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(var(--theme-color-rgb, 255, 215, 0), 0.6);
  filter: brightness(1.1);
}

.menu-toggle:active {
  transform: translateY(0);
}

.menu-toggle.active {
  background: linear-gradient(135deg, #ff4444 0%, #ff6666 100%);
  color: #fff;
}

/* MAIN CONTENT */
.main-content {
  margin-left: 280px;
  flex: 1;
  padding: 2rem;
  background: #0f0f0f;
  overflow-x: hidden;
  min-height: 100vh;
  transition: margin-left 0.3s ease;
}

/* TOPBAR */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: linear-gradient(135deg, #1a1a1a 0%, #252525 100%);
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(var(--theme-color-rgb, 255, 215, 0), 0.1);
}

.topbar-left h2 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: var(--theme-color, #ffd700);
}

.topbar-left .sub {
  color: #999;
  font-size: 0.95rem;
  font-weight: 400;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.user-profile {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1.25rem;
  background: rgba(var(--theme-color-rgb, 255, 215, 0), 0.05);
  border-radius: 50px;
  border: 1px solid rgba(var(--theme-color-rgb, 255, 215, 0), 0.2);
  transition: all 0.3s ease;
}

.user-profile:hover {
  background: rgba(var(--theme-color-rgb, 255, 215, 0), 0.1);
  border-color: rgba(var(--theme-color-rgb, 255, 215, 0), 0.3);
}

.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: var(--theme-color, #ffd700);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
  color: #000;
  box-shadow: 0 4px 15px rgba(var(--theme-color-rgb, 255, 215, 0), 0.3);
}

.user-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.user-name {
  font-weight: 600;
  font-size: 0.95rem;
  color: #fff;
}

.user-email {
  font-size: 0.85rem;
  color: #888;
}

/* LOADING STATE */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  gap: 1.5rem;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(var(--theme-color-rgb, 255, 215, 0), 0.2);
  border-top-color: var(--theme-color, #ffd700);
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.loading-state p {
  font-size: 1.1rem;
  color: #999;
  font-weight: 500;
}

/* RESPONSIVE DESIGN */
@media (max-width: 1024px) {
  .main-content {
    margin-left: 240px;
  }
}

@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }

  .main-content {
    margin-left: 0;
    padding: 5.5rem 1.5rem 2rem 1.5rem;
  }

  .topbar {
    flex-direction: column;
    gap: 1.5rem;
    padding: 1.5rem;
  }

  .topbar-left h2 {
    font-size: 1.5rem;
  }

  .topbar-left .sub {
    font-size: 0.9rem;
  }

  .user-profile {
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .main-content {
    padding: 5rem 1rem 1.5rem 1rem;
  }

  .topbar {
    padding: 1rem;
  }

  .topbar-left h2 {
    font-size: 1.3rem;
  }

  .avatar {
    width: 40px;
    height: 40px;
    font-size: 1rem;
  }

  .user-name {
    font-size: 0.9rem;
  }

  .user-email {
    font-size: 0.8rem;
  }
}

/* SMOOTH ANIMATIONS */
@media (prefers-reduced-motion: no-preference) {
  * {
    transition:
      background-color 0.3s ease,
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }
}
</style>
