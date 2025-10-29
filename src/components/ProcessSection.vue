<template>
  <section class="process-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <span class="subtitle">Our Process</span>
        <h2 class="section-title">How It <span class="highlight">Works</span></h2>
        <p class="section-description">
          From your first consultation to the final fitting, we guide you through every step of
          creating your perfect garment
        </p>
      </div>

      <!-- Process Steps -->
      <div class="process-timeline">
        <div
          v-for="(step, index) in processSteps"
          :key="index"
          class="process-step"
          :class="{ active: activeStep === index }"
          :style="{ animationDelay: `${index * 0.2}s` }"
          @mouseenter="activeStep = index"
        >
          <!-- Step Number Circle -->
          <div class="step-number-wrapper">
            <div class="step-number">
              <span>{{ index + 1 }}</span>
            </div>
            <div v-if="index < processSteps.length - 1" class="connector-line"></div>
          </div>

          <!-- Step Content -->
          <div class="step-content">
            <div class="step-icon">{{ step.icon }}</div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
            <ul class="step-details">
              <li v-for="(detail, i) in step.details" :key="i">{{ detail }}</li>
            </ul>
            <div class="step-duration">
              <span class="clock-icon">⏱️</span>
              <span>{{ step.duration }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Info -->
      <div class="process-info">
        <div class="info-grid">
          <div class="info-card">
            <div class="info-icon">📅</div>
            <h4 class="info-title">Typical Timeline</h4>
            <p class="info-text">2-4 weeks from consultation to completion</p>
          </div>
          <div class="info-card">
            <div class="info-icon">💎</div>
            <h4 class="info-title">Quality Guaranteed</h4>
            <p class="info-text">Free alterations within 30 days of delivery</p>
          </div>
          <div class="info-card">
            <div class="info-icon">🎯</div>
            <h4 class="info-title">Perfect Fit Promise</h4>
            <p class="info-text">Multiple fittings to ensure perfection</p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="process-cta">
        <h3 class="cta-title">Ready to Start Your Journey?</h3>
        <p class="cta-text">Book your consultation today and let's bring your vision to life</p>
        <button class="btn-start">Get Started Now</button>
      </div>
    </div>

    <!-- Animated Background -->
    <div class="animated-bg">
      <div class="bg-circle circle-1"></div>
      <div class="bg-circle circle-2"></div>
      <div class="bg-circle circle-3"></div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const activeStep = ref(null)

const processSteps = ref([
  {
    icon: '💬',
    title: 'Consultation',
    description:
      'We start with understanding your vision, style preferences, and occasion requirements',
    details: [
      'Discuss your style goals and preferences',
      'Review inspiration images and ideas',
      'Explore fabric options and colors',
      'Get expert styling recommendations',
    ],
    duration: '30-45 minutes',
  },
  {
    icon: '📐',
    title: 'Design & Measurements',
    description: 'Our designers create your custom pattern and take precise measurements',
    details: [
      'Professional body measurements',
      'Custom pattern creation',
      'Design sketches and mockups',
      'Fabric selection finalization',
    ],
    duration: '45-60 minutes',
  },
  {
    icon: '✂️',
    title: 'Crafting',
    description:
      'Our skilled artisans bring your design to life with meticulous attention to detail',
    details: [
      'Fabric cutting and preparation',
      'Initial construction and assembly',
      'Hand-stitched details',
      'Quality control checkpoints',
    ],
    duration: '1-2 weeks',
  },
  {
    icon: '👗',
    title: 'First Fitting',
    description: 'Try on your garment and we make any necessary adjustments for the perfect fit',
    details: [
      'Try on your custom piece',
      'Identify adjustment areas',
      'Fine-tune fit and comfort',
      'Style and accessory suggestions',
    ],
    duration: '30 minutes',
  },
  {
    icon: '✨',
    title: 'Final Touches',
    description: 'We add finishing details and make final refinements based on your feedback',
    details: [
      'Complete all adjustments',
      'Add embellishments if needed',
      'Final pressing and finishing',
      'Quality assurance inspection',
    ],
    duration: '3-5 days',
  },
  {
    icon: '🎁',
    title: 'Delivery',
    description: 'Your masterpiece is ready! Receive your garment with care instructions',
    details: [
      'Final fitting and approval',
      'Care and maintenance guidance',
      'Professional packaging',
      'After-care support included',
    ],
    duration: 'Same day',
  },
])
</script>

<style scoped>
.process-section {
  padding: 120px 0;
  background: #000000;
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

/* Animated Background */
.animated-bg {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
}

.bg-circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, transparent 70%);
}

