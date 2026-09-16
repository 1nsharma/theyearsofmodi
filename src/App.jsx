import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import Scene from './components/Scene';
import Timeline from './components/Timeline';
import MediaPopup from './components/MediaPopup';
import SocialFeed from './components/SocialFeed';
import HeaderOverlay from './components/HeaderOverlay';
import { timelineData } from './utils/timelineData';

function LoadingScreen() {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        background: '#080a0f',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '20px',
        zIndex: 100
      }}
    >
      <div className="spinner" />
      <div style={{ textAlign: 'center' }}>
        <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.5rem', color: '#FF9933', margin: '0 0 6px 0' }}>
          Loading 3D Experience...
        </h2>
        <p style={{ color: '#A0AEC0', fontSize: '13px', margin: 0 }}>
          Initializing 3D Model, Timeline Ribbon & Interactive Atmosphere
        </p>
      </div>
    </div>
  );
}

export default function App() {
  const [activeEvent, setActiveEvent] = useState(timelineData[0]);
  const [showPopup, setShowPopup] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSocialOpen, setIsSocialOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [audioEnabled, setAudioEnabled] = useState(false);

  const audioCtxRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Web Audio ambient drone synthesizer
  const toggleAudio = () => {
    if (!audioEnabled) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) {
          const ctx = new AudioContext();
          audioCtxRef.current = ctx;

          const masterGain = ctx.createGain();
          masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
          masterGain.connect(ctx.destination);
          gainNodeRef.current = masterGain;

          // Drone harmonic oscillators (Indian classical Sa-Pa harmony: D3, A3, D4)
          const freqs = [146.83, 220.00, 293.66];
          freqs.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const oscGain = ctx.createGain();

            osc.type = idx === 0 ? 'sawtooth' : 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);

            // Subtle warm low-pass filter
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.setValueAtTime(450, ctx.currentTime);

            oscGain.gain.setValueAtTime(idx === 0 ? 0.05 : 0.08, ctx.currentTime);

            osc.connect(filter);
            filter.connect(oscGain);
            oscGain.connect(masterGain);

            osc.start();
          });
        } else if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }
        setAudioEnabled(true);
      } catch (e) {
        console.warn('Audio initialization error:', e);
      }
    } else {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
      setAudioEnabled(false);
    }
  };

  const handleSelectEvent = (event) => {
    setActiveEvent(event);
    setShowPopup(true);
  };

  const filteredIds = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return timelineData
      .filter((item) => item.category === selectedCategory)
      .map((item) => item.id);
  }, [selectedCategory]);

  return (
    <main
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#080a0f',
        overflow: 'hidden'
      }}
    >
      {/* Top Header & Floating Quick Controls */}
      <HeaderOverlay
        onToggleSocial={() => setIsSocialOpen(!isSocialOpen)}
        isSocialOpen={isSocialOpen}
        audioEnabled={audioEnabled}
        onToggleAudio={toggleAudio}
      />

      {/* 3D WebGL Canvas */}
      <Suspense fallback={<LoadingScreen />}>
        <Scene
          activeMarker={activeEvent?.id}
          onMarkerClick={handleSelectEvent}
          filteredIds={filteredIds}
        />
      </Suspense>

      {/* Bottom Timeline Scrubber & Filters */}
      <Timeline
        onSelectEvent={handleSelectEvent}
        activeEvent={activeEvent}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Milestone Details & Media Popup Card */}
      {showPopup && activeEvent && (
        <MediaPopup
          event={activeEvent}
          onClose={() => setShowPopup(false)}
        />
      )}

      {/* Digital Footprint Social Feed Drawer */}
      <SocialFeed
        isOpen={isSocialOpen}
        onClose={() => setIsSocialOpen(false)}
      />
    </main>
  );
}
