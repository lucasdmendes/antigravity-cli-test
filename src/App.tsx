import React, { useState, useEffect } from 'react';
import { TerminalHeader } from './components/TerminalHeader';
import { TerminalProgress } from './components/TerminalProgress';
import { StoryPassage } from './components/StoryPassage';
import { ChoicePrompt } from './components/ChoicePrompt';
import { GameOverView } from './components/GameOverView';
import { VictoryView } from './components/VictoryView';
import { useStoryEngine } from './hooks/useStoryEngine';
import { useTypewriter } from './hooks/useTypewriter';
import { STORY_DATA } from './data/storyData';
import { TerminalTheme, StoryChoice } from './types/story';
import { THEME_CONFIG } from './utils/theme';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<TerminalTheme>('green');
  const [scanlines, setScanlines] = useState<boolean>(true);

  const {
    currentPart,
    currentPartIndex,
    totalParts,
    status,
    attempts,
    highestPartReached,
    selectedChoice,
    selectChoice,
    restartGame,
    resetAll,
  } = useStoryEngine(STORY_DATA);

  // Typewriter effect for the current part's narrative text
  const { displayedText, isTyping, skipTyping } = useTypewriter(currentPart.text, {
    speed: 16,
  });

  // Handle choice selection with auto-skip typing safeguard
  const handleSelectChoice = (choice: StoryChoice) => {
    if (isTyping) {
      skipTyping();
    }
    selectChoice(choice);
  };

  // Keyboard controls listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't intercept if an input is focused (none here, but good practice)
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      if (status === 'PLAYING') {
        if (e.code === 'Space') {
          if (isTyping) {
            e.preventDefault();
            skipTyping();
          }
        } else if (e.key === '1') {
          e.preventDefault();
          handleSelectChoice(currentPart.choices[0]);
        } else if (e.key === '2') {
          e.preventDefault();
          handleSelectChoice(currentPart.choices[1]);
        } else if (e.key === '3') {
          e.preventDefault();
          handleSelectChoice(currentPart.choices[2]);
        }
      } else if (status === 'GAME_OVER') {
        if (e.key.toLowerCase() === 'r' || e.key === 'Enter') {
          e.preventDefault();
          restartGame();
        }
      } else if (status === 'VICTORY') {
        if (e.key.toLowerCase() === 'r' || e.key === 'Enter') {
          e.preventDefault();
          resetAll();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, isTyping, currentPart, skipTyping, restartGame, resetAll]);

  const currentTheme = THEME_CONFIG[theme];

  return (
    <div className={`min-h-screen ${currentTheme.bg} text-white flex flex-col relative transition-colors duration-300 font-mono overflow-x-hidden selection:bg-white/20`}>
      {/* Optional CRT Scanlines Layer */}
      {scanlines && (
        <div className="fixed inset-0 crt-scanlines pointer-events-none z-50" />
      )}

      {/* Terminal Top Navigation Header */}
      <TerminalHeader
        theme={theme}
        setTheme={setTheme}
        scanlines={scanlines}
        setScanlines={setScanlines}
        status={status}
        attempts={attempts}
        highestPartReached={highestPartReached}
        onRestart={restartGame}
      />

      {/* Progress & Breadcrumbs */}
      {status === 'PLAYING' && (
        <TerminalProgress
          theme={theme}
          currentIndex={currentPartIndex}
          totalParts={totalParts}
          location={currentPart.location}
        />
      )}

      {/* Main Dynamic Viewport */}
      <main className="flex-1 flex flex-col justify-center px-4 py-8 max-w-5xl mx-auto w-full">
        {status === 'PLAYING' && (
          <div className="w-full flex flex-col items-center">
            <StoryPassage
              part={currentPart}
              displayedText={displayedText}
              isTyping={isTyping}
              onSkipTyping={skipTyping}
              theme={theme}
            />

            <ChoicePrompt
              choices={currentPart.choices}
              onSelectChoice={handleSelectChoice}
              isTyping={isTyping}
              theme={theme}
            />
          </div>
        )}

        {status === 'GAME_OVER' && (
          <GameOverView
            failedPart={currentPart}
            selectedChoice={selectedChoice}
            attempts={attempts}
            highestPartReached={highestPartReached}
            onRestart={restartGame}
            theme={theme}
          />
        )}

        {status === 'VICTORY' && (
          <VictoryView
            attempts={attempts}
            onPlayAgain={resetAll}
            theme={theme}
          />
        )}
      </main>

      {/* Minimal Footer */}
      <footer className={`w-full border-t ${currentTheme.border} py-3 px-4 text-center text-xs text-zinc-500 font-mono`}>
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <span>SHORTCUTS: [1, 2, 3] SELECT PROTOCOL &bull; [SPACE] FAST-FORWARD &bull; [R] REBOOT</span>
          <span className="text-zinc-600">SPEC: 500 CHAR PASSAGES // 3 CHOICES (1 VALID / 2 FATAL)</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
