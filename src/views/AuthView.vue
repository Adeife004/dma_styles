<template>
  <!-- auth-wrapper -->
  <div class="auth-wrapper">
    <!-- auth-container -->
    <div
      class="auth-container"
      :class="{ 'flip-active': showSignup, loaded: isLoaded }"
      data-aos="fade-up"
      data-aos-duration="1000"
      data-aos-delay="200"
    >
      <!-- LEFT PANEL -->
      <div class="auth-panel">
        <div class="logo-container" data-aos="zoom-in">
          <img src="../assets/logo.jpg" alt="Brand Logo" class="app-logo" />
        </div>

        <div class="panel-text">
          <h2 data-aos="fade-down" data-aos-delay="200" v-if="!showSignup">Welcome Back</h2>
          <h2 data-aos="fade-down" data-aos-delay="200" v-else>Hello</h2>
          <p data-aos="fade-up" data-aos-delay="300" v-if="!showSignup">
            Please log in with your personal information.
          </p>
          <p data-aos="fade-up" data-aos-delay="400" v-else>
            Kindly enter your details and start your journey with us.
          </p>

          <button class="panel-btn" @click="toggleForm">
            {{ showSignup ? 'Sign In' : 'Sign Up' }}
          </button>
        </div>
      </div>

      <!-- RIGHT CARD -->
      <div class="auth-card">
        <!-- LOGIN FORM -->
        <form class="auth-face front-face" @submit.prevent="loginUser">
          <h2 data-aos="fade-down">Sign In</h2>

          <div class="social-container" data-aos="zoom-in" data-aos-delay="200">
            <a href="#" id="facebookBtn" @click.prevent="facebookSignIn">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="#" id="googleBtn" @click.prevent="googleSignIn">
              <i class="fab fa-google"></i>
            </a>
            <a href="#"><i class="fab fa-apple"></i></a>
          </div>

          <p class="divider" data-aos="fade-up" data-aos-delay="400"><span>or</span></p>

          <label data-aos="fade-right" data-aos-delay="600" for="loginEmail">Email</label>
          <input
            data-aos="fade-left"
            data-aos-delay="700"
            id="loginEmail"
            v-model="loginEmail"
            type="email"
            placeholder="Enter your email"
            required
          />

          <label data-aos="fade-right" data-aos-delay="800" for="loginPassword">Password</label>
          <input
            data-aos="fade-left"
            data-aos-delay="900"
            id="loginPassword"
            v-model="loginPassword"
            type="password"
            placeholder="Enter your password"
            required
          />

          <p class="forgot-password">
            <a href="#" @click.prevent="forgotPassword">Forgot Password?</a>
          </p>

          <button data-aos="zoom-in" data-aos-delay="900" id="loginBtn" class="btn" type="submit">
            Login
          </button>
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

          <!-- First Name + Last Name -->
          <div class="form-row">
            <!-- First Name -->
            <div class="form-group password-group">
              <label data-aos="fade-right" data-aos-delay="700" for="firstName">First Name</label>
              <div class="password-wrapper">
                <input
                  data-aos="fade-left"
                  data-aos-delay="600"
                  id="firstName"
                  type="text"
                  v-model="fname"
                  placeholder="Enter your first name"
                  required
                />
              </div>
            </div>

            <!-- Last Name -->
            <div class="form-group password-group">
              <label data-aos="fade-left" data-aos-delay="700" for="confirmPassword"
                >Last Name</label
              >
              <div class="password-wrapper">
                <input
                  data-aos="fade-left"
                  data-aos-delay="600"
                  id="lastName"
                  type="text"
                  v-model="lname"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>
          </div>

          <!-- <label data-aos="fade-right" data-aos-delay="500" for="fullName">Full Name</label>
          <input data-aos="fade-left" data-aos-delay="600" id="fullName" type="text" v-model="fname"
            placeholder="Enter your full name" required /> -->

          <!-- Email + Phone -->
          <div class="form-row">
            <div class="form-group">
              <label data-aos="fade-right" data-aos-delay="700" for="signupEmail">Email</label>
              <input
                id="signupEmail"
                v-model="signupEmail"
                type="email"
                placeholder="Enter your email"
                required
                data-aos="fade-left"
                data-aos-delay="800"
              />
            </div>

            <div class="form-group">
              <label data-aos="fade-right" data-aos-delay="700" for="phoneNumber"
                >Phone Number</label
              >
              <input
                id="phoneNumber"
                v-model="phoneNumber"
                type="tel"
                placeholder="Enter your phone number"
                required
                data-aos="fade-left"
                data-aos-delay="800"
              />
            </div>
          </div>

          <!-- Address -->
          <label data-aos="fade-right" data-aos-delay="700" for="address">Address</label>
          <input
            id="address"
            v-model="address"
            type="text"
            placeholder="Enter your address"
            required
            data-aos="fade-left"
            data-aos-delay="800"
          />

          <!-- Password + Confirm Password -->
          <div class="form-row">
            <!-- Password -->
            <div class="form-group password-group">
              <label data-aos="fade-right" data-aos-delay="700" for="signupPassword"
                >Password</label
              >
              <div class="password-wrapper">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="signupPassword"
                  v-model="signupPassword"
                  placeholder="Enter your password"
                  required
                  data-aos="fade-left"
                  data-aos-delay="800"
                />
                <i
                  class="fas"
                  :class="showPassword ? 'fa-eye' : 'fa-eye-slash'"
                  @click="showPassword = !showPassword"
                ></i>
              </div>
            </div>

            <!-- Confirm Password -->
            <div class="form-group password-group">
              <label data-aos="fade-right" data-aos-delay="700" for="confirmPassword"
                >Confirm Password</label
              >
              <div class="password-wrapper">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  placeholder="Re-enter your password"
                  required
                  data-aos="fade-left"
                  data-aos-delay="800"
                />
                <i
                  class="fas"
                  :class="showConfirmPassword ? 'fa-eye' : 'fa-eye-slash'"
                  @click="showConfirmPassword = !showConfirmPassword"
                ></i>
              </div>
            </div>
          </div>

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
import { ref, watch, onMounted, nextTick } from 'vue'
import { auth, db } from '../firebase'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Swal from 'sweetalert2'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { ref as dbRef, set, get } from 'firebase/database'

