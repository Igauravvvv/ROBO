import { useEffect, useRef, useState } from 'react';
import { Heart } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ReasonCard {
  text: string;
  hiddenText: string;
  rotation: number;
  size: 'sm' | 'md' | 'lg';
  accent: string;
  glowClass: string;
  floatX: number;
}

const reasons: ReasonCard[] = [
  {
    text: 'You make ordinary moments feel magical.',
    hiddenText: 'Every moment with you is my favorite.',
    rotation: -2,
    size: 'md',
    accent: '#FF9EBA',
    glowClass: 'card-glow-blush',
    floatX: -30,
  },
  {
    text: 'Your existence changes every room.',
    hiddenText: 'You are my favorite notification.',
    rotation: 3,
    size: 'sm',
    accent: '#FF85A4',
    glowClass: 'card-glow-rose',
    floatX: 40,
  },
  {
    text: 'You somehow look beautiful in every version of yourself.',
    hiddenText: 'I fall for you more every single day.',
    rotation: -1,
    size: 'lg',
    accent: '#FF4D80',
    glowClass: 'card-glow-red',
    floatX: -20,
  },
  {
    text: 'Even your chaos feels comforting.',
    hiddenText: 'Your chaos is my calm.',
    rotation: 4,
    size: 'md',
    accent: '#FFB7D5',
    glowClass: 'card-glow-blush',
    floatX: 25,
  },
  {
    text: 'Your smile is the only sunshine I need.',
    hiddenText: 'You light up my whole world.',
    rotation: -3,
    size: 'sm',
    accent: '#FF7A99',
    glowClass: 'card-glow-rose',
    floatX: -35,
  },
  {
    text: 'You are the most beautiful surprise life gave me.',
    hiddenText: 'You are my answered prayer.',
    rotation: 2,
    size: 'lg',
    accent: '#FF9EBA',
    glowClass: 'card-glow-blush',
    floatX: 20,
  },
  {
    text: 'Being with you feels like the best part of a movie.',
    hiddenText: 'Our story is my favorite.',
    rotation: -4,
    size: 'md',
    accent: '#FF85A4',
    glowClass: 'card-glow-rose',
    floatX: -15,
  },
  {
    text: 'You are everything I never knew I needed.',
    hiddenText: 'Forever wouldn\'t be enough with you.',
    rotation: 1,
    size: 'md',
    accent: '#FF4D80',
    glowClass: 'card-glow-red',
    floatX: 30,
  },
  {
    text: 'You believe in me more than I believe in myself.',
    hiddenText: 'You make me want to be a better man.',
    rotation: -2,
    size: 'lg',
    accent: '#FF9EBA',
    glowClass: 'card-glow-blush',
    floatX: -10,
  },
  {
    text: 'You remember the little things about me.',
    hiddenText: 'You make me feel truly seen.',
    rotation: 3,
    size: 'sm',
    accent: '#FF85A4',
    glowClass: 'card-glow-rose',
    floatX: 45,
  },
  {
    text: 'You are my safe place and my biggest adventure.',
    hiddenText: 'Home is wherever you are.',
    rotation: -1,
    size: 'md',
    accent: '#FF4D80',
    glowClass: 'card-glow-red',
    floatX: 15,
  },
  {
    text: 'You make me laugh until my stomach hurts.',
    hiddenText: 'Your laughter is my favorite sound.',
    rotation: 2,
    size: 'sm',
    accent: '#FFB7D5',
    glowClass: 'card-glow-blush',
    floatX: -25,
  },
  {
    text: 'You support my dreams like they are your own.',
    hiddenText: 'We are a team, always.',
    rotation: -3,
    size: 'md',
    accent: '#FF5E85',
    glowClass: 'card-glow-rose',
    floatX: 35,
  },
  {
    text: 'You are my favorite thought every morning.',
    hiddenText: 'I wake up grateful for you.',
    rotation: 1,
    size: 'lg',
    accent: '#FF8DAE',
    glowClass: 'card-glow-blush',
    floatX: -40,
  },
  {
    text: 'You hold my hand through the darkest storms.',
    hiddenText: 'With you, I fear absolutely nothing.',
    rotation: -2,
    size: 'md',
    accent: '#FF1758',
    glowClass: 'card-glow-red',
    floatX: -25,
  },
  {
    text: 'Your kindness is my constant compass.',
    hiddenText: 'You teach me how to love purely.',
    rotation: 2,
    size: 'sm',
    accent: '#FF5E85',
    glowClass: 'card-glow-rose',
    floatX: 30,
  },
  {
    text: 'You understand my silence as much as my words.',
    hiddenText: 'You know my heart better than anyone.',
    rotation: -3,
    size: 'lg',
    accent: '#FF8DAE',
    glowClass: 'card-glow-blush',
    floatX: -15,
  },
  {
    text: 'Your love makes the heaviest days feel light.',
    hiddenText: 'You are my strength when I am weak.',
    rotation: 3,
    size: 'md',
    accent: '#FF6692',
    glowClass: 'card-glow-rose',
    floatX: 20,
  },
  {
    text: 'You\'ve made me realize what home actually feels like.',
    hiddenText: 'Home is not a place, it is you.',
    rotation: -1,
    size: 'lg',
    accent: '#FF1758',
    glowClass: 'card-glow-red',
    floatX: -30,
  },
  {
    text: 'The way you talk about things you love is my favorite sight.',
    hiddenText: 'Your passion is contagious and beautiful.',
    rotation: 1,
    size: 'sm',
    accent: '#FFAEC9',
    glowClass: 'card-glow-blush',
    floatX: 40,
  },
];

