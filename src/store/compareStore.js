import { defineStore } from "pinia";
import { useToastStore } from "./toastStore";

export const useCompareStore = defineStore("compare", {
  state: () => ({
    items: [],
  }),
  actions: {
    addToCompare(product) {
      const toastStore = useToastStore();
      if (this.items.length >= 3) {
        toastStore.showToast(
          "Chỉ có thể so sánh tối đa 3 sản phẩm cùng lúc!",
          "warning",
        );
        return;
      }
      if (this.items.find((item) => item.productId === product.productId)) {
        toastStore.showToast("Sản phẩm này đã có trên bàn cân!", "info");
        return;
      }
      this.items.push(product);
      toastStore.showToast(
        `Đã thêm ${product.name} vào mục so sánh!`,
        "success",
      );
    },
    removeFromCompare(productId) {
      this.items = this.items.filter((item) => item.productId !== productId);
    },
    clearCompare() {
      this.items = [];
    },
  },
});
