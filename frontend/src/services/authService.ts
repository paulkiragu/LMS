import axios from 'axios';

// Use the same API base URL as in your AuthContext
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:1000/api";

export const login = async (credentials) => {
  try {
    console.log("[DEBUG] authService login called with:", { email: credentials.email });
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("[DEBUG] authService login response:", response.data);
    return response.data;
  } catch (error) {
    console.error("[DEBUG] authService login error:", error.response?.data || error.message);
    throw error;
  }
};

export const register = async (userData) => {
  try {
    console.log("[DEBUG] authService register called with:", userData);
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log("[DEBUG] authService register response:", response.data);
    return response.data;
  } catch (error) {
    console.error("[DEBUG] authService register error:", error.response?.data || error.message);
    throw error;
  }
};