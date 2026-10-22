import React from 'react';
import { Terminal, Monitor, RefreshCw, Sparkles } from 'lucide-react';
import { TerminalTheme, GameStatus } from '../types/story';
import { THEME_CONFIG } from '../utils/theme';

interface TerminalHeaderProps {
  theme: TerminalTheme;
  setTheme: (theme: TerminalTheme) => void;
  scanlines: boolean;
  setScanlines: (val: boolean | ((prev: boolean) => boolean)) => void;
  status: GameStatus;
  attempts: number;
  highestPartReached: number;
  onRestart: () => void;
}

export const TerminalHeader: React.FC<TerminalHeaderProps> = ({
  theme,
  setTheme,
  scanlines,
  setScanlines,
  status,
  attempts,
  highestPartReached,
  onRestart,
}) => {
  const currentTheme = THEME_CONFIG[theme];

  return (
    <header className={`w-full border-b ${currentTheme.border} ${currentTheme.surface} px-4 py-3 backdrop-blur-md`}>
      <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Branding & Status */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Terminal className={`w-4 h-4 ${currentTheme.text}`} />
            <span className={`font-bold tracking-widest ${currentTheme.brightText} uppercase`}>
              Omega Deep // v2.0
            </span>
          </div>

          <span className="hidden sm:inline-block text-zinc-600">|</span>

          {/* System Status badge */}
          <div className="hidden sm:flex items-center space-x-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                status === 'PLAYING'
                  ? 'bg-emerald-400 animate-pulse'
                  : status === 'VICTORY'
                  ? 'bg-sky-400'
                  : 'bg-rose-500 animate-ping'
              }`}
            />
            <span className={`font-mono ${status === 'GAME_OVER' ? 'text-rose-400' : currentTheme.text}`}>
              {status === 'PLAYING' ? 'SYSTEM ONLINE' : status === 'VICTORY' ? 'OBJECTIVE COMPLETE' : 'CRITICAL FAILURE'}
            </span>
          </div>
        </div>

        {/* Center / Stats: Attempt / Cycle Telemetry */}
        <div className="flex items-center space-x-4">
          <div className={`px-2 py-1 rounded ${currentTheme.badgeBg} font-mono`}>
            CYCLE: <span className="font-bold">{String(attempts).padStart(2, '0')}</span>
          </div>
          <div className="hidden md:block text-zinc-500 font-mono">
            MAX DEPTH: <span className={currentTheme.brightText}>0{highestPartReached} / 05</span>
          </div>
        </div>

        {/* Right: Controls & Theme Selection */}
        <div className="flex items-center space-x-2">
          {/* CRT scanlines toggle */}
          <button
            onClick={() => setScanlines((prev) => !prev)}
            title="Toggle CRT Scanline Effect"
            className={`p-1.5 rounded border transition-colors ${
              scanlines
                ? `${currentTheme.border} ${currentTheme.text} bg-white/5`
                : 'border-zinc-800 text-zinc-500 hover:text-zinc-300'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
          </button>

          {/* Theme switcher */}
          <div className="flex items-center space-x-1 border border-zinc-800 rounded p-0.5 bg-black/40">
            {(['green', 'amber', 'slate'] as TerminalTheme[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase transition-all ${
                  theme === t
                    ? `${THEME_CONFIG[t].accent} font-bold`
                    : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Restart button */}
          <button
            onClick={onRestart}
            title="Restart from First Page"
            className={`p-1.5 rounded border border-zinc-800 text-zinc-400 hover:${currentTheme.text} hover:border-zinc-700 transition-colors flex items-center space-x-1`}
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[10px]">RESTART</span>
          </button>
        </div>
      </div>
    </header>
  );
};
