<template>
  <div class="profile-section">
    <h2 class="section-title"><i class="fas fa-user"></i> Profile Information</h2>

    <!-- Profile Photo Section -->
    <div class="profile-photo-section">
      <div class="photo-preview">
        <img v-if="localProfilePhoto" :src="localProfilePhoto" alt="Profile" />
        <i v-else class="fas fa-user photo-placeholder"></i>
      </div>
      <div class="photo-actions">
        <button class="btn-primary" @click="uploadPhoto">
          <i class="fas fa-camera"></i> Upload Photo
        </button>
        <button v-if="localProfilePhoto" class="btn-danger-outline" @click="removePhoto">
          <i class="fas fa-trash"></i> Remove Photo
        </button>
      </div>
    </div>

    <!-- Profile Form -->
    <form class="settings-form" @submit.prevent="saveProfile">
      <div class="form-row">
        <div class="form-group">
          <label><i class="fas fa-user"></i> First Name</label>
          <input type="text" v-model="profile.firstName" required />
        </div>
        <div class="form-group">
          <label><i class="fas fa-user"></i> Last Name</label>
          <input type="text" v-model="profile.lastName" required />
        </div>
      </div>

      <div class="form-row">
        <div class="form-group">
          <label><i class="fas fa-envelope"></i> Email</label>
          <input type="email" v-model="profile.email" required />
        </div>
        <div class="form-group">
          <label><i class="fas fa-phone"></i> Phone</label>
          <input type="tel" v-model="profile.phone" required />
        </div>
      </div>

      <div class="form-group">
        <label><i class="fas fa-map-marker-alt"></i> Address</label>
        <textarea v-model="profile.address" rows="3"></textarea>
      </div>

      <button type="submit" class="btn-primary"><i class="fas fa-save"></i> Save Profile</button>
    </form>
  </div>
</template>

<script setup>
import { ref, inject, watch } from 'vue'
import Swal from 'sweetalert2'

// Inject the profilePhoto from parent
const profilePhotoRef = inject('profilePhoto')
const localProfilePhoto = ref(profilePhotoRef?.value || null)

// Watch for changes in the injected profilePhoto
watch(
  () => profilePhotoRef?.value,
  (newVal) => {
    localProfilePhoto.value = newVal
  },
)

const profile = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
})

function uploadPhoto() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
          title: 'File Too Large',
          text: 'Please select an image smaller than 5MB',
          icon: 'error',
          confirmButtonColor: 'var(--theme-color)',
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (event) => {
        const photoUrl = event.target.result
        localProfilePhoto.value = photoUrl

        // Update the parent component's profilePhoto
        if (profilePhotoRef) {
          profilePhotoRef.value = photoUrl
        }

        // Save to localStorage for persistence
        localStorage.setItem('userProfilePhoto', photoUrl)

        Swal.fire({
          title: 'Photo Uploaded',
          text: 'Profile photo has been updated successfully',
          icon: 'success',
          confirmButtonColor: 'var(--theme-color)',
          timer: 2000,
          showConfirmButton: false,
        })
      }
      reader.readAsDataURL(file)
    }
  }
  input.click()
}

function removePhoto() {
  localProfilePhoto.value = null

  // Update the parent component's profilePhoto
  if (profilePhotoRef) {
    profilePhotoRef.value = null
  }

  // Remove from localStorage
  localStorage.removeItem('userProfilePhoto')

  Swal.fire({
    title: 'Photo Removed',
    text: 'Profile photo has been removed successfully',
    icon: 'success',
    confirmButtonColor: 'var(--theme-color)',
    timer: 2000,
    showConfirmButton: false,
  })
}

async function saveProfile() {
  await Swal.fire({
    title: 'Success!',
    text: 'Profile updated successfully',
    icon: 'success',
    confirmButtonColor: 'var(--theme-color)',
  })
}
</script>

<style scoped>
.profile-section {
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

.profile-photo-section {
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid #333;
}

.photo-preview {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid var(--theme-color);
  background: #222;
  display: flex;
  align-items: center;
  justify-content: center;
}

.photo-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-placeholder {
  font-size: 3rem;
  color: #666;
}

.photo-actions {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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

.form-group input,
.form-group textarea {
  background: #222;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: #fff;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--theme-color);
  background: #2a2a2a;
}

.form-group textarea {
  resize: vertical;
  font-family: inherit;
}

.btn-primary,
.btn-danger-outline {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.btn-primary {
  background: var(--theme-color);
  color: #000;
}

.btn-primary:hover {
  background: var(--theme-color);
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(var(--theme-color-rgb, 255, 215, 0), 0.6);
}

.btn-danger-outline {
  background: transparent;
  color: #f44336;
  border: 1px solid #f44336;
}

.btn-danger-outline:hover {
  background: rgba(244, 67, 54, 0.1);
}

@media (max-width: 768px) {
  .profile-photo-section {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .photo-actions {
    width: 100%;
  }
}
</style>
