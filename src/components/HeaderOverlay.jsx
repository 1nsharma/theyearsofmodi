import React, { useState } from 'react';
import {
  Globe,
  Volume2,
  VolumeX,
  Info,
  Eye,
  EyeOff,
  Camera
} from 'lucide-react';

export default function HeaderOverlay({
  onToggleSocial,
  isSocialOpen,
  audioEnabled,
  onToggleAudio,
  isFocusMode,
  onToggleFocusMode
}) {
  const [showAboutModal, setShowAboutModal] = useState(false);

  return (
    <>
      <header
        style={{
          position: 'absolute',
          top: '0',
          left: '0',
          width: '100%',
          padding: '14px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 50,
          pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(8, 10, 15, 0.85) 0%, transparent 100%)'
        }}
      >
        {/* Left Branding */}
        <div
          className="glass-panel"
          style={{
            padding: '8px 16px',
            borderRadius: '12px',
            pointerEvents: 'auto',
            border: '1px solid rgba(255, 153, 51, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          {/* Saffron, White, Green bar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5px', width: '4px', height: '32px', borderRadius: '2px', overflow: 'hidden' }}>
            <div style={{ flex: 1, background: '#FF9933' }} />
            <div style={{ flex: 1, background: '#FFFFFF' }} />
            <div style={{ flex: 1, background: '#138808' }} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '17px',
                  fontWeight: 800,
                  margin: 0,
                  color: '#ffffff'
                }}
              >
                PM Narendra Modi
              </h1>
              <span
                style={{
                  background: 'rgba(255, 153, 51, 0.2)',
                  color: '#FF9933',
                  padding: '1px 6px',
                  borderRadius: '8px',
                  fontSize: '9.5px',
                  fontWeight: 700,
                  border: '1px solid rgba(255, 153, 51, 0.4)'
                }}
              >
                3D TIMELINE
              </span>
            </div>
            <p style={{ margin: '1px 0 0 0', fontSize: '10.5px', color: '#A0AEC0' }}>
              Spline Walking Experience • 1950 — Present
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            pointerEvents: 'auto'
          }}
        >
          {/* Focus Model Toggle Button */}
          <button
            onClick={onToggleFocusMode}
            className="btn-secondary"
            style={{
              background: isFocusMode ? 'rgba(255, 153, 51, 0.25)' : 'rgba(255, 255, 255, 0.08)',
              borderColor: isFocusMode ? '#FF9933' : 'rgba(255, 255, 255, 0.15)',
              color: isFocusMode ? '#FF9933' : '#ffffff'
            }}
            title={isFocusMode ? 'Exit Unobstructed Model View' : 'Focus 3D Model (Hide Information Overlays)'}
          >
            {isFocusMode ? <EyeOff size={14} /> : <Eye size={14} />}
            <span style={{ fontSize: '11.5px' }}>{isFocusMode ? 'Show Info' : 'Focus Model'}</span>
          </button>

          {/* Social Pulse Toggle */}
          <button
            onClick={onToggleSocial}
            className="btn-secondary"
            style={{
              background: isSocialOpen ? 'rgba(0, 191, 255, 0.2)' : 'rgba(255, 255, 255, 0.08)',
              borderColor: isSocialOpen ? '#00BFFF' : 'rgba(255, 255, 255, 0.15)',
              color: isSocialOpen ? '#00BFFF' : '#ffffff'
            }}
            title="Digital Footprint Social Feed"
          >
            <Globe size={14} />
            <span style={{ fontSize: '11.5px' }}>Social Pulse</span>
          </button>

          {/* Audio Ambience Toggle */}
          <button
            onClick={onToggleAudio}
            className="btn-secondary"
            style={{
              background: audioEnabled ? 'rgba(255, 153, 51, 0.2)' : 'rgba(255, 255, 255, 0.08)',
              borderColor: audioEnabled ? '#FF9933' : 'rgba(255, 255, 255, 0.15)',
              color: audioEnabled ? '#FF9933' : '#CBD5E0'
            }}
            title="Ambient Music Synth (Web Audio API)"
          >
            {audioEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span style={{ fontSize: '11.5px' }}>{audioEnabled ? 'Sound ON' : 'Mute'}</span>
          </button>

          {/* About / Model Info */}
          <button
            onClick={() => setShowAboutModal(true)}
            className="btn-secondary"
            style={{ padding: '8px 10px' }}
            title="Project Information & Credits"
          >
            <Info size={14} />
          </button>
        </div>
      </header>

      {/* Top Center Controls Hint */}
      {!isFocusMode && (
        <div
          style={{
            position: 'absolute',
            top: '72px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 40,
            pointerEvents: 'none',
            display: 'flex',
            gap: '12px'
          }}
        >
          <div
            className="glass-panel"
            style={{
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '10.5px',
              color: '#A0AEC0',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <span>🚶 Model walks smoothly along curve</span>
            <span>•</span>
            <span>🖱️ Drag to orbit</span>
            <span>•</span>
            <span>🔍 Scroll to zoom</span>
          </div>
        </div>
      )}

      {/* About & Attribution Modal */}
      {showAboutModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 100
          }}
          onClick={() => setShowAboutModal(false)}
        >
          <div
            className="glass-panel animate-fade-in"
            style={{
              width: '460px',
              maxWidth: '90vw',
              padding: '24px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 153, 51, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.3rem', color: '#FF9933', marginBottom: '8px' }}>
              PM Narendra Modi 3D Experience
            </h2>
            <p style={{ fontSize: '12.5px', color: '#CBD5E0', lineHeight: '1.6', marginBottom: '14px' }}>
              An interactive 3D digital footprint timeline illustrating the transformative journey, national milestones, and technological advancements of India under Prime Minister Narendra Modi.
            </p>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '10px', fontSize: '11.5px', color: '#A0AEC0', marginBottom: '16px' }}>
              <div style={{ fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>3D Model Attribution</div>
              <div>
                Based on <em>"Narendra Modi - Prime Minister of INDIA"</em> by <strong>bhagathartworks</strong> on Sketchfab, licensed under CC-BY-4.0.
              </div>
            </div>

            <button
              onClick={() => setShowAboutModal(false)}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', fontSize: '13px' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
