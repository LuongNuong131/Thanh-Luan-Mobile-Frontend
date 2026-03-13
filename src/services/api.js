import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // Port của Spring Boot
  headers: {
    'Content-Type': 'application/json',
  },
});

// Tự động đính kèm JWT Token vào header nếu đã đăng nhập
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;