// Reactive Form State
const isLoaded = ref(false)
const showSignup = ref(true)
const fname = ref('')
const lname = ref('')
const signupEmail = ref('')
const signupPassword = ref('')
const confirmPassword = ref('')
const loginEmail = ref('')
const loginPassword = ref('')
const phoneNumber = ref('')
const address = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

// Providers
const googleProvider = new GoogleAuthProvider()
const facebookProvider = new FacebookAuthProvider()

// Loader & Toast
const loading = ref(false)
const toastMessage = ref('')
const showToast = ref(false)
const toastType = ref('success')

onMounted(async () => {
  await nextTick()

  // Wait for route transition to complete
  setTimeout(() => {
    // Initialize AOS
    AOS.init({
      duration: 1200,
      easing: 'ease-in-out',
      once: false,
      offset: 0,
      delay: 0,
      disable: false,
    })

    // Make container visible
    setTimeout(() => {
      isLoaded.value = true

      // Refresh AOS after container is visible
      setTimeout(() => {
        AOS.refresh()
      }, 150)
    }, 200)
  }, 100)
})

// Watch for form toggle and refresh AOS
watch(showSignup, () => {
  setTimeout(() => {
    AOS.refreshHard()
  }, 100)
})

// Toggle Between Forms && Reset
function toggleForm() {
  showSignup.value = !showSignup.value
}

function resetFields() {
  fname.value = ''
  lname.value = ''
  signupEmail.value = ''
  signupPassword.value = ''
  confirmPassword.value = ''
  phoneNumber.value = ''
  address.value = ''
  loginEmail.value = ''
  loginPassword.value = ''
}

