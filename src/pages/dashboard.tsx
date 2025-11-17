import { useState } from 'react';
import { DashboardHeader } from '../components/dashboard-header';
import { Sidebar } from '../components/sidebar';
import { StatsCard } from '../components/stats-card';
import { LessonCard } from '../components/lesson-card';
import { ProgressChart } from '../components/progress-chart';

interface DashboardProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  t: (key: string) => string;
  onNavigation?: (page: string) => void;
  activePage?: string; // ADD THIS
}

export function Dashboard({ currentLang, onLanguageChange, t, onNavigation, activePage = 'dashboard' }: DashboardProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  console.log('Dashboard: onNavigation prop:', onNavigation ? 'provided' : 'not provided');
  console.log('Dashboard: activePage:', activePage);

  const stats = [
    {
      label: { am: 'ጠቅላላ ትምህርቶች', en: 'Total Lessons' },
      value: '24',
      icon: '📚',
      color: 'blue' as const,
      progress: 75,
      target: '32'
    },
    {
      label: { am: 'የተጠናቀቁ', en: 'Completed' },
      value: '18',
      icon: '🏆',
      color: 'green' as const,
      trend: { value: 8, isPositive: true },
      subtitle: { am: 'በዚህ ወር', en: 'this month' }
    },
    {
      label: { am: 'የተጠፉ ሰዓታት', en: 'Hours Spent' },
      value: '36h',
      icon: '⏱️',
      color: 'purple' as const,
      progress: 60,
      target: '60h'
    },
    {
      label: { am: 'የአሁን ተከታታይ', en: 'Current Streak' },
      value: '12',
      icon: '✨',
      color: 'yellow' as const,
      trend: { value: 3, isPositive: true },
      subtitle: { am: 'ተከታታይ ቀናት', en: 'days in a row' }
    }
  ];

  const recentLessons = [
    {
      id: 1,
      title: { 
        am: 'የአማርኛ ፊደል መሠረታዊ', 
        en: 'Amharic Alphabet Basics' 
      },
      description: { 
        am: 'የግዕዝ ፊደል መሠረታዊ ነገሮችን ይማሩ', 
        en: 'Learn the fundamentals of Ge\'ez script' 
      },
      difficulty: 'beginner' as const,
      progress: 100,
      duration: 30,
      completed: true,
      objectives: [
        { am: '33 ፊደላትን መግለፅ', en: 'Identify 33 letters' },
        { am: 'መሠረታዊ ድምጾች', en: 'Basic sounds' }
      ],
      category: 'Alphabet',
      rating: 4.8,
      enrolled: 1247
    },
    {
      id: 2,
      title: { 
        am: 'መሠረታዊ ሰላምታዎች', 
        en: 'Common Greetings' 
      },
      description: { 
        am: 'ለዕለት ተዕለት ውይይት አስፈላጊ ሐረጎች', 
        en: 'Essential phrases for daily conversations' 
      },
      difficulty: 'beginner' as const,
      progress: 75,
      duration: 45,
      completed: false,
      objectives: [
        { am: 'መደበኛ ሰላምታዎች', en: 'Formal greetings' },
        { am: 'ዕለት ተዕለት ሐረጎች', en: 'Daily phrases' }
      ],
      category: 'Conversation',
      rating: 4.6,
      enrolled: 893
    }
  ];

  const handleLessonClick = (lessonId: number) => {
    console.log('Opening lesson:', lessonId);
  };

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar - PASS activePage prop */}
      <Sidebar 
        currentLang={currentLang}
        t={t}
        isMobileOpen={isMobileOpen}
        onMobileClose={() => setIsMobileOpen(false)}
        onNavigation={onNavigation}
        activePage={activePage} // ADD THIS
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        <DashboardHeader 
          currentLang={currentLang}
          onLanguageChange={onLanguageChange}
          t={t}
          userName="ዳዊት"
        />
        
        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Welcome Section */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {t('welcome_back')}, <span className="text-primary">ዳዊት!</span>
              </h2>
              <p className="text-muted-foreground text-lg">
                {currentLang === 'am' ? 'የአማርኛ ትምህርትዎን ይቀጥሉ' : 'Continue your Amharic learning journey'}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <StatsCard
                  key={index}
                  stat={stat}
                  currentLang={currentLang}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Recent Lessons */}
              <div className="lg:col-span-2">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-foreground">
                    {t('recent_lessons')}
                  </h3>
                  <button 
                    className="text-primary hover:text-primary/80 text-sm font-medium"
                    onClick={() => onNavigation?.('lessons')}
                  >
                    {t('view_all')}
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {recentLessons.map((lesson) => (
                    <LessonCard
                      key={lesson.id}
                      lesson={lesson}
                      currentLang={currentLang}
                      t={t}
                      onLessonClick={handleLessonClick}
                    />
                  ))}
                </div>
              </div>

              {/* Progress Chart */}
              <div className="lg:col-span-1">
                <ProgressChart currentLang={currentLang} />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}