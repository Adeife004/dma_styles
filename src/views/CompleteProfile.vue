<template>
  <div class="profile-wrapper">
    <div class="profile-container" :class="{ loaded: isLoaded }">
      <div class="profile-card">
        <div class="profile-header">
          <div class="profile-icon">
            {{ userInitial }}
          </div>
          <h2>Complete Your Profile</h2>
          <p>Hello {{ userName }}! Please provide additional information.</p>
        </div>

        <form @submit.prevent="completeProfile">
          <!-- First Name + Last Name -->
          <div class="form-row">
            <div class="form-group">
              <label for="firstName">First Name *</label>
              <input
                id="firstName"
                v-model="firstName"
                type="text"
                placeholder="Enter your first name"
                required
              />
            </div>

            <div class="form-group">
              <label for="lastName">Last Name *</label>
              <input
                id="lastName"
                v-model="lastName"
                type="text"
                placeholder="Enter your last name"
                required
              />
            </div>
          </div>

          <!-- Phone Number -->
          <div class="form-group">
            <label for="phoneNumber">Phone Number *</label>
            <input
              id="phoneNumber"
              v-model="phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              required
            />
          </div>

          <!-- Address -->
          <div class="form-group">
            <label for="address">Address *</label>
            <input
              id="address"
              v-model="address"
              type="text"
              placeholder="Enter your address"
              required
            />
          </div>

          <button class="btn" type="submit" :disabled="loading">
            {{ loading ? 'Saving...' : 'Complete Profile' }}
          </button>
        </form>
      </div>
    </div>

    <!-- Loader -->
    <div v-if="loading" class="loader-overlay">
      <div class="loader"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { auth, db } from '../firebase'
import { ref as dbRef, set, get } from 'firebase/database'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()
const isLoaded = ref(false)
const loading = ref(false)
const firstName = ref('')
const lastName = ref('')
const phoneNumber = ref('')
const address = ref('')
const userName = ref('')
const userInitial = ref('U')

onMounted(async () => {
  const user = auth.currentUser

  if (!user) {
    router.push('/auth')
    return
  }

  // Check if profile is already complete
  const userRef = dbRef(db, `users/${user.uid}`)
  const snapshot = await get(userRef)

  if (snapshot.exists()) {
    const userData = snapshot.val()
    if (userData.phoneNumber && userData.address) {
      // Profile already complete, redirect to dashboard
      router.push('/dashboard')
      return
    }
  }

  // Pre-fill available data from Google/Facebook
  userName.value = user.displayName || 'User'
  userInitial.value = userName.value.charAt(0).toUpperCase()

  // Try to split display name into first and last name
  if (user.displayName) {
    const nameParts = user.displayName.split(' ')
    firstName.value = nameParts[0] || ''
    lastName.value = nameParts.slice(1).join(' ') || ''
  }

  isLoaded.value = true
})

async function completeProfile() {
  loading.value = true
  try {
    const user = auth.currentUser

    if (!user) {
      Swal.fire({
        icon: 'error',
        title: 'Authentication Error',
        text: 'User not authenticated. Please sign in again.',
        confirmButtonColor: '#000000',
      })
      router.push('/auth')
      return
    }

    // Save complete profile to database
    const userRef = dbRef(db, `users/${user.uid}`)
    await set(userRef, {
      firstName: firstName.value,
      lastName: lastName.value,
      email: user.email,
      phoneNumber: phoneNumber.value,
      address: address.value,
      provider: user.providerData[0]?.providerId || 'unknown',
      createdAt: new Date().toISOString(),
    })

    Swal.fire({
      icon: 'success',
      title: 'Profile Completed! 🎉',
      html: `
        <p style="font-size:15px;">Your profile has been saved successfully.</p>
        <p>Welcome to <strong>DMA Styles</strong>!</p>
      `,
      showConfirmButton: true,
      confirmButtonText: 'Go to Dashboard',
      confirmButtonColor: '#000000',
      background: '#ffffff',
      color: '#222',
      allowOutsideClick: false,
    }).then(() => {
      router.push('/dashboard')
    })
  } catch (error) {
    console.error('Error completing profile:', error)
    Swal.fire({
      icon: 'error',
      title: 'Save Failed',
      text: error.message,
      confirmButtonColor: '#000000',
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.profile-wrapper {
  background: linear-gradient(135deg, #000, #1a1a1a);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 2rem;
}

.profile-container {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
  width: 100%;
  max-width: 500px;
}

.profile-container.loaded {
  opacity: 1;
  transform: translateY(0);
}

.profile-card {
  background: #111;
  padding: 3rem 2.5rem;
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.2);
}

.profile-header {
  text-align: center;
  margin-bottom: 2.5rem;
}

.profile-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(135deg, #ffd700, #d4af37);
  color: #000;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  margin: 0 auto 1.5rem;
  box-shadow: 0 4px 15px rgba(255, 215, 0, 0.3);
}

.profile-header h2 {
  color: #ffd700;
  margin-bottom: 0.5rem;
  font-size: 1.8rem;
}

.profile-header p {
  color: #ccc;
  font-size: 0.95rem;
}

.form-row {
  display: flex;
  gap: 15px;
  margin-bottom: 1rem;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
}

label {
  font-size: 0.9rem;
  color: #ccc;
  margin-bottom: 0.5rem;
}

input {
  background: #2b2b2b;
  border: 1px solid #444;
  padding: 12px;
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s;
}

input:focus {
  border-color: #ffd700;
  outline: none;
  box-shadow: 0 0 8px rgba(255, 215, 0, 0.3);
}

.btn {
  width: 100%;
  background: #ffd700;
  border: none;
  padding: 12px;
  color: #000;
  border-radius: 25px;
  margin-top: 1.5rem;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s;
}

.btn:hover:not(:disabled) {
  background: #917f16;
  color: #f1f1f1;
  transform: translateY(-2px);
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Loader Overlay */
.loader-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader {
  border: 5px solid #222;
  border-top: 5px solid #ffd700;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .form-row {
    flex-direction: column;
  }

  .profile-card {
    padding: 2rem 1.5rem;
  }

  .profile-icon {
    width: 70px;
    height: 70px;
    font-size: 1.8rem;
  }

  .profile-header h2 {
    font-size: 1.5rem;
  }
}
</style>
