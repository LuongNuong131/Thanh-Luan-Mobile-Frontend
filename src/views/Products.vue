<template>
  <div class="container mt-5 mb-5">
    <h2 class="fw-bold mb-4 border-bottom pb-3">Tất Cả Sản Phẩm iPhone</h2>

    <div v-if="productStore.loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Đang tải...</span>
      </div>
    </div>

    <div v-else-if="productStore.error" class="alert alert-danger text-center">
      {{ productStore.error }}
    </div>

    <div class="row" v-else>
      <div
        class="col-md-4 col-lg-3 mb-4"
        v-for="product in productStore.products"
        :key="product.productId"
      >
        <div class="card h-100 shadow-sm border-0 product-card">
          <img
            :src="
              product.image || 'https://via.placeholder.com/300x300?text=iPhone'
            "
            class="card-img-top p-4 bg-light"
            alt="iPhone"
          />
          <div class="card-body text-center d-flex flex-column">
            <h5 class="card-title fw-bold text-truncate">{{ product.name }}</h5>
            <p class="text-muted small mb-3">
              {{ product.storage || "256GB" }} | {{ product.color || "Titan" }}
            </p>
            <div class="mt-auto">
              <p class="card-text text-danger fw-bold fs-5 mb-3">
                {{ formatPrice(product.price) }}
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
      v-if="!productStore.loading && productStore.products.length === 0"
      class="text-center py-5 text-muted"
    >
      <i class="bi bi-box-seam fs-1 d-block mb-3"></i>
      <p>Kho hàng đang trống. Admin chưa đăng sản phẩm nào!</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useProductStore } from "../store/productStore";
import { useCartStore } from "../store/cartStore";

const productStore = useProductStore();
const cartStore = useCartStore();

onMounted(() => {
  productStore.fetchProducts();
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const addToCart = (product) => {
  cartStore.addToCart(product);
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
