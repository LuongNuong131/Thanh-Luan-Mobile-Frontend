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
            class="list-group-item list-group-item-action active fw-bold py-3"
            ><i class="bi bi-box me-2"></i> Kho Sản phẩm</router-link
          >
          <router-link
            to="/admin/orders"
            class="list-group-item list-group-item-action py-3"
            ><i class="bi bi-receipt me-2"></i> Đơn hàng</router-link
          >
        </div>
      </div>

      <div class="col-md-9 col-lg-10">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h2 class="fw-bold mb-0">Quản Lý Sản Phẩm</h2>
          <button class="btn btn-primary fw-bold" @click="openModal(null)">
            <i class="bi bi-plus-lg me-1"></i> Thêm Sản Phẩm Mới
          </button>
        </div>

        <div class="card shadow-sm border-0">
          <div class="card-body p-0">
            <div class="table-responsive">
              <table class="table table-hover align-middle mb-0">
                <thead class="table-light">
                  <tr>
                    <th class="ps-4">ID</th>
                    <th>Tên Sản Phẩm</th>
                    <th>Giá Bán</th>
                    <th>Kho</th>
                    <th>Tình trạng</th>
                    <th class="pe-4 text-end">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in products" :key="product.productId">
                    <td class="ps-4 fw-bold">#{{ product.productId }}</td>
                    <td>
                      <div class="d-flex align-items-center">
                        <img
                          :src="
                            product.image || 'https://via.placeholder.com/50'
                          "
                          class="rounded me-3 border"
                          style="width: 40px; height: 40px; object-fit: cover"
                        />
                        <div>
                          <h6 class="mb-0">{{ product.name }}</h6>
                          <small class="text-muted"
                            >{{ product.storage }} - {{ product.color }}</small
                          >
                        </div>
                      </div>
                    </td>
                    <td class="text-danger fw-bold">
                      {{ formatPrice(product.discountPrice || product.price) }}
                    </td>
                    <td>
                      <span
                        class="badge"
                        :class="
                          product.stockQuantity > 0 ? 'bg-success' : 'bg-danger'
                        "
                      >
                        {{ product.stockQuantity }}
                      </span>
                    </td>
                    <td>{{ product.conditionType || "Mới 100%" }}</td>
                    <td class="pe-4 text-end">
                      <button
                        class="btn btn-sm btn-outline-primary me-2"
                        @click="openModal(product)"
                      >
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button
                        class="btn btn-sm btn-outline-danger"
                        @click="deleteProduct(product.productId)"
                      >
                        <i class="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showModal" class="modal-backdrop fade show"></div>
    <div v-if="showModal" class="modal d-block" tabindex="-1">
      <div
        class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"
      >
        <div class="modal-content border-0 shadow">
          <div class="modal-header bg-light">
            <h5 class="modal-title fw-bold">
              {{ editingProduct ? "Sửa Sản Phẩm" : "Thêm Sản Phẩm Mới" }}
            </h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body p-4">
            <form @submit.prevent="saveProduct">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label class="form-label text-primary fw-bold"
                    ><i class="bi bi-image me-1"></i>Chọn Ảnh Chính</label
                  >
                  <input
                    type="file"
                    class="form-control"
                    @change="handleMainImageChange"
                    accept="image/*"
                  />
                  <div v-if="formData.image" class="mt-2">
                    <img
                      :src="formData.image"
                      class="img-thumbnail"
                      style="height: 100px"
                    />
                  </div>
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label text-primary fw-bold"
                    ><i class="bi bi-images me-1"></i>Chọn Ảnh Phụ (Nhiều
                    ảnh)</label
                  >
                  <input
                    type="file"
                    class="form-control"
                    @change="handleGalleryChange"
                    accept="image/*"
                    multiple
                  />
                  <div class="d-flex gap-2 mt-2 overflow-auto">
                    <img
                      v-for="(img, idx) in formData.gallery"
                      :key="idx"
                      :src="img"
                      class="img-thumbnail"
                      style="height: 60px"
                    />
                  </div>
                </div>

                <div class="col-md-12 mb-3 mt-2 border-top pt-3">
                  <label class="form-label fw-bold">Tên iPhone</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.name"
                    required
                  />
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">Giá gốc (VNĐ)</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="formData.price"
                    required
                  />
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label text-danger fw-bold"
                    >Giá Khuyến Mãi (VNĐ)</label
                  >
                  <input
                    type="number"
                    class="form-control"
                    v-model="formData.discountPrice"
                  />
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">Số lượng kho</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="formData.stockQuantity"
                    required
                  />
                </div>

                <div class="col-md-3 mb-3">
                  <label class="form-label">Dung lượng</label>
                  <select class="form-select" v-model="formData.storage">
                    <option>64GB</option>
                    <option>128GB</option>
                    <option>256GB</option>
                    <option>512GB</option>
                    <option>1TB</option>
                  </select>
                </div>
                <div class="col-md-3 mb-3">
                  <label class="form-label">Màu sắc</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.color"
                    placeholder="VD: Titan"
                  />
                </div>
                <div class="col-md-3 mb-3">
                  <label class="form-label">Tình trạng pin</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.batteryHealth"
                    placeholder="VD: Pin 99%"
                  />
                </div>
                <div class="col-md-3 mb-3">
                  <label class="form-label">Ngoại hình</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.conditionType"
                    placeholder="VD: Đẹp 99%"
                  />
                </div>

                <div class="col-md-6 mb-3">
                  <label class="form-label">Phụ kiện đi kèm</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.accessories"
                    placeholder="VD: Cáp, sạc, ốp lưng"
                  />
                </div>
                <div class="col-md-6 mb-3">
                  <label class="form-label">Bảo hành (Tháng)</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="formData.warrantyMonths"
                  />
                </div>

                <div class="col-12 mb-3">
                  <label class="form-label">Mô tả chi tiết</label>
                  <textarea
                    class="form-control"
                    v-model="formData.description"
                    rows="3"
                  ></textarea>
                </div>
              </div>
              <div class="text-end mt-3 border-top pt-3">
                <button
                  type="button"
                  class="btn btn-secondary me-2"
                  @click="closeModal"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  class="btn btn-primary fw-bold"
                  :disabled="loading"
                >
                  <span
                    v-if="loading"
                    class="spinner-border spinner-border-sm me-2"
                  ></span>
                  Lưu Sản Phẩm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "../services/api";

