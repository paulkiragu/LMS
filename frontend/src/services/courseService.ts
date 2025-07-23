import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

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
      const response = await api.get('/courses');
      return response.data;
    } catch (error) {
      console.error('Error fetching all courses:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch courses');
    }
  },

  // Get courses created by the logged-in user
  getMyCourses: async (userId) => {
    try {
      console.log('🌐 Making API request to get all courses...');
      console.log('🔑 User ID to filter by:', userId);
      
      const response = await api.get('/courses');
      const allCourses = response.data;
      
      console.log('📥 Received all courses from API:', allCourses);
      console.log('📊 Total courses count:', allCourses?.length || 0);
      
      // Filter courses by the logged-in user (instructor)
      const userCourses = allCourses.filter(course => {
        const instructorId = course.instructor?._id || course.instructor;
        const isMatch = instructorId === userId;
        
        console.log('🔍 Checking course:', {
          courseTitle: course.title,
          courseInstructor: course.instructor,
          instructorId: instructorId,
          userId: userId,
          isMatch: isMatch
        });
        
        return isMatch;
      });
      
      console.log('✅ Filtered user courses:', userCourses);
      console.log('📈 User courses count:', userCourses.length);
      
      return userCourses;
    } catch (error) {
      console.error('❌ Error in getMyCourses:', error);
      console.error('🔍 Error response:', error.response?.data);
      console.error('🔍 Error status:', error.response?.status);
      throw new Error(error.response?.data?.message || 'Failed to fetch your courses');
    }
  },

  // Get single course by ID
  getCourseById: async (courseId) => {
    try {
      const response = await api.get(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching course:', error);
      throw new Error(error.response?.data?.message || 'Failed to fetch course');
    }
  },

  // Create new course
  createCourse: async (courseData) => {
    try {
      const response = await api.post('/courses', courseData);
      return response.data;
    } catch (error) {
      console.error('Error creating course:', error);
      throw new Error(error.response?.data?.message || 'Failed to create course');
    }
  },

  // Update course
  updateCourse: async (courseId, courseData) => {
    try {
      const response = await api.put(`/courses/${courseId}`, courseData);
      return response.data;
    } catch (error) {
      console.error('Error updating course:', error);
      throw new Error(error.response?.data?.message || 'Failed to update course');
    }
  },

  // Delete course
  deleteCourse: async (courseId) => {
    try {
      const response = await api.delete(`/courses/${courseId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting course:', error);
      throw new Error(error.response?.data?.message || 'Failed to delete course');
    }
  }
};
