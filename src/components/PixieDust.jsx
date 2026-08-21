import React, { useEffect, useRef } from 'react';

export default function PixieDust() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    let particles = [];
    let animationFrameId = null;
    let isRunning = false;
    let lastX = -100;
    let lastY = -100;
    
    const colors = ['#fde047', '#fef08a', '#ffffff', '#fbc02d', '#93c5fd'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize, { passive: true });
    resize();

    const startAnimation = () => {
      if (!isRunning) {
        isRunning = true;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      
      const dx = x - lastX;
      const dy = y - lastY;
      if (dx * dx + dy * dy < 16) return;
      
      lastX = x;
      lastY = y;
      
      if (particles.length < 35) {
        for (let i = 0; i < 2; i++) {
          particles.push({
            x: x + (Math.random() * 8 - 4),
            y: y + (Math.random() * 8 - 4),
            size: Math.random() * 2.5 + 1.2,
            speedX: Math.random() * 1.5 - 0.75,
            speedY: Math.random() * -1.5 - 0.3,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 1
          });
        }
      }

      startAnimation();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const render = () => {
      if (particles.length === 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isRunning = false;
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.04;
        p.life -= 0.025;
        p.size *= 0.96;
        
        if (p.life <= 0 || p.size <= 0.2) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fill();
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999
      }}
    />
  );
}
