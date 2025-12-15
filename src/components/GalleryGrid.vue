<template>
  <div class="gallery-grid">
    <RouterLink
      v-for="item in items"
      :key="item.id"
      class="gallery-card-link"
      :to="`/gallery/${item.category}/${item.id}`"
    >
      <GalleryCard :item="item" :highlight-term="highlightTerm" />
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import GalleryCard from './GalleryCard.vue';
import type { GalleryItem } from '@/types';

defineProps<{ items: GalleryItem[]; highlightTerm: string }>();
</script>

<style scoped>
.gallery-card-link {
  text-decoration: none;
}
</style>
