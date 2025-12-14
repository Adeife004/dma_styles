<template>
  <div class="content">
    <!-- WELCOME BANNER -->
    <div class="welcome-banner">
      <div class="banner-content">
        <h2>Your Fashion Journey Starts Here</h2>
        <p>Discover premium designs, connect with us, and stay updated with the latest trends</p>
      </div>
      <div class="banner-icon">
        <i class="fas fa-tshirt"></i>
      </div>
    </div>

    <!-- QUICK ACTIONS -->
    <div class="quick-actions-section">
      <h3><i class="fas fa-bolt"></i> Quick Actions</h3>
      <div class="action-buttons">
        <QuickActionBtn
          icon="fab fa-whatsapp"
          label="Order on WhatsApp"
          :is-whatsapp="true"
          @click="contactWhatsApp('order')"
        />
        <QuickActionBtn
          icon="fab fa-whatsapp"
          label="Send Measurements"
          :is-whatsapp="true"
          @click="contactWhatsApp('measurements')"
        />
        <QuickActionBtn
          icon="fas fa-images"
          label="View Gallery"
          @click="$emit('navigate', 'gallery')"
        />
        <QuickActionBtn
          icon="fas fa-globe"
          label="Visit Website"
          @click="$emit('navigate', 'home')"
        />
      </div>
    </div>

    <!-- SERVICES GRID -->
    <div class="services-section">
      <h3><i class="fas fa-gem"></i> Our Services</h3>
      <div class="services-grid">
        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-cut"></i>
          </div>
          <h4>Custom Tailoring</h4>
          <p>Perfectly fitted garments designed just for you</p>
        </div>
        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-palette"></i>
          </div>
          <h4>Fashion Design</h4>
          <p>Unique styles that match your personality</p>
        </div>
        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-ruler"></i>
          </div>
          <h4>Measurements</h4>
          <p>Precise fitting for the perfect look</p>
        </div>
        <div class="service-card">
          <div class="service-icon">
            <i class="fas fa-shipping-fast"></i>
          </div>
          <h4>Fast Delivery</h4>
          <p>Quick turnaround without compromising quality</p>
        </div>
      </div>
    </div>

    <!-- PROFILE OVERVIEW -->
    <div class="card profile-overview">
      <h3><i class="fas fa-user-circle"></i> Profile Overview</h3>

      <div class="profile-details">
        <div class="profile-item">
          <i class="fas fa-envelope"></i>
          <div>
            <label>Email</label>
            <p>{{ userEmail }}</p>
          </div>
        </div>
        <div class="profile-item">
          <i class="fas fa-phone"></i>
          <div>
            <label>Phone</label>
            <p>{{ userPhone || 'Not provided' }}</p>
          </div>
        </div>
        <div class="profile-item">
          <i class="fas fa-map-marker-alt"></i>
          <div>
            <label>Address</label>
            <p>{{ userAddress || 'Not provided' }}</p>
          </div>
        </div>
        <div class="profile-item">
          <i class="fas fa-calendar"></i>
          <div>
            <label>Member Since</label>
            <p>{{ memberSince }}</p>
          </div>
        </div>
      </div>
      <button class="btn-secondary" @click="$emit('navigate', 'settings')">Edit Profile</button>
    </div>

    <!-- CONTACT SECTION -->
    <div class="contact-section">
      <h3><i class="fas fa-headset"></i> Get In Touch</h3>
      <div class="contact-grid">
        <div class="contact-card">
          <i class="fab fa-whatsapp"></i>
          <h4>WhatsApp</h4>
          <p>Chat with us for instant support</p>
          <button @click="contactWhatsApp('general')" class="contact-btn">
            <i class="fab fa-whatsapp"></i> Chat Now
          </button>
        </div>
        <div class="contact-card">
          <i class="fas fa-phone-alt"></i>
          <h4>Call Us</h4>
          <p>Speak directly with our team</p>
          <button @click="callPhone" class="contact-btn">
            <i class="fas fa-phone"></i> Call Now
          </button>
        </div>
        <div class="contact-card">
          <i class="fas fa-envelope"></i>
          <h4>Email</h4>
          <p>Send us your inquiries</p>
          <button @click="sendEmail" class="contact-btn">
            <i class="fas fa-envelope"></i> Email Us
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import QuickActionBtn from './QuickActionBtn.vue'

