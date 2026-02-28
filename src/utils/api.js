import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.example.com/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      toast.error("Not Authorized. Please login again.");
    } else if (status === 403) {
      toast.error("You do not have permission to perform this action.");
    } else if (status === 500) {
      toast.error("Server error. Our engineers are on it!");
    } else if (!status) {
      toast.error("Network error. Check your internet connection.");
    }

    return Promise.reject(error);
  },
);

export default api;
