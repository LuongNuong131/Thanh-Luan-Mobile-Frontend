<template>
  <div class="container mt-5 mb-5">
    <h2 class="fw-bold mb-4">Giỏ Hàng Của Bạn</h2>

    <div v-if="cartStore.items.length === 0" class="text-center py-5">
      <i class="bi bi-cart-x text-muted" style="font-size: 4rem"></i>
      <h4 class="mt-3">Giỏ hàng trống</h4>
      <p class="text-muted">Chưa có sản phẩm nào trong giỏ hàng của bạn.</p>
      <router-link to="/" class="btn btn-primary mt-3 px-4 py-2 fw-bold"
        >Tiếp tục mua sắm</router-link
      >
    </div>

    <div class="row" v-else>
      <div class="col-lg-8">
        <div class="card border-0 shadow-sm mb-4">
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th scope="col" class="ps-4">Sản phẩm</th>
                    <th scope="col">Đơn giá</th>
                    <th scope="col">Số lượng</th>
                    <th scope="col">Thành tiền</th>
                    <th scope="col" class="pe-4"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in cartStore.items" :key="item.productId">
                    <td class="ps-4 py-3">
                      <div class="d-flex align-items-center">
                        <img
                          :src="item.image"
                          class="rounded me-3 border"
                          style="width: 60px; height: 60px; object-fit: cover"
                          alt="Product"
                        />
                        <h6 class="mb-0 fw-bold">{{ item.name }}</h6>
                      </div>
                    </td>
                    <td>{{ formatPrice(item.price) }}</td>
                    <td>
                      <div
                        class="input-group input-group-sm"
                        style="width: 110px"
                      >
                        <button
                          class="btn btn-outline-secondary"
                          @click="
                            updateQuantity(item.productId, item.quantity - 1)
                          "
                        >
                          -
                        </button>
                        <input
                          type="text"
                          class="form-control text-center fw-bold"
                          :value="item.quantity"
                          readonly
                        />
                        <button
                          class="btn btn-outline-secondary"
                          @click="
                            updateQuantity(item.productId, item.quantity + 1)
                          "
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td class="fw-bold text-danger">
                      {{ formatPrice(item.price * item.quantity) }}
                    </td>
                    <td class="pe-4 text-end">
                      <button
                        class="btn btn-sm btn-outline-danger"
                        @click="cartStore.removeFromCart(item.productId)"
                      >
                        <i class="bi bi-trash"></i> Xóa
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="card border-0 shadow-sm">
          <div class="card-body p-4">
            <h5 class="fw-bold border-bottom pb-3 mb-3">Tổng Đơn Hàng</h5>
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
            <div class="d-flex justify-content-between mb-4">
              <span class="fs-5 fw-bold">Tổng cộng:</span>
              <span class="fs-5 fw-bold text-danger">{{
                formatPrice(cartStore.cartTotal)
              }}</span>
            </div>
            <button
              class="btn btn-warning w-100 py-3 fw-bold fs-5 text-dark"
              @click="handleCheckout"
            >
              TIẾN HÀNH THANH TOÁN
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";

const cartStore = useCartStore();
const authStore = useAuthStore();
const router = useRouter();

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};

const updateQuantity = (id, newQty) => {
  if (newQty > 0) {
    cartStore.updateQuantity(id, newQty);
  }
};

const handleCheckout = () => {
  if (!authStore.isAuthenticated) {
    alert("Bạn cần đăng nhập để tiến hành đặt hàng nhé!");
    router.push("/login");
  } else {
    router.push("/checkout"); // Chuyển sang form điền thông tin
  }
};
</script>
