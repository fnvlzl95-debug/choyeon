import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface Toast {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
}

export const useToastStore = defineStore('toast', () => {
  const toasts = ref<Toast[]>([]);
  let nextId = 0;

  const show = (message: string, type: Toast['type'] = 'info', duration = 3000) => {
    const id = nextId++;
    toasts.value.push({ id, message, type });

    setTimeout(() => {
      remove(id);
    }, duration);
  };

  const remove = (id: number) => {
    const index = toasts.value.findIndex((t) => t.id === id);
    if (index > -1) {
      toasts.value.splice(index, 1);
    }
  };

  const success = (message: string, duration?: number) => show(message, 'success', duration);
  const error = (message: string, duration?: number) => show(message, 'error', duration);
  const info = (message: string, duration?: number) => show(message, 'info', duration);

  return {
    toasts,
    show,
    remove,
    success,
    error,
    info,
  };
});
