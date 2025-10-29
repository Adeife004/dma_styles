<script setup>
import Navbar from '../components/Navbar.vue'
import HeroSection from '../components/HeroSection.vue'
import CollectionSection from '../components/CollectionSection.vue'
import AboutSection from '../components/AboutSection.vue'
import ServicesSection from '@/components/ServicesSection.vue'
import ProcessSection from '@/components/ProcessSection.vue'
</script>

<template>
  <main>
    <!-- Navbar -->
    <Navbar />

    <!-- hero-section -->
    <section class="home">
      <HeroSection />
    </section>

    <!-- Collection Section -->
    <section class="collection">
      <CollectionSection />
    </section>

    <!-- About Section -->
    <section class="about">
      <AboutSection />
    </section>

    <!-- Services Section -->
    <section class="services">
      <ServicesSection />
    </section>

    <!-- Process Section -->
    <section class="process">
      <ProcessSection />
    </section>
  </main>
</template>

<style scoped></style>
