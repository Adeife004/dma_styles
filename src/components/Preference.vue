<template>
  <div class="preference-section">
    <h2 class="section-title"><i class="fas fa-sliders-h"></i> Style Preferences</h2>

    <div class="settings-form">
      <!-- Accent Color Preferences -->
      <div class="form-group">
        <label><i class="fas fa-palette"></i> Accent Color Theme</label>
        <p class="description">Choose your preferred accent color for highlights and buttons</p>
        <div class="color-picker-grid">
          <div
            v-for="color in colorOptions"
            :key="color.value"
            :class="['color-option', { selected: selectedAccentColor === color.value }]"
            @click="selectAccentColor(color.value)"
          >
            <div class="color-preview" :style="{ backgroundColor: color.hex }"></div>
            <span class="color-name">{{ color.name }}</span>
            <i v-if="selectedAccentColor === color.value" class="fas fa-check-circle"></i>
          </div>
        </div>
      </div>

      <!-- Occasion Preferences -->
      <div class="form-group">
        <label><i class="fas fa-calendar-alt"></i> Preferred Occasions</label>
        <div class="checkbox-group">
          <label v-for="occasion in occasionOptions" :key="occasion" class="checkbox-label">
            <input type="checkbox" :value="occasion" v-model="preferences.occasions" />
            <span>{{ occasion }}</span>
          </label>
        </div>
      </div>

      <!-- Style Preferences -->
      <div class="form-group">
        <label><i class="fas fa-star"></i> Preferred Styles</label>
        <div class="checkbox-group">
          <label v-for="style in styleOptions" :key="style" class="checkbox-label">
            <input type="checkbox" :value="style" v-model="preferences.styles" />
            <span>{{ style }}</span>
          </label>
        </div>
      </div>

      <!-- Size Preferences -->
      <div class="form-group">
        <label><i class="fas fa-ruler"></i> Typical Size Range</label>
        <div class="size-selector">
          <select v-model="preferences.sizeRange" class="select-input">
            <option value="">Select your size range</option>
            <option value="XS-S">Extra Small - Small</option>
            <option value="M-L">Medium - Large</option>
            <option value="XL-XXL">Extra Large - XXL</option>
            <option value="XXXL+">XXXL and above</option>
            <option value="custom">Custom Measurements</option>
          </select>
        </div>
      </div>

      <button class="btn-primary" @click="savePreferences">
        <i class="fas fa-save"></i> Save Preferences
      </button>
    </div>

    <!-- Preview Section -->
    <div class="preview-section">
      <h3><i class="fas fa-eye"></i> Color Preview</h3>
      <div class="preview-card" :style="previewStyles">
        <p>This is how your accent color will look</p>
        <button class="preview-button">Sample Button</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Swal from 'sweetalert2'
import { useTheme } from '../composables/useTheme'

const { saveThemeColor, themeColor } = useTheme()

const selectedAccentColor = ref('gold')
const preferences = ref({
  occasions: ['Casual', 'Formal'],
  styles: ['Classic', 'Modern'],
  sizeRange: '',
})

const colorOptions = [
  { value: 'gold', hex: '#FFD700', name: 'Gold (Default)' },
  { value: 'silver', hex: '#C0C0C0', name: 'Silver' },
  { value: 'rose-gold', hex: '#B76E79', name: 'Rose Gold' },
  { value: 'blue', hex: '#2196F3', name: 'Royal Blue' },
  { value: 'emerald', hex: '#50C878', name: 'Emerald Green' },
  { value: 'purple', hex: '#9C27B0', name: 'Royal Purple' },
  { value: 'burgundy', hex: '#800020', name: 'Burgundy' },
  { value: 'teal', hex: '#008B8B', name: 'Teal' },
]

const occasionOptions = [
  'Casual Wear',
  'Formal Events',
  'Business/Corporate',
  'Traditional Ceremonies',
  'Parties & Celebrations',
  'Wedding Events',
]

const styleOptions = [
  'Classic',
  'Modern',
  'Casual',
  'Formal',
  'Traditional',
  'Trendy',
  'Minimalist',
  'Bold & Statement',
]

const previewStyles = computed(() => ({
  borderColor: colorOptions.find((c) => c.value === selectedAccentColor.value)?.hex || '#FFD700',
}))

function selectAccentColor(color) {
  selectedAccentColor.value = color
  const colorData = colorOptions.find((c) => c.value === color)
  if (colorData) {
    // Use the composable to save and apply the theme
    saveThemeColor(colorData.hex)
  }
}

