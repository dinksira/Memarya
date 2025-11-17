'use client';

import { 
  Home, BookOpen, Zap, Briefcase, TrendingUp, Trophy, Settings, LogOut,
  Menu, X, ChevronRight, User, Crown, Star
} from 'lucide-react';
import { Logo } from './logo';
import { useAuth } from '../contexts/AuthContext'; // ADD THIS IMPORT

interface SidebarProps {
  currentLang: string;
  t: (key: string) => string;
  userName?: string;
  userRole?: string;
  streak?: number;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
  onNavigation?: (page: string) => void;
  activePage?: string;
}

export function Sidebar({ 
  currentLang, 
  t, 
  userName = "አበበ ተስፋዬ",
  userRole = "Student",
  streak = 12,
  isMobileOpen = false,
  onMobileClose,
  onNavigation,
  activePage = 'dashboard'
}: SidebarProps) {
  const { logout, user } = useAuth(); // ADD THIS HOOK
  
  // Use the actual user data from auth context if available
  const displayName = user?.name || userName;
  const displayStreak = user?.streak || streak;

  const menuItems = [
    { 
      id: 'dashboard', 
      icon: Home, 
      key: 'dashboard', 
      badge: null
    },
    { 
      id: 'lessons', 
      icon: BookOpen, 
      key: 'lessons', 
      badge: '3'
    },
    { 
      id: 'challenges', 
      icon: Zap, 
      key: 'challenges', 
      badge: 'New'
    },
    { 
      id: 'projects', 
      icon: Briefcase, 
      key: 'projects', 
      badge: null
    },
    { 
      id: 'progress', 
      icon: TrendingUp, 
      key: 'progress', 
      badge: null
    },
    { 
      id: 'achievements', 
      icon: Trophy, 
      key: 'achievements', 
      badge: '5'
    },
  ];

  const quickActions = [
    { id: 'daily-goal', label: { am: 'ዕለታዊ እሴት', en: 'Daily Goal' }, progress: 75 },
    { id: 'weekly-target', label: { am: 'ሳምንታዊ ዒላማ', en: 'Weekly Target' }, progress: 60 },
  ];

  const handleNavigation = (pageId: string) => {
    console.log('Navigating to:', pageId);
    if (onNavigation) {
      console.log('Calling onNavigation with:', pageId);
      onNavigation(pageId);
    } else {
      console.log('onNavigation is not provided');
    }
    closeMobileSidebar();
  };

  const closeMobileSidebar = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  };

  const handleMobileMenuClick = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  };

  const handleLogoClick = () => {
    handleNavigation('dashboard');
  };

  const handleLogout = () => {
    logout();
    // The App.tsx will automatically redirect to login page
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={closeMobileSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed left-0 top-0 z-50 h-screen w-64 border-r border-border bg-card
          transform transition-transform duration-300 ease-in-out
          lg:translate-x-0 lg:static lg:z-auto
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
        aria-label="Main navigation"
      >
        <div className="flex h-full flex-col">
          {/* Header */}
          <div className="border-b border-border p-6">
            <div className="flex items-center justify-between">
              <Logo 
                currentLang={currentLang} 
                showSubtitle={true}
                onClick={handleLogoClick}
              />
              <button 
                onClick={closeMobileSidebar}
                className="lg:hidden p-2 hover:bg-accent rounded-lg transition-colors"
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* User Quick Stats */}
          <div className="p-4 border-b border-border">
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg p-4 space-y-3">
              {/* Streak */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-lg">
                    <Star className="h-3 w-3 text-white" />
                  </div>
                  <span className="text-xs font-medium">
                    {currentLang === 'am' ? 'ተከታታይ' : 'Streak'}
                  </span>
                </div>
                <span className="text-sm font-bold">{displayStreak} {t('days')}</span>
              </div>
              
              {/* Quick Progress */}
              {quickActions.map((action) => (
                <div key={action.id} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span>{action.label[currentLang]}</span>
                    <span>{action.progress}%</span>
                  </div>
                  <div className="w-full bg-white/50 dark:bg-black/20 rounded-full h-1.5">
                    <div 
                      className="h-1.5 rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000"
                      style={{ width: `${action.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation - USE activePage FROM PROPS */}
          <nav className="flex-1 space-y-1 p-4">
            {menuItems.map((item) => {
              const active = activePage === item.id;
              const Icon = item.icon;
              
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id)}
                  className={`
                    group flex items-center justify-between px-4 py-3 rounded-lg
                    text-sm font-medium transition-all duration-200 relative
                    w-full text-left
                    ${active
                      ? 'bg-accent text-accent-foreground shadow-sm' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                    }
                    hover:scale-[1.02] active:scale-[0.98]
                  `}
                  aria-current={active ? 'page' : undefined}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`h-5 w-5 transition-transform ${active ? 'scale-110' : ''}`} />
                    <span>{t(item.key)}</span>
                  </div>
                  
                  {/* Badge */}
                  {item.badge && (
                    <span className={`
                      px-2 py-1 text-xs font-semibold rounded-full
                      ${active 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground'
                      }
                    `}>
                      {item.badge}
                    </span>
                  )}
                  
                  {/* Active indicator */}
                  {active && (
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-primary to-secondary rounded-r" />
                  )}
                  
                  {/* Hover gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity" />
                </button>
              );
            })}
          </nav>

          {/* Footer - User Section */}
          <div className="border-t border-border p-4 space-y-4">
            {/* Settings */}
            <button 
              onClick={() => handleNavigation('settings')}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all group"
            >
              <Settings className="h-5 w-5" />
              <span>{t('settings')}</span>
              <ChevronRight className="h-4 w-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>

            {/* User Profile */}
            <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 border border-border/50">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-semibold text-sm">
                  <User className="h-5 w-5" />
                </div>
                {displayStreak > 7 && (
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-yellow-400 rounded-full flex items-center justify-center">
                    <Crown className="h-2 w-2 text-white" />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{displayName}</p>
                <p className="text-xs text-muted-foreground truncate">{userRole}</p>
              </div>
              
              {/* Updated Logout Button */}
              <button 
                className="p-1.5 hover:bg-accent rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                aria-label={t('logout')}
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Button */}
      <button 
        className="fixed top-4 left-4 z-40 lg:hidden p-2 bg-card border border-border rounded-lg shadow-sm"
        onClick={handleMobileMenuClick}
        aria-label="Toggle menu"
      >
        <Menu className="h-5 w-5" />
      </button>
    </>
  );
}