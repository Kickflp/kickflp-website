'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current as unknown as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = (canvas as HTMLCanvasElement).getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const MINT = 'rgba(168, 240, 221,';
    const WHITE = 'rgba(255, 255, 255,';

    const sports = [
      'SKATEBOARDING', 'SURFING', 'BMX', 'MOTOCROSS',
      'SNOWBOARDING', 'SKIING', 'MOUNTAIN BIKING', 'PARKOUR',
      'CLIMBING', 'WAKEBOARDING', 'SCOOTER', 'FMX',
      'SKIMBOARDING', 'BODYBOARD', 'MYSTERY', 'MOTION > FEAR',
    ];

    // Stars — outward from center (Option C)
    const stars: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; opacityDir: number; }[] = [];

    const spawnStar = () => {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 0.4 + 0.15;
      return {
        x: canvas.width / 2 + (Math.random() - 0.5) * 40,
        y: canvas.height / 2 + (Math.random() - 0.5) * 40,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.45 + 0.05,
        opacityDir: (Math.random() > 0.5 ? 1 : -1) * 0.003,
      };
    };

    for (let i = 0; i < 80; i++) {
      const s = spawnStar();
      // Scatter initial positions so screen isnt empty at start
      s.x = Math.random() * canvas.width;
      s.y = Math.random() * canvas.height;
      stars.push(s);
    }

    // Sport words
    type WordState = 'fadein' | 'hold' | 'fadeout' | 'waiting';
    const words: { text: string; x: number; y: number; opacity: number; fontSize: number; color: string; state: WordState; timer: number; holdTime: number; }[] = [];
    for (let i = 0; i < 12; i++) {
      words.push({
        text: sports[Math.floor(Math.random() * sports.length)],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0,
        fontSize: Math.random() * 8 + 9,
        color: Math.random() > 0.3 ? MINT : WHITE,
        state: 'waiting',
        timer: Math.random() * 200,
        holdTime: Math.random() * 120 + 60,
      });
    }

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars expanding outward from center
      stars.forEach((s, i) => {
        s.opacity += s.opacityDir;
        if (s.opacity > 0.50 || s.opacity < 0.02) s.opacityDir *= -1;
        s.x += s.vx;
        s.y += s.vy;
        // When star exits screen reset to center
        if (s.x < 0 || s.x > canvas.width || s.y < 0 || s.y > canvas.height) {
          stars[i] = spawnStar();
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = WHITE + ' ' + s.opacity + ')';
        ctx.fill();
      });

      // Draw sport words
      words.forEach(w => {
        if (w.state === 'waiting') {
          w.timer--;
          if (w.timer <= 0) {
            w.text = sports[Math.floor(Math.random() * sports.length)];
            w.x = Math.random() * (canvas.width - 200) + 50;
            w.y = Math.random() * (canvas.height - 100) + 50;
            w.fontSize = Math.random() * 8 + 9;
            w.color = Math.random() > 0.3 ? MINT : WHITE;
            w.holdTime = Math.random() * 120 + 60;
            w.state = 'fadein';
          }
          return;
        }
        if (w.state === 'fadein') {
          w.opacity += 0.008;
          if (w.opacity >= 0.18) { w.opacity = 0.18; w.state = 'hold'; w.timer = w.holdTime; }
        }
        if (w.state === 'hold') {
          w.timer--;
          if (w.timer <= 0) w.state = 'fadeout';
        }
        if (w.state === 'fadeout') {
          w.opacity -= 0.006;
          if (w.opacity <= 0) { w.opacity = 0; w.state = 'waiting'; w.timer = Math.random() * 150 + 50; }
        }
        if (w.opacity > 0) {
          ctx.font = '600 ' + w.fontSize + 'px Arial';
          ctx.fillStyle = w.color + ' ' + w.opacity + ')';
          ctx.fillText(w.text, w.x, w.y);
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
      ref={canvasRef as unknown as React.RefObject<HTMLCanvasElement>}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}