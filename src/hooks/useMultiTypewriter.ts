import { useState, useEffect, useRef, useCallback } from 'react';

interface Paragraph {
  text: string;
  pauseAfter?: number;
}

interface UseMultiTypewriterOptions {
  paragraphs: Paragraph[];
  speed?: number;
  initialDelay?: number;
  onComplete?: () => void;
  autoStart?: boolean;
}

export function useMultiTypewriter({
  paragraphs,
  speed = 50,
  initialDelay = 500,
  onComplete,
  autoStart = true,
}: UseMultiTypewriterOptions) {
  const [displayedParagraphs, setDisplayedParagraphs] = useState<string[]>(
    paragraphs.map(() => '')
  );
  const [currentParaIndex, setCurrentParaIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const startTyping = useCallback(() => {
    clearAllTimeouts();
    setDisplayedParagraphs(paragraphs.map(() => ''));
    setCurrentParaIndex(0);
    setIsComplete(false);
    setIsTyping(true);

    let paraIdx = 0;
    let charIdx = 0;

    const typeNext = () => {
      if (paraIdx >= paragraphs.length) {
        setIsComplete(true);
        setIsTyping(false);
        onComplete?.();
        return;
      }

      const currentPara = paragraphs[paraIdx];
      if (charIdx < currentPara.text.length) {
        setDisplayedParagraphs(prev => {
          const next = [...prev];
          next[paraIdx] = currentPara.text.slice(0, charIdx + 1);
          return next;
        });
        charIdx++;
        const t = setTimeout(typeNext, speed);
        timeoutsRef.current.push(t);
      } else {
        paraIdx++;
        charIdx = 0;
        setCurrentParaIndex(paraIdx);
        const pause = currentPara.pauseAfter ?? 500;
        const t = setTimeout(typeNext, pause);
        timeoutsRef.current.push(t);
      }
    };

    const t = setTimeout(typeNext, initialDelay);
    timeoutsRef.current.push(t);
  }, [paragraphs, speed, initialDelay, onComplete, clearAllTimeouts]);

  const skip = useCallback(() => {
    clearAllTimeouts();
    setDisplayedParagraphs(paragraphs.map(p => p.text));
    setCurrentParaIndex(paragraphs.length);
    setIsComplete(true);
    setIsTyping(false);
    onComplete?.();
  }, [paragraphs, onComplete, clearAllTimeouts]);

  const reset = useCallback(() => {
    clearAllTimeouts();
    setDisplayedParagraphs(paragraphs.map(() => ''));
    setCurrentParaIndex(0);
    setIsComplete(false);
    setIsTyping(false);
  }, [paragraphs, clearAllTimeouts]);

  useEffect(() => {
    if (autoStart) {
      startTyping();
    }
    return () => clearAllTimeouts();
  }, [autoStart, startTyping, clearAllTimeouts]);

  return {
    displayedParagraphs,
    currentParaIndex,
    isComplete,
    isTyping,
    skip,
    reset,
    startTyping,
  };
}
