import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:1000/api";

export const getProgress = async (courseId: string) => {
  const res = await axios.get(`${API}/progress/${courseId}`);
  return res.data;
};

export const updateProgress = async (courseId: string, progressData: any) => {
  const res = await axios.put(`${API}/progress/${courseId}`, progressData);
  return res.data;
};
