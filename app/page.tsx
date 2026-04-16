'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!name.trim() || !email.trim()) {
      setError('Please enter your name and email.');
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      if (res.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setTimeout(() => setSuccess(false), 2500);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main style={{
      backgroundColor: '#000000',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',
      fontFamily: 'Arial, sans-serif',
      boxSizing: 'border-box',
    }}>

      {/* Logo */}
      <Image src="/kf_logo.png" alt="KICKFLP" width={200} height={80}
        style={{ objectFit: 'contain', marginBottom: '32px' }} priority />

      {/* Phone mockup with video */}
      <div style={{
        position: 'relative',
        width: '240px',
        height: '480px',
        marginBottom: '32px',
      }}>
        {/* Phone outer shell */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '36px',
          border: '8px solid #333333',
          backgroundColor: '#111111',
          boxShadow: '0 0 0 2px #555555, 0 30px 60px rgba(168, 240, 221, 0.15), 0 0 40px rgba(168, 240, 221, 0.08)',
          zIndex: 2,
          pointerEvents: 'none',
        }} />

        {/* Notch */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60px',
          height: '18px',
          backgroundColor: '#111111',
          borderRadius: '10px',
          zIndex: 3,
        }} />

        {/* Video inside phone */}
        <div style={{
          position: 'absolute',
          inset: '4px',
          borderRadius: '30px',
          overflow: 'hidden',
          backgroundColor: '#000',
          zIndex: 1,
        }}>
          <video
            src="/background.mp4"
            autoPlay
            loop
            muted
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>

        {/* Home indicator */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60px',
          height: '4px',
          backgroundColor: '#555555',
          borderRadius: '2px',
          zIndex: 3,
        }} />
      </div>

      {/* Tagline */}
      <p style={{
        color: '#A8F0DD',
        fontSize: '13px',
        fontWeight: '600',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        margin: '0 0 8px 0',
        textAlign: 'center',
      }}>
        Your front row seat to the world&apos;s best action sports
      </p>

      <p style={{
        color: '#ffffff',
        fontSize: '22px',
        fontWeight: '700',
        margin: '0 0 32px 0',
        textAlign: 'center',
      }}>
        Join the waitlist 🤙
      </p>

      {/* Form */}
      <div style={{
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}>
        <input type="text" placeholder="Your name" value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            backgroundColor: '#1a1a1a', border: '1px solid #333333',
            borderRadius: '12px', padding: '16px', color: '#ffffff',
            fontSize: '16px', outline: 'none', width: '100%', boxSizing: 'border-box',
          }} />
        <input type="email" placeholder="Your email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            backgroundColor: '#1a1a1a', border: '1px solid #333333',
            borderRadius: '12px', padding: '16px', color: '#ffffff',
            fontSize: '16px', outline: 'none', width: '100%', boxSizing: 'border-box',
          }} />

        {error && (
          <p style={{ color: '#ff4444', fontSize: '14px', textAlign: 'center', margin: 0 }}>
            {error}
          </p>
        )}

        {success && (
          <div style={{
            backgroundColor: '#1a1a1a', border: '1px solid #A8F0DD',
            borderRadius: '12px', padding: '16px', textAlign: 'center',
          }}>
            <p style={{ color: '#A8F0DD', fontSize: '16px', fontWeight: '600', margin: 0 }}>
              You&apos;re on the list! Check your email 🤙
            </p>
          </div>
        )}

        <button onClick={handleSubmit} disabled={isLoading}
          style={{
            backgroundColor: '#A8F0DD', color: '#000000', border: 'none',
            borderRadius: '12px', padding: '16px', fontSize: '18px', fontWeight: '700',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1, width: '100%',
          }}>
          {isLoading ? 'Sending...' : 'Send It 🤙'}
        </button>
      </div>

      {/* Astro */}
      <Image src="/astro.png" alt="KICKFLP Astronaut" width={70} height={70}
        style={{ objectFit: 'contain', marginTop: '40px', marginBottom: '16px' }} />

      {/* Footer */}
      <p style={{ color: '#444444', fontSize: '12px', textAlign: 'center', margin: 0 }}>
        © 2026 KICKFLP. All Rights Reserved.
      </p>

    </main>
  );
}