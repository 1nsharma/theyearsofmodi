import { useEffect, useRef, useState } from 'react';

export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const animationFrame = useRef<number>();

  useEffect(() => {
    const update = () => {
      const now = Date.now();
      const dt = now - lastTime.current;
      if (dt > 0) {
        const scrollY = window.scrollY;
        const dy = Math.abs(scrollY - lastScrollY.current);
        const newVelocity = Math.min(dy / dt * 10, 1);
        setVelocity(prev => prev * 0.8 + newVelocity * 0.2);
        lastScrollY.current = scrollY;
        lastTime.current = now;
      }
      animationFrame.current = requestAnimationFrame(update);
    };

    animationFrame.current = requestAnimationFrame(update);
    return () => {
      if (animationFrame.current) cancelAnimationFrame(animationFrame.current);
    };
  }, []);

  return velocity;
}
