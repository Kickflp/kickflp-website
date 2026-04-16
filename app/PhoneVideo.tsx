'use client';

import { useEffect, useRef } from 'react';

export default function PhoneVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      video.play().catch((e) => console.log('Autoplay error:', e));
    }
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      loop
      playsInline
      preload="auto"
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
      }}
    >
      <source src="/background.mp4" type="video/mp4" />
    </video>
  );
}
