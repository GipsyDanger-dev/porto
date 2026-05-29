import { RevealOnScroll } from "../RevealOnScroll";
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
    description: "An innovative marketplace connecting local sellers with customers, supporting small business growth. PasarNgalam focuses on usability, scalability, and supporting digital transformation for traditional markets.",
    tags: ["React", "Laravel", "TailwindCSS", "MySQL"],
    imageUrl: pasarNgalamImg,
    projectUrl: "https://pasarngalam-production.up.railway.app/",
    githubUrl: "https://github.com/GipsyDanger-dev/PasarNgalam",
    status: null,
  },
  {
    title: "Freshness FruitCheck",
    description: "AI-powered fruit freshness detection with high accuracy using Convolutional Neural Network (CNN).",
    tags: ["Python", "TensorFlow", "Keras", "Flask"],
    imageUrl: fruitCheckImg,
    projectUrl: "https://fruitcheck.up.railway.app/",
    githubUrl: "https://github.com/GipsyDanger-dev/AIprojectUAS",
    status: null,
  },
  {
    title: "RemindMe App",
    description: "Smart task reminder app with real-time notifications and cross-device synchronization.",
    tags: ["Kotlin", "Dart", "Firebase", "Room"],
    imageUrl: remindMeImg,
    projectUrl: "",
    githubUrl: "https://github.com/GipsyDanger-dev/remind_new",
    status: null,
  },
  {
    title: "IT Solution Website",
    description: "Modern company profile website with responsive design and high performance optimization.",
    tags: ["React", "TailwindCSS", "Framer Motion", "Vite"],
    imageUrl: itSolutionImg,
    projectUrl: "https://it-solution-malang.up.railway.app/",
    githubUrl: "https://github.com/GipsyDanger-dev/it-solution-malang",
    status: null,
  },
  {
    title: "Gipsy.Dev",
    description: "Personal branding platform and interactive portfolio showcase with stunning visual effects.",
    tags: ["React", "Three.js", "GSAP", "TailwindCSS"],
    imageUrl: gipsyDevImg,
    projectUrl: "https://gipsydanger-dev.github.io/porto/#",
    githubUrl: "https://github.com/GipsyDanger-dev/porto",
    status: null,
  },
  {
    title: "StockPP",
    description: "A full-stack application using LSTM Deep Learning to predict stock prices. Built with React, FastAPI, TensorFlow, and Supabase for real-time predictions and model versioning.",
    tags: ["React", "FastAPI", "TensorFlow", "LSTM", "Supabase", "Recharts"],
    imageUrl: stockPPImg,
    projectUrl: "",
    githubUrl: "https://github.com/GipsyDanger-dev/StockPP",
    status: "In Dev",
  },
  {
    title: "SentinelIoT",
    description: "Real-time IoT monitoring dashboard for fire and gas hazard detection using ESP32 microcontroller. Built with Laravel 13 backend, React frontend, and Fuzzy Logic (Sugeno) engine for intelligent threat assessment.",
    tags: ["Laravel 13", "React", "Tailwind CSS", "MySQL", "ESP32", "Fuzzy Logic"],
    imageUrl: sentinelImg,
    projectUrl: "",
    githubUrl: "https://github.com/GipsyDanger-dev/MiniProjectCC",
    status: "In Dev",
  },
];

const ProjectCard = ({ project, index }) => {
  const isEven = index % 2 === 1;

  return (
    <div
      className="grid items-center gap-8 lg:gap-14"
      style={{
        gridTemplateColumns: isEven ? '5fr 7fr' : '7fr 5fr',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        paddingTop: '56px',
        marginBottom: '56px',
      }}
    >
      {/* Visual */}
      <div
        className={`${isEven ? 'order-2' : 'order-1'} overflow-hidden transition-all duration-700`}
        style={{
          background: 'linear-gradient(135deg, rgba(28,32,36,0.8), rgba(16,20,23,1))',
          boxShadow: '0 2px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.boxShadow = '0 8px 40px rgba(0,0,0,0.4), 0 0 0 1px rgba(242,100,15,0.08), inset 0 1px 0 rgba(255,255,255,0.05)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.boxShadow = '0 2px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)';
          e.currentTarget.style.transform = 'translateY(0)';
        }}
      >
        <img
          src={project.imageUrl}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-[1.03]"
        />
      </div>

      {/* Text */}
      <div className={`${isEven ? 'order-1' : 'order-2'}`}>
        {project.status && (
          <span
            className="inline-block mb-4"
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
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontWeight: 700,
            color: 'var(--on-surface)',
            marginBottom: '16px',
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '16px',
            lineHeight: '26px',
            color: 'var(--on-surface-variant)',
            marginBottom: '20px',
          }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '9px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--on-surface-variant)',
                background: 'rgba(255,255,255,0.04)',
                padding: '4px 10px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-6">
          {project.projectUrl && (
            <a
              href={project.projectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex items-center gap-2 transition-all"
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--secondary)',
                textDecoration: 'none',
              }}
            >
              View Project
              <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">&rarr;</span>
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 transition-colors"
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
  );
};

export const Project = () => {
  return (
    <section id="projects" style={{ padding: 'var(--section-gap) 0' }}>
      <RevealOnScroll>
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="section-label">Selected Works</div>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(36px, 5vw, 52px)',
              fontWeight: 700,
              letterSpacing: '-0.015em',
              color: 'var(--on-surface)',
              marginBottom: '64px',
            }}
          >
            Projects<em style={{ fontStyle: 'italic', color: 'var(--on-surface-variant)' }}>.</em>
          </h2>

          <div className="hidden md:block">
            {projectsData.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-12">
            {projectsData.map((project, index) => (
              <div
                key={index}
                style={{
                  borderTop: index > 0 ? '1px solid rgba(255,255,255,0.04)' : 'none',
                  paddingTop: index > 0 ? '32px' : 0,
                }}
              >
                <div
                  className="overflow-hidden mb-6"
                  style={{
                    background: 'linear-gradient(135deg, rgba(28,32,36,0.8), rgba(16,20,23,1))',
                    boxShadow: '0 2px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.03)',
                  }}
                >
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                  />
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
                    color: 'var(--on-surface)',
                    marginBottom: '12px',
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--sans)',
                    fontSize: '15px',
                    lineHeight: '24px',
                    color: 'var(--on-surface-variant)',
                    marginBottom: '16px',
                  }}
                >
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '9px',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--on-surface-variant)',
                        background: 'rgba(255,255,255,0.04)',
                        padding: '4px 10px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-6">
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
                        color: 'var(--secondary)',
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
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
