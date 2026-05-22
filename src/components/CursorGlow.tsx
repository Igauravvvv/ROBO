import { useEffect, useRef } from 'react';

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -200, y: -200 });
  const targetRef = useRef({ x: -200, y: -200 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      const pos = posRef.current;
      const target = targetRef.current;
      
      pos.x += (target.x - pos.x) * 0.12;
      pos.y += (target.y - pos.y) * 0.12;

      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${pos.x - 100}px, ${pos.y - 100}px)`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed top-0 left-0 w-[200px] h-[200px] rounded-full pointer-events-none z-50 mix-blend-soft-light hidden md:block"
      style={{
        background: 'radial-gradient(circle, rgba(255,193,204,0.18) 0%, transparent 70%)',
        transform: 'translate(-200px, -200px)',
      }}
    />
  );
}
