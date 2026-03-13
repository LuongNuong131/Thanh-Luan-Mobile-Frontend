<template>
  <div class="container-fluid mt-4 mb-5 px-4">
    <div class="row">
      <div class="col-md-3 col-lg-2 mb-4">
        <div class="list-group shadow-sm border-0">
          <router-link
            to="/admin"
            class="list-group-item list-group-item-action py-3"
            ><i class="bi bi-speedometer2 me-2"></i> Dashboard</router-link
          >
          <router-link
            to="/admin/products"
            class="list-group-item list-group-item-action py-3"
            ><i class="bi bi-box me-2"></i> Kho Sản phẩm</router-link
          >
          <router-link
            to="/admin/orders"
            class="list-group-item list-group-item-action active fw-bold py-3"
            ><i class="bi bi-receipt me-2"></i> Đơn hàng</router-link
          >
        </div>
      </div>

      <div class="col-md-9 col-lg-10">
        <h2 class="fw-bold mb-4">Quản Lý Đơn Hàng</h2>

        <div v-if="loading" class="text-center py-5">
          <div class="spinner-border text-primary" role="status"></div>
        </div>

        <div v-else class="card shadow-sm border-0">
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th class="ps-4">Mã Đơn</th>
                    <th>Khách Hàng</th>
                    <th>Ngày Đặt</th>
                    <th>Tổng Tiền</th>
                    <th>Trạng Thái</th>
                    <th class="pe-4 text-end">Cập nhật trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="order in orders" :key="order.orderId">
                    <td class="ps-4 fw-bold">#ORD-{{ order.orderId }}</td>
                    <td>
                      <div class="fw-bold">{{ order.customerName }}</div>
                      <small class="text-muted">{{ order.phone }}</small>
                    </td>
                    <td>
                      {{
                        new Date(order.orderTime).toLocaleDateString("vi-VN")
                      }}
                    </td>
                    <td class="text-danger fw-bold">
                      {{ formatPrice(order.totalPrice) }}
                    </td>
                    <td>
                      <span
                        class="badge"
                        :class="{
                          'bg-warning text-dark': order.status === 'PENDING',
                          'bg-info': order.status === 'CONFIRMED',
                          'bg-success': order.status === 'DELIVERED',
                          'bg-danger': order.status === 'CANCELLED',
                        }"
                      >
                        {{ getStatusText(order.status) }}
                      </span>
                    </td>
                    <td class="pe-4 text-end">
                      <select
                        class="form-select form-select-sm d-inline-block w-auto"
                        @change="
                          updateStatus(order.orderId, $event.target.value)
                        "
                        :value="order.status"
                      >
                        <option value="PENDING">Chờ xử lý</option>
                        <option value="CONFIRMED">Đã xác nhận</option>
                        <option value="DELIVERED">Đã giao hàng</option>
                        <option value="CANCELLED">Hủy đơn</option>
                      </select>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div v-if="orders.length === 0" class="text-center py-4 text-muted">
              Chưa có đơn hàng nào trong hệ thống.
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

const orders = ref([]);
const loading = ref(true);

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const getStatusText = (status) => {
  const map = {
    PENDING: "Chờ xử lý",
    CONFIRMED: "Đã xác nhận",
    DELIVERED: "Đã giao",
    CANCELLED: "Đã hủy",
  };
  return map[status] || status;
};

const fetchOrders = async () => {
  loading.value = true;
  try {
    const res = await api.get("/orders/all");
    orders.value = res.data;
  } catch (error) {
    console.error("Lỗi tải đơn hàng", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchOrders();
});

const updateStatus = async (orderId, newStatus) => {
  try {
    await api.put(`/admin/orders/${orderId}/status`, { status: newStatus });
    alert("Cập nhật trạng thái thành công!");
    fetchOrders(); // Tải lại danh sách
  } catch (error) {
    alert("Có lỗi xảy ra khi cập nhật!");
  }
};
</script>
