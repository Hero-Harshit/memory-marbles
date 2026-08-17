import React, { useEffect, useRef } from 'react';

export default function PixieDust() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    let animationFrameId;
    let mouse = { x: -100, y: -100 };
    
    const colors = ['#fde047', '#fef08a', '#ffffff', '#fbc02d', '#93c5fd'];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      
      // Add a new particle on move
      for(let i=0; i<3; i++) {
        particles.push({
          x: mouse.x + (Math.random() * 10 - 5),
          y: mouse.y + (Math.random() * 10 - 5),
          size: Math.random() * 3 + 1.5,
          speedX: Math.random() * 2 - 1,
          speedY: Math.random() * -2 - 0.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 1
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Gravity effect
        p.speedY += 0.05;
        
        p.life -= 0.02;
        p.size *= 0.96;
        
        ctx.beginPath();
        // Draw a diamond/star shape instead of pure circle for magic feel
        ctx.arc(p.x, p.y, Math.max(p.size, 0.1), 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color;
        ctx.globalAlpha = Math.max(p.life, 0);
        ctx.fill();
        ctx.shadowBlur = 0;
        
        if (p.life <= 0 || p.size <= 0.1) {
          particles.splice(i, 1);
          i--;
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };
    
    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
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
