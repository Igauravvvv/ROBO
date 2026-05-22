import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface Artist {
  name: string;
  songs: string[];
  quote: string;
  vinylColors: [string, string];
  borderColors: [string, string];
}

const artists: Artist[] = [
  {
    name: 'Arctic Monkeys',
    songs: [
      'Do I Wanna Know?',
      'Why\'d You Only Call Me When You\'re High?',
      'I Wanna Be Yours',
    ],
    quote: 'late nights, long drives, and your hand in mine.',
    vinylColors: ['#FFC1CC', '#FFB6C1'],
    borderColors: ['#FFD1DC', '#FFC1CC'],
  },
  {
    name: 'Drake',
    songs: [
      'Hold On, We\'re Going Home',
      'One Dance',
      'Passionfruit',
    ],
    quote: 'your playlist is my favorite place.',
    vinylColors: ['#FF6B81', '#E8436A'],
    borderColors: ['#FF6B81', '#FFB6C1'],
  },
];

function VinylRecord({ colors }: { colors: [string, string] }) {
  return (
    <div className="relative w-[120px] h-[120px] mx-auto animate-spinSlow">
      <div
        className="w-full h-full rounded-full vinyl-record relative"
        style={{
          boxShadow: `0 0 20px ${colors[0]}40`,
        }}
      >
        {/* Groove lines */}
        <div className="absolute inset-2 rounded-full border border-white/10" />
        <div className="absolute inset-4 rounded-full border border-white/10" />
        <div className="absolute inset-6 rounded-full border border-white/10" />
        <div className="absolute inset-8 rounded-full border border-white/10" />
        <div className="absolute inset-10 rounded-full border border-white/10" />
        {/* Center label */}
        <div
          className="absolute inset-[38px] rounded-full flex items-center justify-center"
          style={{ background: `linear-gradient(135deg, ${colors[0]}, ${colors[1]})` }}
        >
          <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
        {/* Shine */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 to-transparent pointer-events-none" />
      </div>
    </div>
  );
}

function Equalizer() {
  return (
    <div className="flex items-end justify-center gap-[3px] h-6">
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="w-[3px] bg-rosePink rounded-full animate-equalizer"
          style={{
            animationDelay: `${i * 0.15}s`,
            animationDuration: `${0.6 + i * 0.2}s`,
            minHeight: '4px',
          }}
        />
      ))}
    </div>
  );
}

function ArtistCard({ artist }: { artist: Artist }) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="glass-strong rounded-3xl p-8 md:p-10 relative group transition-all duration-500 hover:scale-[1.02]"
      style={{
        maxWidth: '500px',
        width: '100%',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = `0 12px 48px ${artist.vinylColors[0]}30, 0 0 40px ${artist.vinylColors[0]}20`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = '0 4px 24px rgba(255, 182, 193, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.8)';
      }}
    >
      {/* Rotating gradient border */}
      <div
        className="absolute -inset-[1.5px] rounded-3xl -z-10 opacity-60 group-hover:opacity-100 transition-opacity"
        style={{
          background: `conic-gradient(from 0deg, ${artist.borderColors[0]}, ${artist.borderColors[1]}, ${artist.borderColors[0]})`,
          animation: 'rotateBorder 4s linear infinite',
        }}
      />

      {/* Artist name */}
      <h3 className="font-display text-[36px] md:text-[48px] text-textDark text-center mb-6">
        {artist.name}
      </h3>

      {/* Vinyl record */}
      <div className="mb-6">
        <VinylRecord colors={artist.vinylColors} />
      </div>

      {/* Equalizer */}
      <div className="mb-6">
        <Equalizer />
      </div>

      {/* Song list */}
      <div className="space-y-3 mb-6">
        {artist.songs.map((song, i) => (
          <div
            key={i}
            className="glass rounded-xl px-5 py-3 text-[14px] font-body text-textDark
                       hover:text-romanticRed transition-colors duration-300 cursor-default"
          >
            <div className="flex items-center gap-3">
              <span className="text-[12px] text-textLight w-5">{i + 1}</span>
              <span>{song}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Quote */}
      <p className="font-script text-[18px] md:text-[20px] text-textLight text-center">
        {artist.quote}
      </p>
    </div>
  );
}

export default function MusicWorld() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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

      // Cards slide in
      const cards = cardsRef.current?.children;
      if (cards) {
        Array.from(cards).forEach((card, i) => {
          gsap.fromTo(
            card,
            { opacity: 0, x: i === 0 ? -100 : 100 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 75%',
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
      className="relative w-full py-20 md:py-28 lg:py-32"
      style={{ background: '#FFFAFB' }}
    >
      {/* Floating decorative squares */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-xl animate-float"
            style={{
              left: `${5 + i * 16}%`,
              top: `${10 + (i % 3) * 30}%`,
              width: 50 + Math.random() * 20,
              height: 50 + Math.random() * 20,
              background: `linear-gradient(135deg, ${['#FFD1DC', '#FFC1CC', '#FFB6C1', '#FF8E9E', '#FFD4A8', '#FF6B81'][i]}40, ${['#FFD1DC', '#FFC1CC', '#FFB6C1', '#FF8E9E', '#FFD4A8', '#FF6B81'][i]}20)`,
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 182, 193, 0.3)',
              animationDuration: `${5 + i}s`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-[1000px] mx-auto px-4 md:px-6 relative z-10">
        {/* Section title */}
        <div ref={titleRef} className="text-center mb-12 md:mb-16">
          <h2 className="font-display text-[36px] md:text-[48px] lg:text-[60px] font-medium text-textDark leading-tight">
            Your Music, Your World
          </h2>
          <p className="mt-3 font-script text-[28px] md:text-[36px] text-rosePink">
            songs that sound like us
          </p>
        </div>

        {/* Artist cards */}
        <div
          ref={cardsRef}
          className="flex flex-col md:flex-row gap-6 md:gap-8 justify-center items-center"
        >
          {artists.map((artist, i) => (
            <ArtistCard key={i} artist={artist} />
          ))}
        </div>
      </div>
    </section>
  );
}
