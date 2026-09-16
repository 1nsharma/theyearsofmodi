import React, { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { scrollSections, chapters } from '../utils/scrollData';
import TimelineSection from './TimelineSection';
import ChapterNav from './ChapterNav';
import ScrollProgress from './ScrollProgress';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollTimeline({ activeSectionIndex, onSectionChange }) {
  const containerRef = useRef(null);
  const lenisRef = useRef(null);
  const [currentSection, setCurrentSection] = useState(activeSectionIndex || 0);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      smoothTouch: false,
      touchMultiplier: 1.8
    });
    lenisRef.current = lenis;

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    const rafId = requestAnimationFrame(raf);

    // Sync ScrollTrigger with Lenis
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Set up ScrollTrigger triggers for each section
  useEffect(() => {
    const triggers = scrollSections.map((section, index) => {
      const sectionEl = document.getElementById(`section-${index}`);
      if (!sectionEl) return null;

      return ScrollTrigger.create({
        trigger: sectionEl,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          setCurrentSection(index);
          onSectionChange?.(index, section);
        },
        onEnterBack: () => {
          setCurrentSection(index);
          onSectionChange?.(index, section);
        }
      });
    });

    return () => {
      triggers.forEach((t) => t && t.kill());
    };
  }, [onSectionChange]);

  const handleSelectChapter = (sectionIndex) => {
    const targetEl = document.getElementById(`section-${sectionIndex}`);
    if (targetEl && lenisRef.current) {
      lenisRef.current.scrollTo(targetEl, { offset: 0, duration: 1.5 });
    } else if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div ref={containerRef} className="scroll-timeline-container">
      {/* Vertical Reading Progress Bar */}
      <ScrollProgress current={currentSection} total={scrollSections.length} />

      {/* Chapter Quick Jump Navigation */}
      <ChapterNav
        chapters={chapters}
        currentSection={currentSection}
        onSelectChapter={handleSelectChapter}
      />

      {/* Narrative Sections */}
      <div className="scroll-content">
        {scrollSections.map((section, index) => (
          <TimelineSection
            key={section.id}
            section={section}
            index={index}
            isActive={currentSection === index}
          />
        ))}
      </div>
    </div>
  );
}
