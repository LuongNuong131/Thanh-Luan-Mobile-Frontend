import { defineStore } from "pinia";

export const useToastStore = defineStore("toast", {
  state: () => ({
    toasts: [],
  }),
  actions: {
    showToast(message, type = "success") {
      const id = Date.now();
      // type có thể là: 'success', 'error', 'warning', 'info'
      this.toasts.push({ id, message, type });

      // Tự động tắt sau 3 giây
      setTimeout(() => {
        this.removeToast(id);
      }, 3000);
    },
    removeToast(id) {
      this.toasts = this.toasts.filter((toast) => toast.id !== id);
    },
  },
});
