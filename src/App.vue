<!-- <script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  background-color: #0f0f0f !important;
  color: #fff;
}

#app {
  background-color: #0f0f0f;
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> -->

<script setup>
import { onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useTheme } from '@/composables/useTheme'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

const auth = getAuth()
const { loadThemeColor } = useTheme()

onMounted(() => {
  // Ensure dark background
  document.documentElement.style.backgroundColor = '#0f0f0f'
  document.body.style.backgroundColor = '#0f0f0f'

  // Load theme when app starts
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      await loadThemeColor()
    } else {
      const { applyThemeColor } = useTheme()
      applyThemeColor('#FFD700')
    }
  })
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  background-color: #0f0f0f !important;
  color: #fff;
}

#app {
  background-color: #0f0f0f;
  min-height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