// SignUp User & Save to Realtime Database
async function signupUser() {
  loading.value = true
  try {
    if (signupPassword.value.length < 6) {
      Swal.fire({
        icon: 'error',
        title: 'Weak Password',
        text: 'Password must be at least 6 characters long.',
        confirmButtonColor: '#000000',
        background: '#f9f9f9',
        color: '#333',
        backdrop: `
          rgba(0,0,0,0.4)
          url("../assets/logo.jpg")
          left top
          no-repeat
        `,
      })
      loading.value = false
      return
    }

    if (signupPassword.value !== confirmPassword.value) {
      Swal.fire({
        icon: 'error',
        title: 'Password Mismatch',
        text: 'Passwords do not match.',
        confirmButtonColor: '#000000',
        background: '#f9f9f9',
        color: '#333',
        backdrop: `
          rgba(0,0,0,0.4)
          url("../assets/logo.jpg")
          right top
          no-repeat
        `,
      })
      loading.value = false
      return
    }

    // Create User in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      signupEmail.value,
      signupPassword.value,
    )
    const user = userCredential.user

    // Save additional user info to Realtime Database
    const userRef = dbRef(db, `users/${user.uid}`)
    await set(userRef, {
      firstName: fname.value,
      lastName: lname.value,
      email: signupEmail.value,
      phoneNumber: phoneNumber.value,
      address: address.value,
      createdAt: new Date().toISOString(),
    })

    Swal.fire({
      icon: 'success',
      title: 'Account Created Successfully!',
      html: `
        <h3 style="margin-bottom:5px;">Welcome <strong>${fname.value} ${lname.value}</strong></h3>
        <p style="font-size:15px;">Your account has been created successfully.</p>
        <p>Please sign in to continue to <strong>DMA Styles</strong>.</p>
      `,
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'Go to Sign In',
      confirmButtonColor: '#000000',
      background: '#ffffff',
      color: '#222',
      allowOutsideClick: false,
    }).then(() => {
      // Redirect user to login form
      showSignup.value = false
      resetFields()
    })
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Signup Failed',
      text: error.message,
      confirmButtonColor: '#000000',
      background: '#f9f9f9',
      color: '#333',
    })
  } finally {
    loading.value = false
  }
}

// Login
async function loginUser() {
  loading.value = true
  try {
    if (!loginEmail.value || !loginPassword.value) {
      Swal.fire({
        icon: 'warning',
        title: 'Missing Fields ⚠️',
        text: 'Please enter both your email and password.',
        confirmButtonColor: '#000000',
        background: '#f9f9f9',
        color: '#333',
      })
      loading.value = false
      return
    }

    const userCredential = await signInWithEmailAndPassword(
      auth,
      loginEmail.value,
      loginPassword.value,
    )
    Swal.fire({
      title: 'Welcome Back 👋',
      html: `
        <h3 style="margin-bottom:5px;">Hello, <strong>${user.email}</strong></h3>
        <p style="font-size:15px;">You have successfully logged in to <strong>DMA Styles</strong>.</p>
      `,
      icon: 'success',
      showConfirmButton: true,
      confirmButtonText: 'Go to Dashboard',
      confirmButtonColor: '#000000',
      background: '#ffffff',
      color: '#222',
      allowOutsideClick: false,
    }).then(() => {
      window.location.href = '/dashboard'
    })
  } catch (error) {
    let errorMessage = 'Login failed. Please check your credentials.'

    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email.'
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password. Please try again.'
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email format.'
    }

    Swal.fire({
      icon: 'error',
      title: 'Login Error 🚫',
      text: errorMessage,
      confirmButtonColor: '#000000',
      background: '#f9f9f9',
      color: '#333',
    })
  } finally {
    loading.value = false
  }
}

