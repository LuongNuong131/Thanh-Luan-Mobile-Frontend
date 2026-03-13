<template>
  <section
    class="hero-banner text-center d-flex align-items-center justify-content-center"
  >
    <div class="container hero-content">
      <h1 class="display-4 fw-bold mb-3">Thành Luân Mobile</h1>
      <h2 class="h3 fw-normal mb-4">Chuyên iPhone Chính Hãng Giá Tốt</h2>
      <p class="mb-5 text-muted">
        Trải nghiệm công nghệ đỉnh cao với mức giá ưu đãi nhất thị trường.
      </p>
      <div class="d-flex gap-3 justify-content-center">
        <router-link to="/products" class="btn btn-apple btn-lg px-4"
          >Xem sản phẩm</router-link
        >
        <router-link
          to="/contact"
          class="btn btn-outline-dark rounded-pill btn-lg px-4"
          >Liên hệ ngay</router-link
        >
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-banner {
  height: 70vh;
  min-height: 500px;
  background-color: #fafafa;
  /* Giả lập một hình nền iPhone mờ nhạt phía sau */
  background-image: radial-gradient(circle at center, #ffffff 0%, #f5f5f7 100%);
  position: relative;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
  animation: fadeInUp 1s ease;
}

h1 {
  letter-spacing: -1.5px;
  color: var(--text-dark);
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
