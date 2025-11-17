'use client';

import { Moon, Sun, Monitor } from 'lucide-react';
import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'system';

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    // Get initial theme
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let initialTheme: Theme = savedTheme || 'system';
    setTheme(initialTheme);
    setMounted(true);

    // Apply theme
    applyTheme(initialTheme, prefersDark);
  }, []);

  const applyTheme = (newTheme: Theme, prefersDark?: boolean) => {
    const root = document.documentElement;
    
    if (newTheme === 'system') {
      const systemDark = prefersDark ?? window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark', systemDark);
    } else {
      root.classList.toggle('dark', newTheme === 'dark');
    }
    
    localStorage.setItem('theme', newTheme);
  };

  const toggleTheme = () => {
    setIsRotating(true);
    
    const themes: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themes.indexOf(theme);
    const nextTheme = themes[(currentIndex + 1) % themes.length];
    
    setTheme(nextTheme);
    applyTheme(nextTheme);
    
    // Reset rotation animation
    setTimeout(() => setIsRotating(false), 300);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4" />;
      case 'dark':
        return <Moon className="h-4 w-4" />;
      case 'system':
        return <Monitor className="h-4 w-4" />;
      default:
        return <Sun className="h-4 w-4" />;
    }
  };

  const getThemeLabel = () => {
    switch (theme) {
      case 'light':
        return 'Light mode';
      case 'dark':
        return 'Dark mode';
      case 'system':
        return 'System preference';
      default:
        return 'Toggle theme';
    }
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <button
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card"
        aria-label="Toggle theme"
      >
        <Sun className="h-4 w-4 text-foreground" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        group relative flex h-9 w-9 items-center justify-center rounded-lg 
        border border-border bg-card hover:bg-accent 
        transition-all duration-300 ease-out
        hover:scale-105 active:scale-95
        ${isRotating ? 'rotate-180' : ''}
        shadow-sm hover:shadow-md
      `}
      aria-label={getThemeLabel()}
      title={getThemeLabel()}
    >
      {/* Animated background gradient */}
      <div className={`
        absolute inset-0 rounded-lg bg-gradient-to-br 
        transition-opacity duration-300
        ${theme === 'light' 
          ? 'from-amber-200/20 to-yellow-300/20 opacity-100' 
          : theme === 'dark'
          ? 'from-blue-400/20 to-indigo-500/20 opacity-100'
          : 'from-gray-400/20 to-slate-500/20 opacity-100'
        }
      `} />
      
      {/* Theme icon */}
      <div className="relative z-10 transition-transform duration-300 group-hover:scale-110">
        {getThemeIcon()}
      </div>

      {/* Tooltip */}
      <div className="
        absolute bottom-full mb-2 hidden group-hover:flex
        px-2 py-1 bg-foreground text-background text-xs rounded
        whitespace-nowrap pointer-events-none
      ">
        {getThemeLabel()}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-foreground" />
      </div>
    </button>
  );
}