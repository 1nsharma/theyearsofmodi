import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BrandedPreloader from './components/BrandedPreloader';
import NavHeader from './components/NavHeader';
import StoryMode from './components/StoryMode';
import ExploreMode from './components/ExploreMode';
import VelocityParticles from './components/VelocityParticles';
import { useScrollVelocity } from './hooks/useScrollVelocity';
import { useAmbientAudio } from './hooks/useAmbientAudio';

type Mode = 'story' | 'explore';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [mode, setMode] = useState<Mode>('story');
  const [currentChapter, setCurrentChapter] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState(0);
  
  const velocity = useScrollVelocity();
  const { toggle: toggleAudio, isPlaying, setFilterFrequency } = useAmbientAudio();

  // Velocity-reactive audio filter
  useEffect(() => {
    if (isPlaying) {
      setFilterFrequency(velocity);
    }
  }, [velocity, isPlaying, setFilterFrequency]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') return;
      
      // M - toggle mode
      if (e.key === 'm' || e.key === 'M') {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          setMode(prev => prev === 'story' ? 'explore' : 'story');
        }
      }
      // A - toggle audio
      if (e.key === 'a' || e.key === 'A') {
        if (!e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          toggleAudio();
        }
      }
      // Story mode navigation
      if (mode === 'story') {
        if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
          e.preventDefault();
          const next = Math.min(currentChapter + 1, 10);
          const el = document.getElementById(`chapter-${next}`);
          el?.scrollIntoView({ behavior: 'smooth' });
        }
        if (e.key === 'ArrowUp' || e.key === 'PageUp') {
          e.preventDefault();
          const prev = Math.max(currentChapter - 1, 0);
          const el = document.getElementById(`chapter-${prev}`);
          el?.scrollIntoView({ behavior: 'smooth' });
        }
        if (e.key === 'Home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        if (e.key === 'End') {
          window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
        }
      }
      // Explore mode navigation
      if (mode === 'explore') {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          setActiveMilestone(prev => Math.max(0, prev - 1));
        }
        if (e.key === 'ArrowRight') {
          e.preventDefault();
          setActiveMilestone(prev => Math.min(10, prev + 1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mode, currentChapter, toggleAudio]);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleChapterChange = useCallback((index: number) => {
    setCurrentChapter(index);
  }, []);

  const handleMilestoneChange = useCallback((index: number) => {
    setActiveMilestone(index);
  }, []);

  // Detect reduced motion preference
  const prefersReducedMotion = typeof window !== 'undefined' 
    ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
    : false;

  return (
    <div className="min-h-screen bg-[#0a0e1a] text-white overflow-x-hidden">
      {/* Skip to content link for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-[#FF9933] focus:text-black focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>

      {/* Preloader */}
      <BrandedPreloader onComplete={handlePreloaderComplete} />

      {/* Cinematic overlays */}
      {!isLoading && (
        <>
          <div className="film-grain" aria-hidden="true" />
          <div className="vignette" aria-hidden="true" />
        </>
      )}

      {/* Velocity-reactive particles */}
      {!isLoading && !prefersReducedMotion && (
        <VelocityParticles velocity={velocity} mode={mode} />
      )}

      {/* Navigation Header */}
      {!isLoading && (
        <NavHeader
          mode={mode}
          onModeChange={setMode}
          isPlaying={isPlaying}
          onToggleAudio={toggleAudio}
        />
      )}

      {/* Main Content */}
      <main id="main-content">
        {!isLoading && (
          <AnimatePresence mode="wait">
            {mode === 'story' ? (
              <motion.div
                key="story"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
              >
                <StoryMode
                  onChapterChange={handleChapterChange}
                  currentChapter={currentChapter}
                />
              </motion.div>
            ) : (
              <motion.div
                key="explore"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.5 }}
              >
                <ExploreMode
                  activeMilestone={activeMilestone}
                  onMilestoneChange={handleMilestoneChange}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </main>

      {/* Keyboard Hints - bottom right */}
      {!isLoading && (
        <motion.div
          className="fixed bottom-4 right-4 z-40 hidden lg:flex flex-col gap-1 text-[10px] text-white/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4 }}
        >
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-white/30 font-mono">M</kbd>
            <span>Mode</span>
          </div>
          <div className="flex items-center gap-1.5">
            <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-white/30 font-mono">A</kbd>
            <span>Audio</span>
          </div>
          {mode === 'story' && (
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-white/30 font-mono">↑↓</kbd>
              <span>Navigate</span>
            </div>
          )}
          {mode === 'explore' && (
            <div className="flex items-center gap-1.5">
              <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10 text-white/30 font-mono">←→</kbd>
              <span>Navigate</span>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
