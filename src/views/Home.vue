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
        <button
          class="btn btn-warning btn-lg fw-bold px-4 rounded-pill"
          type="button"
        >
          Mua ngay hôm nay
        </button>
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
              {{ product.storage || "256GB" }} |
              {{ product.color || "Titan Tự Nhiên" }}
            </p>
            <div class="mt-auto">
              <p class="card-text text-danger fw-bold fs-5 mb-3">
                {{
                  new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(product.price)
                }}
              </p>
              <button class="btn btn-light w-100 fw-bold mb-2 border">
                Xem Chi Tiết
              </button>
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
      <p>Chưa có sản phẩm nào trong cửa hàng. Admin ơi, đăng bài đi!</p>
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
