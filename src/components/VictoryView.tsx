import React from 'react';
import { Trophy, CheckCircle, RotateCcw, Award } from 'lucide-react';
import { TerminalTheme } from '../types/story';
import { THEME_CONFIG } from '../utils/theme';

interface VictoryViewProps {
  attempts: number;
  onPlayAgain: () => void;
  theme: TerminalTheme;
}

export const VictoryView: React.FC<VictoryViewProps> = ({
  attempts,
  onPlayAgain,
  theme,
}) => {
  const currentTheme = THEME_CONFIG[theme];
  const isFlawless = attempts === 1;

  return (
    <div className="w-full max-w-2xl mx-auto my-auto animate-fade-in font-mono">
      <div className={`rounded-xl border-2 ${currentTheme.border} ${currentTheme.surface} p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden`}>
        {/* Glow header */}
        <div className="flex items-center space-x-3 text-emerald-400 mb-6">
          <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30">
            <Trophy className="w-7 h-7 text-emerald-400" />
          </div>
          <div>
            <div className={`text-[11px] uppercase tracking-widest ${currentTheme.mutedText} font-bold`}>
              Extraction Protocol Confirmed
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              MISSION ACCOMPLISHED // VICTORY
            </h1>
          </div>
        </div>

        {/* Narrative conclusion */}
        <div className="p-4 sm:p-5 rounded-lg bg-black/60 border border-zinc-800 mb-6">
          <div className="flex items-center space-x-2 text-xs text-emerald-400 mb-2 font-semibold">
            <CheckCircle className="w-4 h-4" />
            <span className="uppercase tracking-wider">Surface Orbit Achieved</span>
          </div>
          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
            The escape pod surges through the subterranean silos, breaching the planetary crust into the cold starfields above. Behind you, Sector Nine dissolves in a silent flash of thermal discharge. You navigated every deadly trial with precision.
          </p>
        </div>

        {/* Badges and statistics */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
          <div className="p-3 rounded bg-zinc-900/70 border border-zinc-800 flex items-center space-x-3">
            <Award className="w-4 h-4 text-emerald-400" />
            <div>
              <div className="text-zinc-500 uppercase text-[10px]">Classification</div>
              <div className="text-emerald-300 font-bold">
                {isFlawless ? 'PERFECT RUN (FLAWLESS)' : 'SURVIVOR'}
              </div>
            </div>
          </div>
          <div className="p-3 rounded bg-zinc-900/70 border border-zinc-800 flex items-center space-x-3">
            <RotateCcw className="w-4 h-4 text-zinc-500" />
            <div>
              <div className="text-zinc-500 uppercase text-[10px]">Cycles Required</div>
              <div className="text-zinc-200 font-bold">{attempts} Attempt(s)</div>
            </div>
          </div>
        </div>

        {/* Action Button: Play Again */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onPlayAgain}
            className={`w-full py-4 px-6 rounded-lg font-bold text-sm uppercase tracking-wider ${currentTheme.accent} transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2 shadow-lg`}
          >
            <RotateCcw className="w-4 h-4" />
            <span>Embark on New Mission</span>
          </button>
        </div>

        {/* Hotkey hint */}
        <div className="mt-4 text-center text-zinc-500 text-xs">
          <span>Press </span>
          <kbd className="px-1.5 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-zinc-300 font-mono text-[10px]">
            ENTER
          </kbd>
          <span> or </span>
          <kbd className="px-1.5 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-zinc-300 font-mono text-[10px]">
            R
          </kbd>
          <span> to play again</span>
        </div>
      </div>
    </div>
  );
};
