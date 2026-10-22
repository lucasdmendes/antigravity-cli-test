import React from 'react';
import { FastForward, FileText, CheckCircle2 } from 'lucide-react';
import { StoryPart, TerminalTheme } from '../types/story';
import { THEME_CONFIG } from '../utils/theme';

interface StoryPassageProps {
  part: StoryPart;
  displayedText: string;
  isTyping: boolean;
  onSkipTyping: () => void;
  theme: TerminalTheme;
}

export const StoryPassage: React.FC<StoryPassageProps> = ({
  part,
  displayedText,
  isTyping,
  onSkipTyping,
  theme,
}) => {
  const currentTheme = THEME_CONFIG[theme];
  const charCount = part.text.length;

  return (
    <div
      onClick={onSkipTyping}
      className={`relative w-full max-w-4xl mx-auto rounded-lg border ${currentTheme.border} ${currentTheme.surface} p-6 sm:p-8 backdrop-blur-md transition-all shadow-xl cursor-pointer group select-none`}
    >
      {/* Top Header of the Passage Card */}
      <div className="flex flex-wrap items-center justify-between border-b pb-4 mb-6 border-zinc-800/80 gap-3">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded ${currentTheme.badgeBg}`}>
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className={`text-[10px] uppercase font-mono tracking-wider ${currentTheme.mutedText}`}>
              Stage 0{part.chapterNumber} // Log Entry
            </div>
            <h2 className={`text-lg sm:text-xl font-bold tracking-tight ${currentTheme.brightText} font-mono`}>
              {part.title}
            </h2>
          </div>
        </div>

        {/* Character Count Telemetry Badge */}
        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className={`px-2.5 py-1 rounded-full ${currentTheme.badgeBg} flex items-center space-x-1.5`}>
            <span>{charCount}</span>
            <span className="text-zinc-500">/</span>
            <span className="text-zinc-400">~500 CHARS</span>
          </span>
        </div>
      </div>

      {/* Main Narrative Text with Typewriter */}
      <div className="min-h-[140px] sm:min-h-[160px] text-base sm:text-lg leading-relaxed font-mono relative">
        <p className={`${currentTheme.text} whitespace-pre-line tracking-wide`}>
          {displayedText}
          {isTyping && (
            <span className={`inline-block w-2.5 h-5 ml-1 align-middle bg-current animate-pulse ${currentTheme.glowClass}`} />
          )}
        </p>
      </div>

      {/* Skip Hint / Completed Indicator Bar */}
      <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono text-zinc-500">
        {isTyping ? (
          <div className="flex items-center space-x-2 text-zinc-400 group-hover:text-zinc-200 transition-colors">
            <FastForward className="w-3.5 h-3.5 animate-pulse" />
            <span>Click text or press [SPACE] to fast-forward...</span>
          </div>
        ) : (
          <div className="flex items-center space-x-1.5 text-zinc-400">
            <CheckCircle2 className={`w-3.5 h-3.5 ${currentTheme.text}`} />
            <span>TRANSMISSION COMPLETE. SELECT PROTOCOL BELOW.</span>
          </div>
        )}

        <span className="text-[10px] text-zinc-600 hidden sm:inline">
          NODE ID: #{part.id}
        </span>
      </div>
    </div>
  );
};
