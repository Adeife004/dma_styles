<template>
  <div class="security-section">
    <h2 class="section-title"><i class="fas fa-shield-alt"></i> Security Settings</h2>

    <form class="settings-form" @submit.prevent="changePassword">
      <div class="form-group">
        <label><i class="fas fa-lock"></i> Current Password</label>
        <div class="password-input">
          <input
            :type="showCurrentPassword ? 'text' : 'password'"
            v-model="security.currentPassword"
            required
            placeholder="Enter your current password"
          />
          <i
            :class="showCurrentPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
            @click="showCurrentPassword = !showCurrentPassword"
          ></i>
        </div>
      </div>

      <div class="form-group">
        <label><i class="fas fa-lock"></i> New Password</label>
        <div class="password-input">
          <input
            :type="showNewPassword ? 'text' : 'password'"
            v-model="security.newPassword"
            required
            minlength="6"
            placeholder="Enter new password (min. 6 characters)"
          />
          <i
            :class="showNewPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
            @click="showNewPassword = !showNewPassword"
          ></i>
        </div>
        <small class="password-hint">Password must be at least 6 characters long</small>
      </div>

      <div class="form-group">
        <label><i class="fas fa-lock"></i> Confirm New Password</label>
        <div class="password-input">
          <input
            :type="showConfirmPassword ? 'text' : 'password'"
            v-model="security.confirmPassword"
            required
            placeholder="Confirm your new password"
          />
          <i
            :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"
            @click="showConfirmPassword = !showConfirmPassword"
          ></i>
        </div>
      </div>

      <button type="submit" class="btn-primary" :disabled="isLoading">
        <i :class="isLoading ? 'fas fa-spinner fa-spin' : 'fas fa-key'"></i>
        {{ isLoading ? 'Updating...' : 'Update Password' }}
      </button>
    </form>

    <div class="security-info">
      <div class="info-card">
        <i class="fas fa-info-circle"></i>
        <div>
          <h4>Password Requirements</h4>
          <p>At least 6 characters for security</p>
        </div>
      </div>
      <div class="info-card">
        <i class="fas fa-shield-alt"></i>
        <div>
          <h4>Account Security</h4>
          <p>Your account is protected</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { auth } from '../firebase'
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'
import Swal from 'sweetalert2'

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)
const isLoading = ref(false)

const security = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
})

async function changePassword() {
  // Validate passwords match
  if (security.value.newPassword !== security.value.confirmPassword) {
    Swal.fire({
      title: "Passwords Don't Match",
      text: 'New password and confirmation password must be the same',
      icon: 'error',
      confirmButtonColor: 'var(--theme-color)',
    })
    return
  }

  // Validate password length
  if (security.value.newPassword.length < 6) {
    Swal.fire({
      title: 'Password Too Short',
      text: 'Password must be at least 6 characters long',
      icon: 'error',
      confirmButtonColor: 'var(--theme-color)',
    })
    return
  }

  // Check if new password is different from current
  if (security.value.currentPassword === security.value.newPassword) {
    Swal.fire({
      title: 'Same Password',
      text: 'New password must be different from your current password',
      icon: 'warning',
      confirmButtonColor: 'var(--theme-color)',
    })
    return
  }

  isLoading.value = true

  try {
    const user = auth.currentUser

    if (!user || !user.email) {
      throw new Error('No authenticated user found')
    }

    // Create credential with current password
    const credential = EmailAuthProvider.credential(user.email, security.value.currentPassword)

    // Re-authenticate user with current password
    await reauthenticateWithCredential(user, credential)

    // Update password in Firebase Authentication
    await updatePassword(user, security.value.newPassword)

    // Success message
    await Swal.fire({
      title: 'Password Updated!',
      text: 'Your password has been changed successfully. You can now use your new password to log in.',
      icon: 'success',
      confirmButtonColor: 'var(--theme-color)',
    })

    // Clear form
    security.value = {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    }
  } catch (error) {
    console.error('Password change error:', error)

    // Handle specific Firebase errors
    let errorMessage = 'Failed to update password. Please try again.'

    if (error.code === 'auth/wrong-password') {
      errorMessage = 'Current password is incorrect. Please try again.'
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password is too weak. Please choose a stronger password.'
    } else if (error.code === 'auth/requires-recent-login') {
      errorMessage =
        'For security reasons, please log out and log back in before changing your password.'
    } else if (error.code === 'auth/too-many-requests') {
      errorMessage = 'Too many failed attempts. Please try again later.'
    } else if (error.code === 'auth/network-request-failed') {
      errorMessage = 'Network error. Please check your connection and try again.'
    }

    Swal.fire({
      title: 'Error',
      text: errorMessage,
      icon: 'error',
      confirmButtonColor: 'var(--theme-color)',
    })
  } finally {
    isLoading.value = false
  }
}
</script>

<style scoped>
.security-section {
  animation: fadeIn 0.3s ease;
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

.section-title {
  font-size: 1.5rem;
  color: var(--theme-color);
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: #ccc;
  font-size: 0.9rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-group label i {
  color: var(--theme-color);
  font-size: 0.9rem;
}

.password-input {
  position: relative;
}

.password-input input {
  width: 100%;
  padding-right: 3rem;
  background: #222;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: #fff;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.password-input input:focus {
  outline: none;
  border-color: var(--theme-color);
  background: #2a2a2a;
}

.password-input i {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  cursor: pointer;
  transition: color 0.3s ease;
}

.password-input i:hover {
  color: var(--theme-color);
}

.password-hint {
  color: #999;
  font-size: 0.85rem;
  font-style: italic;
  margin-top: -0.25rem;
}

.btn-primary {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
  background: var(--theme-color);
  color: #000;
}

.btn-primary:hover:not(:disabled) {
  background: var(--theme-color);
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(var(--theme-color-rgb, 255, 215, 0), 0.6);
}

.btn-primary:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.security-info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 1px solid #333;
}

.info-card {
  background: #222;
  border: 1px solid #333;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
}

.info-card:hover {
  border-color: 1px solid rgba(var(--theme-color-rgb, 255, 215, 0), 0.2);
  background: #2a2a2a;
}

.info-card i {
  font-size: 2rem;
  color: var(--theme-color);
}

.info-card h4 {
  color: #fff;
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
  font-weight: 600;
}

.info-card p {
  color: #999;
  font-size: 0.85rem;
}

@media (max-width: 768px) {
  .security-info {
    grid-template-columns: 1fr;
  }
}
</style>
