import React, { useEffect, useRef } from 'react';
import { timelineData, categoryFilters } from '../utils/timelineData';
import { Play, Pause, SkipBack, SkipForward, Sparkles, Filter } from 'lucide-react';

export default function Timeline({
  onSelectEvent,
  activeEvent,
  isPlaying,
  setIsPlaying,
  selectedCategory,
  setSelectedCategory
}) {
  const currentIndex = timelineData.findIndex((item) => item.id === (activeEvent?.id || 1));
  const autoPlayRef = useRef(null);

  // Auto-play timelapse interval
  useEffect(() => {
    if (isPlaying) {
      autoPlayRef.current = setInterval(() => {
        const nextIndex = (currentIndex + 1) % timelineData.length;
        onSelectEvent(timelineData[nextIndex]);
      }, 4000);
    } else {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPlaying, currentIndex, onSelectEvent]);

  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + timelineData.length) % timelineData.length;
    onSelectEvent(timelineData[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % timelineData.length;
    onSelectEvent(timelineData[nextIndex]);
  };

  return (
    <div
      style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '94%',
        maxWidth: '1000px',
        zIndex: 50,
        pointerEvents: 'auto'
      }}
    >
      <div
        className="glass-panel"
        style={{
          borderRadius: '18px',
          padding: '16px 22px',
          border: '1px solid rgba(255, 153, 51, 0.25)',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.65)'
        }}
      >
        {/* Category Filters Bar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '14px',
            overflowX: 'auto',
            paddingBottom: '4px'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#A0AEC0', fontSize: '11px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            <Filter size={12} />
            Filter:
          </div>
          {categoryFilters.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                style={{
                  background: isSelected
                    ? `linear-gradient(135deg, ${cat.color}33, ${cat.color}66)`
                    : 'rgba(255, 255, 255, 0.05)',
                  border: isSelected ? `1px solid ${cat.color}` : '1px solid rgba(255, 255, 255, 0.1)',
                  color: isSelected ? '#FFFFFF' : '#A0AEC0',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '11px',
                  fontWeight: isSelected ? 600 : 400,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s ease'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Playback Controls & Scrubber */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            marginBottom: '12px'
          }}
        >
          {/* Previous Button */}
          <button
            onClick={handlePrev}
            className="btn-secondary"
            style={{ padding: '8px 12px', borderRadius: '10px' }}
            title="Previous Milestone"
          >
            <SkipBack size={15} />
          </button>

          {/* Play/Pause Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="btn-primary"
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              fontSize: '13px'
            }}
          >
            {isPlaying ? (
              <>
                <Pause size={15} />
                <span>Pause</span>
              </>
            ) : (
              <>
                <Play size={15} />
                <span>Timelapse</span>
              </>
            )}
          </button>

          {/* Next Button */}
          <button
            onClick={handleNext}
            className="btn-secondary"
            style={{ padding: '8px 12px', borderRadius: '10px' }}
            title="Next Milestone"
          >
            <SkipForward size={15} />
          </button>

          {/* Range Slider */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '12px' }}>
            <input
              type="range"
              min="0"
              max={timelineData.length - 1}
              value={currentIndex >= 0 ? currentIndex : 0}
              onChange={(e) => {
                const idx = parseInt(e.target.value);
                onSelectEvent(timelineData[idx]);
              }}
            />
          </div>

          {/* Milestone Counter */}
          <div
            style={{
              fontSize: '12px',
              color: '#A0AEC0',
              fontWeight: 600,
              fontFamily: "'Outfit', sans-serif",
              whiteSpace: 'nowrap'
            }}
          >
            <span style={{ color: '#FF9933' }}>{currentIndex + 1}</span> / {timelineData.length}
          </div>
        </div>

        {/* Milestone Badges Strip */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '6px',
            overflowX: 'auto',
            paddingTop: '4px'
          }}
        >
          {timelineData.map((item, index) => {
            const isActive = activeEvent?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => onSelectEvent(item)}
                style={{
                  cursor: 'pointer',
                  padding: '5px 9px',
                  borderRadius: '6px',
                  background: isActive ? item.color : 'rgba(255, 255, 255, 0.05)',
                  color: isActive ? '#080a0f' : '#CBD5E0',
                  fontWeight: isActive ? 800 : 500,
                  fontSize: '11px',
                  textAlign: 'center',
                  minWidth: '46px',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: isActive ? `0 0 12px ${item.color}99` : 'none',
                  transform: isActive ? 'scale(1.1) translateY(-2px)' : 'scale(1)'
                }}
                title={`${item.year}: ${item.title}`}
              >
                {item.year}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
