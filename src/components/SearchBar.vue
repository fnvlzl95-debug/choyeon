<template>
  <div class="search-field">
    <span>검색</span>
    <input :value="modelValue" type="search" placeholder="원하시는 스타일을 찾아보세요" @input="emit('update:modelValue', ($event.target as HTMLInputElement).value)" />
  </div>
</template>

<script setup lang="ts">
defineProps<{ modelValue: string }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>();
</script>
