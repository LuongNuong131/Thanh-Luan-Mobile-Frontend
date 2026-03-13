<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
    <div class="container">
      <router-link class="navbar-brand fw-bold fs-4 text-warning" to="/">
        <i class="bi bi-apple"></i> Thành Luân Mobile
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Trang Chủ</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products">iPhone</router-link>
          </li>
        </ul>

        <div class="d-flex align-items-center">
          <router-link
            to="/compare"
            class="btn btn-outline-info position-relative me-3 border-0"
          >
            <i class="bi bi-arrow-left-right fs-5"></i>
            <span
              v-if="compareStore.items.length > 0"
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info text-dark"
            >
              {{ compareStore.items.length }}
            </span>
          </router-link>

          <router-link
            to="/wishlist"
            class="btn btn-outline-danger position-relative me-3 border-0"
            v-if="authStore.isAuthenticated"
          >
            <i class="bi bi-heart-fill fs-5"></i>
            <span
              v-if="wishlistStore.wishlistCount > 0"
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
            >
              {{ wishlistStore.wishlistCount }}
            </span>
          </router-link>

          <router-link
            to="/cart"
            class="btn btn-outline-light position-relative me-3"
          >
            <i class="bi bi-cart3 fs-5"></i>
            <span
              v-if="cartStore.cartCount > 0"
              class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning text-dark"
            >
              {{ cartStore.cartCount }}
            </span>
          </router-link>

          <template v-if="!authStore.isAuthenticated">
            <router-link to="/login" class="btn btn-primary me-2 fw-bold"
              >Đăng Nhập</router-link
            >
            <router-link to="/register" class="btn btn-outline-warning fw-bold"
              >Đăng Ký</router-link
            >
          </template>

          <div v-else class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="userDropdown"
              data-bs-toggle="dropdown"
            >
              <i class="bi bi-person-circle me-1"></i> Xin chào,
              {{ authStore.user?.fullName || "User" }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end shadow">
              <li v-if="authStore.isAdmin">
                <router-link
                  class="dropdown-item fw-bold text-primary"
                  to="/admin"
                  ><i class="bi bi-speedometer2 me-2"></i>Admin
                  Dashboard</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/profile"
                  ><i class="bi bi-person me-2"></i>Hồ sơ</router-link
                >
              </li>
              <li>
                <router-link class="dropdown-item" to="/orders"
                  ><i class="bi bi-box-seam me-2"></i>Đơn hàng</router-link
                >
              </li>
              <li><hr class="dropdown-divider" /></li>
              <li>
                <a
                  class="dropdown-item text-danger"
                  href="#"
                  @click.prevent="handleLogout"
                  ><i class="bi bi-box-arrow-right me-2"></i>Đăng Xuất</a
                >
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { onMounted, watch } from "vue";
import { useAuthStore } from "../store/authStore";
import { useCartStore } from "../store/cartStore";
import { useWishlistStore } from "../store/wishlistStore";
import { useCompareStore } from "../store/compareStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const cartStore = useCartStore();
const wishlistStore = useWishlistStore();
const compareStore = useCompareStore();
const router = useRouter();

onMounted(() => {
  if (authStore.isAuthenticated) wishlistStore.fetchWishlist();
});

watch(
  () => authStore.isAuthenticated,
  (newVal) => {
    if (newVal) wishlistStore.fetchWishlist();
    else wishlistStore.items = [];
  },
);

const handleLogout = () => {
  authStore.logout();
  wishlistStore.items = [];
  router.push("/login");
};
</script>
