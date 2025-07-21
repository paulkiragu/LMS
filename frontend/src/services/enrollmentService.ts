import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:1000/api";

export const enroll = async (courseId: string) => {
  const res = await axios.post(`${API}/enrollments`, { courseId });
  return res.data;
};

export const getMyEnrollments = async () => {
  const res = await axios.get(`${API}/enrollments`);
  return res.data;
};

export const getEnrollmentByCourseId = async (courseId: string) => {
  const res = await axios.get(`${API}/enrollments/course/${courseId}`);
  return res.data;
};
