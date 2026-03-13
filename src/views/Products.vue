<template>
  <div class="products-page py-5 bg-light min-vh-100">
    <div class="container">
      <h2 class="fw-bold mb-4">Tất cả sản phẩm</h2>
      <div class="row g-4">
        <div
          class="col-6 col-md-4 col-lg-3"
          v-for="product in products"
          :key="product.id"
        >
          <ProductCard :product="product" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductCard from "../components/ProductCard.vue";
import { products } from "../data/products";
</script>
