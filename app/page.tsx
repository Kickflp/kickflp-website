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
      padding: '15px 24px',             // PAGE: top/bottom padding
      fontFamily: 'Arial, sans-serif',
      boxSizing: 'border-box',
    }}>

      {/* LOGO — width:200 height:80 FIXED. marginBottom = space to tagline */}
      <Image src="/kf_logo.png" alt="KICKFLP"
        width={200} height={80}
        style={{ objectFit: 'contain', marginBottom: '0px', marginTop: '-10px' }} priority />

      {/* TAGLINE — fontSize, letterSpacing, margin '0 0 Xpx 0' = space to phone */}
      <p style={{
        color: '#A8F0DD',
        fontSize: '11px',
        fontWeight: '600',
        letterSpacing: '2px',
        textTransform: 'uppercase',
        margin: '0 0 31px 0',
        textAlign: 'center',
      }}>
        Where Athletes Get Discovered
      </p>

      {/* PHONE — width/height = phone size. marginBottom = space to Join text */}
      <div style={{
        position: 'relative',
        width: '317px',                  // PHONE WIDTH
        height: '634px',                 // PHONE HEIGHT
        marginBottom: '24px',            // PHONE BOTTOM MARGIN
      }}>

        {/* VIDEO — z-index 1 */}
        <div style={{
          position: 'absolute',
          inset: '4px',
          borderRadius: '30px',
          overflow: 'hidden',
          zIndex: 1,
        }}>
          <PhoneVideo />
        </div>

        {/* STATUS BAR — time left of notch, icons right of notch */}
        {/* Time — far left, vertically centered with notch */}
        <div style={{
          position: 'absolute',
          top: '13px',                   // STATUS BAR TOP — 5px lower to align with notch center
          left: '14px',                  // TIME LEFT — distance from left edge
          zIndex: 3, pointerEvents: 'none',
        }}>
          <span style={{ color: '#ffffff', fontSize: '10px', fontWeight: '700',
            textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>10:49</span>
        </div>
        {/* Signal/Wifi/Battery — far right, vertically centered with notch */}
        <div style={{
          position: 'absolute',
          top: '13px',                   // STATUS BAR TOP — 5px lower to align with notch center
          right: '14px',                 // ICONS RIGHT — distance from right edge
          zIndex: 3, pointerEvents: 'none',
          display: 'flex', gap: '3px', alignItems: 'center',
        }}>
          <svg width="12" height="10" viewBox="0 0 12 10" fill="white">
            <rect x="0" y="6" width="2" height="4" rx="0.5"/>
            <rect x="3" y="4" width="2" height="6" rx="0.5"/>
            <rect x="6" y="2" width="2" height="8" rx="0.5"/>
            <rect x="9" y="0" width="2" height="10" rx="0.5"/>
          </svg>
          <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
            <path d="M6 7.5a1 1 0 100-2 1 1 0 000 2z" fill="white"/>
            <path d="M3.5 5.5a3.5 3.5 0 015 0" stroke="white" strokeWidth="1" fill="none"/>
            <path d="M1 3.5a7 7 0 0110 0" stroke="white" strokeWidth="1" fill="none"/>
          </svg>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1px' }}>
            <div style={{ width: '18px', height: '9px', border: '1px solid white',
              borderRadius: '2px', padding: '1px', display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '75%', height: '100%', backgroundColor: 'white', borderRadius: '1px' }}/>
            </div>
            <div style={{ width: '2px', height: '5px', backgroundColor: 'white', borderRadius: '1px' }}/>
          </div>
        </div>

        {/* RIGHT ICONS — bottom/right = position. gap = space between icons */}
        <div style={{
          position: 'absolute',
          bottom: '170px',               // RIGHT ICONS BOTTOM
          right: '10px',                 // RIGHT ICONS RIGHT
          zIndex: 3, pointerEvents: 'none',
          display: 'flex', flexDirection: 'column',
          gap: '20px',                   // RIGHT ICONS GAP
          alignItems: 'center',
        }}>
          {/* Volume icon */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.9))' }}>
            <path d="M11 5L6 9H2v6h4l5 4V5z" fill="white"/>
            <path d="M15.54 8.46a5 5 0 010 7.07" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M19.07 4.93a10 10 0 010 14.14" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
          </svg>
          {/* Share icon — real app share.svg path */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.9))' }}>
            <path d="M22.2806 11.0306L14.7806 18.5306C14.6757 18.6356 14.542 18.7072 14.3965 18.7362C14.2509 18.7651 14.1 18.7503 13.9629 18.6935C13.8258 18.6367 13.7086 18.5404 13.6262 18.417C13.5438 18.2936 13.4999 18.1484 13.5 18V14.2716C8.14688 14.5753 4.47657 18.0469 3.44625 19.1466C3.28447 19.3193 3.07231 19.4367 2.83997 19.4819C2.60764 19.5271 2.36695 19.4979 2.15218 19.3984C1.93741 19.2989 1.75949 19.1342 1.64375 18.9278C1.528 18.7213 1.48032 18.4836 1.5075 18.2484C1.85532 15.2241 3.51188 12.315 6.1725 10.0575C8.38219 8.18251 11.0681 6.99282 13.5 6.7847V3.00001C13.4999 2.85159 13.5438 2.70647 13.6262 2.58302C13.7086 2.45958 13.8258 2.36336 13.9629 2.30654C14.1 2.24973 14.2509 2.23488 14.3965 2.26386C14.542 2.29285 14.6757 2.36438 14.7806 2.46939L22.2806 9.96939C22.3504 10.039 22.4057 10.1218 22.4434 10.2128C22.4812 10.3039 22.5006 10.4014 22.5006 10.5C22.5006 10.5986 22.4812 10.6962 22.4434 10.7872C22.4057 10.8783 22.3504 10.961 22.2806 11.0306Z" fill="white"/>
          </svg>
          {/* Bookmark icon — outline style matching app */}
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
            style={{ filter: 'drop-shadow(0 1px 3px rgba(0,0,0,0.9))' }}>
            <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2v16z"
              stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        {/* AVATAR + USERNAME + SUBTITLE — bottom/left = position */}
        <div style={{
          position: 'absolute',
          bottom: '88px',                // AVATAR BOTTOM
          left: '12px',                  // AVATAR LEFT
          right: '50px',
          zIndex: 3, pointerEvents: 'none',
          display: 'flex', flexDirection: 'column', gap: '3px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px' }}>
            {/* Astro avatar */}
            <div style={{
              width: '30px',             // AVATAR SIZE
              height: '30px',
              borderRadius: '50%',
              border: 'none',
              overflow: 'hidden',
              backgroundColor: '#000',
            }}>
              <img src="/astro.png" alt="avatar"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <span style={{ color: '#ffffff', fontSize: '11px', fontWeight: '700',
              textShadow: '0 1px 3px rgba(0,0,0,0.9)' }}>KICKFLP</span>
          </div>
          <span style={{ color: '#ffffff', fontSize: '10px',
            textShadow: '0 1px 3px rgba(0,0,0,0.9)', lineHeight: '1.3' }}>
            S.A.D. @s.a.d.skateallday - IG: @cheezeburglar
          </span>
        </div>

        {/* PROGRESS BAR — bottom = position, width% on inner div = progress */}
        <div style={{
          position: 'absolute',
          bottom: '68px',                // PROGRESS BAR BOTTOM
          left: '12px', right: '12px',
          zIndex: 3, pointerEvents: 'none',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          <div style={{ flex: 1, height: '2px',
            backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: '2px' }}>
            <div style={{ width: '25%', height: '100%',
              backgroundColor: '#ffffff', borderRadius: '2px' }} />
          </div>
          <span style={{ color: '#ffffff', fontSize: '9px',
            textShadow: '0 1px 3px rgba(0,0,0,0.9)', whiteSpace: 'nowrap' }}>0:06</span>
        </div>

        {/* NAV BAR — height = bar height, paddingBottom = push icons up */}
        <div style={{
          position: 'absolute',
          bottom: '0px', left: '0px', right: '0px',
          height: '58px',                // NAV BAR HEIGHT
          backgroundColor: 'rgba(0,0,0,0.92)',
          borderBottomLeftRadius: '30px',
          borderBottomRightRadius: '30px',
          zIndex: 3, pointerEvents: 'none',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-around',
          paddingBottom: '8px',
        }}>
          {/* S.K.A.T.E. — real SKATE.svg icon */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none" opacity="0.5">
              <path fillRule="evenodd" clipRule="evenodd" d="M26.8857 12.9314C28.6778 11.1393 29.7833 8.68453 29.9246 5.8803C29.9485 5.40769 29.8271 4.91856 29.566 4.48562C29.2438 3.95022 28.8422 3.5214 28.4043 3.17686C28.496 3.47761 28.539 3.79819 28.5208 4.14356H28.52C28.52 4.15265 28.52 4.16091 28.5192 4.17H28.5183C28.3754 6.87756 27.3211 9.47193 25.3737 11.4194L11.3881 25.405C10.4453 26.3477 9.33238 27.098 8.10212 27.6309C6.33783 28.3957 4.8232 28.4995 4.28888 28.5361C4.20614 28.5418 4.14691 28.5458 4.1139 28.5505C4.10922 28.5504 4.10001 28.5508 4.08662 28.5515C3.97935 28.5565 3.60392 28.5744 3.14555 28.4348C3.48926 28.8727 3.9189 29.2743 4.4543 29.5965C4.8856 29.8568 5.36068 29.9807 5.89608 29.9526C8.60943 29.8097 11.0774 28.7389 12.9001 26.9162L26.8857 12.9314ZM27.5079 2.60511C27.4475 2.71417 27.4434 2.8505 27.5079 2.96783C27.6987 3.31154 27.7929 3.69656 27.7722 4.10555H27.7731L27.7706 4.13034H27.7714V4.13116C27.6376 6.66852 26.661 9.07121 24.8433 10.8897L10.8584 24.8754C9.9785 25.7553 8.94488 26.4527 7.80633 26.9459C6.12051 27.6764 4.63715 27.7681 4.19583 27.7954L4.19577 27.7954C4.13597 27.7991 4.09532 27.8016 4.07589 27.8044C3.44729 27.7927 3.16593 27.655 2.98117 27.5646C2.82667 27.4891 2.73973 27.4465 2.5738 27.5383C2.16399 26.7435 1.95991 25.9214 1.85911 25.2778C1.736 24.4928 2.01279 23.7501 2.59363 23.2998C3.25213 22.79 3.9974 22.3967 4.63938 22.1125C5.81098 21.5936 6.86773 20.8781 7.76006 19.9849L19.9544 7.7922C20.8476 6.89904 21.5631 5.84312 22.082 4.67152C22.3662 4.02954 22.7595 3.28427 23.2693 2.62577C23.7196 2.0441 24.4632 1.76731 25.2473 1.89125C25.8909 1.99122 26.713 2.1953 27.5079 2.60511ZM16.7435 30.2352C17.9778 30.2352 18.9785 29.2345 18.9785 28.0002C18.9785 26.7659 17.9778 25.7652 16.7435 25.7652C15.5092 25.7652 14.5085 26.7659 14.5085 28.0002C14.5085 29.2345 15.5092 30.2352 16.7435 30.2352ZM29.5441 15.196C30.4167 16.0687 30.4167 17.4835 29.5441 18.3562C28.6714 19.2289 27.2565 19.2289 26.3838 18.3562C25.5112 17.4835 25.5112 16.0687 26.3838 15.196C27.2565 14.3233 28.6714 14.3233 29.5441 15.196Z" fill="white"/>
            </svg>
            <span style={{ color: '#ffffff', fontSize: '7px', opacity: 0.5 }}>S.K.A.T.E.</span>
          </div>
          {/* Videos — real Feed.svg icon, mint colored = active */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <svg width="18" height="18" viewBox="0 0 32 32" fill="none">
              <path d="M7.15418 4.19428L12.1028 9.14286H3.53132C3.70623 8.09219 4.1251 7.09718 4.75429 6.23776C5.38348 5.37833 6.20545 4.67843 7.15418 4.19428ZM13.8056 3.42857H10.2856C10.0685 3.42857 9.85132 3.44 9.63418 3.45143L15.3256 9.14286H19.5199L13.8056 3.42857ZM21.7142 3.42857H17.0513L22.7656 9.14286H28.4685C28.2007 7.54523 27.3751 6.0943 26.1384 5.04802C24.9017 4.00175 23.3341 3.42793 21.7142 3.42857ZM14.2649 22.4297L19.9792 19.2869C20.1586 19.1884 20.3083 19.0435 20.4126 18.8674C20.5168 18.6913 20.5718 18.4904 20.5718 18.2857C20.5718 18.081 20.5168 17.8801 20.4126 17.704C20.3083 17.5279 20.1586 17.383 19.9792 17.2846L14.2649 14.1417C14.0909 14.046 13.895 13.9973 13.6964 14.0004C13.4979 14.0035 13.3036 14.0582 13.1326 14.1593C12.9617 14.2603 12.82 14.4042 12.7216 14.5767C12.6232 14.7491 12.5714 14.9443 12.5713 15.1429V21.4286C12.5714 21.6271 12.6232 21.8223 12.7216 21.9948C12.82 22.1672 12.9617 22.3111 13.1326 22.4121C13.3036 22.5132 13.4979 22.5679 13.6964 22.571C13.895 22.5741 14.0909 22.5254 14.2649 22.4297ZM28.5713 11.4286V21.7143C28.5699 23.5325 27.847 25.2758 26.5613 26.5614C25.2757 27.8471 23.5324 28.57 21.7142 28.5714H10.2856C8.46743 28.57 6.72413 27.8471 5.43848 26.5614C4.15283 25.2758 3.42992 23.5325 3.42847 21.7143V11.4286H28.5713Z" fill="#A8F0DD"/>
            </svg>
            <span style={{ color: '#A8F0DD', fontSize: '7px', fontWeight: '700' }}>Videos</span>
          </div>
          {/* Profile — real User.svg icon */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none" opacity="0.5">
              <path d="M14.8386 12.3643C14.9355 12.422 15.0553 12.4896 15.1908 12.5661C15.7848 12.9011 16.6828 13.4077 17.2979 14.0098C17.6826 14.3864 18.0482 14.8826 18.1146 15.4906C18.1852 16.1371 17.9033 16.7439 17.3373 17.283C16.3612 18.213 15.1897 18.9583 13.6744 18.9583H6.32587C4.81062 18.9583 3.63912 18.213 2.66292 17.283C2.09707 16.7439 1.81502 16.1371 1.88569 15.4906C1.95214 14.8826 2.31769 14.3864 2.70242 14.0098C3.31755 13.4077 4.21547 12.9011 4.80949 12.5661C4.94503 12.4896 5.06477 12.422 5.1617 12.3643C8.12341 10.6007 11.8769 10.6007 14.8386 12.3643Z" fill="white"/>
              <path d="M5.62512 5.41669C5.62512 3.00044 7.58387 1.04169 10.0001 1.04169C12.4164 1.04169 14.3751 3.00044 14.3751 5.41669C14.3751 7.83293 12.4164 9.79169 10.0001 9.79169C7.58387 9.79169 5.62512 7.83293 5.62512 5.41669Z" fill="white"/>
            </svg>
            <span style={{ color: '#ffffff', fontSize: '7px', opacity: 0.5 }}>Profile</span>
          </div>
        </div>

        {/* PHONE SHELL — z-index 4 */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '36px',
          border: '8px solid #222222',
          boxShadow: '0 0 0 2px #444444, 0 30px 60px rgba(168,240,221,0.15)',
          zIndex: 4, pointerEvents: 'none',
        }} />

        {/* NOTCH — z-index 5 */}
        <div style={{
          position: 'absolute',
          top: '10px', left: '50%',
          transform: 'translateX(-50%)',
          width: '72px', height: '20px',
          backgroundColor: '#000000',
          borderRadius: '10px',
          zIndex: 5, pointerEvents: 'none',
        }} />

        {/* HOME INDICATOR — z-index 5 */}
        <div style={{
          position: 'absolute',
          bottom: '8px', left: '50%',
          transform: 'translateX(-50%)',
          width: '72px', height: '4px',
          backgroundColor: '#ffffff',
          borderRadius: '2px',
          zIndex: 5, pointerEvents: 'none',
          opacity: 0.4,
        }} />
      </div>

      {/* JOIN TEXT — fontSize/margin to adjust */}
      <p style={{
        color: '#ffffff',
        fontSize: '22px',
        fontWeight: '700',
        margin: '0 0 24px 0',
        textAlign: 'center',
      }}>
        Join the waitlist 🤙
      </p>

      {/* FORM — maxWidth = form width, gap = space between fields */}
      <div style={{
        width: '100%',
        maxWidth: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
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

      {/* ASTRO — width/height = size. marginTop = space above, marginBottom = space to copyright */}
      <Image src="/astro.png" alt="KICKFLP Astronaut"
        width={70} height={70}
        style={{
          objectFit: 'contain',
          marginTop: '40px',
          marginBottom: '31px',
        }} />

      {/* COPYRIGHT — color/fontSize to adjust */}
      <p style={{ color: '#444444', fontSize: '12px', textAlign: 'center', margin: 0 }}>
        © 2026 KICKFLP. All Rights Reserved.
      </p>

    </main>
  );
}
