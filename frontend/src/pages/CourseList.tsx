import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import CourseCard from '@/components/CourseCard';
import Navbar from '@/components/Navbar';
import {
  Search,
  Filter,
  Grid,
  List,
  Star,
  Users,
  Clock,
  DollarSign
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock data - replace with actual API calls
const mockCourses = [
  {
    id: '1',
    title: 'Complete React Development Course',
    description: 'Learn React from basics to advanced concepts with hands-on projects and real-world applications.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=250&fit=crop',
    price: 89,
    duration: '40 hours',
    level: 'intermediate' as const,
    category: 'Web Development',
    instructor: {
      id: '1',
      name: 'Sarah Johnson',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b6bff789?w=150&h=150&fit=crop'
    },
    enrollmentCount: 1250,
    rating: 4.8
  },
  {
    id: '2',
    title: 'Python for Beginners',
    description: 'Start your programming journey with Python fundamentals and build your first applications.',
    thumbnail: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?w=400&h=250&fit=crop',
    price: 0,
    duration: '25 hours',
    level: 'beginner' as const,
    category: 'Programming',
    instructor: {
      id: '2',
      name: 'Mike Chen',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop'
    },
    enrollmentCount: 2100,
    rating: 4.9
  },
  {
    id: '3',
    title: 'Advanced Machine Learning',
    description: 'Deep dive into ML algorithms, neural networks, and practical applications in industry.',
    thumbnail: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=250&fit=crop',
    price: 149,
    duration: '60 hours',
    level: 'advanced' as const,
    category: 'Data Science',
    instructor: {
      id: '3',
      name: 'Dr. Emily Watson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop'
    },
    enrollmentCount: 850,
    rating: 4.7
  },
  {
    id: '4',
    title: 'Full Stack Web Development',
    description: 'Build complete web applications using modern technologies and deployment strategies.',
    thumbnail: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=250&fit=crop',
    price: 120,
    duration: '50 hours',
    level: 'intermediate' as const,
    category: 'Web Development',
    instructor: {
      id: '4',
      name: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
    },
    enrollmentCount: 980,
    rating: 4.6
  },
  {
    id: '5',
    title: 'UI/UX Design Fundamentals',
    description: 'Learn design principles, user research, prototyping, and create stunning user interfaces.',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=250&fit=crop',
    price: 75,
    duration: '30 hours',
    level: 'beginner' as const,
    category: 'Design',
    instructor: {
      id: '5',
      name: 'Lisa Park',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop'
    },
    enrollmentCount: 1500,
    rating: 4.8
  },
  {
    id: '6',
    title: 'Digital Marketing Strategy',
    description: 'Master digital marketing channels, analytics, and growth strategies for modern businesses.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop',
    price: 65,
    duration: '20 hours',
    level: 'beginner' as const,
    category: 'Marketing',
    instructor: {
      id: '6',
      name: 'Tom Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop'
    },
    enrollmentCount: 750,
    rating: 4.5
  }
];

const categories = ['All', 'Web Development', 'Programming', 'Data Science', 'Design', 'Marketing'];
const levels = ['All', 'Beginner', 'Intermediate', 'Advanced'];
const sortOptions = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'newest', label: 'Newest' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'price-low', label: 'Price: Low to High' },
  { value: 'price-high', label: 'Price: High to Low' }
];

const CourseList: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState(mockCourses);
  const [filteredCourses, setFilteredCourses] = useState(mockCourses);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [enrollingCourses, setEnrollingCourses] = useState<Set<string>>(new Set());
  const [enrolledCourses, setEnrolledCourses] = useState<Set<string>>(new Set());

  // Filter and sort courses
  useEffect(() => {
    let filtered = [...courses];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(course =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.instructor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(course => course.category === selectedCategory);
    }

    // Level filter
    if (selectedLevel !== 'All') {
      filtered = filtered.filter(course => 
        course.level.toLowerCase() === selectedLevel.toLowerCase()
      );
    }

    // Sort
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.enrollmentCount - a.enrollmentCount);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // In real app, would sort by creation date
        break;
    }

    setFilteredCourses(filtered);
  }, [courses, searchTerm, selectedCategory, selectedLevel, sortBy]);

  const handleEnroll = async (courseId: string) => {
    if (!user) {
      toast.error('Please login to enroll in courses');
      return;
    }

    setEnrollingCourses(prev => new Set(prev).add(courseId));
    
    try {
      // Mock API call - replace with actual enrollment API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setEnrolledCourses(prev => new Set(prev).add(courseId));
      toast.success('Successfully enrolled in course!');
    } catch (error) {
      toast.error('Failed to enroll. Please try again.');
    } finally {
      setEnrollingCourses(prev => {
        const newSet = new Set(prev);
        newSet.delete(courseId);
        return newSet;
      });
    }
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedLevel('All');
    setSortBy('popular');
  };

  const activeFiltersCount = [
    searchTerm,
    selectedCategory !== 'All' ? selectedCategory : null,
    selectedLevel !== 'All' ? selectedLevel : null
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Explore Courses</h1>
          <p className="text-muted-foreground">
            Discover thousands of courses from expert instructors
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search courses, instructors, or topics..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Level Filter */}
              <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Level" />
                </SelectTrigger>
                <SelectContent>
                  {levels.map(level => (
                    <SelectItem key={level} value={level}>
                      {level}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  {filteredCourses.length} courses found
                </span>
                {activeFiltersCount > 0 && (
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">
                      {activeFiltersCount} filter{activeFiltersCount > 1 ? 's' : ''} active
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={resetFilters}
                      className="text-primary hover:text-primary/80"
                    >
                      Clear all
                    </Button>
                  </div>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Course Grid/List */}
        {filteredCourses.length > 0 ? (
          <div className={
            viewMode === 'grid' 
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
              : 'space-y-6'
          }>
            {filteredCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                isEnrolled={enrolledCourses.has(course.id)}
                onEnroll={handleEnroll}
                isEnrolling={enrollingCourses.has(course.id)}
                variant={enrolledCourses.has(course.id) ? 'enrolled' : 'default'}
              />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="py-12 text-center">
              <div className="space-y-4">
                <div className="text-4xl">🔍</div>
                <h3 className="text-xl font-semibold">No courses found</h3>
                <p className="text-muted-foreground max-w-md mx-auto">
                  Try adjusting your search criteria or browse all courses
                </p>
                <Button onClick={resetFilters}>
                  Clear Filters
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Load More (in real app, implement pagination) */}
        {filteredCourses.length > 0 && (
          <div className="mt-12 text-center">
            <Button variant="outline" size="lg">
              Load More Courses
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseList;