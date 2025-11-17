import { useState } from 'react'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import { Dashboard } from './pages/dashboard'
import { Lessons } from './pages/lessons'
import { Challenges } from './pages/challenges'
import { Projects } from './pages/projects'
import { Progress } from './pages/progress'
import { Achievements } from './pages/achievements'
import { Settings } from './pages/settings'
import { Login } from './pages/login'
import { Signup } from './pages/signup'
import { translations } from './lib/translations'
import './App.css'

function AppContent() {
  const [currentLang, setCurrentLang] = useState<'en' | 'am'>('en');
  const [currentPage, setCurrentPage] = useState<string>('login');
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const { user, isLoading } = useAuth();

  const t = (key: string) => {
    return translations[key]?.[currentLang] || key;
  };

  const handleNavigation = (page: string) => {
    console.log('App: Navigation requested to:', page);
    setCurrentPage(page);
  };

  const handleAuthSuccess = () => {
    setCurrentPage('dashboard');
  };

  const handleNavigateToSignup = () => {
    setAuthView('signup');
  };

  const handleNavigateToLogin = () => {
    setAuthView('login');
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">
            {currentLang === 'am' ? 'በመጫን ላይ...' : 'Loading...'}
          </p>
        </div>
      </div>
    );
  }

  // Show authentication pages if user is not logged in
  if (!user) {
    if (authView === 'login') {
      return (
        <Login 
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          t={t}
          onNavigateToSignup={handleNavigateToSignup}
          onLoginSuccess={handleAuthSuccess}
        />
      );
    } else {
      return (
        <Signup 
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          t={t}
          onNavigateToLogin={handleNavigateToLogin}
          onSignupSuccess={handleAuthSuccess}
        />
      );
    }
  }

  // Show main app if user is logged in
  return (
    <div className="min-h-screen bg-background text-foreground">
      {currentPage === 'lessons' ? (
        <Lessons 
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          t={t}
          onNavigation={handleNavigation}
          activePage={currentPage}
        />
      ) : currentPage === 'challenges' ? (
        <Challenges 
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          t={t}
          onNavigation={handleNavigation}
          activePage={currentPage}
        />
      ) : currentPage === 'projects' ? (
        <Projects 
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          t={t}
          onNavigation={handleNavigation}
          activePage={currentPage}
        />
      ) : currentPage === 'progress' ? (
        <Progress 
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          t={t}
          onNavigation={handleNavigation}
          activePage={currentPage}
        />
      ) : currentPage === 'achievements' ? (
        <Achievements 
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          t={t}
          onNavigation={handleNavigation}
          activePage={currentPage}
        />
      ) : currentPage === 'settings' ? (
        <Settings 
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          t={t}
          onNavigation={handleNavigation}
          activePage={currentPage}
        />
      ) : (
        <Dashboard 
          currentLang={currentLang}
          onLanguageChange={setCurrentLang}
          t={t}
          onNavigation={handleNavigation}
          activePage={currentPage}
        />
      )}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App