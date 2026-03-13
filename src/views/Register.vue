<template>
  <div class="container mt-4 mb-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card shadow border-0 rounded-lg">
          <div class="card-header bg-white text-center py-3">
            <h3 class="fw-bold mb-0">Tạo Tài Khoản Mới</h3>
          </div>
          <div class="card-body p-4">
            <div v-if="errorMessage" class="alert alert-danger">
              {{ errorMessage }}
            </div>
            <div v-if="successMessage" class="alert alert-success">
              {{ successMessage }}
            </div>

            <form @submit.prevent="handleRegister" v-if="!successMessage">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label">Họ và tên</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.fullName"
                    required
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Số điện thoại</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.phoneNumber"
                    required
                  />
                </div>
              </div>

              <div class="mb-3">
                <label class="form-label">Email</label>
                <input
                  type="email"
                  class="form-control"
                  v-model="formData.email"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Địa chỉ</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.address"
                  required
                />
              </div>

              <div class="mb-3">
                <label class="form-label">Ngày sinh</label>
                <input
                  type="date"
                  class="form-control"
                  v-model="formData.dateOfBirth"
                />
              </div>

              <div class="mb-4">
                <label class="form-label">Mật khẩu</label>
                <input
                  type="password"
                  class="form-control"
                  v-model="formData.password"
                  required
                  minlength="6"
                />
              </div>

              <button
                type="submit"
                class="btn btn-warning w-100 py-2 fw-bold"
                :disabled="loading"
              >
                <span
                  v-if="loading"
                  class="spinner-border spinner-border-sm me-2"
                ></span>
                ĐĂNG KÝ
              </button>
            </form>

            <div class="text-center mt-3" v-if="!successMessage">
              <p>
                Đã có tài khoản?
                <router-link to="/login" class="text-decoration-none"
                  >Đăng nhập</router-link
                >
              </p>
            </div>

            <div class="text-center mt-3" v-if="successMessage">
              <router-link to="/login" class="btn btn-primary"
                >Chuyển đến trang Đăng nhập</router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useAuthStore } from "../store/authStore";

const authStore = useAuthStore();

const formData = reactive({
  fullName: "",
  phoneNumber: "",
  email: "",
  address: "",
  dateOfBirth: "",
  password: "",
  roles: ["user"],
});

const errorMessage = ref("");
const successMessage = ref("");
const loading = ref(false);

const handleRegister = async () => {
  loading.value = true;
  errorMessage.value = "";
  successMessage.value = "";

  try {
    const response = await authStore.register(formData);
    successMessage.value = response.message || "Đăng ký thành công!";
  } catch (error) {
    errorMessage.value =
      error.response?.data?.message || "Có lỗi xảy ra trong quá trình đăng ký.";
  } finally {
    loading.value = false;
  }
};
</script>