// Google Sign-In with profile completion check
async function googleSignIn() {
  loading.value = true
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user

    // Check if user profile is complete in database
    const userRef = dbRef(db, `users/${user.uid}`)
    const snapshot = await get(userRef)

    if (snapshot.exists()) {
      const userData = snapshot.val()
      // Check if phone and address exist
      if (userData.phoneNumber && userData.address) {
        // Profile complete, go to dashboard
        Swal.fire({
          title: 'Welcome Back! 👋',
          html: `
            <h3 style="margin-bottom:5px;">Hello, <strong>${user.displayName || 'User'}</strong></h3>
            <p style="font-size:15px;">Successfully signed in via Google.</p>
          `,
          icon: 'success',
          showConfirmButton: true,
          confirmButtonText: 'Go to Dashboard',
          confirmButtonColor: '#000000',
          background: '#ffffff',
          color: '#222',
          allowOutsideClick: false,
        }).then(() => {
          window.location.href = '/dashboard'
        })
      } else {
        // Profile incomplete, go to complete profile
        Swal.fire({
          title: 'Complete Your Profile',
          html: `
            <p style="font-size:15px;">Please provide additional information to continue.</p>
          `,
          icon: 'info',
          showConfirmButton: true,
          confirmButtonText: 'Continue',
          confirmButtonColor: '#000000',
          background: '#ffffff',
          color: '#222',
          allowOutsideClick: false,
        }).then(() => {
          window.location.href = '/complete-profile'
        })
      }
    } else {
      // New user, go to complete profile
      Swal.fire({
        title: `Welcome to DMA Styles! 🎉`,
        html: `
          <h3 style="margin-bottom:5px;">Hello, <strong>${user.displayName || 'User'}</strong></h3>
          <p style="font-size:15px;">Let's complete your profile to get started.</p>
        `,
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: 'Complete Profile',
        confirmButtonColor: '#000000',
        background: '#ffffff',
        color: '#222',
        allowOutsideClick: false,
      }).then(() => {
        window.location.href = '/complete-profile'
      })
    }
  } catch (error) {
    console.error('Google Sign-In error:', error)
    Swal.fire({
      icon: 'error',
      title: 'Sign-In Failed',
      text: 'Google Sign-In failed: ' + error.message,
      confirmButtonColor: '#000000',
      background: '#f9f9f9',
      color: '#333',
    })
  } finally {
    loading.value = false
  }
}

// Facebook Sign-In with profile completion check
async function facebookSignIn() {
  loading.value = true
  try {
    const result = await signInWithPopup(auth, facebookProvider)
    const user = result.user

    // Check if user profile is complete
    const userRef = dbRef(db, `users/${user.uid}`)
    const snapshot = await get(userRef)

    if (snapshot.exists()) {
      const userData = snapshot.val()
      if (userData.phoneNumber && userData.address) {
        Swal.fire({
          title: 'Welcome Back! 👋',
          html: `
            <h3 style="margin-bottom:5px;">Hello, <strong>${user.displayName || 'User'}</strong></h3>
            <p style="font-size:15px;">Successfully signed in via Facebook.</p>
          `,
          icon: 'success',
          showConfirmButton: true,
          confirmButtonText: 'Go to Dashboard',
          confirmButtonColor: '#000000',
          background: '#ffffff',
          color: '#222',
          allowOutsideClick: false,
        }).then(() => {
          window.location.href = '/dashboard'
        })
      } else {
        Swal.fire({
          title: 'Complete Your Profile',
          html: `
            <p style="font-size:15px;">Please provide additional information to continue.</p>
          `,
          icon: 'info',
          showConfirmButton: true,
          confirmButtonText: 'Continue',
          confirmButtonColor: '#000000',
          background: '#ffffff',
          color: '#222',
          allowOutsideClick: false,
        }).then(() => {
          window.location.href = '/complete-profile'
        })
      }
    } else {
      Swal.fire({
        title: `Welcome to DMA Styles! 🎉`,
        html: `
          <h3 style="margin-bottom:5px;">Hello, <strong>${user.displayName || 'User'}</strong></h3>
          <p style="font-size:15px;">Let's complete your profile to get started.</p>
        `,
        icon: 'success',
        showConfirmButton: true,
        confirmButtonText: 'Complete Profile',
        confirmButtonColor: '#000000',
        background: '#ffffff',
        color: '#222',
        allowOutsideClick: false,
      }).then(() => {
        window.location.href = '/complete-profile'
      })
    }
  } catch (error) {
    console.error('Facebook Sign-In error:', error)
    Swal.fire({
      icon: 'error',
      title: 'Sign-In Failed',
      text: 'Facebook Sign-In failed: ' + error.message,
      confirmButtonColor: '#000000',
      background: '#f9f9f9',
      color: '#333',
    })
  } finally {
    loading.value = false
  }
}

