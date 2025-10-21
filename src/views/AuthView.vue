<template>
  <!-- auth-wrapper -->
  <div class="auth-wrapper">
    <!-- auth-container -->
    <div class="auth-container" :class="{ 'flip-active': showSignup }">
      <!-- LEFT PANEL -->
      <div class="auth-panel">
        <div class="logo-container">
          <img src="../assets/logo.jpg" alt="Brand Logo" class="app-logo" />
        </div>

        <div class="panel-text">
          <h2 v-if="!showSignup">Welcome Back</h2>
          <h2 v-else>Hello Friend</h2>
          <p v-if="!showSignup">To stay connected, please log in with your personal information.</p>
          <p v-else>Enter your details and start your journey with us.</p>

          <button class="panel-btn" @click="toggleForm">
            {{ showSignup ? 'Sign In' : 'Sign Up' }}
          </button>
        </div>
      </div>

      <!-- RIGHT CARD -->
      <div class="auth-card">
        <!-- LOGIN FORM -->
        <form class="auth-face front-face" @submit.prevent="loginUser">
          <h2>Sign In</h2>

          <div class="social-container">
            <a href="#" id="facebookBtn" @click.prevent="facebookSignIn">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" id="googleBtn" @click.prevent="googleSignIn">
              <i class="fab fa-google"></i>
            </a>
            <a href="#"><i class="fab fa-apple"></i></a>
          </div>

          <p class="divider"><span>or</span></p>

          <label for="loginEmail">Email</label>
          <input
            id="loginEmail"
            v-model="loginEmail"
            type="email"
            placeholder="Enter your email"
            required
          />

          <label for="loginPassword">Password</label>
          <input
            id="loginPassword"
            v-model="loginPassword"
            type="password"
            placeholder="Enter your password"
            required
          />

          <button id="loginBtn" class="btn" type="submit">Login</button>
        </form>

        <!-- SIGNUP FORM -->
        <form class="auth-face back-face" @submit.prevent="signupUser">
          <h2>Create Account</h2>

          <div class="social-container">
            <a href="#" id="facebookBtn" @click.prevent="facebookSignIn">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" id="googleBtn" @click.prevent="googleSignIn">
              <i class="fab fa-google"></i>
            </a>
            <a href="#"><i class="fab fa-apple"></i></a>
          </div>

          <p class="divider"><span>or</span></p>

          <label for="firstName">First Name:</label>
          <input
            type="text"
            v-model="fname"
            id="firstName"
            placeholder="Enter Your First Name"
            required
          />

          <label for="lastName">Last Name:</label>
          <input
            type="text"
            v-model="lname"
            id="lastName"
            placeholder="Enter Your Last Name"
            required
          />

          <label for="signupEmail">Email</label>
          <input
            id="signupEmail"
            v-model="signupEmail"
            type="email"
            placeholder="Enter your email"
            required
          />

          <label for="signupPassword">Password</label>
          <input
            id="signupPassword"
            v-model="signupPassword"
            type="password"
            placeholder="Enter your password"
            required
          />

          <button id="signUpBtn" class="btn" type="submit">Sign Up</button>
        </form>
      </div>
    </div>

    <!-- Loader -->
    <div v-if="loading" class="loader-overlay">
      <div class="loader"></div>
    </div>

    <!-- Toast -->
    <div v-if="showToast" :class="['toast', toastType]">
      {{ toastMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '../firebase'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from 'firebase/auth'

// =======================
// Reactive Form State
// =======================
const showSignup = ref(true)
const fname = ref('')
const lname = ref('')
const signupEmail = ref('')
const signupPassword = ref('')
const loginEmail = ref('')
const loginPassword = ref('')

const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

// Loader & Toast
const loading = ref(false)
const toastMessage = ref('')
const showToast = ref(false)
const toastType = ref('success')

// =======================
// Toggle Between Forms
// =======================
function toggleForm() {
  showSignup.value = !showSignup.value
}

// =======================
// Reset Fields
// =======================
function resetFields() {
  fname.value = ''
  lname.value = ''
  signupEmail.value = ''
  signupPassword.value = ''
  loginEmail.value = ''
  loginPassword.value = ''
}

// =======================
// Toast Functions
// =======================
function showToastMessage(message, type = 'success') {
  toastMessage.value = message
  toastType.value = type
  showToast.value = true
  setTimeout(() => (showToast.value = false), 3000)
}

// =======================
// Handle Signup
// =======================
async function signupUser() {
  loading.value = true
  try {
    if (signupPassword.value.length < 6) {
      showToastMessage('Password must be at least 6 characters long.', 'error')
      return
    }

    await createUserWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
    showToastMessage(`Welcome ${fname.value}! Account created successfully.`, 'success')

    await signInWithEmailAndPassword(auth, signupEmail.value, signupPassword.value)
    showToastMessage(`You’re now signed in, ${fname.value}!`, 'info')

    resetFields()
    showSignup.value = false
  } catch (error) {
    showToastMessage(error.message, 'error')
  } finally {
    loading.value = false
  }
}

// =======================
// Handle Login
// =======================
async function loginUser() {
  loading.value = true
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail.value,
      loginPassword.value,
    )
    showToastMessage(`Welcome back, ${userCredential.user.email}!`, 'success')
  } catch (error) {
    showToastMessage(error.message, 'error')
  } finally {
    loading.value = false
  }
}

