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
  { name: "AI / ML", icon: FaRobot, color: "#FF640F", col: 3.5, row: 2, size: 42 },
];

function FloatingLogo({ skill, mousePos, containerWidth, containerHeight }) {
  const ref = useRef();
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
      ref={ref}
      style={{
        position: 'absolute',
        left: `${baseX}px`,
        top: `${baseY}px`,
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        cursor: 'pointer',
        zIndex: hovered ? 10 : 1,
        transition: 'transform 0.3s ease',
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

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '400px',
        position: 'relative',
      }}
    >
      {skills.map((skill) => (
        <FloatingLogo
          key={skill.name}
          skill={skill}
          mousePos={{ current: { x: 0, y: 0 } }}
          containerWidth={dimensions.width}
          containerHeight={dimensions.height}
        />
      ))}
    </div>
  );
}
