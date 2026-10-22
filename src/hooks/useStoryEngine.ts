import { useState, useCallback } from 'react';
import { StoryPart, StoryChoice, GameStatus } from '../types/story';

export function useStoryEngine(storyData: StoryPart[]) {
  const [currentPartIndex, setCurrentPartIndex] = useState(0);
  const [status, setStatus] = useState<GameStatus>('PLAYING');
  const [attempts, setAttempts] = useState(1);
  const [highestPartReached, setHighestPartReached] = useState(1);
  const [selectedChoice, setSelectedChoice] = useState<StoryChoice | null>(null);
  const [history, setHistory] = useState<number[]>([1]);

  const currentPart = storyData[currentPartIndex] || storyData[0];
  const totalParts = storyData.length;

  const selectChoice = useCallback(
    (choice: StoryChoice) => {
      setSelectedChoice(choice);

      if (choice.isCorrect) {
        if (currentPartIndex + 1 < totalParts) {
          const nextIndex = currentPartIndex + 1;
          const nextPartId = storyData[nextIndex].id;
          setCurrentPartIndex(nextIndex);
          setHighestPartReached((prev) => Math.max(prev, nextPartId));
          setHistory((prev) => [...prev, nextPartId]);
        } else {
          // Reached the end!
          setStatus('VICTORY');
        }
      } else {
        // Wrong choice -> Game Over!
        setStatus('GAME_OVER');
      }
    },
    [currentPartIndex, totalParts, storyData]
  );

  // Restart from the very first page
  const restartGame = useCallback(() => {
    setCurrentPartIndex(0);
    setStatus('PLAYING');
    setSelectedChoice(null);
    setAttempts((prev) => prev + 1);
    setHistory([storyData[0]?.id || 1]);
  }, [storyData]);

  // Full reset (e.g. after victory)
  const resetAll = useCallback(() => {
    setCurrentPartIndex(0);
    setStatus('PLAYING');
    setSelectedChoice(null);
    setAttempts(1);
    setHighestPartReached(1);
    setHistory([storyData[0]?.id || 1]);
  }, [storyData]);

  return {
    currentPart,
    currentPartIndex,
    totalParts,
    status,
    attempts,
    highestPartReached,
    selectedChoice,
    history,
    selectChoice,
    restartGame,
    resetAll,
  };
}
