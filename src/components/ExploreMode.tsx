import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { chapters, milestones } from '../data/chapters';

interface ExploreModeProps {
  activeMilestone: number;
  onMilestoneChange: (index: number) => void;
}

export default function ExploreMode({ activeMilestone, onMilestoneChange }: ExploreModeProps) {
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null);
  const chapter = chapters[activeMilestone] || chapters[0];

  const navigateMilestone = useCallback((direction: number) => {
    const next = Math.max(0, Math.min(milestones.length - 1, activeMilestone + direction));
    onMilestoneChange(next);
  }, [activeMilestone, onMilestoneChange]);

  // Keyboard navigation handled by parent App component

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Background gradient based on active chapter */}
      <motion.div
        className="absolute inset-0 transition-all duration-1000"
        style={{
          background: `radial-gradient(ellipse at 50% 40%, ${chapter.color}08, transparent 60%), radial-gradient(ellipse at 20% 80%, ${chapter.color}05, transparent 40%)`,
        }}
      />

      {/* Header */}
      <header className="relative z-20 px-4 md:px-8 pt-6 pb-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🇮🇳</span>
            <div>
              <h1 className="text-lg font-bold text-white">Explore Timeline</h1>
              <p className="text-xs text-white/40">Use ← → arrows to navigate</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-white">{chapter.year}</div>
            <div className="text-xs text-white/40">
              {activeMilestone + 1} / {milestones.length}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 relative z-10">
        {/* Large Background Year */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`year-${activeMilestone}`}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 0.03, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-[20vw] font-black text-white whitespace-nowrap">
              {milestones[activeMilestone]?.year}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Chapter Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeMilestone}
            className="max-w-2xl w-full relative"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            {/* Icon & Year */}
            <div className="text-center mb-6">
              <motion.div
                className="text-6xl md:text-7xl mb-4"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
              >
                {chapter.icon}
              </motion.div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {chapter.title}
              </h2>
              <p className="text-lg" style={{ color: chapter.color }}>
                {chapter.subtitle}
              </p>
            </div>

            {/* Description */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
              <p className="text-white/70 text-base md:text-lg leading-relaxed mb-6">
                {chapter.description}
              </p>
              <div className="space-y-3">
                {chapter.details.map((detail, i) => (
                  <motion.div
                    key={i}
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                  >
                    <div
                      className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
                      style={{ backgroundColor: chapter.color }}
                    />
                    <span className="text-white/50 text-sm md:text-base">{detail}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-8 mt-8">
          <button
            onClick={() => navigateMilestone(-1)}
            disabled={activeMilestone === 0}
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            aria-label="Previous milestone"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          <div className="text-white/30 text-sm">
            {milestones[activeMilestone]?.year}
          </div>
          
          <button
            onClick={() => navigateMilestone(1)}
            disabled={activeMilestone === milestones.length - 1}
            className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:bg-white/10 hover:text-white transition-all disabled:opacity-20 disabled:cursor-not-allowed"
            aria-label="Next milestone"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Timeline Bar */}
      <div className="relative z-20 px-4 md:px-8 pb-8">
        <div className="max-w-5xl mx-auto">
          <div className="relative h-20 flex items-end">
            {/* Timeline line */}
            <div className="absolute bottom-8 left-0 right-0 h-px bg-white/10" />
            
            {/* Progress line */}
            <motion.div
              className="absolute bottom-8 left-0 h-px"
              style={{
                background: `linear-gradient(90deg, #FF9933, ${chapter.color})`,
                width: `${milestones[activeMilestone]?.x || 0}%`,
              }}
              transition={{ duration: 0.5 }}
            />

            {/* Milestone dots */}
            {milestones.map((m, i) => (
              <button
                key={i}
                className="absolute bottom-6 flex flex-col items-center group"
                style={{ left: `${m.x}%`, transform: 'translateX(-50%)' }}
                onClick={() => onMilestoneChange(i)}
                onMouseEnter={() => setHoveredMilestone(i)}
                onMouseLeave={() => setHoveredMilestone(null)}
                aria-label={`${m.year}: ${m.event}`}
                role="tab"
                aria-selected={activeMilestone === i}
              >
                {/* Tooltip */}
                <AnimatePresence>
                  {(hoveredMilestone === i || activeMilestone === i) && (
                    <motion.div
                      className="absolute bottom-full mb-3 px-2 py-1 rounded bg-white/10 backdrop-blur-sm text-xs text-white whitespace-nowrap"
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                    >
                      <div className="font-medium">{m.event}</div>
                      <div className="text-white/50">{m.year}</div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Dot */}
                <motion.div
                  className={`w-3 h-3 rounded-full border-2 transition-all ${
                    activeMilestone === i
                      ? 'border-[#FF9933] bg-[#FF9933] scale-125'
                      : i <= activeMilestone
                      ? 'border-white/40 bg-white/20'
                      : 'border-white/10 bg-transparent'
                  }`}
                  whileHover={{ scale: 1.5 }}
                />
                
                {/* Year label */}
                <span className={`mt-2 text-[10px] ${
                  activeMilestone === i ? 'text-[#FF9933]' : 'text-white/30'
                }`}>
                  {m.year}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
