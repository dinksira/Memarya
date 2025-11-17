import { useState } from 'react';
import { DashboardHeader } from '../components/dashboard-header';
import { Sidebar } from '../components/sidebar';
import { ChallengeCard } from '../components/challenge-card';
import { ProgressChart } from '../components/progress-chart';
import { StatsCard } from '../components/stats-card';

interface ChallengesProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  t: (key: string) => string;
  onNavigation?: (page: string) => void;
  activePage?: string;
}

export function Challenges({ currentLang, onLanguageChange, t, onNavigation, activePage = 'challenges' }: ChallengesProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedType, setSelectedType] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Challenge statistics
  const challengeStats = [
    {
      label: { am: 'ጠቅላላ ስግተቶች', en: 'Total Challenges' },
      value: '15',
      icon: '🎯',
      color: 'blue' as const,
      progress: 60,
      target: '25'
    },
    {
      label: { am: 'የተጠናቀቁ', en: 'Completed' },
      value: '9',
      icon: '🏆',
      color: 'green' as const,
      trend: { value: 12, isPositive: true },
      subtitle: { am: 'በዚህ ወር', en: 'this month' }
    },
    {
      label: { am: 'የአሁን ደረጃ', en: 'Current Level' },
      value: '3',
      icon: '⭐',
      color: 'purple' as const,
      progress: 75,
      target: '4'
    },
    {
      label: { am: 'የሚቀጥለው ሽልማት', en: 'Next Reward' },
      value: '50',
      icon: '🎁',
      color: 'yellow' as const,
      trend: { value: 15, isPositive: true },
      subtitle: { am: 'ነጥቦች', en: 'points' }
    }
  ];

  // Mock challenges data
  const challenges = [
    {
      id: 1,
      title: { 
        am: 'ፈጣን ቃላት ፈተና', 
        en: 'Quick Vocabulary Test' 
      },
      description: { 
        am: 'በ30 ሰከንድ ውስጥ ያሉትን ቃላት ይመልሱ', 
        en: 'Answer vocabulary questions in 30 seconds' 
      },
      type: 'quiz' as const,
      difficulty: 'beginner' as const,
      status: 'completed' as const,
      duration: 30,
      points: 50,
      participants: 1247,
      completed: true,
      score: 95,
      bestScore: 100,
      attempts: 3,
      timeLeft: 0,
      requirements: [
        { am: 'ደረጃ 1 አጠናቀቀ', en: 'Completed Level 1' },
        { am: '20 ቃላት ተማረ', en: 'Learned 20 words' }
      ],
      rewards: [
        { am: '50 ነጥቦች', en: '50 points' },
        { am: 'ብርንዚር ምስክር ወረቀት', en: 'Bronze Badge' }
      ]
    },
    {
      id: 2,
      title: { 
        am: 'የምናዝ ውይይት', 
        en: 'Daily Conversation' 
      },
      description: { 
        am: 'ከAI ጋር የ5 ደቂቃ ውይይት ያድርጉ', 
        en: 'Have a 5-minute conversation with AI' 
      },
      type: 'conversation' as const,
      difficulty: 'intermediate' as const,
      status: 'active' as const,
      duration: 300,
      points: 100,
      participants: 893,
      completed: false,
      score: 0,
      bestScore: 85,
      attempts: 1,
      timeLeft: 172800, // 2 days in seconds
      requirements: [
        { am: 'ደረጃ 2 አጠናቀቀ', en: 'Completed Level 2' },
        { am: '50 ቃላት ተማረ', en: 'Learned 50 words' }
      ],
      rewards: [
        { am: '100 ነጥቦች', en: '100 points' },
        { am: 'የብር ምስክር ወረቀት', en: 'Silver Badge' }
      ]
    },
    {
      id: 3,
      title: { 
        am: 'የሰዋሰው ጠባቂ', 
        en: 'Grammar Guardian' 
      },
      description: { 
        am: 'የሰዋሰው ህጎችን በመጠቀም ስህተቶችን ያግኙ', 
        en: 'Find errors using grammar rules' 
      },
      type: 'puzzle' as const,
      difficulty: 'advanced' as const,
      status: 'locked' as const,
      duration: 120,
      points: 150,
      participants: 432,
      completed: false,
      score: 0,
      bestScore: 0,
      attempts: 0,
      timeLeft: 0,
      requirements: [
        { am: 'ደረጃ 3 አጠናቀቀ', en: 'Completed Level 3' },
        { am: 'የሰዋሰው ትምህርቶች አጠናቀቀ', en: 'Completed grammar lessons' }
      ],
      rewards: [
        { am: '150 ነጥቦች', en: '150 points' },
        { am: 'የወርቅ ምስክር ወረቀት', en: 'Gold Badge' }
      ]
    },
    {
      id: 4,
      title: { 
        am: 'የድምጽ ንግግር ፈተና', 
        en: 'Voice Speaking Test' 
      },
      description: { 
        am: 'የአማርኛ አጠራርዎን ይለማመዱ', 
        en: 'Practice your Amharic pronunciation' 
      },
      type: 'speaking' as const,
      difficulty: 'intermediate' as const,
      status: 'active' as const,
      duration: 180,
      points: 80,
      participants: 567,
      completed: false,
      score: 0,
      bestScore: 72,
      attempts: 2,
      timeLeft: 86400, // 1 day in seconds
      requirements: [
        { am: 'ደረጃ 2 አጠናቀቀ', en: 'Completed Level 2' },
        { am: 'መሠረታዊ ሰላምታዎች ተማረ', en: 'Learned basic greetings' }
      ],
      rewards: [
        { am: '80 ነጥቦች', en: '80 points' },
        { am: 'የድምጽ ምስክር ወረቀት', en: 'Voice Badge' }
      ]
    },
    {
      id: 5,
      title: { 
        am: 'የሳምንት ማጠናከሪያ', 
        en: 'Weekly Review' 
      },
      description: { 
        am: 'በሳምንቱ ውስጥ የተማሩትን ሁሉ ይገምግሙ', 
        en: 'Review everything you learned this week' 
      },
      type: 'review' as const,
      difficulty: 'beginner' as const,
      status: 'available' as const,
      duration: 600,
      points: 120,
      participants: 2341,
      completed: false,
      score: 0,
      bestScore: 0,
      attempts: 0,
      timeLeft: 604800, // 7 days in seconds
      requirements: [
        { am: '5 ትምህርቶች አጠናቀቀ', en: 'Completed 5 lessons' },
        { am: 'ሳምንታዊ ዒላማ አጠናቀቀ', en: 'Completed weekly goal' }
      ],
      rewards: [
        { am: '120 ነጥቦች', en: '120 points' },
        { am: 'የሳምንት ሻምፒዮን ምስክር ወረቀት', en: 'Weekly Champion Badge' }
      ]
    }
  ];

  // Filter challenges based on selections
  const filteredChallenges = challenges.filter(challenge => {
    const matchesType = selectedType === 'all' || challenge.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || challenge.status === selectedStatus;
    
    return matchesType && matchesStatus;
  });

  const challengeTypes = [
    { id: 'all', name: { am: 'ሁሉም', en: 'All' } },
    { id: 'quiz', name: { am: 'ፈተና', en: 'Quiz' } },
    { id: 'conversation', name: { am: 'ውይይት', en: 'Conversation' } },
    { id: 'puzzle', name: { am: 'መደናሰስ', en: 'Puzzle' } },
    { id: 'speaking', name: { am: 'ድምጽ', en: 'Speaking' } },
    { id: 'review', name: { am: 'ማጠናከሪያ', en: 'Review' } }
  ];

  const statusTypes = [
    { id: 'all', name: { am: 'ሁሉም', en: 'All' } },
    { id: 'available', name: { am: 'ተገቢ', en: 'Available' } },
    { id: 'active', name: { am: 'በሂደት ላይ', en: 'Active' } },
    { id: 'completed', name: { am: 'የተጠናቀቀ', en: 'Completed' } },
    { id: 'locked', name: { am: 'የተቆለፈ', en: 'Locked' } }
  ];

  const handleChallengeClick = (challengeId: number) => {
    console.log('Starting challenge:', challengeId);
  };

  const formatTimeLeft = (seconds: number) => {
    if (seconds === 0) return '';
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor((seconds % 86400) / 3600);
    
    if (days > 0) {
      return currentLang === 'am' ? `${days} ቀናት` : `${days}d`;
    }
    return currentLang === 'am' ? `${hours} ሰዓታት` : `${hours}h`;
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
        
        {/* Challenges Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center lg:text-left">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {t('challenges')}
              </h1>
              <p className="text-muted-foreground text-lg">
                {currentLang === 'am' 
                  ? 'አማርኛ ችሎታዎችዎን በሚያምር መንገድ ይለማመዱ' 
                  : 'Practice your Amharic skills in fun ways'
                }
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {challengeStats.map((stat, index) => (
                <StatsCard
                  key={index}
                  stat={stat}
                  currentLang={currentLang}
                />
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Challenges List */}
              <div className="lg:col-span-2">
                {/* Filters */}
                <div className="bg-card border border-border rounded-xl p-6 mb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Challenge Type Filter */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        {currentLang === 'am' ? 'በዓይነት አጣራ' : 'Filter by Type'}
                      </label>
                      <select
                        value={selectedType}
                        onChange={(e) => setSelectedType(e.target.value)}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {challengeTypes.map(type => (
                          <option key={type.id} value={type.id}>
                            {type.name[currentLang]}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Status Filter */}
                    <div>
                      <label className="block text-sm font-medium text-muted-foreground mb-2">
                        {currentLang === 'am' ? 'በሁኔታ አጣራ' : 'Filter by Status'}
                      </label>
                      <select
                        value={selectedStatus}
                        onChange={(e) => setSelectedStatus(e.target.value)}
                        className="w-full px-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {statusTypes.map(status => (
                          <option key={status.id} value={status.id}>
                            {status.name[currentLang]}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Challenges Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredChallenges.map((challenge) => (
                    <ChallengeCard
                      key={challenge.id}
                      challenge={challenge}
                      currentLang={currentLang}
                      t={t}
                      onChallengeClick={handleChallengeClick}
                      formatTimeLeft={formatTimeLeft}
                    />
                  ))}
                </div>

                {/* Empty State */}
                {filteredChallenges.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-muted-foreground text-lg mb-4">
                      {currentLang === 'am' 
                        ? 'ምንም ስግተቶች አልተገኙም' 
                        : 'No challenges found'
                      }
                    </div>
                    <button 
                      onClick={() => {
                        setSelectedType('all');
                        setSelectedStatus('all');
                      }}
                      className="text-primary hover:text-primary/80 font-medium"
                    >
                      {currentLang === 'am' ? 'ሁሉንም አሳይ' : 'Show all challenges'}
                    </button>
                  </div>
                )}
              </div>

              {/* Progress and Leaderboard Sidebar */}
              <div className="lg:col-span-1 space-y-6">
                {/* Progress Chart */}
                <ProgressChart currentLang={currentLang} />

                {/* Weekly Leaderboard */}
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">
                    {currentLang === 'am' ? 'የሳምንቱ አሸናፊዎች' : 'Weekly Leaders'}
                  </h3>
                  <div className="space-y-3">
                    {[
                      { name: 'ዳዊት', points: 450, position: 1 },
                      { name: 'ማርያም', points: 420, position: 2 },
                      { name: 'ሆስና', points: 380, position: 3 },
                      { name: 'ተስፋዬ', points: 350, position: 4 },
                      { name: 'ሚካኤል', points: 320, position: 5 }
                    ].map((leader, index) => (
                      <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-accent/50">
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            leader.position === 1 ? 'bg-yellow-400 text-yellow-900' :
                            leader.position === 2 ? 'bg-gray-400 text-gray-900' :
                            leader.position === 3 ? 'bg-amber-600 text-amber-900' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {leader.position}
                          </div>
                          <span className="font-medium">{leader.name}</span>
                        </div>
                        <span className="text-sm font-bold text-primary">{leader.points} pts</span>
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