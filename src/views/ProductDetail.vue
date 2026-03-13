<template>
  <div class="product-detail py-5 bg-white min-vh-100" v-if="product">
    <div class="container">
      <nav aria-label="breadcrumb" class="mb-4">
        <ol class="breadcrumb small">
          <li class="breadcrumb-item">
            <router-link to="/" class="text-decoration-none text-muted"
              >Trang chủ</router-link
            >
          </li>
          <li class="breadcrumb-item">
            <router-link to="/products" class="text-decoration-none text-muted"
              >Sản phẩm</router-link
            >
          </li>
          <li class="breadcrumb-item active" aria-current="page">
            {{ product.name }}
          </li>
        </ol>
      </nav>

      <div class="row align-items-center">
        <div class="col-md-6 mb-4 mb-md-0 text-center">
          <img
            :src="product.image"
            :alt="product.name"
            class="img-fluid detail-img"
          />
        </div>

        <div class="col-md-6 ps-md-5">
          <h1 class="fw-bold mb-2">{{ product.name }}</h1>
          <div class="text-warning mb-3">
            <i
              class="fa-solid fa-star"
              v-for="n in Math.floor(product.rating)"
              :key="n"
            ></i>
            <span class="text-muted ms-2 small">(Đánh giá khách hàng)</span>
          </div>

          <h2 class="text-danger fw-bold mb-4">
            {{ formatPrice(product.price) }}
          </h2>

          <p class="text-muted mb-4">{{ product.description }}</p>

          <div class="specs-box bg-light p-4 rounded-4 mb-4">
            <h6 class="fw-bold mb-3">Thông số kỹ thuật</h6>
            <ul class="list-unstyled mb-0 small">
              <li
                class="mb-2 pb-2 border-bottom"
                v-for="(spec, index) in product.specs"
                :key="index"
              >
                {{ spec }}
              </li>
            </ul>
          </div>

          <div class="d-flex gap-3 mt-4">
            <button class="btn btn-apple flex-grow-1 py-3 fs-5">
              Mua Ngay
            </button>
            <button class="btn btn-outline-dark rounded-3 px-4 py-3">
              <i class="fa-solid fa-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="container py-5 text-center min-vh-100">
    <h3>Sản phẩm không tồn tại</h3>
    <router-link to="/products" class="btn btn-apple mt-3"
      >Quay lại cửa hàng</router-link
    >
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { products } from "../data/products";

const route = useRoute();
const productId = Number(route.params.id);

const product = computed(() => products.find((p) => p.id === productId));

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
</script>

<style scoped>
.detail-img {
  max-height: 500px;
  object-fit: contain;
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.specs-box li:last-child {
  border-bottom: none !important;
  margin-bottom: 0 !important;
  padding-bottom: 0 !important;
}
</style>
