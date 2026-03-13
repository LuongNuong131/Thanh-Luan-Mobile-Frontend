<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6 col-lg-5">
        <div class="card shadow border-0 rounded-lg">
          <div class="card-header bg-white text-center py-4">
            <h3 class="fw-bold mb-0">Đăng Nhập</h3>
          </div>
          <div class="card-body p-4">
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>

            <form @submit.prevent="handleLogin">
              <div class="mb-3">
                <label class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="email"
                  required
                  placeholder="Nhập email của bạn"
                />
              </div>
              <div class="mb-4">
                <label class="form-label">Mật khẩu</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="password"
                  required
                  placeholder="Nhập mật khẩu"
                />
              </div>
              <button
                type="submit"
                class="btn btn-primary w-100 py-2 fw-bold"
                :disabled="loading"
              >
                <span
                  v-if="loading"
                  class="spinner-border spinner-border-sm me-2"
                ></span>
                ĐĂNG NHẬP
              </button>
            </form>

            <div class="text-center mt-3">
              <p>
                Chưa có tài khoản?
                <router-link to="/register" class="text-decoration-none"
                  >Đăng ký ngay</router-link
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "../store/authStore";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

const email = ref("");
const password = ref("");
const errorMessage = ref("");
const loading = ref(false);

const handleLogin = async () => {
  loading.value = true;
  errorMessage.value = "";
  try {
    await authStore.login(email.value, password.value);
    router.push("/"); // Đăng nhập thành công, đá về trang chủ
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message ||
      "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin!";
  } finally {
    loading.value = false;
  }
};
</script>
