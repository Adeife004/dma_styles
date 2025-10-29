<template>
  <div class="dashboard-wrapper" data-aos="fade-in" data-aos-duration="800">
    <!-- MOBILE MENU TOGGLE -->
    <button class="menu-toggle" @click="toggleSidebar">
      <i :class="sidebarOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
    </button>

    <!-- SIDEBAR (COLLAPSIBLE ON MOBILE) -->
    <aside
      class="sidebar"
      :class="{ open: sidebarOpen }"
      data-aos="fade-right"
      data-aos-delay="200"
    >
      <div class="brand">
        <img src="../assets/logo.jpg" alt="DMA Styles Logo" class="logo" />
        <h1>DMA Styles</h1>
      </div>

      <nav class="menu">
        <router-link to="/dashboard" class="active">
          <i class="fas fa-home"></i> Dashboard
        </router-link>
        <router-link to="/home" class="home-link"> <i class="fas fa-globe"></i> Home </router-link>
        <router-link to="/orders"> <i class="fas fa-box"></i> Orders </router-link>
        <router-link to="/measurements"> <i class="fas fa-ruler"></i> Measurements </router-link>
        <router-link to="/gallery"> <i class="fas fa-images"></i> Gallery </router-link>
        <router-link to="/profile"> <i class="fas fa-user"></i> Profile </router-link>
        <router-link to="/settings"> <i class="fas fa-cog"></i> Settings </router-link>
      </nav>

      <button class="logout-btn" @click="logoutUser">
        <i class="fas fa-sign-out-alt"></i> Logout
      </button>
    </aside>

    <!-- Overlay (for mobile) -->
    <div v-if="sidebarOpen" class="overlay" @click="closeSidebar"></div>

    <!-- MAIN CONTENT -->
    <main class="main-content" data-aos="fade-up" data-aos-delay="400">
      <!-- topbar -->
      <header class="topbar" data-aos="zoom-in" data-aos-delay="500">
        <!-- topbar-left -->
        <div class="topbar-left">
          <h2>Welcome, {{ userName }}</h2>
          <p class="sub">Here's what's happening with your fashion today</p>
        </div>

        <!-- topbar-right -->
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

      <!-- dashboard content -->
      <section v-else class="content">
        <!-- STATS GRID -->
        <div class="stats-grid" data-aos="fade-up" data-aos-delay="600">
          <!-- stat-card -->
          <div class="stat-card">
            <div class="stat-icon orders">
              <i class="fas fa-shopping-bag"></i>
            </div>
            <div class="stat-details">
              <h4>Total Orders</h4>
              <p class="stat-value">{{ totalOrders }}</p>
              <span class="stat-change positive">+12% from last month</span>
            </div>
          </div>
          <!-- stat-card -->
          <div class="stat-card">
            <div class="stat-icon pending">
              <i class="fas fa-clock"></i>
            </div>
            <div class="stat-details">
              <h4>Pending</h4>
              <p class="stat-value">{{ pendingOrders }}</p>
              <span class="stat-change">In progress</span>
            </div>
          </div>
          <!-- stat-card -->
          <div class="stat-card">
            <div class="stat-icon completed">
              <i class="fas fa-check-circle"></i>
            </div>
            <div class="stat-details">
              <h4>Completed</h4>
              <p class="stat-value">{{ completedOrders }}</p>
              <span class="stat-change positive">+8% this week</span>
            </div>
          </div>
          <!-- stat-card -->
          <div class="stat-card">
            <div class="stat-icon revenue">
              <i class="fas fa-dollar-sign"></i>
            </div>
            <div class="stat-details">
              <h4>Total Spent</h4>
              <p class="stat-value">₦{{ totalSpent.toLocaleString() }}</p>
              <span class="stat-change positive">+15% growth</span>
            </div>
          </div>
        </div>

        <!-- QUICK ACTIONS -->
        <div class="quick-actions-section" data-aos="fade-up" data-aos-delay="700">
          <h3><i class="fas fa-bolt"></i> Quick Actions</h3>
          <!-- action-buttons -->
          <div class="action-buttons">
            <!-- new-order -->
            <button class="action-btn new-order" @click="router.push('/new-order')">
              <i class="fas fa-plus"></i>
              <span>New Order</span>
            </button>
            <!-- measurements -->
            <button class="action-btn measurements" @click="router.push('/measurements')">
              <i class="fas fa-ruler"></i>
              <span>Measurements</span>
            </button>
            <!-- gallery -->
            <button class="action-btn gallery" @click="router.push('/gallery')">
              <i class="fas fa-images"></i>
              <span>View Gallery</span>
            </button>
            <!-- contact -->
            <button class="action-btn contact" @click="router.push('/contact')">
              <i class="fas fa-phone"></i>
              <span>Contact Us</span>
            </button>
          </div>
        </div>

        <!-- RECENT ORDERS & NOTIFICATIONS -->
        <div class="two-column-grid" data-aos="fade-up" data-aos-delay="800">
          <!-- RECENT ORDERS -->
          <div class="card orders-card">
            <!-- card-header -->
            <div class="card-header">
              <h3><i class="fas fa-box"></i> Recent Orders</h3>
              <router-link to="/orders" class="view-all">View All →</router-link>
            </div>

            <!-- empty-state -->
            <div v-if="recentOrders.length === 0" class="empty-state">
              <i class="fas fa-inbox"></i>
              <p>No orders yet</p>
              <button @click="router.push('/new-order')" class="btn-primary">
                Create Your First Order
              </button>
            </div>

            <!-- orders-list -->
            <div v-else class="orders-list">
              <div
                v-for="order in recentOrders"
                :key="order.id"
                class="order-item"
                @click="router.push(`/orders/${order.id}`)"
              >
                <div class="order-icon">
                  <i class="fas fa-tshirt"></i>
                </div>
                <div class="order-info">
                  <h4>{{ order.item }}</h4>
                  <p class="order-id">Order #{{ order.id }}</p>
                  <p class="order-date">{{ order.date }}</p>
                </div>
                <div class="order-status">
                  <span :class="'status-badge status-' + order.status">
                    {{ order.status }}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <!-- NOTIFICATIONS -->
          <div class="card notifications-card">
            <!-- card-header -->
            <div class="card-header">
              <h3><i class="fas fa-bell"></i> Notifications</h3>
              <span class="notification-badge">{{ notifications.length }}</span>
            </div>

            <!-- empty-space -->
            <div v-if="notifications.length === 0" class="empty-state">
              <i class="fas fa-bell-slash"></i>
              <p>No new notifications</p>
            </div>

            <!-- notifications-list -->
            <div v-else class="notifications-list">
              <div
                v-for="notif in notifications"
                :key="notif.id"
                class="notification-item"
                :class="{ unread: !notif.read }"
              >
                <div class="notif-icon" :class="notif.type">
                  <i :class="notif.icon"></i>
                </div>
                <div class="notif-content">
                  <p>{{ notif.message }}</p>
                  <span class="notif-time">{{ notif.time }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- PROFILE OVERVIEW -->
        <div class="card profile-overview" data-aos="fade-up" data-aos-delay="900">
          <h3><i class="fas fa-user-circle"></i> Profile Overview</h3>

          <!-- profile-details -->
          <div class="profile-details">
            <!-- profile-item -->
            <div class="profile-item">
              <i class="fas fa-envelope"></i>
              <div>
                <label>Email</label>
                <p>{{ userEmail }}</p>
              </div>
            </div>
            <!-- profile-item -->
            <div class="profile-item">
              <i class="fas fa-phone"></i>
              <div>
                <label>Phone</label>
                <p>{{ userPhone || 'Not provided' }}</p>
              </div>
            </div>
            <!-- profile-item -->
            <div class="profile-item">
              <i class="fas fa-map-marker-alt"></i>
              <div>
                <label>Address</label>
                <p>{{ userAddress || 'Not provided' }}</p>
              </div>
            </div>
            <!-- profile-item -->
            <div class="profile-item">
              <i class="fas fa-calendar"></i>
              <div>
                <label>Member Since</label>
                <p>{{ memberSince }}</p>
              </div>
            </div>
          </div>
          <button class="btn-secondary" @click="router.push('/completeprofile')">
            Edit Profile
          </button>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref as dbRef, get } from 'firebase/database'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Swal from 'sweetalert2'

