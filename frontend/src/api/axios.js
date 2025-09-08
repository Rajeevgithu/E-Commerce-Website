import axios from 'axios';

const resolvedBaseUrl = `${import.meta.env.VITE_API_URL || 'https://e-commerce-website-1-lmr9.onrender.com'}/api`;

const api = axios.create({
  baseURL: resolvedBaseUrl,
});

// Add interceptor to attach token
api.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    const token = user?.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
