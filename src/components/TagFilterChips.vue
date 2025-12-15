<template>
  <div class="tag-chips">
    <button
      v-for="tag in tags"
      :key="tag"
      type="button"
      class="tag-chip"
      :class="{ active: modelValue.includes(tag) }"
      @click="toggle(tag)"
    >
      {{ tag }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ tags: string[]; modelValue: string[] }>();
const emit = defineEmits<{ (e: 'update:modelValue', value: string[]): void }>();

const toggle = (tag: string) => {
  const next = props.modelValue.includes(tag)
    ? props.modelValue.filter((value) => value !== tag)
    : [...props.modelValue, tag];
  emit('update:modelValue', next);
};
</script>

<style scoped>
.tag-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
