<template>
  <div class="container mt-4 mb-5">
    <div
      class="p-5 mb-5 bg-dark text-white rounded-4 shadow position-relative overflow-hidden"
    >
      <div class="position-relative z-1">
        <h1 class="display-4 fw-bold mb-3">iPhone 15 Pro Max</h1>
        <p class="col-md-6 fs-5 mb-4 opacity-75">
          Titanium. Bền bỉ tuyệt đối. Camera xịn nhất từ trước đến nay. Có mặt
          tại Thành Luân Mobile với giá siêu ưu đãi.
        </p>
        <router-link
          to="/products"
          class="btn btn-warning btn-lg fw-bold px-4 rounded-pill"
        >
          Mua ngay hôm nay
        </router-link>
      </div>
    </div>

    <h2 class="text-center mb-5 fw-bold">Sản Phẩm Mới Nhất</h2>

    <div v-if="productStore.loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Đang tải...</span>
      </div>
    </div>

    <div class="row" v-else>
      <div
        class="col-md-4 col-lg-3 mb-4"
        v-for="product in activeProducts"
        :key="product.productId"
      >
        <div class="card h-100 shadow-sm border-0 product-card">
          <span
            v-if="product.discountPrice"
            class="badge bg-danger position-absolute top-0 start-0 m-2 z-1"
            >Sale</span
          >

          <router-link
            :to="`/product/${product.productId}`"
            class="d-block text-center"
          >
            <img
              :src="
                product.image ||
                'https://via.placeholder.com/300x300?text=iPhone'
              "
              class="card-img-top p-4 bg-light"
              alt="iPhone"
            />
          </router-link>

          <div class="card-body text-center d-flex flex-column">
            <router-link
              :to="`/product/${product.productId}`"
              class="text-decoration-none text-dark"
            >
              <h5 class="card-title fw-bold text-truncate">
                {{ product.name }}
              </h5>
            </router-link>

            <p class="text-muted small mb-3">
              {{ product.storage || "256GB" }} | {{ product.color || "Titan" }}
            </p>
            <div class="mt-auto">
              <p class="card-text text-danger fw-bold fs-5 mb-3">
                {{ formatPrice(product.discountPrice || product.price) }}
              </p>
              <router-link
                :to="`/product/${product.productId}`"
                class="btn btn-light w-100 fw-bold mb-2 border"
                >Xem Chi Tiết</router-link
              >
              <button
                class="btn btn-primary w-100 fw-bold shadow-sm"
                @click="addToCart(product)"
              >
                <i class="bi bi-cart-plus me-1"></i> Thêm Giỏ Hàng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-if="!productStore.loading && activeProducts.length === 0"
      class="text-center py-5 text-muted"
    >
      <i class="bi bi-box-seam fs-1 d-block mb-3"></i>
      <p>Chưa có sản phẩm nào trong cửa hàng. Admin ơi, đăng bài đi!</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useProductStore } from "../store/productStore";
import { useCartStore } from "../store/cartStore";
import { useToastStore } from "../store/toastStore";

const productStore = useProductStore();
const cartStore = useCartStore();
const toastStore = useToastStore();

onMounted(() => {
  productStore.fetchProducts();
});

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    price || 0,
  );

// Chỉ lấy 8 máy mới nhất và CÒN HÀNG (Stock > 0)
const activeProducts = computed(() => {
  return productStore.products.filter((p) => p.stockQuantity > 0).slice(0, 8);
});

const addToCart = (product) => {
  cartStore.addToCart(product, 1);
  toastStore.showToast(`Đã thêm ${product.name} vào giỏ hàng!`, "success");
};
</script>

<style scoped>
.product-card {
  transition: all 0.3s ease;
}
.product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
}
</style>
