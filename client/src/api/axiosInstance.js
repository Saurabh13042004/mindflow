import axios from "axios";
import Cookies from 'js-cookie'


const axiosInstance = axios.create({
  baseURL: 'https://mindflow-cnz0.onrender.com/api/',
});

// Attach token to requests
axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
