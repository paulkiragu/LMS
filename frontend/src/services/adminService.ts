import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:1000/api";

export const getAllUsers = async () => {
  const res = await axios.get(`${API}/admin/users`);
  return res.data;
};

export const updateUserRole = async (userId: string, role: string) => {
  const res = await axios.put(`${API}/admin/users/${userId}`, { role });
  return res.data;
};

export const deleteUser = async (userId: string) => {
  const res = await axios.delete(`${API}/admin/users/${userId}`);
  return res.data;
};

export const getDashboardStats = async () => {
  const res = await axios.get(`${API}/admin/stats`);
  return res.data;
};
