<script setup>
import Navbar from '../components/Navbar.vue'
import HeroSection from '../components/HeroSection.vue'
import CollectionSection from '../components/CollectionSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ServicesSection from '@/components/ServicesSection.vue'
import ProcessSection from '@/components/ProcessSection.vue'
import Testimonial from '@/components/Testimonial.vue'
import Contact from '@/components/Contact.vue'
import Footer from '@/components/Footer.vue'
</script>

<template>
  <main>
    <!-- Navbar -->
    <Navbar />

    <!-- hero-section -->
    <section id="home">
      <HeroSection />
    </section>

    <!-- Collection Section -->
    <section class="collection">
      <CollectionSection />
    </section>

    <!-- About Section -->
    <section id="about">
      <AboutSection />
    </section>

    <!-- Services Section -->
    <section id="services">
      <ServicesSection />
    </section>

    <!-- Process Section -->
    <section class="process">
      <ProcessSection />
    </section>

    <!-- Testimonial -->
    <section id="testimonials" class="testimonials">
      <Testimonial />
    </section>

    <!-- Contact Section -->
    <section id="contact">
      <Contact />
    </section>

    <!-- footer -->
    <Footer />
  </main>
</template>

<style scoped></style>
