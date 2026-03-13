import { defineStore } from "pinia";

export const useCartStore = defineStore("cart", {
  state: () => ({
    items: JSON.parse(localStorage.getItem("cart")) || [],
  }),
  getters: {
    cartCount: (state) =>
      state.items.reduce((total, item) => total + item.quantity, 0),
    cartTotal: (state) =>
      state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0,
      ),
  },
  actions: {
    addToCart(product, quantity = 1) {
      const existingItem = this.items.find(
        (item) => item.productId === product.productId,
      );
      const price = product.discountPrice
        ? product.discountPrice
        : product.price;

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        this.items.push({
          productId: product.productId,
          name: product.name,
          price: price,
          image: product.image || "https://via.placeholder.com/150",
          quantity: quantity,
        });
      }
      this.saveCart();
    },
    removeFromCart(productId) {
      this.items = this.items.filter((item) => item.productId !== productId);
      this.saveCart();
    },
    updateQuantity(productId, quantity) {
      const item = this.items.find((item) => item.productId === productId);
      if (item && quantity > 0) {
        item.quantity = quantity;
        this.saveCart();
      }
    },
    clearCart() {
      this.items = [];
      this.saveCart();
    },
    saveCart() {
      localStorage.setItem("cart", JSON.stringify(this.items));
    },
  },
});
