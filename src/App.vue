<script setup lang="ts">
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';
</script>

<template>
  <div class="min-h-screen flex flex-col bg-brand-bg text-gray-900">
    <Header />

    <main class="mx-auto max-w-6xl px-4 py-6">
      <RouterView />
    </main>

    <Footer />
  </div>
  
</template>

<style scoped>
</style>
