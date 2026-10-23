import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useTypewriter } from '../hooks/useTypewriter';

describe('useTypewriter Hook', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('initializes with empty text and isTyping true', () => {
    const text = 'Testing terminal transmission...';
    const { result } = renderHook(() => useTypewriter(text, { speed: 20 }));

    expect(result.current.displayedText).toBe('');
    expect(result.current.isTyping).toBe(true);
  });

  it('streams characters as time advances', () => {
    const text = 'Testing terminal transmission...';
    const { result } = renderHook(() => useTypewriter(text, { speed: 20 }));

    // Advance 100ms (5 characters)
    act(() => {
      vi.advanceTimersByTime(100);
    });

    expect(result.current.displayedText).toBe(text.slice(0, 5));
    expect(result.current.isTyping).toBe(true);

    // Advance enough time to finish text
    act(() => {
      vi.advanceTimersByTime(text.length * 20);
    });

    expect(result.current.displayedText).toBe(text);
    expect(result.current.isTyping).toBe(false);
  });

  it('immediately reveals full text when skipTyping is called', () => {
    const text = 'A long encrypted atmospheric log entry.';
    const onComplete = vi.fn();
    const { result } = renderHook(() => useTypewriter(text, { speed: 50, onComplete }));

    act(() => {
      vi.advanceTimersByTime(50); // only 1 char
    });
    expect(result.current.isTyping).toBe(true);

    // Call skipTyping
    act(() => {
      result.current.skipTyping();
    });

    expect(result.current.displayedText).toBe(text);
    expect(result.current.isTyping).toBe(false);
    expect(onComplete).toHaveBeenCalledTimes(1);
  });

  it('resets when the input text changes', () => {
    let text = 'Message Alpha';
    const { result, rerender } = renderHook(() => useTypewriter(text, { speed: 10 }));

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current.displayedText).toBe('Message Alpha');
    expect(result.current.isTyping).toBe(false);

    // Change text prop
    text = 'Message Beta';
    rerender();

    expect(result.current.displayedText).toBe('');
    expect(result.current.isTyping).toBe(true);

    act(() => {
      vi.advanceTimersByTime(200);
    });
    expect(result.current.displayedText).toBe('Message Beta');
    expect(result.current.isTyping).toBe(false);
  });
});
