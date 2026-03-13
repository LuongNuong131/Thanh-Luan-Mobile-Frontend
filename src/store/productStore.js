import { defineStore } from "pinia";
import api from "../services/api";

export const useProductStore = defineStore("product", {
  state: () => ({
    products: [],
    currentProduct: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchProducts() {
      this.loading = true;
      this.error = null;
      try {
        const response = await api.get("/products");
        this.products = response.data;
      } catch (err) {
        this.error =
          err.response?.data?.message || "Lỗi khi tải danh sách sản phẩm";
        console.error("Error fetching products:", err);
      } finally {
        this.loading = false;
      }
    },
    async fetchProductById(id) {
      this.loading = true;
      this.error = null;
      this.currentProduct = null;
      try {
        const response = await api.get(`/products/${id}`);
        this.currentProduct = response.data;
      } catch (err) {
        this.error =
          err.response?.data?.message || "Không tìm thấy sản phẩm này";
        console.error("Error fetching product details:", err);
      } finally {
        this.loading = false;
      }
    },
  },
});