const products = ref([]);
const showModal = ref(false);
const editingProduct = ref(null);
const loading = ref(false);

const mainImageFile = ref(null);
const galleryFiles = ref([]);

const formData = ref({
  name: "",
  price: 0,
  discountPrice: 0,
  stockQuantity: 0,
  storage: "128GB",
  color: "",
  conditionType: "",
  description: "",
  image: "",
  gallery: [],
  batteryHealth: "",
  accessories: "",
  warrantyMonths: 12,
});

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    price,
  );

const fetchProducts = async () => {
  try {
    const res = await api.get("/products");
    products.value = res.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => fetchProducts());

const openModal = (product) => {
  mainImageFile.value = null;
  galleryFiles.value = [];
  if (product) {
    editingProduct.value = product;
    formData.value = { ...product };
  } else {
    editingProduct.value = null;
    formData.value = {
      name: "",
      price: 0,
      discountPrice: 0,
      stockQuantity: 0,
      storage: "128GB",
      color: "",
      conditionType: "",
      description: "",
      image: "",
      gallery: [],
      batteryHealth: "",
      accessories: "",
      warrantyMonths: 12,
    };
  }
  showModal.value = true;
};

const closeModal = () => (showModal.value = false);

const handleMainImageChange = (e) => {
  if (e.target.files.length > 0) mainImageFile.value = e.target.files[0];
};

const handleGalleryChange = (e) => {
  if (e.target.files.length > 0)
    galleryFiles.value = Array.from(e.target.files);
};

// Hàm đẩy file lên Server
const uploadFile = async (file) => {
  const uploadData = new FormData();
  uploadData.append("file", file);
  const res = await api.post("/files/upload", uploadData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.url;
};

const saveProduct = async () => {
  loading.value = true;
  try {
    // 1. Upload ảnh chính nếu có file mới
    if (mainImageFile.value) {
      formData.value.image = await uploadFile(mainImageFile.value);
    }

    // 2. Upload danh sách ảnh phụ nếu có
    if (galleryFiles.value.length > 0) {
      const urls = [];
      for (const file of galleryFiles.value) {
        const url = await uploadFile(file);
        urls.push(url);
      }
      formData.value.gallery = urls; // Cập nhật lại list ảnh mới
    }

    // 3. Lưu thông tin Product
    const payload = { ...formData.value };
    if (editingProduct.value) {
      await api.put(
        `/admin/products/${editingProduct.value.productId}`,
        payload,
      );
    } else {
      await api.post("/admin/products", payload);
    }
    await fetchProducts();
    closeModal();
    alert("Lưu sản phẩm thành công!");
  } catch (error) {
    alert("Lỗi khi lưu sản phẩm! " + (error.response?.data || error.message));
  } finally {
    loading.value = false;
  }
};

const deleteProduct = async (id) => {
  if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) {
    try {
      await api.delete(`/admin/products/${id}`);
      await fetchProducts();
    } catch (error) {
      alert("Lỗi khi xóa!");
    }
  }
};
</script>
