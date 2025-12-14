<template>
  <section id="contact" class="contact-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-header">
        <span class="subtitle">Get In Touch</span>
        <h2 class="section-title">Let's Create Something <span class="highlight">Amazing</span></h2>
        <p class="section-description">
          Have a project in mind? We'd love to hear from you. Reach out and let's discuss how we can
          bring your vision to life
        </p>
      </div>

      <div class="contact-wrapper">
        <!-- Left Side - Contact Info -->
        <div class="contact-info">
          <div class="info-card">
            <div class="info-icon">
              <i class="fa-solid fa-location-dot"></i>
            </div>
            <div class="info-content">
              <h3 class="info-title">Visit Our Office</h3>
              <p class="info-text">Abeokuta Ogun State Nigeria</p>
            </div>
          </div>

          <div class="info-card">
            <div class="info-icon">
              <i class="fa-solid fa-phone"></i>
            </div>
            <div class="info-content">
              <h3 class="info-title">Call Us</h3>
              <p class="info-text">
                <a href="tel:+2348160763959">+234 816 076 3959</a><br />
                <a href="tel:+2349014597833">+234 901 459 7833</a>
              </p>
            </div>
          </div>

          <div class="info-card">
            <div class="info-icon">
              <i class="fa-solid fa-envelope"></i>
            </div>
            <div class="info-content">
              <h3 class="info-title">Email Us</h3>
              <p class="info-text">
                <a href="mailto:adebowalemary125@gmail.com">adebowalemary125@gmail.com</a>
              </p>
            </div>
          </div>

          <div class="info-card">
            <div class="info-icon">
              <i class="fa-solid fa-clock"></i>
            </div>
            <div class="info-content">
              <h3 class="info-title">Working Hours</h3>
              <p class="info-text">
                Mon - Fri: 9:00 AM - 6:00 PM<br />
                Sat: 10:00 AM - 4:00 PM<br />
                Sun: Closed
              </p>
            </div>
          </div>

          <!-- Social Media -->
          <div class="social-links">
            <h3 class="social-title">Follow Us</h3>
            <div class="social-icons">
              <a
                href="https://www.facebook.com/share/17d3SZXfNr/"
                class="social-icon"
                aria-label="Facebook"
              >
                <i class="fa-brands fa-facebook-f"></i>
              </a>
              <a
                href="https://www.instagram.com/the.only.dma?igsh=NzQ4eDF6aTl0Mm1t"
                class="social-icon"
                aria-label="Instagram"
              >
                <i class="fa-brands fa-instagram"></i>
              </a>
              <a
                href="https://www.tiktok.com/@dma_styles?_r=1&_t=ZS-91xueNLcAmA"
                class="social-icon"
                aria-label="Tiktok"
              >
                <i class="fa-brands fa-tiktok"></i>
              </a>

              <a
                href="https://wa.me/message/F2PDJN7E2TUUO1"
                class="social-icon"
                aria-label="WhatsApp"
              >
                <i class="fa-brands fa-whatsapp"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/damilola-adebowale-4399262a8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                class="social-icon"
                aria-label="Linkedin"
              >
                <i class="fa-brands fa-linkedin"></i>
              </a>
            </div>
          </div>
        </div>

        <!-- Right Side - Contact Form -->
        <div class="contact-form-wrapper">
          <form @submit.prevent="handleSubmit" class="contact-form">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  v-model="formData.firstName"
                  placeholder="Enter your first name"
                  required
                />
              </div>

              <div class="form-group">
                <label for="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  v-model="formData.lastName"
                  placeholder="Enter your last name"
                  required
                />
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  placeholder="your.email@example.com"
                  required
                />
              </div>

              <div class="form-group">
                <label for="phone">Phone Number *</label>
                <input
                  type="tel"
                  id="phone"
                  v-model="formData.phone"
                  placeholder="+234 XXX XXX XXXX"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label for="service">Service Interested In *</label>
              <select id="service" v-model="formData.service" required>
                <option value="" disabled>Select a service</option>
                <option value="custom-tailoring">Custom Tailoring</option>
                <option value="bridal-wedding">Bridal & Wedding</option>
                <option value="formal-wear">Formal Wear</option>
                <option value="traditional-attire">Traditional Attire</option>
                <option value="alterations">Alterations & Repairs</option>
                <option value="consultation">Fashion Consultation</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message">Message *</label>
              <textarea
                id="message"
                v-model="formData.message"
                placeholder="Tell us about your project or requirements..."
                rows="6"
                required
              ></textarea>
            </div>

            <button type="submit" class="btn-submit" :disabled="isSubmitting">
              <span v-if="!isSubmitting">
                <i class="fa-solid fa-paper-plane"></i>
                Send Message
              </span>
              <span v-else>
                <i class="fa-solid fa-spinner fa-spin"></i>
                Sending...
              </span>
            </button>

            <p v-if="submitMessage" class="submit-message" :class="messageType">
              {{ submitMessage }}
            </p>
          </form>
        </div>
      </div>
    </div>

    <!-- Background Decoration -->
    <div class="bg-glow bg-glow-1"></div>
    <div class="bg-glow bg-glow-2"></div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import emailjs from '@emailjs/browser'

