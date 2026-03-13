<template>
  <div
    class="toast-container position-fixed bottom-0 end-0 p-3"
    style="z-index: 9999"
  >
    <transition-group name="toast-list">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="toast show align-items-center text-white border-0 mb-3 shadow-lg"
        :class="getBgClass(toast.type)"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body fw-bold fs-6">
            <i class="bi me-2" :class="getIconClass(toast.type)"></i>
            {{ toast.message }}
          </div>
          <button
            type="button"
            class="btn-close btn-close-white me-2 m-auto"
            @click="toastStore.removeToast(toast.id)"
          ></button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script setup>
import { useToastStore } from "../store/toastStore";

const toastStore = useToastStore();

const getBgClass = (type) => {
  const map = {
    success: "bg-success",
    error: "bg-danger",
    warning: "bg-warning text-dark",
    info: "bg-info",
  };
  return map[type] || "bg-primary";
};

const getIconClass = (type) => {
  const map = {
    success: "bi-check-circle-fill",
    error: "bi-x-octagon-fill",
    warning: "bi-exclamation-triangle-fill",
    info: "bi-info-circle-fill",
  };
  return map[type] || "bi-bell-fill";
};
</script>

<style scoped>
.toast-list-enter-active,
.toast-list-leave-active {
  transition: all 0.3s ease;
}
.toast-list-enter-from {
  opacity: 0;
  transform: translateX(50px);
}
.toast-list-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
