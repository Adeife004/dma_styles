<template>
  <section id="services" class="services-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <span class="subtitle">What We Offer</span>
        <h2 class="section-title">Our <span class="highlight">Services</span></h2>
        <p class="section-description">
          From concept to creation, we provide comprehensive fashion solutions tailored to your
          unique style and needs
        </p>
      </div>

      <!-- Services Grid -->
      <div class="services-grid">
        <div
          v-for="(service, index) in services"
          :key="index"
          class="service-card"
          :style="{ animationDelay: `${index * 0.15}s` }"
          @mouseenter="hoveredIndex = index"
          @mouseleave="hoveredIndex = null"
        >
          <div class="card-inner">
            <!-- Icon -->
            <div class="service-icon">
              <span class="icon">{{ service.icon }}</span>
            </div>

            <!-- Content -->
            <h3 class="service-title">{{ service.title }}</h3>
            <p class="service-description">{{ service.description }}</p>

            <!-- Features List -->
            <ul class="service-features">
              <li v-for="(feature, i) in service.features" :key="i">
                <span class="check-icon">✓</span>
                {{ feature }}
              </li>
            </ul>

            <!-- Price Range -->
            <div class="price-range">
              <span class="from">From</span>
              <span class="price">{{ service.price }}</span>
            </div>

            <!-- CTA Button -->
            <button class="btn-service">Book Now</button>
          </div>

          <!-- Decorative Elements -->
          <div class="card-decoration"></div>
        </div>
      </div>

      <!-- Bottom CTA -->
      <div class="bottom-cta">
        <div class="cta-content">
          <h3 class="cta-title">Not Sure Which Service You Need?</h3>
          <p class="cta-text">
            Schedule a free consultation and let us help you find the perfect solution
          </p>
          <button class="btn-consultation">Book Free Consultation</button>
        </div>
      </div>
    </div>

    <!-- Background Decorations -->
    <div class="bg-decoration decoration-1"></div>
    <div class="bg-decoration decoration-2"></div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const hoveredIndex = ref(null)

const services = ref([
  {
    icon: '👔',
    title: 'Custom Tailoring',
    description:
      'Bespoke clothing designed and tailored to your exact measurements and preferences',
    features: [
      'Perfect fit guarantee',
      'Premium fabric selection',
      'Multiple fitting sessions',
      'Personalized design consultation',
    ],
    price: '₦50,000',
  },
  {
    icon: '💍',
    title: 'Bridal & Wedding',
    description: 'Stunning wedding attire for your special day, from bridal gowns to groomswear',
    features: [
      'Custom bridal gowns',
      'Bridesmaid dresses',
      'Groomsmen suits',
      'Accessories coordination',
    ],
    price: '₦150,000',
  },
  {
    icon: '✨',
    title: 'Formal Wear',
    description: 'Elegant formal attire for corporate events, galas, and special occasions',
    features: [
      'Business suits',
      'Evening gowns',
      'Tuxedos & dinner jackets',
      'Professional styling advice',
    ],
    price: '₦60,000',
  },
  {
    icon: '🎭',
    title: 'Traditional Attire',
    description: 'Authentic traditional wear that honors culture while embracing modern style',
    features: [
      'Aso-ebi coordination',
      'Agbada & Kaftan',
      'Traditional gowns',
      'Cultural accessories',
    ],
    price: '₦40,000',
  },
  {
    icon: '✂️',
    title: 'Alterations & Repairs',
    description: 'Expert alterations and repairs to restore or modify your existing garments',
    features: ['Hemming & resizing', 'Zipper replacement', 'Fabric repairs', 'Style modifications'],
    price: '₦5,000',
  },
  {
    icon: '🎨',
    title: 'Fashion Consultation',
    description: 'Personal styling sessions to help you discover and refine your unique style',
    features: ['Wardrobe analysis', 'Style recommendations', 'Color matching', 'Trend guidance'],
    price: '₦20,000',
  },
])
</script>

