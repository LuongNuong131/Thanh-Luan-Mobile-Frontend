<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <Header />
    <main class="flex-grow-1 bg-light pb-5 pt-4">
      <router-view></router-view>
    </main>
    <Footer />

    <ToastNotification />
  </div>
</template>

<script setup>
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import ToastNotification from "./components/ToastNotification.vue";
</script>

<style>
body {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
</style>
