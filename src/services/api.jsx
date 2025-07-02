import axios from "axios";
const isLocalhost = window.location.hostname === "localhost";

const axiosInstance = axios.create({
  baseURL: isLocalhost
    ? "http://localhost:3000" 
    : "https://doubt-tracker-backend.onrender.com", 
});

axiosInstance.interceptors.request.use((config) => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user?.token) {
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});

export default axiosInstance;
