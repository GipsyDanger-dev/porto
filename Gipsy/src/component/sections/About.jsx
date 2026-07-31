import { Suspense, lazy } from "react";
import { GsapReveal, GsapStagger } from "../GsapReveal";

const SkillScene = lazy(() => import("../SkillScene"));

const educationData = [
  { date: "2024 - 2026", title: "Associate Degree in Information Technology", institution: "Brawijaya University" },
  { date: "2021 - 2024", title: "Mathematics and Natural Sciences", institution: "State Senior High School 3 of Cilacap" },
];

const experienceData = [
  { date: "2025 - 2026", title: "Staff Expert of Research and Technology", institution: "HMPSTI Brawijaya University" },
  { date: "2024", title: "Editor & Script Assistant", institution: "State Senior High School 3 of Cilacap" },
];

const TimelineItem = ({ date, title, institution }) => (
  <div className="relative pl-6 group" style={{ borderLeft: '1px solid var(--outline-variant)' }}>
    <div
      className="absolute left-0 top-1 w-2 h-2 translate-x-[-4.5px]"
      style={{ background: 'var(--secondary)', borderRadius: 0 }}
    />
    <p style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--outline)', marginBottom: '4px', letterSpacing: '0.05em' }}>
      {date}
    </p>
    <h4 style={{ fontFamily: 'var(--serif)', fontSize: '16px', fontWeight: 700, color: 'var(--on-surface)', marginBottom: '2px' }}>
      {title}
    </h4>
    <p style={{ fontFamily: 'var(--sans)', fontSize: '14px', color: 'var(--on-surface-variant)' }}>
      {institution}
    </p>
  </div>
);

export const About = () => {
  return (
    <section id="about" style={{ padding: 'var(--section-gap) 0' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="grid gap-16 lg:gap-24" style={{ gridTemplateColumns: '1fr' }}>
          {/* Bio */}
          <GsapReveal>
            <div className="max-w-3xl">
              <div className="section-label">About</div>
              <h2
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(36px, 5vw, 52px)',
                  fontWeight: 700,
                  letterSpacing: '-0.015em',
                  color: 'var(--on-surface)',
                  marginBottom: '32px',
                }}
              >
                Craft <em style={{ fontStyle: 'italic', color: 'var(--on-surface-variant)' }}>&amp; Code</em>
              </h2>
              <p style={{ fontFamily: 'var(--sans)', fontSize: '18px', lineHeight: '28px', color: 'var(--on-surface-variant)', marginBottom: '28px' }}>
                I&apos;m Adam — a full stack developer, video editor, and blockchain enthusiast. I enjoy the process from writing code to editing footage. Open for collaboration and new projects, let&apos;s connect.
              </p>
              <a
                href="#contact"
                className="btn-outline"
              >
                Get In Touch
              </a>
            </div>
          </GsapReveal>

          {/* Timeline */}
          <GsapReveal delay={0.2}>
            <div className="grid gap-16 lg:gap-24" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '24px' }}>
                  Education
                </h3>
                <GsapStagger className="space-y-8" stagger={0.15}>
                  {educationData.map((item, i) => (
                    <TimelineItem key={i} {...item} />
                  ))}
                </GsapStagger>
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '24px' }}>
                  Experience
                </h3>
                <GsapStagger className="space-y-8" stagger={0.15}>
                  {experienceData.map((item, i) => (
                    <TimelineItem key={i} {...item} />
                  ))}
                </GsapStagger>
              </div>
            </div>
          </GsapReveal>

          {/* Skills */}
          <div>
            <GsapReveal delay={0.3}>
              <h3 style={{ fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '24px' }}>
                Arsenal
              </h3>
            </GsapReveal>

            {/* 3D Interactive Skills — each logo animates in one by one */}
            <div
              style={{
                width: '100%',
                height: '560px',
                position: 'relative',
              }}
            >
              <Suspense fallback={
                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--outline)' }}>Loading 3D...</span>
                </div>
              }>
                <SkillScene />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
