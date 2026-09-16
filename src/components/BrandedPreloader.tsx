import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BrandedPreloaderProps {
  onComplete: () => void;
}

export default function BrandedPreloader({ onComplete }: BrandedPreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const duration = 2800;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const p = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(Math.round(eased * 100));
      
      if (p < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          setIsVisible(false);
          setTimeout(onComplete, 600);
        }, 400);
      }
    };

    requestAnimationFrame(animate);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0e1a]"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Loading experience"
        >
          {/* Concentric Tricolor Rings */}
          <div className="relative w-32 h-32 mb-8">
            {/* Saffron Ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-[#FF9933]"
              style={{ borderStyle: 'dashed' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
            {/* White Ring */}
            <motion.div
              className="absolute inset-3 rounded-full border-2 border-white/80"
              style={{ borderStyle: 'dashed' }}
              animate={{ rotate: -360 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            />
            {/* Green Ring */}
            <motion.div
              className="absolute inset-6 rounded-full border-2 border-[#138808]"
              style={{ borderStyle: 'dashed' }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            />
            {/* Center Lotus */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="text-3xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🪷
              </motion.div>
            </div>
          </div>

          {/* Title */}
          <motion.h1
            className="text-2xl md:text-3xl font-light text-white tracking-wider mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            The Years of <span className="text-[#FF9933] font-medium">Modi</span>
          </motion.h1>

          {/* Progress Bar */}
          <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #FF9933, #FFFFFF, #138808)',
                width: `${progress}%`,
              }}
            />
          </div>

          {/* Percentage */}
          <motion.p
            className="mt-3 text-sm text-white/50 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {progress}%
          </motion.p>

          {/* Subtitle */}
          <motion.p
            className="mt-6 text-xs text-white/30 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            A Cinematic Journey Through Leadership
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
