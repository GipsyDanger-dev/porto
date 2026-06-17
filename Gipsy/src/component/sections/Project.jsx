import { useState, useCallback } from "react";
import { GsapReveal, GsapStagger } from "../GsapReveal";
import fruitCheckImg from "../../pct/FruitCheck.webp";
import itSolutionImg from "../../pct/IT-Solution.webp";
import remindMeImg from "../../pct/RemindMe.webp";
import gipsyDevImg from "../../pct/Porto (2).webp";
import pasarNgalamImg from "../../pct/PasarNgalam.webp";
import stockPPImg from "../../pct/StockPP.webp";
import sentinelImg from "../../pct/SentinelIot.webp";

const projectsData = [
  {
    title: "StockPP",
    description: "Full-stack application using LSTM Deep Learning to predict stock prices. Real-time predictions, model versioning, and interactive charts.",
    tags: ["React", "FastAPI", "TensorFlow", "LSTM", "Supabase", "Recharts"],
    imageUrl: stockPPImg,
    projectUrl: "",
    githubUrl: "https://github.com/GipsyDanger-dev/StockPP",
    status: "In Dev",
    timeline: [
      { date: "16 May 2026", title: "Project Started", desc: "Database setup, backend routes, first Analytics & Market pages, model testing." },
      { date: "18 May 2026", title: "Authentication System", desc: "Login, signup, reset password. API data fixes and backend configuration." },
      { date: "19 May 2026", title: "Premium Landing Page", desc: "Three.js 3D scene, GSAP scroll animations, glassmorphism navbar, magnetic buttons." },
      { date: "22 May 2026", title: "Mobile & UI Polish", desc: "Mobile responsiveness, animated orbs, dot grid, glassmorphism light theme." },
      { date: "24 May 2026", title: "Design System Overhaul", desc: "Intrepid design system, auth page redesign with Three.js canvas." },
      { date: "27 May 2026", title: "Dashboard Preview", desc: "Three.js particle field, Canvas 2D charts, GSAP pinned scroll, branding." },
      { date: "28 May 2026", title: "Security & Performance", desc: "Auth middleware, OTP rate limiting, password reset, accessibility fixes." },
      { date: "29 May 2026", title: "ML Pipeline Optimization", desc: "ACO stock scoring, EWMA20 feature, SSE progress streaming, dark theme." },
      { date: "30 May 2026", title: "Accuracy Improvements", desc: "Market context, dynamic ensemble, SMTP support, security hardening." },
      { date: "31 May 2026", title: "UI & Model Refinements", desc: "Frontend updates, direction-aware loss, momentum features, Huber loss." },
      { date: "3 Jun 2026", title: "Dark Theme Complete", desc: "All dashboard pages converted to dark theme matching landing page." },
    ],
  },
  {
    title: "PasarNgalam",
    description: "Platform e-commerce berbasis web khusus Malang yang memberdayakan UMKM dan pelaku usaha lokal. Fokus pada usability, skalabilitas, dan transformasi digital pasar tradisional.",
    tags: ["React", "Laravel", "TailwindCSS", "MySQL"],
    imageUrl: pasarNgalamImg,
    projectUrl: "https://pasarngalam-production.up.railway.app/",
    githubUrl: "https://github.com/GipsyDanger-dev/PasarNgalam",
    status: null,
    timeline: [
      { date: "1 Dec 2025", title: "Project Started", desc: "Login system, mitra (partner) integration, initial navigation structure." },
      { date: "2 Dec 2025", title: "Merchant System", desc: "Merchant dashboard, partner management, order flow foundation." },
      { date: "7 Dec 2025", title: "Core Features Built", desc: "Real-time order tracking with map, driver pickup confirmation, checkout system, profile editing for all actors." },
      { date: "7 Dec 2025", title: "Merchant Dashboard", desc: "Financial recap, order history, order activities, confirm dialogs, access control." },
      { date: "9 Dec 2025", title: "Dashboard Refinements", desc: "Customer profile, merchant dashboard polish, final adjustments." },
      { date: "31 Dec 2025", title: "Production Ready", desc: "Security updates, payment method integration, final merge and deployment." },
    ],
  },
  {
    title: "Freshness FruitCheck",
    description: "AI-powered fruit freshness detection with high accuracy using Convolutional Neural Network (CNN). Real-time classification with web-based interface.",
    tags: ["Python", "TensorFlow", "Keras", "Flask"],
    imageUrl: fruitCheckImg,
    projectUrl: "https://fruitcheck.up.railway.app/",
    githubUrl: "https://github.com/GipsyDanger-dev/AIprojectUAS",
    status: null,
    timeline: [
      { date: "9 Dec 2025", title: "Project Started", desc: "First commit, index setup, initial AI model integration for fruit freshness detection." },
      { date: "11 Dec 2025", title: "Model & Deployment", desc: "Model improvements, ngrok configuration for external access, deployment preparation." },
      { date: "13 Dec 2025", title: "UI Polish", desc: "Layout fixes and refinements across multiple iterations for better user experience." },
      { date: "23 May 2026", title: "Rebranding", desc: "Project renamed from AIprojectUAS to Freshness FruitCheck for clearer branding." },
    ],
  },
  {
    title: "RemindMe App",
    description: "Smart task reminder app with real-time notifications and cross-device synchronization. Built with native Android and Firebase backend.",
    tags: ["Kotlin", "Dart", "Firebase", "Room"],
    imageUrl: remindMeImg,
    projectUrl: "",
    githubUrl: "https://github.com/GipsyDanger-dev/remind_new",
    status: null,
    timeline: [
      { date: "3 Dec 2025", title: "Project Started", desc: "Initial commit, core reminder functionality and data structure setup." },
      { date: "7 Dec 2025", title: "Feature Development", desc: "Reminder scheduling, notification system, and UI components." },
      { date: "8 Dec 2025", title: "First Complete Build", desc: "Functional reminder app with create, edit, and delete capabilities." },
      { date: "9 Dec 2025", title: "Final Updates", desc: "Bug fixes, UI polish, and final refinements before submission." },
    ],
  },
  {
    title: "IT Solution Website",
    description: "Modern company profile website with responsive design and high performance optimization. Smooth animations and clean component architecture.",
    tags: ["React", "TailwindCSS", "Framer Motion", "Vite"],
    imageUrl: itSolutionImg,
    projectUrl: "https://itsolution.gipsy-dev.me/",
    githubUrl: "https://github.com/GipsyDanger-dev/it-solution-malang",
    status: null,
    timeline: [
      { date: "26 Oct 2025", title: "Project Started", desc: "Initial commit, base project structure for IT Solution company profile." },
      { date: "27 Oct 2025", title: "Navigation & Auth", desc: "Navbar routing, authentication pages (login, register, forgot password)." },
      { date: "3 Nov 2025", title: "Dashboard & Chat", desc: "Technician and customer dashboards, service CRUD, real-time chat with AJAX polling." },
      { date: "13 Nov 2025", title: "Service Management", desc: "Admin CRUD for services, customer service view, profile editing, chat bug fixes." },
      { date: "23 Nov 2025", title: "Customer Features", desc: "Service ordering for customers, admin messaging system, sidebar fixes." },
      { date: "27 Nov 2025", title: "Bug Fixes", desc: "Sidebar toggle fix, various UI bug fixes across the application." },
      { date: "7 Dec 2025", title: "Deployed", desc: "Railway configuration, production deployment, final polish." },
    ],
  },
  {
    title: "Gipsy.Dev",
    description: "Personal branding platform and interactive portfolio showcase with stunning visual effects. Three.js, GSAP, and WebGL-powered animations.",
    tags: ["React", "Three.js", "GSAP", "TailwindCSS"],
    imageUrl: gipsyDevImg,
    projectUrl: "https://gipsydanger-dev.github.io/porto/#",
    githubUrl: "https://github.com/GipsyDanger-dev/porto",
    status: null,
    timeline: [
      { date: "24 Dec 2025", title: "Project Started", desc: "Initial portfolio structure, project containers, and basic layout." },
      { date: "26 Dec 2025", title: "Security & Deployment", desc: "Security updates, Node.js error fixes, deployment configuration." },
      { date: "22 Apr 2026", title: "Contact & Email", desc: "Contact form with EmailJS, email config hardening, debug fixes." },
      { date: "2 May 2026", title: "Certifications Added", desc: "Professional certification showcase with credential links." },
      { date: "19 May 2026", title: "GitHub Links & Cleanup", desc: "Source links for projects, dead code cleanup, dependency updates." },
      { date: "22 May 2026", title: "Visual Effects", desc: "LightRays WebGL, TextType typing effect, brand-colored skill icons, footer marquee." },
      { date: "23 May 2026", title: "Content & Performance", desc: "5 new certifications, English copywriting, performance optimization." },
      { date: "27 May 2026", title: "Mobile & Polish", desc: "Mobile tap-to-reveal, SentinelIoT project, TextType logic fix." },
      { date: "29 May 2026", title: "Midnight Editorial Redesign", desc: "Complete design system overhaul with Three.js hero, GSAP animations, CircularGallery." },
      { date: "30 May 2026", title: "Optimization & SEO", desc: "Image compression, code splitting, Lighthouse optimization, Google Search Console." },
      { date: "16 Jun 2026", title: "Current State", desc: "19 certifications, project journey timelines, mobile responsive, fully optimized." },
    ],
  },
  {
    title: "SentinelIoT",
    description: "Real-time IoT monitoring dashboard for fire and gas hazard detection using ESP32. Fuzzy Logic (Sugeno) engine for intelligent threat assessment.",
    tags: ["Laravel 13", "React", "Tailwind CSS", "MySQL", "ESP32", "Fuzzy Logic"],
    imageUrl: sentinelImg,
    projectUrl: "",
    githubUrl: "https://github.com/GipsyDanger-dev/MiniProjectCC",
    status: "In Dev",
    timeline: [
      { date: "9 Apr 2026", title: "Project Started", desc: "First commit, Python simulator for sensor data generation, initial IoT architecture." },
      { date: "10 Apr 2026", title: "Backend & Automation", desc: "Python worker, command system, automatic actions, worker status tracking in database." },
      { date: "11 Apr 2026", title: "Dashboard & API", desc: "Admin dashboard, API key settings, UI styling across all components." },
      { date: "3 Jun 2026", title: "Refinements", desc: "Sidebar cleanup, threshold settings improvements, config file organization." },
      { date: "9 Jun 2026", title: "Major Features", desc: "ESP32 Serial bridge, API improvements, frontend real-time updates, admin login, emergency toggle, actuator fixes." },
      { date: "14 Jun 2026", title: "Design & Testing", desc: "xAI design system, 3D room model with Three.js, 23 system tests (100% pass), X-Banner design, deployment." },
    ],
  },
];

