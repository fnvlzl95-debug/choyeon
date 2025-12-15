<template>
  <article class="gallery-card">
    <div class="thumb" :style="{ backgroundImage: item.palette }"></div>
    <div>
      <h3 v-html="highlightedTitle"></h3>
      <p class="subtitle">{{ item.subtitle }}</p>
      <p class="description">{{ item.description }}</p>
      <div class="tag-row">
        <span v-for="tag in item.tags" :key="tag" class="tag-pill">{{ tag }}</span>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
import type { GalleryItem } from '@/types';
import { computed } from 'vue';

const props = defineProps<{ item: GalleryItem; highlightTerm: string }>();

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const highlightedTitle = computed(() => {
  if (!props.highlightTerm.trim()) return props.item.title;
  const regex = new RegExp(`(${escape(props.highlightTerm.trim())})`, 'gi');
  return props.item.title.replace(regex, '<mark>$1</mark>');
});
</script>

<style scoped>
.description {
  font-size: 0.92rem;
  color: rgba(31, 31, 31, 0.7);
}

.tag-row {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 12px;
}

.tag-pill {
  padding: 5px 12px;
  border-radius: var(--radius-pill);
  background: rgba(31, 31, 31, 0.08);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
}

mark {
  background: rgba(185, 154, 101, 0.35);
  color: inherit;
  padding: 0 2px;
}
</style>
