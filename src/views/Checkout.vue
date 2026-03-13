<template>
  <div class="container mt-5 mb-5">
    <h2 class="fw-bold mb-4">Thanh Toán Đơn Hàng</h2>

    <div class="row">
      <div class="col-lg-7 mb-4">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-white py-3">
            <h5 class="mb-0 fw-bold">Thông tin giao hàng</h5>
          </div>
          <div class="card-body p-4">
            <form @submit.prevent="submitOrder">
              <div class="mb-3">
                <label class="form-label">Họ và tên người nhận</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="orderData.customerName"
                  required
                />
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label class="form-label">Số điện thoại</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="orderData.phone"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control"
                    v-model="orderData.email"
                    required
                    readonly
                  />
                </div>
              </div>
              <div class="mb-4">
                <label class="form-label">Địa chỉ giao hàng chi tiết</label>
                <textarea
                  class="form-control"
                  rows="3"
                  v-model="orderData.address"
                  required
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                ></textarea>
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100 py-3 fw-bold fs-5"
                :disabled="loading || cartStore.items.length === 0"
              >
                <span
                  v-if="loading"
                  class="spinner-border spinner-border-sm me-2"
                ></span>
                XÁC NHẬN ĐẶT HÀNG
              </button>
            </form>
          </div>
        </div>
      </div>

      <div class="col-lg-5">
        <div class="card shadow-sm border-0">
          <div class="card-header bg-white py-3">
            <h5 class="mb-0 fw-bold">
              Tóm tắt đơn hàng ({{ cartStore.cartCount }} sản phẩm)
            </h5>
          </div>
          <div class="card-body p-0">
            <ul class="list-group list-group-flush">
              <li
                class="list-group-item d-flex justify-content-between align-items-center p-3"
                v-for="item in cartStore.items"
                :key="item.productId"
              >
                <div class="d-flex align-items-center">
                  <span class="badge bg-secondary me-3">{{
                    item.quantity
                  }}</span>
                  <span class="text-truncate" style="max-width: 200px">{{
                    item.name
                  }}</span>
                </div>
                <span class="fw-bold text-danger">{{
                  formatPrice(item.price * item.quantity)
                }}</span>
              </li>
            </ul>
          </div>
          <div class="card-footer bg-light p-4">
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Tạm tính:</span>
              <span class="fw-bold">{{
                formatPrice(cartStore.cartTotal)
              }}</span>
            </div>
            <div class="d-flex justify-content-between mb-3 border-bottom pb-3">
              <span class="text-muted">Phí vận chuyển:</span>
              <span class="text-success fw-bold">Miễn phí</span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="fs-5 fw-bold">Thành tiền:</span>
              <span class="fs-4 fw-bold text-danger">{{
                formatPrice(cartStore.cartTotal)
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";
import api from "../services/api";

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();
const loading = ref(false);

const orderData = ref({
  customerName: "",
  phone: "",
  email: "",
  address: "",
});

onMounted(() => {
  // Nếu giỏ trống thì đá về trang giỏ hàng
  if (cartStore.items.length === 0) {
    router.push("/cart");
    return;
  }

  // Tự động điền thông tin nếu user đã đăng nhập
  if (authStore.user) {
    orderData.value.customerName = authStore.user.fullName || "";
    orderData.value.email = authStore.user.email || "";
  }
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const submitOrder = async () => {
  loading.value = true;
  try {
    const payload = {
      ...orderData.value,
      items: cartStore.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    // Gọi API OrderController đã viết ở phần Backend
    const response = await api.post("/orders/checkout", payload);

    alert("Chốt đơn thành công! Thành Luân Mobile sẽ sớm liên hệ với bạn.");
    cartStore.clearCart();
    router.push("/"); // Đẩy về trang chủ hoặc trang lịch sử mua hàng
  } catch (error) {
    alert(error.response?.data?.message || "Có lỗi xảy ra khi đặt hàng.");
  } finally {
    loading.value = false;
  }
};
</script>
