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
  { name: "React", level: 92, icon: SiReact, color: "#61DAFB" },
  { name: "JavaScript", level: 90, icon: SiJavascript, color: "#F7DF1E" },
  { name: "TypeScript", level: 78, icon: SiTypescript, color: "#3178C6" },
  { name: "Python", level: 85, icon: SiPython, color: "#3776AB" },
  { name: "Node.js", level: 82, icon: SiNodedotjs, color: "#339933" },
  { name: "Laravel", level: 80, icon: SiLaravel, color: "#FF2D20" },
  { name: "Tailwind CSS", level: 93, icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Three.js", level: 70, icon: SiThreedotjs, color: "#FFFFFF" },
  { name: "TensorFlow", level: 65, icon: SiTensorflow, color: "#FF6F00" },
  { name: "Docker", level: 72, icon: SiDocker, color: "#2496ED" },
  { name: "Supabase", level: 75, icon: SiSupabase, color: "#3ECF8E" },
  { name: "Git", level: 88, icon: SiGit, color: "#F05032" },
  { name: "n8n / Automation", level: 70, icon: TbAutomation, color: "#EA4B71" },
  { name: "AI / ML", level: 78, icon: FaRobot, color: "#FF640F" },
];

const educationData = [
  { date: "2024 - 2026", title: "Associate Degree in Information Technology", institution: "Brawijaya University" },
  { date: "2021 - 2024", title: "Mathematics and Natural Sciences", institution: "State Senior High School 3 of Cilacap" },
];

const experienceData = [
  { date: "2025 - 2026", title: "Staff Expert of Research and Technology", institution: "HMPSTI Brawijaya University" },
  { date: "2024", title: "Editor & Script Assistant", institution: "State Senior High School 3 of Cilacap" },
];

const SkillIcon = ({ name, icon: Icon, color, delay }) => {
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

  return (
    <div
      ref={iconRef}
      className="group flex flex-col items-center gap-3"
      style={{
        opacity: 0,
        transform: 'translateY(20px) scale(0.8)',
        transition: `all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${delay}s`,
        cursor: 'default',
      }}
    >
      <div
        style={{
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = 'translateY(-4px) scale(1.15)';
          e.currentTarget.style.filter = `drop-shadow(0 0 12px ${color}66)`;
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.filter = 'none';
        }}
      >
        <div style={{ color: color, fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {Icon && <Icon />}
        </div>
      </div>
      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '9px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--outline)',
          textAlign: 'center',
          transition: 'color 0.3s ease',
          marginTop: '-4px',
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
              <h3 style={{ fontFamily: 'var(--mono)', fontSize: '11px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--secondary)', marginBottom: '40px' }}>
                Arsenal
              </h3>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
                  gap: '32px 24px',
                  justifyItems: 'center',
                }}
              >
                {skills.map((skill, i) => (
                  <SkillIcon key={skill.name} {...skill} delay={i * 0.05} />
                ))}
              </div>
            </div>
          </GsapReveal>
        </div>
      </div>
    </section>
  );
};
