import React from 'react';

export default function ChapterNav({ chapters, currentSection, onSelectChapter }) {
  return (
    <nav className="chapter-nav" aria-label="Chapter navigation">
      {chapters.map((chap) => {
        // Find if current section falls in or near this chapter
        const isActive = Math.abs(currentSection - chap.sectionIndex) <= 1;

        return (
          <button
            key={chap.id}
            onClick={() => onSelectChapter(chap.sectionIndex)}
            className={`chapter-nav-item ${isActive ? 'active' : ''}`}
            aria-label={`Jump to ${chap.name}`}
          >
            <span className="chapter-nav-label">
              {chap.name}
            </span>
            <span
              className="chapter-nav-dot"
              style={{
                backgroundColor: isActive ? chap.color : 'rgba(255, 255, 255, 0.25)',
                boxShadow: isActive ? `0 0 10px ${chap.color}` : 'none'
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}
