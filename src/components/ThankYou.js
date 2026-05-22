import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <>
      {/* GLOBAL FONTS & CLEAN OVERRIDE RESET */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&family=Playfair+Display:wght@500;600;700&display=swap');
        
        body, html {
          margin: 0;
          padding: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          font-family: 'DM Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .glass-panel {
          animation: modalFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes modalFadeIn {
          from {
            opacity: 0;
            transform: scale(0.96) translateY(10px);
          }
          to {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }
      `}</style>

      {/* FULL-SCREEN HERO WRAPPER */}
      <div style={{ 
        position: 'relative',
        width: '100vw', 
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box',
        backgroundColor: '#1c2614' // Solid color fallback while image loads
      }}>
        
        {/* BLURRED BACKGROUND IMAGE LAYER */}
        <div style={{
          position: 'absolute',
          top: '-10px', // Slight offset prevents white bleeding edges caused by the blur filter
          left: '-10px',
          width: 'calc(100% + 20px)',
          height: 'calc(100% + 20px)',
          backgroundImage: `url('/images/banner.webp')`, 
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          filter: 'blur(8px)', // 👈 Controls the intensity of your background blur
          zIndex: 1
        }} />
        
        {/* DARK OVERLAY LAYER (Keeps text perfectly legible) */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          zIndex: 2
        }} />

        {/* HIGH-FIDELITY GLASSMORPHIC CARD CONTAINER */}
        <div 
          className="glass-panel"
          style={{
            position: 'relative',
            zIndex: 3,
            maxWidth: '520px',
            width: '100%',
            backgroundColor: 'rgba(35, 47, 26, 0.65)', 
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: '12px',
            padding: '60px 40px',
            textAlign: 'center',
            boxSizing: 'border-box',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 30px 70px rgba(0, 0, 0, 0.4)'
          }}
        >
          {/* BRAND LOGO */}
          <div style={{ marginBottom: '30px', display: 'flex', justifyContent: 'center' }}>
            <img 
              alt="Elegant Atmos" 
              src="https://kevnitserver.com/projects/elegant_builders/elegantatmoslogo.png" 
              style={{ 
                height: '65px', 
                objectFit: 'contain',
                filter: 'brightness(0) invert(1)' 
              }}
            />
          </div>

          {/* MINIMALIST TICK ICON */}
          <div style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            border: '1px solid rgba(230, 228, 224, 0.4)', 
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 28px auto'
          }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path 
                d="M20 6L9 17L4 12" 
                stroke="#fff" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* MAIN HEADER TITLE */}
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '2.5rem',
            color: '#ffffff',
            margin: '0 0 20px 0',
            fontWeight: '500',
            letterSpacing: '0.02em'
          }}>
            Thank You
          </h1>
          
          {/* DESCRIPTION SUBTEXT BODY */}
          <p style={{
            fontSize: '15px',
            lineHeight: '1.7',
            color: 'rgba(255, 255, 255, 0.9)',
            margin: '0 0 40px 0',
            fontWeight: '400',
            letterSpacing: '0.01em',
            padding: '0 10px'
          }}>
            Thank you for showing interest in Elegant Atmos. Our relationship manager will contact you shortly.
          </p>

          {/* ACTION BUTTON */}
          <button
            onClick={() => navigate('/')}
            style={{
              background: 'none',
              border: '1px solid #5F733C',
              color: '#fff',
              padding: '13px 36px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: '500',
              cursor: 'pointer',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif",
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => { 
              e.currentTarget.style.backgroundColor = '#5F733C'; 
              e.currentTarget.style.color = '#fff';
            }}
            onMouseLeave={(e) => { 
              e.currentTarget.style.backgroundColor = 'none'; 
              e.currentTarget.style.color = '#fff';
            }}
          >
            Return To Home
          </button>
        </div>
      </div>
    </>
  );
}