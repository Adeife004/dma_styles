<template>
  <footer class="footer-section">
    <div class="container">
      <!-- Main Footer Content -->
      <div class="footer-main">
        <!-- Brand Column -->
        <div class="footer-column brand-column">
          <div class="footer-logo">
            <img src="../assets/logo.jpg" alt="DMA Styles Logo" class="logo-img" />
            <h3 class="brand-name">DMA Styles</h3>
          </div>
          <p class="brand-tagline">
            Crafting elegance, one stitch at a time. Your premier destination for bespoke fashion
            and timeless style.
          </p>
          <div class="social-links">
            <a
              href="https://www.facebook.com/share/17d3SZXfNr/"
              class="social-link"
              aria-label="Facebook"
            >
              <i class="fab fa-facebook-f"></i>
            </a>
            <a
              href="https://www.instagram.com/the.only.dma?igsh=NzQ4eDF6aTl0Mm1t"
              class="social-link"
              aria-label="Instagram"
            >
              <i class="fab fa-instagram"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/damilola-adebowale-4399262a8?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              class="social-link"
              aria-label="Linkedin"
            >
              <i class="fab fa-linkedin"></i>
            </a>
            <a
              href="https://wa.me/message/F2PDJN7E2TUUO1"
              class="social-link"
              aria-label="WhatsApp"
            >
              <i class="fab fa-whatsapp"></i>
            </a>
            <a
              href="https://www.tiktok.com/@dma_styles?_r=1&_t=ZS-91xueNLcAmA"
              class="social-link"
              aria-label="Tiktok"
            >
              <i class="fab fa-tiktok"></i>
            </a>
          </div>
        </div>

        <!-- Quick Links Column -->
        <div class="footer-column">
          <h4 class="column-title">Quick Links</h4>
          <ul class="footer-links">
            <li>
              <router-link to="#about"> <i class="fas fa-chevron-right"></i> About Us </router-link>
            </li>
            <li>
              <router-link to="#services">
                <i class="fas fa-chevron-right"></i> Our Services
              </router-link>
            </li>
            <li>
              <router-link to="/gallery">
                <i class="fas fa-chevron-right"></i> Gallery
              </router-link>
            </li>
            <li>
              <router-link to="#process">
                <i class="fas fa-chevron-right"></i> How It Works
              </router-link>
            </li>
            <li>
              <router-link to="#testimonials">
                <i class="fas fa-chevron-right"></i> Testimonials
              </router-link>
            </li>
            <li>
              <router-link to="#contact">
                <i class="fas fa-chevron-right"></i> Contact Us
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Services Column -->
        <div class="footer-column">
          <h4 class="column-title">Our Services</h4>
          <ul class="footer-links">
            <li>
              <a href="#services"> <i class="fas fa-cut"></i> Custom Tailoring </a>
            </li>
            <li>
              <a href="#services"> <i class="fas fa-ring"></i> Bridal & Wedding </a>
            </li>
            <li>
              <a href="#services"> <i class="fas fa-briefcase"></i> Formal Wear </a>
            </li>
            <li>
              <a href="#services"> <i class="fas fa-masks-theater"></i> Traditional Attire </a>
            </li>
            <li>
              <a href="#services"> <i class="fas fa-tshirt"></i> Alterations & Repairs </a>
            </li>
            <li>
              <a href="#services"> <i class="fas fa-palette"></i> Fashion Consultation </a>
            </li>
          </ul>
        </div>

        <!-- Contact Column -->
        <div class="footer-column">
          <h4 class="column-title">Get In Touch</h4>
          <ul class="contact-info">
            <li>
              <i class="fas fa-map-marker-alt"></i>
              <div>
                <strong>Address</strong>
                <p>Abeokuta, Ogun State, Nigeria</p>
              </div>
            </li>
            <li>
              <i class="fas fa-phone-alt"></i>
              <div>
                <strong>Phone</strong>
                <p>+234 816 076 3959</p>
              </div>
            </li>
            <li>
              <i class="fas fa-envelope"></i>
              <div>
                <strong>Email</strong>
                <p>adebowalemary125@gmail.com</p>
              </div>
            </li>
            <li>
              <i class="fas fa-clock"></i>
              <div>
                <strong>Working Hours</strong>
                <p>Mon - Sat: 9AM - 6PM</p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="footer-bottom">
        <div class="footer-bottom-content">
          <p class="copyright">
            &copy; {{ currentYear }} <span class="brand-highlight">DMA Styles</span>. All rights
            reserved.
          </p>
          <div class="footer-bottom-links">
            <router-link to="/privacy">Privacy Policy</router-link>
            <span class="separator">|</span>
            <router-link to="/terms">Terms of Service</router-link>
            <span class="separator">|</span>
            <router-link to="/sitemap">Sitemap</router-link>
          </div>
          <p class="developer-credit">
            Designed & Developed with <i class="fas fa-heart"></i> by
            <a href="#" class="developer-link">Adebowale Jasmine</a>
          </p>
        </div>
      </div>
    </div>

    <!-- Decorative Elements -->
    <div class="footer-decoration"></div>
  </footer>
</template>

<script setup>
import { computed } from 'vue'

const currentYear = computed(() => new Date().getFullYear())
</script>

