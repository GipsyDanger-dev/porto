/* eslint-disable react/no-unknown-property */
import { useRef, useMemo, useState, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  { name: "React", color: "#61DAFB", shape: "torusKnot" },
  { name: "JavaScript", color: "#F7DF1E", shape: "octahedron" },
  { name: "Python", color: "#3776AB", shape: "cone" },
  { name: "Tailwind", color: "#06B6D4", shape: "torus" },
  { name: "TypeScript", color: "#3178C6", shape: "box" },
  { name: "Node.js", color: "#339933", shape: "dodecahedron" },
  { name: "Laravel", color: "#FF2D20", shape: "icosahedron" },
  { name: "Three.js", color: "#FFFFFF", shape: "octahedron" },
  { name: "TensorFlow", color: "#FF6F00", shape: "tetrahedron" },
  { name: "Git", color: "#F05032", shape: "sphere" },
  { name: "Docker", color: "#2496ED", shape: "box" },
  { name: "Supabase", color: "#3ECF8E", shape: "dodecahedron" },
  { name: "n8n", color: "#EA4B71", shape: "torus" },
  { name: "AI / ML", color: "#FF640F", shape: "torusKnot" },
];

function getGeometry(shape) {
  switch (shape) {
    case 'torusKnot':
      return <torusKnotGeometry args={[0.4, 0.15, 64, 16]} />;
    case 'octahedron':
      return <octahedronGeometry args={[0.5, 0]} />;
    case 'cone':
      return <coneGeometry args={[0.4, 0.8, 6]} />;
    case 'torus':
      return <torusGeometry args={[0.4, 0.15, 16, 32]} />;
    case 'box':
      return <boxGeometry args={[0.6, 0.6, 0.6]} />;
    case 'dodecahedron':
      return <dodecahedronGeometry args={[0.5, 0]} />;
    case 'icosahedron':
      return <icosahedronGeometry args={[0.5, 0]} />;
    case 'tetrahedron':
      return <tetrahedronGeometry args={[0.5, 0]} />;
    case 'sphere':
      return <sphereGeometry args={[0.4, 32, 32]} />;
    default:
      return <boxGeometry args={[0.5, 0.5, 0.5]} />;
  }
}

function SkillObject({ skill, position, onHover, onUnhover }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    meshRef.current.rotation.x = t * 0.3 + position[0] * 0.5;
    meshRef.current.rotation.y = t * 0.2 + position[1] * 0.3;

    if (hovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.4, 1.4, 1.4), 0.1);
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  const handlePointerOver = useCallback((e) => {
    e.stopPropagation();
    setHovered(true);
    onHover(skill.name);
    document.body.style.cursor = 'pointer';
  }, [skill.name, onHover]);

  const handlePointerOut = useCallback(() => {
    setHovered(false);
    onUnhover();
    document.body.style.cursor = 'default';
  }, [onUnhover]);

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        {getGeometry(skill.shape)}
        <meshStandardMaterial
          color={skill.color}
          wireframe={!hovered}
          transparent
          opacity={hovered ? 0.9 : 0.7}
          emissive={skill.color}
          emissiveIntensity={hovered ? 0.4 : 0.1}
        />
      </mesh>
    </Float>
  );
}

function Scene({ onHover, onUnhover }) {
  const { viewport } = useThree();

  const positions = useMemo(() => {
    const cols = viewport.width > 8 ? 7 : 5;
    const spacingX = viewport.width / (cols + 1);
    const spacingY = 1.4;

    return skills.map((_, i) => {
      const row = Math.floor(i / cols);
      const col = i % cols;
      const offsetX = row % 2 === 0 ? 0 : spacingX * 0.4;
      const x = (col - cols / 2 + 0.5) * spacingX + offsetX + (Math.random() - 0.5) * 0.3;
      const y = (row - 1) * spacingY * -1 + (Math.random() - 0.5) * 0.2;
      const z = (Math.random() - 0.5) * 1.5;
      return [x, y, z];
    });
  }, [viewport.width]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.6} />
      <pointLight position={[-5, 3, 3]} intensity={0.3} color="#f2640f" />
      <pointLight position={[5, -3, 3]} intensity={0.3} color="#61DAFB" />

      {skills.map((skill, i) => (
        <SkillObject
          key={skill.name}
          skill={skill}
          position={positions[i]}
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
      camera={{ position: [0, 0, 6], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Scene onHover={onHoverSkill} onUnhover={onUnhoverSkill} />
    </Canvas>
  );
}
