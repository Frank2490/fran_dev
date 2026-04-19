'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { useInView } from '@/hooks/useInView';

type Project = {
  number: string;
  title: string;
  description: string;
  technologies: string[];
  link: string | null;
  github: string | null;
  image: string;
  details: string;
};

const categories = [
  {
    name: 'Landing Pages',
    projects: [
      {
        number: '00',
        title: 'Centrum Kosmetyczne Kielce',
        description: 'Landing page dla lokalnego salonu kosmetycznego w Kielcach. Elegancki design przyciągający nowych klientów.',
        technologies: ['Next.js', 'Tailwind', 'Vercel'],
        link: null,
        github: null,
        image: '/images/projects/centrum-kosmetyczne.png',
        details: 'Landing page zaprojektowany dla lokalnego salonu kosmetycznego. Strona zawiera sekcje z usługami, galerią, opiniami klientów i formularzem kontaktowym. Zbudowana z myślą o konwersji — każdy element prowadzi użytkownika do umówienia wizyty.',
      },
    ],
  },
  {
    name: 'Aplikacje webowe',
    projects: [
      {
        number: '01',
        title: 'Promptify',
        description: 'Generator promptów AI dla modeli obrazowych DALL-E i Midjourney.',
        technologies: ['Next.js', 'Claude API', 'Tailwind', 'Vercel'],
        link: 'https://promptify-five-kappa.vercel.app/',
        github: 'https://github.com/Frank2490/Promptify',
        image: '/images/projects/promptify.png',
        details: 'Aplikacja która rozwiązuje problem tworzenia skutecznych promptów do generatorów obrazów AI. Użytkownik opisuje czego potrzebuje w prostym języku, a aplikacja generuje zoptymalizowany prompt gotowy do użycia w DALL-E lub Midjourney. Zbudowana na Claude API od Anthropic.',
      },
      {
        number: '02',
        title: 'Kalkulator Pizzy Neapolitańskiej',
        description: 'Precyzyjny kalkulator składników ciasta dla prawdziwych pizzaiolo.',
        technologies: ['Next.js', 'React', 'Tailwind'],
        link: 'https://pizza-calculator-lyart.vercel.app/',
        github: 'https://github.com/Frank2490/pizza-calculator',
        image: '/images/projects/kalkulator-pizzy.png',
        details: 'Narzędzie dla miłośników pizzy neapolitańskiej które eliminuje żmudne ręczne obliczenia. Wystarczy podać liczbę pizz i wagę każdej kulki — kalkulator automatycznie wyliczy dokładne proporcje mąki, wody, drożdży i soli zgodnie z tradycyjną recepturą neapolitańską.',
      },
      {
        number: '03',
        title: 'Generator Grafików',
        description: 'Automatyczne grafiki pracy dla małych firm gastronomicznych.',
        technologies: ['Next.js', 'React', 'Tailwind'],
        link: null,
        github: null,
        image: '/images/projects/generator-grafikow.png',
        details: 'Narzędzie które eliminuje godziny spędzone na ręcznym układaniu grafików zmian. Właściciel wpisuje dostępność pracowników i wymagania zmian — system automatycznie generuje optymalny grafik na cały tydzień. Zbudowane z myślą o małych restauracjach i kawiarniach.',
      },
    ],
  },
  {
    name: 'Automatyzacje',
    projects: [
      {
        number: '04',
        title: 'Invoice Autopilot',
        description: 'Automatyczny system obiegu faktur — od maila do arkusza.',
        technologies: ['n8n', 'Gmail API', 'Google Drive', 'Google Sheets'],
        link: null,
        github: null,
        image: '/images/projects/invoice-autopilot.png',
        details: 'System który całkowicie eliminuje ręczną obsługę faktur. Automatycznie odbiera maile z załącznikami PDF, zapisuje dokumenty w odpowiednich folderach Google Drive, odczytuje kluczowe dane z faktury i wpisuje je do arkusza kalkulacyjnego. Zero klikania, zero pomyłek.',
      },
      {
        number: '05',
        title: 'Google Drive File Watcher',
        description: 'Natychmiastowe powiadomienie na Telegram gdy pojawi się nowy plik.',
        technologies: ['n8n', 'Google Drive API', 'Telegram API'],
        link: null,
        github: null,
        image: '/images/projects/drive-watcher.png',
        details: 'Automatyzacja która działa jak strażnik folderów Google Drive. Gdy tylko pojawi się nowy plik — w ciągu sekund wysyła powiadomienie na Telegram z nazwą pliku i linkiem. Eliminuje ręczne sprawdzanie folderów i ryzyko pominięcia ważnych dokumentów.',
      },
      {
        number: '06',
        title: 'Gold Signal Daily',
        description: 'Codzienny raport gospodarczy z prognozą wpływu na cenę złota.',
        technologies: ['n8n', 'Telegram API', 'AI', 'RSS'],
        link: null,
        github: null,
        image: '/images/projects/gold-signal.png',
        details: 'Codzienny agent który monitoruje światowe newsy gospodarcze i wysyła spersonalizowany raport na kanał Telegram. Na końcu każdej wiadomości AI analizuje zebrane informacje i prognozuje jak wydarzenia ze świata mogą wpłynąć na cenę złota.',
      },
      {
        number: '07',
        title: 'AI News Briefing',
        description: 'Codzienne podsumowanie najważniejszych newsów ze świata tech i AI.',
        technologies: ['n8n', 'Telegram API', 'AI', 'RSS'],
        link: null,
        github: null,
        image: '/images/projects/ai-news.png',
        details: 'Agent który codziennie skanuje najważniejsze źródła ze świata technologii i sztucznej inteligencji. Selekcjonuje najbardziej wartościowe informacje, przetwarza je przez model AI i dostarcza zwięzłe podsumowanie prosto na kanał Telegram — bez zbędnego szumu informacyjnego.',
      },
      {
        number: '08',
        title: 'Veo 3 Video Factory',
        description: 'Automatyczna fabryka krótkich filmików gotowych na TikToka.',
        technologies: ['n8n', 'Veo 3 API', 'AI', 'Google Drive'],
        link: null,
        github: null,
        image: '/images/projects/veo3-factory.png',
        details: 'Pipeline który automatyzuje cały proces tworzenia krótkich filmów. System generuje pomysł na filmik, tworzy scenariusz, buduje prompt wideo i wysyła go do generatora Veo 3 przez API. Gotowy film trafia automatycznie do bazy danych i Google Drive — bez udziału człowieka.',
      },
      {
        number: '09',
        title: 'Smart Inbox Classifier',
        description: 'AI które automatycznie porządkuje skrzynkę mailową.',
        technologies: ['n8n', 'Gmail API', 'AI'],
        link: null,
        github: null,
        image: '/images/projects/inbox-classifier.png',
        details: 'Automatyzacja która przywraca porządek w skrzynce mailowej. Każdy przychodzący mail jest analizowany przez model AI który rozpoznaje jego temat i nadawcę, a następnie automatycznie przypisuje odpowiednią etykietę. Koniec z ręcznym sortowaniem setek wiadomości.',
      },
      {
        number: '10',
        title: 'Telegram Mail Dispatcher',
        description: 'Wyślij maila przez Telegram — agent zajmie się resztą.',
        technologies: ['n8n', 'Telegram API', 'Gmail API', 'AI'],
        link: null,
        github: null,
        image: '/images/projects/telegram-dispatcher.png',
        details: 'Agent który zamienia Telegram w interfejs do wysyłania maili. Wystarczy napisać treść wiadomości i odbiorcę — agent przeszukuje bazę kontaktów, dopasowuje właściwą osobę i wysyła maila automatycznie. Idealne rozwiązanie gdy chcesz działać szybko bez otwierania klienta pocztowego.',
      },
      {
        number: '11',
        title: 'Email Digest Agent',
        description: 'Jedno podsumowanie wszystkich maili z ostatnich 24 godzin.',
        technologies: ['n8n', 'Gmail API', 'AI', 'Telegram API'],
        link: null,
        github: null,
        image: '/images/projects/email-digest.png',
        details: 'Agent który codziennie przegląda całą skrzynkę mailową z ostatnich 24 godzin, streszcza każdą wiadomość i wysyła jedno zbiorcze podsumowanie na Telegram. Zamiast przeglądać dziesiątki maili — dostajesz jeden przejrzysty digest z najważniejszymi informacjami.',
      },
    ],
  },
];

