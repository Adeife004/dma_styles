<template>
  <div class="auth-wrapper" data-aos="fade-in">
    <div class="auth-container">
      <!-- Logo -->
      <div class="logo-container">
        <img src="../assets/logo.jpg" alt="DMA Styles" class="app-logo" />
      </div>

      <!-- Reset Password Card -->
      <div class="auth-card">
        <h2 class="title">Reset Password</h2>
        <p class="subtitle">Enter your email to receive a password reset link.</p>

        <form @submit.prevent="handleReset" class="auth-form">
          <div class="input-group">
            <label for="email">Email Address</label>
            <input
              type="email"
              id="email"
              v-model="email"
              required
              placeholder="Enter your registered email"
            />
          </div>

          <button type="submit" class="btn" :disabled="loading">
            <span v-if="!loading">Send Reset Link</span>
            <span v-else class="loader"></span>
          </button>
        </form>

        <div class="bottom-text">
          <p>
            Remembered your password?
            <router-link to="/auth" class="link">Sign In</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../firebase'
import Swal from 'sweetalert2'
import AOS from 'aos'
import 'aos/dist/aos.css'

const email = ref('')
const loading = ref(false)

AOS.init({
  duration: 1000,
  once: true,
})

async function handleReset() {
  if (!email.value) {
    Swal.fire({
      icon: 'warning',
      title: 'Email Required',
      text: 'Please enter your registered email address.',
      confirmButtonColor: '#000',
    })
    return
  }

  loading.value = true

  try {
    await sendPasswordResetEmail(auth, email.value)

    Swal.fire({
      icon: 'success',
      title: 'Email Sent',
      html: `
        <p>A password reset link has been sent to:</p>
        <strong>${email.value}</strong>
        <p style="margin-top:10px;">Check your inbox or spam folder to continue.</p>
      `,
      confirmButtonText: 'OK',
      confirmButtonColor: '#000',
      background: '#fff',
      color: '#222',
    })

    email.value = ''
  } catch (error) {
    let msg = 'Unable to send reset link.'
    if (error.code === 'auth/user-not-found') msg = 'No user found with this email.'
    if (error.code === 'auth/invalid-email') msg = 'Please enter a valid email address.'

    Swal.fire({
      icon: 'error',
      title: 'Reset Failed',
      text: msg,
      confirmButtonColor: '#000',
    })
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.auth-wrapper {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(145deg, #000, #111);
}

.auth-container {
  width: 90%;
  max-width: 420px;
  background: #fff;
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  text-align: center;
  animation: fadeIn 1.2s ease-in-out;
}

.logo-container {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.app-logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
}

.title {
  font-size: 1.7rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: #000;
}

.subtitle {
  color: #555;
  margin-bottom: 1.8rem;
  font-size: 0.95rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
}

.input-group {
  text-align: left;
}

.input-group label {
  font-weight: 600;
  color: #222;
  display: block;
  margin-bottom: 6px;
}

.input-group input {
  width: 100%;
  padding: 12px 14px;
  border: 1.5px solid #ddd;
  border-radius: 10px;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.input-group input:focus {
  border-color: #000;
  outline: none;
}

.btn {
  width: 100%;
  background: #000;
  color: #fff;
  padding: 12px;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s;
}

.btn:hover {
  background: #111;
}

.loader {
  width: 22px;
  height: 22px;
  border: 3px solid #fff;
  border-top: 3px solid transparent;
  border-radius: 50%;
  display: inline-block;
  animation: spin 0.8s linear infinite;
}

.bottom-text {
  margin-top: 1.5rem;
  color: #333;
  font-size: 0.9rem;
}

.link {
  color: #000;
  font-weight: 600;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