defineProps({
  userEmail: String,
  userPhone: String,
  userAddress: String,
  memberSince: String,
})

defineEmits(['navigate'])

const contactWhatsApp = (type) => {
  const phoneNumber = '2348160763959'
  let message = ''

  if (type === 'order') {
    message = encodeURIComponent('Hello DMA Styles, I would like to place an order.')
  } else if (type === 'measurements') {
    message = encodeURIComponent('Hello DMA Styles, I would like to send my measurements.')
  } else {
    message = encodeURIComponent('Hello DMA Styles!')
  }

  window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank')
}

const callPhone = () => {
  window.location.href = 'tel:+2348160763959'
}

const sendEmail = () => {
  window.location.href = 'mailto:adebowalemary125@gmail'
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* WELCOME BANNER */
.welcome-banner {
  background: rgba(var(--theme-color-rgb, 255, 215, 0), 0.05);
  background: linear-gradient(135deg, var(--theme-color) 0%, #ffed4e 100%);
  border-radius: 20px;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 20px rgba(var(--theme-color-rgb, 255, 215, 0), 0.5);
  position: relative;
  overflow: hidden;
}

.welcome-banner::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -10%;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.banner-content {
  flex: 1;
  z-index: 1;
}

.banner-content h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #000;
  margin-bottom: 0.75rem;
}

.banner-content p {
  font-size: 1.1rem;
  color: #333;
  max-width: 600px;
}

.banner-icon {
  z-index: 1;
}

.banner-icon i {
  font-size: 6rem;
  color: rgba(0, 0, 0, 0.15);
}

/* QUICK ACTIONS */
.quick-actions-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #252525 100%);
  border: 1px solid rgba(var(--theme-color-rgb, 255, 215, 0), 0.2);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(var(--theme-color-rgb, 255, 215, 0), 0.3);
}

.quick-actions-section h3 {
  color: var(--theme-color);
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}

.action-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1.2rem;
}

/* SERVICES SECTION */
.services-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #252525 100%);
  border: 1px solid rgba(var(--theme-color-rgb, 255, 215, 0), 0.2);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(var(--theme-color-rgb, 255, 215, 0), 0.3);
}

