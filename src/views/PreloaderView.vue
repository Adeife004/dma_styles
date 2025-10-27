<template>
  <transition name="fade" @after-leave="onTransitionComplete">
    <div v-if="loading" class="preloader">
      <svg class="stitch-svg" viewBox="0 0 600 200" xmlns="http://www.w3.org/2000/svg">
        <!-- Thread Path -->
        <path
          id="thread-path"
          d="M50 100 Q200 50, 350 100 T550 100"
          stroke="#FFD700"
          stroke-width="2"
          fill="none"
          stroke-linecap="round"
          stroke-dasharray="700"
          stroke-dashoffset="700"
        >
          <animate
            attributeName="stroke-dashoffset"
            from="700"
            to="0"
            dur="3s"
            fill="freeze"
            begin="0s"
          />
        </path>

        <!-- Needle (moving circle) -->
        <circle r="4" fill="#FFD700">
          <animateMotion dur="3s" fill="freeze" repeatCount="1">
            <mpath href="#thread-path" />
          </animateMotion>
        </circle>

        <!-- Stitched Text -->
        <text
          x="50%"
          y="65%"
          text-anchor="middle"
          fill="none"
          stroke="#FFD700"
          stroke-width="1"
          font-size="36"
          font-family="'Playfair Display', serif"
          letter-spacing="2"
          stroke-dasharray="400"
          stroke-dashoffset="400"
        >
          DMA Styles
          <animate
            attributeName="stroke-dashoffset"
            from="400"
            to="0"
            dur="2.5s"
            begin="2.5s"
            fill="freeze"
          />
        </text>
      </svg>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const loading = ref(true)
const router = useRouter()

onMounted(() => {
  // Just set loading to false after animation completes
  setTimeout(() => {
    loading.value = false
    // Navigation will happen in onTransitionComplete
  }, 5200)
})

// Navigate ONLY after the fade transition completes
function onTransitionComplete() {
  router.push('/auth')
}
</script>

<style scoped>
.preloader {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: radial-gradient(circle at center, #1c1c1c, #0d0d0d);
  overflow: hidden;
}

.stitch-svg {
  width: 70%;
  max-width: 600px;
  animation: fadeIn 1s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* Fade transition when leaving */
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-leave-to {
  opacity: 0;
}
</style>
