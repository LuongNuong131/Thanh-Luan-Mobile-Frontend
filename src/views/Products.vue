<template>
  <div class="container mt-4 mb-5">
    <div
      class="row mb-4 align-items-center bg-white p-3 rounded shadow-sm border"
    >
      <div class="col-lg-4 col-md-12 mb-3 mb-lg-0">
        <div class="input-group">
          <span class="input-group-text bg-light border-end-0"
            ><i class="bi bi-search text-muted"></i
          ></span>
          <input
            type="text"
            class="form-control border-start-0 bg-light"
            v-model="filters.search"
            placeholder="Tìm kiếm iPhone (VD: 15 Pro Max)..."
          />
        </div>
      </div>

      <div class="col-lg-3 col-md-4 mb-3 mb-md-0">
        <select class="form-select" v-model="filters.price">
          <option value="all">Mọi mức giá</option>
          <option value="under10">Dưới 10 triệu</option>
          <option value="10to20">Từ 10 - 20 triệu</option>
          <option value="over20">Trên 20 triệu</option>
        </select>
      </div>

      <div class="col-lg-2 col-md-4 mb-3 mb-md-0">
        <select class="form-select" v-model="filters.storage">
          <option value="all">Mọi dung lượng</option>
          <option value="64GB">64GB</option>
          <option value="128GB">128GB</option>
          <option value="256GB">256GB</option>
          <option value="512GB">512GB</option>
          <option value="1TB">1TB</option>
        </select>
      </div>

      <div class="col-lg-3 col-md-4">
        <div class="input-group">
          <span class="input-group-text bg-white border-0"
            ><i class="bi bi-filter-left fs-5"></i
          ></span>
          <select class="form-select border-0 fw-bold" v-model="filters.sort">
            <option value="newest">Mới nhất</option>
            <option value="priceAsc">Giá: Thấp đến Cao</option>
            <option value="priceDesc">Giá: Cao đến Thấp</option>
          </select>
        </div>
      </div>
    </div>

    <div v-if="productStore.loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>
    <div v-else-if="productStore.error" class="alert alert-danger text-center">
      {{ productStore.error }}
    </div>

    <div
      v-else-if="filteredProducts.length === 0"
      class="text-center py-5 bg-white rounded shadow-sm"
    >
      <i class="bi bi-search fs-1 text-muted mb-3 d-block"></i>
      <h5 class="fw-bold">Không tìm thấy sản phẩm phù hợp</h5>
      <p class="text-muted">
        Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm của bạn xem sao.
      </p>
      <button class="btn btn-outline-primary mt-2" @click="resetFilters">
        Xóa bộ lọc
      </button>
    </div>

    <div class="row" v-else>
      <div
        class="col-md-4 col-lg-3 mb-4"
        v-for="product in filteredProducts"
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
              {{ product.storage || "128GB" }} | {{ product.color || "Titan" }}
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
                :disabled="product.stockQuantity === 0"
              >
                <i class="bi bi-cart-plus me-1"></i>
                {{ product.stockQuantity === 0 ? "Hết Hàng" : "Thêm Giỏ Hàng" }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useProductStore } from "../store/productStore";
import { useCartStore } from "../store/cartStore";
import { useToastStore } from "../store/toastStore";

const productStore = useProductStore();
const cartStore = useCartStore();
const toastStore = useToastStore();

const filters = ref({
  search: "",
  price: "all",
  storage: "all",
  sort: "newest",
});

onMounted(() => {
  productStore.fetchProducts();
});

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    price || 0,
  );

const resetFilters = () => {
  filters.value = { search: "", price: "all", storage: "all", sort: "newest" };
};

const addToCart = (product) => {
  cartStore.addToCart(product, 1);
  toastStore.showToast(`Đã thêm ${product.name} vào giỏ hàng!`, "success");
};

const filteredProducts = computed(() => {
  let result = productStore.products.filter((p) => p.stockQuantity > 0);

  if (filters.value.search.trim()) {
    const keyword = filters.value.search.toLowerCase();
    result = result.filter((p) => p.name.toLowerCase().includes(keyword));
  }
  if (filters.value.price !== "all") {
    result = result.filter((p) => {
      const activePrice = p.discountPrice || p.price;
      if (filters.value.price === "under10") return activePrice < 10000000;
      if (filters.value.price === "10to20")
        return activePrice >= 10000000 && activePrice <= 20000000;
      if (filters.value.price === "over20") return activePrice > 20000000;
      return true;
    });
  }
  if (filters.value.storage !== "all") {
    result = result.filter((p) => p.storage === filters.value.storage);
  }
  if (filters.value.sort === "priceAsc") {
    result.sort(
      (a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price),
    );
  } else if (filters.value.sort === "priceDesc") {
    result.sort(
      (a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price),
    );
  } else {
    result.sort((a, b) => b.productId - a.productId);
  }

  return result;
});
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
