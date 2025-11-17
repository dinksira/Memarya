'use client';

import { useState } from 'react';
import { Button } from './ui/button';
// REMOVE: import { Language } from '../lib/translations';
import { 
  Play, CheckCircle2, Clock, ChevronRight, Target,
  Star, Users, Eye, EyeOff
} from 'lucide-react';

interface Lesson {
  id: number;
  title: { am: string; en: string };
  description: { am: string; en: string };
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  progress: number;
  duration: number;
  completed: boolean;
  objectives: Array<{ am: string; en: string }>;
  category?: string;
  rating?: number;
  enrolled?: number;
  isPremium?: boolean;
}

interface LessonCardProps {
  lesson: Lesson;
  currentLang: string; // Change to string
  t: (key: string) => string;
  variant?: 'default' | 'compact' | 'featured';
  onLessonClick?: (lessonId: number) => void;
}

const difficultyColors = {
  beginner: {
    bg: 'bg-green-100 dark:bg-green-900/30',
    text: 'text-green-700 dark:text-green-400',
    border: 'border-green-200 dark:border-green-800',
    gradient: 'from-green-400 to-green-600'
  },
  intermediate: {
    bg: 'bg-yellow-100 dark:bg-yellow-900/30',
    text: 'text-yellow-700 dark:text-yellow-400',
    border: 'border-yellow-200 dark:border-yellow-800',
    gradient: 'from-yellow-400 to-yellow-600'
  },
  advanced: {
    bg: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-700 dark:text-red-400',
    border: 'border-red-200 dark:border-red-800',
    gradient: 'from-red-400 to-red-600'
  },
};

