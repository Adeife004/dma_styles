<template>
  <div class="settings-page">
    <!-- Page Header -->
    <div class="page-header">
      <h1 class="page-title"><i class="fas fa-cog"></i> Settings</h1>
      <p class="page-subtitle">Manage your account preferences and settings</p>
    </div>

    <!-- Settings Navigation Tabs -->
    <div class="settings-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        <i :class="tab.icon"></i>
        <span>{{ tab.label }}</span>
      </button>
    </div>

    <!-- Settings Content -->
    <div class="settings-content">
      <Profile v-if="activeTab === 'profile'" />
      <Security v-if="activeTab === 'security'" />
      <Preference v-if="activeTab === 'preferences'" />
      <Privacy v-if="activeTab === 'privacy'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Profile from '@/components/Profile.vue'
import Security from '@/components/Security.vue'
import Preference from '@/components/Preference.vue'
import Privacy from '@/components/Privacy.vue'

const activeTab = ref('profile')

const tabs = [
  { id: 'profile', label: 'Profile', icon: 'fas fa-user' },
  { id: 'security', label: 'Security', icon: 'fas fa-shield-alt' },
  { id: 'preferences', label: 'Preferences', icon: 'fas fa-sliders-h' },
  { id: 'privacy', label: 'Privacy', icon: 'fas fa-user-shield' },
]
</script>

<style scoped>
.settings-page {
  padding: 2rem;
  margin: 0 auto;
  background: #0f0f0f;
  min-height: 100vh;
  color: #fff;
}

.page-header {
  margin-bottom: 2rem;
}

.page-title {
  font-size: 2rem;
  color: var(--theme-color, #ffd700);
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}

.page-subtitle {
  color: #999;
  font-size: 1rem;
}

.settings-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  border-bottom: 2px solid #222;
  padding-bottom: 1rem;
}

.tab-btn {
  background: transparent;
  border: none;
  color: #999;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  transition: all 0.3s ease;
  border-radius: 8px;
}

.tab-btn:hover {
  color: var(--theme-color, #ffd700);
  background: rgba(var(--theme-color-rgb, 255, 215, 0), 0.1);
}

.tab-btn.active {
  color: var(--theme-color, #ffd700);
  background: rgba(var(--theme-color-rgb, 255, 215, 0), 0.15);
  font-weight: 600;
}

.tab-btn i {
  font-size: 1.1rem;
}

.settings-content {
  background: #1a1a1a;
  border: 1px solid #333;
  border-radius: 16px;
  padding: 2rem;
}

@media (max-width: 768px) {
  .settings-page {
    padding: 1rem;
  }

  .settings-tabs {
    gap: 0.5rem;
  }

  .tab-btn {
    padding: 0.5rem 1rem;
    font-size: 0.85rem;
  }

  .settings-content {
    padding: 1.5rem;
  }
}
</style>
