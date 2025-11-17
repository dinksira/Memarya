'use client';

interface ChallengeCardProps {
  challenge: {
    id: number;
    title: { am: string; en: string };
    description: { am: string; en: string };
    type: 'quiz' | 'conversation' | 'puzzle' | 'speaking' | 'review';
    difficulty: 'beginner' | 'intermediate' | 'advanced';
    status: 'available' | 'active' | 'completed' | 'locked';
    duration: number;
    points: number;
    participants: number;
    completed: boolean;
    score: number;
    bestScore: number;
    attempts: number;
    timeLeft: number;
    requirements: { am: string; en: string }[];
    rewards: { am: string; en: string }[];
  };
  currentLang: string;
  t: (key: string) => string;
  onChallengeClick: (challengeId: number) => void;
  formatTimeLeft: (seconds: number) => string;
}

export function ChallengeCard({ challenge, currentLang, t, onChallengeClick, formatTimeLeft }: ChallengeCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'active': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'available': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-300';
      case 'locked': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return currentLang === 'am' ? 'የተጠናቀቀ' : 'Completed';
      case 'active': return currentLang === 'am' ? 'በሂደት ላይ' : 'Active';
      case 'available': return currentLang === 'am' ? 'ተገቢ' : 'Available';
      case 'locked': return currentLang === 'am' ? 'የተቆለፈ' : 'Locked';
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'quiz': return '❓';
      case 'conversation': return '💬';
      case 'puzzle': return '🧩';
      case 'speaking': return '🎤';
      case 'review': return '📚';
      default: return '🎯';
    }
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">{getTypeIcon(challenge.type)}</div>
          <div>
            <h3 className="font-bold text-foreground text-lg">
              {challenge.title[currentLang]}
            </h3>
            <p className="text-muted-foreground text-sm">
              {challenge.description[currentLang]}
            </p>
          </div>
        </div>
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(challenge.status)}`}>
          {getStatusText(challenge.status)}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-primary">{challenge.points}</div>
          <div className="text-xs text-muted-foreground">
            {currentLang === 'am' ? 'ነጥቦች' : 'Points'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-secondary">{Math.floor(challenge.duration / 60)}</div>
          <div className="text-xs text-muted-foreground">
            {currentLang === 'am' ? 'ደቂቃዎች' : 'Minutes'}
          </div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-accent-foreground">{challenge.participants}</div>
          <div className="text-xs text-muted-foreground">
            {currentLang === 'am' ? 'ተሳታፊዎች' : 'Players'}
          </div>
        </div>
      </div>

      {/* Progress and Time */}
      {challenge.status === 'completed' && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">
              {currentLang === 'am' ? 'የመጨረሻ ውጤት' : 'Last Score'}
            </span>
            <span className="font-bold text-foreground">{challenge.score}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="h-2 rounded-full bg-gradient-to-r from-green-400 to-emerald-600"
              style={{ width: `${challenge.score}%` }}
            />
          </div>
        </div>
      )}

      {challenge.status === 'active' && challenge.timeLeft > 0 && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="flex items-center justify-between text-sm">
            <span className="text-blue-600 dark:text-blue-400">
              {currentLang === 'am' ? 'የቀረ ጊዜ' : 'Time Left'}
            </span>
            <span className="font-bold text-blue-700 dark:text-blue-300">
              {formatTimeLeft(challenge.timeLeft)}
            </span>
          </div>
        </div>
      )}

      {/* Requirements */}
      {challenge.status === 'locked' && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-muted-foreground mb-2">
            {currentLang === 'am' ? 'ለመክፈት ያስፈልጋል' : 'Requirements to unlock'}
          </h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            {challenge.requirements.slice(0, 2).map((req, index) => (
              <li key={index} className="flex items-center gap-2">
                <div className="w-1 h-1 bg-muted-foreground rounded-full" />
                {req[currentLang]}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Rewards */}
      <div className="mb-4">
        <h4 className="text-sm font-medium text-muted-foreground mb-2">
          {currentLang === 'am' ? 'ሽልማቶች' : 'Rewards'}
        </h4>
        <div className="flex flex-wrap gap-2">
          {challenge.rewards.map((reward, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gradient-to-r from-primary/10 to-secondary/10 text-primary text-xs rounded-full border border-primary/20"
            >
              {reward[currentLang]}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(challenge.difficulty)}`}>
          {challenge.difficulty === 'beginner' ? (currentLang === 'am' ? 'መጀመሪያ' : 'Beginner') :
           challenge.difficulty === 'intermediate' ? (currentLang === 'am' ? 'መካከለኛ' : 'Intermediate') :
           (currentLang === 'am' ? 'ላቀ' : 'Advanced')}
        </div>
        
        <button
          onClick={() => onChallengeClick(challenge.id)}
          disabled={challenge.status === 'locked'}
          className={`
            px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200
            ${challenge.status === 'locked' 
              ? 'bg-muted text-muted-foreground cursor-not-allowed' 
              : 'bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105'
            }
          `}
        >
          {challenge.status === 'completed' ? (currentLang === 'am' ? 'እንደገና ሞክር' : 'Try Again') :
           challenge.status === 'active' ? (currentLang === 'am' ? 'ቀጥል' : 'Continue') :
           challenge.status === 'available' ? (currentLang === 'am' ? 'ጀምር' : 'Start') :
           (currentLang === 'am' ? 'የተቆለፈ' : 'Locked')}
        </button>
      </div>
    </div>
  );
}