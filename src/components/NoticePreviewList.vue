<template>
  <ul class="space-y-4">
    <li v-for="notice in notices" :key="notice.id" class="border-b border-gray-300 pb-4">
      <RouterLink
        :to="`/notices/${notice.id}`"
        class="flex justify-between items-center group"
      >
        <span class="text-gray-700 group-hover:text-black transition-colors truncate w-3/4">
          {{ notice.title }}
        </span>
        <span class="text-xs text-gray-400">{{ formatDate(notice.date) }}</span>
      </RouterLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
import type { NoticeItem } from '@/types';

defineProps<{ notices: NoticeItem[] }>();

const formatDate = (value: string) => new Date(value).toLocaleDateString('ko-KR');
</script>
