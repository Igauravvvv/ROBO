import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import LoadingScreen from './sections/LoadingScreen';
import HeroSection from './sections/HeroSection';
import VersionsOfHer from './sections/VersionsOfHer';
import ReasonsSection from './sections/ReasonsSection';
import ProposalSection from './sections/ProposalSection';
import MusicWorld from './sections/MusicWorld';
import LetterSection from './sections/LetterSection';
import EndingSection from './sections/EndingSection';
import FloatingHearts from './components/FloatingHearts';
import CursorGlow from './components/CursorGlow';
import MusicToggle from './components/MusicToggle';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [loading, setLoading] = useState(true);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (!loading) {
      const lenis = new Lenis({
        lerp: 0.08,
        smoothWheel: true,
      });

      lenisRef.current = lenis;

      // Sync Lenis with GSAP ScrollTrigger
      lenis.on('scroll', ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      return () => {
        lenis.destroy();
        gsap.ticker.remove(lenis.raf as any);
      };
    }
  }, [loading]);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {/* Loading Screen */}
      {loading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Main Content */}
      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {/* Global floating hearts */}
        <FloatingHearts count={25} />

        {/* Cursor glow */}
        <CursorGlow />

        {/* Music toggle */}
        <MusicToggle />

        {/* Sections */}
        <main className="relative">
          <HeroSection />
          <VersionsOfHer />
          <ReasonsSection />
          <ProposalSection />
          <MusicWorld />
          <LetterSection />
          <EndingSection />
        </main>
      </div>
    </>
  );
}

export default App;
