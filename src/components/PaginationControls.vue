<template>
  <div class="pagination">
    <button type="button" :disabled="currentPage === 1" @click="emit('update:page', currentPage - 1)">
      이전
    </button>
    <button
      v-for="page in totalPages"
      :key="page"
      type="button"
      :class="{ active: page === currentPage }"
      @click="emit('update:page', page)"
    >
      {{ page }}
    </button>
    <button
      type="button"
      :disabled="currentPage === totalPages"
      @click="emit('update:page', currentPage + 1)"
    >
      다음
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ currentPage: number; totalPages: number }>();
const emit = defineEmits<{ (e: 'update:page', page: number): void }>();
</script>

<style scoped>
button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
