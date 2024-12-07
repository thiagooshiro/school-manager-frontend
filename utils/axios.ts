// utils/axios.ts
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/', // API base URL
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // A partir do token armazenado
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export default axiosInstance;
