<template>
  <button :class="['base-button', variant]" v-bind="$attrs" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{ variant?: 'gold' | 'ghost' | '' }>(),
  {
    variant: ''
  }
);

defineEmits<{ (e: 'click', event: MouseEvent): void }>();
</script>
