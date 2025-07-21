import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Clock,
  PlayCircle,
  CheckCircle,
  Lock,
  FileText,
  Video
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface LessonCardProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    duration: string;
    videoUrl?: string;
    content: string;
    order: number;
    isCompleted?: boolean;
    courseId: string;
  };
  isLocked?: boolean;
  onMarkComplete?: (lessonId: string) => void;
  isMarkingComplete?: boolean;
  variant?: 'default' | 'compact';
}

const LessonCard: React.FC<LessonCardProps> = ({
  lesson,
  isLocked = false,
  onMarkComplete,
  isMarkingComplete = false,
  variant = 'default'
}) => {
  const handleMarkComplete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onMarkComplete?.(lesson.id);
  };

  if (variant === 'compact') {
    return (
      <Link
        to={isLocked ? '#' : `/courses/${lesson.courseId}/lessons/${lesson.id}`}
        className={cn(
          'block group',
          isLocked && 'cursor-not-allowed'
        )}
      >
        <Card className={cn(
          'transition-all duration-200 hover:shadow-soft',
          lesson.isCompleted && 'ring-2 ring-success/20 bg-success/5',
          isLocked && 'opacity-60',
          !isLocked && 'hover:-translate-y-0.5'
        )}>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              {/* Order number */}
              <div className={cn(
                'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium',
                lesson.isCompleted
                  ? 'bg-success text-white'
                  : isLocked
                  ? 'bg-muted text-muted-foreground'
                  : 'bg-primary text-primary-foreground'
              )}>
                {lesson.isCompleted ? (
                  <CheckCircle className="h-4 w-4" />
                ) : isLocked ? (
                  <Lock className="h-4 w-4" />
                ) : (
                  lesson.order
                )}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className={cn(
                    'font-medium text-sm truncate',
                    lesson.isCompleted && 'line-through text-muted-foreground'
                  )}>
                    {lesson.title}
                  </h4>
                  
                  {lesson.videoUrl ? (
                    <Video className="h-4 w-4 text-primary flex-shrink-0" />
                  ) : (
                    <FileText className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                  )}
                </div>
                
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Clock className="h-3 w-3" />
                  <span>{lesson.duration}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2">
                {!isLocked && lesson.isCompleted && (
                  <Badge variant="outline" className="text-success border-success/20 bg-success/10">
                    Complete
                  </Badge>
                )}
                
                {!isLocked && !lesson.isCompleted && (
                  <PlayCircle className="h-5 w-5 text-primary group-hover:text-primary/80 transition-colors" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Card className={cn(
      'group transition-all duration-200 hover:shadow-medium',
      lesson.isCompleted && 'ring-2 ring-success/20 bg-success/5',
      isLocked && 'opacity-60',
      !isLocked && 'hover:-translate-y-1'
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn(
              'flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-medium',
              lesson.isCompleted
                ? 'bg-success text-white'
                : isLocked
                ? 'bg-muted text-muted-foreground'
                : 'bg-primary text-primary-foreground'
            )}>
              {lesson.isCompleted ? (
                <CheckCircle className="h-5 w-5" />
              ) : isLocked ? (
                <Lock className="h-5 w-5" />
              ) : (
                lesson.order
              )}
            </div>
            
            <div>
              <h3 className={cn(
                'font-semibold text-lg',
                lesson.isCompleted && 'line-through text-muted-foreground'
              )}>
                {lesson.title}
              </h3>
              
              <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Clock className="h-4 w-4" />
                  <span>{lesson.duration}</span>
                </div>
                
                <div className="flex items-center space-x-1">
                  {lesson.videoUrl ? (
                    <>
                      <Video className="h-4 w-4" />
                      <span>Video</span>
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4" />
                      <span>Reading</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {lesson.isCompleted && (
            <Badge variant="outline" className="text-success border-success/20 bg-success/10">
              Completed
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground mb-4 line-clamp-2">
          {lesson.description}
        </p>

        <div className="flex items-center justify-between">
          {!isLocked ? (
            <div className="flex space-x-2">
              <Button asChild>
                <Link to={`/courses/${lesson.courseId}/lessons/${lesson.id}`}>
                  <PlayCircle className="h-4 w-4 mr-2" />
                  {lesson.isCompleted ? 'Review' : 'Start Lesson'}
                </Link>
              </Button>
              
              {!lesson.isCompleted && onMarkComplete && (
                <Button
                  variant="outline"
                  onClick={handleMarkComplete}
                  disabled={isMarkingComplete}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  {isMarkingComplete ? 'Marking...' : 'Mark Complete'}
                </Button>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Lock className="h-4 w-4" />
              <span className="text-sm">Complete previous lessons to unlock</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default LessonCard;