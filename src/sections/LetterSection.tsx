import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMultiTypewriter } from '../hooks/useMultiTypewriter';

gsap.registerPlugin(ScrollTrigger);

const letterParagraphs = [
  {
    text: 'I STILL REMEMBER THE TIME WE STARTED TALKING OVER CALLS THOSE EYE LOOKS , HOT AS FUCKK , THEN STARTED TO MEET , THEN VO MERE GHR MILNA CLOSE AANA , THEN WHEN YOU GOING KOTA MERA DELHI AANA REALIZE KRNA HOW IMPORTANT YOU ARE TO ME ,',
    pauseAfter: 600,
  },
  {
    text: 'THEN YEAH FEW FUCKUPS TOO , BUT WE WILL BE STRONG NOW , YEAH IK I FUCK MY HEAD KHUDHI AND FIR KHUDHI ULTI SEEDHI HARKATE KR DETA HU , I M SORRY FOR THAT , BUT I DO LOVE YOU A LOT ,',
    pauseAfter: 600,
  },
  {
    text: 'DOING ALL THIS JUST MY WAY TO SHOW YOU HOW MUCH YOU MEAN TO ME SWEETA, I LOVE YOU ROBOOOOO , A LOT OF KISSES AND CANT WAIT TO MEET YOU ,',
    pauseAfter: 600,
  },
  {
    text: 'YOUR MR. BHATT ALWAYS',
    pauseAfter: 0,
  },
];

const FloatingHeartBg = ({ delay, x, size, duration }: { delay: number; x: number; size: number; duration: number }) => (
  <svg
    className="absolute animate-floatHeart pointer-events-none"
    style={{
      left: `${x}%`,
      width: size,
      height: size,
      animationDuration: `${duration}s`,
      animationDelay: `${delay}s`,
    }}
    viewBox="0 0 24 24"
    fill={['#FFC1CC', '#FFB6C1', '#FF6B81', '#FF8E9E'][Math.floor(Math.random() * 4)]}
  >
    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
  </svg>
);

const SparkleParticle = ({ delay, x, y }: { delay: number; x: number; y: number }) => (
  <svg
    className="absolute animate-sparkle pointer-events-none"
    style={{
      left: `${x}%`,
      top: `${y}%`,
      width: 12 + Math.random() * 8,
      height: 12 + Math.random() * 8,
      animationDelay: `${delay}s`,
      animationDuration: `${2 + Math.random() * 2}s`,
    }}
    viewBox="0 0 24 24"
    fill={Math.random() > 0.5 ? '#FFD4A8' : '#FFD1DC'}
  >
    <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
  </svg>
);

export default function LetterSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const letterRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const [hasStarted, setHasStarted] = useState(false);

  const {
    displayedParagraphs,
    isTyping,
    skip,
    startTyping,
  } = useMultiTypewriter({
    paragraphs: letterParagraphs,
    speed: 45,
    initialDelay: 800,
    autoStart: false,
  });

  // ScrollTrigger to start typewriter
  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      );

      // Letter container animation
      gsap.fromTo(
        letterRef.current,
        { opacity: 0, y: 30, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: letterRef.current,
            start: 'top 70%',
            onEnter: () => {
              if (!hasStarted) {
                setHasStarted(true);
              }
            },
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [hasStarted]);

  // Start typewriter when triggered
  useEffect(() => {
    if (hasStarted) {
      startTyping();
    }
  }, [hasStarted, startTyping]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-24 md:py-36 lg:py-40 overflow-hidden"
      style={{ background: '#FFF5FA' }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating hearts */}
        {Array.from({ length: 22 }).map((_, i) => (
          <FloatingHeartBg
            key={`h-${i}`}
            delay={i * 0.9}
            x={5 + (i * 4) % 90}
            size={16 + (i % 4) * 8}
            duration={14 + (i % 6) * 3}
          />
        ))}

        {/* Sparkle particles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <SparkleParticle
            key={`s-${i}`}
            delay={i * 0.6}
            x={10 + (i * 5) % 80}
            y={10 + (i * 7) % 80}
          />
        ))}

        {/* Soft romantic glow */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full animate-glowPulse"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 133, 164, 0.5) 0%, transparent 60%)',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Floating blush gradient orbs */}
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`o-${i}`}
            className="absolute rounded-full animate-floatSlow"
            style={{
              width: 200 + i * 100,
              height: 200 + i * 100,
              background: `radial-gradient(circle, rgba(255, 133, 164, ${0.2 + i * 0.1}) 0%, transparent 70%)`,
              left: `${10 + i * 30}%`,
              top: `${20 + i * 20}%`,
              animationDuration: `${8 + i * 2}s`,
              animationDelay: `${i * 1.5}s`,
            }}
          />
        ))}      </div>

      <div className="max-w-[700px] mx-auto px-4 md:px-6 relative z-10">
        {/* Section title */}
        <div ref={titleRef} className="text-center mb-10 md:mb-14">
          <h2 className="font-display text-[28px] xs:text-[36px] md:text-[48px] lg:text-[60px] font-medium text-textDark leading-tight">
            A Letter to You
          </h2>
          <p className="mt-3 font-script text-[24px] xs:text-[28px] md:text-[36px] text-rosePink">
            words from my heart
          </p>
        </div>

        {/* Letter container */}
        <div
          ref={letterRef}
          className="relative rounded-3xl p-5 xs:p-8 md:p-12 lg:p-14"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,250,253,0.98) 100%)',
            boxShadow: '0 0 40px rgba(255, 133, 164, 0.3), 0 8px 32px rgba(255, 107, 143, 0.1)',
          }}
        >
          {/* Gradient border effect */}
          <div
            className="absolute -inset-[1.5px] rounded-3xl -z-10"
            style={{
              background: 'linear-gradient(135deg, #FFC1CC, #FFB6C1, #FF6B81)',
              opacity: 0.5,
            }}
          />

          {/* Corner decorations */}
          <svg
            className="absolute top-4 left-4 w-6 h-6 text-rosePink/60"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <svg
            className="absolute bottom-4 right-4 w-6 h-6 text-rosePink/60"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>

          {/* Letter content */}
          <div className="relative">
            {/* Salutation */}
            <p className="font-script text-[24px] xs:text-[28px] md:text-[32px] text-romanticRed mb-6">
              My Dearest Love,
            </p>

            {/* Body - typewriter */}
            <div className="space-y-5">
              {letterParagraphs.map((_para, i) => (
                <p
                  key={i}
                  className="text-[14px] xs:text-[16px] md:text-[18px] lg:text-[20px] font-body text-textDark leading-[1.8] min-h-[2em]"
                >
                  {hasStarted ? displayedParagraphs[i] || '' : ''}
                  {isTyping && i === displayedParagraphs.findIndex((p, idx) => p.length < letterParagraphs[idx].text.length && (idx === 0 || displayedParagraphs[idx - 1].length === letterParagraphs[idx - 1].text.length)) && (
                    <span className="inline-block w-[2px] h-[1.1em] bg-romanticRed ml-1 animate-pulse align-middle" />
                  )}
                </p>
              ))}
            </div>

            {/* Closing */}
            <div className="mt-8">
              <p className="font-script text-[24px] md:text-[28px] text-rosePink">
                Forever Yours,
              </p>
              <p className="font-script text-[20px] md:text-[24px] text-textLight/70 mt-1">
                Mr. Bhatt
              </p>
            </div>

            {/* Skip button */}
            {isTyping && (
              <button
                onClick={skip}
                className="mt-6 text-[12px] font-body text-textLight/50 hover:text-textLight transition-colors cursor-pointer underline"
              >
                Skip typing
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
