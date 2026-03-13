<template>
  <footer class="bg-dark text-light py-4 mt-auto">
    <div class="container">
      <div class="row">
        <div class="col-md-4">
          <h5 class="text-warning fw-bold">Thành Luân Mobile</h5>
          <p>
            Hệ thống bán lẻ iPhone chính hãng uy tín hàng đầu. Cam kết chất
            lượng và dịch vụ tận tâm.
          </p>
        </div>
        <div class="col-md-4">
          <h5>Liên Kết</h5>
          <ul class="list-unstyled">
            <li>
              <router-link to="/" class="text-light text-decoration-none"
                >Trang Chủ</router-link
              >
            </li>
            <li>
              <router-link to="/about" class="text-light text-decoration-none"
                >Về Chúng Tôi</router-link
              >
            </li>
            <li>
              <router-link to="/contact" class="text-light text-decoration-none"
                >Liên Hệ</router-link
              >
            </li>
          </ul>
        </div>
        <div class="col-md-4">
          <h5>Liên Hệ</h5>
          <p>📍 FPT Polytechnic TP.HCM</p>
          <p>📞 Hotline: 1900 xxxx</p>
          <p>✉️ Email: contact@thanhluanmobile.com</p>
        </div>
      </div>
      <div class="text-center mt-3 border-top pt-3 border-secondary">
        <small>&copy; 2026 Thành Luân Mobile. All rights reserved.</small>
      </div>
    </div>
  </footer>
</template>
