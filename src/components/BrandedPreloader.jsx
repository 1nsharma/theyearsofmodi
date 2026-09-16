import React, { useState, useEffect } from 'react';
import { useProgress } from '@react-three/drei';

export default function BrandedPreloader({ onLoaded }) {
  const { progress, active } = useProgress();
  const [displayProgress, setDisplayProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [isDone, setIsDone] = useState(false);

  // Smooth progress count-up
  useEffect(() => {
    const target = Math.floor(progress);
    const interval = setInterval(() => {
      setDisplayProgress((prev) => {
        if (prev < target) {
          return prev + 1;
        }
        if (!active && prev >= 99) {
          clearInterval(interval);
          return 100;
        }
        return prev;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [progress, active]);

  // When reached 100%, trigger smooth fade-out
  useEffect(() => {
    if (displayProgress >= 100) {
      const timeout = setTimeout(() => {
        setIsFadingOut(true);
        setTimeout(() => {
          setIsDone(true);
          onLoaded?.();
        }, 800);
      }, 400);

      return () => clearTimeout(timeout);
    }
  }, [displayProgress, onLoaded]);

  if (isDone) return null;

  return (
    <div
      role="progressbar"
      aria-valuenow={displayProgress}
      aria-valuemin="0"
      aria-valuemax="100"
      aria-label="Loading The Years of Modi 3D Experience"
      style={{
        position: 'fixed',
        inset: 0,
        background: '#0a0e1a',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: isFadingOut ? 0 : 1,
        pointerEvents: isFadingOut ? 'none' : 'auto',
        transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      {/* Tricolor Animated Core */}
      <div style={{ position: 'relative', width: '90px', height: '90px', marginBottom: '28px' }}>
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '3px solid rgba(255, 153, 51, 0.2)',
            borderTopColor: '#FF9933',
            animation: 'spin 1.2s linear infinite'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '8px',
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.1)',
            borderRightColor: '#FFFFFF',
            animation: 'spin 1.8s linear infinite reverse'
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: '16px',
            borderRadius: '50%',
            border: '2px solid rgba(19, 136, 8, 0.2)',
            borderBottomColor: '#138808',
            animation: 'spin 1.5s linear infinite'
          }}
        />
        {/* Center Percentage */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Outfit', sans-serif",
            fontSize: '15px',
            fontWeight: 800,
            color: '#FFD700'
          }}
        >
          {displayProgress}%
        </div>
      </div>

      {/* Brand Title */}
      <h2
        style={{
          fontFamily: "'Outfit', sans-serif",
          fontSize: '1.45rem',
          fontWeight: 800,
          color: '#ffffff',
          letterSpacing: '0.02em',
          margin: '0 0 6px 0',
          textAlign: 'center'
        }}
      >
        The Years of Modi
      </h2>

      <p
        style={{
          fontSize: '12px',
          color: '#A0AEC0',
          fontFamily: "'Inter', sans-serif",
          margin: '0 0 20px 0',
          letterSpacing: '0.05em',
          textTransform: 'uppercase'
        }}
      >
        {displayProgress < 50
          ? 'Fetching 3D Geometry & Assets...'
          : displayProgress < 90
          ? 'Compiling Atmosphere & Shaders...'
          : 'Initializing Cinematic Experience...'}
      </p>

      {/* Slim Progress Bar Line */}
      <div
        style={{
          width: '240px',
          height: '4px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '2px',
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${displayProgress}%`,
            height: '100%',
            background: 'linear-gradient(90deg, #FF9933, #FFD700, #138808)',
            boxShadow: '0 0 10px #FF9933',
            transition: 'width 0.15s ease-out'
          }}
        />
      </div>
    </div>
  );
}
