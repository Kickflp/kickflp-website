'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas to full window size
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const MINT = 'rgba(168, 240, 221,';

    // ── PARTICLES (slow drifting dots) ──────────────────────
    const particles: {
      x: number; y: number;
      vx: number; vy: number;
      size: number; opacity: number;
      opacityDir: number;
    }[] = [];

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.3,  // very slow drift
        vy: (Math.random() - 0.5) * 0.3,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.3 + 0.08,
        opacityDir: Math.random() > 0.5 ? 0.001 : -0.001,
      });
    }

    // ── STREAKS (speed lines that shoot across) ──────────────
    const streaks: {
      x: number; y: number;
      speed: number; length: number;
      opacity: number; active: boolean;
      timer: number;
    }[] = [];

    for (let i = 0; i < 12; i++) {
      streaks.push({
        x: -200,
        y: Math.random() * window.innerHeight,
        speed: Math.random() * 6 + 4,
        length: Math.random() * 120 + 60,
        opacity: 0,
        active: false,
        timer: Math.random() * 200, // stagger start times
      });
    }

    // ── CONNECTIONS (lines between nearby particles) ─────────
    const drawConnections = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            const alpha = (1 - dist / 100) * 0.06;
            ctx.beginPath();
            ctx.strokeStyle = `${MINT} ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    // ── ANIMATION LOOP ───────────────────────────────────────
    let frame = 0;
    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      // Draw particles
      particles.forEach(p => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // Pulse opacity
        p.opacity += p.opacityDir;
        if (p.opacity > 0.35 || p.opacity < 0.05) p.opacityDir *= -1;

        // Draw dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${MINT} ${p.opacity})`;
        ctx.fill();
      });

      // Draw connections
      drawConnections();

      // Draw streaks
      streaks.forEach(s => {
        if (!s.active) {
          s.timer--;
          if (s.timer <= 0) {
            // Activate streak from random left position
            s.active = true;
            s.x = -s.length;
            s.y = Math.random() * canvas.height;
            s.speed = Math.random() * 8 + 4;
            s.length = Math.random() * 150 + 80;
            s.opacity = Math.random() * 0.25 + 0.1;
          }
          return;
        }

        // Move streak
        s.x += s.speed;

        // Draw streak as gradient line
        const grad = ctx.createLinearGradient(s.x, s.y, s.x + s.length, s.y);
        grad.addColorStop(0, `${MINT} 0)`);
        grad.addColorStop(0.4, `${MINT} ${s.opacity})`);
        grad.addColorStop(1, `${MINT} 0)`);

        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = Math.random() > 0.7 ? 1.5 : 0.8;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.length, s.y);
        ctx.stroke();

        // Deactivate when off screen, reset timer
        if (s.x > canvas.width + s.length) {
          s.active = false;
          s.timer = Math.random() * 180 + 60; // wait before next streak
        }
      });

      animId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
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
        zIndex: 0,           // behind everything
        pointerEvents: 'none', // doesn't block clicks
      }}
    />
  );
}
