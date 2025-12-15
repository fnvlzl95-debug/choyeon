<template>
  <div class="app-layout">
    <TheHeader />
    <main class="app-layout__main">
      <slot />
    </main>
    <TheFooter />
    <ToastContainer />
  </div>
</template>

<script setup lang="ts">
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';
import ToastContainer from '@/components/ToastContainer.vue';
</script>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-layout__main {
  flex: 1;
  padding-top: 80px; /* Header height */
}

@media (min-width: 768px) {
  .app-layout__main {
    padding-top: 100px;
  }
}
</style>
