import React, { useState } from 'react';
import { X, Calendar, CheckCircle2, TrendingUp, Share2, Award, Zap } from 'lucide-react';

export default function MediaPopup({ event, onClose }) {
  if (!event) return null;

  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div
      style={{
        position: 'absolute',
        top: '80px',
        right: '24px',
        width: '420px',
        maxWidth: 'calc(100vw - 48px)',
        maxHeight: 'calc(100vh - 200px)',
        zIndex: 60,
        pointerEvents: 'auto'
      }}
      className="animate-fade-in"
    >
      <div
        className="glass-panel"
        style={{
          borderRadius: '16px',
          padding: '24px',
          overflowY: 'auto',
          maxHeight: 'calc(100vh - 200px)',
          border: `1px solid ${event.color}44`,
          boxShadow: `0 16px 48px rgba(0,0,0,0.7), 0 0 30px ${event.color}22`
        }}
      >
        {/* Header with Close */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: `${event.color}22`,
                color: event.color,
                border: `1px solid ${event.color}66`,
                padding: '3px 10px',
                borderRadius: '12px',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginBottom: '8px'
              }}
            >
              <Calendar size={12} />
              {event.year} • {event.category.toUpperCase()}
            </div>
            <h2
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: '1.4rem',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.2
              }}
            >
              {event.title}
            </h2>
            <div style={{ fontSize: '12px', color: '#A0AEC0', marginTop: '4px' }}>
              {event.date}
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              color: '#CBD5E0',
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.color = '#CBD5E0';
            }}
            title="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Media Box */}
        {event.media && (
          <div
            style={{
              borderRadius: '12px',
              overflow: 'hidden',
              marginBottom: '16px',
              background: '#040609',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <img
              src={event.media.url}
              alt={event.media.caption}
              style={{
                width: '100%',
                height: '180px',
                objectFit: 'cover',
                display: 'block'
              }}
            />
            <div
              style={{
                padding: '8px 12px',
                fontSize: '11px',
                color: '#CBD5E0',
                background: 'rgba(10, 15, 20, 0.8)',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)'
              }}
            >
              {event.media.caption}
            </div>
          </div>
        )}

        {/* Description */}
        <p
          style={{
            fontSize: '13px',
            lineHeight: '1.6',
            color: '#E2E8F0',
            marginBottom: '18px'
          }}
        >
          {event.description}
        </p>

        {/* Sub-tabs Navigation */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            paddingBottom: '8px',
            marginBottom: '16px'
          }}
        >
          <button
            onClick={() => setActiveTab('overview')}
            style={{
              background: 'transparent',
              border: 'none',
              color: activeTab === 'overview' ? event.color : '#A0AEC0',
              fontWeight: activeTab === 'overview' ? 700 : 500,
              fontSize: '12px',
              cursor: 'pointer',
              borderBottom: activeTab === 'overview' ? `2px solid ${event.color}` : '2px solid transparent',
              paddingBottom: '4px'
            }}
          >
            Overview
          </button>
          {(event.decisions || event.impact) && (
            <button
              onClick={() => setActiveTab('decisions')}
              style={{
                background: 'transparent',
                border: 'none',
                color: activeTab === 'decisions' ? event.color : '#A0AEC0',
                fontWeight: activeTab === 'decisions' ? 700 : 500,
                fontSize: '12px',
                cursor: 'pointer',
                borderBottom: activeTab === 'decisions' ? `2px solid ${event.color}` : '2px solid transparent',
                paddingBottom: '4px'
              }}
            >
              Decisions & Impact
            </button>
          )}
          {event.achievements && (
            <button
              onClick={() => setActiveTab('achievements')}
              style={{
                background: 'transparent',
                border: 'none',
                color: activeTab === 'achievements' ? event.color : '#A0AEC0',
                fontWeight: activeTab === 'achievements' ? 700 : 500,
                fontSize: '12px',
                cursor: 'pointer',
                borderBottom: activeTab === 'achievements' ? `2px solid ${event.color}` : '2px solid transparent',
                paddingBottom: '4px'
              }}
            >
              Achievements
            </button>
          )}
        </div>

        {/* Tab Content: Overview */}
        {activeTab === 'overview' && (
          <div>
            {event.details && (
              <div style={{ display: 'grid', gap: '10px', marginBottom: '14px' }}>
                {Object.entries(event.details).map(([k, v]) => (
                  <div
                    key={k}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  >
                    <span style={{ color: event.color, fontWeight: 600, textTransform: 'capitalize' }}>
                      {k.replace(/([A-Z])/g, ' $1')}:{' '}
                    </span>
                    <span style={{ color: '#CBD5E0' }}>{v}</span>
                  </div>
                ))}
              </div>
            )}

            {event.socialMedia && (
              <div
                style={{
                  background: 'rgba(0, 191, 255, 0.08)',
                  border: '1px solid rgba(0, 191, 255, 0.2)',
                  borderRadius: '10px',
                  padding: '12px',
                  marginTop: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: '#00BFFF', fontSize: '12px', fontWeight: 600 }}>
                  <Share2 size={13} />
                  Digital Footprint ({event.socialMedia.twitter})
                </div>
                <div style={{ fontSize: '11px', color: '#A0AEC0' }}>
                  Global Following: <strong style={{ color: '#fff' }}>{event.socialMedia.followers}</strong>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Decisions & Impact */}
        {activeTab === 'decisions' && (
          <div style={{ display: 'grid', gap: '10px' }}>
            {event.decisions?.map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '12px',
                  borderRadius: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: event.color, fontWeight: 700, fontSize: '13px' }}>
                  <Zap size={13} />
                  {item.name}
                </div>
                <div style={{ fontSize: '12px', color: '#CBD5E0', marginTop: '4px', lineHeight: '1.4' }}>
                  {item.impact}
                </div>
              </div>
            ))}

            {event.impact && (
              <div style={{ display: 'grid', gap: '8px' }}>
                {Object.entries(event.impact).map(([key, value]) => (
                  <div
                    key={key}
                    style={{
                      background: 'rgba(255, 255, 255, 0.04)',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      fontSize: '12px'
                    }}
                  >
                    <div style={{ color: '#FFD700', fontWeight: 600, textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <TrendingUp size={12} />
                      {key.replace(/([A-Z])/g, ' $1')}
                    </div>
                    <div style={{ color: '#E2E8F0', marginTop: '3px' }}>{value}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Achievements */}
        {activeTab === 'achievements' && event.achievements && (
          <div style={{ display: 'grid', gap: '8px' }}>
            {event.achievements.map((ach, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '8px',
                  fontSize: '12px',
                  color: '#E2E8F0',
                  lineHeight: '1.4',
                  background: 'rgba(255, 255, 255, 0.03)',
                  padding: '8px 10px',
                  borderRadius: '6px'
                }}
              >
                <CheckCircle2 size={14} color={event.color} style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>{ach}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
