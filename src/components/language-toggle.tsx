'use client';

import { useState } from 'react';

interface LanguageToggleProps {
  currentLang: string; // Change to string
  onLanguageChange: (lang: string) => void; // Change to string
  size?: 'sm' | 'md' | 'lg';
}

export function LanguageToggle({ 
  currentLang, 
  onLanguageChange, 
  size = 'md' 
}: LanguageToggleProps) {
  const [isHovered, setIsHovered] = useState(false);

  const sizeClasses = {
    sm: 'p-0.5 gap-0.5 text-xs',
    md: 'p-1 gap-1 text-sm', 
    lg: 'p-1.5 gap-1.5 text-base'
  };

  const buttonSizes = {
    sm: 'px-2 py-1',
    md: 'px-3 py-2',
    lg: 'px-4 py-2.5'
  };

  const languages = [
    { code: 'am', flag: '🇪🇹', label: 'አማ', name: 'Amharic' },
    { code: 'en', flag: '🌐', label: 'EN', name: 'English' }
  ];

  return (
    <div 
      className={`
        flex items-center bg-muted/50 rounded-lg border border-border shadow-sm
        transition-all duration-300 hover:shadow-md
        ${sizeClasses[size]}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => onLanguageChange(lang.code)}
          className={`
            flex items-center gap-2 rounded-md font-medium 
            transition-all duration-200 ease-in-out
            hover:scale-105 active:scale-95
            ${buttonSizes[size]}
            ${currentLang === lang.code 
              ? 'bg-primary text-primary-foreground shadow-sm transform scale-105' 
              : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
            }
          `}
          aria-label={`Switch to ${lang.name}`}
          aria-pressed={currentLang === lang.code}
          title={`Switch to ${lang.name}`}
        >
          <span className="text-base leading-none">{lang.flag}</span>
          <span className="font-semibold leading-none">{lang.label}</span>
        </button>
      ))}
    </div>
  );
}