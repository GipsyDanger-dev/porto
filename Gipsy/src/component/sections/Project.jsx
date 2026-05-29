import { GsapReveal, GsapStagger } from "../GsapReveal";
import fruitCheckImg from "../../pct/FruitCheck.png";
import itSolutionImg from "../../pct/IT-Solution.png";
import remindMeImg from "../../pct/RemindMe.png";
import gipsyDevImg from "../../pct/Porto (2).png";
import pasarNgalamImg from "../../pct/PasarNgalam.png";
import stockPPImg from "../../pct/StockPP.png";
import sentinelImg from "../../pct/SentinelIot.png";

const projectsData = [
  {
    title: "PasarNgalam",
    description: "Platform e-commerce berbasis web khusus Malang yang memberdayakan UMKM dan pelaku usaha lokal. Fokus pada usability, skalabilitas, dan transformasi digital pasar tradisional.",
    tags: ["React", "Laravel", "TailwindCSS", "MySQL"],
    imageUrl: pasarNgalamImg,
    projectUrl: "https://pasarngalam-production.up.railway.app/",
    githubUrl: "https://github.com/GipsyDanger-dev/PasarNgalam",
    status: null,
  },
  {
    title: "Freshness FruitCheck",
    description: "AI-powered fruit freshness detection with high accuracy using Convolutional Neural Network (CNN). Real-time classification with web-based interface.",
    tags: ["Python", "TensorFlow", "Keras", "Flask"],
    imageUrl: fruitCheckImg,
    projectUrl: "https://fruitcheck.up.railway.app/",
    githubUrl: "https://github.com/GipsyDanger-dev/AIprojectUAS",
    status: null,
  },
  {
    title: "RemindMe App",
    description: "Smart task reminder app with real-time notifications and cross-device synchronization. Built with native Android and Firebase backend.",
    tags: ["Kotlin", "Dart", "Firebase", "Room"],
    imageUrl: remindMeImg,
    projectUrl: "",
    githubUrl: "https://github.com/GipsyDanger-dev/remind_new",
    status: null,
  },
  {
    title: "IT Solution Website",
    description: "Modern company profile website with responsive design and high performance optimization. Smooth animations and clean component architecture.",
    tags: ["React", "TailwindCSS", "Framer Motion", "Vite"],
    imageUrl: itSolutionImg,
    projectUrl: "https://it-solution-malang.up.railway.app/",
    githubUrl: "https://github.com/GipsyDanger-dev/it-solution-malang",
    status: null,
  },
  {
    title: "Gipsy.Dev",
    description: "Personal branding platform and interactive portfolio showcase with stunning visual effects. Three.js, GSAP, and WebGL-powered animations.",
    tags: ["React", "Three.js", "GSAP", "TailwindCSS"],
    imageUrl: gipsyDevImg,
    projectUrl: "https://gipsydanger-dev.github.io/porto/#",
    githubUrl: "https://github.com/GipsyDanger-dev/porto",
    status: null,
  },
  {
    title: "StockPP",
    description: "Full-stack application using LSTM Deep Learning to predict stock prices. Real-time predictions, model versioning, and interactive charts.",
    tags: ["React", "FastAPI", "TensorFlow", "LSTM", "Supabase", "Recharts"],
    imageUrl: stockPPImg,
    projectUrl: "",
    githubUrl: "https://github.com/GipsyDanger-dev/StockPP",
    status: "In Dev",
  },
  {
    title: "SentinelIoT",
    description: "Real-time IoT monitoring dashboard for fire and gas hazard detection using ESP32. Fuzzy Logic (Sugeno) engine for intelligent threat assessment.",
    tags: ["Laravel 13", "React", "Tailwind CSS", "MySQL", "ESP32", "Fuzzy Logic"],
    imageUrl: sentinelImg,
    projectUrl: "",
    githubUrl: "https://github.com/GipsyDanger-dev/MiniProjectCC",
    status: "In Dev",
  },
];

const ProjectEntry = ({ project, index }) => {
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
                className="inline-flex items-center gap-2 transition-colors duration-200"
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--outline)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--on-surface)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--outline)'; }}
              >
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
            <ProjectEntry key={index} project={project} index={index} />
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
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--outline)',
                        textDecoration: 'none',
                      }}
                    >
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
};