<style scoped>
.footer-section {
  background: linear-gradient(180deg, #000000 0%, #0a0a0a 100%);
  color: #fff;
  padding: 80px 0 0 0;
  position: relative;
  overflow: hidden;
}

.footer-decoration {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(var(--theme-color-rgb, 255, 215, 0), 0.5) 50%,
    transparent 100%
  );
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

/* Main Footer Content */
.footer-main {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr 1.2fr;
  gap: 40px;
  padding-bottom: 60px;
  border-bottom: 1px solid rgba(var(--theme-color-rgb, 255, 215, 0), 0.2);
}

/* Brand Column */
.footer-logo {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 20px;
}

.logo-img {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 0 20px rgba(var(--theme-color-rgb, 255, 215, 0), 0.3);
}

.brand-name {
  font-family: 'Playfair Display', serif;
  font-size: 24px;
  color: var(--theme-color, #ffd700);
  font-weight: 600;
}

.brand-tagline {
  color: #b0b0b0;
  font-size: 14px;
  line-height: 1.8;
  margin-bottom: 25px;
}

/* Social Links */
.social-links {
  display: flex;
  gap: 12px;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(var(--theme-color-rgb, 255, 215, 0), 0.1);
  border: 1px solid rgba(var(--theme-color-rgb, 255, 215, 0), 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--theme-color, #ffd700);
  transition: all 0.3s ease;
  text-decoration: none;
}

.social-link:hover {
  background: var(--theme-color, #ffd700);
  color: #000;
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(var(--theme-color-rgb, 255, 215, 0), 0.4);
}

.social-link i {
  font-size: 16px;
}

/* Column Titles */
.column-title {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  color: var(--theme-color, #ffd700);
  margin-bottom: 25px;
  font-weight: 600;
}

/* Footer Links */
.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 12px;
}

.footer-links a {
  color: #b0b0b0;
  text-decoration: none;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 10px;
  transition: all 0.3s ease;
}

.footer-links a i {
  font-size: 10px;
  color: var(--theme-color, #ffd700);
}

.footer-links a:hover {
  color: var(--theme-color, #ffd700);
  transform: translateX(5px);
}

/* Contact Info */
.contact-info {
  list-style: none;
  padding: 0;
  margin: 0;
}

.contact-info li {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.contact-info i {
  color: var(--theme-color, #ffd700);
  font-size: 18px;
  margin-top: 3px;
  flex-shrink: 0;
}

.contact-info strong {
  color: #fff;
  font-size: 14px;
  display: block;
  margin-bottom: 5px;
}

.contact-info p {
  color: #b0b0b0;
  font-size: 13px;
  line-height: 1.6;
  margin: 0;
}

/* Newsletter */
.newsletter-text {
  color: #b0b0b0;
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 20px;
}

.newsletter-form {
  margin-bottom: 15px;
}

.input-wrapper {
  position: relative;
  margin-bottom: 12px;
}

.input-wrapper i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 14px;
}

.input-wrapper input {
  width: 100%;
  padding: 12px 15px 12px 45px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(var(--theme-color-rgb, 255, 215, 0), 0.3);
  border-radius: 8px;
  color: #fff;
  font-size: 14px;
  transition: all 0.3s ease;
}

.input-wrapper input::placeholder {
  color: #666;
}

.input-wrapper input:focus {
  outline: none;
  border-color: var(--theme-color, #ffd700);
  background: rgba(255, 255, 255, 0.08);
}

.subscribe-btn {
  width: 100%;
  padding: 12px 20px;
  background: var(--theme-color, #ffd700);
  border: none;
  border-radius: 8px;
  color: #000;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
}

.subscribe-btn:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(var(--theme-color-rgb, 255, 215, 0), 0.4);
}

.newsletter-note {
  color: #888;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.newsletter-note i {
  color: #4caf50;
}

/* Footer Bottom */
.footer-bottom {
  padding: 30px 0;
  background: rgba(0, 0, 0, 0.3);
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.copyright {
  color: #888;
  font-size: 14px;
}

.brand-highlight {
  color: var(--theme-color, #ffd700);
  font-weight: 600;
}

.footer-bottom-links {
  display: flex;
  align-items: center;
  gap: 15px;
}

.footer-bottom-links a {
  color: #b0b0b0;
  text-decoration: none;
  font-size: 13px;
  transition: color 0.3s ease;
}

.footer-bottom-links a:hover {
  color: var(--theme-color, #ffd700);
}

.separator {
  color: #444;
}

.developer-credit {
  color: #888;
  font-size: 13px;
  display: flex;
  align-items: center;
  gap: 5px;
}

.developer-credit i {
  color: #f44336;
  animation: heartbeat 1.5s ease-in-out infinite;
}

.developer-link {
  color: var(--theme-color, #ffd700);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.developer-link:hover {
  filter: brightness(1.1);
}

/* Animations */
@keyframes heartbeat {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
}

/* Responsive Design */
@media (max-width: 1200px) {
  .footer-main {
    grid-template-columns: repeat(3, 1fr);
  }

  .brand-column {
    grid-column: 1 / -1;
  }

  .newsletter-column {
    grid-column: 1 / -1;
  }
}

@media (max-width: 768px) {
  .footer-section {
    padding: 60px 0 0 0;
  }

  .container {
    padding: 0 20px;
  }

  .footer-main {
    grid-template-columns: 1fr;
    gap: 40px;
    padding-bottom: 40px;
  }

  .brand-column,
  .newsletter-column {
    grid-column: 1;
  }

  .footer-bottom-content {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }

  .footer-bottom-links {
    flex-wrap: wrap;
    justify-content: center;
  }

  .social-links {
    justify-content: center;
  }

  .column-title {
    font-size: 18px;
    margin-bottom: 20px;
  }
}

@media (max-width: 480px) {
  .footer-logo {
    flex-direction: column;
    text-align: center;
  }

  .brand-tagline {
    text-align: center;
  }

  .footer-bottom-links {
    flex-direction: column;
    gap: 10px;
  }

  .separator {
    display: none;
  }

  .copyright,
  .developer-credit {
    font-size: 12px;
  }
}
</style>