function ProjectRow({ project, onClick }: { project: Project; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);
  const [rowInView, setRowInView] = useState(false);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setRowInView(true); observer.disconnect(); } },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const titleStyle = {
    opacity: rowInView ? 1 : 0,
    transform: rowInView ? 'translateX(0)' : 'translateX(-24px)',
    transition: 'opacity 600ms ease, transform 600ms ease',
  };

  return (
    <div
      ref={rowRef}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderBottom: '1px solid #30363D',
        paddingTop: '40px',
        paddingBottom: '40px',
        background: hovered ? 'rgba(255,255,255,0.02)' : 'transparent',
        transition: 'background 200ms',
        cursor: 'pointer',
      }}
    >
      {/* Desktop layout */}
      <div className="hidden md:flex justify-between items-start">
        <div className="flex gap-8 items-start">
          <span
            style={{
              color: hovered ? '#7C3AED' : '#161B22',
              fontSize: '13px',
              fontWeight: 500,
              minWidth: '32px',
              marginTop: '4px',
              transition: 'color 200ms',
              flexShrink: 0,
            }}
          >
            {project.number}
          </span>
          <div>
            <p style={{ color: '#F0F6FC', fontSize: '22px', fontWeight: 600, marginBottom: '8px', ...titleStyle }}>
              {project.title}
            </p>
            <p style={{ color: '#8B949E', fontSize: '14px', lineHeight: 1.7, maxWidth: '480px', marginBottom: '16px' }}>
              {project.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <Tag key={tech} label={tech} />
              ))}
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center" style={{ flexShrink: 0, marginLeft: '32px', paddingTop: '4px' }}>
          <Links project={project} />
        </div>
      </div>

      {/* Mobile layout */}
      <div className="flex flex-col md:hidden gap-3">
        <p style={{ color: '#F0F6FC', fontSize: 'clamp(24px, 7vw, 32px)', fontWeight: 600, lineHeight: 1.1, ...titleStyle }}>
          {project.title}
        </p>
        <p style={{ color: '#8B949E', fontSize: '14px', lineHeight: 1.7 }}>
          {project.description}
        </p>
        <div className="flex flex-col items-start gap-3">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <Tag key={tech} label={tech} />
            ))}
          </div>
          <div className="flex gap-4 items-center">
            <Links project={project} />
          </div>
        </div>
      </div>
    </div>
  );
}