const router = useRouter()
const loading = ref(true)
const userName = ref('User')
const userEmail = ref('')
const userPhone = ref('')
const userAddress = ref('')
const memberSince = ref('')
const sidebarOpen = ref(false)

// Stats
const totalOrders = ref(24)
const pendingOrders = ref(5)
const completedOrders = ref(19)
const totalSpent = ref(450000)

// mobile menu toggle
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
}

function closeSidebar() {
  sidebarOpen.value = false
}

// Recent orders data
const recentOrders = ref([
  {
    id: '1024',
    item: 'Agbada - Royal Blue',
    status: 'completed',
    date: 'Oct 20, 2025',
  },
  {
    id: '1023',
    item: 'Senator Suit - Black',
    status: 'pending',
    date: 'Oct 18, 2025',
  },
  {
    id: '1022',
    item: 'Kaftan - White',
    status: 'processing',
    date: 'Oct 15, 2025',
  },
])

// Notifications
const notifications = ref([
  {
    id: 1,
    message: 'Your order #1024 has been completed',
    time: '2 hours ago',
    icon: 'fas fa-check-circle',
    type: 'success',
    read: false,
  },
  {
    id: 2,
    message: 'New design uploaded to gallery',
    time: '5 hours ago',
    icon: 'fas fa-images',
    type: 'info',
    read: false,
  },
  {
    id: 3,
    message: 'Measurement update required for order #1023',
    time: '1 day ago',
    icon: 'fas fa-ruler',
    type: 'warning',
    read: true,
  },
])

