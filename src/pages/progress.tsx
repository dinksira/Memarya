import { useState } from 'react';
import { DashboardHeader } from '../components/dashboard-header';
import { Sidebar } from '../components/sidebar';
import { StatsCard } from '../components/stats-card';
import { ProgressChart } from '../components/progress-chart';

interface ProgressProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  t: (key: string) => string;
  onNavigation?: (page: string) => void;
  activePage?: string;
}

export function Progress({ currentLang, onLanguageChange, t, onNavigation, activePage = 'progress' }: ProgressProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('month');

  // Progress statistics
  const progressStats = [
    {
      label: { am: 'ጠቅላላ የተማሩ ቃላት', en: 'Total Words Learned' },
      value: '1,247',
      icon: '📚',
      color: 'blue' as const,
      progress: 62,
      target: '2,000'
    },
    {
      label: { am: 'የአሁን ተከታታይ', en: 'Current Streak' },
      value: '24',
      icon: '🔥',
      color: 'orange' as const,
      trend: { value: 8, isPositive: true },
      subtitle: { am: 'ተከታታይ ቀናት', en: 'days in a row' }
    },
    {
      label: { am: 'የተጠናቀቁ ትምህርቶች', en: 'Lessons Completed' },
      value: '42',
      icon: '✅',
      color: 'green' as const,
      progress: 70,
      target: '60'
    },
    {
      label: { am: 'አማካይ ውጤት', en: 'Average Score' },
      value: '87%',
      icon: '📊',
      color: 'purple' as const,
      trend: { value: 5, isPositive: true },
      subtitle: { am: 'ከመጨረሻው ጊዜ', en: 'since last time' }
    }
  ];

  // Skill progress data
  const skillProgress = [
    {
      skill: { am: 'ፊደል', en: 'Alphabet' },
      level: 95,
      progress: 95,
      icon: '🔤',
      description: { am: '33 ፊደላት ተማሩ', en: '33 letters mastered' }
    },
    {
      skill: { am: 'ቃላት', en: 'Vocabulary' },
      level: 78,
      progress: 78,
      icon: '📖',
      description: { am: '1,247 ቃላት ተማሩ', en: '1,247 words learned' }
    },
    {
      skill: { am: 'ሰዋሰው', en: 'Grammar' },
      level: 65,
      progress: 65,
      icon: '📝',
      description: { am: 'መሠረታዊ ሰዋሰው ተማሩ', en: 'Basic grammar mastered' }
    },
    {
      skill: { am: 'ንግግር', en: 'Speaking' },
      level: 45,
      progress: 45,
      icon: '🎤',
      description: { am: 'መሠረታዊ ንግግር ችለዋል', en: 'Basic conversation skills' }
    },
    {
      skill: { am: 'መስማት', en: 'Listening' },
      level: 72,
      progress: 72,
      icon: '👂',
      description: { am: 'የተለመዱ ሐረጎች ይለያሉ', en: 'Understand common phrases' }
    },
    {
      skill: { am: 'ጽሑፍ', en: 'Writing' },
      level: 58,
      progress: 58,
      icon: '✍️',
      description: { am: 'መሠረታዊ አረፍተ ነገሮች ይጽፋሉ', en: 'Write basic sentences' }
    }
  ];

  // Recent activity data
  const recentActivity = [
    {
      id: 1,
      type: 'lesson',
      title: { am: 'የቤተሰብ ቃላት', en: 'Family Vocabulary' },
      description: { am: 'ትምህርት ተጠናቀቀ', en: 'Lesson completed' },
      score: 92,
      date: '2024-01-15',
      time: '14:30',
      icon: '📚'
    },
    {
      id: 2,
      type: 'challenge',
      title: { am: 'ፈጣን ቃላት ፈተና', en: 'Quick Vocabulary Test' },
      description: { am: 'ስግተት ተጠናቀቀ', en: 'Challenge completed' },
      score: 85,
      date: '2024-01-15',
      time: '12:15',
      icon: '🎯'
    },
    {
      id: 3,
      type: 'project',
      title: { am: 'የምግብ ማብሰያ መመሪያ', en: 'Recipe Instruction Guide' },
      description: { am: 'ፕሮጀክት ተጠናቀቀ', en: 'Project completed' },
      score: 88,
      date: '2024-01-14',
      time: '16:45',
      icon: '📁'
    },
    {
      id: 4,
      type: 'streak',
      title: { am: 'የቀን ዒላማ', en: 'Daily Goal' },
      description: { am: 'ዕለታዊ ዒላማ ተጠናቀቀ', en: 'Daily goal achieved' },
      score: 100,
      date: '2024-01-14',
      time: '20:00',
      icon: '⭐'
    },
    {
      id: 5,
      type: 'lesson',
      title: { am: 'መሠረታዊ ሰላምታዎች', en: 'Basic Greetings' },
      description: { am: 'ትምህርት ተጠናቀቀ', en: 'Lesson completed' },
      score: 95,
      date: '2024-01-13',
      time: '11:20',
      icon: '📚'
    }
  ];

  // Level progression
  const levels = [
    { level: 1, name: { am: 'መጀመሪያ', en: 'Beginner' }, points: 0, completed: true },
    { level: 2, name: { am: 'መሠረታዊ', en: 'Basic' }, points: 500, completed: true },
    { level: 3, name: { am: 'መካከለኛ', en: 'Intermediate' }, points: 1200, completed: true },
    { level: 4, name: { am: 'ላቀ', en: 'Advanced' }, points: 2500, completed: false },
    { level: 5, name: { am: 'ባለሙያ', en: 'Expert' }, points: 5000, completed: false },
    { level: 6, name: { am: 'አማርኛ አማርኛ', en: 'Amharic Native' }, points: 10000, completed: false }
  ];

  const currentPoints = 1876; // User's current points
  const currentLevel = levels.find(level => !level.completed) || levels[levels.length - 1];
  const nextLevel = levels.find(level => level.points > currentPoints) || levels[levels.length - 1];
  const progressToNextLevel = ((currentPoints - currentLevel.points) / (nextLevel.points - currentLevel.points)) * 100;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return currentLang === 'am' 
      ? date.toLocaleDateString('am-ET')
      : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getLevelColor = (level: number) => {
    const colors = [
      'bg-blue-500',
      'bg-green-500',
      'bg-yellow-500',
      'bg-orange-500',
      'bg-red-500',
      'bg-purple-500'
    ];
    return colors[level - 1] || colors[0];
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar 
        currentLang={currentLang}
        t={t}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
        onNavigation={onNavigation}
        activePage={activePage}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        <DashboardHeader 
          currentLang={currentLang}
          onLanguageChange={onLanguageChange}
          t={t}
          userName="ዳዊት"
        />
        
        {/* Progress Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center lg:text-left">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {t('progress')}
              </h1>
              <p className="text-muted-foreground text-lg">
                {currentLang === 'am' 
                  ? 'የአማርኛ ትምህርትዎን ሂደት ይመልከቱ' 
                  : 'Track your Amharic learning journey'
                }
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {progressStats.map((stat, index) => (
                <StatsCard
                  key={index}
                  stat={stat}
                  currentLang={currentLang}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Skills and Level Progress */}
              <div className="lg:col-span-2 space-y-8">
                {/* Level Progress */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold text-foreground">
                      {currentLang === 'am' ? 'የደረጃ ሂደት' : 'Level Progress'}
                    </h2>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-primary">{currentPoints} pts</div>
                      <div className="text-sm text-muted-foreground">
                        {currentLang === 'am' ? 'የአሁን ነጥቦች' : 'Current Points'}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">
                        {currentLevel.name[currentLang]} {currentLevel.level}
                      </span>
                      <span className="font-bold text-foreground">
                        {nextLevel.name[currentLang]} {nextLevel.level}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-4">
                      <div 
                        className="h-4 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                        style={{ width: `${progressToNextLevel}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>{currentLevel.points} pts</span>
                      <span>{nextLevel.points} pts</span>
                    </div>
                  </div>

                  {/* Level Indicators */}
                  <div className="flex justify-between items-center">
                    {levels.map((level) => (
                      <div key={level.level} className="flex flex-col items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                          level.completed ? getLevelColor(level.level) : 'bg-muted'
                        }`}>
                          {level.level}
                        </div>
                        <div className="text-xs text-muted-foreground mt-1 text-center">
                          {level.name[currentLang]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills Progress */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h2 className="text-xl font-bold text-foreground mb-6">
                    {currentLang === 'am' ? 'የችሎታ ሂደት' : 'Skills Progress'}
                  </h2>
                  <div className="space-y-4">
                    {skillProgress.map((skill, index) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className="text-2xl">{skill.icon}</div>
                        <div className="flex-1">
                          <div className="flex justify-between mb-1">
                            <span className="font-medium text-foreground">
                              {skill.skill[currentLang]}
                            </span>
                            <span className="text-sm font-bold text-primary">
                              {skill.level}%
                            </span>
                          </div>
                          <div className="w-full bg-muted rounded-full h-3">
                            <div 
                              className="h-3 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                              style={{ width: `${skill.progress}%` }}
                            />
                          </div>
                          <div className="text-xs text-muted-foreground mt-1">
                            {skill.description[currentLang]}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column - Charts and Activity */}
              <div className="lg:col-span-1 space-y-8">
                {/* Progress Chart */}
                <ProgressChart currentLang={currentLang} />

                {/* Time Range Selector */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-bold text-foreground">
                      {currentLang === 'am' ? 'የጊዜ ክልል' : 'Time Range'}
                    </h3>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'week', name: { am: 'ሳምንት', en: 'Week' } },
                      { id: 'month', name: { am: 'ወር', en: 'Month' } },
                      { id: 'year', name: { am: 'ዓመት', en: 'Year' } }
                    ].map((range) => (
                      <button
                        key={range.id}
                        onClick={() => setTimeRange(range.id as any)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          timeRange === range.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground hover:bg-muted/80'
                        }`}
                      >
                        {range.name[currentLang]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {currentLang === 'am' ? 'የቅርብ እንቅስቃሴ' : 'Recent Activity'}
                  </h3>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg bg-accent/50">
                        <div className="text-xl">{activity.icon}</div>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">
                            {activity.title[currentLang]}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {activity.description[currentLang]}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <span>{formatDate(activity.date)}</span>
                            <span>•</span>
                            <span>{activity.time}</span>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded text-xs font-bold ${
                          activity.score >= 90 ? 'bg-green-100 text-green-800' :
                          activity.score >= 80 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {activity.score}%
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Achievements Preview */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {currentLang === 'am' ? 'የቅርብ ምስክር ወረቀቶች' : 'Recent Badges'}
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      { icon: '🔥', name: { am: '24 ቀን ተከታታይ', en: '24 Day Streak' } },
                      { icon: '📚', name: { am: '40+ ትምህርቶች', en: '40+ Lessons' } },
                      { icon: '💬', name: { am: 'የውይይት ሻምፒዮን', en: 'Conversation Champ' } }
                    ].map((badge, index) => (
                      <div key={index} className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-lg mx-auto mb-2">
                          {badge.icon}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {badge.name[currentLang]}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}