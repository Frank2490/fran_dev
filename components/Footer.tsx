'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

const navLinks = [
  { href: '#hero', label: 'start' },
  { href: '#projekty', label: 'projekty' },
  { href: '#o-mnie', label: 'o mnie' },
  { href: '#kontakt', label: 'kontakt' },
];

function FooterNavLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ color: hovered ? '#7C3AED' : '#8B949E', fontSize: '13px', transition: 'color 200ms', cursor: 'pointer' }}
    >
      {label} <span style={{ color: '#7C3AED' }}>/&gt;</span>
    </a>
  );
}

function FooterLink({
  href,
  label,
  hoverColor = '#7C3AED',
  target,
}: {
  href: string;
  label: string;
  hoverColor?: string;
  target?: string;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ color: hovered ? hoverColor : '#8B949E', fontSize: '13px', transition: 'color 200ms', cursor: 'pointer' }}
    >
      {label}
    </a>
  );
}

export default function Footer() {
  const { ref, isInView } = useInView();

  return (
    <footer
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        backgroundColor: '#0D1117',
        borderTop: '1px solid #30363D',
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 700ms ease, transform 700ms ease',
      }}
    >
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 text-center md:text-left">
          {/* Left */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="Franciszek Solewicz"
                width={28}
                height={28}
                className="object-contain"
              />
              <span style={{ color: '#7C3AED', fontSize: '14px', fontWeight: 500 }}>fran.dev</span>
            </div>
            <p style={{ color: '#8B949E', fontSize: '12px', marginTop: '12px' }}>
              © 2024 Franciszek Solewicz
            </p>
          </div>

          {/* Center nav — hidden on mobile */}
          <nav className="hidden md:flex gap-8">
            {navLinks.map(({ href, label }) => (
              <FooterNavLink key={href} href={href} label={label} />
            ))}
          </nav>

          {/* Right */}
          <div className="flex gap-6">
            <FooterLink href="https://github.com/Frank2490" label="GitHub" target="_blank" />
            <FooterLink href="https://useme.com/pl/roles/contractor/franciszek-solewicz,576196/" label="Useme" target="_blank" />
            <FooterLink href="mailto:franeksolewicz228@gmail.com" label="Email" hoverColor="#7C3AED" />
          </div>
        </div>

        <p style={{ color: '#161B22', fontSize: '12px', textAlign: 'center', marginTop: '2rem' }}>
          {'// zbudowane w Next.js i Tailwind'}
        </p>
      </div>
    </footer>
  );
}
