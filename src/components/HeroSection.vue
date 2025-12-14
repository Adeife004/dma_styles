<template>
  <!-- hero-section -->
  <section class="hero">
    <div class="hero-content">
      <div class="logo-container">
        <img src="../assets/logo.png" alt="" class="hero-logo" />
      </div>
      <div class="decorative-line"></div>
      <h1 class="hero-title"><span class="highlight">Elegance</span> Defined</h1>
      <p class="hero-description">
        Discover timeless pieces crafted with passion, precision, and an unwavering commitment to
        quality. Each creation tells a story of sophistication and style.
      </p>
      <div class="hero-buttons">
        <button @click="scrollToSection('collection')" class="btn btn-primary">
          Explore Collection
        </button>
        <button @click="scrollToSection('about')" class="btn btn-secondary">Our Story</button>
      </div>
    </div>

    <div class="scroll-indicator">
      <span></span>
    </div>
  </section>
</template>

<script setup>
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.hero {
  position: relative;
  height: 120vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #2d2d2d 100%);
  overflow: hidden;
}

.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('https://images.unsplash.com/photo-1558769132-cb1aea1c8347?w=1200');
  background-size: cover;
  background-position: center;
  opacity: 0.25;
  z-index: 1;
}

.hero::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(
    circle at 50% 50%,
    rgba(var(--theme-color-rgb, 255, 215, 0), 0.1) 0%,
    transparent 70%
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 900px;
  padding: 0 20px;
  animation: fadeInUp 1.2s ease-out;
}

.logo-container {
  opacity: 0;
  animation: fadeIn 1s ease-out 0.3s forwards;
}

.hero-logo {
  width: 150px;
  height: 150px;
  filter: drop-shadow(0 0 20px rgba(var(--theme-color-rgb, 255, 215, 0), 0.3));
  animation: logoFloat 3s ease-in-out infinite;
}

/* Floating animation with gentle pulse */
@keyframes logoFloat {
  0% {
    transform: rotateY(0deg) scale(1);
  }
  50% {
    transform: rotateY(10deg) scale(1.05);
  }
  100% {
    transform: rotateY(0deg) scale(1);
  }
}

.hero-title {
  font-family: 'Playfair Display', serif;
  font-size: 72px;
  font-weight: 400;
  line-height: 1.2;
  margin-bottom: 25px;
  letter-spacing: 2px;
  opacity: 0;
  animation: fadeIn 1s ease-out 0.6s forwards;
}

.hero-title .highlight {
  color: var(--theme-color, #ffd700);
  font-style: italic;
}

.hero-description {
  font-size: 18px;
  font-weight: 300;
  line-height: 1.8;
  margin-bottom: 40px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  color: #e0e0e0;
  opacity: 0;
  animation: fadeIn 1s ease-out 0.9s forwards;
}

.hero-buttons {
  display: flex;
  gap: 20px;
  justify-content: center;
  flex-wrap: wrap;
  opacity: 0;
  animation: fadeIn 1s ease-out 1.2s forwards;
}

.btn {
  padding: 16px 40px;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
}

.btn-primary {
  background: var(--theme-color, #ffd700);
  color: #000000;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
  transition:
    width 0.6s,
    height 0.6s;
}

.btn-primary:hover::before {
  width: 300px;
  height: 300px;
}

.btn-primary:hover {
  filter: brightness(1.1);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(var(--theme-color-rgb, 255, 215, 0), 0.4);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid var(--theme-color, #ffd700);
}

.btn-secondary:hover {
  background: var(--theme-color, #ffd700);
  color: #000000;
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(var(--theme-color-rgb, 255, 215, 0), 0.3);
}

.scroll-indicator {
  position: absolute;
  bottom: -5px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  animation: bounce 2s infinite;
}

.scroll-indicator span {
  display: block;
  width: 24px;
  height: 40px;
  border: 2px solid var(--theme-color, #ffd700);
  border-radius: 20px;
  position: relative;
}

.scroll-indicator span::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 4px;
  height: 8px;
  background: var(--theme-color, #ffd700);
  border-radius: 2px;
  animation: scrollDown 2s infinite;
}

.decorative-line {
  width: 60px;
  height: 2px;
  background: var(--theme-color, #ffd700);
  margin: 0 auto 0;
  opacity: 0;
  animation: expandLine 1s ease-out 0.5s forwards;
}

@keyframes fadeIn {
  to {
    opacity: 1;
  }
}

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

@keyframes expandLine {
  from {
    width: 0;
    opacity: 0;
  }

  to {
    width: 60px;
    opacity: 1;
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(-50%) translateY(0);
  }

  40% {
    transform: translateX(-50%) translateY(-10px);
  }

  60% {
    transform: translateX(-50%) translateY(-5px);
  }
}

@keyframes scrollDown {
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }

  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(20px);
  }
}

@media (max-width: 768px) {
  .hero-title {
    font-size: 42px;
  }

  .hero-description {
    font-size: 16px;
  }

  .btn {
    padding: 14px 30px;
    font-size: 12px;
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 80%;
    max-width: 300px;
  }
}

@media (max-width: 320px) {
  .hero {
    height: 150vh;
  }
}
</style>
