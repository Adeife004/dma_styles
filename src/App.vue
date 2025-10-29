<script setup>
import { RouterView } from 'vue-router'

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar')
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled')
  } else {
    navbar.classList.remove('scrolled')
  }
})
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
