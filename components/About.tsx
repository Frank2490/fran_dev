'use client';

import { useInView } from '@/hooks/useInView';

const kw = (text: string) => (
  <span style={{ color: '#7C3AED' }}>{text}</span>
);
const name = (text: string) => (
  <span style={{ color: '#7C3AED' }}>{text}</span>
);
const str = (text: string) => (
  <span style={{ color: '#e3a64b' }}>{text}</span>
);
const comment = (text: string) => (
  <span style={{ color: '#8B949E' }}>{text}</span>
);
const punct = (text: string) => (
  <span style={{ color: '#8B949E' }}>{text}</span>
);

const lines: React.ReactNode[] = [
  <>{kw('class')} {name('Franciszek_Solewicz')} {punct('{')}</>,
  null,
  <>{comment('  // buduję rzeczy które działają')}</>,
  null,
  <>{punct('  ')}{kw('constructor')}{punct('() {')}</>,
  <>{punct('    ')}{kw('this')}{punct('.')}{name('name')} {punct('=')} {str("'Franciszek Solewicz'")}</>,
  <>{punct('    ')}{kw('this')}{punct('.')}{name('location')} {punct('=')} {str("'Kielce, Polska'")}</>,
  <>{punct('    ')}{kw('this')}{punct('.')}{name('email')} {punct('=')} {str("'franeksolewicz228@gmail.com'")}</>,
  <>{punct('    ')}{kw('this')}{punct('.')}{name('available')} {punct('=')} {kw('true')}</>,
  <>{punct('  }')}</>,
  null,
  <>{punct('  ')}{name('skills')}{punct('() {')}</>,
  <>{punct('    ')}{kw('return')} {punct('[')}</>,
  <>{punct('      ')}{str("'Next.js'")}{punct(', ')}{str("'React'")}{punct(', ')}{str("'Tailwind CSS'")}{punct(',')}</>,
  <>{punct('      ')}{str("'n8n'")}{punct(', ')}{str("'Make'")}{punct(', ')}{str("'REST API'")}{punct(',')}</>,
  <>{punct('      ')}{str("'Claude API'")}{punct(', ')}{str("'OpenAI API'")}{punct(',')}</>,
  <>{punct('      ')}{str("'Git'")}{punct(', ')}{str("'GitHub'")}{punct(', ')}{str("'Vercel'")}</>,
  <>{punct('    ]')}</>,
  <>{punct('  }')}</>,
  null,
  <>{punct('  ')}{name('projects')}{punct('() {')}</>,
  <>{punct('    ')}{kw('return')} {punct('{')}</>,
  <>{punct('      ')}{name('landingPages')}{punct(': [')}</>,
  <>{punct('        ')}{punct('{ ')}{str("'Centrum Kosmetyczne Kielce'")}{punct(': ')}{str("'landing page dla salonu'")}{punct(' },')}</>,
  <>{punct('      ],')} </>,
  <>{punct('      ')}{name('webApps')}{punct(': [')}</>,
  <>{punct('        ')}{punct('{ ')}{str("'Promptify'")}{punct(': ')}{str("'generator promptów AI'")}{punct(' },')}</>,
  <>{punct('        ')}{punct('{ ')}{str("'Kalkulator Pizzy'")}{punct(': ')}{str("'narzędzie dla pizzaiolo'")}{punct(' },')}</>,
  <>{punct('        ')}{punct('{ ')}{str("'Generator Grafików'")}{punct(': ')}{str("'automatyzacja dla gastro'")}{punct(' },')}</>,
  <>{punct('      ],')} </>,
  <>{punct('      ')}{name('automatyzacje')}{punct(': [')}</>,
  <>{punct('        ')}{punct('{ ')}{str("'n8n & Make'")}{punct(': ')}{str("'workflow bez udziału człowieka'")}{punct(' },')}</>,
  <>{punct('      ]')}</>,
  <>{punct('    }')}</>,
  <>{punct('  }')}</>,
  null,
  <>{punct('  ')}{name('workExperience')}{punct('() {')}</>,
  <>{punct('    ')}{kw('return')} {punct('[')}</>,
  <>{punct('      ')}{punct('{ ')}{str("'2025-now'")}{punct(': ')}{str("'Freelancer - aplikacje i automatyzacje'")}{punct(' },')}</>,
  <>{punct('    ]')}</>,
  <>{punct('  }')}</>,
  null,
  <>{punct('}')}</>,
];

export default function About() {
  const { ref, isInView } = useInView();

  return (
    <section
      id="o-mnie"
      ref={ref as React.RefObject<HTMLElement>}
      style={{
        backgroundColor: '#0D1117',
        paddingTop: '8rem',
        paddingBottom: '8rem',
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(24px)',
        transition: 'opacity 700ms ease, transform 700ms ease',
      }}
    >
      <div className="max-w-5xl mx-auto px-6">
        <div style={{ borderBottom: '1px solid #30363D', paddingBottom: '16px', marginBottom: '4rem' }}>
          <p
            style={{
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              color: '#7C3AED',
              opacity: isInView ? 1 : 0,
              transform: isInView ? 'translateX(0)' : 'translateX(-24px)',
              transition: 'opacity 600ms ease, transform 600ms ease',
            }}
          >
            o mnie <span style={{ color: '#7C3AED' }}>/&gt;</span>
          </p>
        </div>

        {/* Code block */}
        <div style={{ overflowX: 'auto' }}>
          <div style={{ minWidth: 'max-content' }}>
            {lines.map((line, i) => (
              <div
                key={i}
                className="flex gap-8 py-1"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? 'translateY(0)' : 'translateY(8px)',
                  transition: 'opacity 400ms ease, transform 400ms ease',
                  transitionDelay: `${i * 30}ms`,
                }}
              >
                <span
                  className="hidden md:block"
                  style={{
                    color: '#161B22',
                    fontSize: '13px',
                    minWidth: '24px',
                    textAlign: 'right',
                    userSelect: 'none',
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
                <span
                  style={{
                    fontSize: 'clamp(12px, 2vw, 14px)',
                    lineHeight: 1.7,
                    whiteSpace: 'pre',
                  }}
                >
                  {line ?? ' '}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
