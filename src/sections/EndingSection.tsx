import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const floatingPhotos = [
  { src: '/images/pic_fairy.jpeg', size: 120 },
  { src: '/images/pic_hot.jpeg', size: 100 },
  { src: '/images/pic_in_suit.jpeg', size: 110 },
  { src: '/images/Pic_myfav.jpeg', size: 100 },
  { src: '/images/pic_hot_2.jpeg', size: 90 },
  { src: '/images/pic_suit_2.jpeg', size: 100 },
];

const FloatingRose = ({ delay, x, size, duration }: { delay: number; x: number; size: number; duration: number }) => (
  <div
    className="absolute animate-floatHeart pointer-events-none"
    style={{
      left: `${x}%`,
      fontSize: size,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    }}
  >
    🌹
  </div>
);

const FloatingParticle = ({ delay, x, size, duration, color }: { delay: number; x: number; size: number; duration: number; color: string }) => (
  <div
    className="absolute rounded-full animate-floatHeart pointer-events-none"
    style={{
      left: `${x}%`,
      width: size,
      height: size,
      background: color,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
      filter: 'blur(0.5px)',
    }}
  />
);

export default function EndingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);
  const photoContainerRef = useRef<HTMLDivElement>(null);
  const finalFadeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          toggleActions: 'play none none none',
        },
      });

      // Text 1: "In every universe,"
      tl.fromTo(
        text1Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      );

      // Text 2: "it would still be you."
      tl.fromTo(
        text2Ref.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
        '+=0.3'
      );

      // Pause
      tl.to({}, { duration: 1.5 });

      // Text 3: "You are, and will always be,"
      tl.fromTo(
        text3Ref.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: 'power2.out' }
      );

      // Text 4: "my favorite person."
      tl.fromTo(
        text4Ref.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power3.out' },
        '+=0.2'
      );

      // Photo montage orbit animation
      const photos = photoContainerRef.current?.children;
      if (photos) {
        Array.from(photos).forEach((photo, i) => {
          gsap.to(photo, {
            rotation: 360,
            duration: 30 + i * 5,
            ease: 'none',
            repeat: -1,
            transformOrigin: '50% 250px',
          });
        });
      }

      // Final fade
      tl.to(
        finalFadeRef.current,
        { opacity: 1, duration: 2, ease: 'power2.out' },
        '+=1'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center gradient-white-pink"
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating roses */}
        {Array.from({ length: 10 }).map((_, i) => (
          <FloatingRose
            key={`rose-${i}`}
            delay={i * 1.5}
            x={5 + i * 9}
            size={24 + (i % 3) * 8}
            duration={12 + (i % 4) * 3}
          />
        ))}

        {/* Sparkles */}
        {Array.from({ length: 25 }).map((_, i) => (
          <svg
            key={`sparkle-${i}`}
            className="absolute animate-sparkle pointer-events-none"
            style={{
              left: `${5 + (i * 4) % 90}%`,
              top: `${5 + (i * 5) % 90}%`,
              width: 8 + Math.random() * 8,
              height: 8 + Math.random() * 8,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
            viewBox="0 0 24 24"
            fill={i % 2 === 0 ? '#FFD4A8' : '#FFD1DC'}
          >
            <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
          </svg>
        ))}

        {/* Floating hearts */}
        {Array.from({ length: 18 }).map((_, i) => (
          <svg
            key={`heart-${i}`}
            className="absolute animate-floatHeart pointer-events-none"
            style={{
              left: `${5 + i * 5}%`,
              width: 12 + Math.random() * 10,
              height: 12 + Math.random() * 10,
              animationDuration: `${12 + (i % 5) * 3}s`,
              animationDelay: `${i * 0.8}s`,
            }}
            viewBox="0 0 24 24"
            fill={i % 3 === 0 ? '#FF6B81' : i % 3 === 1 ? '#FFB6C1' : '#FFC1CC'}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ))}

        {/* Fine dust particles */}
        {Array.from({ length: 50 }).map((_, i) => (
          <FloatingParticle
            key={`dust-${i}`}
            delay={i * 0.4}
            x={Math.random() * 100}
            size={2 + Math.random() * 2}
            duration={35 + Math.random() * 25}
            color={i % 3 === 0 ? 'rgba(255,193,204,0.4)' : i % 3 === 1 ? 'rgba(255,255,255,0.5)' : 'rgba(255,182,193,0.3)'}
          />
        ))}

        {/* Bottom dreamy gradient */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[40%]"
          style={{
            background: 'linear-gradient(0deg, rgba(255, 182, 193, 0.25) 0%, transparent 100%)',
          }}
        />

        {/* Romantic radial glow */}
        <div
          className="absolute w-[80%] h-[60%] rounded-full"
          style={{
            background: 'radial-gradient(ellipse at 50% 80%, rgba(255, 193, 204, 0.4) 0%, transparent 55%)',
            left: '10%',
            bottom: '10%',
          }}
        />
      </div>

      {/* Main text sequence */}
      <div className="relative z-10 text-center px-4">
        <div ref={text1Ref} className="opacity-0">
          <h2 className="font-display text-[36px] md:text-[48px] lg:text-[60px] text-textDark">
            In every universe,
          </h2>
        </div>

        <div ref={text2Ref} className="opacity-0 mt-2">
          <h2 className="font-display text-[36px] md:text-[48px] lg:text-[60px] text-romanticRed">
            it would still be{' '}
            <span className="glow-text-pink">you</span>
          </h2>
        </div>

        <div ref={text3Ref} className="opacity-0 mt-8">
          <p className="font-script text-[32px] md:text-[40px] text-textLight">
            You are, and will always be,
          </p>
        </div>

        <div ref={text4Ref} className="opacity-0 mt-3">
          <h1 className="font-display text-[10vw] md:text-[8vw] lg:text-[6vw] text-gradient-romantic leading-tight">
            my favorite person{' '}
            <span className="inline-block animate-pulseHeart">❤️</span>
          </h1>
        </div>
      </div>

      {/* Photo montage arc */}
      <div
        ref={photoContainerRef}
        className="absolute bottom-[15%] left-1/2 -translate-x-1/2 z-10 pointer-events-none"
      >
        {floatingPhotos.map((photo, i) => {
          const angle = (i / (floatingPhotos.length - 1)) * 140 - 70; // Arc from -70 to +70 degrees
          const radius = 200;
          const rad = (angle * Math.PI) / 180;
          const x = Math.sin(rad) * radius;
          const y = Math.cos(rad) * 40;
          return (
            <div
              key={i}
              className="absolute rounded-2xl overflow-hidden border-2 animate-float"
              style={{
                width: photo.size,
                height: photo.size * 1.3,
                left: `calc(50% + ${x}px - ${photo.size / 2}px)`,
                top: `${y}px`,
                borderColor: 'rgba(255, 182, 193, 0.5)',
                boxShadow: '0 8px 32px rgba(255, 107, 129, 0.15)',
                animationDuration: `${4 + i * 0.5}s`,
                animationDelay: `${i * 0.3}s`,
              }}
            >
              <img
                src={photo.src}
                alt={`Memory ${i + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          );
        })}
      </div>

      {/* Final fade text */}
      <div
        ref={finalFadeRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 opacity-0 text-center"
      >
        <p className="text-[14px] font-body text-textLight/60">
          thank you for being born
        </p>
      </div>
    </section>
  );
}