const ProjectEntry = ({ project, index, onSelect }) => {
  const isReverse = index % 2 === 1;
  const num = String(index + 1).padStart(2, '0');

  return (
    <GsapReveal delay={0.1}>
      <div
        className="group grid items-center"
        style={{
          gridTemplateColumns: isReverse ? '5fr 7fr' : '7fr 5fr',
          borderTop: '1px solid var(--outline-variant)',
          padding: '72px 0',
          gap: '72px',
        }}
      >
        {/* Visual */}
        <div
          className={`proj-visual relative overflow-hidden ${isReverse ? 'order-2' : 'order-1'}`}
          onClick={() => project.timeline && onSelect?.(project)}
          style={{ borderRadius: '4px', cursor: project.timeline ? 'pointer' : 'default',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            background: 'var(--surface-high)',
            lineHeight: 0,
          }}
        >
          <img
            src={project.imageUrl}
            alt={project.title}
            loading="lazy"
            decoding="async"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              display: 'block',
              filter: 'saturate(0.82) brightness(0.88)',
              transition: 'filter 0.55s ease, transform 0.65s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
          {/* Bottom fade overlay */}
          <div
            className="pointer-events-none absolute inset-0 z-1"
            style={{
              background: 'linear-gradient(to bottom, rgba(16,20,23,0.04) 0%, rgba(16,20,23,0.0) 35%, rgba(16,20,23,0.52) 100%)',
            }}
          />
          {/* Side vignette */}
          <div
            className="pointer-events-none absolute inset-0 z-2"
            style={{
              background: 'radial-gradient(ellipse at center, transparent 55%, rgba(16,20,23,0.28) 100%)',
            }}
          />
        </div>

        {/* Info */}
        <div className={`proj-info ${isReverse ? 'order-1 pl-0 lg:pl-18' : 'order-2 pr-0 lg:pr-18'}`}>
          <div
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '10px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--secondary)',
              marginBottom: '20px',
            }}
          >
            {num}
          </div>

          {project.status && (
            <span
              className="inline-block mb-3"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '10px',
                fontWeight: 500,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--secondary)',
                background: 'rgba(242,100,15,0.08)',
                padding: '5px 12px',
              }}
            >
              {project.status}
            </span>
          )}

          <h3
            className="transition-colors duration-300"
            style={{
              fontFamily: 'var(--serif)',
              fontSize: '38px',
              fontWeight: 700,
              lineHeight: 1.15,
              letterSpacing: '-0.015em',
              color: 'var(--on-surface)',
              marginBottom: '14px',
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontFamily: 'var(--sans)',
              fontSize: '14px',
              lineHeight: '23px',
              color: 'var(--on-surface-variant)',
              letterSpacing: '-0.01em',
              marginBottom: '24px',
            }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-1.5 mb-7">
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '9px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--on-surface-variant)',
                  background: 'var(--surface-high)',
                  padding: '5px 10px',
                  border: '1px solid var(--outline-variant)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-5">
            {project.projectUrl && (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/link inline-flex items-center gap-2 transition-all duration-200"
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--on-surface)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--secondary)'; e.currentTarget.style.gap = '12px'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--on-surface)'; e.currentTarget.style.gap = '8px'; }}
              >
                View Project <span>&rarr;</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--on-surface-variant)',
                  textDecoration: 'none',
                  border: '1px solid var(--outline-variant)',
                  padding: '8px 16px',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = '#ffffff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--on-surface-variant)'; e.currentTarget.style.borderColor = 'var(--outline-variant)'; e.currentTarget.style.background = 'transparent'; }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </GsapReveal>
  );
};

