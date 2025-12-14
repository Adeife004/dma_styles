<template>
  <button class="action-btn" :class="{ 'whatsapp-btn': isWhatsApp }" @click="$emit('click')">
    <i :class="icon"></i>
    <span>{{ label }}</span>
  </button>
</template>

<script setup>
defineProps({
  icon: String,
  label: String,
  isWhatsApp: Boolean,
})

defineEmits(['click'])
</script>

<style scoped>
.action-btn {
  background: #222;
  border: 1px solid #333;
  padding: 1.5rem 1rem;
  border-radius: 14px;
  color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  min-height: 120px;
}

.action-btn i {
  font-size: 1.8rem;
  color: var(--theme-color, #ffd700);
}

.action-btn span {
  font-size: 1rem;
  font-weight: 500;
}

.action-btn:hover {
  background: var(--theme-color, #ffd700);
  color: #000;
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(var(--theme-color-rgb, 255, 215, 0), 0.3);
}

.action-btn:hover i {
  color: #000;
}

.whatsapp-btn {
  background: var(--theme-color, #ffd700) !important;
  color: #000 !important;
  border-color: var(--theme-color, #ffd700) !important;
}

.whatsapp-btn:hover {
  filter: brightness(1.1);
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(var(--theme-color-rgb, 255, 215, 0), 0.4);
}

.whatsapp-btn i {
  color: #000 !important;
}

.whatsapp-btn:hover i {
  color: #000 !important;
}
</style>
