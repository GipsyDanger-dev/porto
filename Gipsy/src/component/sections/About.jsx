import { useEffect, useRef } from "react";
import { GsapReveal, GsapStagger } from "../GsapReveal";

const skills = [
  { name: "React", level: 90 },
  { name: "JavaScript", level: 88 },
  { name: "Tailwind CSS", level: 92 },
  { name: "Python", level: 80 },
  { name: "Laravel", level: 78 },
  { name: "Java", level: 70 },
  { name: "Premiere Pro", level: 85 },
  { name: "After Effects", level: 75 },
  { name: "Dart / Flutter", level: 65 },
  { name: "TensorFlow", level: 60 },
];

const educationData = [
  { date: "2024 - 2026", title: "Associate Degree in Information Technology", institution: "Brawijaya University" },
  { date: "2021 - 2024", title: "Mathematics and Natural Sciences", institution: "State Senior High School 3 of Cilacap" },
];

const experienceData = [
  { date: "2025 - 2026", title: "Staff Expert of Research and Technology", institution: "HMPSTI Brawijaya University" },
  { date: "2024", title: "Editor & Script Assistant", institution: "State Senior High School 3 of Cilacap" },
];

const SkillBar = ({ name, level }) => {
  const barRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.width = `${level}%`;
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div>
      <div className="flex justify-between mb-1">
        <span style={{ fontFamily: 'var(--sans)', fontSize: '14px', color: 'var(--on-surface)' }}>{name}</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--outline)' }}>{level}%</span>
      </div>
      <div className="skill-track" style={{ height: '1px', background: 'var(--outline-variant)', position: 'relative' }}>
        <div
          ref={barRef}
          style={{
            height: '1px',
            background: 'var(--secondary)',
            width: 0,
            transition: 'width 1.4s cubic-bezier(0.4,0,0.2,1)',
          }}
        />
      </div>
    </div>
  );
};

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
              <p style={{ fontFamily: 'var(--sans)', fontSize: '18px', lineHeight: '28px', color: 'var(--on-surface-variant)' }}>
                I&apos;m Adam — a full stack developer, video editor, and blockchain enthusiast. I enjoy the process from writing code to editing footage. Open for collaboration and new projects, let&apos;s connect.
              </p>
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
          <GsapReveal delay={0.3}>
            <div>
              <h3 style={{ fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '32px' }}>
                Arsenal
              </h3>
              <GsapStagger className="grid gap-6" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(280px, 100%), 1fr))' }} stagger={0.08}>
                {skills.map((skill) => (
                  <SkillBar key={skill.name} {...skill} />
                ))}
              </GsapStagger>
            </div>
          </GsapReveal>
        </div>
      </div>
    </section>
  );
};