const formData = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  service: '',
  message: '',
})

const isSubmitting = ref(false)
const submitMessage = ref('')
const messageType = ref('')

// EmailJS Configuration - Replace with your actual IDs
const EMAILJS_SERVICE_ID = 'service_pz6whjn'
const EMAILJS_TEMPLATE_ID = 'template_odvpoan'
const EMAILJS_PUBLIC_KEY = '83wlKx7MLzqrD2wVb'

const handleSubmit = async () => {
  isSubmitting.value = true
  submitMessage.value = ''

  // Prepare template parameters for EmailJS
  const templateParams = {
    from_name: `${formData.value.firstName} ${formData.value.lastName}`,
    from_email: formData.value.email,
    phone: formData.value.phone,
    service: formData.value.service,
    message: formData.value.message,
    to_email: 'adebowalemary125@gmail.com',
  }

  try {
    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY,
    )

    console.log('Email sent successfully:', response)

    // Success message
    submitMessage.value =
      "Thank you! Your message has been sent successfully. We'll get back to you soon."
    messageType.value = 'success'

    // Reset form
    formData.value = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      service: '',
      message: '',
    }

    // Clear success message after 5 seconds
    setTimeout(() => {
      submitMessage.value = ''
    }, 5000)
  } catch (error) {
    console.error('EmailJS Error:', error)

    // Error message
    submitMessage.value = 'Oops! Something went wrong. Please try again or contact us directly.'
    messageType.value = 'error'

    // Clear error message after 5 seconds
    setTimeout(() => {
      submitMessage.value = ''
    }, 5000)
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style scoped>
.contact-section {
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

/* Background Glow */
.bg-glow {
  position: absolute;
  border-radius: 50%;
  filter: blur(100px);
  pointer-events: none;
}

.bg-glow-1 {
  top: 10%;
  left: -10%;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(var(--theme-color-rgb), 0.15) 0%, transparent 70%);
  animation: float 15s ease-in-out infinite;
}

.bg-glow-2 {
  bottom: 10%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(var(--theme-color-rgb), 0.1) 0%, transparent 70%);
  animation: float 20s ease-in-out infinite reverse;
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

/* Contact Wrapper */
.contact-wrapper {
  display: flex;
  justify-content: space-between;
  gap: 40px;
  align-items: start;
}

/* Contact Info */
.contact-info {
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 25px;
  animation: fadeInLeft 1s ease;
}

.info-card {
  display: flex;
  gap: 20px;
  padding: 25px;
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--theme-color-rgb), 0.2);
  border-radius: 12px;
  transition: all 0.4s ease;
}

.info-card:hover {
  background: rgba(20, 20, 20, 0.8);
  border-color: rgba(var(--theme-color-rgb), 0.5);
  transform: translateX(10px);
}

.info-icon {
  width: 50px;
  height: 50px;
  background: linear-gradient(
    135deg,
    rgba(var(--theme-color-rgb), 0.2),
    rgba(var(--theme-color-rgb), 0.05)
  );
  border: 2px solid rgba(var(--theme-color-rgb), 0.3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--theme-color);
  flex-shrink: 0;
  transition: all 0.3s ease;
}

.info-card:hover .info-icon {
  transform: scale(1.1) rotate(5deg);
  background: linear-gradient(
    135deg,
    rgba(var(--theme-color-rgb), 0.3),
    rgba(var(--theme-color-rgb), 0.1)
  );
}

.info-content {
  flex: 1;
}

