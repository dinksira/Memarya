'use client';

import { useState } from 'react';

interface LogoProps {
  currentLang: string;
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
}

export function Logo({ currentLang, showSubtitle = true, className = '', onClick }: LogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`block cursor-pointer ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="flex items-center gap-3 group">
        {/* Animated Logo Icon */}
        <div className="relative h-10 w-10 flex-shrink-0">
          <svg 
            viewBox="0 0 40 40" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-full w-full transition-transform duration-300 ${
              isHovered ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
            }`}
          >
            {/* Outer circle - Ethiopian Green */}
            <circle cx="20" cy="20" r="19" fill="#078C3F" />
            
            {/* Middle ring - Ethiopian Yellow */}
            <circle cx="20" cy="20" r="14" fill="#F9D006" />
            
            {/* Inner circle - Ethiopian Red */}
            <circle cx="20" cy="20" r="10" fill="#D21034" />
            
            {/* Code brackets with animation */}
            <text 
              x="20" 
              y="25" 
              textAnchor="middle" 
              fill="white" 
              fontSize="12" 
              fontWeight="bold" 
              fontFamily="'Courier New', monospace, system-ui"
              className={isHovered ? 'opacity-80' : 'opacity-100'}
            >
              {'{}'}
            </text>
          </svg>
          
          {/* Glow effect on hover */}
          <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-green-500/20 to-yellow-500/20 blur-sm transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`} />
        </div>

        {/* Logo Text */}
        <div className="flex flex-col">
          <h1 className="text-xl font-bold bg-gradient-to-r from-green-600 via-yellow-500 to-red-600 bg-clip-text text-transparent transition-all duration-300 group-hover:from-green-500 group-hover:to-yellow-500">
            {currentLang === 'am' ? 'መማርያ' : 'Memarya'}
          </h1>
          {showSubtitle && (
            <p className="text-xs text-muted-foreground mt-0.5 transition-colors duration-300 group-hover:text-foreground/80">
              {currentLang === 'am' ? 'የኮድ መማርያ መድረክ' : 'Interactive Coding Platform'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}