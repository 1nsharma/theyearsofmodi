import React from 'react';
import { Film, Compass } from 'lucide-react';

export default function ModeToggle({ mode, onToggle }) {
  return (
    <div className="mode-toggle-container">
      <div className="mode-toggle-pill">
        <button
          onClick={() => onToggle('story')}
          className={`mode-toggle-btn ${mode === 'story' ? 'active' : ''}`}
          title="Scroll-Driven Narrative Mode"
        >
          <Film size={14} />
          <span>Story Mode</span>
        </button>

        <button
          onClick={() => onToggle('explore')}
          className={`mode-toggle-btn ${mode === 'explore' ? 'active' : ''}`}
          title="Interactive 3D Spline & Orbit Mode"
        >
          <Compass size={14} />
          <span>3D Explore Mode</span>
        </button>
      </div>
    </div>
  );
}
