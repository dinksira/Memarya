'use client';

import { TrendingUp, TrendingDown, Minus, Sparkles, Target, Clock, BookOpen, Trophy } from 'lucide-react';

interface Stat {
  label: { am: string; en: string };
  value: string;
  icon: string;
  color: 'green' | 'yellow' | 'blue' | 'red' | 'purple' | 'indigo' | 'orange'; // ADD orange
  trend?: {
    value: number;
    isPositive: boolean;
  };
  subtitle?: { am: string; en: string };
  progress?: number;
  target?: string;
}

interface StatsCardProps {
  stat: Stat;
  currentLang: string;
  variant?: 'default' | 'compact' | 'highlight';
  onClick?: () => void;
}

const colorClasses = {
  green: {
    bg: 'from-emerald-500/10 to-emerald-600/5 dark:from-emerald-500/15 dark:to-emerald-600/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    border: 'border-emerald-200 dark:border-emerald-800',
    progress: 'from-emerald-500 to-emerald-600',
    trend: 'text-emerald-600 dark:text-emerald-400'
  },
  yellow: {
    bg: 'from-amber-400/10 to-amber-500/5 dark:from-amber-400/15 dark:to-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400',
    border: 'border-amber-200 dark:border-amber-800',
    progress: 'from-amber-400 to-amber-500',
    trend: 'text-amber-600 dark:text-amber-400'
  },
  blue: {
    bg: 'from-blue-500/10 to-blue-600/5 dark:from-blue-500/15 dark:to-blue-600/10',
    text: 'text-blue-600 dark:text-blue-400',
    border: 'border-blue-200 dark:border-blue-800',
    progress: 'from-blue-500 to-blue-600',
    trend: 'text-blue-600 dark:text-blue-400'
  },
  red: {
    bg: 'from-rose-500/10 to-rose-600/5 dark:from-rose-500/15 dark:to-rose-600/10',
    text: 'text-rose-600 dark:text-rose-400',
    border: 'border-rose-200 dark:border-rose-800',
    progress: 'from-rose-500 to-rose-600',
    trend: 'text-rose-600 dark:text-rose-400'
  },
  purple: {
    bg: 'from-purple-500/10 to-purple-600/5 dark:from-purple-500/15 dark:to-purple-600/10',
    text: 'text-purple-600 dark:text-purple-400',
    border: 'border-purple-200 dark:border-purple-800',
    progress: 'from-purple-500 to-purple-600',
    trend: 'text-purple-600 dark:text-purple-400'
  },
  indigo: {
    bg: 'from-indigo-500/10 to-indigo-600/5 dark:from-indigo-500/15 dark:to-indigo-600/10',
    text: 'text-indigo-600 dark:text-indigo-400',
    border: 'border-indigo-200 dark:border-indigo-800',
    progress: 'from-indigo-500 to-indigo-600',
    trend: 'text-indigo-600 dark:text-indigo-400'
  },
  // ADD orange color
  orange: {
    bg: 'from-orange-500/10 to-orange-600/5 dark:from-orange-500/15 dark:to-orange-600/10',
    text: 'text-orange-600 dark:text-orange-400',
    border: 'border-orange-200 dark:border-orange-800',
    progress: 'from-orange-500 to-orange-600',
    trend: 'text-orange-600 dark:text-orange-400'
  }
};

const iconComponents: { [key: string]: React.ReactNode } = {
  '📚': <BookOpen className="h-6 w-6" />,
  '⏱️': <Clock className="h-6 w-6" />,
  '🏆': <Trophy className="h-6 w-6" />,
  '🎯': <Target className="h-6 w-6" />,
  '✨': <Sparkles className="h-6 w-6" />,
  '🔥': <Sparkles className="h-6 w-6" />, // ADD fire icon for streak
  '✅': <Trophy className="h-6 w-6" />, // ADD check icon for completed lessons
  '📊': <Target className="h-6 w-6" />, // ADD chart icon for average score
};

