import React from 'react';
import { AlertOctagon, RotateCcw, Skull, Activity } from 'lucide-react';
import { StoryChoice, StoryPart, TerminalTheme } from '../types/story';
import { THEME_CONFIG } from '../utils/theme';

interface GameOverViewProps {
  failedPart: StoryPart;
  selectedChoice: StoryChoice | null;
  attempts: number;
  highestPartReached: number;
  onRestart: () => void;
  theme: TerminalTheme;
}

export const GameOverView: React.FC<GameOverViewProps> = ({
  failedPart,
  selectedChoice,
  attempts,
  highestPartReached,
  onRestart,
  theme,
}) => {
  const currentTheme = THEME_CONFIG[theme];

  return (
    <div className="w-full max-w-2xl mx-auto my-auto animate-fade-in font-mono">
      <div className="rounded-xl border-2 border-rose-500/80 bg-[#120507]/95 p-6 sm:p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(244,63,94,0.25)] relative overflow-hidden">
        {/* Subtle warning striped accent top */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-600 via-amber-500 to-rose-600" />

        {/* Header Alert */}
        <div className="flex items-center space-x-3 text-rose-400 mb-6">
          <div className="p-2.5 rounded-lg bg-rose-500/10 border border-rose-500/30">
            <AlertOctagon className="w-6 h-6 animate-pulse text-rose-500" />
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-widest text-rose-500 font-bold">
              Fatal Operation Sequence // Aborted
            </div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              TERMINAL ERROR: GAME OVER
            </h1>
          </div>
        </div>

        {/* Consequence Box */}
        <div className="p-4 sm:p-5 rounded-lg bg-black/60 border border-rose-900/60 mb-6">
          <div className="flex items-center space-x-2 text-xs text-rose-400/90 mb-2 font-semibold">
            <Skull className="w-4 h-4 text-rose-500" />
            <span className="uppercase tracking-wider">Fatal Outcome</span>
          </div>
          <p className="text-sm sm:text-base text-rose-200 leading-relaxed">
            {selectedChoice?.consequence || 'A lethal catastrophic mistake terminated your expedition.'}
          </p>

          {/* Action that triggered it */}
          {selectedChoice && (
            <div className="mt-3 pt-3 border-t border-rose-950/80 text-xs text-zinc-400 flex items-start space-x-2">
              <span className="text-rose-500 font-bold">DECISION:</span>
              <span className="italic line-through decoration-rose-500/60">
                "{selectedChoice.text}"
              </span>
            </div>
          )}
        </div>

        {/* Telemetry / Run Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6 text-xs">
          <div className="p-3 rounded bg-zinc-900/70 border border-zinc-800 flex items-center space-x-3">
            <Activity className="w-4 h-4 text-zinc-500" />
            <div>
              <div className="text-zinc-500 uppercase text-[10px]">Failed At</div>
              <div className="text-zinc-200 font-bold">Stage 0{failedPart.chapterNumber}</div>
            </div>
          </div>
          <div className="p-3 rounded bg-zinc-900/70 border border-zinc-800 flex items-center space-x-3">
            <RotateCcw className="w-4 h-4 text-zinc-500" />
            <div>
              <div className="text-zinc-500 uppercase text-[10px]">Total Cycles</div>
              <div className="text-zinc-200 font-bold">#{attempts} (Max: 0{highestPartReached})</div>
            </div>
          </div>
        </div>

        {/* Action Button: Restart from First Page */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onRestart}
            className="w-full py-4 px-6 rounded-lg font-bold text-sm uppercase tracking-wider bg-rose-600 hover:bg-rose-500 text-white transition-all transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center space-x-2 shadow-lg shadow-rose-900/40"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart from First Page</span>
          </button>
        </div>

        {/* Hotkey hint */}
        <div className="mt-4 text-center text-zinc-500 text-xs">
          <span>Press </span>
          <kbd className="px-1.5 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-zinc-300 font-mono text-[10px]">
            R
          </kbd>
          <span> or </span>
          <kbd className="px-1.5 py-0.5 rounded border border-zinc-700 bg-zinc-800 text-zinc-300 font-mono text-[10px]">
            ENTER
          </kbd>
          <span> to initiate reboot</span>
        </div>
      </div>
    </div>
  );
};
