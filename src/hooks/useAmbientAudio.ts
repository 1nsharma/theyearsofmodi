import { useEffect, useRef, useCallback, useState } from 'react';

export function useAmbientAudio() {
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const init = useCallback(() => {
    if (isInitialized) return;
    
    try {
      const ctx = new AudioContext();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.value = 0;
      masterGain.connect(ctx.destination);
      gainRef.current = masterGain;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 200;
      filter.Q.value = 1;
      filter.connect(masterGain);
      filterRef.current = filter;

      // Create a drone with multiple oscillators (Indian classical feel)
      const frequencies = [130.81, 196.00, 261.63, 329.63]; // C3, G3, C4, E4
      const types: OscillatorType[] = ['sine', 'sine', 'triangle', 'sine'];
      const gains = [0.15, 0.08, 0.04, 0.02];

      frequencies.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        osc.type = types[i];
        osc.frequency.value = freq;
        
        const oscGain = ctx.createGain();
        oscGain.gain.value = gains[i];
        
        osc.connect(oscGain);
        oscGain.connect(filter);
        osc.start();
        oscillatorsRef.current.push(osc);
      });

      setIsInitialized(true);
    } catch {
      // Audio not supported
    }
  }, [isInitialized]);

  const toggle = useCallback(() => {
    if (!isInitialized) {
      init();
      setTimeout(() => {
        if (gainRef.current && audioCtxRef.current) {
          if (audioCtxRef.current.state === 'suspended') {
            audioCtxRef.current.resume();
          }
          gainRef.current.gain.linearRampToValueAtTime(0.6, audioCtxRef.current.currentTime + 1);
          setIsPlaying(true);
        }
      }, 100);
      return;
    }

    if (!audioCtxRef.current || !gainRef.current) return;

    if (isPlaying) {
      gainRef.current.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.5);
      setIsPlaying(false);
    } else {
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }
      gainRef.current.gain.linearRampToValueAtTime(0.6, audioCtxRef.current.currentTime + 1);
      setIsPlaying(true);
    }
  }, [isPlaying, isInitialized, init]);

  const setFilterFrequency = useCallback((freq: number) => {
    if (filterRef.current && audioCtxRef.current) {
      const targetFreq = 100 + freq * 800;
      filterRef.current.frequency.linearRampToValueAtTime(
        targetFreq,
        audioCtxRef.current.currentTime + 0.1
      );
    }
  }, []);

  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach(osc => {
        try { osc.stop(); } catch {}
      });
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return { toggle, isPlaying, setFilterFrequency, isInitialized };
}
