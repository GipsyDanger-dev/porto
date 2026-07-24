import { useState, useRef, useEffect } from 'react';
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
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20" },
  { name: "Three.js", icon: SiThreedotjs, color: "#FFFFFF" },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "n8n", icon: SiN8N, color: "#EA4B71" },
  { name: "AI / ML", icon: FaRobot, color: "#FF640F" },
];

const SkillCard = ({ skill, index }) => {
  const cardRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const animFrameRef = useRef(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), index * 60);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  useEffect(() => {
    if (!isHovered) {
      targetRotation.current = { x: 0, y: 0 };
    }

    const animate = () => {
      setRotation(prev => ({
        x: prev.x + (targetRotation.current.x - prev.x) * 0.1,
        y: prev.y + (targetRotation.current.y - prev.y) * 0.1,
      }));
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isHovered]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    targetRotation.current = {
      x: ((y - centerY) / centerY) * -25,
      y: ((x - centerX) / centerX) * 25,
    };
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    targetRotation.current = { x: 0, y: 0 };
  };

  const Icon = skill.icon;

  return (
    <div
      ref={cardRef}
      style={{
        perspective: '800px',
        cursor: 'pointer',
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        style={{
          width: '80px',
          height: '80px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) ${isHovered ? 'translateZ(20px)' : 'translateZ(0)'}`,
          transformStyle: 'preserve-3d',
          transition: 'transform 0.1s ease-out, opacity 0.6s ease, box-shadow 0.4s ease',
          opacity: isVisible ? 1 : 0,
          boxShadow: isHovered
            ? `0 20px 40px ${skill.color}33, 0 0 60px ${skill.color}22`
            : 'none',
        }}
      >
        {/* Front face */}
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(20px)',
          }}
        >
          <Icon
            style={{
              fontSize: isHovered ? '48px' : '40px',
              color: skill.color,
              filter: isHovered
                ? `drop-shadow(0 0 20px ${skill.color}) drop-shadow(0 0 40px ${skill.color}88)`
                : `drop-shadow(0 0 8px ${skill.color}44)`,
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          />
        </div>

        {/* Shadow layer */}
        <div
          style={{
            position: 'absolute',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: `radial-gradient(circle, ${skill.color}22 0%, transparent 70%)`,
            transform: 'translateZ(-30px) translateY(20px)',
            filter: 'blur(10px)',
            opacity: isHovered ? 0.8 : 0,
            transition: 'opacity 0.4s ease',
          }}
        />
      </div>

      {/* Name label */}
      <div
        style={{
          textAlign: 'center',
          marginTop: '12px',
          opacity: isHovered ? 1 : 0.5,
          transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
          transition: 'all 0.3s ease',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '9px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: isHovered ? skill.color : 'var(--outline)',
          }}
        >
          {skill.name}
        </span>
      </div>
    </div>
  );
};

export default function Skill3D({ onHoverSkill, onUnhoverSkill }) {
  const handleMouseEnter = (name) => onHoverSkill?.(name);
  const handleMouseLeave = () => onUnhoverSkill?.();

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '24px 32px',
        padding: '20px 0',
      }}
    >
      {skills.map((skill, i) => (
        <div
          key={skill.name}
          onMouseEnter={() => handleMouseEnter(skill.name)}
          onMouseLeave={handleMouseLeave}
        >
          <SkillCard skill={skill} index={i} />
        </div>
      ))}
    </div>
  );
}
