<script setup>
import Navbar from '../components/Navbar.vue' 
</script>

<template>
  <main>
    <!-- Navbar -->
    <Navbar />

    <!-- Home Page Content -->
    <section class="home-content">
      <h1>Welcome to DMA Styles</h1>
      <p>Where creativity meets elegance.</p>
    </section>
  </main>
</template>

<style scoped>
.home-content {
  min-height: 100vh;
  background: #111;
  color: #fff;
  text-align: center;
  padding-top: 8rem;
  font-family: 'Poppins', sans-serif;
}

.home-content h1 {
  color: #ffd700;
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.home-content p {
  color: #ccc;
  font-size: 1.2rem;
}
</style>