<style scoped>
.services-section {
  padding: 120px 0;
  background: linear-gradient(180deg, #0a0a0a 0%, #000000 100%);
  position: relative;
  overflow: hidden;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
  position: relative;
  z-index: 2;
}

/* Background Decorations */
.bg-decoration {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}

.decoration-1 {
  top: 10%;
  left: -5%;
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%);
  animation: float 8s ease-in-out infinite;
}

.decoration-2 {
  bottom: 20%;
  right: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, transparent 70%);
  animation: float 10s ease-in-out infinite reverse;
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
}

.highlight {
  color: #ffd700;
  font-style: italic;
}

.section-description {
  font-size: 18px;
  color: #b0b0b0;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 40px;
  margin-bottom: 80px;
}

.service-card {
  position: relative;
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 16px;
  padding: 40px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
  overflow: hidden;
}

.service-card:hover {
  transform: translateY(-10px);
  border-color: rgba(255, 215, 0, 0.5);
  box-shadow: 0 20px 60px rgba(255, 215, 0, 0.2);
  background: rgba(20, 20, 20, 0.8);
}

.card-inner {
  position: relative;
  z-index: 2;
}

.card-decoration {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.15) 0%, transparent 70%);
  transition: all 0.5s ease;
}

.service-card:hover .card-decoration {
  transform: scale(2);
}

/* Service Icon */
.service-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.05));
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  transition: all 0.4s ease;
}

.service-card:hover .service-icon {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.3), rgba(255, 215, 0, 0.1));
  border-color: #ffd700;
  transform: rotate(5deg) scale(1.1);
}

.icon {
  font-size: 36px;
}

/* Service Content */
.service-title {
  font-family: 'Playfair Display', serif;
  font-size: 26px;
  color: white;
  margin-bottom: 15px;
  font-weight: 500;
}

.service-description {
  font-size: 15px;
  color: #b0b0b0;
  line-height: 1.7;
  margin-bottom: 25px;
}

/* Features List */
.service-features {
  list-style: none;
  padding: 0;
  margin: 0 0 25px 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.service-features li {
  font-size: 14px;
  color: #d0d0d0;
  display: flex;
  align-items: center;
  gap: 10px;
}

.check-icon {
  width: 20px;
  height: 20px;
  background: rgba(255, 215, 0, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffd700;
  font-size: 12px;
  font-weight: bold;
  flex-shrink: 0;
}

/* Price Range */
.price-range {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 25px;
  padding: 20px 0;
  border-top: 1px solid rgba(255, 215, 0, 0.2);
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
}

.from {
  font-size: 14px;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.price {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  color: #ffd700;
  font-weight: 600;
}

/* Service Button */
.btn-service {
  width: 100%;
  padding: 14px;
  background: transparent;
  color: #ffd700;
  border: 2px solid #ffd700;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.btn-service::before {
  content: '';
  position: absolute;
  inset: 0;
  background: #ffd700;
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.4s ease;
  z-index: -1;
}

.btn-service:hover::before {
  transform: scaleY(1);
}

.btn-service:hover {
  color: #000;
}

/* Bottom CTA */
.bottom-cta {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05));
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 16px;
  padding: 60px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.bottom-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.05) 50%, transparent 70%);
  animation: shimmer 3s linear infinite;
}

.cta-content {
  position: relative;
  z-index: 2;
}

.cta-title {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  color: white;
  margin-bottom: 15px;
  font-weight: 500;
}

.cta-text {
  font-size: 16px;
  color: #b0b0b0;
  margin-bottom: 30px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.btn-consultation {
  padding: 16px 40px;
  background: #ffd700;
  color: #000;
  border: none;
  font-size: 14px;
  font-weight: 600;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.4s ease;
}

.btn-consultation:hover {
  background: #ffed4e;
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.4);
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

@keyframes float {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(5deg);
  }
}

@keyframes shimmer {
  0% {
    transform: translateX(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) rotate(45deg);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .services-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
  }
}

@media (max-width: 768px) {
  .services-section {
    padding: 80px 0;
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

  .services-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .service-card {
    padding: 30px;
  }

  .bottom-cta {
    padding: 40px 25px;
  }

  .cta-title {
    font-size: 24px;
  }
}
</style>
