import React, { useState } from 'react';
import { Sparkles, Globe, Volume2, VolumeX, Info, Compass, HelpCircle } from 'lucide-react';

export default function HeaderOverlay({
  onToggleSocial,
  isSocialOpen,
  onResetCamera,
  audioEnabled,
  onToggleAudio
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
          padding: '16px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 50,
          pointerEvents: 'none',
          background: 'linear-gradient(180deg, rgba(8, 10, 15, 0.85) 0%, transparent 100%)'
        }}
      >
        {/* Branding */}
        <div
          className="glass-panel"
          style={{
            padding: '10px 18px',
            borderRadius: '12px',
            pointerEvents: 'auto',
            border: '1px solid rgba(255, 153, 51, 0.25)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          {/* Tricolor Indicator */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', width: '5px', height: '36px', borderRadius: '3px', overflow: 'hidden' }}>
            <div style={{ flex: 1, background: '#FF9933' }} />
            <div style={{ flex: 1, background: '#FFFFFF' }} />
            <div style={{ flex: 1, background: '#138808' }} />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontSize: '18px',
                  fontWeight: 800,
                  margin: 0,
                  letterSpacing: '0.02em',
                  color: '#ffffff'
                }}
              >
                PM Narendra Modi
              </h1>
              <span
                style={{
                  background: 'rgba(255, 153, 51, 0.2)',
                  color: '#FF9933',
                  padding: '2px 7px',
                  borderRadius: '10px',
                  fontSize: '10px',
                  fontWeight: 700,
                  border: '1px solid rgba(255, 153, 51, 0.4)'
                }}
              >
                3D TIMELINE
              </span>
            </div>
            <p style={{ margin: '2px 0 0 0', fontSize: '11px', color: '#A0AEC0' }}>
              Digital Footprint & National Milestones (1950 — Present)
            </p>
          </div>
        </div>

        {/* Action Controls & Navigation */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            pointerEvents: 'auto'
          }}
        >
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
            <Globe size={15} />
            <span style={{ fontSize: '12px' }}>Social Pulse</span>
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
            title="Audio Ambience (Web Audio API Synth)"
          >
            {audioEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span style={{ fontSize: '12px' }}>{audioEnabled ? 'Sound ON' : 'Mute'}</span>
          </button>

          {/* About / Model Info */}
          <button
            onClick={() => setShowAboutModal(true)}
            className="btn-secondary"
            style={{ padding: '8px 12px' }}
            title="Project Information & Credits"
          >
            <Info size={15} />
          </button>
        </div>
      </header>

      {/* Top Center Controls Hint */}
      <div
        style={{
          position: 'absolute',
          top: '80px',
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
            padding: '5px 14px',
            borderRadius: '20px',
            fontSize: '11px',
            color: '#A0AEC0',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>🖱️ Left Click + Drag: Rotate</span>
          <span>•</span>
          <span>🔍 Scroll: Zoom</span>
          <span>•</span>
          <span>👆 Click Nodes: Milestone Detail</span>
        </div>
      </div>

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
              width: '480px',
              maxWidth: '90vw',
              padding: '28px',
              borderRadius: '16px',
              border: '1px solid rgba(255, 153, 51, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem', color: '#FF9933', marginBottom: '10px' }}>
              PM Narendra Modi 3D Experience
            </h2>
            <p style={{ fontSize: '13px', color: '#CBD5E0', lineHeight: '1.6', marginBottom: '14px' }}>
              An interactive 3D digital footprint timeline illustrating the transformative journey, policy landmarks, and technological advancements of India under Prime Minister Narendra Modi.
            </p>

            <div style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '10px', fontSize: '12px', color: '#A0AEC0', marginBottom: '18px' }}>
              <div style={{ fontWeight: 700, color: '#ffffff', marginBottom: '4px' }}>3D Model Attribution</div>
              <div>
                Based on <em>"Narendra Modi - Prime Minister of INDIA"</em> by <strong>bhagathartworks</strong> on Sketchfab, licensed under CC-BY-4.0.
              </div>
            </div>

            <button
              onClick={() => setShowAboutModal(false)}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
