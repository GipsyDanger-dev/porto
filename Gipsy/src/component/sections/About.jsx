import { useEffect, useRef } from "react";
import { GsapReveal, GsapStagger } from "../GsapReveal";
import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiPython,
  SiLaravel,
  SiNodedotjs,
  SiThreedotjs,
  SiTensorflow,
  SiDocker,
  SiSupabase,
  SiGit,
  SiTypescript,
  SiN8N,
} from "react-icons/si";
import { FaRobot } from "react-icons/fa";

const skills = [
  { name: "React", icon: SiReact, color: "#61DAFB", size: 42, rotate: -5, offsetY: 0 },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", size: 38, rotate: 3, offsetY: 12 },
  { name: "Python", icon: SiPython, color: "#3776AB", size: 40, rotate: -2, offsetY: -8 },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", size: 28, rotate: 8, offsetY: 20 },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", size: 26, rotate: -6, offsetY: 5 },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", size: 36, rotate: 4, offsetY: -15 },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20", size: 30, rotate: -8, offsetY: 8 },
  { name: "Three.js", icon: SiThreedotjs, color: "#FFFFFF", size: 28, rotate: 5, offsetY: -5 },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00", size: 27, rotate: -3, offsetY: 18 },
  { name: "Git", icon: SiGit, color: "#F05032", size: 24, rotate: 7, offsetY: -10 },
  { name: "Docker", icon: SiDocker, color: "#2496ED", size: 26, rotate: -4, offsetY: 12 },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E", size: 25, rotate: 6, offsetY: -8 },
  { name: "n8n", icon: SiN8N, color: "#EA4B71", size: 28, rotate: -7, offsetY: 5 },
  { name: "AI / ML", icon: FaRobot, color: "#FF640F", size: 34, rotate: 2, offsetY: -12 },
];

const educationData = [
  { date: "2024 - 2026", title: "Associate Degree in Information Technology", institution: "Brawijaya University" },
  { date: "2021 - 2024", title: "Mathematics and Natural Sciences", institution: "State Senior High School 3 of Cilacap" },
];

const experienceData = [
  { date: "2025 - 2026", title: "Staff Expert of Research and Technology", institution: "HMPSTI Brawijaya University" },
  { date: "2024", title: "Editor & Script Assistant", institution: "State Senior High School 3 of Cilacap" },
];

const SkillIcon = ({ name, icon: Icon, color, delay, size = 32, rotate = 0, offsetY = 0 }) => {
  const iconRef = useRef(null);

  useEffect(() => {
    const el = iconRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = `translateY(0) rotate(0deg) scale(1)`;
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={iconRef}
      className="group"
      style={{
        opacity: 0,
        transform: `translateY(30px) rotate(${rotate}deg) scale(0.7)`,
        transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
        cursor: 'default',
        position: 'relative',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: `translateY(${offsetY}px)`,
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = `translateY(${offsetY - 8}px) scale(1.1)`;
          e.currentTarget.style.filter = `drop-shadow(0 12px 24px ${color}33)`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = `translateY(${offsetY}px) scale(1)`;
          e.currentTarget.style.filter = 'none';
        }}
      >
        <div style={{ color: color, fontSize: `${size}px`, lineHeight: 1 }}>
          {Icon && <Icon />}
        </div>
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '8px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--outline)',
            textAlign: 'center',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            whiteSpace: 'nowrap',
          }}
        >
          {name}
        </span>
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
          <GsapReveal delay={0.3}>
            <div>
              <h3 style={{ fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '56px' }}>
                Arsenal
              </h3>

              {/* Organic scattered layout */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '32px 40px',
                  padding: '20px 0',
                  position: 'relative',
                }}
              >
                {skills.map((skill, i) => {
                  const margins = [
                    { marginLeft: '0', marginRight: '12px' },
                    { marginLeft: '24px', marginRight: '0' },
                    { marginLeft: '8px', marginRight: '20px' },
                    { marginLeft: '32px', marginRight: '4px' },
                    { marginLeft: '-8px', marginRight: '16px' },
                    { marginLeft: '16px', marginRight: '8px' },
                    { marginLeft: '-4px', marginRight: '24px' },
                    { marginLeft: '20px', marginRight: '-4px' },
                  ];
                  const m = margins[i % margins.length];

                  return (
                    <div key={skill.name} style={{ ...m }}>
                      <SkillIcon {...skill} delay={i * 0.07} />
                    </div>
                  );
                })}
              </div>

              {/* Subtle decorative line */}
              <div
                style={{
                  width: '60px',
                  height: '1px',
                  background: 'linear-gradient(90deg, transparent, var(--secondary), transparent)',
                  margin: '48px auto 0',
                  opacity: 0.5,
                }}
              />
            </div>
          </GsapReveal>
        </div>
      </div>
    </section>
  );
};
