<template>
  <div class="container-fluid mt-4 mb-5 px-4">
    <div class="row">
      <div class="col-md-3 col-lg-2 mb-4">
        <div class="list-group shadow-sm border-0">
          <a
            href="#"
            class="list-group-item list-group-item-action active fw-bold py-3"
            aria-current="true"
          >
            <i class="bi bi-speedometer2 me-2"></i> Dashboard
          </a>
          <a href="#" class="list-group-item list-group-item-action py-3"
            ><i class="bi bi-box me-2"></i> Quản lý Sản phẩm</a
          >
          <a href="#" class="list-group-item list-group-item-action py-3"
            ><i class="bi bi-receipt me-2"></i> Quản lý Đơn hàng</a
          >
          <a href="#" class="list-group-item list-group-item-action py-3"
            ><i class="bi bi-people me-2"></i> Quản lý Người dùng</a
          >
        </div>
      </div>

      <div class="col-md-9 col-lg-10">
        <h2 class="fw-bold mb-4">Tổng Quan Cửa Hàng</h2>
        <div class="row">
          <div class="col-md-4 mb-3">
            <div class="card text-white bg-primary shadow-sm h-100 border-0">
              <div class="card-body py-4">
                <h6 class="card-title text-uppercase opacity-75">
                  Tổng Doanh Thu
                </h6>
                <h2 class="card-text fw-bold">0 ₫</h2>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="card text-white bg-success shadow-sm h-100 border-0">
              <div class="card-body py-4">
                <h6 class="card-title text-uppercase opacity-75">
                  Đơn Hàng Mới
                </h6>
                <h2 class="card-text fw-bold">0</h2>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-3">
            <div class="card text-white bg-warning shadow-sm h-100 border-0">
              <div class="card-body py-4">
                <h6 class="card-title text-uppercase opacity-75">
                  Tổng Khách Hàng
                </h6>
                <h2 class="card-text fw-bold">0</h2>
              </div>
            </div>
          </div>
        </div>

        <div class="card mt-4 shadow-sm border-0">
          <div class="card-header bg-white py-3">
            <h5 class="mb-0 fw-bold">Đơn hàng cần xử lý gần đây</h5>
          </div>
          <div class="card-body text-center py-5">
            <p class="text-muted">Hệ thống đang chờ API lấy dữ liệu...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup></script>