.services-section h3 {
  color: var(--theme-color);
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.service-card {
  background: #222;
  border: 1px solid #333;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-5px);
  border-color: var(--theme-color);
  box-shadow: 0 6px 25px rgba(var(--theme-color-rgb, 255, 215, 0), 0.6);
}

.service-icon {
  width: 70px;
  height: 70px;
  margin: 0 auto 1.5rem;
  background: linear-gradient(135deg, var(--theme-color) 0%, #ffed4e 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 25px rgba(var(--theme-color-rgb, 255, 215, 0), 0.6);
}

.service-icon i {
  font-size: 1.8rem;
  color: #000;
}

.service-card h4 {
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.service-card p {
  color: #999;
  font-size: 0.95rem;
  line-height: 1.6;
}

/* CARD STYLES */
.card {
  background: linear-gradient(135deg, #1a1a1a 0%, #252525 100%);
  border: 1px solid rgba(var(--theme-color-rgb, 255, 215, 0), 0.2);
  border-radius: 20px;
  padding: 2rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(var(--theme-color-rgb, 255, 215, 0), 0.3);
}

.card:hover {
  border-color: var(--theme-color);
  box-shadow: 0 6px 25px rgba(var(--theme-color-rgb, 255, 215, 0), 0.6);
}

/* PROFILE OVERVIEW */
.profile-overview {
  width: 100%;
}

.profile-overview h3 {
  color: var(--theme-color);
  margin-bottom: 2rem;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}

.profile-details {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.profile-item {
  display: flex;
  align-items: flex-start;
  gap: 1.2rem;
  padding: 1.5rem;
  background: #222;
  border-radius: 14px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.profile-item:hover {
  background: #2a2a2a;
  transform: translateY(-3px);
  border-color: rgba(255, 215, 0, 0.3);
  box-shadow: 0 6px 25px rgba(var(--theme-color-rgb, 255, 215, 0), 0.6);
}

.profile-item i {
  color: var(--theme-color);
  font-size: 1.4rem;
  margin-top: 4px;
}

.profile-item div {
  flex: 1;
}

.profile-item label {
  color: #999;
  font-size: 0.85rem;
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.profile-item p {
  color: #fff;
  font-weight: 500;
  font-size: 1rem;
}

.btn-secondary {
  background: transparent;
  border: 2px solid var(--theme-color);
  color: var(--theme-color);
  padding: 14px 24px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 1rem;
  width: 100%;
  max-width: 220px;
}

.btn-secondary:hover {
  background: var(--theme-color);
  color: #000;
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.4);
}

/* CONTACT SECTION */
.contact-section {
  background: linear-gradient(135deg, #1a1a1a 0%, #252525 100%);
  border: 1px solid rgba(var(--theme-color-rgb, 255, 215, 0), 0.2);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 15px rgba(var(--theme-color-rgb, 255, 215, 0), 0.3);
}

.contact-section h3 {
  color: var(--theme-color);
  margin-bottom: 1.5rem;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
}

.contact-card {
  background: #222;
  border: 1px solid #333;
  border-radius: 16px;
  padding: 2rem;
  text-align: center;
  transition: all 0.3s ease;
}

.contact-card:hover {
  transform: translateY(-5px);
  border-color: var(--theme-color);
  box-shadow: 0 6px 25px rgba(var(--theme-color-rgb, 255, 215, 0), 0.6);
}

.contact-card > i {
  font-size: 2.5rem;
  color: var(--theme-color);
  margin-bottom: 1rem;
}

.contact-card h4 {
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.contact-card p {
  color: #999;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.contact-btn {
  background: transparent;
  border: 2px solid var(--theme-color);
  color: var(--theme-color);
  padding: 12px 24px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 8px;
}

.contact-btn:hover {
  background: var(--theme-color);
  color: #000;
  transform: translateY(-2px);
  box-shadow: 0 6px 25px rgba(var(--theme-color-rgb, 255, 215, 0), 0.6);
}

/* RESPONSIVE DESIGN */
@media (max-width: 1024px) {
  .action-buttons {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }

  .services-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .welcome-banner {
    padding: 2rem;
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .banner-content h2 {
    font-size: 1.6rem;
  }

  .banner-content p {
    font-size: 1rem;
  }

  .banner-icon i {
    font-size: 4rem;
  }

  .quick-actions-section {
    padding: 1.5rem;
  }

  .action-buttons {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .services-grid {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }

  .profile-details {
    grid-template-columns: 1fr;
    gap: 1.2rem;
  }

  .btn-secondary {
    max-width: 100%;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 480px) {
  .welcome-banner {
    padding: 1.5rem;
  }

  .banner-content h2 {
    font-size: 1.4rem;
  }

  .banner-content p {
    font-size: 0.9rem;
  }

  .quick-actions-section h3,
  .services-section h3,
  .profile-overview h3,
  .contact-section h3 {
    font-size: 1.1rem;
  }

  .action-buttons {
    grid-template-columns: 1fr;
    gap: 0.8rem;
  }

  .card {
    padding: 1.5rem;
  }

  .profile-item {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.2rem;
  }

  .profile-item i {
    font-size: 1.2rem;
  }
}

@media (max-width: 360px) {
  .card {
    padding: 1.2rem;
  }

  .btn-secondary {
    padding: 12px 20px;
    font-size: 0.95rem;
  }
}
</style>