// User initials for avatar
const userInitials = computed(() => {
  if (!userName.value || userName.value === 'User') return 'U'
  const names = userName.value.split(' ')
  if (names.length >= 2) {
    return (names[0][0] + names[1][0]).toUpperCase()
  }
  return userName.value[0].toUpperCase()
})

// Fetch user data
onMounted(() => {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
  })

  // Fetch user data
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      userEmail.value = user.email

      // Try to get name from Google or Database
      if (user.displayName) {
        //  Google sign-in user
        userName.value = user.displayName
      } else {
        // Email-password signup user (fetch from Realtime DB)
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

      // Simulate data loading
      setTimeout(() => {
        loading.value = false
      }, 1000)
    } else {
      router.push('/')
    }
  })
})

// Logout function
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
    background: '#ffffff',
    color: '#222',
  })

  if (result.isConfirmed) {
    try {
      // Sign out from Firebase (if you're using it)
      await signOut(auth)

      //  Remove user data from localStorage
      localStorage.removeItem('user')

      await Swal.fire({
        title: 'Logged Out',
        text: 'You have been successfully logged out.',
        icon: 'success',
        confirmButtonColor: '#000000',
        timer: 1500,
        showConfirmButton: false,
      })

      // Redirect to home (or login page)
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
  scrollbar-width: none;
}

.dashboard-wrapper {
  display: flex;
  min-height: 100vh;
  background: #111;
  color: #fff;
  position: relative;
}

/* SIDEBAR */
.sidebar {
  position: sticky;
  top: 0;
  left: 0;
  width: 25%;
  height: 100vh;
  background: linear-gradient(180deg, #000, #1a1a1a);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.1);
  transition: all 0.4s ease-in-out;
  overflow-x: hidden;
  z-index: 1000;
}

.brand {
  text-align: center;
  margin-bottom: 2rem;
}

.brand .logo {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.4);
}

.brand h1 {
  color: #ffd700;
  font-size: 1.3rem;
  margin-top: 12px;
  font-weight: 700;
}

.menu {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  overflow-y: auto;
}

.menu a {
  color: #ccc;
  text-decoration: none;
  padding: 12px 15px;
  border-radius: 12px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  font-size: 0.95rem;
}

.menu a i {
  margin-right: 12px;
  width: 20px;
}

.menu a:hover {
  background: rgba(255, 215, 0, 0.1);
  color: #ffd700;
  transform: translateX(5px);
  overflow-x: hidden;
}

.menu .router-link-active {
  background: #ffd700;
  color: #000;
  font-weight: 600;
}

.logout-btn {
  background: #ffd700;
  border: none;
  padding: 12px 15px;
  color: #000;
  font-weight: 600;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-top: 1rem;
}

.logout-btn:hover {
  background: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}

/* MAIN CONTENT */
.main-content {
  flex: 1;
  width: 75%;
  padding: 2rem;
  background: #0f0f0f;
  overflow-x: hidden;
  min-height: 100vh;
}

/* TOPBAR */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #222;
}

.topbar h2 {
  color: #ffd700;
  font-size: 1.3rem;
  margin-bottom: 5px;
  font-weight: 700;
}

.topbar .sub {
  color: #999;
  font-size: 0.95rem;
}

.topbar-right .user-profile {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #1a1a1a;
  padding: 10px 15px;
  border-radius: 50px;
  border: 1px solid #333;
}

.avatar {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd700, #d4af37);
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 1.1rem;
}

.user-info {
  display: flex;
  flex-direction: column;
}

.user-name {
  font-weight: 600;
  color: #fff;
  font-size: 0.85rem;
}

.user-email {
  font-size: 0.7rem;
  color: #999;
}

/* LOADING STATE */
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem;
  color: #ffd700;
}