// =======================
// Google Sign-In
// =======================
async function googleSignIn() {
  loading.value = true
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user

    showToastMessage(`Signed in as ${user.displayName || 'User'} via Google!`, 'success')

    // Redirect to dashboard after sign-in
    setTimeout(() => {
      window.location.href = '/dashboard' // or your actual dashboard route
    }, 1200)
  } catch (error) {
    showToastMessage('Google Sign-In failed: ' + error.message, 'error')
  } finally {
    loading.value = false
  }
}

// =======================
// Facebook Sign-In
// =======================
async function facebookSignIn() {
  loading.value = true
  try {
    const result = await signInWithPopup(auth, facebookProvider)
    const user = result.user
    showToastMessage(`Signed in as ${user.displayName || 'User'} via Facebook!`, 'success')
  } catch (error) {
    showToastMessage('Facebook Sign-In failed: ' + error.message, 'error')
  } finally {
    loading.value = false
  }
}

// =======================
// Auth State Listener
// =======================
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Active user:', user.email)
  } else {
    console.log('No active user.')
  }
})
</script>

<style scoped>
/* =============================
   GLOBAL
============================= */
.auth-wrapper {
  background: linear-gradient(135deg, #000, #1a1a1a);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

/* =============================
   CONTAINER
============================= */
.auth-container {
  display: flex;
  background: #111;
  width: 850px;
  height: 95vh;
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.2);
  overflow: hidden;
  position: relative;
  perspective: 1000px;
  transition: all 0.8s ease;
}

/* =============================
   LEFT PANEL
============================= */
.auth-panel {
  width: 45%;
  background: #000;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
  z-index: 2;
  position: relative;
}

.logo-container {
  margin-bottom: 2rem;
}

.app-logo {
  width: 120px;
  height: auto;
  filter: drop-shadow(0 0 10px rgba(255, 215, 0, 0.3));
}

.panel-text h2 {
  color: #ffd700;
  margin-bottom: 1rem;
  font-size: 1.8rem;
}

.panel-text p {
  color: #ccc;
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
}

.panel-btn {
  background: #ffd700;
  color: #000;
  border: none;
  padding: 10px 25px;
  border-radius: 25px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.panel-btn:hover {
  background: #fff;
}

/* =============================
   CARD (RIGHT SIDE)
============================= */
.auth-card {
  position: absolute;
  right: 0;
  width: 55%;
  height: 100%;
  background: #1c1c1c;
  transform-style: preserve-3d;
  transition: transform 0.8s ease-in-out;
  border-left: 1px solid #222;
  border-radius: 0 20px 20px 0;
}

/* FLIP EFFECT */
.auth-container.flip-active .auth-card {
  transform: rotateY(180deg);
}

/* =============================
   FACES (FRONT & BACK)
============================= */
.auth-face {
  position: absolute;
  backface-visibility: hidden;
  width: 100%;
  height: 100%;
  padding: 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.7rem;
}

.front-face {
  transform: rotateY(0deg);
}

.back-face {
  transform: rotateY(180deg);
}

/* =============================
   FORM ELEMENTS
============================= */
.auth-face h2 {
  text-align: center;
  color: #ffd700;
  margin-bottom: 1rem;
}

label {
  font-size: 0.9rem;
  color: #ccc;
}

input {
  background: #2b2b2b;
  border: 1px solid #444;
  padding: 10px;
  border-radius: 8px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.3s;
}

input:focus {
  border-color: #ffd700;
  outline: none;
}

.gender-group {
  display: flex;
  gap: 10px;
  align-items: center;
  color: #ccc;
}

.btn {
  background: #ffd700;
  border: none;
  padding: 10px;
  color: #000;
  border-radius: 25px;
  margin-top: 1rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.3s;
}

.btn:hover {
  background: #fff;
}

.social-container {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.social-container a {
  background: #333;
  color: #ffd700;
  border-radius: 50%;
  padding: 10px;
  transition: all 0.3s;
}

.social-container a:hover {
  background: #ffd700;
  color: #000;
}

.divider {
  text-align: center;
  color: #aaa;
  margin: 1rem 0;
  position: relative;
}

.divider span {
  background: #1c1c1c;
  padding: 0 10px;
  position: relative;
  z-index: 1;
}

.divider::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  width: 100%;
  height: 1px;
  background: #444;
  transform: translateY(-50%);
}

/* =============================
   RESPONSIVE DESIGN
============================= */
@media (max-width: 1024px) {
  .auth-container {
    width: 90%;
    height: 150vh;
  }

  .panel-text h2 {
    font-size: 1.5rem;
  }

  .panel-btn {
    padding: 8px 20px;
  }
}

@media (max-width: 768px) {
  .auth-container {
    flex-direction: column;
    width: 90%;
    height: 150vh;
    perspective: 1000px;
  }

  /* Panel takes top section */
  .auth-panel {
    width: 100%;
    border-radius: 20px 20px 0 0;
    padding: 1.5rem;
  }

  /* Card sits below panel */
  .auth-card {
    position: relative;
    width: 100%;
    height: 150vh;
    border-left: none;
    border-radius: 0 0 20px 20px;
    transform-style: preserve-3d;
    transition: transform 0.8s ease-in-out;
  }

  /* Flip effect still works on small screen */
  .auth-container.flip-active .auth-card {
    transform: rotateY(180deg);
  }

  .auth-face {
    position: absolute;
    width: 100%;
    /* height: 100vh; */
    padding: 2rem 1.5rem;
    backface-visibility: hidden;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.7rem;
  }

  .front-face {
    transform: rotateY(0deg);
  }

  .back-face {
    transform: rotateY(180deg);
  }

  /* Adjust text & form spacing */
  .panel-text p {
    font-size: 0.85rem;
  }

  .app-logo {
    width: 90px;
  }

  .btn {
    padding: 8px;
  }

  input {
    font-size: 0.9rem;
  }

  .social-container {
    gap: 8px;
  }

  .social-container a {
    padding: 8px;
  }

  .divider span {
    padding: 0 5px;
  }
}

@media (max-width: 480px) {
  .auth-container {
    width: 95%;
  }

  .auth-card {
    height: 150vh;
  }

  .auth-face {
    padding: 1.2rem 1rem;
  }

  h2 {
    font-size: 1.2rem;
  }

  label {
    font-size: 0.8rem;
  }

  input {
    padding: 8px;
    font-size: 0.85rem;
  }

  .btn {
    font-size: 0.9rem;
  }
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

/* Toast Notifications */
.toast {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background: #222;
  color: #fff;
  padding: 12px 20px;
  border-radius: 10px;
  font-weight: 500;
  z-index: 9999;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  animation: slideIn 0.4s ease;
}

.toast.success {
  border-left: 5px solid #00c853;
}

.toast.error {
  border-left: 5px solid #e53935;
}

.toast.info {
  border-left: 5px solid #ffd700;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
