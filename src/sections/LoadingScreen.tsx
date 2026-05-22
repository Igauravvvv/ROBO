import { useState, useEffect, useCallback } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';

interface LoadingScreenProps {
  onComplete: () => void;
}

const FloatingParticle = ({ delay, x, size, duration }: { delay: number; x: number; size: number; duration: number }) => (
  <div
    className="absolute rounded-full animate-floatHeart"
    style={{
      left: `${x}%`,
      width: size,
      height: size,
      background: Math.random() > 0.5 ? 'linear-gradient(135deg, #FFC1CC, #FFB6C1)' : 'linear-gradient(135deg, #FFD1DC, #FF8E9E)',
      opacity: 0.4 + Math.random() * 0.3,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      filter: 'blur(1px)',
    }}
  />
);

const HeartParticle = ({ delay, x, size, duration }: { delay: number; x: number; size: number; duration: number }) => (
  <svg
    className="absolute animate-floatHeart"
    style={{
      left: `${x}%`,
      width: size,
      height: size,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    }}
    viewBox="0 0 24 24"
    fill={Math.random() > 0.5 ? '#FFC1CC' : '#FFB6C1'}
    opacity={0.4 + Math.random() * 0.3}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [canEnter, setCanEnter] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const { displayedText, isComplete } = useTypewriter({
    text: 'You are my favorite feeling.',
    speed: 80,
    autoStart: true,
  });

  // Progress animation
  useEffect(() => {
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setCanEnter(true), 300);
            return 100;
          }
          return prev + 1;
        });
      }, 30);
      return () => clearInterval(interval);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handleEnter = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      onComplete();
    }, 1000);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-all duration-1000 ${
        isExiting ? 'opacity-0 translate-y-[-100%]' : 'opacity-100'
      }`}
      style={{
        background: 'linear-gradient(135deg, #FFF5F7 0%, #FFD1DC 40%, #FFC1CC 70%, #FFB6C1 100%)',
        backgroundSize: '200% 200%',
        animation: 'gradientShift 20s ease infinite',
      }}
    >
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <FloatingParticle
            key={`p-${i}`}
            delay={i * 0.8}
            x={10 + Math.random() * 80}
            size={8 + Math.random() * 16}
            duration={12 + Math.random() * 8}
          />
        ))}
        {Array.from({ length: 12 }).map((_, i) => (
          <HeartParticle
            key={`h-${i}`}
            delay={i * 1.2 + 0.5}
            x={5 + Math.random() * 90}
            size={14 + Math.random() * 12}
            duration={14 + Math.random() * 6}
          />
        ))}
      </div>

      {/* Name display */}
      <h1
        className="font-script text-[72px] md:text-[96px] text-textDark relative z-10 glow-text-pink animate-float"
        style={{ animationDuration: '5s' }}
      >
        My Love
      </h1>

      {/* Typewriter text */}
      <div className="mt-4 text-center relative z-10">
        <p className="text-[18px] md:text-[20px] font-body font-light text-textDark min-h-[28px]">
          {displayedText}
          {!isComplete && (
            <span className="inline-block w-[2px] h-[20px] bg-romanticRed ml-1 animate-pulse" />
          )}
        </p>
      </div>

      {/* Progress bar */}
      <div className="mt-8 w-[200px] h-[2px] bg-white/50 rounded-full relative z-10 overflow-hidden">
        <div
          className="h-full bg-rosePink rounded-full transition-all duration-300 ease-out"
          style={{
            width: `${progress}%`,
            boxShadow: '0 0 10px rgba(255, 182, 193, 0.8)',
          }}
        />
      </div>

      {/* Enter button */}
      <div
        className={`mt-10 transition-all duration-700 relative z-10 ${
          canEnter ? 'opacity-100 scale-100' : 'opacity-0 scale-90 pointer-events-none'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      >
        <button
          onClick={handleEnter}
          className="px-10 py-4 rounded-full text-white font-body font-semibold text-[16px]
                     gradient-red-blush shadow-glowRed hover:shadow-glowRed hover:scale-105
                     active:scale-95 transition-all duration-300 cursor-pointer"
        >
          Enter Her Universe ❤
        </button>
      </div>
    </div>
  );
}
