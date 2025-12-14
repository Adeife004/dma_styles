<template>
  <section id="testimonials" class="testimonials-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <span class="subtitle">Testimonials</span>
        <h2 class="section-title">What Our <span class="highlight">Clients Say</span></h2>
        <p class="section-description">
          Don't just take our word for it - hear from some of our satisfied clients about their
          experience with DMA Styles
        </p>
      </div>

      <!-- Testimonials Grid -->
      <div class="testimonials-grid">
        <div
          v-for="(testimonial, index) in testimonials"
          :key="index"
          class="testimonial-card"
          :style="{ animationDelay: `${index * 0.15}s` }"
        >
          <!-- Quote Icon -->
          <div class="quote-icon">"</div>

          <!-- Rating Stars -->
          <div class="rating">
            <span v-for="star in 5" :key="star" class="star">★</span>
          </div>

          <!-- Testimonial Text -->
          <p class="testimonial-text">{{ testimonial.text }}</p>

          <!-- Client Info -->
          <div class="client-info">
            <div class="client-avatar">
              <i class="fa-solid fa-user"></i>
            </div>
            <div class="client-details">
              <h4 class="client-name">{{ testimonial.name }}</h4>
              <p class="client-role">{{ testimonial.role }}</p>
              <p class="client-occasion">{{ testimonial.occasion }}</p>
            </div>
          </div>

          <!-- Decorative Element -->
          <div class="card-shine"></div>
        </div>
      </div>

      <!-- Stats Row -->
      <div class="stats-row">
        <div class="stat-box">
          <h3 class="stat-number">100+</h3>
          <p class="stat-label">Happy Clients</p>
        </div>
        <div class="stat-box">
          <h3 class="stat-number">4.9/5</h3>
          <p class="stat-label">Average Rating</p>
        </div>
        <div class="stat-box">
          <h3 class="stat-number">98%</h3>
          <p class="stat-label">Satisfaction Rate</p>
        </div>
        <div class="stat-box">
          <h3 class="stat-number">80+</h3>
          <p class="stat-label">Designs Created</p>
        </div>
      </div>
    </div>

    <!-- Background Decoration -->
    <div class="bg-pattern"></div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const testimonials = ref([
  {
    text: 'DMA Styles transformed my wedding vision into reality! The attention to detail and craftsmanship was exceptional. My bridal gown was absolutely stunning, and I received so many compliments. They truly understood my style and delivered perfection.',
    name: 'Chioma Adebayo',
    role: 'Bride',
    occasion: 'Wedding Gown',
  },
  {
    text: 'I have been a loyal customer for 3 years now. Every piece I order exceeds my expectations. The quality, fit, and design are always top-notch. DMA Styles has become my go-to for all special occasions.',
    name: 'Tunde Okafor',
    role: 'Business Executive',
    occasion: 'Custom Suits',
  },
  {
    text: 'The team at DMA Styles is incredibly professional and talented. They listened to my ideas and created a traditional outfit that was both modern and culturally authentic. The fabric quality and finishing were impeccable!',
    name: 'Amina Ibrahim',
    role: 'Fashion Enthusiast',
    occasion: 'Traditional Attire',
  },
  {
    text: 'As someone who values quality and style, I can confidently say DMA Styles delivers both. Their custom tailoring service is unmatched. The fit is always perfect, and the designs are contemporary yet timeless.',
    name: 'David Mensah',
    role: 'Entrepreneur',
    occasion: 'Formal Wear',
  },
  {
    text: "My daughter's prom dress was a masterpiece! The designer worked closely with us to create something unique and age-appropriate. She felt like a princess, and the dress photographs beautifully.",
    name: 'Grace Nwosu',
    role: 'Parent',
    occasion: 'Prom Dress',
  },
  {
    text: 'Outstanding service from consultation to delivery! The alterations were done perfectly, and my outfit fit like a glove. DMA Styles has earned a customer for life. Highly recommend to anyone looking for quality fashion.',
    name: 'Femi Adeyemi',
    role: 'Corporate Professional',
    occasion: 'Business Attire',
  },
])
</script>

<style scoped>
.testimonials-section {
  padding: 120px 0;
  background: linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%);
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

/* Background Pattern */
.bg-pattern {
  position: absolute;
  inset: 0;
  opacity: 0.03;
  background-image:
    repeating-linear-gradient(
      45deg,
      var(--theme-color) 0,
      var(--theme-color) 1px,
      transparent 0,
      transparent 50%
    ),
    repeating-linear-gradient(
      -45deg,
      var(--theme-color) 0,
      var(--theme-color) 1px,
      transparent 0,
      transparent 50%
    );
  background-size: 20px 20px;
  pointer-events: none;
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
}

.highlight {
  color: var(--theme-color);
  font-style: italic;
}

.section-description {
  font-size: 18px;
  color: #b0b0b0;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.8;
}

/* Testimonials Grid */
.testimonials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 35px;
  margin-bottom: 80px;
}

