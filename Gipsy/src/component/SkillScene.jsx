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
  { name: "React", icon: SiReact, color: "#61DAFB", x: -38, y: -28, z: 0, rot: -8, size: 52 },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", x: -18, y: -32, z: 20, rot: 5, size: 48 },
  { name: "Python", icon: SiPython, color: "#3776AB", x: 5, y: -26, z: -10, rot: -3, size: 50 },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", x: 25, y: -30, z: 15, rot: 7, size: 46 },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", x: 42, y: -24, z: -5, rot: -5, size: 44 },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", x: -35, y: 0, z: 12, rot: 6, size: 40 },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20", x: -12, y: 5, z: -8, rot: -4, size: 42 },
  { name: "Three.js", icon: SiThreedotjs, color: "#FFFFFF", x: 12, y: 2, z: 18, rot: 3, size: 38 },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00", x: 35, y: 4, z: -12, rot: -6, size: 40 },
  { name: "Git", icon: SiGit, color: "#F05032", x: -40, y: 28, z: 8, rot: 4, size: 36 },
  { name: "Docker", icon: SiDocker, color: "#2496ED", x: -18, y: 32, z: -15, rot: -7, size: 38 },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E", x: 8, y: 26, z: 10, rot: 5, size: 36 },
  { name: "n8n", icon: SiN8N, color: "#EA4B71", x: 28, y: 30, z: -8, rot: -3, size: 38 },
  { name: "AI / ML", icon: FaRobot, color: "#FF640F", x: 45, y: 27, z: 12, rot: 8, size: 44 },
];

function FloatingLogo({ skill, mousePos }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const basePos = useRef({ x: skill.x, y: skill.y, z: skill.z });

  useEffect(() => {
    let raf;
    const animate = () => {
      if (!ref.current) return;
      const t = performance.now() * 0.001;

      const floatY = Math.sin(t * 0.8 + skill.x * 0.1) * 8;
      const floatX = Math.cos(t * 0.6 + skill.y * 0.1) * 4;
      const rotY = Math.sin(t * 0.5 + skill.rot) * 15;
      const rotX = Math.cos(t * 0.4 + skill.rot) * 10;

      const mx = mousePos.current.x * 0.08;
      const my = mousePos.current.y * 0.08;

      const scale = hovered ? 1.3 : 1;

      ref.current.style.transform = `
        translate3d(${basePos.current.x + floatX + mx}%, ${basePos.current.y + floatY + my}%, ${basePos.current.z}px)
        rotateY(${skill.rot + rotY}deg)
        rotateX(${rotX}deg)
        scale(${scale})
      `;

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [skill, mousePos, hovered]);

  const Icon = skill.icon;

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: '-30px',
        marginTop: '-30px',
        width: '60px',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transformStyle: 'preserve-3d',
        cursor: 'pointer',
        willChange: 'transform',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon
        style={{
          fontSize: `${skill.size}px`,
          color: skill.color,
          filter: hovered
            ? `drop-shadow(0 0 20px ${skill.color}) drop-shadow(0 0 40px ${skill.color}66)`
            : `drop-shadow(0 0 8px ${skill.color}44)`,
          transition: 'filter 0.4s ease',
        }}
      />
      <span
        style={{
          position: 'absolute',
          bottom: '-24px',
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

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    mousePos.current = { x: x * 100, y: y * 100 };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      style={{
        width: '100%',
        height: '420px',
        position: 'relative',
        perspective: '1200px',
        perspectiveOrigin: '50% 50%',
        overflow: 'visible',
      }}
    >
      {skills.map((skill) => (
        <FloatingLogo key={skill.name} skill={skill} mousePos={mousePos} />
      ))}
    </div>
  );
}
