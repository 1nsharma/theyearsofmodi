import { useEffect, useRef } from 'react';

interface VelocityParticlesProps {
  velocity: number;
  mode: 'story' | 'explore';
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  life: number;
  maxLife: number;
  stretch: number;
}

const COLORS = ['#FF9933', '#FFFFFF', '#138808', '#FF993366', '#13880866'];

export default function VelocityParticles({ velocity, mode }: VelocityParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const velocityRef = useRef(velocity);

  velocityRef.current = velocity;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Initialize particles
    const initParticles = () => {
      const particles: Particle[] = [];
      const count = mode === 'story' ? 60 : 40;
      
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3 - 0.1,
          size: Math.random() * 2 + 0.5,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          life: Math.random() * 100,
          maxLife: 100 + Math.random() * 100,
          stretch: 0,
        });
      }
      particlesRef.current = particles;
    };

    initParticles();

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const vel = velocityRef.current;
      
      particlesRef.current.forEach((p, i) => {
        // Update position with velocity influence
        p.x += p.vx + (vel * (Math.random() - 0.5) * 2);
        p.y += p.vy - vel * 0.5;
        p.stretch = vel * 8;
        p.life++;

        // Wrap around
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Reset life
        if (p.life > p.maxLife) {
          p.life = 0;
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + 10;
        }

        // Draw particle with velocity-based stretch
        const alpha = Math.sin((p.life / p.maxLife) * Math.PI) * (0.3 + vel * 0.5);
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        
        if (vel > 0.1) {
          // Stretched particle (light trail effect)
          ctx.beginPath();
          ctx.ellipse(p.x, p.y, p.size * 0.5, p.size + p.stretch, 0, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Normal round particle
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
        
        ctx.restore();

        // Occasionally spawn new particles on high velocity
        if (vel > 0.5 && Math.random() < 0.02) {
          particlesRef.current[i] = {
            ...p,
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 3 + 1,
            life: 0,
          };
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [mode]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-10 pointer-events-none"
      aria-hidden="true"
    />
  );
}
