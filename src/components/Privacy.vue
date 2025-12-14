<template>
  <div class="privacy-section">
    <h2 class="section-title"><i class="fas fa-user-shield"></i> Privacy & Data</h2>

    <div class="privacy-options">
      <div class="privacy-item">
        <i class="fas fa-download"></i>
        <div class="privacy-content">
          <h4>Download Your Data</h4>
          <p>Get a copy of all your personal data</p>
          <button class="btn-secondary"><i class="fas fa-download"></i> Request Data</button>
        </div>
      </div>

      <div class="privacy-item">
        <i class="fas fa-eye"></i>
        <div class="privacy-content">
          <h4>Profile Visibility</h4>
          <p>Control who can see your profile information</p>
          <select v-model="privacy.profileVisibility" class="privacy-select">
            <option value="public">Public</option>
            <option value="private">Private</option>
            <option value="friends">Friends Only</option>
          </select>
        </div>
      </div>

      <div class="privacy-item danger">
        <i class="fas fa-trash-alt"></i>
        <div class="privacy-content">
          <h4>Delete Account</h4>
          <p>Permanently delete your account and all data</p>
          <button class="btn-danger" @click="deleteAccount">
            <i class="fas fa-exclamation-triangle"></i> Delete Account
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'

const privacy = ref({
  profileVisibility: 'private',
})

async function deleteAccount() {
  const result = await Swal.fire({
    title: 'Delete Account?',
    html: `
      <p style="color: #666; margin: 20px 0;">This action cannot be undone. All your data will be permanently deleted.</p>
      <p style="color: #f44336; font-weight: bold;">Are you absolutely sure?</p>
    `,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Yes, Delete My Account',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#f44336',
    cancelButtonColor: '#888',
  })

  if (result.isConfirmed) {
    Swal.fire({
      title: 'Account Deleted',
      text: 'Your account has been permanently deleted',
      icon: 'success',
      confirmButtonColor: 'var(--theme-color)',
    })
  }
}
</script>

<style scoped>
.privacy-section {
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

/* Privacy Options */
.privacy-options {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.privacy-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: #222;
  border: 1px solid #333;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.privacy-item:hover {
  border-color: var(--theme-color);
}

.privacy-item.danger {
  border-color: rgba(244, 67, 54, 0.3);
}

.privacy-item.danger:hover {
  border-color: #f44336;
  background: rgba(244, 67, 54, 0.05);
}

.privacy-item > i {
  font-size: 2rem;
  color: var(--theme-color);
  margin-top: 0.25rem;
}

.privacy-item.danger > i {
  color: #f44336;
}

.privacy-content {
  flex: 1;
}

.privacy-content h4 {
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.privacy-content p {
  color: #999;
  font-size: 0.9rem;
  margin-bottom: 1rem;
}

.privacy-select {
  background: #333;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 0.5rem 1rem;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.privacy-select:focus {
  outline: none;
  border-color: var(--theme-color);
}
</style>
