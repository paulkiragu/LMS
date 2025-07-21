import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import {
  Clock,
  Users,
  Star,
  BookOpen,
  PlayCircle,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    thumbnail: string;
    price: number;
    duration: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    category: string;
    instructor: {
      id: string;
      name: string;
      avatar?: string;
    };
    enrollmentCount: number;
    rating: number;
    lessons?: Array<{ id: string; isCompleted?: boolean }>;
  };
  showProgress?: boolean;
  progress?: number;
  isEnrolled?: boolean;
  onEnroll?: (courseId: string) => void;
  isEnrolling?: boolean;
  variant?: 'default' | 'enrolled' | 'instructor';
}

const CourseCard: React.FC<CourseCardProps> = ({
  course,
  showProgress = false,
  progress = 0,
  isEnrolled = false,
  onEnroll,
  isEnrolling = false,
  variant = 'default'
}) => {
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

  const completedLessons = course.lessons?.filter(lesson => lesson.isCompleted).length || 0;
  const totalLessons = course.lessons?.length || 0;

  return (
    <Card className="group hover:shadow-medium transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <div className="relative">
        <img
          src={course.thumbnail}
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <Link to={`/courses/${course.id}`}>
            <Button size="sm" variant="secondary" className="bg-white/90 text-black hover:bg-white">
              <PlayCircle className="h-4 w-4 mr-2" />
              View Course
            </Button>
          </Link>
        </div>

        {/* Price badge */}
        {variant === 'default' && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-black/70 text-white border-0">
              {course.price === 0 ? 'Free' : `$${course.price}`}
            </Badge>
          </div>
        )}

        {/* Progress badge for enrolled courses */}
        {showProgress && (
          <div className="absolute top-3 right-3">
            <Badge variant="secondary" className="bg-black/70 text-white border-0">
              {Math.round(progress)}% Complete
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <Badge className={getLevelColor(course.level)} variant="outline">
              {course.level}
            </Badge>
            <h3 className="font-semibold text-lg mt-2 line-clamp-2 group-hover:text-primary transition-colors">
              {course.title}
            </h3>
          </div>
        </div>
        
        <p className="text-muted-foreground text-sm line-clamp-2 mt-2">
          {course.description}
        </p>
      </CardHeader>

      <CardContent className="pb-3">
        {/* Instructor */}
        <div className="flex items-center space-x-2 mb-3">
          <Avatar className="h-6 w-6">
            <AvatarImage src={course.instructor.avatar} />
            <AvatarFallback className="text-xs">
              {course.instructor.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-muted-foreground">
            {course.instructor.name}
          </span>
        </div>

        {/* Course stats */}
        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{course.duration}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span>{course.enrollmentCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{course.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>

        {/* Progress bar for enrolled courses */}
        {showProgress && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-medium">{completedLessons}/{totalLessons} lessons</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        )}

        {/* Category */}
        <div className="flex items-center justify-between mt-3">
          <Badge variant="outline" className="text-xs">
            {course.category}
          </Badge>
          
          {variant === 'enrolled' && (
            <div className="flex items-center space-x-1 text-success">
              <CheckCircle className="h-4 w-4" />
              <span className="text-sm font-medium">Enrolled</span>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        {variant === 'default' && !isEnrolled && (
          <Button
            className="w-full"
            onClick={() => onEnroll?.(course.id)}
            disabled={isEnrolling}
          >
            {isEnrolling ? 'Enrolling...' : `Enroll ${course.price === 0 ? 'for Free' : `- $${course.price}`}`}
          </Button>
        )}
        
        {variant === 'enrolled' || isEnrolled ? (
          <Button className="w-full" asChild>
            <Link to={`/courses/${course.id}`}>
              <BookOpen className="h-4 w-4 mr-2" />
              Continue Learning
            </Link>
          </Button>
        ) : null}

        {variant === 'instructor' && (
          <div className="flex space-x-2 w-full">
            <Button variant="outline" className="flex-1" asChild>
              <Link to={`/instructor/courses/${course.id}/edit`}>
                Edit
              </Link>
            </Button>
            <Button className="flex-1" asChild>
              <Link to={`/courses/${course.id}`}>
                View
              </Link>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default CourseCard;