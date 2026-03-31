import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface CinematicLoaderProps {
  onComplete: () => void;
}

const CinematicLoader = ({ onComplete }: CinematicLoaderProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      const logo = logoRef.current;
      const textWrap = textRef.current;
      const letters = letterRefs.current.filter(Boolean) as HTMLSpanElement[];
      const container = containerRef.current;

      if (!logo || !textWrap || !container) return;

      // --- INITIAL STATES ---
      gsap.set(logo, { scale: 0, opacity: 0, rotation: 0 });
      gsap.set(letters, {
        scale: 0,
        opacity: 0,
        y: 40,
        rotation: () => gsap.utils.random(-8, 8),
      });
      gsap.set(textWrap, { letterSpacing: '20px' });

      // =============================================
      // PHASE 1 — LOGO EMERGENCE (0s → 0.8s)
      // =============================================
      tl.to(logo, {
        scale: 1,
        opacity: 1,
        rotation: 160,
        duration: 0.8,
        ease: 'back.out(1.6)',
      });

      // =============================================
      // PHASE 2 — ENERGY SPIN BUILD (overlap at 0.6s)
      // =============================================
      tl.to(
        logo,
        {
          rotation: '+=360',
          duration: 0.6,
          ease: 'power2.inOut',
        },
        '-=0.2'
      );

      // =============================================
      // PHASE 3 — BURST / ENERGY RELEASE (overlap at 1.1s)
      // =============================================
      tl.to(
        logo,
        {
          scale: 1.45,
          filter: 'drop-shadow(0 0 25px rgba(255, 140, 0, 0.8))',
          duration: 0.25,
          ease: 'power2.out',
        },
        '-=0.1'
      );

      // Blur flash at peak
      tl.to(logo, {
        filter: 'drop-shadow(0 0 25px rgba(255, 140, 0, 0.8)) blur(2px)',
        duration: 0.08,
        ease: 'none',
      });

      tl.to(logo, {
        scale: 1,
        filter: 'drop-shadow(0 0 10px rgba(255, 140, 0, 0.4)) blur(0px)',
        duration: 0.2,
        ease: 'power2.out',
      });

      // =============================================
      // PHASE 4 — TEXT FORMATION (overlap at ~1.2s)
      // =============================================
      tl.to(
        letters,
        {
          scale: 1,
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.5,
          ease: 'back.out(1.7)',
          stagger: 0.06,
        },
        '-=0.3'
      );

      // =============================================
      // PHASE 5 — LETTER-SPACING COMPRESSION
      // =============================================
      tl.to(
        textWrap,
        {
          letterSpacing: '8px',
          duration: 0.7,
          ease: 'power2.out',
        },
        '-=0.4'
      );

      // =============================================
      // PHASE 6 — GLOW SETTLE
      // =============================================
      tl.to(
        logo,
        {
          filter: 'drop-shadow(0 0 4px rgba(255, 140, 0, 0.2)) blur(0px)',
          duration: 0.4,
          ease: 'power1.out',
        },
        '-=0.3'
      );

      // Subtle text glow settle
      tl.to(
        letters,
        {
          textShadow: '0 0 6px rgba(255, 140, 0, 0.15)',
          duration: 0.4,
          ease: 'power1.out',
        },
        '<'
      );

      // =============================================
      // PHASE 7 — INFINITE LOGO SPIN (loader mode)
      // =============================================
      const spinTween = gsap.to(logo, {
        rotation: '+=360',
        duration: 2,
        ease: 'linear',
        repeat: -1,
        paused: true,
      });

      // Start spinning after glow settle, hold for 1.5s, then exit
      tl.call(() => { spinTween.play(); });
      tl.to({}, { duration: 1.5 });

      // =============================================
      // PHASE 8 — EXIT
      // =============================================
      tl.to(container, {
        opacity: 0,
        duration: 0.5,
        ease: 'power2.in',
        onComplete: () => {
          spinTween.kill();
          onComplete();
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onComplete]);

  const text = 'ZERION';

  return (
    <>
      <style>{`
/* ============================================
   CINEMATIC LOADER — Premium Intro Animation
   ============================================ */

.cinematic-loader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: radial-gradient(ellipse at 50% 40%, #0a0a0a 0%, #030303 100%);
  overflow: hidden;
}

/* Subtle ambient particles / vignette */
.cinematic-loader::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at 50% 50%, transparent 40%, rgba(0, 0, 0, 0.6) 100%);
  pointer-events: none;
}

/* ---------- LOGO ---------- */
.loader-logo-wrap {
  position: relative;
  will-change: transform, opacity, filter;
}

.loader-logo-wrap svg {
  display: block;
  color: #ff8c00;
  filter: drop-shadow(0 0 6px rgba(255, 140, 0, 0.3));
}

/* ---------- TEXT ---------- */
.loader-text-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2rem;
  letter-spacing: 20px;
  will-change: letter-spacing;
}

.loader-letter {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 2.4rem;
  font-weight: 700;
  color: #ffffff;
  text-transform: uppercase;
  display: inline-block;
  will-change: transform, opacity;
  text-shadow: 0 0 8px rgba(255, 140, 0, 0.0);
}

/* ---------- RESPONSIVE ---------- */
@media (max-width: 600px) {
  .loader-logo-wrap svg {
    width: 80px;
    height: 80px;
  }

  .loader-letter {
    font-size: 1.6rem;
  }

  .loader-text-wrap {
    letter-spacing: 14px;
  }
}
      `}</style>
      <div className="cinematic-loader" ref={containerRef}>
        {/* SVG Logo */}
        <div className="loader-logo-wrap" ref={logoRef}>
        <svg
          width="120"
          height="120"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(50, 50)">
            {[0, 60, 120, 180, 240, 300].map((angle) => (
              <g key={angle} transform={`rotate(${angle})`}>
                <path
                  d="M-4 -12 L4 -12 L6 -28 L0 -34 L-6 -28 Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                  fill="none"
                />
                <line
                  x1="-3" y1="-18" x2="3" y2="-18"
                  stroke="currentColor" strokeWidth="1.2"
                />
                <line
                  x1="0" y1="-12" x2="0" y2="-34"
                  stroke="currentColor" strokeWidth="1.2"
                />
                <path
                  d="M4 -12 L10 0"
                  stroke="currentColor" strokeWidth="1.2" strokeOpacity="0.4"
                />
                <circle
                  cx="0" cy="-38" r="3.2"
                  fill="#030303" stroke="currentColor" strokeWidth="1.8"
                />
              </g>
            ))}
            <circle cx="0" cy="0" r="6" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.8" fill="none" />
            <circle cx="0" cy="0" r="1.5" fill="currentColor" />
          </g>
        </svg>
      </div>

      {/* ZERION Text */}
      <div className="loader-text-wrap" ref={textRef}>
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="loader-letter"
            ref={(el) => { letterRefs.current[i] = el; }}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
    </>
  );
};

export default CinematicLoader;
