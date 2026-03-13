<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark sticky-top shadow-sm">
    <div class="container">
      <router-link class="navbar-brand fw-bold fs-4 text-warning" to="/">
        <i class="bi bi-apple"></i> Thành Luân Mobile
      </router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Trang Chủ</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">iPhone</a>
          </li>
        </ul>
        
        <div class="d-flex align-items-center">
          <router-link to="/cart" class="btn btn-outline-light position-relative me-3">
            Giỏ hàng
            <span v-if="cartStore.cartCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {{ cartStore.cartCount }}
            </span>
          </router-link>

          <template v-if="!authStore.isAuthenticated">
            <router-link to="/login" class="btn btn-primary me-2">Đăng Nhập</router-link>
            <router-link to="/register" class="btn btn-outline-warning">Đăng Ký</router-link>
          </template>

          <div v-else class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown">
              Xin chào, {{ authStore.user?.fullName || 'User' }}
            </button>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
              <li v-if="authStore.isAdmin"><router-link class="dropdown-item" to="/admin">Admin Dashboard</router-link></li>
              <li><router-link class="dropdown-item" to="/profile">Hồ sơ của tôi</router-link></li>
              <li><router-link class="dropdown-item" to="/orders">Đơn hàng</router-link></li>
              <li><hr class="dropdown-divider"></li>
              <li><a class="dropdown-item text-danger" href="#" @click.prevent="handleLogout">Đăng Xuất</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const cartStore = useCartStore();
const router = useRouter();

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>