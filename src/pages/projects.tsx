import { useState } from 'react';
import { DashboardHeader } from '../components/dashboard-header';
import { Sidebar } from '../components/sidebar';
import { ProjectCard } from '../components/project-card';
import { StatsCard } from '../components/stats-card';

interface ProjectsProps {
  currentLang: string;
  onLanguageChange: (lang: string) => void;
  t: (key: string) => string;
  onNavigation?: (page: string) => void;
  activePage?: string;
}

export function Projects({ currentLang, onLanguageChange, t, onNavigation, activePage = 'projects' }: ProjectsProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Project statistics
  const projectStats = [
    {
      label: { am: 'ጠቅላላ ፕሮጀክቶች', en: 'Total Projects' },
      value: '8',
      icon: '📁',
      color: 'blue' as const,
      progress: 80,
      target: '10'
    },
    {
      label: { am: 'በሂደት ላይ', en: 'In Progress' },
      value: '3',
      icon: '🔄',
      color: 'yellow' as const,
      trend: { value: 2, isPositive: true },
      subtitle: { am: 'ንቁ ፕሮጀክቶች', en: 'active projects' }
    },
    {
      label: { am: 'የተጠናቀቁ', en: 'Completed' },
      value: '4',
      icon: '✅',
      color: 'green' as const,
      progress: 50,
      target: '8'
    },
    {
      label: { am: 'የተቆጠሩ ሰዓቶች', en: 'Hours Logged' },
      value: '42h',
      icon: '⏱️',
      color: 'purple' as const,
      trend: { value: 15, isPositive: true },
      subtitle: { am: 'በዚህ ወር', en: 'this month' }
    }
  ];

  // Mock projects data
  const projects = [
    {
      id: 1,
      title: { 
        am: 'የቤተሰብ ዕቃዎች መዝገብ', 
        en: 'Family Items Catalog' 
      },
      description: { 
        am: 'የቤተሰብ አባላትን እና ዕቃዎችን በአማርኛ መግለጽ', 
        en: 'Describe family members and household items in Amharic' 
      },
      category: 'vocabulary' as const,
      status: 'completed' as const,
      progress: 100,
      duration: 14,
      difficulty: 'beginner' as const,
      collaborators: 2,
      skills: [
        { am: 'የቤተሰብ ቃላት', en: 'Family vocabulary' },
        { am: 'ተረት መግለጽ', en: 'Describing objects' },
        { am: 'መሠረታዊ አረፍተ ነገሮች', en: 'Basic sentences' }
      ],
      technologies: ['📝', '🎤', '📸'],
      dueDate: '2024-01-15',
      completedDate: '2024-01-14',
      rating: 4.8,
      isFeatured: true
    },
    {
      id: 2,
      title: { 
        am: 'የገበያ ልውውጥ ሴናሪዮ', 
        en: 'Market Conversation Scenario' 
      },
      description: { 
        am: 'በገበያ ላይ የሚደረግ ውይይት መፍጠር እና መቅረጽ', 
        en: 'Create and role-play market conversation scenarios' 
      },
      category: 'conversation' as const,
      status: 'in-progress' as const,
      progress: 75,
      duration: 21,
      difficulty: 'intermediate' as const,
      collaborators: 3,
      skills: [
        { am: 'የገበያ ቃላት', en: 'Market vocabulary' },
        { am: 'የዋጋ ማሻሻያ', en: 'Price negotiation' },
        { am: 'የባህላዊ አገላለጾች', en: 'Cultural expressions' }
      ],
      technologies: ['🎭', '🎥', '📱'],
      dueDate: '2024-02-10',
      completedDate: null,
      rating: 0,
      isFeatured: false
    },
    {
      id: 3,
      title: { 
        am: 'የአማርኛ ብሎግ ፖስት', 
        en: 'Amharic Blog Post' 
      },
      description: { 
        am: 'ስለ ባህልዎ ወይም ፍጹም ነገር የ100 ቃላት ጽሑፍ መጻፍ', 
        en: 'Write a 100-word article about your culture or any topic' 
      },
      category: 'writing' as const,
      status: 'in-progress' as const,
      progress: 40,
      duration: 10,
      difficulty: 'intermediate' as const,
      collaborators: 1,
      skills: [
        { am: 'የጽሑፍ መጻፍ', en: 'Writing composition' },
        { am: 'የሰዋሰው አጠቃቀም', en: 'Grammar usage' },
        { am: 'የቃላት ምርጫ', en: 'Word choice' }
      ],
      technologies: ['✍️', '📄', '🔍'],
      dueDate: '2024-01-25',
      completedDate: null,
      rating: 0,
      isFeatured: true
    },
    {
      id: 4,
      title: { 
        am: 'የዜማ ትርጉም ፕሮጀክት', 
        en: 'Song Translation Project' 
      },
      description: { 
        am: 'አንድን የአማርኛ ዜማ ወደ እንግሊዝኛ መተርጎም', 
        en: 'Translate an Amharic song to English while preserving meaning' 
      },
      category: 'translation' as const,
      status: 'not-started' as const,
      progress: 0,
      duration: 7,
      difficulty: 'advanced' as const,
      collaborators: 2,
      skills: [
        { am: 'ትርጉም', en: 'Translation' },
        { am: 'የባህል አገላለጾች', en: 'Cultural expressions' },
        { am: 'ግጥም አወቃቀር', en: 'Poetic structure' }
      ],
      technologies: ['🎵', '📖', '🌍'],
      dueDate: '2024-02-15',
      completedDate: null,
      rating: 0,
      isFeatured: false
    },
    {
      id: 5,
      title: { 
        am: 'የቪድዮ ማስታወሻ ፕሮጀክት', 
        en: 'Video Diary Project' 
      },
      description: { 
        am: 'ዕለታዊ የአማርኛ ቪድዮ ማስታወሻ መፍጠር', 
        en: 'Create daily video diary entries in Amharic' 
      },
      category: 'speaking' as const,
      status: 'in-progress' as const,
      progress: 25,
      duration: 30,
      difficulty: 'intermediate' as const,
      collaborators: 1,
      skills: [
        { am: 'የድምጽ ንግግር', en: 'Speaking practice' },
        { am: 'የግል አገላለጽ', en: 'Personal expression' },
        { am: 'የዕለት ተዕለት ቃላት', en: 'Daily vocabulary' }
      ],
      technologies: ['🎥', '🎤', '📱'],
      dueDate: '2024-03-01',
      completedDate: null,
      rating: 0,
      isFeatured: true
    },
    {
      id: 6,
      title: { 
        am: 'የምግብ ማብሰያ መመሪያ', 
        en: 'Recipe Instruction Guide' 
      },
      description: { 
        am: 'የተለየ የኢትዮጵያ ምግብ ማብሰያ መመሪያ መጻፍ', 
        en: 'Write cooking instructions for an Ethiopian dish' 
      },
      category: 'writing' as const,
      status: 'completed' as const,
      progress: 100,
      duration: 5,
      difficulty: 'beginner' as const,
      collaborators: 1,
      skills: [
        { am: 'የቃላት ቅደም ተከተል', en: 'Sequencing words' },
        { am: 'የዕለት ተዕለት ቃላት', en: 'Everyday vocabulary' },
        { am: 'መመሪያ መጻፍ', en: 'Instruction writing' }
      ],
      technologies: ['🍳', '📝', '📸'],
      dueDate: '2024-01-10',
      completedDate: '2024-01-09',
      rating: 4.6,
      isFeatured: false
    }
  ];

  // Filter projects based on selections
  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;
    
    return matchesCategory && matchesStatus;
  });

  const categories = [
    { id: 'all', name: { am: 'ሁሉም', en: 'All' } },
    { id: 'vocabulary', name: { am: 'ቃላት', en: 'Vocabulary' } },
    { id: 'conversation', name: { am: 'ውይይት', en: 'Conversation' } },
    { id: 'writing', name: { am: 'ጽሑፍ', en: 'Writing' } },
    { id: 'translation', name: { am: 'ትርጉም', en: 'Translation' } },
    { id: 'speaking', name: { am: 'ንግግር', en: 'Speaking' } }
  ];

  const statusTypes = [
    { id: 'all', name: { am: 'ሁሉም', en: 'All' } },
    { id: 'not-started', name: { am: 'አልተጀመረም', en: 'Not Started' } },
    { id: 'in-progress', name: { am: 'በሂደት ላይ', en: 'In Progress' } },
    { id: 'completed', name: { am: 'የተጠናቀቀ', en: 'Completed' } }
  ];

  const handleProjectClick = (projectId: number) => {
    console.log('Opening project:', projectId);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return currentLang === 'am' 
      ? date.toLocaleDateString('am-ET')
      : date.toLocaleDateString('en-US');
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
        
        {/* Projects Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <div className="max-w-7xl mx-auto space-y-8">
            {/* Header */}
            <div className="text-center lg:text-left">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {t('projects')}
              </h1>
              <p className="text-muted-foreground text-lg">
                {currentLang === 'am' 
                  ? 'አማርኛ ችሎታዎችዎን በተግባር የሚያሳዩ ፕሮጀክቶች' 
                  : 'Practical projects to demonstrate your Amharic skills'
                }
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {projectStats.map((stat, index) => (
                <StatsCard
                  key={index}
                  stat={stat}
                  currentLang={currentLang}
                />
              ))}
            </div>

            {/* Filters and New Project Button */}
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
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

                {/* New Project Button */}
                <button className="lg:self-end bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center gap-2">
                  <span>+</span>
                  {currentLang === 'am' ? 'አዲስ ፕሮጀክት' : 'New Project'}
                </button>
              </div>
            </div>

            {/* Featured Projects */}
            <div>
              <h2 className="text-xl font-bold text-foreground mb-4">
                {currentLang === 'am' ? 'የተለዩ ፕሮጀክቶች' : 'Featured Projects'}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {projects.filter(p => p.isFeatured).map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    currentLang={currentLang}
                    t={t}
                    onProjectClick={handleProjectClick}
                    formatDate={formatDate}
                    featured={true}
                  />
                ))}
              </div>
            </div>

            {/* All Projects */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-foreground">
                  {currentLang === 'am' ? 'ሁሉም ፕሮጀክቶች' : 'All Projects'}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {filteredProjects.length} {currentLang === 'am' ? 'ፕሮጀክቶች' : 'projects'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    currentLang={currentLang}
                    t={t}
                    onProjectClick={handleProjectClick}
                    formatDate={formatDate}
                    featured={false}
                  />
                ))}
              </div>

              {/* Empty State */}
              {filteredProjects.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-muted-foreground text-lg mb-4">
                    {currentLang === 'am' 
                      ? 'ምንም ፕሮጀክቶች አልተገኙም' 
                      : 'No projects found'
                    }
                  </div>
                  <button 
                    onClick={() => {
                      setSelectedCategory('all');
                      setSelectedStatus('all');
                    }}
                    className="text-primary hover:text-primary/80 font-medium"
                  >
                    {currentLang === 'am' ? 'ሁሉንም አሳይ' : 'Show all projects'}
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