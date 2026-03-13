<template>
  <div class="container mt-5 mb-5">
    <div v-if="productStore.loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
    </div>

    <div
      v-else-if="productStore.currentProduct"
      class="bg-white p-4 shadow-sm rounded"
    >
      <div class="row mb-5">
        <div
          class="col-md-6 mb-4 text-center bg-light rounded p-4 position-relative"
        >
          <span
            v-if="productStore.currentProduct.discountPrice"
            class="badge bg-danger position-absolute top-0 start-0 m-3 fs-6"
            >Đang Sale</span
          >
          <img
            :src="
              productStore.currentProduct.image ||
              'https://via.placeholder.com/500x500?text=iPhone'
            "
            class="img-fluid"
            alt="Product Image"
          />
        </div>

        <div class="col-md-6 px-lg-5">
          <h2 class="fw-bold mb-3">{{ productStore.currentProduct.name }}</h2>
          <div class="d-flex align-items-center mb-3">
            <span
              class="badge bg-success me-2 fs-6"
              v-if="productStore.currentProduct.stockQuantity > 5"
              >Còn hàng ({{ productStore.currentProduct.stockQuantity }})</span
            >
            <span
              class="badge bg-danger me-2 fs-6 shadow-sm blink-soft"
              v-else-if="productStore.currentProduct.stockQuantity > 0"
              >Sắp hết hàng! Chỉ còn
              {{ productStore.currentProduct.stockQuantity }} chiếc</span
            >
            <span class="badge bg-secondary me-2 fs-6" v-else
              >Tạm hết hàng</span
            >

            <span class="text-muted border-start ps-2"
              >Thương hiệu:
              <span class="fw-bold text-dark">{{
                productStore.currentProduct.brand
              }}</span></span
            >
          </div>

          <h2 class="text-danger fw-bold mb-4">
            {{
              formatPrice(
                productStore.currentProduct.discountPrice ||
                  productStore.currentProduct.price,
              )
            }}
            <span
              v-if="productStore.currentProduct.discountPrice"
              class="text-muted text-decoration-line-through fs-5 ms-2"
              >{{ formatPrice(productStore.currentProduct.price) }}</span
            >
          </h2>

          <p class="mb-4 text-secondary lh-lg">
            {{
              productStore.currentProduct.description ||
              "Sản phẩm chính hãng phân phối bởi Thành Luân Mobile. Cam kết chất lượng 100%."
            }}
          </p>

          <div class="row mb-4 bg-light p-3 rounded border">
            <div class="col-6">
              <p class="mb-2">
                <strong>Dung lượng:</strong>
                {{ productStore.currentProduct.storage || "Đang cập nhật" }}
              </p>
              <p class="mb-0">
                <strong>Màu sắc:</strong>
                {{ productStore.currentProduct.color || "Đang cập nhật" }}
              </p>
            </div>
            <div class="col-6">
              <p class="mb-2">
                <strong>Tình trạng:</strong>
                {{
                  productStore.currentProduct.conditionType ||
                  "Mới 100% Nguyên Seal"
                }}
              </p>
              <p class="mb-0">
                <strong>Bảo hành:</strong>
                {{ productStore.currentProduct.warrantyMonths || 12 }} tháng
                Apple VN
              </p>
            </div>
          </div>

          <div class="d-flex gap-3 align-items-center mt-4">
            <div class="input-group" style="width: 130px">
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="if (quantity > 1) quantity--;"
              >
                -
              </button>
              <input
                type="text"
                class="form-control text-center fw-bold"
                v-model.number="quantity"
                readonly
              />
              <button
                class="btn btn-outline-secondary"
                type="button"
                @click="
                  if (quantity < productStore.currentProduct.stockQuantity)
                    quantity++;
                "
                :disabled="
                  quantity >= productStore.currentProduct.stockQuantity
                "
              >
                +
              </button>
            </div>
            <button
              class="btn btn-primary flex-grow-1 py-2 fw-bold fs-5"
              @click="handleAddToCart"
              :disabled="productStore.currentProduct.stockQuantity === 0"
            >
              <i class="bi bi-cart-plus me-2"></i> THÊM VÀO GIỎ
            </button>
            <button
              class="btn btn-outline-danger py-2 px-3"
              @click="handleAddToWishlist"
              title="Thêm vào yêu thích"
            >
              <i class="bi bi-heart fs-5"></i>
            </button>
          </div>
        </div>
      </div>

      <div class="border-top pt-5 mt-5">
        <h4 class="fw-bold mb-4">
          <i class="bi bi-star-half text-warning me-2"></i>Đánh Giá Sản Phẩm
        </h4>

        <div class="row">
          <div class="col-md-7 col-lg-8 mb-4">
            <div
              v-if="reviews.length === 0"
              class="text-muted fst-italic p-4 bg-light rounded text-center"
            >
              <i
                class="bi bi-chat-square-dots fs-2 text-secondary mb-2 d-block"
              ></i>
              Chưa có đánh giá nào. Hãy là người đầu tiên trải nghiệm và nhận
              xét về sản phẩm này!
            </div>

            <div
              class="card border-0 bg-light mb-3 shadow-sm"
              v-for="review in reviews"
              :key="review.reviewId"
            >
              <div class="card-body">
                <div
                  class="d-flex justify-content-between align-items-center mb-2"
                >
                  <span class="fw-bold text-dark"
                    ><i class="bi bi-person-circle me-2 text-primary"></i
                    >{{ review.reviewerName }}</span
                  >
                  <small class="text-muted">{{
                    new Date(review.createdAt).toLocaleDateString("vi-VN")
                  }}</small>
                </div>
                <div class="text-warning mb-2 fs-6">
                  <i
                    class="bi bi-star-fill"
                    v-for="n in review.rating"
                    :key="'fill' + n"
                  ></i>
                  <i
                    class="bi bi-star text-muted"
                    v-for="n in 5 - review.rating"
                    :key="'empty' + n"
                  ></i>
                </div>
                <p class="mb-0 text-secondary">{{ review.comment }}</p>
              </div>
            </div>
          </div>

          <div class="col-md-5 col-lg-4">
            <div class="card shadow-sm border border-warning">
              <div class="card-body p-4">
                <h5 class="fw-bold mb-3 border-bottom pb-2">
                  Gửi nhận xét của bạn
                </h5>
                <form
                  @submit.prevent="submitReview"
                  v-if="authStore.isAuthenticated"
                >
                  <div class="mb-3 text-center">
                    <label class="form-label d-block text-muted small"
                      >Chạm để đánh giá sao</label
                    >
                    <div class="fs-2 text-warning" style="cursor: pointer">
                      <i
                        class="bi me-1"
                        :class="
                          n <= newReview.rating ? 'bi-star-fill' : 'bi-star'
                        "
                        v-for="n in 5"
                        :key="n"
                        @click="newReview.rating = n"
                      ></i>
                    </div>
                  </div>
                  <div class="mb-3">
                    <textarea
                      class="form-control bg-light"
                      rows="4"
                      v-model="newReview.comment"
                      placeholder="Mời bạn chia sẻ cảm nhận về sản phẩm..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    class="btn btn-warning w-100 fw-bold"
                    :disabled="submittingReview"
                  >
                    <span
                      v-if="submittingReview"
                      class="spinner-border spinner-border-sm me-2"
                    ></span>
                    GỬI ĐÁNH GIÁ
                  </button>
                </form>
                <div v-else class="text-center py-4 bg-light rounded">
                  <i
                    class="bi bi-lock-fill text-secondary fs-3 d-block mb-2"
                  ></i>
                  <p class="mb-3">
                    Vui lòng đăng nhập để có thể viết đánh giá.
                  </p>
                  <router-link
                    to="/login"
                    class="btn btn-primary btn-sm px-4 fw-bold"
                    >Đăng nhập</router-link
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="alert alert-warning text-center py-5 shadow-sm">
      <h4 class="fw-bold">
        <i class="bi bi-exclamation-triangle me-2"></i>Không tìm thấy sản phẩm!
      </h4>
      <p>Sản phẩm này có thể đã bị xóa hoặc không tồn tại.</p>
      <router-link to="/products" class="btn btn-dark mt-3 px-4 py-2 fw-bold"
        >Quay lại cửa hàng</router-link
      >
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useProductStore } from "../store/productStore";
import { useCartStore } from "../store/cartStore";
import { useAuthStore } from "../store/authStore";
import { useWishlistStore } from "../store/wishlistStore";
import api from "../services/api";

