<template>
  <div class="container mt-5 mb-5">
    <h2 class="fw-bold mb-4 border-bottom pb-3">
      <i class="bi bi-heart-fill text-danger me-2"></i>Danh Sách Yêu Thích
    </h2>

    <div v-if="wishlistStore.loading" class="text-center py-5">
      <div class="spinner-border text-danger" role="status">
        <span class="visually-hidden">Đang tải...</span>
      </div>
    </div>

    <div
      v-else-if="wishlistStore.items.length === 0"
      class="text-center py-5 text-muted bg-white rounded shadow-sm"
    >
      <i class="bi bi-heartbreak fs-1 d-block mb-3 text-secondary"></i>
      <h4 class="fw-bold">Danh sách trống</h4>
      <p>Bạn chưa thêm sản phẩm nào vào danh sách yêu thích.</p>
      <router-link to="/products" class="btn btn-primary mt-3 fw-bold px-4 py-2"
        >Khám phá iPhone ngay</router-link
      >
    </div>

    <div class="row" v-else>
      <div
        class="col-md-4 col-lg-3 mb-4"
        v-for="product in wishlistStore.items"
        :key="product.productId"
      >
        <div
          class="card h-100 shadow-sm border-0 product-card position-relative"
        >
          <button
            class="btn btn-light text-danger position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
            style="z-index: 10"
            @click="wishlistStore.removeFromWishlist(product.productId)"
            title="Xóa khỏi yêu thích"
          >
            <i class="bi bi-x-lg fw-bold"></i>
          </button>
          <img
            :src="
              product.image || 'https://via.placeholder.com/300x300?text=iPhone'
            "
            class="card-img-top p-4 bg-light"
            alt="iPhone"
          />
          <div class="card-body text-center d-flex flex-column">
            <h5 class="card-title fw-bold text-truncate">{{ product.name }}</h5>
            <p class="text-muted small mb-2">
              {{ product.storage }} | {{ product.color }}
            </p>
            <p class="card-text text-danger fw-bold fs-5 mb-3">
              {{ formatPrice(product.price) }}
            </p>
            <div class="mt-auto">
              <router-link
                :to="`/product/${product.productId}`"
                class="btn btn-outline-dark w-100 fw-bold mb-2"
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
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useWishlistStore } from "../store/wishlistStore";
import { useCartStore } from "../store/cartStore";

const wishlistStore = useWishlistStore();
const cartStore = useCartStore();

onMounted(() => {
  wishlistStore.fetchWishlist();
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const addToCart = (product) => {
  cartStore.addToCart(product, 1);
  alert("Đã thêm sản phẩm vào giỏ hàng thành công!");
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
