<template>
  <div
    class="floating-field"
    :class="{
      'floating-field--focused': isFocused,
      'floating-field--filled': modelValue,
      'floating-field--error': error,
      'floating-field--success': success,
      'floating-field--textarea': type === 'textarea',
      'floating-field--date': type === 'date'
    }"
  >
    <div class="floating-field__inner">
      <!-- Textarea -->
      <textarea
        v-if="type === 'textarea'"
        :id="id"
        :value="modelValue"
        :placeholder="isFocused ? placeholder : ''"
        :rows="rows"
        class="floating-field__input floating-field__textarea"
        @input="$emit('update:modelValue', ($event.target as HTMLTextAreaElement).value)"
        @focus="isFocused = true"
        @blur="isFocused = false"
      ></textarea>

      <!-- Input -->
      <input
        v-else
        :id="id"
        :type="type"
        :value="modelValue"
        :placeholder="isFocused && type !== 'date' ? placeholder : ''"
        class="floating-field__input"
        @input="$emit('update:modelValue', ($event.target as HTMLInputElement).value)"
        @focus="isFocused = true"
        @blur="isFocused = false"
      >

      <!-- Floating Label -->
      <label :for="id" class="floating-field__label">
        <span class="floating-field__label-text">{{ label }}</span>
        <span v-if="required" class="floating-field__required">*</span>
      </label>

      <!-- Ink Line (bottom border with gold focus effect) -->
      <div class="floating-field__line">
        <div class="floating-field__line-fill"></div>
      </div>
    </div>

    <!-- Error/Helper Message -->
    <Transition name="field-message">
      <p v-if="error" class="floating-field__error">{{ error }}</p>
      <p v-else-if="helper && isFocused" class="floating-field__helper">{{ helper }}</p>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineProps<{
  id: string;
  label: string;
  modelValue: string;
  type?: 'text' | 'tel' | 'email' | 'date' | 'textarea';
  placeholder?: string;
  required?: boolean;
  error?: string;
  success?: boolean;
  helper?: string;
  rows?: number;
}>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
}>();

const isFocused = ref(false);
</script>

<style scoped>
.floating-field {
  position: relative;
  margin-bottom: var(--space-md);
}

.floating-field__inner {
  position: relative;
}

.floating-field__input {
  width: 100%;
  padding: var(--space-lg) 0 var(--space-sm);
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-ink);
  background: transparent;
  border: none;
  outline: none;
  transition: all var(--duration-normal) var(--ease-out);
}

.floating-field__input::placeholder {
  color: var(--color-stone);
  opacity: 0.5;
}

/* Date input - always show label on top */
.floating-field--date .floating-field__label {
  transform: translateY(-100%) scale(0.75);
  color: var(--color-earth);
}

.floating-field--date.floating-field--focused .floating-field__label {
  color: var(--color-gold-deep);
}

/* Date input custom styling */
.floating-field__input[type="date"] {
  position: relative;
  cursor: pointer;
  color-scheme: light;
}

.floating-field__input[type="date"]::-webkit-calendar-picker-indicator {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  opacity: 0.4;
  cursor: pointer;
  transition: opacity var(--duration-fast) var(--ease-out);
}

.floating-field--focused .floating-field__input[type="date"]::-webkit-calendar-picker-indicator {
  opacity: 0.8;
}

.floating-field__textarea {
  min-height: 120px;
  resize: vertical;
  line-height: var(--leading-relaxed);
}

/* Floating Label */
.floating-field__label {
  position: absolute;
  left: 0;
  top: var(--space-lg);
  display: flex;
  align-items: center;
  gap: var(--space-2xs);
  font-family: var(--font-body);
  font-size: var(--text-base);
  color: var(--color-stone);
  pointer-events: none;
  transform-origin: left center;
  transition: all var(--duration-normal) var(--ease-out);
}

.floating-field--focused .floating-field__label,
.floating-field--filled .floating-field__label {
  transform: translateY(-100%) scale(0.75);
  color: var(--color-earth);
}

.floating-field--focused .floating-field__label {
  color: var(--color-gold-deep);
}

.floating-field--error .floating-field__label {
  color: var(--color-error);
}

.floating-field__required {
  color: var(--color-gold);
  font-size: var(--text-xs);
}

/* Ink Line */
.floating-field__line {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--color-hanji-deep);
  overflow: hidden;
}

.floating-field__line-fill {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--color-gold), transparent);
  transform: translateX(-50%);
  transition: width var(--duration-normal) var(--ease-out);
}

.floating-field--focused .floating-field__line-fill {
  width: 100%;
}

.floating-field--error .floating-field__line {
  background: var(--color-error);
}

.floating-field--success .floating-field__line-fill {
  background: linear-gradient(90deg, transparent, var(--color-earth), transparent);
  width: 100%;
}

/* Messages */
.floating-field__error,
.floating-field__helper {
  margin-top: var(--space-xs);
  font-size: var(--text-xs);
  letter-spacing: var(--tracking-wide);
}

.floating-field__error {
  color: var(--color-error);
}

.floating-field__helper {
  color: var(--color-stone);
}

/* Message transition */
.field-message-enter-active,
.field-message-leave-active {
  transition: all var(--duration-fast) var(--ease-out);
}

.field-message-enter-from,
.field-message-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
