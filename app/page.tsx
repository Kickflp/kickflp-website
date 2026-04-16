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
      backgroundColor: '#000000',       // PAGE: background color
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 24px',             // PAGE: outer padding (top/bottom left/right)
      fontFamily: 'Arial, sans-serif',
      boxSizing: 'border-box',
    }}>

      {/*
        ─────────────────────────────────────────
        LOGO
        • width/height: controls logo display size
        • marginTop: moves logo UP (negative) or DOWN (positive)
        • marginBottom: space between logo and phone mockup
        ─────────────────────────────────────────
      */}
      <Image src="/kf_logo.png" alt="KICKFLP"
        width={280}                      // LOGO: display width in px
        height={100}                     // LOGO: display height in px
        style={{
          objectFit: 'contain',
          marginTop: '-40px',            // LOGO: moved 40px up from center
          marginBottom: '28px',          // LOGO: space below logo → above phone
        }} priority />

      {/*
        ─────────────────────────────────────────
        PHONE MOCKUP
        • width: phone width in px (currently 288 = 240 * 1.2 for +20%)
        • height: phone height in px (currently 576 = 480 * 1.2 for +20%)
        • marginBottom: space below phone → above tagline
        ─────────────────────────────────────────
      */}
      <div style={{
        position: 'relative',
        width: '288px',                  // PHONE: width (240 original → 288 = +20%)
        height: '576px',                 // PHONE: height (480 original → 576 = +20%)
        marginBottom: '28px',            // PHONE: space below phone → above tagline
      }}>

        {/* VIDEO SCREEN — z-index 1, sits behind phone frame overlay */}
        <div style={{
          position: 'absolute',
          inset: '4px',                  // VIDEO SCREEN: inset from phone edges
          borderRadius: '30px',          // VIDEO SCREEN: corner radius
          overflow: 'hidden',
          zIndex: 1,
        }}>
          <PhoneVideo />
        </div>

        {/*
          APP UI OVERLAY — fake KICKFLP app interface elements
          drawn on top of video at z-index 3
          gives the impression the app is running inside the phone
        */}

        {/* Avatar + username + sport tag — bottom left like real feed */}
        <div style={{
          position: 'absolute',
          bottom: '60px',                // APP UI: distance from bottom of screen
          left: '20px',                  // APP UI: distance from left edge
          zIndex: 3,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
        }}>
          {/* Avatar circle */}
          <div style={{
            width: '36px',               // APP UI AVATAR: size of avatar circle
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#A8F0DD',
            border: '2px solid #ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ fontSize: '14px' }}>🤙</span>
          </div>
          {/* Username */}
          <span style={{
            color: '#ffffff',
            fontSize: '11px',            // APP UI USERNAME: font size
            fontWeight: '700',
            textShadow: '0 1px 3px rgba(0,0,0,0.8)',
          }}>@kickflp</span>
          {/* Sport tag pill */}
          <span style={{
            backgroundColor: 'rgba(168,240,221,0.25)',
            border: '1px solid #A8F0DD',
            borderRadius: '20px',
            padding: '2px 8px',
            color: '#A8F0DD',
            fontSize: '9px',             // APP UI SPORT TAG: font size
            fontWeight: '600',
          }}>SKATEBOARDING</span>
        </div>

        {/* Right side action buttons — bookmark, share like real app */}
        <div style={{
          position: 'absolute',
          bottom: '60px',                // APP UI BUTTONS: distance from bottom
          right: '14px',                 // APP UI BUTTONS: distance from right edge
          zIndex: 3,
          pointerEvents: 'none',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',                   // APP UI BUTTONS: space between icons
          alignItems: 'center',
        }}>
          {/* Bookmark icon */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <span style={{ fontSize: '20px', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))' }}>🔖</span>
            <span style={{ color: '#ffffff', fontSize: '9px', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>247</span>
          </div>
          {/* Share icon */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <span style={{ fontSize: '20px', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))' }}>↗️</span>
          </div>
          {/* Volume icon */}
          <div>
            <span style={{ fontSize: '20px', filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.8))' }}>🔊</span>
          </div>
        </div>

        {/* Progress bar — thin scrubber at bottom like real feed */}
        <div style={{
          position: 'absolute',
          bottom: '44px',                // APP UI PROGRESS BAR: distance from bottom
          left: '16px',
          right: '60px',                 // APP UI PROGRESS BAR: right margin (avoids buttons)
          height: '2px',                 // APP UI PROGRESS BAR: thickness
          backgroundColor: 'rgba(255,255,255,0.3)',
          borderRadius: '2px',
          zIndex: 3,
          pointerEvents: 'none',
        }}>
          <div style={{
            width: '45%',                // APP UI PROGRESS BAR: % of video watched (fake)
            height: '100%',
            backgroundColor: '#A8F0DD', // APP UI PROGRESS BAR: fill color (mint)
            borderRadius: '2px',
          }} />
        </div>

        {/* Scrolling ticker text — video title like real feed */}
        <div style={{
          position: 'absolute',
          bottom: '26px',                // APP UI TICKER: distance from bottom
          left: '16px',
          right: '60px',
          zIndex: 3,
          pointerEvents: 'none',
          overflow: 'hidden',
        }}>
          <span style={{
            color: '#ffffff',
            fontSize: '10px',            // APP UI TICKER: font size
            fontWeight: '500',
            textShadow: '0 1px 3px rgba(0,0,0,0.8)',
            whiteSpace: 'nowrap',
          }}>🛹 Backside 360 • Downtown LA • #skate #kickflp</span>
        </div>

        {/* Bottom nav bar — 3 tabs like real app */}
        <div style={{
          position: 'absolute',
          bottom: '0px',
          left: '0px',
          right: '0px',
          height: '42px',               // APP UI NAV BAR: height
          backgroundColor: 'rgba(0,0,0,0.85)',
          borderBottomLeftRadius: '30px',
          borderBottomRightRadius: '30px',
          zIndex: 3,
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: '4px',
        }}>
          <span style={{ fontSize: '16px' }}>🛹</span>
          <span style={{ fontSize: '16px', opacity: 0.5 }}>▶️</span>
          <span style={{ fontSize: '16px', opacity: 0.5 }}>👤</span>
        </div>

        {/* PHONE SHELL — z-index 4, drawn on top of everything as frame */}
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '36px',          // PHONE SHELL: corner radius
          border: '8px solid #222222',   // PHONE SHELL: border thickness + color
          boxShadow: '0 0 0 2px #444444, 0 30px 60px rgba(168,240,221,0.15)',
          zIndex: 4,
          pointerEvents: 'none',
        }} />

        {/* NOTCH — z-index 5, sits on top of phone shell */}
        <div style={{
          position: 'absolute',
          top: '10px',                   // NOTCH: distance from top
          left: '50%',
          transform: 'translateX(-50%)',
          width: '72px',                 // NOTCH: width (scaled +20% from 60)
          height: '20px',               // NOTCH: height
          backgroundColor: '#000000',
          borderRadius: '10px',
          zIndex: 5,
          pointerEvents: 'none',
        }} />

        {/* HOME INDICATOR — z-index 5 */}
        <div style={{
          position: 'absolute',
          bottom: '8px',                 // HOME INDICATOR: distance from bottom
          left: '50%',
          transform: 'translateX(-50%)',
          width: '72px',                 // HOME INDICATOR: width
          height: '4px',                 // HOME INDICATOR: height
          backgroundColor: '#ffffff',
          borderRadius: '2px',
          zIndex: 5,
          pointerEvents: 'none',
          opacity: 0.4,
        }} />
      </div>

      {/*
        ─────────────────────────────────────────
        TAGLINE (top line — small caps mint text)
        • fontSize: text size
        • letterSpacing: spacing between letters
        • margin bottom: space between tagline and "Join the waitlist"
        ─────────────────────────────────────────
      */}
      <p style={{
        color: '#A8F0DD',                // TAGLINE: text color (mint green)
        fontSize: '13px',               // TAGLINE: font size
        fontWeight: '600',
        letterSpacing: '2px',           // TAGLINE: letter spacing
        textTransform: 'uppercase',
        margin: '0 0 8px 0',            // TAGLINE: space below → above "Join" text
        textAlign: 'center',
      }}>
        Where Athletes Get Discovered.
      </p>

      {/*
        ─────────────────────────────────────────
        JOIN THE WAITLIST TEXT
        • fontSize: text size
        • margin bottom: space below → above form fields
        ─────────────────────────────────────────
      */}
      <p style={{
        color: '#ffffff',               // JOIN TEXT: color
        fontSize: '22px',              // JOIN TEXT: font size
        fontWeight: '700',
        margin: '0 0 32px 0',          // JOIN TEXT: space below → above form
        textAlign: 'center',
      }}>
        Join the waitlist 🤙
      </p>

      {/*
        ─────────────────────────────────────────
        FORM — name input, email input, button
        • maxWidth: controls form width
        • gap: space between form elements
        ─────────────────────────────────────────
      */}
      <div style={{
        width: '100%',
        maxWidth: '400px',             // FORM: max width
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',                   // FORM: space between inputs and button
      }}>
        {/* NAME INPUT — backgroundColor, borderRadius, fontSize to adjust */}
        <input type="text" placeholder="Your name" value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ backgroundColor: '#1a1a1a', border: '1px solid #333333',
            borderRadius: '12px', padding: '16px', color: '#ffffff',
            fontSize: '16px', outline: 'none', width: '100%', boxSizing: 'border-box' }} />

        {/* EMAIL INPUT — same as name input */}
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

        {/* SEND IT BUTTON — backgroundColor is mint green, color is button text color */}
        <button onClick={handleSubmit} disabled={isLoading}
          style={{ backgroundColor: '#A8F0DD', color: '#000000', border: 'none',
            borderRadius: '12px',        // BUTTON: corner radius
            padding: '16px',             // BUTTON: inner padding (controls height)
            fontSize: '18px',            // BUTTON: text size
            fontWeight: '700',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            opacity: isLoading ? 0.7 : 1, width: '100%' }}>
          {isLoading ? 'Sending...' : 'Send It 🤙'}
        </button>
      </div>

      {/*
        ─────────────────────────────────────────
        ASTRO ICON
        • width/height: icon size
        • marginTop: space above astro → below button
        • marginBottom: space below astro → above copyright
        ─────────────────────────────────────────
      */}
      <Image src="/astro.png" alt="KICKFLP Astronaut"
        width={70}                       // ASTRO: display width
        height={70}                      // ASTRO: display height
        style={{
          objectFit: 'contain',
          marginTop: '40px',             // ASTRO: space above → below Send It button
          marginBottom: '15px',          // ASTRO: space below → above copyright (15px as requested)
        }} />

      {/*
        ─────────────────────────────────────────
        COPYRIGHT
        • color: text color
        • fontSize: text size
        ─────────────────────────────────────────
      */}
      <p style={{
        color: '#444444',               // COPYRIGHT: text color
        fontSize: '12px',              // COPYRIGHT: text size
        textAlign: 'center',
        margin: 0,
      }}>
        © 2026 KICKFLP. All Rights Reserved.
      </p>

    </main>
  );
}
