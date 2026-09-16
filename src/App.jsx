import React, { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import ScrollTimeline from './components/ScrollTimeline';
import ModelViewer from './components/ModelViewer';
import Scene from './components/Scene';
import Timeline from './components/Timeline';
import MediaPopup from './components/MediaPopup';
import SocialFeed from './components/SocialFeed';
import HeaderOverlay from './components/HeaderOverlay';
import ModeToggle from './components/ModeToggle';
import { scrollSections } from './utils/scrollData';
import { timelineData } from './utils/timelineData';
import './styles/scrollTimeline.css';

export default function App() {
  const [mode, setMode] = useState('story'); // 'story' | 'explore'
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  // Explore mode states
  const [activeExploreEvent, setActiveExploreEvent] = useState(timelineData[0]);
  const [showExplorePopup, setShowExplorePopup] = useState(true);
  const [isExplorePopupMinimized, setIsExplorePopupMinimized] = useState(false);
  const [isExplorePlaying, setIsExplorePlaying] = useState(false);
  const [exploreCategory, setExploreCategory] = useState('all');
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Common states
  const [isSocialOpen, setIsSocialOpen] = useState(false);
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

          const freqs = [146.83, 220.00, 293.66];
          freqs.forEach((freq, idx) => {
            const osc = ctx.createOscillator();
            const oscGain = ctx.createGain();

            osc.type = idx === 0 ? 'sawtooth' : 'sine';
            osc.frequency.setValueAtTime(freq, ctx.currentTime);

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
        console.warn('Audio error:', e);
      }
    } else {
      if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
        audioCtxRef.current.suspend();
      }
      setAudioEnabled(false);
    }
  };

  const currentScrollSection = scrollSections[activeSectionIndex] || scrollSections[0];

  const handleSelectExploreEvent = (event) => {
    setActiveExploreEvent(event);
    if (!isFocusMode) {
      setShowExplorePopup(true);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: '#0a0e1a',
        overflow: mode === 'story' ? 'auto' : 'hidden'
      }}
    >
      {/* Universal Header */}
      <HeaderOverlay
        mode={mode}
        onToggleSocial={() => setIsSocialOpen(!isSocialOpen)}
        isSocialOpen={isSocialOpen}
        audioEnabled={audioEnabled}
        onToggleAudio={toggleAudio}
        isFocusMode={isFocusMode}
        onToggleFocusMode={() => setIsFocusMode(!isFocusMode)}
      />

      {/* Mode Switcher Pill */}
      <ModeToggle mode={mode} onToggle={setMode} />

      {/* MODE 1: STORY MODE (Scroll-Driven Narrative) */}
      {mode === 'story' && (
        <>
          {/* Fixed 3D Background Canvas */}
          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 1,
              pointerEvents: 'none'
            }}
          >
            <Canvas
              camera={{ position: [0, 1.8, 7.5], fov: 46 }}
              style={{ width: '100%', height: '100%' }}
              dpr={[1, 2]}
            >
              <color attach="background" args={['#0a0e1a']} />
              <fog attach="fog" args={['#0a0e1a', 20, 60]} />
              <ambientLight intensity={0.75} />
              <directionalLight position={[15, 25, 20]} intensity={1.6} color="#FFF6E8" />
              <Suspense fallback={null}>
                <ModelViewer currentSectionData={currentScrollSection} />
              </Suspense>
            </Canvas>
          </div>

          {/* Smooth Scroll Content Container */}
          <ScrollTimeline
            activeSectionIndex={activeSectionIndex}
            onSectionChange={(index) => setActiveSectionIndex(index)}
          />
        </>
      )}

      {/* MODE 2: EXPLORE MODE (Interactive 3D Spline & Free Orbit) */}
      {mode === 'explore' && (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <Suspense fallback={null}>
            <Scene
              activeMarker={activeExploreEvent?.id}
              onMarkerClick={handleSelectExploreEvent}
              filteredIds={
                exploreCategory === 'all'
                  ? null
                  : timelineData.filter((i) => i.category === exploreCategory).map((i) => i.id)
              }
              hasPopup={showExplorePopup && !isExplorePopupMinimized && !isFocusMode}
            />
          </Suspense>

          <Timeline
            onSelectEvent={handleSelectExploreEvent}
            activeEvent={activeExploreEvent}
            isPlaying={isExplorePlaying}
            setIsPlaying={setIsExplorePlaying}
            selectedCategory={exploreCategory}
            setSelectedCategory={setExploreCategory}
          />

          {!isFocusMode && showExplorePopup && activeExploreEvent && (
            <MediaPopup
              event={activeExploreEvent}
              onClose={() => setShowExplorePopup(false)}
              isMinimized={isExplorePopupMinimized}
              setIsMinimized={setIsExplorePopupMinimized}
            />
          )}
        </div>
      )}

      {/* Universal Social Feed Drawer */}
      <SocialFeed
        isOpen={isSocialOpen}
        onClose={() => setIsSocialOpen(false)}
      />
    </div>
  );
}
