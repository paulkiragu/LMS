import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || https://lmsbackend-63yn.onrender.com/api;

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Request interceptor to add token to all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Helper function to get auth headers (for fetch requests if needed)
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Course Service Functions
export const courseService = {
  // Get all courses
  getAllCourses: async () => {
    try {
      const response = await api.get('/course');
      return response.data;
    } catch (error) {
      console.error('Error fetching all courses:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch courses');
    }
  },

  // Get courses created by the logged-in user
  getMyCourses: async (userId) => {
    try {
      const response = await api.get('/course');
      const allCourses = response.data;
      
      // Filter courses by the logged-in user (instructor)
      const userCourses = allCourses.filter(course => 
        course.instructor?._id === userId || course.instructor === userId
      );
      
      return userCourses;
    } catch (error) {
      console.error('Error fetching user courses:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch your courses');
    }
  },

  // Get single course by ID
  getCourseById: async (courseId) => {
    try {
      const response = await api.get(`/course/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch course');
    }
  },

  // Create new course
  createCourse: async (courseData) => {
    try {
      const response = await api.post('/course', courseData);
      return response.data;
    } catch (error) {
      console.error('Error creating course:', error);
      throw new Error(error.response?.data?.message || 'Failed to create course');
    }
  },

  // Update course
  updateCourse: async (courseId, courseData) => {
    try {
      const response = await api.put(`/course/${courseId}`, courseData);
      return response.data;
    } catch (error) {
      console.error('Error updating course:', error);
      throw new Error(error.response?.data?.message || 'Failed to update course');
    }
  },

  // Delete course
  deleteCourse: async (courseId) => {
    try {
      const response = await api.delete(`/course/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting course:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete course');
    }
  }
};
