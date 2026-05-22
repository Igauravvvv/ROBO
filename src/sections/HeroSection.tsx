import { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface PhotoFrame {
  src: string;
  x: string;
  y: string;
  size: number;
  rotation: number;
  zIndex: number;
  floatDuration: number;
  floatDelay: number;
  speed: number;
}

const photos: PhotoFrame[] = [
  { src: '/images/pic_fairy.jpeg', x: '8%', y: '15%', size: 260, rotation: -3, zIndex: 5, floatDuration: 5, floatDelay: 0, speed: 0.5 },
  { src: '/images/pic_hot.jpeg', x: '72%', y: '8%', size: 200, rotation: 8, zIndex: 3, floatDuration: 6, floatDelay: 0.5, speed: 0.8 },
  { src: '/images/Pic_myfav.jpeg', x: '3%', y: '55%', size: 180, rotation: -10, zIndex: 4, floatDuration: 7, floatDelay: 1, speed: 1.2 },
  { src: '/images/pic_in_suit.jpeg', x: '68%', y: '45%', size: 220, rotation: 5, zIndex: 6, floatDuration: 5.5, floatDelay: 0.3, speed: 1.5 },
  { src: '/images/pic_hot_2.jpeg', x: '40%', y: '5%', size: 160, rotation: -7, zIndex: 2, floatDuration: 6.5, floatDelay: 0.8, speed: 0.6 },
  { src: '/images/pic_suit_2.jpeg', x: '78%', y: '62%', size: 190, rotation: 12, zIndex: 3, floatDuration: 7.5, floatDelay: 1.2, speed: 0.9 },
  { src: '/images/Pic_faces.jpeg', x: '45%', y: '58%', size: 140, rotation: 4, zIndex: 7, floatDuration: 5, floatDelay: 0.2, speed: 1.1 },
];

const FloatingHeart = ({ delay, x, duration }: { delay: number; x: number; duration: number }) => (
  <svg
    className="absolute animate-floatHeart pointer-events-none"
    style={{
      left: `${x}%`,
      width: 16 + Math.random() * 8,
      height: 16 + Math.random() * 8,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    }}
    viewBox="0 0 24 24"
    fill={Math.random() > 0.5 ? '#FFB6C1' : '#FF6B81'}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

export default function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const photoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Image preload
  useEffect(() => {
    let loaded = 0;
    const total = photos.length;
    photos.forEach((p) => {
      const img = new Image();
      img.onload = () => {
        loaded++;
        if (loaded === total) setImagesLoaded(true);
      };
      img.onerror = () => {
        loaded++;
        if (loaded === total) setImagesLoaded(true);
      };
      img.src = p.src;
    });
  }, []);

  // GSAP animations
  useEffect(() => {
    if (!imagesLoaded || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out', delay: 0.3 }
      );

      // Subtitle
      gsap.fromTo(
        subRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: 0.8 }
      );

      // CTA
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', delay: 1.2 }
      );

      // Photo parallax on scroll
      photoRefs.current.forEach((photo, i) => {
        if (!photo) return;
        const speed = photos[i].speed;
        gsap.to(photo, {
          y: () => -150 * speed,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      });

      // Headline fade on scroll
      gsap.to(headlineRef.current, {
        opacity: 0,
        scale: 0.95,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '30% top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [imagesLoaded]);

  const scrollToNext = () => {
    const next = document.getElementById('versions-section');
    if (next) next.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full overflow-hidden gradient-hero"
    >
      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <FloatingHeart
            key={i}
            delay={i * 1.1}
            x={5 + (i * 5) % 90}
            duration={12 + (i % 5) * 2}
          />
        ))}
      </div>

      {/* Floating photo collage */}
      <div className="absolute inset-0 pointer-events-none">
        {photos.map((photo, i) => (
          <div
            key={i}
            ref={el => { photoRefs.current[i] = el; }}
            className="absolute cursor-pointer pointer-events-auto group"
            style={{
              left: photo.x,
              top: photo.y,
              width: photo.size,
              zIndex: photo.zIndex,
              transform: `rotate(${photo.rotation}deg)`,
              animation: `float ${photo.floatDuration}s ease-in-out infinite`,
              animationDelay: `${photo.floatDelay}s`,
            }}
          >
            <div
              className="relative rounded-3xl overflow-hidden border-2 transition-all duration-500 group-hover:scale-110 group-hover:rotate-0 group-hover:z-50"
              style={{
                borderColor: 'rgba(255, 182, 193, 0.5)',
                boxShadow: '0 8px 32px rgba(255, 107, 129, 0.15)',
              }}
            >
              <img
                src={photo.src}
                alt={`Her photo ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                style={{ aspectRatio: '3/4' }}
                loading={i < 3 ? 'eager' : 'lazy'}
              />
              {/* Subtle glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-blush/20 to-transparent pointer-events-none" />
            </div>
          </div>
        ))}
      </div>

      {/* Center content */}
      <div
        ref={headlineRef}
        className="relative z-10 flex flex-col items-center justify-center min-h-[100dvh] px-4"
      >
        <h1 className="font-display text-[14vw] md:text-[12vw] lg:text-[10vw] font-normal text-white text-center leading-[0.85] glow-text-soft select-none">
          <span className="block">Happy Birthday</span>
          <span className="block mt-2">
            Beautiful{' '}
            <span className="inline-block animate-pulseHeart">❤️</span>
          </span>
        </h1>

        <p
          ref={subRef}
          className="mt-6 text-[16px] md:text-[20px] font-body font-light text-textDark text-center max-w-[500px] opacity-80"
        >
          23 May 2026 — the universe made art when it made you.
        </p>

        <button
          ref={ctaRef}
          onClick={scrollToNext}
          className="mt-8 px-10 py-4 rounded-full text-white font-body font-semibold text-[16px]
                     gradient-red-blush shadow-glowRed hover:shadow-glowRed hover:scale-105
                     active:scale-95 transition-all duration-300 cursor-pointer"
        >
          Enter Her Universe
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounceSoft">
        <ChevronDown className="w-6 h-6 text-textLight/60" />
      </div>
    </section>
  );
}
