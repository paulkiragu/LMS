import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:1000/api";


const api = axios.create({
  baseURL: API,
  withCredentials: true,
});


api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getEnrolledCourses = async () => {
  const res = await api.get(`/course/enrolled`);
  return res.data;
}


export const getCourses = async () => {
  const res = await axios.get(`${API}/course/me`);
  return res.data;
};

export const getCourseById = async (id: string) => {
  const res = await axios.get(`${API}/course/${id}`);
  return res.data;
};

export const createCourse = async (courseData: any) => {
  const res = await axios.post(`${API}/course`, courseData);
  return res.data;
};

export const updateCourse = async (id: string, courseData: any) => {
  const res = await axios.put(`${API}/course/${id}`, courseData);
  return res.data;
};

export const deleteCourse = async (id: string) => {
  const res = await axios.delete(`${API}/course/${id}`);
  return res.data;
};
