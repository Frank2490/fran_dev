'use client';

import { useState } from 'react';
import { useInView } from '@/hooks/useInView';

const inputBase: React.CSSProperties = {
  backgroundColor: 'transparent',
  borderBottom: '1px solid #1A1A1A',
  borderTop: 'none',
  borderLeft: 'none',
  borderRight: 'none',
  paddingTop: '12px',
  paddingBottom: '12px',
  color: '#F5F5F5',
  fontSize: '15px',
  width: '100%',
  outline: 'none',
  fontFamily: 'JetBrains Mono, monospace',
  transition: 'border-color 200ms',
};

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1" style={{ marginBottom: '24px' }}>
      <label style={{ color: '#555555', fontSize: '13px' }}>{label}</label>
      {children}
    </div>
  );
}

function ContactLink({
  href,
  label,
  defaultColor = '#555555',
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
        color: hovered ? (defaultColor === '#F5F5F5' ? '#38BDF8' : '#F5F5F5') : defaultColor,
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
    e.currentTarget.style.borderBottomColor = '#38BDF8';
  };
  const blurStyle = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.currentTarget.style.borderBottomColor = '#1A1A1A';
  };

  return (
    <section
      id="kontakt"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        backgroundColor: '#141414',
        paddingTop: '8rem',
        paddingBottom: '8rem',
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 700ms ease, transform 700ms ease',
      }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div style={{ borderBottom: '1px solid #1A1A1A', paddingBottom: '16px', marginBottom: '4rem' }}>
          <p style={{ fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#F5F5F5' }}>
            kontakt <span style={{ color: '#38BDF8' }}>/&gt;</span>
          </p>
        </div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-24">
          {/* Left column */}
          <div className="w-full md:w-3/5">
            <div style={{ lineHeight: 1 }}>
              <p
                style={{
                  color: '#F5F5F5',
                  fontWeight: 700,
                  fontSize: 'clamp(28px, 6vw, 64px)',
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateX(0)' : 'translateX(-24px)',
                  transition: 'opacity 600ms ease, transform 600ms ease',
                }}
              >
                Masz projekt?
              </p>
              <p style={{ color: '#38BDF8', fontWeight: 700, fontSize: 'clamp(28px, 6vw, 64px)' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Porozmawiajmy.
                  <span
                    style={{
                      display: 'inline-block',
                      width: '3px',
                      height: '0.85em',
                      backgroundColor: '#38BDF8',
                      verticalAlign: 'middle',
                      animation: 'blink 800ms step-end infinite',
                    }}
                  />
                </span>
              </p>
            </div>

            <p style={{ color: '#555555', fontSize: '15px', lineHeight: 1.7, maxWidth: '400px', marginTop: '2rem' }}>
              Jestem dostępny dla nowych projektów — landing pages,
              aplikacje webowe i automatyzacje. Napisz, chętnie
              porozmawiam o szczegółach.
            </p>

            <div className="flex flex-col" style={{ gap: '16px', marginTop: '3rem' }}>
              <ContactLink
                href="mailto:franeksolewicz228@gmail.com"
                label="↗ franeksolewicz228@gmail.com"
                defaultColor="#F5F5F5"
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
                style={{ width: '8px', height: '8px', backgroundColor: '#38BDF8' }}
              />
              <span style={{ color: '#555555', fontSize: '13px' }}>
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
                backgroundColor: '#38BDF8',
                color: '#141414',
                fontWeight: 600,
                fontSize: '14px',
                padding: '12px 32px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'JetBrains Mono, monospace',
                marginTop: '8px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#0EA5E9')}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#38BDF8')}
            >
              wysłać wiadomość_()
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
