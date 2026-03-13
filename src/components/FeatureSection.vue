<template>
  <section class="features py-5 bg-white">
    <div class="container">
      <div class="row text-center g-4">
        <div class="col-md-4">
          <div class="feature-card p-4">
            <i class="fa-solid fa-mobile-screen-button feature-icon mb-3"></i>
            <h4 class="h5 fw-bold">iPhone chính hãng</h4>
            <p class="text-muted small">
              Cam kết 100% sản phẩm nguyên zin, chính hãng Apple. Nguồn gốc rõ
              ràng.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="feature-card p-4">
            <i class="fa-solid fa-tags feature-icon mb-3"></i>
            <h4 class="h5 fw-bold">Giá tốt thị trường</h4>
            <p class="text-muted small">
              Cập nhật giá liên tục, đảm bảo mức giá cạnh tranh nhất cho khách
              hàng.
            </p>
          </div>
        </div>
        <div class="col-md-4">
          <div class="feature-card p-4">
            <i class="fa-solid fa-shield-halved feature-icon mb-3"></i>
            <h4 class="h5 fw-bold">Bảo hành uy tín</h4>
            <p class="text-muted small">
              Bảo hành dài hạn, hỗ trợ 1 đổi 1 nhanh chóng. Đội ngũ kỹ thuật
              chuyên nghiệp.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feature-icon {
  font-size: 2.5rem;
  color: var(--text-dark);
}

.feature-card {
  border-radius: 24px;
  transition: transform 0.3s ease;
}

.feature-card:hover {
  transform: translateY(-5px);
}
</style>
