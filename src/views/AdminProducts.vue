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
                    <th>Sản Phẩm</th>
                    <th>Hãng/RAM</th>
                    <th>Giá Bán</th>
                    <th>Kho</th>
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
                          <h6 class="mb-0 fw-bold">{{ product.name }}</h6>
                          <small class="text-muted"
                            >{{ product.storage }} - {{ product.color }}</small
                          >
                        </div>
                      </div>
                    </td>
                    <td>
                      <span class="badge bg-secondary">{{
                        product.category || "Khác"
                      }}</span>
                      <span class="badge bg-info text-dark">{{
                        product.ram || "N/A"
                      }}</span>
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
                        >{{ product.stockQuantity }}</span
                      >
                    </td>
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
        class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable"
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
          <div class="modal-body p-4 bg-light">
            <form
              @submit.prevent="saveProduct"
              class="bg-white p-4 rounded shadow-sm border"
            >
              <div class="row">
                <div class="col-md-4 mb-4 border-end">
                  <label class="form-label text-primary fw-bold"
                    ><i class="bi bi-image me-1"></i>Ảnh Đại Diện (Bắt
                    buộc)</label
                  >
                  <input
                    type="file"
                    class="form-control"
                    @change="handleMainImageChange"
                    accept="image/*"
                  />
                  <div
                    v-if="mainImagePreview || formData.image"
                    class="mt-3 text-center"
                  >
                    <img
                      :src="mainImagePreview || formData.image"
                      class="img-thumbnail shadow-sm"
                      style="max-height: 200px; object-fit: contain"
                    />
                  </div>
                </div>

                <div class="col-md-8 mb-4">
                  <label
                    class="form-label text-primary fw-bold d-flex justify-content-between"
                  >
                    <span
                      ><i class="bi bi-images me-1"></i>Ảnh Phụ (Gallery)</span
                    >
                    <span
                      class="badge"
                      :class="
                        totalGalleryCount >= 10 ? 'bg-danger' : 'bg-success'
                      "
                      >{{ totalGalleryCount }} / 10 ảnh</span
                    >
                  </label>
                  <input
                    type="file"
                    class="form-control"
                    @change="handleGalleryChange"
                    accept="image/*"
                    multiple
                    :disabled="totalGalleryCount >= 10"
                  />

                  <div
                    class="d-flex flex-wrap gap-2 mt-3 p-3 bg-light rounded border"
                    style="min-height: 100px"
                  >
                    <div
                      v-if="totalGalleryCount === 0"
                      class="text-muted small w-100 text-center mt-3"
                    >
                      Chưa có ảnh phụ nào
                    </div>
                    <div
                      v-for="(imgUrl, idx) in formData.gallery"
                      :key="'old' + idx"
                      class="position-relative"
                    >
                      <button
                        type="button"
                        class="btn btn-sm btn-danger position-absolute top-0 end-0 p-0 rounded-circle"
                        style="width: 20px; height: 20px; line-height: 1"
                        @click="removeOldGalleryImage(idx)"
                      >
                        &times;
                      </button>
                      <img
                        :src="imgUrl"
                        class="img-thumbnail"
                        style="width: 80px; height: 80px; object-fit: cover"
                      />
                    </div>
                    <div
                      v-for="(file, idx) in galleryFiles"
                      :key="'new' + idx"
                      class="position-relative"
                    >
                      <button
                        type="button"
                        class="btn btn-sm btn-warning position-absolute top-0 end-0 p-0 rounded-circle"
                        style="width: 20px; height: 20px; line-height: 1"
                        @click="removeNewGalleryImage(idx)"
                      >
                        &times;
                      </button>
                      <img
                        :src="getObjectUrl(file)"
                        class="img-thumbnail border-warning"
                        style="width: 80px; height: 80px; object-fit: cover"
                      />
                    </div>
                  </div>
                </div>

                <div class="col-12"><hr /></div>

                <div class="col-md-6 mb-3">
                  <label class="form-label fw-bold">Tên Máy</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.name"
                    required
                    placeholder="VD: iPhone 15 Pro Max, Samsung S24 Ultra"
                  />
                </div>
                <div class="col-md-3 mb-3">
                  <label class="form-label fw-bold">Hãng / Loại máy</label>
                  <select
                    class="form-select fw-bold text-primary"
                    v-model="formData.category"
                  >
                    <option value="iPhone">iPhone (Apple)</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Oppo">Oppo</option>
                    <option value="Xiaomi">Xiaomi</option>
                    <option value="Vivo">Vivo</option>
                    <option value="Khác">Khác</option>
                  </select>
                </div>
                <div class="col-md-3 mb-3">
                  <label class="form-label fw-bold">Kho (Số lượng)</label>
                  <input
                    type="number"
                    class="form-control"
                    v-model="formData.stockQuantity"
                    required
                  />
                </div>

                <div class="col-md-4 mb-3">
                  <label class="form-label text-muted">Giá gốc (VNĐ)</label>
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
                    class="form-control border-danger"
                    v-model="formData.discountPrice"
                  />
                </div>
                <div class="col-md-4 mb-3">
                  <label class="form-label">Tình trạng (Ngoại hình)</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.conditionType"
                    placeholder="VD: Đẹp 99%, Likenew"
                  />
                </div>

                <div class="col-md-3 mb-3">
                  <label class="form-label">Dung lượng ROM</label>
                  <select class="form-select" v-model="formData.storage">
                    <option>64GB</option>
                    <option>128GB</option>
                    <option>256GB</option>
                    <option>512GB</option>
                    <option>1TB</option>
                  </select>
                </div>
                <div class="col-md-3 mb-3">
                  <label class="form-label fw-bold text-success"
                    >Dung lượng RAM</label
                  >
                  <select class="form-select" v-model="formData.ram">
                    <option>4GB</option>
                    <option>6GB</option>
                    <option>8GB</option>
                    <option>12GB</option>
                    <option>16GB</option>
                  </select>
                </div>
                <div class="col-md-3 mb-3">
                  <label class="form-label">Màu sắc</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.color"
                    placeholder="VD: Titan, Trắng..."
                  />
                </div>
                <div class="col-md-3 mb-3">
                  <label class="form-label">Tình trạng Pin</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.batteryHealth"
                    placeholder="VD: Pin 100%, Pin zin"
                  />
                </div>

                <div class="col-md-8 mb-3">
                  <label class="form-label">Phụ kiện đi kèm</label>
                  <input
                    type="text"
                    class="form-control"
                    v-model="formData.accessories"
                    placeholder="VD: Cáp, sạc 20W, ốp lưng, đã dán cường lực"
                  />
                </div>
                <div class="col-md-4 mb-3">
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
                    rows="4"
                  ></textarea>
                </div>
              </div>
              <div class="text-end mt-4">
                <button
                  type="button"
                  class="btn btn-secondary px-4 me-2"
                  @click="closeModal"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  class="btn btn-primary px-5 fw-bold"
                  :disabled="loading"
                >
                  <span
                    v-if="loading"
                    class="spinner-border spinner-border-sm me-2"
                  ></span>
                  LUÔN VÀ NGAY
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
import { ref, computed, onMounted } from "vue";
import api from "../services/api";

