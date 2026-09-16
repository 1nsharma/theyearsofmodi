import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { chapters } from '../data/chapters';
import StatsSection from './StatsSection';
import QuoteSection from './QuoteSection';

interface StoryModeProps {
  onChapterChange: (index: number) => void;
  currentChapter: number;
}

function ChapterSection({ chapter, index, onInView }: { chapter: typeof chapters[0]; index: number; onInView: (index: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5, once: false });

  useEffect(() => {
    if (isInView) {
      onInView(index);
    }
  }, [isInView, index, onInView]);

  const isEven = index % 2 === 0;

  return (
    <motion.section
      ref={ref}
      id={`chapter-${index}`}
      className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 py-20 relative"
      role="region"
      aria-label={`Chapter ${index + 1}: ${chapter.title}`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          background: `radial-gradient(ellipse at ${isEven ? '30%' : '70%'} 50%, ${chapter.color}, transparent 70%)`,
        }}
      />

      <div className={`max-w-6xl w-full grid md:grid-cols-2 gap-8 lg:gap-16 items-center ${isEven ? '' : 'md:direction-rtl'}`}>
        {/* Year & Icon */}
        <motion.div
          className={`text-center md:text-left ${isEven ? '' : 'md:order-2 md:text-right'}`}
          initial={{ opacity: 0, x: isEven ? -50 : 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
        >
          <motion.div
            className="text-6xl md:text-8xl lg:text-9xl font-black opacity-10 mb-2"
            style={{ color: chapter.color }}
          >
            {chapter.year.split('–')[0]}
          </motion.div>
          <motion.div
            className="text-5xl md:text-6xl mb-4"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.4 }}
            viewport={{ once: false }}
          >
            {chapter.icon}
          </motion.div>
          <div
            className="inline-block px-3 py-1 rounded-full text-xs font-medium tracking-wider uppercase"
            style={{ 
              backgroundColor: `${chapter.color}15`,
              color: chapter.color,
              border: `1px solid ${chapter.color}30`,
            }}
          >
            {chapter.year}
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          className={`${isEven ? '' : 'md:order-1'}`}
          initial={{ opacity: 0, x: isEven ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: false }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
            {chapter.title}
          </h2>
          <h3
            className="text-lg md:text-xl font-light mb-6 opacity-70"
            style={{ color: chapter.color }}
          >
            {chapter.subtitle}
          </h3>
          <p className="text-white/60 text-base md:text-lg leading-relaxed mb-6">
            {chapter.description}
          </p>
          <ul className="space-y-2">
            {chapter.details.map((detail, i) => (
              <motion.li
                key={i}
                className="flex items-start gap-3 text-sm md:text-base text-white/50"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
                viewport={{ once: false }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                  style={{ backgroundColor: chapter.color }}
                />
                {detail}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Decorative line */}
      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{
          background: `linear-gradient(to bottom, transparent, ${chapter.color}40, transparent)`,
        }}
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        viewport={{ once: false }}
      />
    </motion.section>
  );
}

export default function StoryMode({ onChapterChange, currentChapter }: StoryModeProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? scrollTop / docHeight : 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative">
      {/* Progress indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5">
        <motion.div
          className="h-full"
          style={{
            background: 'linear-gradient(90deg, #FF9933, #FFFFFF, #138808)',
            width: `${progress * 100}%`,
          }}
        />
      </div>

      {/* Chapter dots */}
      <nav
        className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-3"
        aria-label="Chapter navigation"
      >
        {chapters.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              const el = document.getElementById(`chapter-${i}`);
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              currentChapter === i
                ? 'bg-[#FF9933] scale-150 shadow-lg shadow-[#FF9933]/50'
                : 'bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`Go to chapter ${i + 1}`}
            aria-current={currentChapter === i ? 'true' : undefined}
          />
        ))}
      </nav>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(https://image.qwenlm.ai/generated-images/e6679a8a-c919-40b5-b481-962832e788cd/_result.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, #FF993310, transparent 60%), radial-gradient(ellipse at 30% 70%, #13880810, transparent 50%), linear-gradient(to bottom, transparent 60%, #0a0e1a)',
          }}
        />
        
        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.div
            className="text-7xl md:text-9xl mb-6"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            🇮🇳
          </motion.div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">
            The Years of <span className="text-[#FF9933]">Modi</span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-8">
            A cinematic journey through a decade of transformation, leadership, and India's rise on the global stage.
          </p>
          <motion.div
            className="flex items-center gap-2 text-white/30 text-sm"
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <span>Scroll to explore</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Chapters */}
      {chapters.map((chapter, i) => (
        <div key={chapter.id}>
          <ChapterSection
            chapter={chapter}
            index={i}
            onInView={onChapterChange}
          />
          {/* Stats section after chapter 5 (2019) */}
          {i === 5 && <StatsSection />}
        </div>
      ))}

      {/* Quotes Section */}
      <QuoteSection />

      {/* Tricolor Divider */}
      <div className="flex items-center justify-center py-8" aria-hidden="true">
        <div className="flex items-center gap-0">
          <motion.div
            className="h-px w-24 md:w-48"
            style={{ background: '#FF9933' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0 }}
            viewport={{ once: true }}
          />
          <motion.div
            className="h-px w-24 md:w-48"
            style={{ background: '#FFFFFF' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            viewport={{ once: true }}
          />
          <motion.div
            className="h-px w-24 md:w-48"
            style={{ background: '#138808' }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            viewport={{ once: true }}
          />
        </div>
      </div>

      {/* Closing Section */}
      <section className="min-h-[70vh] flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, #FF993308, transparent 50%), radial-gradient(ellipse at 30% 70%, #13880808, transparent 40%)',
          }}
          animate={{
            background: [
              'radial-gradient(ellipse at 50% 50%, #FF993308, transparent 50%)',
              'radial-gradient(ellipse at 60% 40%, #13880808, transparent 50%)',
              'radial-gradient(ellipse at 40% 60%, #FF993308, transparent 50%)',
              'radial-gradient(ellipse at 50% 50%, #FF993308, transparent 50%)',
            ],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <motion.div
          className="text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <motion.div
            className="text-6xl mb-6"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
          >
            🪷
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            The Journey <span className="text-gradient-tricolor">Continues</span>
          </h2>
          <p className="text-white/50 max-w-lg mx-auto text-lg">
            From Varanasi to the world stage — a story of a nation's aspirations 
            and the leadership that shapes its destiny.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="w-16 h-0.5 bg-[#FF9933]" />
            <div className="w-16 h-0.5 bg-white" />
            <div className="w-16 h-0.5 bg-[#138808]" />
          </div>
          
          {/* Back to top */}
          <motion.button
            className="mt-12 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-white/50 hover:text-white hover:bg-white/10 transition-all text-sm"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ↑ Return to the Beginning
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}
