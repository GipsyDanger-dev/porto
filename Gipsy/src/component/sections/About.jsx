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

const SkillBar = ({ name, level, icon: Icon, color }) => {
  const barRef = useRef(null);
  const iconRef = useRef(null);

  useEffect(() => {
    const el = barRef.current;
    const icon = iconRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.width = `${level}%`;
          if (icon) {
            icon.style.opacity = '1';
            icon.style.transform = 'scale(1) rotate(0deg)';
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [level]);

  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2.5">
          <div
            ref={iconRef}
            style={{
              opacity: 0,
              transform: 'scale(0.5) rotate(-180deg)',
              transition: 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
              color: color,
              fontSize: '18px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {Icon && <Icon />}
          </div>
          <span style={{ fontFamily: 'var(--sans)', fontSize: '14px', color: 'var(--on-surface)' }}>{name}</span>
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--outline)' }}>{level}%</span>
      </div>
      <div className="skill-track" style={{ height: '2px', background: 'var(--outline-variant)', position: 'relative', borderRadius: '1px' }}>
        <div
          ref={barRef}
          style={{
            height: '2px',
            background: `linear-gradient(90deg, ${color}88, ${color})`,
            width: 0,
            transition: 'width 1.4s cubic-bezier(0.4,0,0.2,1)',
            borderRadius: '1px',
            boxShadow: `0 0 8px ${color}44`,
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
              <p style={{ fontFamily: 'var(--sans)', fontSize: '18px', lineHeight: '28px', color: 'var(--on-surface-variant)', marginBottom: '28px' }}>
                I&apos;m Adam — a full stack developer, video editor, and blockchain enthusiast. I enjoy the process from writing code to editing footage. Open for collaboration and new projects, let&apos;s connect.
              </p>
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
              <GsapStagger className="grid gap-5" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))' }} stagger={0.06}>
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
