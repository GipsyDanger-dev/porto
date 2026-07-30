import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
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
  SiClaude,
} from "react-icons/si";

const skills = [
  { name: "React", icon: SiReact, color: "#61DAFB", col: 0, row: 0, size: 48 },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", col: 1, row: 0, size: 46 },
  { name: "Python", icon: SiPython, color: "#306998", col: 2, row: 0, size: 48 },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", col: 3, row: 0, size: 44 },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", col: 4, row: 0, size: 42 },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", col: 0, row: 1, size: 40 },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20", col: 1, row: 1, size: 42 },
  { name: "Three.js", icon: SiThreedotjs, color: "#FFFFFF", col: 2, row: 1, size: 38 },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00", col: 3, row: 1, size: 40 },
  { name: "Git", icon: SiGit, color: "#F05032", col: 4, row: 1, size: 36 },
  { name: "Docker", icon: SiDocker, color: "#2496ED", col: 0.5, row: 2, size: 38 },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E", col: 1.5, row: 2, size: 36 },
  { name: "n8n", icon: SiN8N, color: "#EA4B71", col: 2.5, row: 2, size: 38 },
  { name: "Claude", icon: SiClaude, color: "#D97757", col: 3.5, row: 2, size: 42 },
];

function FloatingLogo({ skill, setRef, containerWidth, containerHeight }) {
  const [hovered, setHovered] = useState(false);

  const cols = 5;
  const rows = 3;
  const spacingX = containerWidth / (cols + 0.5);
  const spacingY = containerHeight / (rows + 0.5);
  const offsetX = spacingX * 0.25;

  const baseX = spacingX * (skill.col + 0.5) + offsetX;
  const baseY = spacingY * (skill.row + 0.5);

  const Icon = skill.icon;

  return (
    <div
      ref={setRef}
      style={{
        position: 'absolute',
        left: `${baseX}px`,
        top: `${baseY}px`,
        // gsap owns opacity + the centering transform (see SkillScene effect)
        // so it can reveal each logo one by one and scale it without React
        // re-renders (hover/zIndex) stomping the animated values.
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        zIndex: hovered ? 10 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon
        style={{
          fontSize: `${skill.size}px`,
          color: skill.color,
          filter: hovered
            ? `drop-shadow(0 0 16px ${skill.color}) drop-shadow(0 0 32px ${skill.color}55)`
            : `drop-shadow(0 0 6px ${skill.color}44)`,
          transition: 'all 0.4s ease',
          transform: hovered ? 'scale(1.2)' : 'scale(1)',
        }}
      />
      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '9px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: hovered ? skill.color : 'var(--outline)',
          opacity: hovered ? 1 : 0.5,
          transition: 'all 0.3s ease',
          whiteSpace: 'nowrap',
        }}
      >
        {skill.name}
      </span>
    </div>
  );
}

export default function SkillScene() {
  const containerRef = useRef();
  const logoRefs = useRef([]);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Entrance: reveal each logo one by one (stagger), triggered when the
  // arsenal scrolls into view. Not a single global fade over the whole block.
  // useLayoutEffect sets the hidden state before paint → no flash of visible logos.
  useLayoutEffect(() => {
    const els = logoRefs.current.filter(Boolean);
    if (!els.length) return;

    // gsap owns the centering transform so scale animates without breaking it.
    gsap.set(els, { xPercent: -50, yPercent: -50 });

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set(els, { opacity: 1, scale: 1 });
      return;
    }

    gsap.set(els, { opacity: 0, scale: 0.4 });

    let played = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played) {
          played = true;
          gsap.to(els, {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.09, // each logo animates one after another
            ease: 'back.out(1.7)',
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '400px',
        position: 'relative',
      }}
    >
      {skills.map((skill, i) => (
        <FloatingLogo
          key={skill.name}
          skill={skill}
          setRef={(el) => { logoRefs.current[i] = el; }}
          containerWidth={dimensions.width}
          containerHeight={dimensions.height}
        />
      ))}
    </div>
  );
}
