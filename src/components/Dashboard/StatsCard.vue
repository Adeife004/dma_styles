<template>
  <div class="stat-card">
    <div class="stat-icon" :class="iconClass">
      <i :class="icon"></i>
    </div>
    <div class="stat-details">
      <h4>{{ title }}</h4>
      <p class="stat-value">{{ value }}</p>
      <span class="stat-change">{{ subtitle }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  title: String,
  value: [String, Number],
  subtitle: String,
  iconClass: String,
})
</script>

<style scoped>
.stat-card {
  background: linear-gradient(135deg, #1a1a1a, #252525);
  border: 1px solid #333;
  border-radius: 16px;
  padding: 1.8rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  transition: all 0.3s ease;
  cursor: pointer;
}

.stat-card:hover {
  border-color: var(--theme-color, #ffd700);
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(var(--theme-color-rgb, 255, 215, 0), 0.2);
}

.stat-icon {
  width: 65px;
  height: 65px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  flex-shrink: 0;
}

.stat-icon.orders {
  background: rgba(76, 175, 80, 0.2);
  color: #4caf50;
}

.stat-icon.pending {
  background: rgba(255, 193, 7, 0.2);
  color: #ffc107;
}

.stat-icon.completed {
  background: rgba(33, 150, 243, 0.2);
  color: #2196f3;
}

.stat-icon.revenue {
  background: rgba(var(--theme-color-rgb, 255, 215, 0), 0.2);
  color: var(--theme-color, #ffd700);
}

.stat-details h4 {
  color: #999;
  font-size: 0.9rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.stat-value {
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin-bottom: 6px;
}

.stat-change {
  font-size: 0.85rem;
  color: #666;
}
</style>
