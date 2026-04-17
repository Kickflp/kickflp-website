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
      'Skateboarding', 'Surfing', 'BMX', 'Motocross',
      'Snowboarding', 'Skiing', 'Mountain Biking', 'Parkour',
      'Climbing', 'Wakeboarding', 'Scooter', 'FMX',
      'Skimboarding', 'Bodyboarding', 'Mystery', 'Motion > Fear',
    ];

    // Stars moving straight down at varying speeds — like falling through space
    const stars: { x: number; y: number; vy: number; size: number; opacity: number; trail: number; }[] = [];

    for (let i = 0; i < 120; i++) {
      stars.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vy: Math.random() * 1.2 + 0.3,   // varying speeds = depth illusion
        size: Math.random() * 1.8 + 0.2,
        opacity: Math.random() * 0.45 + 0.08,
        trail: Math.random() * 8 + 2,     // trail length for motion blur feel
      });
    }

    // Sport words
    type WordState = 'fadein' | 'hold' | 'fadeout' | 'waiting';
    const words: { text: string; x: number; y: number; opacity: number; fontSize: number; color: string; state: WordState; timer: number; holdTime: number; }[] = [];
    for (let i = 0; i < 10; i++) {
      words.push({
        text: sports[Math.floor(Math.random() * sports.length)],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0,
        fontSize: Math.random() * 7 + 9,
        color: Math.random() > 0.3 ? MINT : WHITE,
        state: 'waiting',
        timer: Math.random() * 200,
        holdTime: Math.random() * 120 + 60,
      });
    }

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars with motion trail
      stars.forEach(s => {
        s.y += s.vy;
        if (s.y > canvas.height + 10) {
          s.y = -10;
          s.x = Math.random() * canvas.width;
        }

        // Draw trail (motion blur effect)
        const grad = ctx.createLinearGradient(s.x, s.y - s.trail, s.x, s.y);
        grad.addColorStop(0, WHITE + ' 0)');
        grad.addColorStop(1, WHITE + ' ' + s.opacity + ')');
        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.size;
        ctx.moveTo(s.x, s.y - s.trail);
        ctx.lineTo(s.x, s.y);
        ctx.stroke();

        // Draw star dot at tip
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 0.8, 0, Math.PI * 2);
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
            w.fontSize = Math.random() * 7 + 9;
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