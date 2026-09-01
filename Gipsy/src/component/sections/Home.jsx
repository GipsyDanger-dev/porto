import { Suspense, lazy, useEffect, useRef } from "react";
import { GsapReveal } from "../GsapReveal";
import TextType from "../TextType";
import fotoHomeImg from "../../pct/Foto_Home2.webp";
import gsap from "gsap";

const HeroScene = lazy(() => import("../HeroScene"));

const ScrollIndicator = () => {
  const lineRef = useRef(null);

  useEffect(() => {
    const path = lineRef.current;
    if (!path) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const length = path.getTotalLength();
    gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
    const tween = gsap.to(path, { strokeDashoffset: 0, duration: 1.2, ease: 'power3.out', delay: 0.6 });

    return () => tween.kill();
  }, []);

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:block">
      <a href="#about" className="scroll-cue" aria-label="Scroll to about section">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
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

      {/* Photo — absolute, anchored from bottom right */}
      <img
        src={fotoHomeImg}
        alt="Gipsy.Dev"
        loading="eager"
        decoding="async"
        fetchPriority="high"
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
                className="label-lg inline-flex items-center mb-6"
                style={{ color: 'var(--secondary)', gap: 'var(--space-3)' }}
              >
                <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--secondary)' }} />
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
              <h1 className="display" style={{ marginBottom: 'var(--space-6)' }}>
                Hi, I&apos;m <em className="flourish">Gipsy.Dev</em>
              </h1>
              <p className="label" style={{ color: 'var(--outline)', marginBottom: 'var(--space-6)' }}>
                Adam Fairuz Akmal Aryaguna
              </p>
            </GsapReveal>

            <GsapReveal delay={0.6}>
              <p
                className="lede mx-auto lg:mx-0"
                style={{ maxWidth: '540px', marginBottom: 'var(--space-8)' }}
              >
                I build AI-powered automation, full-stack dashboards, and production-ready web systems — from idea to deployment.
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

          {/* Mobile photo — inside flow */}
          <div className="lg:hidden flex justify-center mt-8 pb-8 px-4">
            <img
              src={fotoHomeImg}
        alt="Gipsy.Dev"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        width={1200}
        height={1500}
        className="w-full h-auto max-w-64 object-contain"
              style={{
                filter: 'grayscale(25%) brightness(0.9) contrast(1.05)',
                maskImage: 'linear-gradient(to top, transparent 0%, black 12%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 12%, black 100%)',
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