export const Project = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section id="projects" style={{ padding: 'var(--section-gap) 0' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <GsapReveal>
          <div className="flex justify-between items-end mb-20" style={{ marginBottom: '80px' }}>
            <div>
              <div className="section-label">Selected Works</div>
              <h2
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(36px, 5vw, 52px)',
                  fontWeight: 700,
                  letterSpacing: '-0.015em',
                  color: 'var(--on-surface)',
                }}
              >
                Projects<em style={{ fontStyle: 'italic', color: 'var(--on-surface-variant)' }}>.</em>
              </h2>
            </div>
            <p
              className="hidden md:block"
              style={{
                maxWidth: '280px',
                fontFamily: 'var(--sans)',
                fontSize: '14px',
                lineHeight: '23px',
                color: 'var(--on-surface-variant)',
                letterSpacing: '-0.01em',
              }}
            >
              A curated gallery of engineering and design, focusing on high-performance web applications and bespoke digital experiences.
            </p>
          </div>
        </GsapReveal>

        {/* Desktop */}
        <div className="hidden md:block">
          {projectsData.map((project, index) => (
            <ProjectEntry key={index} project={project} index={index} onSelect={setSelected} />
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-10">
          {projectsData.map((project, index) => (
            <GsapReveal key={index} delay={0.1}>
              <div
                style={{
                  borderTop: index > 0 ? '1px solid var(--outline-variant)' : 'none',
                  paddingTop: index > 0 ? '32px' : 0,
                }}
              >
                <div
                  className="proj-visual relative overflow-hidden mb-6"
                  style={{
                    borderRadius: '4px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    background: 'var(--surface-high)',
                    lineHeight: 0,
                  }}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                      display: 'block',
                      filter: 'saturate(0.82) brightness(0.88)',
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 z-1"
                    style={{
                      background: 'linear-gradient(to bottom, rgba(16,20,23,0.04) 0%, rgba(16,20,23,0.0) 35%, rgba(16,20,23,0.52) 100%)',
                    }}
                  />
                  <div
                    className="pointer-events-none absolute inset-0 z-2"
                    style={{
                      background: 'radial-gradient(ellipse at center, transparent 55%, rgba(16,20,23,0.28) 100%)',
                    }}
                  />
                </div>

                <div
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--secondary)',
                    marginBottom: '12px',
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>

                {project.status && (
                  <span
                    className="inline-block mb-3"
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--secondary)',
                      background: 'rgba(242,100,15,0.08)',
                      padding: '5px 12px',
                    }}
                  >
                    {project.status}
                  </span>
                )}

                <h3
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '28px',
                    fontWeight: 700,
                    lineHeight: 1.15,
                    color: 'var(--on-surface)',
                    marginBottom: '12px',
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '14px',
                    lineHeight: '22px',
                    color: 'var(--on-surface-variant)',
                    marginBottom: '16px',
                  }}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '9px',
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color: 'var(--on-surface-variant)',
                        background: 'var(--surface-high)',
                        padding: '5px 10px',
                        border: '1px solid var(--outline-variant)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-5">
                  {project.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--on-surface)',
                        textDecoration: 'none',
                      }}
                    >
                      View Project &rarr;
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--on-surface-variant)',
                        textDecoration: 'none',
                        border: '1px solid var(--outline-variant)',
                        padding: '8px 16px',
                        transition: 'all 0.25s ease',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#ffffff'; e.currentTarget.style.borderColor = '#ffffff'; e.currentTarget.style.background = 'rgba(255,255,255,0.08)'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--on-surface-variant)'; e.currentTarget.style.borderColor = 'var(--outline-variant)'; e.currentTarget.style.background = 'transparent'; }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </GsapReveal>
          ))}
        </div>
      </div>

      {/* Project Detail Overlay */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto"
          style={{ background: 'rgba(10, 12, 14, 0.9)', backdropFilter: 'blur(12px)', padding: '40px 16px' }}
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-4xl w-full"
            style={{ background: 'var(--surface)', border: '1px solid var(--outline-variant)' }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header Image */}
            <div style={{ overflow: 'hidden', position: 'relative' }}>
              <img src={selected.imageUrl} alt={selected.title} style={{ width: '100%', height: '320px', objectFit: 'cover', display: 'block', filter: 'saturate(0.8) brightness(0.85)' }} />
              <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '120px', background: 'linear-gradient(to top, var(--surface), transparent)' }} />
            </div>

            <div style={{ padding: '0 48px 48px' }}>
              {/* Title */}
              <div style={{ marginTop: '-40px', position: 'relative', zIndex: 1, marginBottom: '32px' }}>
                <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '12px' }}>{selected.title}</h2>
                <p style={{ fontSize: '15px', color: 'var(--on-surface-variant)', lineHeight: '24px', maxWidth: '600px' }}>{selected.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {selected.tags.map(tag => (
                    <span key={tag} style={{ fontFamily: 'var(--mono)', fontSize: '9px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--on-surface-variant)', background: 'var(--surface-high)', padding: '4px 8px', border: '1px solid var(--outline-variant)' }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Timeline */}
              <div style={{ borderTop: '1px solid var(--outline-variant)', paddingTop: '32px' }}>
                <div className="flex items-center gap-3 mb-8">
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', fontWeight: 500 }}>Development Journey</span>
                </div>

                <div style={{ position: 'relative', paddingLeft: '28px' }}>
                  {/* Vertical line */}
                  <div style={{ position: 'absolute', left: '4px', top: '8px', bottom: '8px', width: '1px', background: 'var(--outline-variant)' }} />

                  {selected.timeline.map((item, i) => (
                    <div key={i} style={{ position: 'relative', marginBottom: i < selected.timeline.length - 1 ? '28px' : 0 }}>
                      {/* Dot */}
                      <div style={{ position: 'absolute', left: '-28px', top: '6px', width: '9px', height: '9px', borderRadius: '50%', background: i === selected.timeline.length - 1 ? 'var(--secondary)' : 'var(--outline-variant)', border: i === selected.timeline.length - 1 ? '2px solid var(--secondary)' : 'none' }} />

                      <div style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--outline)', marginBottom: '6px' }}>{item.date}</div>
                      <div style={{ fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '4px' }}>{item.title}</div>
                      <div style={{ fontSize: '13px', color: 'var(--on-surface-variant)', lineHeight: '20px' }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Close + Links */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mt-8" style={{ borderTop: '1px solid var(--outline-variant)', paddingTop: '24px' }}>
                <button onClick={() => setSelected(null)} style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--outline)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Close</button>
                <div className="flex gap-3">
                  {selected.githubUrl && (
                    <a href={selected.githubUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--on-surface-variant)', textDecoration: 'none', border: '1px solid var(--outline-variant)', padding: '10px 20px', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'all 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#fff'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = 'var(--on-surface-variant)'; e.currentTarget.style.borderColor = 'var(--outline-variant)'; }}
                    >
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                      GitHub
                    </a>
                  )}
                  {selected.projectUrl && (
                    <a href={selected.projectUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#fff', textDecoration: 'none', background: 'var(--secondary)', padding: '10px 20px', display: 'inline-flex', alignItems: 'center', gap: '6px', transition: 'background 0.2s' }}
                      onMouseEnter={e => { e.currentTarget.style.background = '#d95a0e'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'var(--secondary)'; }}
                    >
                      Live Demo &rarr;
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