export function StatsCard({ stat, currentLang, variant = 'default', onClick }: StatsCardProps) {
  // Use the stat.color, fallback to blue if not found
  const colors = colorClasses[stat.color] || colorClasses.blue;
  const IconComponent = iconComponents[stat.icon] || <span className="text-2xl">{stat.icon}</span>;

  const getTrendIcon = () => {
    if (!stat.trend) return null;
    
    if (stat.trend.value === 0) return <Minus className="h-3 w-3" />;
    return stat.trend.isPositive ? 
      <TrendingUp className="h-3 w-3" /> : 
      <TrendingDown className="h-3 w-3" />;
  };

  if (variant === 'compact') {
    return (
      <div 
        className={`
          bg-gradient-to-br ${colors.bg} ${colors.border}
          border rounded-lg p-4 transition-all duration-200
          hover:shadow-md hover:scale-[1.02] cursor-pointer group
          ${onClick ? 'cursor-pointer' : 'cursor-default'}
        `}
        onClick={onClick}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-xs font-medium text-muted-foreground mb-1 truncate">
              {stat.label[currentLang]}
            </p>
            <p className="text-xl font-bold truncate">{stat.value}</p>
            {stat.subtitle && (
              <p className="text-xs text-muted-foreground mt-1 truncate">
                {stat.subtitle[currentLang]}
              </p>
            )}
          </div>
          <div className={`${colors.text} opacity-80 group-hover:scale-110 transition-transform`}>
            {IconComponent}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`
        bg-gradient-to-br ${colors.bg} ${colors.border}
        border rounded-xl p-6 transition-all duration-300
        hover:shadow-lg hover:scale-[1.02] group relative overflow-hidden
        ${variant === 'highlight' ? 'ring-2 ring-current ring-opacity-20' : ''}
        ${onClick ? 'cursor-pointer hover:border-current/30' : 'cursor-default'}
      `}
      onClick={onClick}
    >
      {/* Animated background effect */}
      <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300 ${colors.bg.replace('/10', '/20').replace('/15', '/25')}`} />
      
      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm font-medium text-muted-foreground mb-1 flex items-center gap-2">
              {stat.label[currentLang]}
              {variant === 'highlight' && (
                <Sparkles className="h-3 w-3 text-current animate-pulse" />
              )}
            </p>
            <p className="text-3xl font-bold">{stat.value}</p>
            
            {/* Subtitle */}
            {stat.subtitle && (
              <p className="text-sm text-muted-foreground mt-1">
                {stat.subtitle[currentLang]}
              </p>
            )}
          </div>
          
          {/* Icon */}
          <div className={`${colors.text} opacity-80 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300`}>
            {IconComponent}
          </div>
        </div>

        {/* Trend Indicator */}
        {stat.trend && (
          <div className="flex items-center gap-1 mb-3">
            <div className={`flex items-center gap-1 text-xs font-medium ${colors.trend}`}>
              {getTrendIcon()}
              <span>
                {stat.trend.value > 0 ? '+' : ''}{stat.trend.value}%
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {currentLang === 'am' ? 'ከመቼዎ' : 'from last week'}
            </span>
          </div>
        )}

        {/* Progress Bar */}
        {stat.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">
                {currentLang === 'am' ? 'ሂደት' : 'Progress'}
              </span>
              <span className="font-medium">{stat.progress}%</span>
            </div>
            <div className="w-full bg-white/50 dark:bg-black/20 rounded-full h-2 overflow-hidden">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${colors.progress} transition-all duration-1000 ease-out`}
                style={{ width: `${stat.progress}%` }}
              />
            </div>
            {stat.target && (
              <div className="flex justify-between items-center text-xs text-muted-foreground">
                <span>{currentLang === 'am' ? 'ዒላማ' : 'Target'}</span>
                <span>{stat.target}</span>
              </div>
            )}
          </div>
        )}

        {/* Additional Info */}
        {!stat.progress && stat.target && (
          <div className="flex items-center justify-between text-sm text-muted-foreground mt-2">
            <span>{currentLang === 'am' ? 'ዒላማ' : 'Target'}</span>
            <span className="font-medium">{stat.target}</span>
          </div>
        )}
      </div>

      {/* Corner accent */}
      <div className={`absolute top-0 right-0 w-8 h-8 bg-gradient-to-bl ${colors.bg.replace('/10', '/20').replace('/15', '/25')} rounded-bl-xl transition-opacity duration-300 opacity-0 group-hover:opacity-100`} />
    </div>
  );
}