async function savePreferences() {
  // Save preferences to localStorage
  localStorage.setItem(
    'userPreferences',
    JSON.stringify({
      accentColor: selectedAccentColor.value,
      occasions: preferences.value.occasions,
      styles: preferences.value.styles,
      sizeRange: preferences.value.sizeRange,
    }),
  )

  const selectedColor = colorOptions.find((c) => c.value === selectedAccentColor.value)

  await Swal.fire({
    title: 'Preferences Saved!',
    text: 'Your style preferences have been updated successfully',
    icon: 'success',
    confirmButtonColor: selectedColor?.hex || '#ffd700',
  })
}

// Load saved preferences on mount
onMounted(() => {
  const savedPreferences = localStorage.getItem('userPreferences')
  const savedAccentColorHex = localStorage.getItem('userAccentColorHex')

  if (savedPreferences) {
    const parsed = JSON.parse(savedPreferences)
    preferences.value = {
      occasions: parsed.occasions || [],
      styles: parsed.styles || [],
      sizeRange: parsed.sizeRange || '',
    }
  }

  // Find the color that matches the saved hex
  if (savedAccentColorHex) {
    const matchedColor = colorOptions.find((c) => c.hex === savedAccentColorHex)
    if (matchedColor) {
      selectedAccentColor.value = matchedColor.value
    }
  }
})
</script>

<style scoped>
.preference-section {
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
  color: #ffd700;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.settings-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group label {
  color: #ccc;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.form-group label i {
  color: var(--accent-color, #ffd700);
  font-size: 1rem;
}

.description {
  color: #999;
  font-size: 0.9rem;
  margin-top: -0.5rem;
}

.color-picker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 1rem;
}

.color-option {
  background: #222;
  border: 2px solid #333;
  border-radius: 12px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  position: relative;
}

.color-option:hover {
  border-color: #555;
  background: #2a2a2a;
  transform: translateY(-3px);
  box-shadow: 0 6px 25px rgba(var(--theme-color-rgb, 255, 215, 0), 0.6);
}

.color-option.selected {
  border-color: var(--accent-color, #ffd700);
  background: #2a2a2a;
  box-shadow:
    0 0 0 2px #000,
    0 0 0 4px var(--accent-color, #ffd700);
}

.color-preview {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 6px 25px rgba(var(--theme-color-rgb, 255, 215, 0), 0.6);
}

.color-name {
  color: #ccc;
  font-size: 0.85rem;
  text-align: center;
  font-weight: 500;
}

.color-option i {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  color: var(--accent-color, #ffd700);
  font-size: 1.2rem;
}

.checkbox-group {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem;
  background: #222;
  border: 1px solid #333;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.checkbox-label:hover {
  background: #2a2a2a;
  border-color: var(--accent-color, #ffd700);
}

.checkbox-label input[type='checkbox'] {
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: var(--accent-color, #ffd700);
}

.checkbox-label span {
  color: #ccc;
  font-size: 0.9rem;
  font-weight: 500;
}

.size-selector {
  width: 100%;
}

.select-input {
  width: 100%;
  padding: 1rem;
  background: #222;
  border: 1px solid #444;
  border-radius: 10px;
  color: #fff;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.select-input:focus {
  outline: none;
  border-color: var(--accent-color, #ffd700);
  background: #2a2a2a;
}

.select-input option {
  background: #222;
  color: #fff;
  padding: 0.5rem;
}

.btn-primary {
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  transition: all 0.3s ease;
  background: var(--accent-color, #ffd700);
  color: #000;
  margin-top: 1rem;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(var(--theme-color-rgb, 255, 215, 0), 0.6);
  filter: brightness(1.1);
}

.preview-section {
  margin-top: 3rem;
  padding-top: 2rem;
  border-top: 1px solid #333;
}

.preview-section h3 {
  color: var(--accent-color, #ffd700);
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.preview-card {
  background: #222;
  border: 3px solid var(--accent-color, #ffd700);
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.preview-card p {
  color: #ccc;
  font-size: 1rem;
  margin-bottom: 1.5rem;
}

.preview-button {
  padding: 0.75rem 2rem;
  background: var(--accent-color, #ffd700);
  color: #000;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.preview-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 25px rgba(var(--theme-color-rgb, 255, 215, 0), 0.6);
}

@media (max-width: 768px) {
  .color-picker-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  }

  .checkbox-group {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .color-picker-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>
