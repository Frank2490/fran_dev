'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

const navLinks = [
  { href: '#projekty', label: 'projekty' },
  { href: '#o-mnie', label: 'o mnie' },
  { href: '#kontakt', label: 'kontakt' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
      <header
        className="sticky top-0 z-50"
        style={{
          backgroundColor: '#0D1117',
          borderBottom: `1px solid ${scrolled ? '#161B22' : 'transparent'}`,
          transition: 'border-color 200ms',
          height: '64px',
        }}
      >
        <div className="max-w-5xl mx-auto px-6 h-full flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 shrink-0" onClick={() => setMenuOpen(false)}>
            <Image
              src="/images/logo.png"
              alt="Franciszek Solewicz"
              width={32}
              height={32}
              className="object-contain"
            />
            <span style={{ color: '#E6EDF3', fontSize: '15px', fontWeight: 500, whiteSpace: 'nowrap' }}>
            fran.dev
            </span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ href, label }) => (
              <a key={href} href={href} className="group transition-colors duration-200" style={{ fontSize: '14px', color: '#8B949E' }}>
                <span className="group-hover:text-white transition-colors duration-200">{label}</span>
                <span style={{ color: '#58A6FF' }}> /&gt;</span>
              </a>
            ))}
          </nav>

          {/* Available badge + hamburger */}
          <div className="flex items-center gap-4">
            <a
              href="#kontakt"
              className="hidden md:flex items-center gap-2 group"
              style={{ fontSize: '13px' }}
            >
              <span
                className="animate-pulse rounded-full shrink-0"
                style={{ width: '6px', height: '6px', backgroundColor: '#58A6FF', display: 'inline-block' }}
              />
              <span className="group-hover:text-white transition-colors duration-200" style={{ color: '#8B949E' }}>
                dostępny
              </span>
            </a>

            {/* Hamburger */}
            <button
              className="md:hidden transition-colors duration-200"
              style={{ color: '#8B949E', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              aria-label="Toggle menu"
              onClick={() => setMenuOpen((o) => !o)}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#E6EDF3')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8B949E')}
            >
              {menuOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className="fixed inset-0 z-40 md:hidden flex flex-col items-center justify-center gap-8"
        style={{
          backgroundColor: '#0D1117',
          opacity: menuOpen ? 1 : 0,
          transform: menuOpen ? 'translateY(0)' : 'translateY(-12px)',
          transition: 'opacity 250ms ease, transform 250ms ease',
          pointerEvents: menuOpen ? 'auto' : 'none',
        }}
      >
        {navLinks.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            className="group transition-colors duration-200"
            style={{ fontSize: '24px', color: '#8B949E' }}
            onClick={() => setMenuOpen(false)}
          >
            <span className="group-hover:text-white transition-colors duration-200">{label}</span>
            <span style={{ color: '#58A6FF' }}> /&gt;</span>
          </a>
        ))}

        <div className="flex items-center gap-2 mt-4" style={{ fontSize: '13px' }}>
          <span
            className="animate-pulse rounded-full shrink-0"
            style={{ width: '6px', height: '6px', backgroundColor: '#58A6FF', display: 'inline-block' }}
          />
          <span style={{ color: '#8B949E' }}>dostępny</span>
        </div>
      </div>
    </>
  );
}
