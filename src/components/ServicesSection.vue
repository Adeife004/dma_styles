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
              <i :class="service.icon"></i>
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
            <button class="btn-service" @click="bookService(service.title)">Book Now</button>
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
            Schedule a consultation and let us help you find the perfect solution
          </p>
          <button class="btn-consultation" @click="bookConsultation">Book Consultation</button>
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
import Swal from 'sweetalert2'

const hoveredIndex = ref(null)

const WHATSAPP_NUMBER = '2348160763959'

const services = ref([
  {
    icon: 'fas fa-user-tie',
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
    icon: 'fas fa-ring',
    title: 'Bridal & Wedding',
    description:
      'Stunning wedding attire for your special day, from bridal gowns to bridesmaid wears',
    features: [
      'Custom bridal gowns',
      'Bridesmaid dresses',
      'Groomsmen suits',
      'Accessories coordination',
    ],
    price: '₦150,000',
  },
  {
    icon: 'fas fa-briefcase',
    title: 'Formal Wear',
    description: 'Elegant formal outfits for corporate events, galas, and special occasions',
    features: ['Business suits', 'Evening gowns', 'Blazers', 'Professional styling advice'],
    price: '₦60,000',
  },
  {
    icon: 'fas fa-masks-theater',
    title: 'Traditional Attire',
    description: 'Authentic traditional wear that honors culture while embracing modern style',
    features: [
      'Aso-ebi coordination',
      'Unique Bubu Styles',
      'Traditional gowns',
      'Professional styling advice',
    ],
    price: '₦150,000',
  },
  {
    icon: 'fas fa-cut',
    title: 'Alterations & Repairs',
    description: 'Expert alterations and repairs to restore or modify your existing garments',
    features: ['Hemming & resizing', 'Zipper replacement', 'Fabric repairs', 'Style modifications'],
    price: '₦10,000',
  },
  {
    icon: 'fas fa-palette',
    title: 'Fashion Consultation',
    description: 'Personal styling sessions to help you discover and refine your unique style',
    features: ['Wardrobe analysis', 'Style recommendations', 'Color matching', 'Trend guidance'],
    price: '₦5,000',
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
    customClass: {
      popup: 'consultation-popup',
      confirmButton: 'consultation-confirm-btn',
      cancelButton: 'consultation-cancel-btn',
    },
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

// Book Service Function
async function bookService(serviceTitle) {
  const themeColor = getComputedStyle(document.documentElement)
    .getPropertyValue('--theme-color')
    .trim()

  const message = encodeURIComponent(
    `Hello! I'm interested in booking your "${serviceTitle}" service.\n\n` +
      `Could you please provide more details about:\n` +
      `- Available dates\n` +
      `- Exact pricing\n` +
      `- What I need to prepare\n\n` +
      `Thank you!`,
  )

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`

  const result = await Swal.fire({
    title: `<strong style="color: ${themeColor};">Book ${serviceTitle}</strong>`,
    html: `
      <div style="text-align: center; padding: 20px;">
        <p style="font-size: 16px; color: #333; margin-bottom: 20px;">
          You'll be redirected to WhatsApp to discuss your <strong>${serviceTitle}</strong> booking.
        </p>
        <div style="font-size: 64px; margin: 20px 0;">
          <i class="fab fa-whatsapp" style="color: #25D366;"></i>
        </div>
      </div>
    `,
    icon: 'info',
    iconColor: themeColor,
    showCancelButton: true,
    confirmButtonText: 'Contact via WhatsApp',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#25D366',
    cancelButtonColor: '#888',
    background: '#fff',
  })

  if (result.isConfirmed) {
    window.open(whatsappUrl, '_blank')
  }
}
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
  background: radial-gradient(circle, rgba(var(--theme-color-rgb), 0.1) 0%, transparent 70%);
  animation: float 8s ease-in-out infinite;
}

.decoration-2 {
  bottom: 20%;
  right: -5%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(var(--theme-color-rgb), 0.08) 0%, transparent 70%);
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
  border: 1px solid rgba(var(--theme-color-rgb), 0.2);
  border-radius: 16px;
  padding: 40px;
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
  overflow: hidden;
}

.service-card:hover {
  transform: translateY(-10px);
  border-color: rgba(var(--theme-color-rgb), 0.5);
  box-shadow: 0 20px 60px rgba(var(--theme-color-rgb), 0.2);
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
  background: radial-gradient(circle, rgba(var(--theme-color-rgb), 0.15) 0%, transparent 70%);
  transition: all 0.5s ease;
}

.service-card:hover .card-decoration {
  transform: scale(2);
}

/* Service Icon */
.service-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(
    135deg,
    rgba(var(--theme-color-rgb), 0.2),
    rgba(var(--theme-color-rgb), 0.05)
  );
  border: 2px solid rgba(var(--theme-color-rgb), 0.3);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 25px;
  transition: all 0.4s ease;
}

.service-card:hover .service-icon {
  background: linear-gradient(
    135deg,
    rgba(var(--theme-color-rgb), 0.3),
    rgba(var(--theme-color-rgb), 0.1)
  );
  border-color: var(--theme-color);
  transform: rotate(5deg) scale(1.1);
}

.service-icon i {
  font-size: 36px;
  color: var(--theme-color);
  transition: all 0.4s ease;
}

.service-card:hover .service-icon i {
  transform: scale(1.1);
  filter: brightness(1.2);
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
  background: rgba(var(--theme-color-rgb), 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--theme-color);
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
  border-top: 1px solid rgba(var(--theme-color-rgb), 0.2);
  border-bottom: 1px solid rgba(var(--theme-color-rgb), 0.2);
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
  color: var(--theme-color);
  font-weight: 600;
}

/* Service Button */
.btn-service {
  width: 100%;
  padding: 14px;
  background: transparent;
  color: var(--theme-color);
  border: 2px solid var(--theme-color);
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
  background: var(--theme-color);
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
  background: linear-gradient(
    135deg,
    rgba(var(--theme-color-rgb), 0.1),
    rgba(var(--theme-color-rgb), 0.05)
  );
  border: 2px solid rgba(var(--theme-color-rgb), 0.3);
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
  background: linear-gradient(
    45deg,
    transparent 30%,
    rgba(var(--theme-color-rgb), 0.05) 50%,
    transparent 70%
  );
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
  background: var(--theme-color);
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
  filter: brightness(1.1);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(var(--theme-color-rgb), 0.4);
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
