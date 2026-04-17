'use client';

import { useEffect, useRef } from 'react';

export default function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    const MINT = 'rgba(168, 240, 221,';
    const WHITE = 'rgba(255, 255, 255,';

    const sports = [
      'SKATEBOARDING', 'SURFING', 'BMX', 'MOTOCROSS',
      'SNOWBOARDING', 'SKIING', 'MOUNTAIN BIKING', 'PARKOUR',
      'CLIMBING', 'WAKEBOARDING', 'SCOOTER', 'FMX',
      'SKIMBOARDING', 'BODYBOARD', 'MYSTERY', 'MOTION > FEAR',
    ];

    // Create word objects
    const words: {
      text: string;
      x: number; y: number;
      opacity: number;
      targetOpacity: number;
      fontSize: number;
      color: string;
      state: 'fadein' | 'hold' | 'fadeout' | 'waiting';
      timer: number;
      holdTime: number;
    }[] = [];

    const randomColor = () => Math.random() > 0.3 ? MINT : WHITE;

    // Initialize words spread across screen
    for (let i = 0; i < 12; i++) {
      words.push({
        text: sports[Math.floor(Math.random() * sports.length)],
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: 0,
        targetOpacity: 0,
        fontSize: Math.random() * 8 + 9, // 9-17px
        color: randomColor(),
        state: 'waiting',
        timer: Math.random() * 200, // stagger starts
        holdTime: Math.random() * 180 + 120, // how long it stays visible
      });
    }

    let animId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      words.forEach(w => {
        if (w.state === 'waiting') {
          w.timer--;
          if (w.timer <= 0) {
            // Pick new random position and sport
            w.text = sports[Math.floor(Math.random() * sports.length)];
            w.x = Math.random() * (canvas.width - 200) + 50;
            w.y = Math.random() * (canvas.height - 100) + 50;
            w.fontSize = Math.random() * 8 + 9;
            w.color = randomColor();
            w.holdTime = Math.random() * 200 + 100;
            w.state = 'fadein';
          }
          return;
        }

        if (w.state === 'fadein') {
          w.opacity += 0.008;
          if (w.opacity >= 0.18) {
            w.opacity = 0.18;
            w.state = 'hold';
            w.timer = w.holdTime;
          }
        }

        if (w.state === 'hold') {
          w.timer--;
          if (w.timer <= 0) w.state = 'fadeout';
        }

        if (w.state === 'fadeout') {
          w.opacity -= 0.006;
          if (w.opacity <= 0) {
            w.opacity = 0;
            w.state = 'waiting';
            w.timer = Math.random() * 150 + 50;
          }
        }

        // Draw word
        if (w.opacity > 0) {
          ctx.font = `600 ${w.fontSize}px Arial`;
          ctx.letterSpacing = '2px';
          ctx.fillStyle = `${w.color} ${w.opacity})`;
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
      ref={canvasRef}
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
