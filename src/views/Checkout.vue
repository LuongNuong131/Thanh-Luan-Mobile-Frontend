<template>
  <div class="container mt-5 mb-5">
    <h2 class="fw-bold mb-4 border-bottom pb-3">Thanh Toán Đơn Hàng</h2>

    <div class="row">
      <div class="col-lg-7 mb-4">
        <div class="card shadow-sm border-0 mb-4">
          <div class="card-header bg-white py-3">
            <h5 class="mb-0 fw-bold">Thông tin giao hàng</h5>
          </div>
          <div class="card-body p-4">
            <form @submit.prevent="submitOrder">
              <div class="mb-3">
                <label class="form-label">Họ và tên người nhận</label>
                <input
                  type="text"
                  class="form-control bg-light"
                  v-model="orderData.customerName"
                  required
                />
              </div>
              <div class="row mb-3">
                <div class="col-md-6">
                  <label class="form-label">Số điện thoại</label>
                  <input
                    type="text"
                    class="form-control bg-light"
                    v-model="orderData.phone"
                    required
                  />
                </div>
                <div class="col-md-6">
                  <label class="form-label">Email</label>
                  <input
                    type="email"
                    class="form-control bg-light"
                    v-model="orderData.email"
                    required
                    readonly
                  />
                </div>
              </div>
              <div class="mb-4">
                <label class="form-label">Địa chỉ giao hàng chi tiết</label>
                <textarea
                  class="form-control bg-light"
                  rows="3"
                  v-model="orderData.address"
                  required
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                ></textarea>
              </div>

              <button
                type="submit"
                class="btn btn-primary w-100 py-3 fw-bold fs-5 shadow-sm"
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
        <div class="card shadow-sm border-0 mb-3">
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
                  <span class="text-truncate" style="max-width: 180px">{{
                    item.name
                  }}</span>
                </div>
                <span class="fw-bold text-danger">{{
                  formatPrice(item.price * item.quantity)
                }}</span>
              </li>
            </ul>
          </div>

          <div class="card-body border-top bg-light">
            <div class="input-group">
              <input
                type="text"
                class="form-control border-secondary"
                v-model="voucherCode"
                placeholder="Nhập mã giảm giá (VD: LUNU_VIP_100K)"
              />
              <button
                class="btn btn-dark"
                type="button"
                @click="applyVoucher"
                :disabled="discountApplied"
              >
                Áp dụng
              </button>
            </div>
            <small class="text-success mt-2 d-block" v-if="discountApplied"
              ><i class="bi bi-check-circle me-1"></i>Đã áp dụng mã giảm giá
              thành công!</small
            >
          </div>

          <div class="card-footer bg-white p-4">
            <div class="d-flex justify-content-between mb-2">
              <span class="text-muted">Tạm tính:</span>
              <span class="fw-bold">{{
                formatPrice(cartStore.cartTotal)
              }}</span>
            </div>
            <div
              class="d-flex justify-content-between mb-2"
              v-if="discountApplied"
            >
              <span class="text-muted">Giảm giá Voucher:</span>
              <span class="fw-bold text-success"
                >- {{ formatPrice(discountAmount) }}</span
              >
            </div>
            <div class="d-flex justify-content-between mb-3 border-bottom pb-3">
              <span class="text-muted">Phí vận chuyển:</span>
              <span class="text-success fw-bold">Miễn phí</span>
            </div>
            <div class="d-flex justify-content-between">
              <span class="fs-5 fw-bold">Thành tiền:</span>
              <span class="fs-4 fw-bold text-danger">{{
                formatPrice(finalTotal)
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useToastStore } from "../store/toastStore";
import { useRouter } from "vue-router";
import api from "../services/api";

const cartStore = useCartStore();
const authStore = useAuthStore();
const toastStore = useToastStore();
const router = useRouter();
const loading = ref(false);

const voucherCode = ref("");
const discountAmount = ref(0);
const discountApplied = ref(false);

const orderData = ref({
  customerName: "",
  phone: "",
  email: "",
  address: "",
});

onMounted(async () => {
  if (cartStore.items.length === 0) {
    router.push("/cart");
    return;
  }

  // Logic tự động điền thông tin khách hàng từ DB
  if (authStore.isAuthenticated) {
    await authStore.fetchProfile();
    if (authStore.user) {
      orderData.value.customerName = authStore.user.fullName || "";
      orderData.value.phone = authStore.user.phoneNumber || "";
      orderData.value.email = authStore.user.email || "";
      orderData.value.address = authStore.user.address || "";
    }
  }
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const finalTotal = computed(() => {
  const total = cartStore.cartTotal - discountAmount.value;
  return total > 0 ? total : 0;
});

const applyVoucher = () => {
  if (voucherCode.value.trim().toUpperCase() === "LUNU_VIP_100K") {
    discountAmount.value = 100000;
    discountApplied.value = true;
    toastStore.showToast(
      "Áp dụng Voucher LUNU_VIP_100K thành công! Giảm 100K.",
      "success",
    );
  } else {
    toastStore.showToast("Mã giảm giá không hợp lệ hoặc đã hết hạn!", "error");
  }
};

const submitOrder = async () => {
  loading.value = true;
  try {
    const payload = {
      ...orderData.value,
      totalPrice: finalTotal.value,
      items: cartStore.items.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    await api.post("/orders/checkout", payload);

    toastStore.showToast(
      "Chốt đơn thành công! Thành Luân Mobile sẽ sớm liên hệ với bạn.",
      "success",
    );
    cartStore.clearCart();
    router.push("/");
  } catch (error) {
    toastStore.showToast(
      error.response?.data?.message || "Có lỗi xảy ra khi đặt hàng.",
      "error",
    );
  } finally {
    loading.value = false;
  }
};
</script>
