import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CourseCard from '@/components/CourseCard';
import Navbar from '@/components/Navbar';
import {
  GraduationCap,
  BookOpen,
  Users,
  Award,
  ArrowRight,
  Play,
  CheckCircle,
  Star,
  TrendingUp
} from 'lucide-react';

// Mock data - replace with actual API calls
const mockPopularCourses = [
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
    rating: 4.8
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
    rating: 4.9
  },
  {
    id: '3',
    title: 'Advanced Machine Learning',
    description: 'Deep dive into ML algorithms and practical applications.',
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
  }
];

const features = [
  {
    icon: BookOpen,
    title: 'Expert-Led Courses',
    description: 'Learn from industry professionals with years of experience'
  },
  {
    icon: Users,
    title: 'Community Learning',
    description: 'Join thousands of learners and grow together'
  },
  {
    icon: Award,
    title: 'Certifications',
    description: 'Get recognized certificates upon course completion'
  },
  {
    icon: TrendingUp,
    title: 'Track Progress',
    description: 'Monitor your learning journey with detailed analytics'
  }
];

const stats = [
  { label: 'Students', value: '50,000+' },
  { label: 'Courses', value: '1,200+' },
  { label: 'Instructors', value: '500+' },
  { label: 'Success Rate', value: '95%' }
];

const Home: React.FC = () => {
  const [popularCourses, setPopularCourses] = useState(mockPopularCourses);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  🎓 Join 50,000+ learners worldwide
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Learn Skills That
                  <span className="block text-accent"> Shape Your Future</span>
                </h1>
                <p className="text-xl text-white/90 max-w-lg">
                  Access world-class courses from expert instructors. Build in-demand skills 
                  and advance your career with our comprehensive learning platform.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                  <Link to="/courses">
                    <BookOpen className="h-5 w-5 mr-2" />
                    Browse Courses
                  </Link>
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                  <Link to="/register">
                    Get Started Free
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold">{stat.value}</div>
                    <div className="text-white/80 text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop"
                  alt="Students learning"
                  className="rounded-2xl shadow-large"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-medium">
                  <div className="flex items-center space-x-3">
                    <div className="bg-success/10 p-2 rounded-lg">
                      <CheckCircle className="h-6 w-6 text-success" />
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">1,250+</div>
                      <div className="text-sm text-muted-foreground">Courses Completed</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose EduPlatform?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We provide everything you need to succeed in your learning journey
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center p-6 hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="pt-6">
                    <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Popular Courses
              </h2>
              <p className="text-xl text-muted-foreground">
                Join thousands of students in these trending courses
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/courses">
                View All Courses
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-primary text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to Start Learning?
            </h2>
            <p className="text-xl text-white/90">
              Join our community of learners and start building skills that matter.
              Get access to premium courses and expert instruction.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90" asChild>
                <Link to="/register">
                  Start Learning Today
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link to="/courses">
                  <Play className="h-5 w-5 mr-2" />
                  Watch Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="bg-gradient-primary p-2 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-white" />
                </div>
                <span className="text-xl font-bold">EduPlatform</span>
              </div>
              <p className="text-muted-foreground">
                Empowering learners worldwide with quality education and expert instruction.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <div className="space-y-2 text-muted-foreground">
                <div><Link to="/courses" className="hover:text-foreground transition-colors">Courses</Link></div>
                <div><Link to="/instructors" className="hover:text-foreground transition-colors">Instructors</Link></div>
                <div><Link to="/pricing" className="hover:text-foreground transition-colors">Pricing</Link></div>
                <div><Link to="/about" className="hover:text-foreground transition-colors">About</Link></div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <div className="space-y-2 text-muted-foreground">
                <div><Link to="/help" className="hover:text-foreground transition-colors">Help Center</Link></div>
                <div><Link to="/contact" className="hover:text-foreground transition-colors">Contact</Link></div>
                <div><Link to="/privacy" className="hover:text-foreground transition-colors">Privacy</Link></div>
                <div><Link to="/terms" className="hover:text-foreground transition-colors">Terms</Link></div>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <div className="space-y-2 text-muted-foreground">
                <div><Link to="/careers" className="hover:text-foreground transition-colors">Careers</Link></div>
                <div><Link to="/blog" className="hover:text-foreground transition-colors">Blog</Link></div>
                <div><Link to="/news" className="hover:text-foreground transition-colors">News</Link></div>
                <div><Link to="/investors" className="hover:text-foreground transition-colors">Investors</Link></div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 EduPlatform. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;