.spinner {
  border: 4px solid #222;
  border-top: 4px solid #ffd700;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
/* content */
.content {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

/* STATS GRID */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  background: linear-gradient(135deg, #1a1a1a, #222);
  border: 1px solid #333;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  transition: all 0.3s;
  cursor: pointer;
}

.stat-card:hover {
  border-color: #ffd700;
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(255, 215, 0, 0.2);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.stat-icon.orders {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

.stat-icon.pending {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}

.stat-icon.completed {
  background: rgba(33, 150, 243, 0.2);
  color: #2196f3;
}

.stat-icon.revenue {
  background: rgba(255, 215, 0, 0.2);
  color: #ffd700;
}

.stat-details h4 {
  color: #999;
  font-size: 0.85rem;
  font-weight: 500;
  margin-bottom: 5px;
}

.stat-value {
  font-size: 1.8rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 5px;
}

.stat-change {
  font-size: 0.8rem;
  color: #666;
}

.stat-change.positive {
  color: #4caf50;
}

/* QUICK ACTIONS */
.quick-actions-section {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 16px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  height: 45vh;
}

.quick-actions-section h3 {
  color: #ffd700;
  margin-bottom: 1rem;
  font-size: 1.1rem;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.action-btn {
  background: #222;
  border: 1px solid #333;
  padding: 1rem;
  border-radius: 12px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.action-btn i {
  font-size: 1.5rem;
  margin-bottom: 5px;
}

.action-btn:hover {
  background: #ffd700;
  color: #000;
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(255, 215, 0, 0.3);
}

/* TWO COLUMN GRID */
.two-column-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.card {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 16px;
  padding: 1.5rem;
  transition: all 0.3s;
}

.card:hover {
  border-color: #ffd700;
  transform: translateY(-3px);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.card-header h3 {
  color: #ffd700;
  font-size: 1.1rem;
}

.view-all {
  color: #ffd700;
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.view-all:hover {
  color: #fff;
}

/* Empty state styling */
.empty-state {
  text-align: center;
  padding: 2rem;
  color: #aaa;
}

.empty-state i {
  font-size: 2rem;
  color: #ffd700;
  margin-bottom: 0.5rem;
}

.empty-state .btn-primary {
  background: #ffd700;
  color: #000;
  border: none;
  border-radius: 10px;
  padding: 0.8rem 1.2rem;
  font-weight: 600;
  margin-top: 0.8rem;
  cursor: pointer;
  transition: all 0.3s;
}

.empty-state .btn-primary:hover {
  background: #fff;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
}

/* ORDERS LIST */
.orders-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.order-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: #222;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.order-item:hover {
  background: #2a2a2a;
  transform: translateX(5px);
}

.order-icon {
  width: 45px;
  height: 45px;
  border-radius: 10px;
  background: rgba(255, 215, 0, 0.2);
  color: #ffd700;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.order-info {
  flex: 1;
}

.order-info h4 {
  color: #fff;
}

/* Profile overview polish */
.profile-overview {
  margin-top: -70%;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.1);
  border: 1px solid #333;
  margin-bottom: 2rem;
}

.profile-overview h3 {
  color: #ffd700;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.profile-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #222;
}

.profile-item i {
  color: #ffd700;
  font-size: 1.2rem;
}

.profile-item label {
  color: #999;
  font-size: 0.85rem;
}

.profile-item p {
  color: #fff;
  font-weight: 500;
}

.btn-secondary {
  background: #222;
  border: 1px solid #333;
  color: #fff;
  padding: 10px 15px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 1rem;
}

/* Notification Styling */
.notification-badge {
  background: #f44336;
  color: #fff;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 600;
}

.card ul {
  list-style: none;
  padding: 0;
  color: #ccc;
}

.card li {
  margin-bottom: 8px;
}

/* MOBILE STYLES */
.menu-toggle {
  display: none;
  position: fixed;
  top: 15px;
  left: 15px;
  border: none;
  color: #ffd700;
  font-size: 1.5rem;
  z-index: 1100;
  background: none;
  cursor: pointer;
}

.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  transition: opacity 0.3s ease;
}

@media (max-width: 1024px) {
  .topbar {
    flex-direction: column;
    gap: 1rem;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    width: 75%;
    max-width: 320px;
    height: 100%;
    background-color: #111827;
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
  }

  /* Show sidebar when open */
  .sidebar.open {
    transform: translateX(0);
  }

  .menu-toggle {
    display: block;
  }

  .main-content {
    width: 100%;
    padding: 5rem 1rem 2rem;
  }

  .topbar h2 {
    font-size: 1.4rem;
  }

  .content {
    grid-template-columns: 1fr;
  }

  .quick-actions-section {
    height: 65vh;
  }

  .profile-overview {
    margin-top: 0;
  }

  body.sidebar-open {
    overflow: hidden;
  }
}

@media (max-width: 480px) {
  .brand h1 {
    font-size: 1rem;
  }

  .logout-btn {
    padding: 8px 10px;
    font-size: 0.9rem;
  }

  .menu a {
    padding: 8px 10px;
    font-size: 0.9rem;
  }
}
</style>