const sizeClasses = {
  sm: 'w-full max-w-[280px] xs:max-w-[300px]',
  md: 'w-full max-w-[300px] xs:max-w-[320px] sm:max-w-[340px]',
  lg: 'w-full max-w-[320px] xs:max-w-[350px] sm:max-w-[400px]',
};

const sizePadding = {
  sm: 'p-5',
  md: 'p-5 sm:p-6',
  lg: 'p-5 sm:p-7',
};

function FlipCard({ card }: { card: ReasonCard }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`perspective-1000 ${sizeClasses[card.size]} cursor-pointer`}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative transform-style-3d transition-transform duration-600 ${sizeClasses[card.size]}`}
        style={{
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          transitionDuration: '0.6s',
          transitionTimingFunction: 'ease-in-out',
        }}
      >
        {/* Front */}
        <div
          className={`glass rounded-2xl ${sizePadding[card.size]} backface-hidden relative`}
          style={{
            transform: 'rotateY(0deg)',
            boxShadow: `0 0 30px ${card.accent}30`,
            rotate: `${card.rotation}deg`,
          }}
        >
          <Heart
            className="w-5 h-5 mb-3 transition-transform"
            fill={card.accent}
            stroke={card.accent}
            style={{ color: card.accent }}
          />
          <p className="text-[16px] md:text-[18px] font-body text-textDark leading-relaxed">
            {card.text}
          </p>
        </div>

        {/* Back */}
        <div
          className={`glass rounded-2xl ${sizePadding[card.size]} backface-hidden absolute inset-0`}
          style={{
            transform: 'rotateY(180deg)',
            boxShadow: `0 0 30px ${card.accent}40`,
            rotate: `${card.rotation}deg`,
          }}
        >
          <Heart
            className="w-5 h-5 mb-3"
            fill={card.accent}
            stroke={card.accent}
          />
          <p className="font-script text-[20px] md:text-[22px]" style={{ color: card.accent }}>
            {card.hiddenText}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function ReasonsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

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

      // Cards animation
      const cards = cardsContainerRef.current?.children;
      if (cards) {
        Array.from(cards).forEach((card, i) => {
          const direction = i % 2 === 0 ? -80 : 80;
          gsap.fromTo(
            card,
            { opacity: 0, x: direction, y: 40 },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1,
              ease: 'power3.out',
              delay: i * 0.15,
              scrollTrigger: {
                trigger: card,
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
      className="relative w-full py-20 md:py-28 lg:py-32 gradient-soft-peach overflow-hidden"
    >
      {/* Floating mini hearts */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 10 }).map((_, i) => (
          <svg
            key={i}
            className="absolute animate-floatHeart"
            style={{
              left: `${10 + i * 8}%`,
              width: 10 + Math.random() * 6,
              height: 10 + Math.random() * 6,
              animationDuration: `${18 + Math.random() * 8}s`,
              animationDelay: `${i * 2}s`,
            }}
            viewBox="0 0 24 24"
            fill={i % 2 === 0 ? '#FFB6C1' : '#FFC1CC'}
            opacity={0.5}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ))}
      </div>

      <div className="max-w-[1100px] mx-auto px-4 md:px-6 relative z-10">
        {/* Section title */}
        <div ref={titleRef} className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-[36px] md:text-[48px] lg:text-[60px] font-medium text-textDark leading-tight">
            Why You Are My Everything
          </h2>
          <p className="mt-3 font-script text-[28px] md:text-[36px] text-rosePink">
            a few reasons from infinite
          </p>
        </div>

        {/* Scattered cards layout */}
        <div
          ref={cardsContainerRef}
          className="flex flex-wrap justify-center gap-5 md:gap-6"
        >
          {reasons.map((card, i) => (
            <div key={i} className="flex justify-center">
              <FlipCard card={card} />
            </div>
          ))}
        </div>

        {/* Click hint */}
        <p className="text-center mt-10 text-[14px] font-body text-textLight/70">
          Click any card to reveal a hidden message ✨
        </p>
      </div>
    </section>
  );
}
