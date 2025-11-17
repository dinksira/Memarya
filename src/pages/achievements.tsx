import { useState } from 'react';
import { DashboardHeader } from '../components/dashboard-header';
import { Sidebar } from '../components/sidebar';
import { AchievementCard } from '../components/achievement-card';
import { StatsCard } from '../components/stats-card';

interface AchievementsProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  t: (key: string) => string;
  onNavigation?: (page: string) => void;
  activePage?: string;
}

export function Achievements({ currentLang, onLanguageChange, t, onNavigation, activePage = 'achievements' }: AchievementsProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Achievement statistics
  const achievementStats = [
    {
      label: { am: 'ጠቅላላ ምስክር ወረቀቶች', en: 'Total Badges' },
      value: '24',
      icon: '🏆',
      color: 'yellow' as const,
      progress: 60,
      target: '40'
    },
    {
      label: { am: 'የወር ሻምፒዮን', en: 'Monthly Champion' },
      value: '3',
      icon: '⭐',
      color: 'purple' as const,
      trend: { value: 2, isPositive: true },
      subtitle: { am: 'የወር አሸናፊ', en: 'monthly wins' }
    },
    {
      label: { am: 'የተሰበሰቡ ነጥቦች', en: 'Total Points' },
      value: '2,847',
      icon: '💎',
      color: 'blue' as const,
      progress: 28,
      target: '10,000'
    },
    {
      label: { am: 'የአሁን ደረጃ', en: 'Current Rank' },
      value: 'Gold',
      icon: '👑',
      color: 'orange' as const,
      trend: { value: 1, isPositive: true },
      subtitle: { am: 'በግል ደረጃ', en: 'personal rank' }
    }
  ];

  // Mock achievements data
  const achievements = [
    {
      id: 1,
      title: { 
        am: 'መጀመሪያ ቀዳጅ', 
        en: 'First Steps' 
      },
      description: { 
        am: 'መጀመሪያዎን የአማርኛ ትምህርት ያጠናቀቁ', 
        en: 'Complete your first Amharic lesson' 
      },
      category: 'learning' as const,
      rarity: 'common' as const,
      unlocked: true,
      progress: 100,
      points: 50,
      icon: '🚀',
      unlockedDate: '2024-01-05',
      requirements: [
        { am: '1 ትምህርት ማጠናቀቅ', en: 'Complete 1 lesson' }
      ],
      reward: { am: '50 ነጥቦች', en: '50 points' }
    },
    {
      id: 2,
      title: { 
        am: 'ቃላት መሪ', 
        en: 'Word Master' 
      },
      description: { 
        am: '100 የተለያዩ የአማርኛ ቃላት ይማሩ', 
        en: 'Learn 100 different Amharic words' 
      },
      category: 'vocabulary' as const,
      rarity: 'rare' as const,
      unlocked: true,
      progress: 100,
      points: 100,
      icon: '📚',
      unlockedDate: '2024-01-12',
      requirements: [
        { am: '100 ቃላት መማር', en: 'Learn 100 words' }
      ],
      reward: { am: '100 ነጥቦች', en: '100 points' }
    },
    {
      id: 3,
      title: { 
        am: 'የቀን ሻምፒዮን', 
        en: 'Daily Champion' 
      },
      description: { 
        am: 'በተከታታይ 7 ቀናት ዕለታዊ ዒላማዎን ያሟሉ', 
        en: 'Achieve your daily goal for 7 consecutive days' 
      },
      category: 'streak' as const,
      rarity: 'epic' as const,
      unlocked: true,
      progress: 100,
      points: 150,
      icon: '🔥',
      unlockedDate: '2024-01-15',
      requirements: [
        { am: '7 ተከታታይ ቀናት', en: '7 consecutive days' }
      ],
      reward: { am: '150 ነጥቦች', en: '150 points' }
    },
    {
      id: 4,
      title: { 
        am: 'የውይይት አርቲስት', 
        en: 'Conversation Artist' 
      },
      description: { 
        am: 'ከAI ጋር 5 ደቂቃ ያህል ያልተቋረጠ ውይይት ያድርጉ', 
        en: 'Have a 5-minute uninterrupted conversation with AI' 
      },
      category: 'speaking' as const,
      rarity: 'legendary' as const,
      unlocked: false,
      progress: 60,
      points: 300,
      icon: '💬',
      unlockedDate: null,
      requirements: [
        { am: '5 ደቂቃ ውይይት', en: '5-minute conversation' },
        { am: 'ያልተቋረጠ ውይይት', en: 'Uninterrupted conversation' }
      ],
      reward: { am: '300 ነጥቦች', en: '300 points' }
    },
    {
      id: 5,
      title: { 
        am: 'የፊደል ባለሙያ', 
        en: 'Alphabet Expert' 
      },
      description: { 
        am: 'ሁሉንም 33 የግዕዝ ፊደላት በትክክል ይጻፉ', 
        en: 'Correctly write all 33 Ge\'ez letters' 
      },
      category: 'writing' as const,
      rarity: 'rare' as const,
      unlocked: true,
      progress: 100,
      points: 200,
      icon: '🔤',
      unlockedDate: '2024-01-20',
      requirements: [
        { am: '33 ፊደላት መጻፍ', en: 'Write 33 letters' },
        { am: '100% ትክክለኛነት', en: '100% accuracy' }
      ],
      reward: { am: '200 ነጥቦች', en: '200 points' }
    }
  ];

  // Filter achievements based on selection
  const filteredAchievements = achievements.filter(achievement => {
    const matchesCategory = selectedCategory === 'all' || achievement.category === selectedCategory;
    return matchesCategory;
  });

  const categories = [
    { id: 'all', name: { am: 'ሁሉም', en: 'All' } },
    { id: 'learning', name: { am: 'ትምህርት', en: 'Learning' } },
    { id: 'vocabulary', name: { am: 'ቃላት', en: 'Vocabulary' } },
    { id: 'streak', name: { am: 'ተከታታይ', en: 'Streak' } },
    { id: 'speaking', name: { am: 'ንግግር', en: 'Speaking' } }
  ];

  // Calculate totals
  const totalAchievements = achievements.length;
  const unlockedAchievements = achievements.filter(a => a.unlocked).length;
  const totalPoints = achievements.filter(a => a.unlocked).reduce((sum, a) => sum + a.points, 0);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return currentLang === 'am' 
      ? date.toLocaleDateString('am-ET')
      : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
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
        
        {/* Achievements Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center lg:text-left">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {t('achievements')}
              </h1>
              <p className="text-muted-foreground text-lg">
                {currentLang === 'am' 
                  ? 'የአማርኛ ትምህርትዎን ልዩ ልዩ ምስክር ወረቀቶች ያግኙ' 
                  : 'Unlock special badges for your Amharic learning journey'
                }
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {achievementStats.map((stat, index) => (
                <StatsCard
                  key={index}
                  stat={stat}
                  currentLang={currentLang}
                />
              ))}
            </div>

            {/* Progress Overview */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary mb-2">{unlockedAchievements}</div>
                  <div className="text-sm text-muted-foreground">
                    {currentLang === 'am' ? 'የተገኙ ምስክር ወረቀቶች' : 'Badges Unlocked'}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {Math.round((unlockedAchievements / totalAchievements) * 100)}% {currentLang === 'am' ? 'የተጠናቀቀ' : 'complete'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-secondary mb-2">{totalPoints}</div>
                  <div className="text-sm text-muted-foreground">
                    {currentLang === 'am' ? 'ጠቅላላ ነጥቦች' : 'Total Points'}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {currentLang === 'am' ? 'ከምስክር ወረቀቶች' : 'from badges'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-accent mb-2">
                    {achievements.filter(a => a.rarity === 'legendary' && a.unlocked).length}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {currentLang === 'am' ? 'ልዩ ምስክር ወረቀቶች' : 'Legendary Badges'}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {currentLang === 'am' ? 'ከፍተኛ ደረጃ' : 'highest tier'}
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    {currentLang === 'am' ? 'በምድብ አጣራ' : 'Filter by Category'}
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category.id} value={category.id}>
                        {category.name[currentLang]}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-muted-foreground">
                      {currentLang === 'am' ? 'የተገኘ' : 'Unlocked'} ({unlockedAchievements})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-muted rounded-full"></div>
                    <span className="text-muted-foreground">
                      {currentLang === 'am' ? 'በሂደት ላይ' : 'In Progress'} ({totalAchievements - unlockedAchievements})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Achievements Grid */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">
                  {currentLang === 'am' ? 'ሁሉም ምስክር ወረቀቶች' : 'All Badges'}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {filteredAchievements.length} {currentLang === 'am' ? 'ምስክር ወረቀቶች' : 'badges'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAchievements.map((achievement) => (
                  <div key={achievement.id} className="bg-card border border-border rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div>
                        <h3 className="font-bold text-foreground">
                          {achievement.title[currentLang]}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description[currentLang]}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        achievement.unlocked 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {achievement.unlocked 
                          ? (currentLang === 'am' ? 'የተገኘ' : 'Unlocked') 
                          : (currentLang === 'am' ? 'በሂደት ላይ' : 'In Progress')
                        }
                      </span>
                      <span className="font-bold text-primary">
                        {achievement.points} {currentLang === 'am' ? 'ነጥቦች' : 'points'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {filteredAchievements.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-muted-foreground text-lg mb-4">
                    {currentLang === 'am' 
                      ? 'ምንም ምስክር ወረቀቶች አልተገኙም' 
                      : 'No badges found'
                    }
                  </div>
                  <button 
                    onClick={() => setSelectedCategory('all')}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    {currentLang === 'am' ? 'ሁሉንም አሳይ' : 'Show all badges'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}