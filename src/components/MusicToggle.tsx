import { useState, useRef, useCallback } from 'react';
import { Music, Music2 } from 'lucide-react';

interface MusicToggleProps {
  audioSrc?: string;
}

export default function MusicToggle({ audioSrc }: MusicToggleProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggle = useCallback(() => {
    if (!audioRef.current && audioSrc) {
      audioRef.current = new Audio(audioSrc);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.3;
    }

    if (audioRef.current) {
      if (isPlaying) {
        // Fade out
        const fadeOut = setInterval(() => {
          if (audioRef.current && audioRef.current.volume > 0.05) {
            audioRef.current.volume -= 0.05;
          } else {
            clearInterval(fadeOut);
            audioRef.current?.pause();
          }
        }, 50);
        setIsPlaying(false);
      } else {
        audioRef.current.volume = 0;
        audioRef.current.play().catch(() => {
          // Autoplay blocked
        });
        // Fade in
        const fadeIn = setInterval(() => {
          if (audioRef.current && audioRef.current.volume < 0.3) {
            audioRef.current.volume += 0.02;
          } else {
            clearInterval(fadeIn);
          }
        }, 50);
        setIsPlaying(true);
      }
    }
  }, [isPlaying, audioSrc]);

  return (
    <button
      onClick={toggle}
      className={`fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full glass flex items-center justify-center
                  transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95
                  ${isPlaying ? 'shadow-glowPink' : 'shadow-glass'}`}
      title={isPlaying ? 'Pause music' : 'Play music'}
    >
      {isPlaying ? (
        <Music2 className="w-5 h-5 text-romanticRed animate-pulse" />
      ) : (
        <Music className="w-5 h-5 text-textLight" />
      )}
    </button>
  );
}
