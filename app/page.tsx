'use client';

import { useState } from 'react';
import Image from 'next/image';
import PhoneVideo from './PhoneVideo';

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
      padding: '15px 24px',             // PAGE: reduced top/bottom padding by 25px (was 40px)
      fontFamily: 'Arial, sans-serif',
      boxSizing: 'border-box',
    }}>

      {/*
        ─────────────────────────────────────────
        LOGO
        • width: 200px, height: 80px (fixed — do not change)
        • marginBottom: space between logo and tagline
        ─────────────────────────────────────────
      */}
      <Image src="/kf_logo.png" alt="KICKFLP"
        width={200}                      // LOGO: fixed width — do not change
        height={80}                      // LOGO: fixed height — do not change
        style={{
          objectFit: 'contain',
          marginBottom: '12px',          // LOGO: space below logo → above tagline
        }} priority />

      {/*
        ─────────────────────────────────────────
        TAGLINE — sits between logo and phone
        • fontSize: text size
        • marginBottom: space below → above phone
        ─────────────────────────────────────────
      */}
      <p style={{
        color: '#A8F0DD',                // TAGLINE: mint green color
        fontSize: '11px',               // TAGLINE: font size
        fontWeight: '600',
        letterSpacing: '2px',           // TAGLINE: letter spacing
        textTransform: 'uppercase',
        margin: '0 0 16px 0',           // TAGLINE: space below → above phone
        textAlign: 'center',
      }}>
        Where Athletes Get Discovered
      </p>

      {/*
        ─────────────────────────────────────────
        PHONE MOCKUP
        • width: phone width in px
        • height: phone height in px
        • marginBottom: space below phone → above Join text
        ─────────────────────────────────────────
      */}
      <div style={{
        position: 'relative',
        width: '288px',                  // PHONE: width
        height: '576px',                 // PHONE: height
        marginBottom: '24px',            // PHONE: space below → above Join text
      }}>

        {/* VIDEO SCREEN — z-index 1 */}
        <div style={{
          position: 'absolute',
          inset: '4px',
          borderRadius: '30px',
          overflow: 'hidden',
          zIndex: 1,
        }}>
          <PhoneVideo />
        </div>

        {/* STATUS BAR — top of screen */}
        <div style={{
          position: 'absolute',
          top: '8px',
          left: '16px',
          right: '16px',
          zIndex: 3,
          pointerEvents: 'none',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{ color: '#ffffff', fontSize: '10px', fontWeight: '700',
            textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>10:49</span>
          <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <span style={{ color: '#ffffff', fontSize: '8px' }}>▲▲▲</span>
            <span style={{ color: '#ffffff', fontSize: '8px' }}>WiFi</span>
            <span style={{ color: '#ffffff', fontSize: '8px',
              backgroundColor: '#ffffff', color: '#000000',
              borderRadius: '2px', padding: '0 3px' }}>79</span>
          </div>
        </div>

        {/* RIGHT SIDE ICONS — volume, share, bookmark (matching app screenshot) */}
        <div style={{
          position: 'absolute',
          bottom: '90px',
          right: '10px',
          zIndex: 3,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          alignItems: 'center',
        }}>
          {/* Volume — top right icon */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.9))' }}>🔈</span>
          </div>
          {/* Share arrow */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '18px', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.9))' }}>↪️</span>
          </div>
          {/* Bookmark — outline style like app */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <span style={{ fontSize: '18px', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.9))' }}>🔖</span>
          </div>
        </div>

        {/* AVATAR + USERNAME + SUBTITLE — bottom left matching app */}
        <div style={{
          position: 'absolute',
          bottom: '88px',
          left: '12px',
          right: '50px',
          zIndex: 3,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '3px',
        }}>
          {/* Avatar row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            {/* Astro avatar circle */}
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '50%',
              backgroundColor: '#A8F0DD',
              border: '1.5px solid #ffffff',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
            }}>🪐</div>
            {/* Username */}
            <span style={{ color: '#ffffff', fontSize: '11px', fontWeight: '700',
              textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>KICKFLP</span>
          </div>
          {/* Subtitle text */}
          <span style={{ color: '#ffffff', fontSize: '9px', fontWeight: '400',
            textShadow: '0 1px 3px rgba(0,0,0,0.9)', lineHeight: '1.3' }}>
            S.A.D. @s.a.d.skateallday • IG: @presscott.s
          </span>
        </div>

        {/* PROGRESS BAR + TIMESTAMP — matching app */}
        <div style={{
          position: 'absolute',
          bottom: '68px',
          left: '12px',
          right: '12px',
          zIndex: 3,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          {/* Progress track */}
          <div style={{
            flex: 1,
            height: '2px',
            backgroundColor: 'rgba(255,255,255,0.3)',
            borderRadius: '2px',
          }}>
            <div style={{
              width: '25%',              // PROGRESS BAR: % watched (fake)
              height: '100%',
              backgroundColor: '#ffffff',
              borderRadius: '2px',
            }} />
          </div>
          {/* Timestamp */}
          <span style={{ color: '#ffffff', fontSize: '9px',
            textShadow: '0 1px 3px rgba(0,0,0,0.9)', whiteSpace: 'nowrap' }}>0:06</span>
        </div>

        {/* BOTTOM NAV BAR — S.K.A.T.E. | Videos | Profile matching app */}
        <div style={{
          position: 'absolute',
          bottom: '0px',
          left: '0px',
          right: '0px',
          height: '58px',
          backgroundColor: 'rgba(0,0,0,0.9)',
          borderBottomLeftRadius: '30px',
          borderBottomRightRadius: '30px',
          zIndex: 3,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: '8px',
        }}>
          {/* S.K.A.T.E tab */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <span style={{ fontSize: '14px' }}>✏️</span>
            <span style={{ color: '#ffffff', fontSize: '7px', opacity: 0.6 }}>S.K.A.T.E.</span>
          </div>
          {/* Videos tab — active */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <span style={{ fontSize: '14px' }}>▶️</span>
            <span style={{ color: '#A8F0DD', fontSize: '7px', fontWeight: '700' }}>Videos</span>
          </div>
          {/* Profile tab */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <span style={{ fontSize: '14px' }}>👤</span>
            <span style={{ color: '#ffffff', fontSize: '7px', opacity: 0.6 }}>Profile</span>
          </div>
        </div>

        {/* PHONE SHELL — z-index 4 */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '36px',
          border: '8px solid #222222',
          boxShadow: '0 0 0 2px #444444, 0 30px 60px rgba(168,240,221,0.15)',
          zIndex: 4,
          pointerEvents: 'none',
        }} />

        {/* NOTCH — z-index 5 */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '72px',
          height: '20px',
          backgroundColor: '#000000',
          borderRadius: '10px',
          zIndex: 5,
          pointerEvents: 'none',
        }} />

        {/* HOME INDICATOR — z-index 5 */}
        <div style={{
          position: 'absolute',
          bottom: '8px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '72px',
          height: '4px',
          backgroundColor: '#ffffff',
          borderRadius: '2px',
          zIndex: 5,
          pointerEvents: 'none',
          opacity: 0.4,
        }} />
      </div>

      {/*
        ─────────────────────────────────────────
        JOIN THE WAITLIST TEXT
        • fontSize: text size
        • margin bottom: space below → above form
        ─────────────────────────────────────────
      */}
      <p style={{
        color: '#ffffff',
        fontSize: '22px',              // JOIN TEXT: font size
        fontWeight: '700',
        margin: '0 0 24px 0',          // JOIN TEXT: space below → above form
        textAlign: 'center',
      }}>
        Join the waitlist 🤙
      </p>

      {/*
        ─────────────────────────────────────────
        FORM
        • maxWidth: form width
        • gap: space between fields
        ─────────────────────────────────────────
      */}
      <div style={{
        width: '100%',
        maxWidth: '400px',             // FORM: max width
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',                   // FORM: space between elements
      }}>
        <input type="text" placeholder="Your name" value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ backgroundColor: '#1a1a1a', border: '1px solid #333333',
            borderRadius: '12px', padding: '16px', color: '#ffffff',
            fontSize: '16px', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
        <input type="email" placeholder="Your email" value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ backgroundColor: '#1a1a1a', border: '1px solid #333333',
            borderRadius: '12px', padding: '16px', color: '#ffffff',
            fontSize: '16px', outline: 'none', width: '100%', boxSizing: 'border-box' }} />
        {error && (
          <p style={{ color: '#ff4444', fontSize: '14px', textAlign: 'center', margin: 0 }}>
            {error}
          </p>
        )}
        {success && (
          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #A8F0DD',
            borderRadius: '12px', padding: '16px', textAlign: 'center' }}>
            <p style={{ color: '#A8F0DD', fontSize: '16px', fontWeight: '600', margin: 0 }}>
              You&apos;re on the list! Check your email 🤙
            </p>
          </div>
        )}
        <button onClick={handleSubmit} disabled={isLoading}
          style={{ backgroundColor: '#A8F0DD', color: '#000000', border: 'none',
            borderRadius: '12px', padding: '16px', fontSize: '18px', fontWeight: '700',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1, width: '100%' }}>
          {isLoading ? 'Sending...' : 'Send It 🤙'}
        </button>
      </div>

      {/*
        ─────────────────────────────────────────
        ASTRO ICON
        • width/height: icon size
        • marginTop: space above → below button
        • marginBottom: space below → above copyright (31px = 16 original + 15 extra)
        ─────────────────────────────────────────
      */}
      <Image src="/astro.png" alt="KICKFLP Astronaut"
        width={70}                       // ASTRO: display width
        height={70}                      // ASTRO: display height
        style={{
          objectFit: 'contain',
          marginTop: '40px',             // ASTRO: space above
          marginBottom: '31px',          // ASTRO: space below → copyright (16+15=31)
        }} />

      {/*
        ─────────────────────────────────────────
        COPYRIGHT
        • color: text color
        • fontSize: text size
        ─────────────────────────────────────────
      */}
      <p style={{
        color: '#444444',
        fontSize: '12px',
        textAlign: 'center',
        margin: 0,
      }}>
        © 2026 KICKFLP. All Rights Reserved.
      </p>

    </main>
  );
}
