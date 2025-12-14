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
            <div class="step-icon">
              <i :class="step.icon"></i>
            </div>
            <h3 class="step-title">{{ step.title }}</h3>
            <p class="step-description">{{ step.description }}</p>
            <ul class="step-details">
              <li v-for="(detail, i) in step.details" :key="i">{{ detail }}</li>
            </ul>
            <div class="step-duration">
              <i class="fas fa-clock"></i>
              <span>{{ step.duration }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Info -->
      <div class="process-info">
        <div class="info-grid">
          <div class="info-card">
            <div class="info-icon">
              <i class="fas fa-calendar-alt"></i>
            </div>
            <h4 class="info-title">Typical Timeline</h4>
            <p class="info-text">2-4 weeks from consultation to completion</p>
          </div>
          <div class="info-card">
            <div class="info-icon">
              <i class="fas fa-gem"></i>
            </div>
            <h4 class="info-title">Quality Guaranteed</h4>
            <p class="info-text">Free alterations within 3 days of delivery</p>
          </div>
          <div class="info-card">
            <div class="info-icon">
              <i class="fas fa-bullseye"></i>
            </div>
            <h4 class="info-title">Perfect Fit Promise</h4>
            <p class="info-text">Multiple fittings to ensure perfection</p>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="process-cta">
        <h3 class="cta-title">Ready to Start Your Journey?</h3>
        <p class="cta-text">Book your consultation today and let's bring your vision to life</p>
        <button class="btn-start" @click="bookConsultation">Get Started Now</button>
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
import Swal from 'sweetalert2'

const activeStep = ref(null)

const WHATSAPP_NUMBER = '2348160763959'

const processSteps = ref([
  {
    icon: 'fas fa-comments',
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
    icon: 'fas fa-ruler-combined',
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
    icon: 'fas fa-cut',
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
    icon: 'fas fa-tshirt',
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
    icon: 'fas fa-star',
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
    icon: 'fas fa-gift',
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

// Book Consultation Function
async function bookConsultation() {
  const themeColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--theme-color')
    .trim()

  // Step 1: Show consultation fee notice
  const result = await Swal.fire({
    title: `<strong style="color: ${themeColor};">Book a Consultation</strong>`,
    html: `
      <div style="text-align: left; padding: 20px;">
        <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
          Thank you for your interest in booking a consultation with us!
        </p>
        <div style="background: #fff9e6; padding: 20px; border-radius: 10px; margin-bottom: 20px; border-left: 4px solid ${themeColor};">
          <h3 style="color: #000; margin-bottom: 15px; font-size: 18px;">
            <i class="fas fa-info-circle" style="color: ${themeColor};"></i> Consultation Fee
          </h3>
          <p style="font-size: 28px; color: ${themeColor}; font-weight: bold; margin: 10px 0;">
            ₦5,000
          </p>
          <p style="font-size: 14px; color: #666; margin-top: 10px;">
            This fee covers a comprehensive 30-minute style consultation session where we'll discuss your fashion needs and preferences.
          </p>
        </div>
        <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 15px;">
          <p style="font-size: 14px; color: #555; margin-bottom: 10px;">
            <strong>What's Included:</strong>
          </p>
          <ul style="font-size: 13px; color: #666; margin: 0; padding-left: 20px;">
            <li>Personalized style assessment</li>
            <li>Fabric and design recommendations</li>
            <li>Budget planning guidance</li>
            <li>Timeline discussion</li>
          </ul>
        </div>
        <p style="font-size: 14px; color: #888; margin-top: 20px; font-style: italic;">
          <i class="fas fa-check-circle" style="color: #4caf50;"></i> Payment can be made via bank transfer or cash
        </p>
      </div>
    `,
    icon: 'warning',
    iconColor: themeColor,
    showCancelButton: true,
    confirmButtonText: 'Proceed to WhatsApp',
    cancelButtonText: 'Maybe Later',
    confirmButtonColor: themeColor,
    cancelButtonColor: '#888',
    background: '#fff',
    width: '600px',
  })

  // Step 2: If user confirms, show payment confirmation
  if (result.isConfirmed) {
    const confirmPayment = await Swal.fire({
      title: `<strong style="color: ${themeColor};">Confirm Payment Intent</strong>`,
      html: `
        <div style="text-align: center; padding: 20px;">
          <div style="font-size: 48px; margin-bottom: 20px;">
            💳
          </div>
          <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
            By proceeding, you confirm that you're ready to pay the consultation fee of <strong style="color: ${themeColor};">₦5,000</strong>.
          </p>
          <div style="background: #f0f0f0; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="font-size: 14px; color: #555; margin-bottom: 10px;">
              <strong>Next Steps:</strong>
            </p>
            <ol style="font-size: 13px; color: #666; text-align: left; margin: 0; padding-left: 20px;">
              <li>You'll be redirected to WhatsApp</li>
              <li>Send the pre-filled message</li>
              <li>Our team will provide payment details</li>
              <li>Once paid, we'll schedule your consultation</li>
            </ol>
          </div>
          <p style="font-size: 13px; color: #999; margin-top: 20px;">
            <i class="fas fa-lock" style="color: #4caf50;"></i> Your information is secure
          </p>
        </div>
      `,
      icon: 'question',
      iconColor: themeColor,
      showCancelButton: true,
      confirmButtonText: 'Yes, Contact via WhatsApp',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#25D366',
      cancelButtonColor: '#888',
      background: '#fff',
      width: '550px',
    })

    // Step 3: Redirect to WhatsApp
    if (confirmPayment.isConfirmed) {
      const message = encodeURIComponent(
        `Hello! I would like to book a consultation session.\n\n` +
          `I understand there's a consultation fee of ₦5,000, and I'm ready to proceed.\n\n` +
          `Please provide me with the payment details and available consultation slots.\n\n` +
          `Thank you!`,
      )

      const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`

      // Show success message
      await Swal.fire({
        title: '<strong style="color: #25D366;">Redirecting to WhatsApp...</strong>',
        html: `
          <div style="text-align: center; padding: 20px;">
            <div style="font-size: 64px; margin-bottom: 20px;">
              <i class="fab fa-whatsapp" style="color: #25D366;"></i>
            </div>
            <p style="font-size: 16px; color: #333;">
              You're being redirected to WhatsApp to complete your booking.
            </p>
            <p style="font-size: 14px; color: #888; margin-top: 15px;">
              If the window doesn't open automatically, <a href="${whatsappUrl}" target="_blank" style="color: ${themeColor}; text-decoration: underline;">click here</a>.
            </p>
          </div>
        `,
        icon: 'success',
        iconColor: '#25D366',
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
        background: '#fff',
      })

      // Open WhatsApp
      window.open(whatsappUrl, '_blank')
    }
  }
}
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
  background: radial-gradient(circle, rgba(var(--theme-color-rgb), 0.08) 0%, transparent 70%);
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
  background: linear-gradient(
    135deg,
    rgba(var(--theme-color-rgb), 0.2),
    rgba(var(--theme-color-rgb), 0.05)
  );
  border: 3px solid rgba(var(--theme-color-rgb), 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  font-weight: 600;
  color: var(--theme-color);
  transition: all 0.4s ease;
  position: relative;
  z-index: 2;
}

.process-step.active .step-number,
.process-step:hover .step-number {
  background: linear-gradient(
    135deg,
    rgba(var(--theme-color-rgb), 0.4),
    rgba(var(--theme-color-rgb), 0.15)
  );
  border-color: var(--theme-color);
  transform: scale(1.1) rotate(5deg);
  box-shadow: 0 10px 30px rgba(var(--theme-color-rgb), 0.3);
}

.connector-line {
  position: absolute;
  top: 50%;
  left: 80px;
  width: calc(100% + 40px);
  height: 2px;
  background: linear-gradient(90deg, rgba(var(--theme-color-rgb), 0.5), transparent);
  transform: translateY(-50%);
  z-index: 1;
}

/* Step Content */
.step-content {
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--theme-color-rgb), 0.2);
  border-radius: 16px;
  padding: 35px;
  transition: all 0.4s ease;
  height: 100%;
}

.process-step.active .step-content,
.process-step:hover .step-content {
  background: rgba(20, 20, 20, 0.8);
  border-color: rgba(var(--theme-color-rgb), 0.5);
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(var(--theme-color-rgb), 0.15);
}

.step-icon {
  margin-bottom: 20px;
  transition: transform 0.4s ease;
}

.step-icon i {
  font-size: 48px;
  color: var(--theme-color);
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
  content: '\f00c';
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  position: absolute;
  left: 0;
  color: var(--theme-color);
}

.step-duration {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 15px;
  border-top: 1px solid rgba(var(--theme-color-rgb), 0.2);
  font-size: 14px;
  color: var(--theme-color);
  font-weight: 600;
}

.step-duration i {
  font-size: 16px;
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
  background: linear-gradient(
    135deg,
    rgba(var(--theme-color-rgb), 0.1),
    rgba(var(--theme-color-rgb), 0.05)
  );
  border: 2px solid rgba(var(--theme-color-rgb), 0.3);
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  transition: all 0.4s ease;
}

.info-card:hover {
  transform: translateY(-5px);
  border-color: var(--theme-color);
  box-shadow: 0 10px 30px rgba(var(--theme-color-rgb), 0.2);
}

.info-icon {
  margin-bottom: 15px;
}

.info-icon i {
  font-size: 48px;
  color: var(--theme-color);
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

.process-cta::before {
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

.btn-start {
  padding: 18px 50px;
  background: var(--theme-color);
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
  filter: brightness(1.1);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(var(--theme-color-rgb), 0.5);
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
