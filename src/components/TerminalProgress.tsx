import React from 'react';
import { TerminalTheme } from '../types/story';
import { THEME_CONFIG } from '../utils/theme';

interface TerminalProgressProps {
  theme: TerminalTheme;
  currentIndex: number;
  totalParts: number;
  location: string;
}

export const TerminalProgress: React.FC<TerminalProgressProps> = ({
  theme,
  currentIndex,
  totalParts,
  location,
}) => {
  const currentTheme = THEME_CONFIG[theme];
  const progressPercent = Math.round(((currentIndex + 1) / totalParts) * 100);

  return (
    <div className={`w-full max-w-4xl mx-auto px-4 py-2 border-b ${currentTheme.border} flex flex-wrap items-center justify-between text-xs font-mono`}>
      {/* Location Breadcrumb */}
      <div className="flex items-center space-x-2 text-zinc-400">
        <span className={currentTheme.mutedText}>LOC &gt;</span>
        <span className="tracking-wide uppercase">{location}</span>
      </div>

      {/* Segmented Step Blocks */}
      <div className="flex items-center space-x-2">
        <span className="text-zinc-500 hidden sm:inline">SECTOR PROGRESS:</span>
        <div className="flex items-center space-x-1">
          {Array.from({ length: totalParts }).map((_, idx) => {
            const isCompleted = idx < currentIndex;
            const isCurrent = idx === currentIndex;
            return (
              <div
                key={idx}
                className={`h-2.5 w-6 sm:w-8 rounded-sm transition-all duration-300 ${
                  isCompleted
                    ? `${currentTheme.text} bg-current opacity-70`
                    : isCurrent
                    ? `${currentTheme.text} bg-current animate-pulse shadow-[0_0_8px_currentColor]`
                    : 'bg-zinc-800/80 border border-zinc-700/50'
                }`}
                title={`Stage ${idx + 1}`}
              />
            );
          })}
        </div>
        <span className={`font-bold ml-1 ${currentTheme.brightText}`}>
          {progressPercent}%
        </span>
      </div>
    </div>
  );
};
