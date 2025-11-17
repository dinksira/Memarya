'use client';

interface ProjectCardProps {
  project: {
    id: number;
    title: { am: string; en: string };
    description: { am: string; en: string };
    category: 'vocabulary' | 'conversation' | 'writing' | 'translation' | 'speaking';
    status: 'not-started' | 'in-progress' | 'completed';
    progress: number;
    duration: number;
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    collaborators: number;
    skills: { am: string; en: string }[];
    technologies: string[];
    dueDate: string;
    completedDate: string | null;
    rating: number;
    isFeatured: boolean;
  };
  currentLang: string;
  t: (key: string) => string;
  onProjectClick: (projectId: number) => void;
  formatDate: (dateString: string) => string;
  featured: boolean;
}

export function ProjectCard({ project, currentLang, t, onProjectClick, formatDate, featured }: ProjectCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'in-progress': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'not-started': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return currentLang === 'am' ? 'የተጠናቀቀ' : 'Completed';
      case 'in-progress': return currentLang === 'am' ? 'በሂደት ላይ' : 'In Progress';
      case 'not-started': return currentLang === 'am' ? 'አልተጀመረም' : 'Not Started';
      default: return status;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'advanced': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vocabulary': return '📚';
      case 'conversation': return '💬';
      case 'writing': return '✍️';
      case 'translation': return '🌍';
      case 'speaking': return '🎤';
      default: return '📁';
    }
  };

  return (
    <div className={`bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 ${
      featured ? 'lg:col-span-2 border-2 border-primary/20' : ''
    }`}>
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{getCategoryIcon(project.category)}</div>
          <div className="flex-1">
            <h3 className="font-bold text-foreground text-lg">
              {project.title[currentLang]}
            </h3>
            <p className="text-muted-foreground text-sm">
              {project.description[currentLang]}
            </p>
          </div>
        </div>
        {project.isFeatured && (
          <div className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-900 text-xs font-bold rounded-full">
            {currentLang === 'am' ? 'የተለየ' : 'Featured'}
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-muted-foreground">
            {currentLang === 'am' ? 'ሂደት' : 'Progress'}
          </span>
          <span className="font-bold text-foreground">{project.progress}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-1000 ${
              project.status === 'completed' ? 'bg-gradient-to-r from-green-400 to-emerald-600' :
              project.status === 'in-progress' ? 'bg-gradient-to-r from-blue-400 to-cyan-600' :
              'bg-gradient-to-r from-gray-400 to-gray-600'
            }`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-lg font-bold text-primary">{project.duration}</div>
          <div className="text-xs text-muted-foreground">
            {currentLang === 'am' ? 'ቀናት' : 'Days'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-secondary">{project.collaborators}</div>
          <div className="text-xs text-muted-foreground">
            {currentLang === 'am' ? 'ተባባሪዎች' : 'People'}
          </div>
        </div>
        <div className="text-center">
          <div className={`text-lg font-bold ${
            project.difficulty === 'beginner' ? 'text-green-600' :
            project.difficulty === 'intermediate' ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            {project.difficulty === 'beginner' ? '1' : project.difficulty === 'intermediate' ? '2' : '3'}
          </div>
          <div className="text-xs text-muted-foreground">
            {currentLang === 'am' ? 'ደረጃ' : 'Level'}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">
          {currentLang === 'am' ? 'ችሎታዎች' : 'Skills'}
        </h4>
        <div className="flex flex-wrap gap-1">
          {project.skills.slice(0, 3).map((skill, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-md"
            >
              {skill[currentLang]}
            </span>
          ))}
          {project.skills.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-md">
              +{project.skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Technologies */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">
          {currentLang === 'am' ? 'መሳሪያዎች' : 'Tools'}
        </h4>
        <div className="flex gap-2">
          {project.technologies.map((tech, index) => (
            <span key={index} className="text-lg">
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(project.status)}`}>
            {getStatusText(project.status)}
          </div>
          <div className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(project.difficulty)}`}>
            {project.difficulty === 'beginner' ? (currentLang === 'am' ? 'መጀመሪያ' : 'Beginner') :
             project.difficulty === 'intermediate' ? (currentLang === 'am' ? 'መካከለኛ' : 'Intermediate') :
             (currentLang === 'am' ? 'ላቀ' : 'Advanced')}
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-xs text-muted-foreground">
            {currentLang === 'am' ? 'የመጨረሻ ቀን' : 'Due'} {formatDate(project.dueDate)}
          </div>
          {project.status === 'completed' && project.completedDate && (
            <div className="text-xs text-green-600">
              {currentLang === 'am' ? 'ተጠናቋል' : 'Completed'} {formatDate(project.completedDate)}
            </div>
          )}
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={() => onProjectClick(project.id)}
        className={`w-full mt-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
          project.status === 'completed' 
            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
            : project.status === 'in-progress'
            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
            : 'bg-muted text-muted-foreground hover:bg-muted/80'
        }`}
      >
        {project.status === 'completed' ? (currentLang === 'am' ? 'ውጤት ይመልከቱ' : 'View Results') :
         project.status === 'in-progress' ? (currentLang === 'am' ? 'ቀጥል' : 'Continue') :
         (currentLang === 'am' ? 'ጀምር' : 'Start')}
      </button>
    </div>
  );
}