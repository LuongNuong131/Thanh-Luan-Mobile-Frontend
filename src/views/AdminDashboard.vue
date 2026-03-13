<template>
  <div class="container-fluid mt-4 mb-5 px-4">
    <div class="row">
      <div class="col-md-3 col-lg-2 mb-4">
        <div class="list-group shadow-sm border-0">
          <router-link
            to="/admin"
            class="list-group-item list-group-item-action active fw-bold py-3"
          >
            <i class="bi bi-speedometer2 me-2"></i> Dashboard
          </router-link>
          <router-link
            to="/admin/products"
            class="list-group-item list-group-item-action py-3"
          >
            <i class="bi bi-box me-2"></i> Kho Sản phẩm
          </router-link>
          <router-link
            to="/admin/orders"
            class="list-group-item list-group-item-action py-3"
          >
            <i class="bi bi-receipt me-2"></i> Đơn hàng
          </router-link>
        </div>
      </div>

      <div class="col-md-9 col-lg-10">
        <h2 class="fw-bold mb-4">Tổng Quan Hệ Thống</h2>

        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status"></div>
        </div>

        <div v-else class="row">
          <div class="col-md-3 mb-3">
            <div class="card text-white bg-primary shadow-sm h-100 border-0">
              <div class="card-body py-4">
                <h6 class="card-title text-uppercase opacity-75">
                  Tổng Doanh Thu
                </h6>
                <h3 class="card-text fw-bold">
                  {{ formatPrice(stats.totalRevenue) }}
                </h3>
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <div class="card text-white bg-success shadow-sm h-100 border-0">
              <div class="card-body py-4">
                <h6 class="card-title text-uppercase opacity-75">Đơn Hàng</h6>
                <h3 class="card-text fw-bold">{{ stats.totalOrders }}</h3>
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <div class="card text-white bg-warning shadow-sm h-100 border-0">
              <div class="card-body py-4">
                <h6 class="card-title text-uppercase opacity-75">
                  Sản Phẩm Trong Kho
                </h6>
                <h3 class="card-text fw-bold">{{ stats.totalProducts }}</h3>
              </div>
            </div>
          </div>
          <div class="col-md-3 mb-3">
            <div class="card text-white bg-danger shadow-sm h-100 border-0">
              <div class="card-body py-4">
                <h6 class="card-title text-uppercase opacity-75">Khách Hàng</h6>
                <h3 class="card-text fw-bold">{{ stats.totalUsers }}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";

const loading = ref(true);
const stats = ref({
  totalUsers: 0,
  totalOrders: 0,
  totalProducts: 0,
  totalRevenue: 0,
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price || 0);
};

onMounted(async () => {
  try {
    const response = await api.get("/admin/dashboard/stats");
    stats.value = response.data;
  } catch (error) {
    console.error("Lỗi khi tải thống kê:", error);
  } finally {
    loading.value = false;
  }
});
</script>
