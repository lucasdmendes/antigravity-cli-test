import React from 'react';
import { ChevronRight } from 'lucide-react';
import { StoryChoice, TerminalTheme } from '../types/story';
import { THEME_CONFIG } from '../utils/theme';

interface ChoicePromptProps {
  choices: [StoryChoice, StoryChoice, StoryChoice];
  onSelectChoice: (choice: StoryChoice) => void;
  isTyping: boolean;
  theme: TerminalTheme;
}

export const ChoicePrompt: React.FC<ChoicePromptProps> = ({
  choices,
  onSelectChoice,
  isTyping,
  theme,
}) => {
  const currentTheme = THEME_CONFIG[theme];

  return (
    <div className="w-full max-w-4xl mx-auto mt-6 animate-fade-in">
      <div className="flex items-center justify-between mb-3 px-1 font-mono text-xs text-zinc-400">
        <div className="flex items-center space-x-2">
          <span className={currentTheme.text}>&gt;&gt;</span>
          <span className="uppercase tracking-widest font-semibold">Available Protocols (1 Correct / 2 Fatal)</span>
        </div>
        <span className="text-zinc-500 hidden sm:inline">[PRESS 1, 2, OR 3 TO SELECT]</span>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {choices.map((choice, index) => {
          const keyNum = index + 1;
          return (
            <button
              key={choice.id}
              onClick={() => onSelectChoice(choice)}
              className={`w-full text-left p-4 sm:p-5 rounded-lg border transition-all duration-200 flex items-start space-x-4 group ${
                currentTheme.surface
              } ${currentTheme.border} ${currentTheme.choiceHover} ${
                isTyping ? 'opacity-85' : 'opacity-100 hover:scale-[1.008]'
              }`}
            >
              {/* Key index badge */}
              <div
                className={`font-mono text-xs font-bold px-2 py-1 rounded border border-zinc-700 bg-black/60 transition-colors group-hover:border-current ${currentTheme.text}`}
              >
                0{keyNum}
              </div>

              {/* Choice description */}
              <div className="flex-1">
                <p className={`font-mono text-sm sm:text-base leading-relaxed ${currentTheme.brightText} group-hover:text-white transition-colors`}>
                  {choice.text}
                </p>
              </div>

              {/* Arrow Indicator */}
              <div className={`mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity ${currentTheme.text}`}>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
