import { useState, useEffect, useRef, useCallback } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

export function useTypewriter({
  text,
  speed = 80,
  delay = 0,
  onComplete,
  autoStart = true,
}: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const indexRef = useRef(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startTyping = useCallback(() => {
    setIsTyping(true);
    indexRef.current = 0;
    setDisplayedText('');
    setIsComplete(false);

    const typeNext = () => {
      if (indexRef.current < text.length) {
        setDisplayedText(text.slice(0, indexRef.current + 1));
        indexRef.current++;
        timeoutRef.current = setTimeout(typeNext, speed);
      } else {
        setIsComplete(true);
        setIsTyping(false);
        onComplete?.();
      }
    };

    timeoutRef.current = setTimeout(typeNext, delay);
  }, [text, speed, delay, onComplete]);

  const skip = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDisplayedText(text);
    setIsComplete(true);
    setIsTyping(false);
    onComplete?.();
  }, [text, onComplete]);

  const reset = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDisplayedText('');
    setIsComplete(false);
    setIsTyping(false);
    indexRef.current = 0;
  }, []);

  useEffect(() => {
    if (autoStart) {
      startTyping();
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [autoStart, startTyping]);

  return { displayedText, isComplete, isTyping, skip, reset, startTyping };
}