function Tag({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? '#7C3AED' : '#161B22'}`,
        color: hovered ? '#7C3AED' : '#8B949E',
        fontSize: '12px',
        padding: '4px 12px',
        borderRadius: '9999px',
        transition: 'border-color 200ms, color 200ms',
        cursor: 'default',
      }}
    >
      {label}
    </span>
  );
}

function Links({ project }: { project: Project }) {
  if (!project.link && !project.github) {
    return <span style={{ color: '#161B22', fontSize: '13px' }}>wkrótce</span>;
  }
  return (
    <>
      {project.link && <ExternalLink href={project.link} label="↗ live" />}
      {project.github && <ExternalLink href={project.github} label="↗ github" />}
    </>
  );
}

function ExternalLink({ href, label }: { href: string; label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ color: hovered ? '#7C3AED' : '#8B949E', fontSize: '13px', transition: 'color 200ms', cursor: 'pointer' }}
    >
      {label}
    </a>
  );
}

export default function Projects() {
  const { ref, isInView } = useInView();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    if (selectedProject) {
      setTimeout(() => setModalVisible(true), 10);
    } else {
      setModalVisible(false);
    }
  }, [selectedProject]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <>
      <section
        id="projekty"
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
              projekty <span style={{ color: '#7C3AED' }}>/&gt;</span>
            </p>
          </div>

          {categories.map((category, catIndex) => (
            <div key={category.name} style={{ marginTop: catIndex === 0 ? '0' : '4rem' }}>
              <p
                style={{
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.2em',
                  color: '#8B949E',
                  marginBottom: '2rem',
                }}
              >
                <span style={{ color: '#7C3AED' }}>— </span>
                {category.name}
              </p>
              {category.projects.map((project) => (
                <ProjectRow key={project.number} project={project} onClick={() => setSelectedProject(project)} />
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(0,0,0,0.85)' }}
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="rounded-2xl overflow-y-auto"
            style={{
              position: 'relative',
              backgroundColor: '#0D1117',
              border: '1px solid #30363D',
              maxWidth: '680px',
              width: '90vw',
              maxHeight: '85vh',
              padding: '32px',
              opacity: modalVisible ? 1 : 0,
              transform: modalVisible ? 'scale(1)' : 'scale(0.95)',
              transition: 'opacity 200ms ease, transform 200ms ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-start" style={{ marginBottom: '24px' }}>
              <div>
                <p style={{ color: '#7C3AED', fontSize: '12px', marginBottom: '4px' }}>
                  {selectedProject.number}
                </p>
                <p style={{ color: '#7C3AED', fontSize: '24px', fontWeight: 700 }}>
                  {selectedProject.title}
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                style={{ color: '#8B949E', fontSize: '20px', cursor: 'pointer', background: 'none', border: 'none', lineHeight: 1 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#7C3AED')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#8B949E')}
              >
                ✕
              </button>
            </div>

            {/* Screenshot */}
            <div style={{ marginBottom: '24px' }}>
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                width={680}
                height={360}
                className="rounded-xl object-cover w-full"
                style={{ height: '260px' }}
              />
            </div>

            {/* Details */}
            <p style={{ color: '#8B949E', fontSize: '15px', lineHeight: 1.7, marginBottom: '24px' }}>
              {selectedProject.details}
            </p>

            {/* Technologies */}
            <div style={{ marginBottom: '24px' }}>
              <p style={{ color: '#8B949E', fontSize: '12px', marginBottom: '12px' }}>{`// technologie`}</p>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <ModalTag key={tech} label={tech} />
                ))}
              </div>
            </div>

            {/* Buttons */}
            {(selectedProject.link || selectedProject.github) && (
              <div className="flex gap-3 flex-wrap">
                {selectedProject.link && (
                  <ModalLink href={selectedProject.link} label="↗ zobacz projekt" primary />
                )}
                {selectedProject.github && (
                  <ModalLink href={selectedProject.github} label="↗ github" />
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

function ModalTag({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? '#7C3AED' : '#161B22'}`,
        color: hovered ? '#7C3AED' : '#8B949E',
        fontSize: '12px',
        padding: '4px 12px',
        borderRadius: '9999px',
        transition: 'border-color 200ms, color 200ms',
        cursor: 'default',
      }}
    >
      {label}
    </span>
  );
}

function ModalLink({ href, label, primary }: { href: string; label: string; primary?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={
        primary
          ? {
              backgroundColor: hovered ? '#6D28D9' : '#7C3AED',
              color: '#0D1117',
              fontWeight: 600,
              fontSize: '14px',
              padding: '10px 24px',
              borderRadius: '9999px',
              transition: 'background-color 200ms',
              cursor: 'pointer',
            }
          : {
              border: `1px solid ${hovered ? '#8B949E' : '#161B22'}`,
              color: hovered ? '#7C3AED' : '#8B949E',
              fontSize: '14px',
              padding: '10px 24px',
              borderRadius: '9999px',
              transition: 'border-color 200ms, color 200ms',
              cursor: 'pointer',
            }
      }
    >
      {label}
    </a>
  );
}