// Auth State Listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    console.log('Active user:', user.email)
  } else {
    console.log('No active user.')
  }
})

async function forgotPassword() {
  const { value: email } = await Swal.fire({
    title: 'Reset Your Password ',
    html: `
      <p style="margin-bottom:15px;">Enter the email you used to register with <strong>DMA Styles</strong>.</p>
      <input type="email" id="resetEmail" class="swal2-input" placeholder="Enter your email" style="text-align:center;">
    `,
    confirmButtonText: 'Send Reset Link',
    confirmButtonColor: '#000000',
    background: '#ffffff',
    color: '#222',
    focusConfirm: false,
    preConfirm: () => {
      const resetEmail = document.getElementById('resetEmail').value
      if (!resetEmail) {
        Swal.showValidationMessage('Please enter your email address.')
      }
      return resetEmail
    },
  })

  if (!email) return // user canceled

  try {
    await sendPasswordResetEmail(auth, email)
    Swal.fire({
      icon: 'success',
      title: 'Email Sent ',
      html: `
        <p>A password reset link has been sent to:</p>
        <strong>${email}</strong>
        <p style="margin-top:10px;">Check your inbox or spam folder to continue.</p>
      `,
      confirmButtonText: 'OK',
      confirmButtonColor: '#000000',
      background: '#f9f9f9',
      color: '#333',
    })
  } catch (error) {
    let errorMessage = 'Unable to send reset link. Please try again.'

    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with that email.'
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Please enter a valid email address.'
    }

    Swal.fire({
      icon: 'error',
      title: 'Reset Failed 🚫',
      text: errorMessage,
      confirmButtonColor: '#000000',
      background: '#f9f9f9',
      color: '#333',
    })
  }
}
</script>

<style scoped>
/* GLOBAL */
.auth-wrapper {
  background: linear-gradient(135deg, #000, #1a1a1a);
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
}

/* CONTAINER */
.auth-container {
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.6s ease;
  display: flex;
  background: #111;
  width: 1000px;
  height: 95vh;
  border-radius: 20px;
  box-shadow: 0 0 30px rgba(255, 215, 0, 0.2);
  overflow: hidden;
  position: relative;
  perspective: 1000px;
  transition: all 0.8s ease;
}

.auth-container.loaded {
  opacity: 1;
  transform: translateY(0);
}

/* LEFT PANEL */
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
  background: #917f16;
  color: #f1f1f1;
}

/* CARD (RIGHT SIDE) */
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

/* FACES (FRONT & BACK) */
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

/* FORM ELEMENTS */
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
  background: #917f16;
  color: #f1f1f1;
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

.form-row {
  display: flex;
  gap: 15px;
  width: 100%;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
}

input {
  background: #111;
  border: 1px solid #444;
  color: #f5f5f5;
  padding: 10px 12px;
  border-radius: 6px;
  outline: none;
  transition: all 0.3s ease;
}

input:focus {
  border-color: #d4af37;
  box-shadow: 0 0 6px #d4af37;
}

.password-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.password-wrapper input {
  width: 100%;
  background: #111;
  border: 1px solid #444;
  color: #f5f5f5;
  padding: 10px 40px 10px 12px;
  border-radius: 6px;
  outline: none;
  transition: all 0.3s ease;
}

.password-wrapper i {
  position: absolute;
  right: 12px;
  cursor: pointer;
  color: #888;
  font-size: 14px;
  transition:
    color 0.3s ease,
    transform 0.3s ease;
}

.password-wrapper i:hover {
  transform: scale(1.1);
}

input:focus {
  border-color: #d4af37;
  box-shadow: 0 0 6px #d4af37;
}

.forgot-password a {
  text-decoration: none;
  color: #ccc;
  font-size: 15px;
}

/* RESPONSIVE DESIGN */
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
    height: 180vh;
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
    height: 160vh;
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

  .form-row {
    flex-direction: column;
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
