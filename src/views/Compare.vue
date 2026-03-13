<template>
  <div class="container mt-5 mb-5">
    <h2 class="fw-bold mb-4 border-bottom pb-3">
      <i class="bi bi-arrow-left-right text-info me-2"></i>So Sánh Sản Phẩm
    </h2>

    <div
      v-if="compareStore.items.length === 0"
      class="text-center py-5 bg-white rounded shadow-sm"
    >
      <i class="bi bi-phone-flip fs-1 text-muted mb-3 d-block"></i>
      <h5 class="fw-bold">Bàn cân đang trống</h5>
      <p class="text-muted">
        Vui lòng chọn các sản phẩm bạn muốn so sánh từ cửa hàng.
      </p>
      <router-link to="/products" class="btn btn-primary mt-3 px-4 py-2 fw-bold"
        >Đi tới Cửa hàng</router-link
      >
    </div>

    <div class="table-responsive bg-white shadow-sm rounded p-3" v-else>
      <table
        class="table table-bordered table-hover text-center align-middle mb-0"
      >
        <thead class="table-light">
          <tr>
            <th class="w-25 text-start align-middle">Đặc điểm</th>
            <th
              v-for="product in compareStore.items"
              :key="product.productId"
              style="width: 25%"
            >
              <div class="position-relative p-2">
                <button
                  class="btn btn-sm btn-outline-danger position-absolute top-0 end-0 rounded-circle"
                  @click="compareStore.removeFromCompare(product.productId)"
                >
                  <i class="bi bi-x-lg"></i>
                </button>
                <img
                  :src="product.image || 'https://via.placeholder.com/150'"
                  class="img-fluid mb-2 rounded"
                  style="max-height: 150px; object-fit: contain"
                />
                <h6 class="fw-bold">{{ product.name }}</h6>
              </div>
            </th>
            <th
              v-if="compareStore.items.length < 3"
              class="bg-light align-middle"
              style="width: 25%"
            >
              <router-link
                to="/products"
                class="btn btn-outline-primary btn-sm mt-2"
              >
                <i class="bi bi-plus-lg me-1"></i>Thêm máy
              </router-link>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="fw-bold text-start bg-light">Giá bán</td>
            <td
              v-for="product in compareStore.items"
              :key="'price' + product.productId"
              class="text-danger fw-bold fs-5"
            >
              {{ formatPrice(product.discountPrice || product.price) }}
            </td>
            <td v-if="compareStore.items.length < 3"></td>
          </tr>
          <tr>
            <td class="fw-bold text-start bg-light">Dung lượng</td>
            <td
              v-for="product in compareStore.items"
              :key="'storage' + product.productId"
            >
              {{ product.storage }}
            </td>
            <td v-if="compareStore.items.length < 3"></td>
          </tr>
          <tr>
            <td class="fw-bold text-start bg-light">Màu sắc</td>
            <td
              v-for="product in compareStore.items"
              :key="'color' + product.productId"
            >
              {{ product.color }}
            </td>
            <td v-if="compareStore.items.length < 3"></td>
          </tr>
          <tr>
            <td class="fw-bold text-start bg-light">Tình trạng</td>
            <td
              v-for="product in compareStore.items"
              :key="'condition' + product.productId"
            >
              {{ product.conditionType || "Mới 100%" }}
            </td>
            <td v-if="compareStore.items.length < 3"></td>
          </tr>
          <tr>
            <td class="fw-bold text-start bg-light">Hành động</td>
            <td
              v-for="product in compareStore.items"
              :key="'action' + product.productId"
            >
              <button
                class="btn btn-primary btn-sm fw-bold w-100"
                @click="addToCart(product)"
              >
                Thêm vào giỏ
              </button>
            </td>
            <td v-if="compareStore.items.length < 3"></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { useCompareStore } from "../store/compareStore";
import { useCartStore } from "../store/cartStore";
import { useToastStore } from "../store/toastStore";

const compareStore = useCompareStore();
const cartStore = useCartStore();
const toastStore = useToastStore();

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const addToCart = (product) => {
  cartStore.addToCart(product, 1);
  toastStore.showToast(`Đã thêm ${product.name} vào giỏ hàng!`, "success");
};
</script>