const route = useRoute();
const productStore = useProductStore();
const cartStore = useCartStore();
const authStore = useAuthStore();
const wishlistStore = useWishlistStore();

const quantity = ref(1);
const reviews = ref([]);
const newReview = ref({ rating: 5, comment: "" });
const submittingReview = ref(false);

const fetchReviews = async () => {
  try {
    const res = await api.get(`/reviews/product/${route.params.id}`);
    reviews.value = res.data;
  } catch (error) {
    console.error("Lỗi tải đánh giá", error);
  }
};

onMounted(async () => {
  await productStore.fetchProductById(route.params.id);
  fetchReviews();
});

const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price || 0);
};

const handleAddToCart = () => {
  if (productStore.currentProduct) {
    cartStore.addToCart(productStore.currentProduct, quantity.value);
    alert(`Thành công! Đã thêm ${quantity.value} sản phẩm vào giỏ hàng.`);
  }
};

const handleAddToWishlist = async () => {
  if (!authStore.isAuthenticated) {
    alert("Xin lỗi, bạn cần đăng nhập để sử dụng tính năng Yêu thích!");
    return;
  }
  try {
    await wishlistStore.addToWishlist(productStore.currentProduct.productId);
    alert("Đã lưu thành công vào Danh sách Yêu thích của bạn!");
  } catch (error) {
    alert(error.response?.data?.message || "Có lỗi xảy ra khi thả tim!");
  }
};

const submitReview = async () => {
  submittingReview.value = true;
  try {
    await api.post(`/reviews/product/${route.params.id}`, newReview.value);
    alert("Cảm ơn bạn! Đánh giá đã được ghi nhận.");
    newReview.value.comment = "";
    newReview.value.rating = 5;
    fetchReviews(); // Tải lại danh sách comment mới nhất
  } catch (error) {
    alert("Đã xảy ra lỗi khi gửi đánh giá. Vui lòng thử lại sau.");
  } finally {
    submittingReview.value = false;
  }
};
</script>

<style scoped>
.blink-soft {
  animation: blinker 1.5s linear infinite;
}
@keyframes blinker {
  50% {
    opacity: 0.7;
  }
}
</style>
