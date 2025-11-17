'use client';

// REMOVE THIS LINE: import { Language } from '../lib/translations';
import { LanguageToggle } from './language-toggle';
import { ThemeToggle } from './theme-toggle';
import { Bell, Search, User } from 'lucide-react';

interface DashboardHeaderProps {
  currentLang: string; // Change to string
  onLanguageChange: (lang: string) => void; // Change to string
  t: (key: string) => string;
  userName?: string;
}

export function DashboardHeader({ 
  currentLang, 
  onLanguageChange, 
  t, 
  userName = "Student" 
}: DashboardHeaderProps) {
  const hour = new Date().getHours();
  
  const greetings = {
    en: {
      morning: "Good morning",
      afternoon: "Good afternoon", 
      evening: "Good evening",
      question: "What would you like to learn today?"
    },
    am: {
      morning: "እንደምን አደሩ",
      afternoon: "እንደምን ዋሉ",
      evening: "እንደምን አመሹ", 
      question: "ዛሬ ምን መማር ይፈልጋሉ?"
    }
  };

  const getGreeting = () => {
    if (hour < 12) return greetings[currentLang as keyof typeof greetings]?.morning || greetings.en.morning;
    if (hour < 18) return greetings[currentLang as keyof typeof greetings]?.afternoon || greetings.en.afternoon;
    return greetings[currentLang as keyof typeof greetings]?.evening || greetings.en.evening;
  };

  const getQuestion = () => {
    return greetings[currentLang as keyof typeof greetings]?.question || greetings.en.question;
  };

  return (
    <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="flex items-center justify-between p-6">
        <div className="flex-1 max-w-2xl">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                {getGreeting()}, <span className="text-primary">{userName}!</span>
              </h1>
              <p className="text-muted-foreground mt-1 text-sm md:text-base">
                {getQuestion()}
              </p>
            </div>
            
            <div className="hidden md:flex items-center flex-1 max-w-md">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder={currentLang === 'am' ? 'ፈልግ...' : 'Search...'}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors">
            <Search className="h-5 w-5 text-muted-foreground" />
          </button>
          
          <button className="relative p-2 hover:bg-accent rounded-lg transition-colors">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full border-2 border-background"></span>
          </button>
          
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          
          <LanguageToggle currentLang={currentLang} onLanguageChange={onLanguageChange} />
          
          <button className="flex items-center gap-2 p-2 hover:bg-accent rounded-lg transition-colors">
            <div className="h-8 w-8 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-white" />
            </div>
            <span className="hidden lg:block text-sm font-medium">{userName}</span>
          </button>
        </div>
      </div>
    </header>
  );
}