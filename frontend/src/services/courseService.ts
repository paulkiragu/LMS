import axios from "axios";

const API = import.meta.env.VITE_API_BASE_URL;


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


// Course Service Functions
export const courseService = {
  // Get all courses
  getAllCourses: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/course`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching all courses:', error);
      throw error;
    }
  },

  // Get courses created by the logged-in user
  getMyCourses: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/course`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const allCourses = await response.json();
      
      // Filter courses by the logged-in user (instructor)
      const userCourses = allCourses.filter(course => 
        course.instructor._id === userId || course.instructor === userId
      );
      
      return userCourses;
    } catch (error) {
      console.error('Error fetching user courses:', error);
      throw error;
    }
  },

  // Get single course by ID
  getCourseById: async (courseId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/course/${courseId}`, {
        method: 'GET',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching course:', error);
      throw error;
    }
  },

  // Create new course
  createCourse: async (courseData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/course`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(courseData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating course:', error);
      throw error;
    }
  },

  // Update course
  updateCourse: async (courseId, courseData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/course/${courseId}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(courseData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error updating course:', error);
      throw error;
    }
  },

  // Delete course
  deleteCourse: async (courseId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/course/${courseId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error deleting course:', error);
      throw error;
    }
  }
};

