import { useState } from 'react';
import { DashboardHeader } from '../components/dashboard-header';
import { Sidebar } from '../components/sidebar';
import { LessonCard } from '../components/lesson-card';

interface LessonsProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  t: (key: string) => string;
  onNavigation?: (page: string) => void;
  activePage?: string; // ADD THIS PROP
}

export function Lessons({ currentLang, onLanguageChange, t, onNavigation, activePage = 'lessons' }: LessonsProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock lessons data
  const lessons = [
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
        { am: 'መሠረታዊ ድምጾች', en: 'Basic sounds' },
        { am: 'ፊደል መጻፍ', en: 'Write letters' }
      ],
      category: 'alphabet',
      rating: 4.8,
      enrolled: 1247,
      isPremium: false
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
        { am: 'ዕለት ተዕለት ሐረጎች', en: 'Daily phrases' },
        { am: 'የባህላዊ ሰላምታዎች', en: 'Cultural greetings' }
      ],
      category: 'conversation',
      rating: 4.6,
      enrolled: 893,
      isPremium: false
    },
    {
      id: 3,
      title: { 
        am: 'ቁጥሮች 1-100', 
        en: 'Numbers 1-100' 
      },
      description: { 
        am: 'በአማርኛ እስከ 100 ድረስ መቁጠር ይማሩ', 
        en: 'Master counting in Amharic up to 100' 
      },
      difficulty: 'beginner' as const,
      progress: 50,
      duration: 25,
      completed: false,
      objectives: [
        { am: 'ቁጥሮች 1-20', en: 'Numbers 1-20' },
        { am: 'የአስርዮሽ ስርዓት', en: 'Decimal system' },
        { am: 'በቃላት መቁጠር', en: 'Counting in words' }
      ],
      category: 'vocabulary',
      rating: 4.7,
      enrolled: 756,
      isPremium: false
    },
    {
      id: 4,
      title: { 
        am: 'የቤተሰብ ቃላት', 
        en: 'Family Vocabulary' 
      },
      description: { 
        am: 'ለቤተሰብ አባላት እና ዝምድና የሚያገለግሉ ቃላት', 
        en: 'Words for family members and relationships' 
      },
      difficulty: 'intermediate' as const,
      progress: 0,
      duration: 35,
      completed: false,
      objectives: [
        { am: 'የቅርብ ቤተሰብ ቃላት', en: 'Immediate family terms' },
        { am: 'የዝምድና ቃላት', en: 'Relationship terms' },
        { am: 'የቤተሰብ ምልክቶች', en: 'Family descriptions' }
      ],
      category: 'vocabulary',
      rating: 4.5,
      enrolled: 432,
      isPremium: true
    },
    {
      id: 5,
      title: { 
        am: 'የወሰን አረፍተ ነገር', 
        en: 'Complex Sentences' 
      },
      description: { 
        am: 'የተለያዩ የወሰን አረፍተ ነገሮችን መገንባት ይማሩ', 
        en: 'Learn to construct various complex sentences' 
      },
      difficulty: 'advanced' as const,
      progress: 0,
      duration: 50,
      completed: false,
      objectives: [
        { am: 'የሁኔታ አረፍተ ነገር', en: 'Conditional sentences' },
        { am: 'ጊዜ የሚያመለክቱ አረፍተ ነገሮች', en: 'Temporal clauses' },
        { am: 'የምክንያት አረፍተ ነገር', en: 'Causal clauses' }
      ],
      category: 'grammar',
      rating: 4.9,
      enrolled: 298,
      isPremium: true
    }
  ];

  // Filter lessons based on selections
  const filteredLessons = lessons.filter(lesson => {
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'all' || lesson.difficulty === selectedDifficulty;
    const matchesSearch = lesson.title[currentLang].toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lesson.description[currentLang].toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesCategory && matchesDifficulty && matchesSearch;
  });

  const categories = [
    { id: 'all', name: { am: 'ሁሉም', en: 'All' } },
    { id: 'alphabet', name: { am: 'ፊደል', en: 'Alphabet' } },
    { id: 'vocabulary', name: { am: 'ቃላት', en: 'Vocabulary' } },
    { id: 'grammar', name: { am: 'ሰዋሰው', en: 'Grammar' } },
    { id: 'conversation', name: { am: 'ውይይት', en: 'Conversation' } }
  ];

  const difficulties = [
    { id: 'all', name: { am: 'ሁሉም ደረጃዎች', en: 'All Levels' } },
    { id: 'beginner', name: { am: 'መጀመሪያ', en: 'Beginner' } },
    { id: 'intermediate', name: { am: 'መካከለኛ', en: 'Intermediate' } },
    { id: 'advanced', name: { am: 'ላቀ', en: 'Advanced' } }
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
        
        {/* Lessons Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                {t('all_lessons')}
              </h1>
              <p className="text-muted-foreground">
                {currentLang === 'am' 
                  ? 'ሁሉንም የአማርኛ ትምህርቶች ይመልከቱ' 
                  : 'Browse all Amharic learning lessons'
                }
              </p>
            </div>

            {/* Filters and Search */}
            <div className="bg-card border border-border rounded-xl p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <div className="md:col-span-1">
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    {t('search_lessons')}
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={currentLang === 'am' ? 'ትምህርቶችን ፈልግ...' : 'Search lessons...'}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                {/* Category Filter */}
                <div>
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

                {/* Difficulty Filter */}
                <div>
                  <label className="block text-sm font-medium text-muted-foreground mb-2">
                    {currentLang === 'am' ? 'በደረጃ አጣራ' : 'Filter by Difficulty'}
                  </label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    {difficulties.map(difficulty => (
                      <option key={difficulty.id} value={difficulty.id}>
                        {difficulty.name[currentLang]}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Lessons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLessons.map(lesson => (
                <LessonCard
                  key={lesson.id}
                  lesson={lesson}
                  currentLang={currentLang}
                  t={t}
                  onLessonClick={handleLessonClick}
                />
              ))}
            </div>

            {/* Empty State */}
            {filteredLessons.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground text-lg mb-4">
                  {currentLang === 'am' 
                    ? 'ምንም ትምህርቶች አልተገኙም' 
                    : 'No lessons found'
                  }
                </div>
                <button 
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedDifficulty('all');
                  }}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  {currentLang === 'am' ? 'ሁሉንም አሳይ' : 'Show all lessons'}
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}