import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  BookOpen,
  Plus,
  Edit,
  Trash2,
  Users,
  Clock,
  Star,
  AlertCircle,
  Loader2,
  Menu,
  X,
  ArrowLeft
} from 'lucide-react';

// Import your centralized course service
import { courseService } from '../services/courseService'; // Adjust the path based on your file structure

const MyCourses = ({ user, onNavigate }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleting, setDeleting] = useState(null);

  // Fetch user's courses from API using centralized service
  useEffect(() => {
    const fetchMyCourses = async () => {
      if (!user?._id) {
        setError('User not authenticated');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const userCourses = await courseService.getMyCourses(user._id);
        setCourses(userCourses);
      } catch (err) {
        setError(err.message || 'Failed to fetch courses');
        console.error('Error fetching courses:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCourses();
  }, [user]);

  // Handle course deletion using centralized service
  const handleDeleteCourse = async (courseId, courseTitle) => {
    const confirmMessage = `Are you sure you want to delete "${courseTitle}"? This action cannot be undone.`;
    
    if (!window.confirm(confirmMessage)) {
      return;
    }

    try {
      setDeleting(courseId);
      await courseService.deleteCourse(courseId);
      
      // Remove the deleted course from state
      setCourses(prevCourses => prevCourses.filter(course => course._id !== courseId));
      
      // Show success message (you can replace with toast notification)
      alert('Course deleted successfully!');
    } catch (err) {
      console.error('Error deleting course:', err);
      alert(`Failed to delete course: ${err.message}`);
    } finally {
      setDeleting(null);
    }
  };

  const handleEditCourse = (courseId) => {
    // Navigate to edit course page
    onNavigate?.(`/dashboard/courses/${courseId}/edit`);
  };

  const handleViewCourse = (courseId) => {
    // Navigate to course details page
    onNavigate?.(`/courses/${courseId}`);
  };

  const handleCreateCourse = () => {
    // Navigate to create course page
    onNavigate?.('/dashboard/courses/create');
  };

  const handleBackToDashboard = () => {
    onNavigate?.('/dashboard');
  };

  const CourseCard = ({ course }) => {
    const isDeleting = deleting === course._id;
    
    return (
      <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold text-gray-900 line-clamp-2">
                {course.title}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                {course.description}
              </p>
              {course.category && (
                <Badge variant="outline" className="mt-2">
                  {course.category}
                </Badge>
              )}
            </div>
            <div className="flex items-center space-x-2 ml-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleEditCourse(course._id)}
                className="p-2"
                disabled={isDeleting}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleDeleteCourse(course._id, course.title)}
                className="p-2 text-red-600 hover:text-red-700 hover:border-red-300"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Users className="h-4 w-4" />
                <span>{course.enrollmentCount || 0} enrolled</span>
              </div>
              {course.duration && (
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
              )}
              {course.rating && (
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span>{course.rating}</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {course.level && (
                <Badge variant={
                  course.level === 'beginner' ? 'secondary' : 
                  course.level === 'intermediate' ? 'default' : 
                  'destructive'
                }>
                  {course.level}
                </Badge>
              )}
              {course.price !== undefined && (
                <Badge variant="outline" className={
                  course.price === 0 ? 'text-green-600 border-green-600' : ''
                }>
                  {course.price === 0 ? 'Free' : `$${course.price}`}
                </Badge>
              )}
            </div>
            
            <Button 
              variant="default" 
              size="sm" 
              onClick={() => handleViewCourse(course._id)}
              disabled={isDeleting}
            >
              View Course
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  const Sidebar = () => (
    <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
      sidebarOpen ? 'translate-x-0' : '-translate-x-full'
    } lg:translate-x-0 lg:static lg:inset-0`}>
      <div className="flex items-center justify-between h-16 px-6 border-b">
        <h2 className="text-xl font-bold text-gray-900">Dashboard</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <nav className="mt-8 px-4">
        <div className="space-y-2">
          <button 
            onClick={handleBackToDashboard}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Dashboard
          </button>
          <button className="w-full text-left px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-semibold">
            My Courses
          </button>
          <button 
            onClick={() => onNavigate?.('/courses')}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Browse Courses
          </button>
          <button 
            onClick={() => onNavigate?.('/dashboard/progress')}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Progress
          </button>
          <button 
            onClick={() => onNavigate?.('/dashboard/achievements')}
            className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Achievements
          </button>
        </div>
      </nav>
    </div>
  );

  // Calculate statistics
  const totalStudents = courses.reduce((acc, course) => acc + (course.enrollmentCount || 0), 0);
  const averageRating = courses.length > 0 
    ? (courses.reduce((acc, course) => acc + (course.rating || 0), 0) / courses.length).toFixed(1)
    : '0.0';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="flex items-center justify-between h-16 px-6">
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold text-gray-900">LearnHub</h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Welcome, {user?.name || 'User'}</span>
          </div>
        </div>
      </header>
      
      <div className="flex">
        <Sidebar />
        
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
        
        <main className="flex-1 p-6 lg:ml-0">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleBackToDashboard}
                  className="flex items-center space-x-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back</span>
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    My Courses
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Manage and track your created courses
                  </p>
                </div>
              </div>
              <Button onClick={handleCreateCourse}>
                <Plus className="h-4 w-4 mr-2" />
                Create New Course
              </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-blue-100">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{courses.length}</p>
                      <p className="text-gray-600 text-sm">Total Courses</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-green-100">
                      <Users className="h-6 w-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{totalStudents}</p>
                      <p className="text-gray-600 text-sm">Total Students</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-full bg-yellow-100">
                      <Star className="h-6 w-6 text-yellow-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{averageRating}</p>
                      <p className="text-gray-600 text-sm">Average Rating</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Content */}
            <div className="space-y-6">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  <span className="ml-2 text-gray-600">Loading your courses...</span>
                </div>
              ) : error ? (
                <Card className="border-red-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-3 text-red-600">
                      <AlertCircle className="h-5 w-5" />
                      <div>
                        <p className="font-medium">Error loading courses</p>
                        <p className="text-sm text-gray-600">{error}</p>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => window.location.reload()}
                    >
                      Try Again
                    </Button>
                  </CardContent>
                </Card>
              ) : courses.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No courses yet</h3>
                    <p className="text-gray-600 mb-6">
                      You haven't created any courses yet. Start by creating your first course!
                    </p>
                    <Button onClick={handleCreateCourse}>
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Course
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyCourses;
