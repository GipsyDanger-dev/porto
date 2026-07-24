/* eslint-disable react/no-unknown-property */
import { useRef, useState, useEffect, useCallback, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, useGLTF, Html } from '@react-three/drei';
import {
  SiJavascript,
  SiTailwindcss,
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

// 3D Model logos
const modelLogos = [
  { name: "React", path: "/models/react.glb", color: "#61DAFB", pos: [-5, 2, 0], scale: 0.8 },
  { name: "Python", path: "/models/python.glb", color: "#3776AB", pos: [0, 2.2, -0.5], scale: 0.6 },
];

// Icon logos (fallback until 3D models are ready)
const iconLogos = [
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E", pos: [-3, 2.5, 0.5], size: 48 },
  { name: "Tailwind", icon: SiTailwindcss, color: "#06B6D4", pos: [3, 2.3, -0.3], size: 44 },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933", pos: [5, 2, 0.2], size: 46 },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6", pos: [-4.5, 0, 0.3], size: 42 },
  { name: "Laravel", icon: SiLaravel, color: "#FF2D20", pos: [-1.5, 0.3, -0.2], size: 44 },
  { name: "Three.js", icon: SiThreedotjs, color: "#FFFFFF", pos: [1.5, 0.1, 0.4], size: 40 },
  { name: "TensorFlow", icon: SiTensorflow, color: "#FF6F00", pos: [4.5, -0.2, -0.1], size: 42 },
  { name: "Git", icon: SiGit, color: "#F05032", pos: [-5, -2, 0.2], size: 38 },
  { name: "Docker", icon: SiDocker, color: "#2496ED", pos: [-2, -2.3, -0.4], size: 40 },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E", pos: [1, -2.1, 0.3], size: 38 },
  { name: "n8n", icon: SiN8N, color: "#EA4B71", pos: [3.5, -2.4, -0.2], size: 40 },
  { name: "AI / ML", icon: FaRobot, color: "#FF640F", pos: [5.5, -2, 0.1], size: 44 },
];

function Model3D({ logo, mousePos }) {
  const groupRef = useRef();
  const { scene } = useGLTF(logo.path);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();

    groupRef.current.rotation.y = t * 0.3;
    groupRef.current.rotation.x = Math.sin(t * 0.5) * 0.1;

    const mx = mousePos.current.x * 0.05;
    const my = mousePos.current.y * 0.05;
    groupRef.current.position.x = logo.pos[0] + mx;
    groupRef.current.position.y = logo.pos[1] + my;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.1} floatIntensity={0.3}>
      <group
        ref={groupRef}
        position={logo.pos}
        scale={hovered ? logo.scale * 1.3 : logo.scale}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'default';
        }}
      >
        <primitive object={scene.clone()} />
        <pointLight
          position={[0, 0, 2]}
          intensity={hovered ? 3 : 1}
          color={logo.color}
          distance={4}
        />
        <Html center style={{ pointerEvents: 'none' }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: logo.color,
              textShadow: `0 0 10px ${logo.color}`,
              opacity: hovered ? 1 : 0,
              transition: 'opacity 0.3s ease',
              whiteSpace: 'nowrap',
            }}
          >
            {logo.name}
          </span>
        </Html>
      </group>
    </Float>
  );
}

function Icon3D({ logo, mousePos }) {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const animRef = useRef(null);

  useEffect(() => {
    const animate = () => {
      if (!ref.current) return;
      const t = performance.now() * 0.001;

      const floatY = Math.sin(t * 0.7 + logo.pos[0]) * 10;
      const floatX = Math.cos(t * 0.5 + logo.pos[1]) * 5;
      const rotY = Math.sin(t * 0.4 + logo.pos[0]) * 20;
      const rotX = Math.cos(t * 0.3 + logo.pos[1]) * 15;

      const mx = mousePos.current.x * 0.04;
      const my = mousePos.current.y * 0.04;

      const scale = hovered ? 1.3 : 1;

      ref.current.style.transform = `
        translate3d(${logo.pos[0] * 80 + floatX + mx}px, ${logo.pos[1] * 80 + floatY + my}px, ${logo.pos[2] * 50}px)
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
  }, [logo, mousePos, hovered]);

  const Icon = logo.icon;

  return (
    <div
      ref={ref}
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        marginLeft: '-25px',
        marginTop: '-25px',
        width: '50px',
        height: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
        cursor: 'pointer',
        willChange: 'transform',
        zIndex: hovered ? 10 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Icon
        style={{
          fontSize: `${logo.size}px`,
          color: logo.color,
          filter: hovered
            ? `drop-shadow(0 0 20px ${logo.color}) drop-shadow(0 0 40px ${logo.color}66)`
            : `drop-shadow(0 0 8px ${logo.color}55)`,
          transition: 'filter 0.4s ease',
        }}
      />
      <span
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '9px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: hovered ? logo.color : 'var(--outline)',
          opacity: hovered ? 1 : 0.5,
          transition: 'all 0.3s ease',
          whiteSpace: 'nowrap',
        }}
      >
        {logo.name}
      </span>
    </div>
  );
}

function SceneContent({ mousePos }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-8, 4, 5]} intensity={0.5} color="#f2640f" />
      <pointLight position={[8, -4, 5]} intensity={0.4} color="#61DAFB" />

      {modelLogos.map((logo) => (
        <Model3D key={logo.name} logo={logo} mousePos={mousePos} />
      ))}
    </>
  );
}

export default function SkillScene() {
  const containerRef = useRef();
  const mousePos = useRef({ x: 0, y: 0 });

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
        height: '450px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* 3D Models */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 2 }}>
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <Suspense fallback={null}>
            <SceneContent mousePos={mousePos} />
          </Suspense>
        </Canvas>
      </div>

      {/* Icon fallbacks */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        {iconLogos.map((logo) => (
          <Icon3D key={logo.name} logo={logo} mousePos={mousePos} />
        ))}
      </div>
    </div>
  );
}

useGLTF.preload('/models/react.glb');
useGLTF.preload('/models/python.glb');
