import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import LessonCard from '@/components/LessonCard';
import Navbar from '@/components/Navbar';
import {
  Play,
  Clock,
  Users,
  Star,
  Award,
  ChevronLeft,
  CheckCircle,
  Lock,
  BookOpen,
  Target,
  Globe,
  Calendar
} from 'lucide-react';
import toast from 'react-hot-toast';

// Mock data - replace with actual API calls
const mockCourse = {
  id: '1',
  title: 'Complete React Development Course',
  description: 'Master React from fundamentals to advanced concepts. Build real-world projects and deploy production-ready applications.',
  fullDescription: `This comprehensive React course takes you from beginner to expert level. You'll learn modern React concepts including hooks, context, and state management. The course includes hands-on projects where you'll build a todo app, e-commerce site, and a social media dashboard.

  What you'll learn:
  • React fundamentals and JSX
  • Components and Props
  • State management with hooks
  • Context API and Redux
  • Routing with React Router
  • API integration
  • Testing with Jest
  • Deployment strategies`,
  thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
  price: 89,
  duration: '40 hours',
  level: 'intermediate' as const,
  category: 'Web Development',
  language: 'English',
  lastUpdated: '2024-01-15',
  instructor: {
    id: '1',
    name: 'Sarah Johnson',
    bio: 'Senior Frontend Developer with 8+ years of experience at top tech companies. Specializes in React and modern web development.',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b6bff789?w=150&h=150&fit=crop',
    rating: 4.9,
    students: 15000,
    courses: 12
  },
  enrollmentCount: 1250,
  rating: 4.8,
  totalRatings: 890,
  lessons: [
    {
      id: '1',
      title: 'Introduction to React',
      description: 'Learn what React is and why it\'s popular for building user interfaces.',
      duration: '15 minutes',
      order: 1,
      isCompleted: false,
      courseId: '1',
      content: 'Lesson content...',
      videoUrl: 'https://example.com/video1'
    },
    {
      id: '2',
      title: 'Setting Up Development Environment',
      description: 'Install Node.js, create-react-app, and set up your development tools.',
      duration: '20 minutes',
      order: 2,
      isCompleted: false,
      courseId: '1',
      content: 'Lesson content...',
      videoUrl: 'https://example.com/video2'
    },
    {
      id: '3',
      title: 'JSX and Components',
      description: 'Understand JSX syntax and create your first React components.',
      duration: '30 minutes',
      order: 3,
      isCompleted: false,
      courseId: '1',
      content: 'Lesson content...',
      videoUrl: 'https://example.com/video3'
    },
    {
      id: '4',
      title: 'Props and State',
      description: 'Learn how to pass data between components and manage component state.',
      duration: '25 minutes',
      order: 4,
      isCompleted: false,
      courseId: '1',
      content: 'Lesson content...',
      videoUrl: 'https://example.com/video4'
    },
    {
      id: '5',
      title: 'Event Handling',
      description: 'Handle user interactions and events in React applications.',
      duration: '20 minutes',
      order: 5,
      isCompleted: false,
      courseId: '1',
      content: 'Lesson content...',
      videoUrl: 'https://example.com/video5'
    }
  ],
  requirements: [
    'Basic HTML, CSS, and JavaScript knowledge',
    'Familiarity with ES6+ features',
    'A computer with internet connection'
  ],
  outcomes: [
    'Build modern React applications',
    'Understand component-based architecture',
    'Master React hooks and state management',
    'Deploy React apps to production',
    'Implement routing and navigation',
    'Work with APIs and external data'
  ]
};

const CourseDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [course] = useState(mockCourse);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<Set<string>>(new Set());
  const [markingComplete, setMarkingComplete] = useState<Set<string>>(new Set());

  const progress = course.lessons.length > 0 
    ? (completedLessons.size / course.lessons.length) * 100 
    : 0;

  const handleEnroll = async () => {
    if (!user) {
      toast.error('Please login to enroll in this course');
      return;
    }

    setIsEnrolling(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsEnrolled(true);
      toast.success('Successfully enrolled in course!');
    } catch (error) {
      toast.error('Failed to enroll. Please try again.');
    } finally {
      setIsEnrolling(false);
    }
  };

  const handleMarkComplete = async (lessonId: string) => {
    setMarkingComplete(prev => new Set(prev).add(lessonId));
    
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 500));
      setCompletedLessons(prev => new Set(prev).add(lessonId));
      toast.success('Lesson marked as complete!');
    } catch (error) {
      toast.error('Failed to mark lesson complete');
    } finally {
      setMarkingComplete(prev => {
        const newSet = new Set(prev);
        newSet.delete(lessonId);
        return newSet;
      });
    }
  };

  const isLessonLocked = (lessonOrder: number) => {
    if (!isEnrolled) return true;
    if (lessonOrder === 1) return false;
    
    // Check if previous lesson is completed
    const previousLesson = course.lessons.find(l => l.order === lessonOrder - 1);
    return previousLesson ? !completedLessons.has(previousLesson.id) : false;
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner':
        return 'bg-success/10 text-success border-success/20';
      case 'intermediate':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'advanced':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back button */}
        <Button variant="ghost" className="mb-6" asChild>
          <Link to="/courses">
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Link>
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hero section */}
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Button size="lg" className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <Play className="h-5 w-5 mr-2" />
                  Preview Course
                </Button>
              </div>
            </div>

            {/* Course info */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Badge className={getLevelColor(course.level)} variant="outline">
                  {course.level}
                </Badge>
                <Badge variant="outline">{course.category}</Badge>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                {course.title}
              </h1>
              
              <p className="text-xl text-muted-foreground">
                {course.description}
              </p>

              {/* Stats */}
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{course.rating}</span>
                  <span>({course.totalRatings} ratings)</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="h-4 w-4" />
                  <span>{course.enrollmentCount} students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Globe className="h-4 w-4" />
                  <span>{course.language}</span>
                </div>
              </div>

              {/* Progress (if enrolled) */}
              {isEnrolled && (
                <Card>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">Your Progress</span>
                      <span className="text-sm text-muted-foreground">
                        {completedLessons.size}/{course.lessons.length} lessons
                      </span>
                    </div>
                    <Progress value={progress} className="h-2" />
                    <p className="text-sm text-muted-foreground mt-2">
                      {Math.round(progress)}% complete
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
                <TabsTrigger value="instructor">Instructor</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Course</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose max-w-none">
                      <p className="whitespace-pre-line text-muted-foreground">
                        {course.fullDescription}
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Target className="h-5 w-5" />
                        <span>What You'll Learn</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {course.outcomes.map((outcome, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <BookOpen className="h-5 w-5" />
                        <span>Requirements</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {course.requirements.map((requirement, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <div className="h-4 w-4 bg-muted rounded-full mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="curriculum">
                <Card>
                  <CardHeader>
                    <CardTitle>Course Curriculum</CardTitle>
                    <p className="text-muted-foreground">
                      {course.lessons.length} lessons • {course.duration} total
                    </p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {course.lessons.map((lesson) => (
                        <LessonCard
                          key={lesson.id}
                          lesson={{
                            ...lesson,
                            isCompleted: completedLessons.has(lesson.id)
                          }}
                          variant="compact"
                          isLocked={isLessonLocked(lesson.order)}
                          onMarkComplete={handleMarkComplete}
                          isMarkingComplete={markingComplete.has(lesson.id)}
                        />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="instructor">
                <Card>
                  <CardHeader>
                    <CardTitle>About the Instructor</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={course.instructor.avatar} />
                        <AvatarFallback>
                          {course.instructor.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold">{course.instructor.name}</h3>
                        <p className="text-muted-foreground mb-4">{course.instructor.bio}</p>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="font-medium">{course.instructor.rating}</div>
                            <div className="text-muted-foreground">Instructor Rating</div>
                          </div>
                          <div>
                            <div className="font-medium">{course.instructor.students.toLocaleString()}</div>
                            <div className="text-muted-foreground">Students</div>
                          </div>
                          <div>
                            <div className="font-medium">{course.instructor.courses}</div>
                            <div className="text-muted-foreground">Courses</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews">
                <Card>
                  <CardHeader>
                    <CardTitle>Student Reviews</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">Reviews will be implemented in a future update.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Purchase/Enroll Card */}
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="text-3xl font-bold text-foreground">
                    {course.price === 0 ? 'Free' : `$${course.price}`}
                  </div>
                  
                  {!isEnrolled ? (
                    <Button
                      className="w-full"
                      onClick={handleEnroll}
                      disabled={isEnrolling}
                    >
                      {isEnrolling ? 'Enrolling...' : `Enroll ${course.price === 0 ? 'for Free' : 'Now'}`}
                    </Button>
                  ) : (
                    <div className="space-y-3">
                      <div className="flex items-center justify-center space-x-2 text-success">
                        <CheckCircle className="h-5 w-5" />
                        <span className="font-medium">Enrolled</span>
                      </div>
                      <Button className="w-full" asChild>
                        <Link to={`/courses/${course.id}/lessons/${course.lessons[0]?.id}`}>
                          Continue Learning
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>

                <div className="mt-6 space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Level</span>
                    <span className="capitalize">{course.level}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Duration</span>
                    <span>{course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Lessons</span>
                    <span>{course.lessons.length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Language</span>
                    <span>{course.language}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span>{new Date(course.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Award className="h-4 w-4" />
                    <span>Certificate of completion</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;