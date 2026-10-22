import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTypewriterOptions {
  speed?: number; // ms per character
  onComplete?: () => void;
}

export function useTypewriter(text: string, options: UseTypewriterOptions = {}) {
  const { speed = 18, onComplete } = options;
  const [displayedLength, setDisplayedLength] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Clear timer helper
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // When text changes, reset and start typing
  useEffect(() => {
    clearTimer();
    setDisplayedLength(0);
    setIsTyping(true);

    if (!text) {
      setIsTyping(false);
      return;
    }

    timerRef.current = setInterval(() => {
      setDisplayedLength((prev) => {
        const next = prev + 1;
        if (next >= text.length) {
          clearTimer();
          setIsTyping(false);
          if (onComplete) onComplete();
          return text.length;
        }
        return next;
      });
    }, speed);

    return () => {
      clearTimer();
    };
  }, [text, speed, clearTimer, onComplete]);

  // Skip typing instantly
  const skipTyping = useCallback(() => {
    if (!isTyping) return;
    clearTimer();
    setDisplayedLength(text.length);
    setIsTyping(false);
    if (onComplete) onComplete();
  }, [clearTimer, isTyping, text.length, onComplete]);

  return {
    displayedText: text.slice(0, displayedLength),
    isTyping,
    skipTyping,
    progress: text.length > 0 ? displayedLength / text.length : 1,
  };
}
