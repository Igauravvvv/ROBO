import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FloatingHeartProps {
  size: number;
  left: string;
  top: string;
  delay: number;
  duration: number;
  color: string;
  opacity: number;
}

function FloatingHeartBg({ size, left, top, delay, duration, color, opacity }: FloatingHeartProps) {
  return (
    <svg
      className="absolute animate-floatHeart pointer-events-none"
      style={{
        left,
        top,
        width: size,
        height: size,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        opacity,
      }}
      viewBox="0 0 24 24"
      fill={color}
    >
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

// Custom canvas particle explosion for success
function CanvasConfetti({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    class Particle {
      x: number;
      y: number;
      size: number;
      color: string;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      type: 'heart' | 'confetti' | 'star';
      opacity: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = -20 - Math.random() * 100;
        this.size = 8 + Math.random() * 12;
        
        const colors = [
          '#FF1493', // hot pink
          '#FF69B4', // bright pink
          '#FF1758', // romantic red-pink
          '#FF8DAE', // blush
          '#FFAEC9', // baby pink
          '#FFD700', // gold
          '#FF6692', // rose
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedX = (Math.random() - 0.5) * 4;
        this.speedY = 2 + Math.random() * 4;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.05;
        this.opacity = 0.6 + Math.random() * 0.4;
        this.type = Math.random() > 0.4 ? 'heart' : Math.random() > 0.5 ? 'confetti' : 'star';
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.rotation += this.rotationSpeed;
        this.speedX += Math.sin(this.y / 30) * 0.04;

        if (this.y > height + 20) {
          this.y = -20;
          this.x = Math.random() * width;
          this.speedY = 2 + Math.random() * 4;
          this.speedX = (Math.random() - 0.5) * 4;
          this.opacity = 0.6 + Math.random() * 0.4;
        }
      }

      draw(c: CanvasRenderingContext2D) {
        c.save();
        c.translate(this.x, this.y);
        c.rotate(this.rotation);
        c.globalAlpha = this.opacity;
        c.fillStyle = this.color;

        if (this.type === 'heart') {
          c.beginPath();
          c.moveTo(0, 0);
          c.bezierCurveTo(-this.size / 2, -this.size / 2, -this.size, 0, 0, this.size);
          c.bezierCurveTo(this.size, 0, this.size / 2, -this.size / 2, 0, 0);
          c.fill();
        } else if (this.type === 'star') {
          c.beginPath();
          for (let i = 0; i < 5; i++) {
            c.lineTo(
              Math.cos(((18 + i * 72) * Math.PI) / 180) * this.size,
              Math.sin(((18 + i * 72) * Math.PI) / 180) * this.size
            );
            c.lineTo(
              Math.cos(((54 + i * 72) * Math.PI) / 180) * (this.size / 2),
              Math.sin(((54 + i * 72) * Math.PI) / 180) * (this.size / 2)
            );
          }
          c.closePath();
          c.fill();
        } else {
          c.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
        }
        c.restore();
      }
    }

    const particles: Particle[] = Array.from({ length: 120 }).map(() => new Particle());

    const loop = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      animationId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 w-full h-full"
    />
  );
}

export default function ProposalSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  
  const [isVisible, setIsVisible] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noTextIndex, setNoTextIndex] = useState(0);
  const [yesScale, setYesScale] = useState(1);

  const noPhrases = [
    'Need more time',
    'Are you sure? 🥺',
    'Think again! 💕',
    'Give me a chance! 🌸',
    'Please? 👉👈',
    'No way! 😂',
    'You can\'t say no! 💖',
    'Say YES! 🌹',
  ];

  const handleNoInteraction = () => {
    // Keep runaway inside reasonable bounds so it doesn't leave the screen or card
    const maxOffsetWidth = 280;
    const maxOffsetHeight = 120;
    const newX = (Math.random() - 0.5) * maxOffsetWidth;
    const newY = (Math.random() - 0.5) * maxOffsetHeight;
    
    setNoButtonPos({ x: newX, y: newY });
    setNoTextIndex((prev) => (prev + 1) % noPhrases.length);
    setYesScale((prev) => Math.min(prev + 0.2, 2.5));
  };

  const handleYes = () => {
    setAccepted(true);
    setShowSuccessModal(true);
  };

  const hearts: Omit<FloatingHeartProps, 'opacity'>[] = [
    { size: 12, left: '5%', top: '10%', delay: 0, duration: 18, color: '#FF8DAE' },
    { size: 18, left: '12%', top: '30%', delay: 2, duration: 22, color: '#FFAEC9' },
    { size: 14, left: '8%', top: '60%', delay: 4, duration: 20, color: '#FFB7D5' },
    { size: 16, left: '3%', top: '80%', delay: 6, duration: 24, color: '#FF5E85' },
    { size: 10, left: '88%', top: '15%', delay: 1, duration: 19, color: '#FF8DAE' },
    { size: 20, left: '92%', top: '40%', delay: 3, duration: 21, color: '#FFAEC9' },
    { size: 14, left: '85%', top: '65%', delay: 5, duration: 17, color: '#FFB7D5' },
    { size: 18, left: '90%', top: '85%', delay: 7, duration: 23, color: '#FF5E85' },
    { size: 22, left: '50%', top: '5%', delay: 2, duration: 25, color: '#FF8DAE' },
    { size: 11, left: '40%', top: '90%', delay: 4, duration: 20, color: '#FFAEC9' },
    { size: 15, left: '70%', top: '25%', delay: 6, duration: 22, color: '#FFB7D5' },
    { size: 13, left: '25%', top: '70%', delay: 8, duration: 19, color: '#FF5E85' },
  ];

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            onEnter: () => setIsVisible(true),
          },
        }
      );

      // Content animation - fade in line by line
      const letterContent = contentRef.current;
      if (letterContent) {
        const paragraphs = letterContent.querySelectorAll('.proposal-line');
        paragraphs.forEach((p, i) => {
          gsap.fromTo(
            p,
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'power3.out',
              delay: 0.2 + i * 0.15,
              scrollTrigger: {
                trigger: p,
                start: 'top 85%',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 lg:py-36 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #FFF0F6 0%, #FFE5F0 50%, #FFF0F6 100%)' }}
    >
      {/* Canvas confetti when accepted */}
      <CanvasConfetti active={accepted} />

      {/* Floating hearts background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {hearts.map((heart, i) => (
          <FloatingHeartBg
            key={i}
            {...heart}
            opacity={isVisible ? 0.6 + (i % 3) * 0.1 : 0}
          />
        ))}
      </div>

      {/* Soft radial glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 50%, rgba(255, 105, 180, 0.25) 0%, transparent 60%)',
        }}
      />

      {/* Decorative dots */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute rounded-full animate-pulse"
            style={{
              width: 4 + (i % 4) * 2,
              height: 4 + (i % 4) * 2,
              left: `${5 + (i * 5) % 90}%`,
              top: `${10 + (i * 7) % 80}%`,
              background: i % 2 === 0 ? '#FF6692' : '#FFAEC9',
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + (i % 3)}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-[750px] mx-auto px-4 md:px-6 relative z-10">
        {/* Title */}
        <div ref={titleRef} className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-[2px] w-12 bg-gradient-to-r from-transparent to-rosePink/60" />
            <svg
              className="w-6 h-6 text-romanticRed animate-pulse"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            <div className="h-[2px] w-12 bg-gradient-to-l from-transparent to-rosePink/60" />
          </div>
          <h2 className="font-display text-[36px] md:text-[48px] lg:text-[56px] font-semibold text-textDark leading-tight">
            Be Mine Forever
          </h2>
          <p className="mt-2 font-script text-[24px] md:text-[32px] text-romanticRed">
            a question from my heart
          </p>
        </div>

        {/* Proposal Letter Container */}
        <div
          ref={contentRef}
          className="relative rounded-3xl p-8 md:p-12 lg:p-16 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(255,240,246,0.98) 100%)',
            boxShadow: '0 0 60px rgba(255, 105, 180, 0.25), 0 8px 32px rgba(255, 23, 88, 0.15)',
            border: '1px solid rgba(255, 105, 180, 0.35)',
          }}
        >
          {/* Gradient border effect */}
          <div
            className="absolute -inset-[1.5px] rounded-3xl -z-10"
            style={{
              background: 'linear-gradient(135deg, #FFAEC9, #FF8DAE, #FF1758, #FFB7D5)',
              opacity: 0.6,
            }}
          />

          {/* Corner hearts */}
          <div className="absolute top-4 left-4 text-rosePink/50 text-lg">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div className="absolute top-4 right-4 text-rosePink/50 text-lg">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div className="absolute bottom-4 left-4 text-rosePink/50 text-lg">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>
          <div className="absolute bottom-4 right-4 text-rosePink/50 text-lg">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </div>

          {/* Letter content */}
          <div className="space-y-5">
            <p className="proposal-line font-script text-[26px] md:text-[30px] text-romanticRed/90 leading-relaxed">
              My Dearest Love,
            </p>

            <p className="proposal-line text-[15px] md:text-[17px] font-body text-textDark/85 leading-[1.9] tracking-wide">
              From the very first moment our paths crossed, I knew something extraordinary was beginning. You walked into my life like the most beautiful sunrise, painting my world in colors I never knew existed. Every laugh shared, every silent moment endured together, every inside joke that only we understand has woven us into something unbreakable.
            </p>

            <p className="proposal-line text-[15px] md:text-[17px] font-body text-textDark/85 leading-[1.9] tracking-wide">
              You are not just someone I love; you are my favorite place to be. You are the hand I want to hold on every journey, the voice I want to hear at the end of every day, and the smile I want to wake up to for the rest of my life. You make my ordinary days feel like poetry, and my special days feel like magic.
            </p>

            <p className="proposal-line text-[15px] md:text-[17px] font-body text-textDark/85 leading-[1.9] tracking-wide">
              I have thought about this a million times, and each time the answer becomes clearer: I want to build a lifetime of memories with you. I want to be there for every sunrise and every sunset, every laugh and every tear, every dream and every reality. I want to grow old with you, learning new reasons to love you every single day.
            </p>

            <p className="proposal-line text-[15px] md:text-[17px] font-body text-textDark/85 leading-[1.9] tracking-wide">
              So here, in front of the world and with all my heart, I ask you: Will you be mine forever? Will you let me love you, protect you, and cherish you for every tomorrow that we are blessed to share?
            </p>

            {/* The Big Question */}
            <div className="proposal-line py-8">
              <div className="inline-block relative">
                <p className="font-script text-[36px] md:text-[48px] lg:text-[56px] text-romanticRed leading-none">
                  Will you be mine forever?
                </p>
                {/* Decorative hearts around the question */}
                <div className="absolute -left-8 top-1/2 -translate-y-1/2 text-rosePink/40 animate-pulse">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <div className="absolute -right-8 top-1/2 -translate-y-1/2 text-rosePink/40 animate-pulse" style={{ animationDelay: '0.5s' }}>
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Yes/No buttons */}
            <div className="proposal-line relative min-h-[80px] flex items-center justify-center gap-6 pt-2">
              <button
                className="px-10 py-3.5 rounded-full font-body font-semibold text-[16px] text-white
                           transition-all duration-300 active:scale-95 shadow-lg relative z-20 cursor-pointer"
                style={{
                  background: 'linear-gradient(135deg, #FF1493, #FF6692, #FFAEC9)',
                  boxShadow: '0 4px 24px rgba(255, 20, 147, 0.4)',
                  transform: `scale(${yesScale})`,
                }}
                onClick={handleYes}
              >
                Yes, forever
              </button>
              
              <button
                className="px-10 py-3.5 rounded-full font-body font-semibold text-[16px]
                           border-2 transition-all duration-200 active:scale-95 z-10
                           text-romanticRed border-romanticRed/40 hover:border-romanticRed
                           hover:bg-romanticRed/5 select-none touch-none"
                style={{
                  transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                }}
                onMouseEnter={handleNoInteraction}
                onClick={(e) => {
                  e.preventDefault();
                  handleNoInteraction();
                }}
              >
                {noPhrases[noTextIndex]}
              </button>
            </div>

            {/* Signature */}
            <div className="proposal-line pt-6 text-center">
              <p className="font-script text-[20px] md:text-[24px] text-rosePink/80">
                Forever yours,
              </p>
              <p className="font-script text-[16px] md:text-[18px] text-textLight/60 mt-1">
                the one who loves you most
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal Overlay */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 transition-all duration-500 animate-fadeIn">
          <div
            className="relative max-w-[550px] w-full bg-white rounded-3xl p-8 md:p-12 text-center overflow-hidden"
            style={{
              boxShadow: '0 0 80px rgba(255, 20, 147, 0.4), 0 10px 40px rgba(0, 0, 0, 0.2)',
              border: '2px solid #FF6692',
            }}
          >
            {/* Background floating hearts for success card */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-20">
              {Array.from({ length: 8 }).map((_, i) => (
                <svg
                  key={i}
                  className="absolute animate-floatSlow"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${10 + (i % 2) * 50}%`,
                    width: 24,
                    height: 24,
                    fill: '#FF1493',
                    animationDuration: `${6 + i}s`,
                  }}
                  viewBox="0 0 24 24"
                >
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              ))}
            </div>

            {/* Glowing ring icon */}
            <div className="relative inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-50 mb-6">
              <span className="text-[48px] animate-bounceSoft">💍</span>
              <div className="absolute -inset-2 rounded-full border border-pink-300/40 animate-ping" />
            </div>

            <h3 className="font-display text-[32px] md:text-[40px] font-semibold text-romanticRed mb-4">
              She Said YES! 💖
            </h3>

            <p className="text-[16px] md:text-[18px] font-body text-textDark/90 leading-relaxed mb-8">
              You have made me the happiest person in the universe, Shaurya. Here's to us, our endless laughs, our late-night walks near the stairs, and our beautiful forever. I love you, always and forever. ❤️
            </p>

            <button
              onClick={() => setShowSuccessModal(false)}
              className="px-8 py-3.5 rounded-full font-body font-semibold text-[15px] text-white
                         transition-all duration-300 hover:scale-105 active:scale-95 shadow-md cursor-pointer"
              style={{
                background: 'linear-gradient(135deg, #FF1758, #FF6692)',
                boxShadow: '0 4px 15px rgba(255, 23, 88, 0.3)',
              }}
            >
              Continue Our Story ✨
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
