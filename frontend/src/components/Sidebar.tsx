import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  Users,
  BarChart3,
  Settings,
  GraduationCap,
  PlusCircle,
  FolderOpen,
  Target,
  Award,
  UserCheck,
  TrendingUp,
  Calendar,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();
  const location = useLocation();

  const getMenuItems = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
          { icon: Users, label: 'Users', path: '/admin/users' },
          { icon: BookOpen, label: 'Courses', path: '/admin/courses' },
          { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
          { icon: TrendingUp, label: 'Reports', path: '/admin/reports' },
          { icon: Settings, label: 'Settings', path: '/admin/settings' },
        ];
      case 'instructor':
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/instructor' },
          { icon: FolderOpen, label: 'My Courses', path: '/instructor/courses' },
          { icon: PlusCircle, label: 'Create Course', path: '/instructor/create-course' },
          { icon: Users, label: 'Students', path: '/instructor/students' },
          { icon: BarChart3, label: 'Analytics', path: '/instructor/analytics' },
          { icon: Calendar, label: 'Schedule', path: '/instructor/schedule' },
        ];
      default: // student
        return [
          { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
          { icon: BookOpen, label: 'All Courses', path: '/courses' },
          { icon: GraduationCap, label: 'My Courses', path: '/dashboard/my-courses' },
          { icon: Target, label: 'Progress', path: '/dashboard/progress' },
          { icon: Award, label: 'Achievements', path: '/dashboard/achievements' },
          { icon: Calendar, label: 'Schedule', path: '/dashboard/schedule' },
        ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed left-0 top-0 h-full w-64 bg-card border-r border-border shadow-medium z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:z-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border lg:hidden">
          <div className="flex items-center space-x-2">
            <div className="bg-gradient-primary p-2 rounded-lg">
              <GraduationCap className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">EduPlatform</span>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* User info */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-medium">
                {user?.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{user?.name}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={cn(
                  'flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-4 left-4 right-4">
          <Link
            to="/settings"
            onClick={onClose}
            className="flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-all duration-200"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;