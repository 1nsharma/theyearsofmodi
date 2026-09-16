import { motion } from 'framer-motion';

interface NavHeaderProps {
  mode: 'story' | 'explore';
  onModeChange: (mode: 'story' | 'explore') => void;
  isPlaying: boolean;
  onToggleAudio: () => void;
}

export default function NavHeader({ mode, onModeChange, isPlaying, onToggleAudio }: NavHeaderProps) {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ delay: 3.5, duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🪷</span>
          <span className="text-sm font-medium text-white/80 hidden sm:block">
            The Years of <span className="text-[#FF9933]">Modi</span>
          </span>
        </div>

        {/* Mode Tabs */}
        <div className="flex items-center bg-white/5 backdrop-blur-md rounded-full border border-white/10 px-1 py-1">
          <button
            onClick={() => onModeChange('story')}
            className={`px-3 md:px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              mode === 'story'
                ? 'bg-[#FF9933] text-black shadow-lg shadow-[#FF9933]/20'
                : 'text-white/50 hover:text-white/80'
            }`}
            aria-label="Story Mode"
            aria-pressed={mode === 'story'}
          >
            <span className="hidden sm:inline">📖 </span>Story
          </button>
          <button
            onClick={() => onModeChange('explore')}
            className={`px-3 md:px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
              mode === 'explore'
                ? 'bg-[#138808] text-white shadow-lg shadow-[#138808]/20'
                : 'text-white/50 hover:text-white/80'
            }`}
            aria-label="Explore Mode"
            aria-pressed={mode === 'explore'}
          >
            <span className="hidden sm:inline">🗺️ </span>Explore
          </button>
        </div>

        {/* Audio */}
        <button
          onClick={onToggleAudio}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isPlaying
              ? 'bg-[#FF9933]/20 text-[#FF9933]'
              : 'bg-white/5 text-white/30 hover:text-white/60'
          }`}
          aria-label={isPlaying ? 'Mute audio' : 'Play audio'}
        >
          {isPlaying ? (
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/>
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          )}
        </button>
      </div>
    </motion.header>
  );
}
