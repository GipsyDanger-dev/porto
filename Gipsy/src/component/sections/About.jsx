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
} from "react-icons/si";
import { FaRobot } from "react-icons/fa";
import { TbAutomation } from "react-icons/tb";

const skills = [
  { name: "React", icon: SiReact, color: "#61DAFB", featured: true },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", featured: true },
  { name: "Python", icon: SiPython, color: "#3776AB", featured: true },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", featured: false },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", featured: false },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", featured: true },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20", featured: false },
  { name: "Three.js", icon: SiThreedotjs, color: "#FFFFFF", featured: false },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00", featured: false },
  { name: "Git", icon: SiGit, color: "#F05032", featured: false },
  { name: "Docker", icon: SiDocker, color: "#2496ED", featured: false },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E", featured: false },
  { name: "n8n", icon: TbAutomation, color: "#EA4B71", featured: false },
  { name: "AI / ML", icon: FaRobot, color: "#FF640F", featured: true },
];

const educationData = [
  { date: "2024 - 2026", title: "Associate Degree in Information Technology", institution: "Brawijaya University" },
  { date: "2021 - 2024", title: "Mathematics and Natural Sciences", institution: "State Senior High School 3 of Cilacap" },
];

const experienceData = [
  { date: "2025 - 2026", title: "Staff Expert of Research and Technology", institution: "HMPSTI Brawijaya University" },
  { date: "2024", title: "Editor & Script Assistant", institution: "State Senior High School 3 of Cilacap" },
];

const SkillIcon = ({ name, icon: Icon, color, delay, featured }) => {
  const iconRef = useRef(null);

  useEffect(() => {
    const el = iconRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0) scale(1)';
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const size = featured ? 40 : 26;

  return (
    <div
      ref={iconRef}
      className="group flex flex-col items-center"
      style={{
        opacity: 0,
        transform: 'translateY(24px) scale(0.8)',
        transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
        cursor: 'default',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-6px) scale(1.2)';
          e.currentTarget.style.filter = `drop-shadow(0 8px 16px ${color}44)`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.filter = 'none';
        }}
      >
        <div style={{ color: color, fontSize: `${size}px`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {Icon && <Icon />}
        </div>
      </div>
      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize: featured ? '9px' : '8px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--outline)',
          textAlign: 'center',
          transition: 'color 0.3s ease',
          marginTop: '6px',
          opacity: featured ? 1 : 0.7,
        }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--on-surface)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--outline)'}
      >
        {name}
      </span>
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
              <h3 style={{ fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '48px' }}>
                Arsenal
              </h3>

              {/* Featured Row - larger icons */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '48px',
                  marginBottom: '48px',
                  paddingBottom: '40px',
                  borderBottom: '1px solid var(--outline-variant)',
                }}
              >
                {skills.filter(s => s.featured).map((skill, i) => (
                  <SkillIcon key={skill.name} {...skill} delay={i * 0.1} />
                ))}
              </div>

              {/* Secondary Row - smaller icons, scattered */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: '36px 44px',
                  paddingTop: '8px',
                }}
              >
                {skills.filter(s => !s.featured).map((skill, i) => (
                  <div
                    key={skill.name}
                    style={{
                      transform: `translateY(${i % 2 === 0 ? '0' : '12px'})`,
                    }}
                  >
                    <SkillIcon {...skill} delay={0.4 + i * 0.06} />
                  </div>
                ))}
              </div>
            </div>
          </GsapReveal>
        </div>
      </div>
    </section>
  );
};
