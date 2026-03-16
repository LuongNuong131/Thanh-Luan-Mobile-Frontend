<template>
  <div class="container-fluid mt-4 mb-5 px-4">
    <div class="row">
      <div class="col-md-3 col-lg-2 mb-4 d-none d-md-block">
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
            class="list-group-item list-group-item-action py-3"
            ><i class="bi bi-receipt me-2"></i> Đơn hàng</router-link
          >
          <router-link
            to="/admin/users"
            class="list-group-item list-group-item-action active fw-bold py-3"
            ><i class="bi bi-people me-2"></i> Khách hàng</router-link
          >
        </div>
      </div>

      <div class="col-md-9 col-lg-10 col-12">
        <h2 class="fw-bold mb-4">Danh Sách Khách Hàng</h2>
        <div class="card shadow-sm border-0">
          <div class="card-body p-0 table-responsive">
            <table class="table table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th class="ps-4">Tên Khách Hàng</th>
                  <th>Email</th>
                  <th>Số điện thoại</th>
                  <th>Địa chỉ</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in users" :key="user.id">
                  <td class="ps-4 fw-bold text-primary">{{ user.fullName }}</td>
                  <td>{{ user.email }}</td>
                  <td>{{ user.phoneNumber || "Trống" }}</td>
                  <td class="text-truncate" style="max-width: 250px">
                    {{ user.address || "Trống" }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";

const users = ref([]);
onMounted(async () => {
  try {
    const res = await api.get("/admin/users");
    users.value = res.data;
  } catch (error) {
    console.error(error);
  }
});
</script>