.circle-1 {
  top: 10%;
  left: 5%;
  width: 400px;
  height: 400px;
  animation: float 15s ease-in-out infinite;
}

.circle-2 {
  top: 50%;
  right: 10%;
  width: 350px;
  height: 350px;
  animation: float 20s ease-in-out infinite reverse;
}

.circle-3 {
  bottom: 10%;
  left: 40%;
  width: 300px;
  height: 300px;
  animation: float 18s ease-in-out infinite;
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

/* Process Timeline */
.process-timeline {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  margin-bottom: 80px;
  position: relative;
}

.process-step {
  position: relative;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
}

/* Step Number Wrapper */
.step-number-wrapper {
  position: relative;
  margin-bottom: 30px;
}

.step-number {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.05));
  border: 3px solid rgba(255, 215, 0, 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 600;
  color: #ffd700;
  transition: all 0.4s ease;
  position: relative;
  z-index: 2;
}

.process-step.active .step-number,
.process-step:hover .step-number {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.4), rgba(255, 215, 0, 0.15));
  border-color: #ffd700;
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
}

.connector-line {
  position: absolute;
  top: 50%;
  left: 80px;
  width: calc(100% + 40px);
  height: 2px;
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.5), transparent);
  transform: translateY(-50%);
  z-index: 1;
}

/* Step Content */
.step-content {
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 215, 0, 0.2);
  border-radius: 16px;
  padding: 35px;
  transition: all 0.4s ease;
  height: 100%;
}

.process-step.active .step-content,
.process-step:hover .step-content {
  background: rgba(20, 20, 20, 0.8);
  border-color: rgba(255, 215, 0, 0.5);
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(255, 215, 0, 0.15);
}

.step-icon {
  font-size: 48px;
  margin-bottom: 20px;
  transition: transform 0.4s ease;
}

.process-step:hover .step-icon {
  transform: scale(1.2) rotate(-10deg);
}

.step-title {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  color: white;
  margin-bottom: 15px;
  font-weight: 500;
}

.step-description {
  font-size: 15px;
  color: #b0b0b0;
  line-height: 1.7;
  margin-bottom: 20px;
}

.step-details {
  list-style: none;
  padding: 0;
  margin: 0 0 20px 0;
}

.step-details li {
  font-size: 14px;
  color: #d0d0d0;
  padding: 8px 0;
  padding-left: 25px;
  position: relative;
}

.step-details li::before {
  content: '✓';
  position: absolute;
  left: 0;
  color: #ffd700;
  font-weight: bold;
}

.step-duration {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 15px;
  border-top: 1px solid rgba(255, 215, 0, 0.2);
  font-size: 14px;
  color: #ffd700;
  font-weight: 600;
}

.clock-icon {
  font-size: 18px;
}

/* Process Info */
.process-info {
  margin-bottom: 60px;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.info-card {
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.1), rgba(255, 215, 0, 0.05));
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  transition: all 0.4s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  border-color: #ffd700;
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.2);
}

.info-icon {
  font-size: 48px;
  margin-bottom: 15px;
}

.info-title {
  font-size: 18px;
  color: white;
  margin-bottom: 10px;
  font-weight: 600;
}

.info-text {
  font-size: 14px;
  color: #b0b0b0;
  line-height: 1.6;
}

/* Process CTA */
.process-cta {
  text-align: center;
  background: linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.05));
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 16px;
  padding: 60px 40px;
  position: relative;
  overflow: hidden;
}

.process-cta::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 215, 0, 0.1) 50%, transparent 70%);
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

.btn-start {
  padding: 18px 50px;
  background: #ffd700;
  color: #000;
  border: none;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.4s ease;
  position: relative;
  z-index: 2;
}

.btn-start:hover {
  background: #ffed4e;
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.5);
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
    transform: translate(0, 0);
  }
  50% {
    transform: translate(20px, -20px);
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
  .connector-line {
    display: none;
  }

  .process-timeline {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

@media (max-width: 768px) {
  .process-section {
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

  .process-timeline {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .step-content {
    padding: 25px;
  }

  .info-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .process-cta {
    padding: 40px 25px;
  }

  .cta-title {
    font-size: 28px;
  }
}
</style>
