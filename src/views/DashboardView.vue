<template>
  <div class="dashboard-wrapper" data-aos="fade-in" data-aos-duration="800">
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
        <router-link to="/profile"> <i class="fas fa-user"></i> Profile </router-link>
        <router-link to="/settings"> <i class="fas fa-cog"></i> Settings </router-link>
      </nav>

      <button class="logout-btn" @click="logoutUser">
        <i class="fas fa-sign-out-alt"></i> Logout
      </button>
    </aside>

    <!-- MOBILE MENU TOGGLE -->
    <button class="menu-toggle" @click="sidebarOpen = !sidebarOpen">
      <i :class="sidebarOpen ? 'fas fa-times' : 'fas fa-bars'"></i>
    </button>

    <!-- MAIN CONTENT -->
    <main class="main-content" data-aos="fade-up" data-aos-delay="400">
      <header class="topbar" data-aos="zoom-in" data-aos-delay="500">
        <h2>Welcome, {{ userName }}</h2>
        <p class="sub">Your fashion dashboard</p>
      </header>

      <section class="content">
        <div class="card" data-aos="fade-up" data-aos-delay="600">
          <h3><i class="fas fa-user"></i> Profile Overview</h3>
          <p>Email: {{ userEmail }}</p>
        </div>

        <div class="card" data-aos="fade-up" data-aos-delay="800">
          <h3><i class="fas fa-bolt"></i> Recent Activities</h3>
          <ul>
            <li>New fabric order placed</li>
            <li>Measurements updated</li>
            <li>Design uploaded for client #245</li>
          </ul>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { getDatabase, ref as dbRef, get } from 'firebase/database'
import AOS from 'aos'
import 'aos/dist/aos.css'

const router = useRouter()
const userName = ref('User')
const userEmail = ref('')
const sidebarOpen = ref(false)

onMounted(() => {
  AOS.init({
    duration: 1000,
    easing: 'ease-in-out',
    once: true,
  })

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
        } else {
          userName.value = 'DMA User'
        }
      }
    } else {
      router.push('/')
    }
  })
})

async function logoutUser() {
  await signOut(auth)
  router.push('/')
}
</script>

<style scoped>
.dashboard-wrapper {
  display: flex;
  min-height: 100vh;
  background: #111;
  color: #fff;
  font-family: 'Poppins', sans-serif;
  position: relative;
}

/* SIDEBAR */
.sidebar {
  width: 250px;
  background: linear-gradient(180deg, #000, #1a1a1a);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 1rem;
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.1);
  transition: all 0.4s ease-in-out;
}

.brand {
  text-align: center;
}

.brand .logo {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 15px rgba(255, 215, 0, 0.3);
}

.brand h1 {
  color: #ffd700;
  font-size: 1.2rem;
  margin-top: 10px;
}

.menu {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.menu a {
  color: #ccc;
  text-decoration: none;
  padding: 10px 15px;
  border-radius: 10px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
}

.menu a i {
  margin-right: 10px;
}

.menu a:hover,
.menu .router-link-active {
  background: #ffd700;
  color: #000;
}

.logout-btn {
  background: #ffd700;
  border: none;
  padding: 10px 15px;
  color: #000;
  font-weight: 600;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s;
}

.logout-btn:hover {
  background: #fff;
}

/* MAIN CONTENT */
.main-content {
  flex: 1;
  padding: 2rem;
  background: #181818;
  overflow-x: hidden;
}

.topbar h2 {
  color: #ffd700;
  font-size: 1.8rem;
  margin-bottom: 5px;
}

.topbar .sub {
  color: #aaa;
  font-size: 0.95rem;
}

.content {
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}

.card {
  background: #222;
  border: 1px solid #333;
  border-radius: 15px;
  padding: 1.5rem;
  transition: all 0.3s;
}

.card:hover {
  border-color: #ffd700;
  transform: translateY(-3px);
}

.card h3 {
  color: #ffd700;
  margin-bottom: 1rem;
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
  position: absolute;
  top: 15px;
  left: 15px;
  background: transparent;
  border: none;
  color: #ffd700;
  font-size: 1.5rem;
  z-index: 1001;
}

@media (max-width: 1024px) {
  .dashboard-wrapper {
    flex-direction: column;
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: -250px;
    height: 100%;
    z-index: 1000;
  }

  .sidebar.open {
    left: 0;
  }

  .menu-toggle {
    display: block;
  }

  .main-content {
    padding: 5rem 1rem 2rem;
  }

  .topbar h2 {
    font-size: 1.4rem;
  }

  .content {
    grid-template-columns: 1fr;
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
