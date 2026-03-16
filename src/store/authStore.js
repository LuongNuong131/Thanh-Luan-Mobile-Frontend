import { defineStore } from "pinia";
import api from "../services/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    roles: JSON.parse(localStorage.getItem("roles")) || [],
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.roles.includes("ROLE_ADMIN"),
  },
  actions: {
    async login(email, password) {
      const res = await api.post("/auth/signin", { email, password });
      this.token = res.data.token;
      this.user = {
        id: res.data.id,
        email: res.data.email,
        fullName: res.data.fullName,
        phoneNumber: res.data.phoneNumber,
        address: res.data.address,
      };
      this.roles = res.data.roles;
      localStorage.setItem("token", this.token);
      localStorage.setItem("user", JSON.stringify(this.user));
      localStorage.setItem("roles", JSON.stringify(this.roles));
    },
    async register(data) {
      return (await api.post("/auth/signup", data)).data;
    },
    async fetchProfile() {
      if (this.token) {
        const res = await api.get("/users/profile");
        this.user = res.data;
        localStorage.setItem("user", JSON.stringify(this.user));
      }
    },
    logout() {
      this.user = null;
      this.token = null;
      this.roles = [];
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("roles");
    },
  },
});
