import { defineStore } from "pinia";
import api from "../services/api";

export const useWishlistStore = defineStore("wishlist", {
  state: () => ({
    items: [],
    loading: false,
  }),
  getters: {
    wishlistCount: (state) => state.items.length,
  },
  actions: {
    async fetchWishlist() {
      this.loading = true;
      try {
        const res = await api.get("/wishlist");
        this.items = res.data;
      } catch (error) {
        console.error("Lỗi tải danh sách yêu thích:", error);
      } finally {
        this.loading = false;
      }
    },
    async addToWishlist(productId) {
      try {
        await api.post(`/wishlist/${productId}`);
        await this.fetchWishlist();
        return true;
      } catch (error) {
        throw error;
      }
    },
    async removeFromWishlist(productId) {
      try {
        await api.delete(`/wishlist/${productId}`);
        await this.fetchWishlist();
      } catch (error) {
        console.error("Lỗi xóa khỏi danh sách yêu thích:", error);
      }
    },
  },
});
