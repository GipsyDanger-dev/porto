import { useRef, useState, useEffect, useCallback } from 'react';
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
  { name: "React", icon: SiReact, color: "#61DAFB", col: 0, row: 0, size: 52 },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", col: 1, row: 0, size: 50 },
  { name: "Python", icon: SiPython, color: "#3776AB", col: 2, row: 0, size: 52 },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", col: 3, row: 0, size: 48 },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", col: 4, row: 0, size: 46 },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", col: 0.5, row: 1, size: 42 },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20", col: 1.5, row: 1, size: 44 },
  { name: "Three.js", icon: SiThreedotjs, color: "#FFFFFF", col: 2.5, row: 1, size: 40 },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00", col: 3.5, row: 1, size: 42 },
  { name: "Git", icon: SiGit, color: "#F05032", col: 0, row: 2, size: 38 },
  { name: "Docker", icon: SiDocker, color: "#2496ED", col: 1, row: 2, size: 40 },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E", col: 2, row: 2, size: 38 },
  { name: "n8n", icon: SiN8N, color: "#EA4B71", col: 3, row: 2, size: 40 },
  { name: "AI / ML", icon: FaRobot, color: "#FF640F", col: 4, row: 2, size: 46 },
];

function FloatingLogo({ skill, mousePos, containerWidth, containerHeight }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const animRef = useRef(null);

  const cols = 5;
  const rows = 3;
  const spacingX = containerWidth / (cols + 1);
  const spacingY = containerHeight / (rows + 1);

  const baseX = spacingX * (skill.col + 1);
  const baseY = spacingY * (skill.row + 1);
  const zOffset = Math.sin(skill.col + skill.row) * 30;

  useEffect(() => {
    const animate = () => {
      if (!ref.current) return;
      const t = performance.now() * 0.001;

      const floatY = Math.sin(t * 0.7 + skill.col * 2) * 12;
      const floatX = Math.cos(t * 0.5 + skill.row * 2) * 6;
      const rotY = Math.sin(t * 0.4 + skill.col) * 20;
      const rotX = Math.cos(t * 0.3 + skill.row) * 15;

      const mx = mousePos.current.x * 0.05;
      const my = mousePos.current.y * 0.05;

      const scale = hovered ? 1.35 : 1;

      ref.current.style.transform = `
        translate(${floatX + mx}px, ${floatY + my}px)
        perspective(800px)
        rotateY(${rotY}deg)
        rotateX(${rotX}deg)
        scale(${scale})
      `;

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [skill, mousePos, hovered]);

  const Icon = skill.icon;

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: `${baseX}px`,
        top: `${baseY}px`,
        transform: `translateZ(${zOffset}px)`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        willChange: 'transform',
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
            ? `drop-shadow(0 0 24px ${skill.color}) drop-shadow(0 0 48px ${skill.color}66)`
            : `drop-shadow(0 0 10px ${skill.color}55)`,
          transition: 'filter 0.4s ease',
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
          textShadow: hovered ? `0 0 12px ${skill.color}88` : 'none',
        }}
      >
        {skill.name}
      </span>
    </div>
  );
}

export default function SkillScene() {
  const containerRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 900, height: 420 });

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

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mousePos.current = {
      x: e.clientX - rect.left - rect.width / 2,
      y: e.clientY - rect.top - rect.height / 2,
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        width: '100%',
        height: '420px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {skills.map((skill) => (
        <FloatingLogo
          key={skill.name}
          skill={skill}
          mousePos={mousePos}
          containerWidth={dimensions.width}
          containerHeight={dimensions.height}
        />
      ))}
    </div>
  );
}
