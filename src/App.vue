<template>
  <div class="min-h-screen bg-dark-950 text-dark-100">
    <NavBar />
    <main class="pt-16">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
</script>