import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useStoryEngine } from '../hooks/useStoryEngine';
import { STORY_DATA } from '../data/storyData';

describe('useStoryEngine State Transitions', () => {
  it('initializes with part index 0, status PLAYING, and attempts 1', () => {
    const { result } = renderHook(() => useStoryEngine(STORY_DATA));

    expect(result.current.currentPartIndex).toBe(0);
    expect(result.current.status).toBe('PLAYING');
    expect(result.current.attempts).toBe(1);
    expect(result.current.currentPart.id).toBe(1);
  });

  it('advances to next part when selecting a correct choice', () => {
    const { result } = renderHook(() => useStoryEngine(STORY_DATA));

    const correctChoice = result.current.currentPart.choices.find((c) => c.isCorrect)!;
    expect(correctChoice).toBeDefined();

    act(() => {
      result.current.selectChoice(correctChoice);
    });

    expect(result.current.currentPartIndex).toBe(1);
    expect(result.current.status).toBe('PLAYING');
    expect(result.current.currentPart.id).toBe(2);
  });

  it('sets status to GAME_OVER when selecting an incorrect choice', () => {
    const { result } = renderHook(() => useStoryEngine(STORY_DATA));

    const wrongChoice = result.current.currentPart.choices.find((c) => !c.isCorrect)!;
    expect(wrongChoice).toBeDefined();

    act(() => {
      result.current.selectChoice(wrongChoice);
    });

    expect(result.current.status).toBe('GAME_OVER');
    expect(result.current.selectedChoice?.id).toBe(wrongChoice.id);
    expect(result.current.selectedChoice?.consequence).toBeDefined();
    // Index should remain where failure occurred so failure context is visible
    expect(result.current.currentPartIndex).toBe(0);
  });

  it('restarts from first page and increments attempt count when restartGame() is called', () => {
    const { result } = renderHook(() => useStoryEngine(STORY_DATA));

    // Advance to part 2
    const correct1 = result.current.currentPart.choices.find((c) => c.isCorrect)!;
    act(() => {
      result.current.selectChoice(correct1);
    });
    expect(result.current.currentPartIndex).toBe(1);

    // Fail in part 2
    const wrong2 = result.current.currentPart.choices.find((c) => !c.isCorrect)!;
    act(() => {
      result.current.selectChoice(wrong2);
    });
    expect(result.current.status).toBe('GAME_OVER');

    // Trigger restart
    act(() => {
      result.current.restartGame();
    });

    // Must be back at first page
    expect(result.current.currentPartIndex).toBe(0);
    expect(result.current.status).toBe('PLAYING');
    expect(result.current.currentPart.id).toBe(1);
    expect(result.current.attempts).toBe(2);
    expect(result.current.selectedChoice).toBeNull();
  });

  it('transitions to VICTORY upon completing all 5 correct choices', () => {
    const { result } = renderHook(() => useStoryEngine(STORY_DATA));

    // Walk through all 5 parts choosing only the correct option
    for (let i = 0; i < STORY_DATA.length; i++) {
      const correct = result.current.currentPart.choices.find((c) => c.isCorrect)!;
      act(() => {
        result.current.selectChoice(correct);
      });
    }

    expect(result.current.status).toBe('VICTORY');

    // Play again via resetAll
    act(() => {
      result.current.resetAll();
    });

    expect(result.current.currentPartIndex).toBe(0);
    expect(result.current.status).toBe('PLAYING');
    expect(result.current.attempts).toBe(1);
  });
});
