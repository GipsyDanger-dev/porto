/* eslint-disable react/no-unknown-property */
import { useRef, useState, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html, Trail } from '@react-three/drei';
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
  { name: "React", icon: SiReact, color: "#61DAFB", pos: [-3.2, 1.2, 0] },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", pos: [-1.6, 1.5, -0.5] },
  { name: "Python", icon: SiPython, color: "#3776AB", pos: [0.2, 1.1, 0.3] },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", pos: [1.8, 1.4, -0.2] },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", pos: [3.2, 1.0, 0.1] },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", pos: [-2.6, -0.1, 0.2] },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20", pos: [-0.8, -0.3, -0.3] },
  { name: "Three.js", icon: SiThreedotjs, color: "#FFFFFF", pos: [1.0, 0.0, 0.4] },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00", pos: [2.8, -0.2, -0.1] },
  { name: "Git", icon: SiGit, color: "#F05032", pos: [-3.0, -1.3, 0.1] },
  { name: "Docker", icon: SiDocker, color: "#2496ED", pos: [-1.2, -1.5, -0.2] },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E", pos: [0.6, -1.2, 0.3] },
  { name: "n8n", icon: SiN8N, color: "#EA4B71", pos: [2.2, -1.4, -0.1] },
  { name: "AI / ML", icon: FaRobot, color: "#FF640F", pos: [3.6, -1.1, 0.2] },
];

function LogoIcon({ skill, onHover, onUnhover }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [scale, setScale] = useState(1);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    meshRef.current.rotation.y = Math.sin(t * 0.5 + skill.pos[0]) * 0.15;
    meshRef.current.rotation.x = Math.cos(t * 0.3 + skill.pos[1]) * 0.1;

    const targetScale = hovered ? 1.4 : 1;
    setScale(prev => prev + (targetScale - prev) * 0.1);
  });

  const handlePointerOver = useCallback((e) => {
    e.stopPropagation();
    setHovered(true);
    onHover?.(skill.name);
    document.body.style.cursor = 'pointer';
  }, [skill.name, onHover]);

  const handlePointerOut = useCallback(() => {
    setHovered(false);
    onUnhover?.();
    document.body.style.cursor = 'default';
  }, [onUnhover]);

  const Icon = skill.icon;

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.8}>
      <Trail
        width={0.6}
        length={6}
        color={skill.color}
        attenuation={(w) => w * w}
      >
        <group
          ref={meshRef}
          position={skill.pos}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          scale={scale}
        >
          <Html
            transform
            distanceFactor={8}
            style={{
              transition: 'all 0.3s ease',
              filter: hovered
                ? `drop-shadow(0 0 25px ${skill.color}) drop-shadow(0 0 50px ${skill.color}88)`
                : `drop-shadow(0 0 10px ${skill.color}66)`,
              pointerEvents: 'none',
            }}
          >
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '8px',
              pointerEvents: 'auto',
            }}>
              <Icon
                style={{
                  fontSize: '42px',
                  color: skill.color,
                  transition: 'all 0.3s ease',
                }}
              />
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '10px',
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: hovered ? skill.color : 'rgba(255,255,255,0.5)',
                  textShadow: hovered ? `0 0 10px ${skill.color}` : 'none',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap',
                  opacity: hovered ? 1 : 0.6,
                  transform: hovered ? 'translateY(4px)' : 'translateY(0)',
                }}
              >
                {skill.name}
              </span>
            </div>
          </Html>
        </group>
      </Trail>
    </Float>
  );
}

function Scene({ onHover, onUnhover }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[-10, 10, 10]} intensity={0.8} color="#f2640f" />
      <pointLight position={[10, -10, 5]} intensity={0.4} color="#61DAFB" />

      {skills.map((skill) => (
        <LogoIcon
          key={skill.name}
          skill={skill}
          onHover={onHover}
          onUnhover={onUnhover}
        />
      ))}
    </>
  );
}

export default function SkillScene({ onHoverSkill, onUnhoverSkill }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 7], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Scene onHover={onHoverSkill} onUnhover={onUnhoverSkill} />
      </Suspense>
    </Canvas>
  );
}
