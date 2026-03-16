<template>
  <div class="container mt-5 mb-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card shadow-sm border-0 rounded-4">
          <div class="card-header bg-white py-3 border-bottom-0 text-center">
            <h3 class="fw-bold mb-0">
              <i class="bi bi-person-badge text-primary me-2"></i>Hồ Sơ Của Tôi
            </h3>
          </div>
          <div class="card-body p-4">
            <form @submit.prevent="saveProfile">
              <div class="mb-3">
                <label class="form-label text-muted small">Họ và tên</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.fullName"
                  required
                />
              </div>
              <div class="mb-3">
                <label class="form-label text-muted small"
                  >Email (Đăng nhập)</label
                >
                <input
                  type="email"
                  class="form-control bg-light"
                  v-model="formData.email"
                  disabled
                />
              </div>
              <div class="mb-3">
                <label class="form-label text-muted small">Số điện thoại</label>
                <input
                  type="text"
                  class="form-control"
                  v-model="formData.phoneNumber"
                  required
                />
              </div>
              <div class="mb-4">
                <label class="form-label text-muted small"
                  >Địa chỉ nhận hàng mặc định</label
                >
                <textarea
                  class="form-control"
                  rows="3"
                  v-model="formData.address"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                class="btn btn-primary w-100 py-2 fw-bold shadow-sm"
                :disabled="loading"
              >
                <span
                  v-if="loading"
                  class="spinner-border spinner-border-sm me-2"
                ></span>
                Lưu Thay Đổi
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAuthStore } from "../store/authStore";
import { useToastStore } from "../store/toastStore";
import api from "../services/api";

const authStore = useAuthStore();
const toastStore = useToastStore();
const loading = ref(false);
const formData = ref({ fullName: "", email: "", phoneNumber: "", address: "" });

onMounted(async () => {
  await authStore.fetchProfile();
  if (authStore.user) {
    formData.value = { ...authStore.user };
  }
});

const saveProfile = async () => {
  loading.value = true;
  try {
    await api.put("/users/profile", formData.value);
    await authStore.fetchProfile();
    toastStore.showToast("Cập nhật hồ sơ thành công!", "success");
  } catch (error) {
    toastStore.showToast("Lỗi khi lưu hồ sơ!", "error");
  } finally {
    loading.value = false;
  }
};
</script>
