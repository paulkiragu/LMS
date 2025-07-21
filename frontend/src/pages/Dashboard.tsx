import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import CourseCard from '@/components/CourseCard';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import {
  BookOpen,
  Clock,
  Target,
  TrendingUp,
  Award,
  Calendar,
  ArrowRight,
  PlayCircle,
  CheckCircle
} from 'lucide-react';

// Mock data - replace with actual API calls
const mockEnrolledCourses = [
  {
    id: '1',
    title: 'Complete React Development Course',
    description: 'Learn React from basics to advanced concepts with hands-on projects.',
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
    rating: 4.8,
    lessons: [
      { id: '1', isCompleted: true },
      { id: '2', isCompleted: true },
      { id: '3', isCompleted: false },
      { id: '4', isCompleted: false },
      { id: '5', isCompleted: false }
    ]
  },
  {
    id: '2',
    title: 'Python for Beginners',
    description: 'Start your programming journey with Python fundamentals.',
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
    rating: 4.9,
    lessons: [
      { id: '1', isCompleted: true },
      { id: '2', isCompleted: true },
      { id: '3', isCompleted: true },
      { id: '4', isCompleted: true }
    ]
  }
];

const mockRecentActivity = [
  {
    id: '1',
    type: 'lesson_completed',
    title: 'Completed "React Components"',
    course: 'Complete React Development Course',
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    type: 'course_enrolled',
    title: 'Enrolled in new course',
    course: 'Advanced JavaScript Concepts',
    timestamp: '1 day ago'
  },
  {
    id: '3',
    type: 'certificate_earned',
    title: 'Earned certificate',
    course: 'Python for Beginners',
    timestamp: '3 days ago'
  }
];

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [enrolledCourses] = useState(mockEnrolledCourses);
  const [recentActivity] = useState(mockRecentActivity);

  // Calculate statistics
  const totalCourses = enrolledCourses.length;
  const completedCourses = enrolledCourses.filter(course => 
    course.lessons?.every(lesson => lesson.isCompleted)
  ).length;
  
  const totalLessons = enrolledCourses.reduce((acc, course) => 
    acc + (course.lessons?.length || 0), 0
  );
  
  const completedLessons = enrolledCourses.reduce((acc, course) => 
    acc + (course.lessons?.filter(lesson => lesson.isCompleted).length || 0), 0
  );
  
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const stats = [
    {
      title: 'Enrolled Courses',
      value: totalCourses,
      icon: BookOpen,
      color: 'text-primary'
    },
    {
      title: 'Completed Courses',
      value: completedCourses,
      icon: CheckCircle,
      color: 'text-success'
    },
    {
      title: 'Hours Learned',
      value: '47h',
      icon: Clock,
      color: 'text-warning'
    },
    {
      title: 'Certificates',
      value: completedCourses,
      icon: Award,
      color: 'text-accent'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar onMenuClick={() => setSidebarOpen(true)} showMenuButton />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 p-6 lg:ml-64">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">
                  Welcome back, {user?.name}! 👋
                </h1>
                <p className="text-muted-foreground mt-2">
                  Continue your learning journey
                </p>
              </div>
              <Button asChild>
                <Link to="/courses">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse Courses
                </Link>
              </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <Card key={stat.title} className="hover:shadow-medium transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold">{stat.value}</p>
                          <p className="text-muted-foreground text-sm">{stat.title}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Progress Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>Learning Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Overall Progress</span>
                    <span className="text-sm text-muted-foreground">
                      {completedLessons}/{totalLessons} lessons completed
                    </span>
                  </div>
                  <Progress value={overallProgress} className="h-3" />
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>{Math.round(overallProgress)}% Complete</span>
                    <span>{totalLessons - completedLessons} lessons remaining</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Continue Learning */}
              <div className="lg:col-span-2 space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold">Continue Learning</h2>
                  <Button variant="outline" asChild>
                    <Link to="/dashboard/my-courses">
                      View All
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Link>
                  </Button>
                </div>
                
                <div className="space-y-6">
                  {enrolledCourses.map((course) => {
                    const progress = course.lessons 
                      ? (course.lessons.filter(l => l.isCompleted).length / course.lessons.length) * 100
                      : 0;
                    
                    return (
                      <CourseCard
                        key={course.id}
                        course={course}
                        variant="enrolled"
                        showProgress
                        progress={progress}
                        isEnrolled
                      />
                    );
                  })}
                </div>
              </div>

              {/* Sidebar Content */}
              <div className="space-y-6">
                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Recent Activity</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentActivity.map((activity) => (
                        <div key={activity.id} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 w-2 h-2 bg-primary rounded-full mt-2"></div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground">
                              {activity.title}
                            </p>
                            <p className="text-sm text-muted-foreground truncate">
                              {activity.course}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {activity.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Study Goals */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5" />
                      <span>This Week's Goals</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Complete 5 lessons</span>
                          <span className="text-sm text-muted-foreground">3/5</span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Study 10 hours</span>
                          <span className="text-sm text-muted-foreground">7.5/10h</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Finish 1 course</span>
                          <span className="text-sm text-muted-foreground">0/1</span>
                        </div>
                        <Progress value={0} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button className="w-full justify-start" variant="outline" asChild>
                        <Link to="/courses">
                          <BookOpen className="h-4 w-4 mr-2" />
                          Browse All Courses
                        </Link>
                      </Button>
                      
                      <Button className="w-full justify-start" variant="outline" asChild>
                        <Link to="/dashboard/progress">
                          <Target className="h-4 w-4 mr-2" />
                          View Progress
                        </Link>
                      </Button>
                      
                      <Button className="w-full justify-start" variant="outline" asChild>
                        <Link to="/dashboard/achievements">
                          <Award className="h-4 w-4 mr-2" />
                          My Achievements
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;