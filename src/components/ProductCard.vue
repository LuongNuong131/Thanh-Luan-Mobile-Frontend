<template>
  <div class="product-card card h-100 border-0 text-center p-3">
    <div class="card-img-wrapper mb-3">
      <img
        :src="product.image"
        class="card-img-top product-img"
        :alt="product.name"
      />
    </div>
    <div class="card-body p-0 d-flex flex-column">
      <h5 class="card-title fw-bold fs-6 mb-2">{{ product.name }}</h5>
      <div class="text-warning mb-2" style="font-size: 0.8rem">
        <i
          class="fa-solid fa-star"
          v-for="n in Math.floor(product.rating)"
          :key="n"
        ></i>
        <i
          class="fa-solid fa-star-half-stroke"
          v-if="product.rating % 1 !== 0"
        ></i>
      </div>
      <p class="price fw-semibold mb-3 mt-auto">
        {{ formatPrice(product.price) }}
      </p>
      <button @click="goToDetail" class="btn btn-apple w-100 mt-auto">
        Xem chi tiết
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const router = useRouter();

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const goToDetail = () => {
  router.push(`/product/${props.product.id}`);
};
</script>

<style scoped>
.product-card {
  border-radius: 20px;
  background-color: #ffffff;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  transition: all 0.3s ease;
  overflow: hidden;
}

.product-card:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.08);
  transform: scale(1.02);
}

.card-img-wrapper {
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-img {
  max-height: 100%;
  width: auto;
  object-fit: contain;
}

.price {
  color: var(--text-dark);
  font-size: 1.1rem;
}
</style>
