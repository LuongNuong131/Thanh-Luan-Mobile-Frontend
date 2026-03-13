import { defineStore } from "pinia";
import api from "../services/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.roles?.includes("ROLE_ADMIN"),
  },
  actions: {
    async login(email, password) {
      const response = await api.post("/auth/signin", { email, password });
      if (response.data.token) {
        this.token = response.data.token;
        this.user = {
          id: response.data.id,
          email: response.data.email,
          fullName: response.data.fullName,
          roles: response.data.roles,
        };
        localStorage.setItem("token", this.token);
        localStorage.setItem("user", JSON.stringify(this.user));
      }
      return response.data;
    },
    async register(userData) {
      const response = await api.post("/auth/signup", userData);
      return response.data;
    },
    logout() {
      this.user = null;
      this.token = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});