.testimonial-card {
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--theme-color-rgb), 0.2);
  border-radius: 20px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
}

.testimonial-card:hover {
  transform: translateY(-10px);
  border-color: rgba(var(--theme-color-rgb), 0.5);
  box-shadow: 0 20px 60px rgba(var(--theme-color-rgb), 0.2);
  background: rgba(20, 20, 20, 0.8);
}

.card-shine {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(var(--theme-color-rgb), 0.1) 50%,
    transparent 70%
  );
  transform: rotate(45deg);
  transition: all 0.6s ease;
  pointer-events: none;
}

.testimonial-card:hover .card-shine {
  animation: shine 1.5s ease-in-out;
}

/* Quote Icon */
.quote-icon {
  font-size: 80px;
  font-family: 'Playfair Display', serif;
  color: rgba(var(--theme-color-rgb), 0.2);
  line-height: 1;
  margin-bottom: -10px;
}

/* Rating Stars */
.rating {
  display: flex;
  gap: 5px;
  margin-bottom: 20px;
}

.star {
  color: var(--theme-color);
  font-size: 20px;
}

/* Testimonial Text */
.testimonial-text {
  font-size: 16px;
  color: #d0d0d0;
  line-height: 1.8;
  margin-bottom: 30px;
  font-style: italic;
}

/* Client Info */
.client-info {
  display: flex;
  gap: 15px;
  align-items: center;
  padding-top: 25px;
  border-top: 1px solid rgba(var(--theme-color-rgb), 0.2);
}

.client-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  border: 3px solid rgba(var(--theme-color-rgb), 0.5);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    135deg,
    rgba(var(--theme-color-rgb), 0.2),
    rgba(var(--theme-color-rgb), 0.05)
  );
  font-size: 24px;
  color: var(--theme-color);
}

.client-avatar i {
  transition: transform 0.3s ease;
}

.testimonial-card:hover .client-avatar i {
  transform: scale(1.1);
}

.client-details {
  flex: 1;
}

.client-name {
  font-size: 18px;
  color: white;
  font-weight: 600;
  margin-bottom: 5px;
}

.client-role {
  font-size: 14px;
  color: var(--theme-color);
  margin-bottom: 3px;
}

.client-occasion {
  font-size: 13px;
  color: #888;
}

/* Stats Row */
.stats-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
  padding: 50px 0;
  border-top: 1px solid rgba(var(--theme-color-rgb), 0.2);
  border-bottom: 1px solid rgba(var(--theme-color-rgb), 0.2);
}

.stat-box {
  text-align: center;
  padding: 20px;
  background: linear-gradient(
    135deg,
    rgba(var(--theme-color-rgb), 0.1),
    rgba(var(--theme-color-rgb), 0.05)
  );
  border-radius: 12px;
  transition: all 0.4s ease;
}

.stat-box:hover {
  transform: translateY(-5px);
  background: linear-gradient(
    135deg,
    rgba(var(--theme-color-rgb), 0.15),
    rgba(var(--theme-color-rgb), 0.08)
  );
}

.stat-number {
  font-family: 'Playfair Display', serif;
  font-size: 48px;
  color: var(--theme-color);
  font-weight: 600;
  margin-bottom: 10px;
}

.stat-label {
  font-size: 14px;
  color: #b0b0b0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Testimonial CTA */
.testimonial-cta {
  text-align: center;
  background: linear-gradient(
    135deg,
    rgba(var(--theme-color-rgb), 0.15),
    rgba(var(--theme-color-rgb), 0.05)
  );
  border: 2px solid rgba(var(--theme-color-rgb), 0.3);
  border-radius: 16px;
  padding: 60px 40px;
  position: relative;
  overflow: hidden;
}

.testimonial-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(var(--theme-color-rgb), 0.1) 50%,
    transparent 70%
  );
  animation: shimmer 3s linear infinite;
}

.cta-title {
  font-family: 'Playfair Display', serif;
  font-size: 36px;
  color: white;
  margin-bottom: 15px;
  font-weight: 500;
  position: relative;
  z-index: 2;
}

.cta-text {
  font-size: 16px;
  color: #b0b0b0;
  margin-bottom: 30px;
  position: relative;
  z-index: 2;
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

@keyframes shine {
  0% {
    transform: rotate(45deg) translateX(-100%);
  }
  100% {
    transform: rotate(45deg) translateX(100%);
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
  .testimonials-grid {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 25px;
  }
}

@media (max-width: 768px) {
  .testimonials-section {
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

  .testimonials-grid {
    grid-template-columns: 1fr;
    gap: 25px;
  }

  .testimonial-card {
    padding: 30px;
  }

  .quote-icon {
    font-size: 60px;
  }

  .stats-row {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }

  .stat-number {
    font-size: 36px;
  }

  .testimonial-cta {
    padding: 40px 25px;
  }

  .cta-title {
    font-size: 28px;
  }
}
</style>
