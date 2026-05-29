import { Suspense, lazy } from "react";
import { GsapReveal } from "../GsapReveal";
import TextType from "../TextType";
import fotoHomeImg from "../../pct/Foto_Home.png";

const HeroScene = lazy(() => import("../HeroScene"));

export const Home = () => {
  return (
    <section
      id="home"
      className="relative"
      style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '4rem' }}
    >
      {/* 3D Background */}
      <Suspense fallback={null}>
        <HeroScene />
      </Suspense>

      {/* Photo - desktop only, right column */}
      <div className="hidden lg:flex absolute inset-y-0 right-0 items-center justify-end z-10" style={{ width: 'calc(38vw + var(--gutter))', paddingRight: 'var(--gutter)' }}>
        <div
          className="relative overflow-hidden h-[75vh] max-h-150"
          style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.04)', width: '38vw', maxWidth: '480px' }}
        >
          <img
            src={fotoHomeImg}
            alt="Gipsy.Dev"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
            style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }}
          />
        </div>
      </div>

      {/* Text content */}
      <div className="relative z-10 w-full flex items-center" style={{ minHeight: 'calc(100vh - 8rem)' }}>
        <div className="max-w-7xl mx-auto px-6 md:px-16 w-full">
          <div className="lg:pr-[42vw] text-center lg:text-left">
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
                Full stack developer and video editor focused on React, Laravel, and the Adobe Creative Suite. Combining technical skill and visual sense to build digital products that make an impact.
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
              </div>
            </GsapReveal>
          </div>
        </div>
      </div>

      {/* Mobile photo */}
      <div className="lg:hidden flex justify-center mt-10 px-6 relative z-10">
        <div
          className="relative overflow-hidden w-full max-w-sm"
          style={{ boxShadow: '0 4px 30px rgba(0,0,0,0.4), inset 0 0 0 1px rgba(255,255,255,0.04)', aspectRatio: '3/4' }}
        >
          <img
            src={fotoHomeImg}
            alt="Gipsy.Dev"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />
          <div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-28"
            style={{ background: 'linear-gradient(to top, var(--bg), transparent)' }}
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce z-20 hidden md:block">
        <a href="#about" style={{ color: 'var(--outline)' }}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};
