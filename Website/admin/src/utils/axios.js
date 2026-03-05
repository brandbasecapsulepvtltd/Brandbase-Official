// src/utils/axios.js
import axios from 'axios';

// Your admin API key - get it from your backend
const ADMIN_API_KEY = '8c36f75937af6c0777eeda50d0a0ca4ab90e8ddc4b518c9dbe51a59f064392de'; // ← PUT YOUR KEY HERE

// Create axios instance
const adminAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': ADMIN_API_KEY, // Add API key to all requests
  },
  timeout: 90000, // Increased to 90s because multiple AI blog generations take time
});

// Add a request interceptor to add the auth token to headers
adminAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default adminAxios;