const products = ref([]);
const showModal = ref(false);
const editingProduct = ref(null);
const loading = ref(false);

const mainImageFile = ref(null);
const mainImagePreview = ref(null);
const galleryFiles = ref([]);

const formData = ref({
  name: "",
  category: "iPhone",
  price: 0,
  discountPrice: 0,
  stockQuantity: 0,
  storage: "128GB",
  ram: "8GB",
  color: "",
  conditionType: "",
  description: "",
  image: "",
  gallery: [],
  batteryHealth: "",
  accessories: "",
  warrantyMonths: 6,
});

const formatPrice = (price) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    price,
  );

const totalGalleryCount = computed(
  () => formData.value.gallery.length + galleryFiles.value.length,
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
  mainImagePreview.value = null;
  galleryFiles.value = [];

  if (product) {
    editingProduct.value = product;
    formData.value = {
      ...product,
      gallery: product.gallery ? [...product.gallery] : [],
    };
  } else {
    editingProduct.value = null;
    formData.value = {
      name: "",
      category: "iPhone",
      price: 0,
      discountPrice: 0,
      stockQuantity: 1,
      storage: "128GB",
      ram: "8GB",
      color: "",
      conditionType: "Đẹp 99%",
      description: "",
      image: "",
      gallery: [],
      batteryHealth: "Tốt",
      accessories: "Sạc cáp",
      warrantyMonths: 6,
    };
  }
  showModal.value = true;
};

const closeModal = () => (showModal.value = false);

// Tạo URL hiển thị ảnh nháp
const getObjectUrl = (file) => URL.createObjectURL(file);

const handleMainImageChange = (e) => {
  if (e.target.files.length > 0) {
    mainImageFile.value = e.target.files[0];
    mainImagePreview.value = getObjectUrl(e.target.files[0]);
  }
};

const handleGalleryChange = (e) => {
  if (e.target.files.length > 0) {
    const newFiles = Array.from(e.target.files);
    const availableSlots = 10 - totalGalleryCount.value;
    if (newFiles.length > availableSlots) {
      alert(
        `Chỉ có thể thêm tối đa ${availableSlots} ảnh nữa (Tổng max 10 ảnh)!`,
      );
      galleryFiles.value.push(...newFiles.slice(0, availableSlots));
    } else {
      galleryFiles.value.push(...newFiles);
    }
  }
};

const removeOldGalleryImage = (idx) => formData.value.gallery.splice(idx, 1);
const removeNewGalleryImage = (idx) => galleryFiles.value.splice(idx, 1);

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
    if (mainImageFile.value) {
      formData.value.image = await uploadFile(mainImageFile.value);
    }

    if (galleryFiles.value.length > 0) {
      for (const file of galleryFiles.value) {
        const url = await uploadFile(file);
        formData.value.gallery.push(url);
      }
    }

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
    alert("Lưu sản phẩm thành công rực rỡ!");
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
