'use client';

import { useState } from 'react';
import { useInView } from '@/hooks/useInView';

const inputBase: React.CSSProperties = {
  backgroundColor: 'transparent',
  borderBottom: '1px solid #30363D',
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  paddingTop: '12px',
  paddingBottom: '12px',
  color: '#7C3AED',
  fontSize: '15px',
  width: '100%',
  outline: 'none',
  fontFamily: 'JetBrains Mono, monospace',
  transition: 'border-color 200ms',
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1" style={{ marginBottom: '24px' }}>
      <label style={{ color: '#8B949E', fontSize: '13px' }}>{label}</label>
      {children}
    </div>
  );
}

function ContactLink({
  href,
  label,
  defaultColor = '#8B949E',
  target,
}: {
  href: string;
  label: string;
  defaultColor?: string;
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
      style={{
        color: hovered ? (defaultColor === '#7C3AED' ? '#7C3AED' : '#7C3AED') : defaultColor,
        fontSize: '15px',
        transition: 'color 200ms',
        cursor: 'pointer',
        wordBreak: 'break-all',
      }}
    >
      {label}
    </a>
  );
}

export default function Contact() {
  const { ref, isInView } = useInView();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    console.log(form);
  };

  const focusStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderBottomColor = '#7C3AED';
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderBottomColor = '#161B22';
  };

  return (
    <section
      id="kontakt"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        backgroundColor: '#0D1117',
        paddingTop: '8rem',
        paddingBottom: '8rem',
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 700ms ease, transform 700ms ease',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <svg
        style={{
          position: 'absolute', top: '-40px', left: '-40px',
          opacity: 0.0, pointerEvents: 'none', zIndex: 0
        }}
        width="300" height="300" viewBox="0 0 220 220"
      >
        <polygon points="110,10 200,57 200,163 110,210 20,163 20,57"
          fill="none" stroke="#7C3AED" strokeWidth="1"/>
        <polygon points="110,40 175,75 175,145 110,180 45,145 45,75"
          fill="none" stroke="#7C3AED" strokeWidth="0.5"/>
        <polygon points="110,70 150,92 150,138 110,160 70,138 70,92"
          fill="none" stroke="#7C3AED" strokeWidth="0.5"/>
      </svg>

      <div style={{ position: 'relative', zIndex: 1 }}>
      <div className="max-w-5xl mx-auto px-6">
        <div style={{ borderBottom: '1px solid #30363D', paddingBottom: '16px', marginBottom: '4rem' }}>
          <p style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#7C3AED' }}>
            kontakt <span style={{ color: '#7C3AED' }}>/&gt;</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          {/* Left column */}
          <div className="w-full md:w-3/5">
            <div style={{ lineHeight: 1 }}>
              <p
                style={{
                  color: '#7C3AED',
                  fontWeight: 700,
                  fontSize: 'clamp(28px, 6vw, 64px)',
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateX(0)' : 'translateX(-24px)',
                  transition: 'opacity 600ms ease, transform 600ms ease',
                }}
              >
                Masz projekt?
              </p>
              <p style={{ color: '#7C3AED', fontWeight: 700, fontSize: 'clamp(28px, 6vw, 64px)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Porozmawiajmy.
                  <span
                    style={{
                      display: 'inline-block',
                      width: '3px',
                      height: '0.85em',
                      backgroundColor: '#7C3AED',
                      verticalAlign: 'middle',
                      animation: 'blink 800ms step-end infinite',
                    }}
                  />
                </span>
              </p>
            </div>

            <p style={{ color: '#8B949E', fontSize: '15px', lineHeight: 1.7, maxWidth: '400px', marginTop: '2rem' }}>
              Jestem dostępny dla nowych projektów — landing pages,
              aplikacje webowe i automatyzacje. Napisz, chętnie
              porozmawiam o szczegółach.
            </p>

            <div className="flex flex-col" style={{ gap: '16px', marginTop: '3rem' }}>
              <ContactLink
                href="mailto:franeksolewicz228@gmail.com"
                label="↗ franeksolewicz228@gmail.com"
                defaultColor="#7C3AED"
              />
              <ContactLink
                href="https://github.com/Frank2490"
                label="↗ github.com/Frank2490"
                target="_blank"
              />
              <ContactLink
                href="https://useme.com/pl/roles/contractor/franciszek-solewicz,576196/"
                label="↗ useme.com/fransolewicz"
                target="_blank"
              />
            </div>

            <div className="flex items-center" style={{ gap: '12px', marginTop: '3rem' }}>
              <span
                className="animate-pulse rounded-full shrink-0"
                style={{ width: '8px', height: '8px', backgroundColor: '#7C3AED' }}
              />
              <span style={{ color: '#8B949E', fontSize: '13px' }}>
                dostępny dla nowych projektów
              </span>
            </div>
          </div>

          {/* Right column */}
          <div className="w-full md:w-2/5">
            <Field label="// imię i nazwisko">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyle}
                placeholder="Jan Kowalski"
                style={inputBase}
              />
            </Field>

            <Field label="// email">
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyle}
                placeholder="jan@kowalski.pl"
                style={inputBase}
              />
            </Field>

            <Field label="// temat">
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyle}
                placeholder="Landing page dla firmy"
                style={inputBase}
              />
            </Field>

            <Field label="// wiadomość">
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                onFocus={focusStyle}
                onBlur={blurStyle}
                rows={4}
                placeholder="Opowiedz mi o projekcie..."
                style={{ ...inputBase, resize: 'none' }}
              />
            </Field>

            <button
              onClick={handleSubmit}
              className="transition-all duration-200 hover:scale-105 w-full sm:w-auto"
              style={{
                backgroundColor: '#7C3AED',
                color: '#0D1117',
                fontWeight: 600,
                fontSize: '14px',
                padding: '12px 32px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono, monospace',
                marginTop: '8px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#6D28D9')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#7C3AED')}
            >
              wysłać wiadomość_()
            </button>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}