.info-title {
  font-size: 16px;
  color: white;
  font-weight: 600;
  margin-bottom: 8px;
}

.info-text {
  font-size: 14px;
  color: #b0b0b0;
  line-height: 1.6;
}

.info-text a {
  color: #d0d0d0;
  text-decoration: none;
  transition: color 0.3s ease;
}

.info-text a:hover {
  color: var(--theme-color);
}

#service {
  background: #000;
}

option:hover {
  background: #333 !important;
}

/* Social Links */
.social-links {
  padding: 30px;
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--theme-color-rgb), 0.2);
  border-radius: 12px;
  text-align: center;
}

.social-title {
  font-size: 16px;
  color: white;
  font-weight: 600;
  margin-bottom: 20px;
}

.social-icons {
  display: flex;
  justify-content: center;
  gap: 15px;
  flex-wrap: wrap;
}

.social-icon {
  width: 45px;
  height: 45px;
  background: rgba(var(--theme-color-rgb), 0.1);
  border: 2px solid rgba(var(--theme-color-rgb), 0.3);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--theme-color);
  font-size: 18px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background: var(--theme-color);
  color: #000;
  transform: translateY(-5px);
  box-shadow: 0 5px 20px rgba(var(--theme-color-rgb), 0.4);
}

/* Contact Form */
.contact-form-wrapper {
  width: 60%;
  background: rgba(20, 20, 20, 0.6);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(var(--theme-color-rgb), 0.2);
  border-radius: 16px;
  padding: 50px;
  animation: fadeInRight 1s ease;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 25px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.form-group label {
  font-size: 14px;
  color: #d0d0d0;
  font-weight: 500;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 14px 18px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(var(--theme-color-rgb), 0.2);
  border-radius: 8px;
  color: white;
  font-size: 15px;
  transition: all 0.3s ease;
  font-family: 'Poppins', sans-serif;
}

.form-group input::placeholder,
.form-group textarea::placeholder {
  color: #666;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--theme-color);
  background: rgba(255, 255, 255, 0.08);
  box-shadow: 0 0 20px rgba(var(--theme-color-rgb), 0.2);
}

.form-group textarea {
  resize: vertical;
  min-height: 120px;
}

.btn-submit {
  padding: 16px 40px;
  background: var(--theme-color);
  color: #000;
  border: none;
  font-size: 15px;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-top: 10px;
}

.btn-submit:hover:not(:disabled) {
  filter: brightness(1.1);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(var(--theme-color-rgb), 0.5);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.submit-message {
  padding: 15px;
  border-radius: 8px;
  font-size: 14px;
  text-align: center;
  animation: fadeIn 0.5s ease;
}

.submit-message.success {
  background: rgba(76, 175, 80, 0.2);
  border: 1px solid rgba(76, 175, 80, 0.5);
  color: #4caf50;
}

.submit-message.error {
  background: rgba(244, 67, 54, 0.2);
  border: 1px solid rgba(244, 67, 54, 0.5);
  color: #f44336;
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

@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(30px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes float {
  0%,
  100% {
    transform: translate(0, 0);
  }

  50% {
    transform: translate(30px, -30px);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .contact-wrapper {
    grid-template-columns: 1fr;
    gap: 50px;
  }

  .contact-info {
    max-width: 600px;
    margin: 0 auto;
  }
}

@media (max-width: 768px) {
  .contact-section {
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

  .contact-info {
    width: 100%;
  }

  .contact-form-wrapper {
    width: 100%;
    padding: 30px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .social-icons {
    gap: 12px;
  }

  .social-icon {
    width: 40px;
    height: 40px;
    font-size: 16px;
  }
}

@media (max-width: 480px) {
  .contact-wrapper {
    flex-direction: column;
  }

  .contact-info,
  .contact-form-wrapper {
    width: 100%;
  }

  .btn-submit {
    padding: 12px 25px;
    font-size: 14px;
  }

  .section-title {
    font-size: 28px;
  }

  .contact-info,
  .contact-form-wrapper {
    width: 100%;
  }

  .info-card {
    flex-direction: column;
    gap: 15px;
    padding: 20px;
  }

  .info-icon {
    width: 45px;
    height: 45px;
    font-size: 18px;
  }

  .info-text {
    font-size: 13px;
  }

  .form-group input,
  .form-group select,
  .form-group textarea {
    padding: 12px 14px;
    font-size: 14px;
  }
}
</style>
