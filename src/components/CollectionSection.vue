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
        >
          <div class="image-wrapper">
            <img :src="item.image" :alt="item.title" />
            <div class="overlay">
              <button class="view-btn">View Details</button>
            </div>
          </div>
          <div class="item-info">
            <h3 class="item-title">{{ item.title }}</h3>
            <p class="item-category">{{ item.category }}</p>
          </div>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="section-cta">
        <button class="btn-explore">Explore Full Collection</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const collections = ref([
  {
    title: 'Evening Elegance',
    category: 'Formal Wear',
    image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?w=600',
  },
  {
    title: 'Summer Breeze',
    category: 'Casual Wear',
    image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600',
  },
  {
    title: 'Royal Statement',
    category: 'Traditional',
    image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?w=600',
  },
  {
    title: 'Modern Classic',
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600',
  },
  {
    title: 'Bridal Luxe',
    category: 'Wedding',
    image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600',
  },
  {
    title: 'Street Chic',
    category: 'Streetwear',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600',
  },
])
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
  color: #ffd700;
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
  color: #ffd700;
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
  transform: scale(1.1);
}

.overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.8) 0%,
    rgba(0, 0, 0, 0.4) 50%,
    transparent 100%
  );
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.4s ease;
}

.collection-item:hover .overlay {
  opacity: 1;
}

.view-btn {
  padding: 12px 30px;
  background: #ffd700;
  color: #000;
  border: none;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 4px;
  transform: translateY(20px);
  transition: all 0.4s ease;
}

.collection-item:hover .view-btn {
  transform: translateY(0);
}

.view-btn:hover {
  background: #ffed4e;
  box-shadow: 0 5px 20px rgba(255, 215, 0, 0.4);
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
}

.item-category {
  font-size: 14px;
  color: #ffd700;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-weight: 300;
}

/* Section CTA */
.section-cta {
  text-align: center;
}

.btn-explore {
  padding: 16px 40px;
  background: transparent;
  color: #ffd700;
  border: 2px solid #ffd700;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 6px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.btn-explore::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #ffd700;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.4s ease;
  z-index: -1;
}

.btn-explore:hover::before {
  transform: scaleX(1);
}

.btn-explore:hover {
  color: #000;
  box-shadow: 0 5px 20px rgba(255, 215, 0, 0.3);
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
}
</style>
