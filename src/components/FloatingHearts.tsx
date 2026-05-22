import { useEffect, useRef, useCallback } from 'react';

interface Heart {
  id: number;
  x: number;
  size: number;
  speed: number;
  opacity: number;
  color: string;
  swayOffset: number;
  swaySpeed: number;
}

const COLORS = ['#FFC1CC', '#FFB6C1', '#FF6B81', '#FF8E9E', '#FFD1DC'];

interface FloatingHeartsProps {
  count?: number;
  className?: string;
  spawnRate?: number;
}

export default function FloatingHearts({ count = 20, className = '', spawnRate = 2000 }: FloatingHeartsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heartsRef = useRef<Heart[]>([]);
  const animationRef = useRef<number | null>(null);
  const lastSpawnRef = useRef(0);
  const idCounterRef = useRef(0);

  const createHeart = useCallback((): Heart => {
    idCounterRef.current += 1;
    return {
      id: idCounterRef.current,
      x: Math.random() * 100,
      size: 12 + Math.random() * 16,
      speed: 0.3 + Math.random() * 0.5,
      opacity: 0.3 + Math.random() * 0.4,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      swayOffset: Math.random() * Math.PI * 2,
      swaySpeed: 0.5 + Math.random() * 1,
    };
  }, []);

  useEffect(() => {
    // Initialize with some hearts
    for (let i = 0; i < Math.min(count, 8); i++) {
      const heart = createHeart();
      heart.x = Math.random() * 100;
      heartsRef.current.push(heart);
    }

    const animate = (time: number) => {
      if (!containerRef.current) return;

      // Spawn new hearts
      if (time - lastSpawnRef.current > spawnRate && heartsRef.current.length < count) {
        heartsRef.current.push(createHeart());
        lastSpawnRef.current = time;
      }

      // Update hearts
      const hearts = containerRef.current.querySelectorAll<SVGSVGElement>('.floating-heart');
      heartsRef.current = heartsRef.current.filter((heart, idx) => {
        const el = hearts[idx];
        if (!el) return true;

        const y = parseFloat(el.style.top || '0') - heart.speed;
        const sway = Math.sin((time / 1000) * heart.swaySpeed + heart.swayOffset) * 15;

        if (y < -10) {
          el.remove();
          return false;
        }

        el.style.top = `${y}%`;
        el.style.left = `${heart.x + sway * 0.1}%`;
        el.style.opacity = `${heart.opacity * (y > 90 ? (100 - y) / 10 : y < 10 ? y / 10 : 1)}`;

        return true;
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [count, createHeart, spawnRate]);

  return (
    <div ref={containerRef} className={`pointer-events-none fixed inset-0 overflow-hidden z-0 ${className}`}>
      {heartsRef.current.map((heart) => (
        <svg
          key={heart.id}
          className="floating-heart absolute will-change-transform"
          style={{
            left: `${heart.x}%`,
            top: '105%',
            width: heart.size,
            height: heart.size,
            opacity: heart.opacity,
          }}
          viewBox="0 0 24 24"
          fill={heart.color}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}
    </div>
  );
}
