/* eslint-disable react/no-unknown-property */
import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const skills = [
  { name: "React", color: "#61DAFB", shape: "torusKnot", pos: [-5.5, 2, -1], scale: 0.7 },
  { name: "JavaScript", color: "#F7DF1E", shape: "octahedron", pos: [-3, 2.5, 0.5], scale: 0.8 },
  { name: "Python", color: "#3776AB", shape: "icosahedron", pos: [0, 2.2, -0.5], scale: 0.75 },
  { name: "Node.js", color: "#339933", shape: "dodecahedron", pos: [3, 2.8, 0.3], scale: 0.7 },
  { name: "Tailwind", color: "#06B6D4", shape: "torus", pos: [5.5, 2.1, -0.8], scale: 0.65 },
  { name: "TypeScript", color: "#3178C6", shape: "box", pos: [-4.5, 0, 0.8], scale: 0.65 },
  { name: "Laravel", color: "#FF2D20", shape: "cone", pos: [-1.5, -0.3, 0.2], scale: 0.7 },
  { name: "Three.js", color: "#FFFFFF", shape: "sphere", pos: [1.5, 0.2, -0.3], scale: 0.6 },
  { name: "TensorFlow", color: "#FF6F00", shape: "tetrahedron", pos: [4.5, -0.1, 0.5], scale: 0.7 },
  { name: "Git", color: "#F05032", shape: "octahedron", pos: [-5, -2.2, 0.4], scale: 0.55 },
  { name: "Docker", color: "#2496ED", shape: "cylinder", pos: [-2, -2.5, -0.6], scale: 0.6 },
  { name: "Supabase", color: "#3ECF8E", shape: "torusKnot", pos: [1, -2, 0.7], scale: 0.55 },
  { name: "n8n", color: "#EA4B71", shape: "dodecahedron", pos: [3.5, -2.3, -0.2], scale: 0.6 },
  { name: "AI / ML", color: "#FF640F", shape: "icosahedron", pos: [5.8, -1.8, 0.3], scale: 0.7 },
];

function InteractiveObject({ skill, mousePos }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  const geometry = useMemo(() => {
    switch (skill.shape) {
      case 'torusKnot':
        return <torusKnotGeometry args={[1, 0.3, 128, 32]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 0]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.4, 32, 64]} />;
      case 'box':
        return <boxGeometry args={[1.2, 1.2, 1.2]} />;
      case 'cone':
        return <coneGeometry args={[0.8, 1.6, 6]} />;
      case 'sphere':
        return <sphereGeometry args={[1, 32, 32]} />;
      case 'tetrahedron':
        return <tetrahedronGeometry args={[1, 0]} />;
      case 'cylinder':
        return <cylinderGeometry args={[0.6, 0.6, 1.2, 32]} />;
      default:
        return <boxGeometry args={[1, 1, 1]} />;
    }
  }, [skill.shape]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();

    meshRef.current.rotation.x = t * 0.3 + skill.pos[0] * 0.2;
    meshRef.current.rotation.y = t * 0.4 + skill.pos[1] * 0.15;

    const targetX = skill.pos[0] + mousePos.current.x * 0.3;
    const targetY = skill.pos[1] + mousePos.current.y * 0.3;
    meshRef.current.position.x += (targetX - meshRef.current.position.x) * 0.02;
    meshRef.current.position.y += (targetY - meshRef.current.position.y) * 0.02;

    if (hovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(skill.scale * 1.5, skill.scale * 1.5, skill.scale * 1.5), 0.1);
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(skill.scale, skill.scale, skill.scale), 0.1);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <mesh
        ref={meshRef}
        position={skill.pos}
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
        {geometry}
        {hovered ? (
          <MeshDistortMaterial
            color={skill.color}
            speed={2}
            distort={0.3}
            roughness={0.2}
            metalness={0.8}
            emissive={skill.color}
            emissiveIntensity={0.5}
          />
        ) : (
          <meshStandardMaterial
            color={skill.color}
            wireframe
            transparent
            opacity={0.85}
            emissive={skill.color}
            emissiveIntensity={0.15}
          />
        )}
      </mesh>
    </Float>
  );
}

function Scene() {
  const mousePos = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useFrame((state) => {
    mousePos.current.x = (state.pointer.x * viewport.width) / 2;
    mousePos.current.y = (state.pointer.y * viewport.height) / 2;
  });

  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-10, 5, 5]} intensity={0.8} color="#f2640f" />
      <pointLight position={[10, -5, 5]} intensity={0.5} color="#61DAFB" />
      <pointLight position={[0, 0, 10]} intensity={0.3} color="#ffffff" />

      {skills.map((skill) => (
        <InteractiveObject
          key={skill.name}
          skill={skill}
          mousePos={mousePos}
        />
      ))}
    </>
  );
}

export default function SkillScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: 'transparent' }}
    >
      <Scene />
    </Canvas>
  );
}
