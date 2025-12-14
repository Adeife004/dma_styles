<template>
  <section id="collection" class="featured-collection">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <span class="subtitle">Discover</span>
        <h2 class="section-title">Featured <span class="highlight">Collection</span></h2>
        <p class="section-description">
          Handcrafted pieces that blend timeless elegance with contemporary style
        </p>
      </div>

      <!-- Collection Grid -->
      <div class="collection-grid">
        <div
          v-for="(item, index) in collections"
          :key="index"
          class="collection-item"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @mouseenter="hoveredItem = index"
          @mouseleave="hoveredItem = null"
          @click="selectCollection(item)"
        >
          <div class="image-wrapper">
            <img :src="item.image" :alt="item.title" />
            <div class="overlay" :class="{ active: hoveredItem === index }">
              <div class="details-content">
                <h4 class="detail-title">{{ item.title }}</h4>
                <p class="detail-description">{{ item.description }}</p>
                <div class="detail-features">
                  <span v-for="(feature, i) in item.features" :key="i" class="feature-tag">
                    {{ feature }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div class="item-info">
            <h3 class="item-title">{{ item.title }}</h3>
            <p class="item-category">{{ item.category }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from '../composables/useTheme'
import image1 from '../assets/bridal_luxe.jpg'
import image2 from '../assets/royal_statement.jpeg'
import image3 from '../assets/ball_gown.jpeg'
import image4 from '../assets/cooperate.jpeg'
import image5 from '../assets/dinner_dress.avif'
import image6 from '../assets/blazer.avif'

const hoveredItem = ref(null)
const { setTheme } = useTheme()

const collections = ref([
  {
    title: 'Bridal Luxe',
    category: 'Wedding',
    image: image1,
    description:
      'Exquisite wedding gowns designed to make your special day unforgettable with intricate lace and premium fabrics.',
    features: ['Custom Fit', 'Premium Lace', 'Hand-Embroidered'],
    themeColor: '#ffd700', // Gold
  },
  {
    title: 'Royal Statement',
    category: 'Traditional',
    image: image2,
    description:
      'Bold traditional attire that celebrates African heritage with rich colors and authentic cultural designs.',
    features: ['Cultural Design', 'Rich Fabrics', 'Bespoke Tailoring'],
    themeColor: '#ff6b6b', // Rose Red
  },
  {
    title: 'Modern Fairytale',
    category: 'Ball Gown',
    image: image3,
    description:
      'Enchanting ball gowns perfect for galas and formal events, combining elegance with contemporary fashion.',
    features: ['Elegant Draping', 'Statement Piece', 'Red Carpet Ready'],
    themeColor: '#b8860b', // Dark Gold
  },
  {
    title: 'Modern Classic',
    category: 'Business',
    image: image4,
    description:
      'Professional corporate wear tailored to perfection, ensuring you look sharp and confident in any business setting.',
    features: ['Professional Cut', 'Premium Wool', 'All-Day Comfort'],
    themeColor: '#c0c0c0', // Silver
  },
  {
    title: 'Evening Elegance',
    category: 'Dinner Dress',
    image: image5,
    description:
      'Sophisticated dinner dresses that exude grace and charm, perfect for upscale dining and evening occasions.',
    features: ['Timeless Design', 'Luxe Fabric', 'Figure-Flattering'],
    themeColor: '#daa520', // Goldenrod
  },
  {
    title: 'Executive Power',
    category: 'Blazer',
    image: image6,
    description:
      'Impeccably tailored blazers that command attention and respect in every boardroom and business meeting.',
    features: ['Sharp Tailoring', 'Premium Finish', 'Versatile Style'],
    themeColor: '#ffd700', // Gold
  },
])

const selectCollection = (item) => {
  setTheme(item.themeColor)
}
</script>

<style scoped>
.featured-collection {
  padding: 100px 0;
  background: linear-gradient(180deg, #000000 0%, #0a0a0a 100%);
  position: relative;
  overflow: hidden;
}

.featured-collection::before {
  content: '';
  position: absolute;
  top: 0;
  left: 50%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
  transform: translateX(-50%);
  pointer-events: none;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

/* Section Header */
.section-header {
  text-align: center;
  margin-bottom: 80px;
  animation: fadeInUp 1s ease;
}

.subtitle {
  font-size: 14px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--theme-color);
  font-weight: 300;
  display: block;
  margin-bottom: 15px;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  font-weight: 400;
  color: white;
  margin-bottom: 20px;
  letter-spacing: 1px;
}

.highlight {
  color: var(--theme-color);
  font-style: italic;
}

.section-description {
  font-size: 18px;
  color: #b0b0b0;
  max-width: 600px;
  margin: 0 auto;
  line-height: 1.8;
}

/* Collection Grid */
.collection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.collection-item {
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.collection-item:hover {
  transform: translateY(-8px);
}

.image-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 8px;
  aspect-ratio: 3/4;
  margin-bottom: 20px;
  background: #1a1a1a;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.collection-item:hover .image-wrapper img {
  transform: scale(1.08);
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.95) 0%,
    rgba(0, 0, 0, 0.85) 60%,
    rgba(0, 0, 0, 0.6) 100%
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 30px;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  pointer-events: none;
}

.overlay.active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: all;
}

.details-content {
  width: 100%;
  text-align: center;
  transform: translateY(30px);
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
}

.overlay.active .details-content {
  transform: translateY(0);
}

.detail-title {
  font-family: 'Playfair Display', serif;
  font-size: 28px;
  color: var(--theme-color);
  margin-bottom: 12px;
  font-weight: 500;
}

.detail-description {
  font-size: 14px;
  color: #e0e0e0;
  line-height: 1.6;
  margin-bottom: 20px;
  padding: 0 10px;
}

.detail-features {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 8px;
}

.feature-tag {
  padding: 6px 14px;
  background: rgba(var(--theme-color-rgb), 0.15);
  border: 1px solid rgba(var(--theme-color-rgb), 0.3);
  color: var(--theme-color);
  font-size: 11px;
  font-weight: 500;
  letter-spacing: 1px;
  text-transform: uppercase;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.feature-tag:hover {
  background: rgba(var(--theme-color-rgb), 0.25);
  border-color: var(--theme-color);
}

/* Item Info */
.item-info {
  text-align: center;
}

.item-title {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  color: white;
  margin-bottom: 8px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.collection-item:hover .item-title {
  color: var(--theme-color);
}

.item-category {
  font-size: 14px;
  color: var(--theme-color);
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 300;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .collection-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
  }

  .detail-title {
    font-size: 24px;
  }

  .detail-description {
    font-size: 13px;
  }
}

@media (max-width: 768px) {
  .featured-collection {
    padding: 60px 0;
  }

  .container {
    padding: 0 20px;
  }

  .section-title {
    font-size: 36px;
  }

  .section-description {
    font-size: 16px;
  }

  .collection-grid {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  .item-title {
    font-size: 20px;
  }

  .overlay {
    padding: 20px;
  }

  .detail-title {
    font-size: 22px;
    margin-bottom: 10px;
  }

  .detail-description {
    font-size: 12px;
    margin-bottom: 15px;
  }

  .detail-features {
    margin-bottom: 0;
  }

  .feature-tag {
    font-size: 10px;
    padding: 5px 12px;
  }
}

@media (max-width: 480px) {
  .collection-grid {
    grid-template-columns: 1fr;
  }

  .section-title {
    font-size: 28px;
  }

  .detail-title {
    font-size: 20px;
  }

  .detail-description {
    font-size: 11px;
    padding: 0 5px;
  }
}
</style>
