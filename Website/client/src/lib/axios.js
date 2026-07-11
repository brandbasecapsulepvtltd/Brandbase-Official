// src/utils/axios.js
import axios from 'axios';

const instance = axios.create({
  //baseURL: 'https://api.brandbasecapsule.com', // ✅ Point to your backend
  baseURL: 'https://api-brandbasecapsule-com-432601.hostingersite.com/',
  withCredentials: true,                // If using cookies or auth
});

export default instance;
