import { Suspense, lazy, useEffect, useRef } from "react";
import { GsapReveal } from "../GsapReveal";
import TextType from "../TextType";
import fotoHomeImg from "../../pct/Foto_Home2.webp";
import gsap from "gsap";

const HeroScene = lazy(() => import("../HeroScene"));

const ScrollIndicator = () => {
  const svgRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1, yoyo: true });
    tl.to(svgRef.current, { y: 8, duration: 1.2, ease: "power2.inOut" });

    const path = lineRef.current;
    if (path) {
      const length = path.getTotalLength();
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(path, { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut", delay: 1 });
    }

    return () => tl.kill();
  }, []);

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block">
      <a href="#about" style={{ color: 'var(--outline)', display: 'block' }}>
        <svg ref={svgRef} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path ref={lineRef} strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </div>
  );
};

export const Home = () => {
  return (
    <section
      id="home"
      className="relative overflow-hidden lg:overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* 3D Background */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Orange glow behind photo */}
      <div
        className="hidden lg:block absolute z-1 pointer-events-none"
        style={{
          right: '0',
          bottom: '0',
          width: '50vw',
          height: '100%',
          background: 'radial-gradient(ellipse at 75% 60%, rgba(242,100,15,0.22) 0%, transparent 60%)',
        }}
      />

      {/* Orb — SVG circle with burnt orange stroke */}
      <div className="hidden lg:flex absolute inset-0 items-center justify-center z-1 pointer-events-none">
        <svg
          viewBox="0 0 500 500"
          style={{ width: '42vw', maxWidth: '520px', height: 'auto', opacity: 0.18 }}
        >
          <ellipse cx="250" cy="250" rx="220" ry="220" fill="none" stroke="#f2640f" strokeWidth="1" />
          <ellipse cx="250" cy="250" rx="180" ry="180" fill="none" stroke="#f2640f" strokeWidth="0.5" opacity="0.5" />
          <ellipse cx="250" cy="250" rx="140" ry="140" fill="none" stroke="#f2640f" strokeWidth="0.5" opacity="0.3" />
        </svg>
      </div>

      {/* Photo — absolute, anchored from bottom right */}
      <img
        src={fotoHomeImg}
        alt="Gipsy.Dev"
        loading="eager"
        decoding="async"
        width={1200}
        height={1500}
        className="hidden lg:block absolute z-2 pointer-events-none"
        style={{
          right: '2%',
          bottom: '0',
          height: '88vh',
          width: 'auto',
          objectFit: 'contain',
          filter: 'grayscale(25%) brightness(0.9) contrast(1.05)',
          maskImage: 'linear-gradient(to top, transparent 0%, black 12%, black 100%)',
          WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 12%, black 100%)',
        }}
      />

      {/* Text content */}
      <div className="relative z-10 w-full flex items-center" style={{ minHeight: '100vh', paddingTop: '6rem' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 w-full">
          <div className="lg:max-w-[55%] text-center lg:text-left">
            <GsapReveal delay={0.2}>
              <div
                className="inline-flex items-center mb-8"
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--secondary)',
                  gap: '8px',
                }}
              >
                <span style={{ display: 'block', width: '24px', height: '1px', background: 'var(--secondary)' }} />
                <TextType
                  text={["Fullstack Engineer", "Web Developer", "AI Engineer"]}
                  typingSpeed={70}
                  pauseDuration={2000}
                  deletingSpeed={40}
                  showCursor={true}
                  cursorCharacter="|"
                  cursorClassName="text-[var(--secondary)]"
                  variableSpeed={{ min: 50, max: 100 }}
                />
              </div>
            </GsapReveal>

            <GsapReveal delay={0.4}>
              <h1
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(48px, 8vw, 80px)',
                  fontWeight: 700,
                  lineHeight: 0.95,
                  letterSpacing: '-0.025em',
                  color: 'var(--on-surface)',
                  marginBottom: '24px',
                }}
              >
                Hi, I&apos;m <em style={{ fontStyle: 'italic', color: 'var(--on-surface-variant)' }}>Gipsy.Dev</em>
              </h1>
              <p
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '12px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--outline)',
                  marginBottom: '24px',
                }}
              >
                Adam Fairuz Akmal Aryaguna
              </p>
            </GsapReveal>

            <GsapReveal delay={0.6}>
              <p
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '18px',
                  lineHeight: '28px',
                  color: 'var(--on-surface-variant)',
                  maxWidth: '540px',
                  marginBottom: '32px',
                }}
                className="mx-auto lg:mx-0"
              >
                A meticulous approach to software engineering and interface design. Building robust, scalable systems with high-end aesthetic precision.
              </p>
            </GsapReveal>

            <GsapReveal delay={0.8}>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a href="#projects" className="btn-primary">
                  View Projects
                </a>
                <a href="#contact" className="btn-secondary">
                  Contact Me
                </a>
                <a
                  href="/cv-adam-fairuz.pdf"
                  download
                  className="btn-outline"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download CV
                </a>
              </div>
            </GsapReveal>
          </div>

          {/* Mobile photo — inside flow */}
          <div className="lg:hidden flex justify-center mt-8 pb-8 px-4">
            <img
              src={fotoHomeImg}
              alt="Gipsy.Dev"
              loading="eager"
              decoding="async"
              width={1200}
              height={1500}
              className="w-full h-auto max-w-65 object-contain"
              style={{
                filter: 'grayscale(25%) brightness(0.9) contrast(1.05)',
                maskImage: 'linear-gradient(to top, transparent 0%, black 10%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 10%, black 100%)',
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <ScrollIndicator />
    </section>
  );
};
