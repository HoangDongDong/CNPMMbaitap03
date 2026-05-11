import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api/users";

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Add token to request headers if it exists
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

// Register API
export const registerApi = async (name, email, password) => {
  try {
    const response = await api.post("/register", {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Login API
export const loginApi = async (email, password) => {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Get All Users API (Protected)
export const getUserApi = async () => {
  try {
    const response = await api.get("/v1/api/user");
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Forgot Password API
export const forgotPasswordApi = async (email) => {
  try {
    const response = await api.post("/forgot-password", {
      email,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};
