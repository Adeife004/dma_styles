<template>
  <section id="about" class="about-section">
    <div class="container">
      <div class="about-grid">
        <!-- Left Side - Images -->
        <div class="about-images">
          <div class="image-main">
            <img
              src="https://images.unsplash.com/photo-1558769132-cb1aea1c8347?w=800"
              alt="DMA Styles Designer"
            />
            <div class="floating-badge">
              <span class="badge-number">10+</span>
              <span class="badge-text">Years Experience</span>
            </div>
          </div>
          <div class="image-secondary">
            <img
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
              alt="Fashion Design Process"
            />
          </div>
          <div class="decorative-box"></div>
        </div>

        <!-- Right Side - Content -->
        <div class="about-content">
          <span class="subtitle">About Us</span>
          <h2 class="section-title">
            Crafting <span class="highlight">Timeless Elegance</span> Since 2014
          </h2>
          <p class="description">
            At DMA Styles, we believe fashion is more than clothing—it's an expression of identity,
            confidence, and artistry. Every stitch tells a story, and every design is a masterpiece
            crafted with passion and precision.
          </p>
          <p class="description">
            With over a decade of experience in bespoke tailoring and fashion design, we've helped
            hundreds of clients discover their unique style. From elegant formal wear to stunning
            bridal collections, we bring your vision to life with exceptional craftsmanship.
          </p>

          <!-- Stats -->
          <div class="stats-grid">
            <div class="stat-item">
              <h3 class="stat-number">500+</h3>
              <p class="stat-label">Happy Clients</p>
            </div>
            <div class="stat-item">
              <h3 class="stat-number">1000+</h3>
              <p class="stat-label">Designs Created</p>
            </div>
            <div class="stat-item">
              <h3 class="stat-number">15+</h3>
              <p class="stat-label">Awards Won</p>
            </div>
          </div>

          <!-- Values -->
          <div class="values-grid">
            <div class="value-item">
              <div class="value-icon">✨</div>
              <div class="value-content">
                <h4 class="value-title">Quality First</h4>
                <p class="value-text">Premium fabrics and meticulous attention to detail</p>
              </div>
            </div>
            <div class="value-item">
              <div class="value-icon">🎨</div>
              <div class="value-content">
                <h4 class="value-title">Custom Designs</h4>
                <p class="value-text">Personalized creations tailored to your style</p>
              </div>
            </div>
            <div class="value-item">
              <div class="value-icon">⚡</div>
              <div class="value-content">
                <h4 class="value-title">Fast Delivery</h4>
                <p class="value-text">Timely completion without compromising quality</p>
              </div>
            </div>
          </div>

          <!-- CTA Button -->
          <button class="btn-primary">Learn More About Us</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No reactive data needed for this static section
</script>

<style scoped>
.about-section {
  padding: 120px 0;
  background: #0a0a0a;
  position: relative;
  overflow: hidden;
}

.about-section::before {
  content: '';
  position: absolute;
  top: 20%;
  right: -10%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.08) 0%, transparent 70%);
  pointer-events: none;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 40px;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

/* ============================================
   LEFT SIDE - IMAGES
============================================ */
.about-images {
  position: relative;
  animation: fadeInLeft 1s ease;
}

.image-main {
  position: relative;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  z-index: 2;
}

.image-main img {
  width: 100%;
  height: 600px;
  object-fit: cover;
  display: block;
}

.floating-badge {
  position: absolute;
  bottom: 30px;
  right: 30px;
  background: rgba(255, 215, 0, 0.95);
  backdrop-filter: blur(10px);
  padding: 25px;
  border-radius: 12px;
  text-align: center;
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.3);
  animation: float 3s ease-in-out infinite;
}

.badge-number {
  display: block;
  font-size: 36px;
  font-weight: 700;
  color: #000;
  font-family: 'Playfair Display', serif;
}

.badge-text {
  display: block;
  font-size: 12px;
  color: #000;
  font-weight: 600;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-top: 5px;
}

.image-secondary {
  position: absolute;
  bottom: -40px;
  left: -40px;
  width: 280px;
  height: 350px;
  border-radius: 12px;
  overflow: hidden;
  border: 5px solid #0a0a0a;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
  z-index: 3;
}

.image-secondary img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.decorative-box {
  position: absolute;
  top: -30px;
  right: -30px;
  width: 200px;
  height: 200px;
  border: 3px solid #ffd700;
  border-radius: 12px;
  z-index: 1;
}

/* ============================================
   RIGHT SIDE - CONTENT
============================================ */
.about-content {
  animation: fadeInRight 1s ease;
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
  margin-bottom: 30px;
  line-height: 1.3;
}

.highlight {
  color: #ffd700;
  font-style: italic;
}

.description {
  font-size: 16px;
  color: #b0b0b0;
  line-height: 1.8;
  margin-bottom: 20px;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin: 40px 0;
  padding: 40px 0;
  border-top: 1px solid rgba(255, 215, 0, 0.2);
  border-bottom: 1px solid rgba(255, 215, 0, 0.2);
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-family: 'Playfair Display', serif;
  font-size: 42px;
  color: #ffd700;
  font-weight: 600;
  margin-bottom: 8px;
}

.stat-label {
  font-size: 14px;
  color: #b0b0b0;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Values Grid */
.values-grid {
  display: flex;
  flex-direction: column;
  gap: 25px;
  margin: 40px 0;
}

.value-item {
  display: flex;
  gap: 20px;
  align-items: flex-start;
}

.value-icon {
  font-size: 32px;
  width: 60px;
  height: 60px;
  background: rgba(255, 215, 0, 0.1);
  border: 2px solid rgba(255, 215, 0, 0.3);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.value-content {
  flex: 1;
}

.value-title {
  font-size: 18px;
  color: white;
  font-weight: 600;
  margin-bottom: 8px;
}

.value-text {
  font-size: 14px;
  color: #b0b0b0;
  line-height: 1.6;
}

/* CTA Button */
.btn-primary {
  margin-top: 40px;
  padding: 16px 40px;
  background: #ffd700;
  color: #000;
  border: none;
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

.btn-primary::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.btn-primary:hover::before {
  transform: translateX(100%);
}

.btn-primary:hover {
  background: #ffed4e;
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(255, 215, 0, 0.4);
}

/* Animations */
@keyframes fadeInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes fadeInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}

/* Responsive */
@media (max-width: 1024px) {
  .about-grid {
    grid-template-columns: 1fr;
    gap: 60px;
  }

  .about-images {
    max-width: 600px;
    margin: 0 auto;
  }

  .section-title {
    font-size: 40px;
  }
}

@media (max-width: 768px) {
  .about-section {
    padding: 80px 0;
  }

  .container {
    padding: 0 20px;
  }

  .section-title {
    font-size: 32px;
  }

  .image-main img {
    height: 450px;
  }

  .image-secondary {
    width: 200px;
    height: 250px;
    left: -20px;
    bottom: -20px;
  }

  .decorative-box {
    width: 150px;
    height: 150px;
    top: -20px;
    right: -20px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .stat-number {
    font-size: 32px;
  }

  .values-grid {
    gap: 20px;
  }

  .value-icon {
    width: 50px;
    height: 50px;
    font-size: 24px;
  }
}
</style>
