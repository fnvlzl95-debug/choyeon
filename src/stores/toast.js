import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useToastStore = defineStore('toast', () => {
    const toasts = ref([]);
    let nextId = 0;
    const show = (message, type = 'info', duration = 3000) => {
        const id = nextId++;
        toasts.value.push({ id, message, type });
        setTimeout(() => {
            remove(id);
        }, duration);
    };
    const remove = (id) => {
        const index = toasts.value.findIndex((t) => t.id === id);
        if (index > -1) {
            toasts.value.splice(index, 1);
        }
    };
    const success = (message, duration) => show(message, 'success', duration);
    const error = (message, duration) => show(message, 'error', duration);
    const info = (message, duration) => show(message, 'info', duration);
    return {
        toasts,
        show,
        remove,
        success,
        error,
        info,
    };
});
