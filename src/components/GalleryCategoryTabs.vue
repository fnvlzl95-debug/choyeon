<template>
  <div class="category-tabs">
    <RouterLink
      v-for="tab in tabs"
      :key="tab.key"
      class="tab"
      :class="{ active: current === tab.key }"
      :to="`/gallery/${tab.key}`"
    >
      {{ tab.label }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { GalleryCategory } from '@/types';

const props = defineProps<{ current: GalleryCategory }>();

const tabs = [
  { key: 'dol', label: '돌잔치' },
  { key: 'place', label: '장소' },
  { key: 'hanbok', label: '한복' }
] as const;
</script>

<style scoped>
.category-tabs {
  display: flex;
  gap: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 12px;
  border-radius: var(--radius-pill);
  box-shadow: var(--elevation-soft);
}

.tab {
  flex: 1;
  text-align: center;
  padding: 12px 18px;
  border-radius: var(--radius-pill);
  border: 1px solid transparent;
  letter-spacing: 0.25em;
  font-size: 0.85rem;
  text-transform: uppercase;
  color: var(--color-muted);
}

.tab.active {
  background: var(--color-ink);
  color: var(--color-cloud);
  border-color: transparent;
}
</style>
