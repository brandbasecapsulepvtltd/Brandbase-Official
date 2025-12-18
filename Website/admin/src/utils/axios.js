// src/utils/axios.js
import axios from 'axios';

// Your admin API key - get it from your backend
const ADMIN_API_KEY = '8c36f75937af6c0777eeda50d0a0ca4ab90e8ddc4b518c9dbe51a59f064392de'; // ← PUT YOUR KEY HERE

// Create axios instance
const adminAxios = axios.create({
  baseURL: 'https://brandbase.onrender.com', // Your backend URL
  headers: {
    'Content-Type': 'application/json',
    'X-API-Key': ADMIN_API_KEY, // Add API key to all requests
  },
  timeout: 10000,
});

export default adminAxios;