export function LessonCard({ 
  lesson, 
  currentLang, 
  t, 
  variant = 'default',
  onLessonClick 
}: LessonCardProps) {
  const [showObjectives, setShowObjectives] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const diffColors = difficultyColors[lesson.difficulty];

  const getButtonVariant = () => {
    if (lesson.completed) return 'secondary';
    if (lesson.progress > 0) return 'default';
    return 'default';
  };

  const getButtonText = () => {
    if (lesson.completed) return t('review');
    if (lesson.progress > 0) return t('continue');
    return t('start');
  };

  const getButtonIcon = () => {
    if (lesson.completed) return <CheckCircle2 className="h-4 w-4" />;
    return <Play className="h-4 w-4" />;
  };

  const handleClick = () => {
    if (onLessonClick) {
      onLessonClick(lesson.id);
    }
  };

  if (variant === 'compact') {
    return (
      <div 
        className="bg-card border border-border rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className={`text-xs font-semibold px-2 py-1 rounded-full ${diffColors.bg} ${diffColors.text} ${diffColors.border}`}>
                {t(lesson.difficulty)}
              </span>
              {lesson.isPremium && (
                <span className="text-xs bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-2 py-1 rounded-full font-semibold">
                  ★ {t('premium')}
                </span>
              )}
            </div>
            
            <h3 className="font-semibold text-foreground truncate">
              {lesson.title[currentLang]}
            </h3>
            
            <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {lesson.duration} {t('minutes')}
              </span>
              {lesson.rating && (
                <span className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  {lesson.rating}
                </span>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-3 ml-4">
            {/* Progress Circle */}
            <div className="relative w-12 h-12">
              <svg className="w-12 h-12 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="currentColor"
                  strokeOpacity="0.1"
                  strokeWidth="2"
                />
                <path
                  d="M18 2.0845
                    a 15.9155 15.9155 0 0 1 0 31.831
                    a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="100"
                  strokeDashoffset={100 - lesson.progress}
                  className="transition-all duration-1000 ease-out"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="currentColor" className="text-primary" />
                    <stop offset="100%" stopColor="currentColor" className="text-secondary" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-xs font-bold text-foreground">
                  {lesson.progress}%
                </span>
              </div>
            </div>
            
            <ChevronRight className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''}`} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <article 
      className={`
        bg-card border border-border rounded-xl p-6 shadow-sm
        transition-all duration-300 hover:shadow-lg hover:border-primary/30
        group cursor-pointer relative overflow-hidden
        ${variant === 'featured' ? 'ring-2 ring-primary/20' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium Badge */}
      {lesson.isPremium && (
        <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg z-10">
          ★ {t('premium')}
        </div>
      )}

      {/* Background Pattern on Hover */}
      <div className={`absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

      {/* Card Header */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3 flex-wrap">
              <span className={`text-sm font-semibold px-3 py-1.5 rounded-full border ${diffColors.bg} ${diffColors.text} ${diffColors.border}`}>
                {t(lesson.difficulty)}
              </span>
              
              {lesson.category && (
                <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full font-medium">
                  {lesson.category}
                </span>
              )}
              
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowTranslation(!showTranslation);
                }}
                className="p-1.5 rounded-lg bg-muted hover:bg-accent transition-colors"
                aria-label={t('toggle_translation')}
              >
                {showTranslation ? (
                  <EyeOff className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <Eye className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
            </div>
            
            <h3 className="text-xl font-bold mb-3 text-balance group-hover:text-primary transition-colors">
              {lesson.title[currentLang]}
            </h3>
            
            <p className="text-sm text-muted-foreground text-pretty leading-relaxed">
              {lesson.description[currentLang]}
            </p>
            
            {showTranslation && (
              <p className="text-sm text-muted-foreground/60 mt-2 italic border-l-2 border-primary pl-3 py-1">
                {lesson.description[currentLang === 'am' ? 'en' : 'am']}
              </p>
            )}
          </div>
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            {lesson.duration} {t('minutes')}
          </span>
          
          {lesson.rating && (
            <span className="flex items-center gap-1.5">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              {lesson.rating}/5.0
            </span>
          )}
          
          {lesson.enrolled && (
            <span className="flex items-center gap-1.5">
              <Users className="h-4 w-4" />
              {lesson.enrolled}
            </span>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              {t('progress')}
            </span>
            <span className="text-sm font-bold text-foreground">
              {lesson.progress}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
              style={{ width: `${lesson.progress}%` }}
              role="progressbar"
              aria-valuenow={lesson.progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Learning Objectives (Collapsible) */}
        <div className="mb-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowObjectives(!showObjectives);
            }}
            className="flex items-center gap-2 text-sm font-semibold text-foreground hover:text-primary transition-colors group/button"
          >
            <ChevronRight className={`h-4 w-4 transition-transform duration-200 ${showObjectives ? 'rotate-90' : ''}`} />
            {t('learning_objectives')}
            <span className="text-xs text-muted-foreground ml-1">
              ({lesson.objectives.length})
            </span>
          </button>
          
          {showObjectives && (
            <ul className="mt-3 space-y-2 animate-in fade-in duration-200">
              {lesson.objectives.map((objective, index) => (
                <li key={index} className="flex items-start gap-3 text-sm">
                  <div className={`p-1 rounded-full mt-0.5 ${diffColors.bg}`}>
                    <div className={`h-2 w-2 rounded-full ${diffColors.text}`} />
                  </div>
                  <div className="flex-1">
                    <span className="text-foreground">
                      {objective[currentLang]}
                    </span>
                    {showTranslation && (
                      <div className="text-xs text-muted-foreground mt-1">
                        {objective[currentLang === 'am' ? 'en' : 'am']}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Card Footer */}
      <div className="relative z-10 flex items-center justify-between pt-4 border-t border-border">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {lesson.completed && (
            <span className="flex items-center gap-1.5 text-green-600 font-medium">
              <CheckCircle2 className="h-4 w-4" />
              {t('completed')}
            </span>
          )}
        </div>
        
        <Button 
          variant={getButtonVariant()}
          className="flex items-center gap-2 transition-all duration-200 group/button hover:scale-105"
          size={variant === 'featured' ? 'lg' : 'default'}
          onClick={handleClick}
        >
          {getButtonIcon()}
          {getButtonText()}
        </Button>
      </div>
    </article>
  );
}