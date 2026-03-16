<template>
  <div class="container mt-5 mb-5">
    <div v-if="productStore.loading" class="text-center py-5">
      <div class="spinner-border text-primary"></div>
    </div>

    <div
      v-else-if="productStore.currentProduct"
      class="bg-white p-4 shadow-sm rounded-4"
    >
      <div class="row mb-5">
        <div class="col-12 col-lg-6 mb-4 text-center p-3">
          <div class="bg-light rounded-4 p-4 position-relative mb-3 border">
            <span
              v-if="productStore.currentProduct.discountPrice"
              class="badge bg-danger position-absolute top-0 start-0 m-3 fs-6 z-2"
              >Đang Sale</span
            >
            <img
              :src="selectedImage"
              class="img-fluid rounded"
              style="max-height: 450px; object-fit: contain"
            />
          </div>
          <div class="d-flex justify-content-center gap-2 overflow-auto py-2">
            <img
              :src="productStore.currentProduct.image"
              @click="selectedImage = productStore.currentProduct.image"
              class="border rounded cursor-pointer"
              :class="{
                'border-primary shadow-sm':
                  selectedImage === productStore.currentProduct.image,
              }"
              style="width: 70px; height: 70px; object-fit: cover"
            />
            <img
              v-for="(img, index) in productStore.currentProduct.gallery"
              :key="index"
              :src="img"
              @click="selectedImage = img"
              class="border rounded cursor-pointer"
              :class="{ 'border-primary shadow-sm': selectedImage === img }"
              style="width: 70px; height: 70px; object-fit: cover"
            />
          </div>
        </div>

        <div class="col-12 col-lg-6 px-lg-4">
          <h2 class="fw-bold mb-3">{{ productStore.currentProduct.name }}</h2>
          <div class="d-flex align-items-center mb-3">
            <span
              class="badge bg-danger me-2 fs-6 blink-soft"
              v-if="productStore.currentProduct.stockQuantity === 1"
              >Sản phẩm duy nhất!</span
            >
            <span
              class="badge bg-success me-2 fs-6"
              v-else-if="productStore.currentProduct.stockQuantity > 1"
              >Còn {{ productStore.currentProduct.stockQuantity }} máy</span
            >
            <span class="badge bg-secondary me-2 fs-6" v-else>Đã bán</span>
          </div>

          <h2 class="text-danger fw-bold mb-4">
            {{
              formatPrice(
                productStore.currentProduct.discountPrice ||
                  productStore.currentProduct.price,
              )
            }}
            <span
              v-if="productStore.currentProduct.discountPrice"
              class="text-muted text-decoration-line-through fs-5 ms-2"
              >{{ formatPrice(productStore.currentProduct.price) }}</span
            >
          </h2>

          <p class="mb-4 text-secondary lh-lg">
            {{ productStore.currentProduct.description }}
          </p>

          <div class="table-responsive mb-4">
            <table class="table table-sm table-bordered mb-0 bg-white">
              <tbody>
                <tr>
                  <td class="bg-light w-25 fw-bold text-muted">Dung lượng</td>
                  <td>
                    {{ productStore.currentProduct.storage || "Đang cập nhật" }}
                  </td>
                </tr>
                <tr>
                  <td class="bg-light fw-bold text-muted">Màu sắc</td>
                  <td>
                    {{ productStore.currentProduct.color || "Đang cập nhật" }}
                  </td>
                </tr>
                <tr>
                  <td class="bg-light fw-bold text-muted">Tình trạng pin</td>
                  <td class="text-success fw-bold">
                    {{
                      productStore.currentProduct.batteryHealth || "Zin 100%"
                    }}
                  </td>
                </tr>
                <tr>
                  <td class="bg-light fw-bold text-muted">Ngoại hình</td>
                  <td>
                    {{ productStore.currentProduct.conditionType || "Mới 99%" }}
                  </td>
                </tr>
                <tr>
                  <td class="bg-light fw-bold text-muted">Phụ kiện</td>
                  <td>
                    {{ productStore.currentProduct.accessories || "Máy trần" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="d-flex flex-wrap gap-2 mt-4">
            <button
              class="btn btn-primary flex-grow-1 py-3 fw-bold fs-5 shadow-sm"
              @click="handleAddToCart"
              :disabled="productStore.currentProduct.stockQuantity === 0"
            >
              <i class="bi bi-cart-plus me-2"></i>
              {{
                productStore.currentProduct.stockQuantity === 0
                  ? "ĐÃ BÁN"
                  : "THÊM VÀO GIỎ"
              }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../store/productStore";
import { useCartStore } from "../store/cartStore";
import { useToastStore } from "../store/toastStore";

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();
const toastStore = useToastStore();
const selectedImage = ref("");

onMounted(async () => {
  await productStore.fetchProductById(route.params.id);
  if (productStore.currentProduct)
    selectedImage.value = productStore.currentProduct.image;
});

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    price || 0,
  );

const handleAddToCart = () => {
  cartStore.addToCart(productStore.currentProduct, 1);
  toastStore.showToast("Đã thêm máy vào giỏ hàng!", "success");
};
</script>
<style scoped>
.cursor-pointer {
  cursor: pointer;
}
.blink-soft {
  animation: blinker 1.5s linear infinite;
}
@keyframes blinker {
  50% {
    opacity: 0.7;
  }
}
</style>
