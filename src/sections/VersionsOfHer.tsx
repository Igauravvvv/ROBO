import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface MoodCard {
  title: string;
  caption: string;
  image: string;
  accent: string;
  glowClass: string;
  icon: string;
}

const moodCards: MoodCard[] = [
  {
    title: 'Cute Her',
    caption: 'the one who makes my heart soft',
    image: '/images/pic_in_suit.jpeg',
    accent: '#FFD1DC',
    glowClass: 'card-glow-blush',
    icon: '✨',
  },
  {
    title: 'Hot Her',
    caption: 'the one who owns every room',
    image: '/images/pic_hot.jpeg',
    accent: '#FF6B81',
    glowClass: 'card-glow-red',
    icon: '🔥',
  },
  {
    title: 'Chaos Her',
    caption: 'the one who is beautifully unpredictable',
    image: '/images/Pic_faces.jpeg',
    accent: '#FFD4A8',
    glowClass: 'card-glow-peach',
    icon: '🌪️',
  },
  {
    title: 'Slaying Her',
    caption: 'the one who dresses like a dream',
    image: '/images/pic_suit_2.jpeg',
    accent: '#FF8E9E',
    glowClass: 'card-glow-coral',
    icon: '👑',
  },
  {
    title: 'Soft Her',
    caption: 'the one who feels like home',
    image: '/images/Pic_myfav.jpeg',
    accent: '#FFC1CC',
    glowClass: 'card-glow-blush',
    icon: '🌸',
  },
  {
    title: 'Fairy Her',
    caption: 'the one who looks unreal',
    image: '/images/pic_fairy.jpeg',
    accent: '#FFB6C1',
    glowClass: 'card-glow-rose',
    icon: '🧚',
  },
  {
    title: 'Candid Her',
    caption: 'the one who shines without trying',
    image: '/images/pic_hot_2.jpeg',
    accent: '#E8436A',
    glowClass: 'card-glow-red',
    icon: '📸',
  },
  {
    title: 'Happy Her',
    caption: 'the one whose smile is my favorite view',
    image: '/images/pic_in_suit.jpeg',
    accent: '#FF6B81',
    glowClass: 'card-glow-rose',
    icon: '☀️',
  },
];

export default function VersionsOfHer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

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

      // Cards stagger animation
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: i * 0.1,
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="versions-section"
      ref={sectionRef}
      className="relative w-full py-20 md:py-28 lg:py-32"
      style={{ background: '#FFF5F7' }}
    >
      <div className="max-w-[1200px] mx-auto px-4 md:px-6">
        {/* Section title */}
        <div ref={titleRef} className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-[36px] md:text-[48px] lg:text-[60px] font-medium text-textDark leading-tight">
            The Many Versions of You
          </h2>
          <p className="mt-3 font-script text-[28px] md:text-[36px] text-rosePink">
            every side of you is art
          </p>
        </div>

        {/* Mood cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {moodCards.map((card, i) => (
            <div
              key={i}
              ref={el => { cardsRef.current[i] = el; }}
              className="group cursor-pointer"
            >
              <div
                className="glass rounded-3xl p-5 transition-all duration-500 hover:scale-[1.03]"
                style={{
                  boxShadow: '0 8px 32px rgba(255, 107, 129, 0.12)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = `0 12px 48px ${card.accent}30, 0 0 30px ${card.accent}20`;
                  e.currentTarget.style.borderColor = card.accent;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(255, 107, 129, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(255, 182, 193, 0.4)';
                }}
              >
                {/* Icon */}
                <div className="text-[28px] mb-3">{card.icon}</div>

                {/* Photo */}
                <div className="relative rounded-2xl overflow-hidden mb-4 aspect-[3/4]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-blush/30 to-transparent" />
                </div>

                {/* Title */}
                <h3 className="font-display text-[22px] md:text-[24px] text-textDark mb-1">
                  {card.title}
                </h3>

                {/* Caption */}
                <p className="font-script text-[16px] md:text-[18px]" style={{ color: card.accent }}>
                  {card.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
