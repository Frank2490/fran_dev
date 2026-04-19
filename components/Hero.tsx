'use client';

import { useEffect, useRef, useState } from 'react';
import { useScramble } from '@/hooks/useScramble';

function useCountUp(target: number, duration: number = 1500, start: boolean) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!start) return
    let startTime: number
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [start, target, duration])

  return count
}

const stats = [
  { target: 3, label: 'projekty', duration: 1200 },
  { target: 5, label: 'automatyzacje', duration: 1500 },
];

const fullName = 'Franciszek';

const roles = [
  'aplikacje webowe.',
  'landing pages.',
  'automatyzacje.',
  'narzędzia AI.',
  'integracje API.',
];

function fadeStyle(phase: number, threshold: number, delay: string) {
  return {
    opacity: phase >= threshold ? 1 : 0,
    transform: phase >= threshold ? 'translateY(0)' : 'translateY(20px)',
    transition: 'opacity 600ms ease, transform 600ms ease',
    transitionDelay: delay,
  };
}

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [phase, setPhase] = useState(0);
  const [currentRole, setCurrentRole] = useState(0);
  const [roleVisible, setRoleVisible] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [startScramble, setStartScramble] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStartScramble(true), 1650);
    return () => clearTimeout(timeout);
  }, []);

  const scrambledText = useScramble('Projektuję i buduję —', startScramble, 25);
  const statsRef = useRef<HTMLDivElement>(null);

  const count3 = useCountUp(3, 1200, isInView);
  const count5 = useCountUp(5, 1500, isInView);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsInView(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);


  // Typewriter + phase progression
  useEffect(() => {
    const timeout = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(fullName.slice(0, i + 1));
        i++;
        if (i === fullName.length) {
          clearInterval(interval);
          setPhase(1);
        }
      }, 80);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(timeout);
  }, []);

  // Rotating roles
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleVisible(false);
      setTimeout(() => {
        setCurrentRole((prev) => (prev + 1) % roles.length);
        setRoleVisible(true);
      }, 400);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Advance phases with delays
  useEffect(() => {
    if (phase === 0) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    [400, 800, 1200].forEach((delay, i) => {
      timers.push(setTimeout(() => setPhase(i + 2), delay));
    });
    return () => timers.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase === 1]);

  return (
    <section
      id="hero"
      className="relative flex items-center overflow-hidden"
      style={{ minHeight: '100vh', backgroundColor: '#141414' }}
    >
      {/* Dot pattern */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, #2A2A2A 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          opacity: 0.8,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Fade-out gradient */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, transparent 50%, #141414 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      {/* Background glow */}
      <div
        aria-hidden
        className="absolute pointer-events-none"
        style={{
          width: '500px',
          height: '500px',
          background: '#38BDF8',
          opacity: 0.03,
          filter: 'blur(96px)',
          borderRadius: '50%',
          top: '30%',
          left: '-10%',
          zIndex: 0,
        }}
      />

      <div
        className="relative w-full max-w-5xl mx-auto px-6 flex flex-col items-start"
        style={{ paddingTop: '64px', zIndex: 2 }}
      >
        {/* Label */}
        <p style={{ color: '#555555', fontSize: '14px', marginBottom: '2rem' }}>
          {'// full-stack developer & automation engineer'}
        </p>

        {/* Heading */}
        <h1 style={{ lineHeight: 1 }}>
          <span
            className="block"
            style={{ color: '#F5F5F5', fontWeight: 700, fontSize: 'clamp(48px, 10vw, 72px)', minHeight: '1.1em' }}
          >
            {displayText}
          </span>
          <span
            className="block"
            style={{
              color: '#38BDF8',
              fontWeight: 700,
              fontSize: 'clamp(48px, 10vw, 72px)',
              ...fadeStyle(phase, 1, '0ms'),
            }}
          >
            Solewicz
          </span>
        </h1>

        {/* Subheading */}
        <div
          style={{
            marginTop: '1.5rem',
            fontSize: 'clamp(16px, 4vw, 22px)',
            fontWeight: 400,
            lineHeight: 1.5,
            ...fadeStyle(phase, 2, '0ms'),
          }}
        >
          <p style={{ fontSize: 'clamp(16px, 4vw, 22px)', fontWeight: 400, color: '#F5F5F5' }}>
            <span style={{ color: '#555555' }}>
              {scrambledText}&nbsp;
            </span>
            <span
              style={{
                display: 'inline-block',
                color: '#38BDF8',
                opacity: roleVisible ? 1 : 0,
                transform: roleVisible ? 'translateY(0)' : 'translateY(-8px)',
                transition: 'opacity 400ms ease, transform 400ms ease',
              }}
            >
              {roles[currentRole]}
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          style={{ marginTop: '3rem', ...fadeStyle(phase, 3, '0ms') }}
        >
          <a
            href="#projekty"
            className="transition-all duration-200 hover:scale-105 text-center"
            style={{
              backgroundColor: '#38BDF8',
              color: '#141414',
              fontWeight: 600,
              fontSize: '14px',
              padding: '12px 24px',
              borderRadius: '9999px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0EA5E9')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#38BDF8')}
          >
            zobacz projekty
          </a>
          <a
            href="#kontakt"
            className="transition-all duration-200 text-center"
            style={{
              backgroundColor: 'transparent',
              border: '1px solid #1A1A1A',
              color: '#555555',
              fontSize: '14px',
              padding: '12px 24px',
              borderRadius: '9999px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#555555';
              e.currentTarget.style.color = '#F5F5F5';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#1A1A1A';
              e.currentTarget.style.color = '#555555';
            }}
          >
            skontaktuj się
          </a>
        </div>

        {/* Stats */}
        <div
          ref={statsRef}
          className="flex gap-8 sm:gap-16"
          style={{ marginTop: '5rem', ...fadeStyle(phase, 4, '0ms') }}
        >
          {stats.map(({ label }, i) => {
            const count = i === 0 ? count3 : count5;
            return (
              <div key={label} className="flex flex-col">
                <span style={{ color: '#F5F5F5', fontSize: 'clamp(24px, 6vw, 36px)', fontWeight: 700, lineHeight: 1 }}>
                  {count}+
                </span>
                <span style={{ color: '#555555', fontSize: '13px', marginTop: '4px' }}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom separator */}
        <div style={{ borderBottom: '1px solid #1A1A1A', width: '100%', marginTop: '5rem' }} />
      </div>
    </section>
  );
}
