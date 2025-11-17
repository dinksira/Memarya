'use client';

import { Sparkles, Lock, CheckCircle, Clock } from 'lucide-react';

interface AchievementCardProps {
  achievement: {
    id: number;
    title: { am: string; en: string };
    description: { am: string; en: string };
    category: 'learning' | 'vocabulary' | 'streak' | 'speaking' | 'writing' | 'competition' | 'projects' | 'translation';
    rarity: 'common' | 'rare' | 'epic' | 'legendary' | 'mythic';
    unlocked: boolean;
    progress: number;
    points: number;
    icon: string;
    unlockedDate: string | null;
    requirements: { am: string; en: string }[];
    reward: { am: string; en: string };
  };
  currentLang: string;
  t: (key: string) => string;
  formatDate: (dateString: string) => string;
}

export function AchievementCard({ achievement, currentLang, t, formatDate }: AchievementCardProps) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-600';
      case 'rare': return 'from-blue-400 to-blue-600';
      case 'epic': return 'from-purple-400 to-purple-600';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'mythic': return 'from-red-400 to-pink-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getRarityText = (rarity: string) => {
    switch (rarity) {
      case 'common': return currentLang === 'am' ? 'መደበኛ' : 'Common';
      case 'rare': return currentLang === 'am' ? 'ልዩ' : 'Rare';
      case 'epic': return currentLang === 'am' ? 'አስደናቂ' : 'Epic';
      case 'legendary': return currentLang === 'am' ? 'አምላካዊ' : 'Legendary';
      case 'mythic': return currentLang === 'am' ? 'አፍቃሪ' : 'Mythic';
      default: return rarity;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'learning': return '📚';
      case 'vocabulary': return '📖';
      case 'streak': return '🔥';
      case 'speaking': return '🎤';
      case 'writing': return '✍️';
      case 'competition': return '🥇';
      case 'projects': return '📁';
      case 'translation': return '🌍';
      default: return '🏆';
    }
  };

  return (
    <div className={`
      bg-card border border-border rounded-xl p-6 transition-all duration-300
      hover:shadow-lg group relative overflow-hidden
      ${achievement.unlocked ? 'opacity-100' : 'opacity-75'}
    `}>
      {/* Background gradient based on rarity */}
      <div className={`absolute inset-0 bg-gradient-to-br opacity-5 ${getRarityColor(achievement.rarity)}`} />
      
      {/* Shine effect for unlocked achievements */}
      {achievement.unlocked && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      )}

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`
              w-16 h-16 rounded-2xl flex items-center justify-center text-2xl
              bg-gradient-to-br ${getRarityColor(achievement.rarity)} text-white
              relative overflow-hidden
            `}>
              {/* Icon */}
              <span className="relative z-10">{achievement.icon}</span>
              
              {/* Shine effect */}
              <div className="absolute inset-0 bg-white/20 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>
            
            <div className="flex-1">
              <h3 className="font-bold text-foreground text-lg leading-tight">
                {achievement.title[currentLang]}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {achievement.description[currentLang]}
              </p>
            </div>
          </div>

          {/* Status Icon */}
          <div className={`
            p-2 rounded-full
            ${achievement.unlocked 
              ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400' 
              : 'bg-muted text-muted-foreground'
            }
          `}>
            {achievement.unlocked ? (
              <CheckCircle className="h-5 w-5" />
            ) : (
              <Lock className="h-5 w-5" />
            )}
          </div>
        </div>

        {/* Rarity and Category */}
        <div className="flex items-center gap-2 mb-4">
          <span className={`
            px-2 py-1 text-xs font-bold rounded-full
            bg-gradient-to-r ${getRarityColor(achievement.rarity)} text-white
          `}>
            {getRarityText(achievement.rarity)}
          </span>
          <span className="flex items-center gap-1 px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full">
            <span>{getCategoryIcon(achievement.category)}</span>
            <span>
              {achievement.category === 'learning' ? (currentLang === 'am' ? 'ትምህርት' : 'Learning') :
               achievement.category === 'vocabulary' ? (currentLang === 'am' ? 'ቃላት' : 'Vocabulary') :
               achievement.category === 'streak' ? (currentLang === 'am' ? 'ተከታታይ' : 'Streak') :
               achievement.category === 'speaking' ? (currentLang === 'am' ? 'ንግግር' : 'Speaking') :
               achievement.category === 'writing' ? (currentLang === 'am' ? 'ጽሑፍ' : 'Writing') :
               achievement.category === 'competition' ? (currentLang === 'am' ? 'ውድድር' : 'Competition') :
               achievement.category === 'projects' ? (currentLang === 'am' ? 'ፕሮጀክቶች' : 'Projects') :
               (currentLang === 'am' ? 'ትርጉም' : 'Translation')}
            </span>
          </span>
        </div>

        {/* Progress Bar */}
        {!achievement.unlocked && (
          <div className="mb-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">
                {currentLang === 'am' ? 'ሂደት' : 'Progress'}
              </span>
              <span className="font-medium">{achievement.progress}%</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 rounded-full bg-gradient-to-r ${getRarityColor(achievement.rarity)} transition-all duration-1000`}
                style={{ width: `${achievement.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Requirements */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            {currentLang === 'am' ? 'ለማግኘት ያስፈልጋል' : 'Requirements'}
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            {achievement.requirements.map((req, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className={`w-1.5 h-1.5 rounded-full ${
                  achievement.unlocked ? 'bg-green-500' : 'bg-muted-foreground'
                }`} />
                {req[currentLang]}
              </li>
            ))}
          </ul>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <div className={`px-2 py-1 rounded text-xs font-bold ${
              achievement.unlocked 
                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                : 'bg-muted text-muted-foreground'
            }`}>
              {achievement.points} {currentLang === 'am' ? 'ነጥቦች' : 'points'}
            </div>
          </div>

          <div className="text-right">
            {achievement.unlocked && achievement.unlockedDate ? (
              <div className="text-xs text-muted-foreground">
                {currentLang === 'am' ? 'ተገኝቷል' : 'Unlocked'} {formatDate(achievement.unlockedDate)}
              </div>
            ) : (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {currentLang === 'am' ? 'በሂደት ላይ' : 'In Progress'}
              </div>
            )}
          </div>
        </div>

        {/* Reward */}
        <div className="mt-3 p-3 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg border border-primary/10">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">
              {currentLang === 'am' ? 'ሽልማት' : 'Reward'}
            </span>
            <span className="font-bold text-primary">
              {achievement.reward[currentLang]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}