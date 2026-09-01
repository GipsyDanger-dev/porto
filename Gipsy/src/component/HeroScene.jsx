/* eslint-disable react/no-unknown-property */
import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

function GlowingTorus() {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t * 0.3) * 0.2;
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.rotation.z = Math.cos(t * 0.2) * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={[0, 0, -0.5]} scale={1.55}>
        <torusGeometry args={[1, 0.35, 32, 64]} />
        <meshStandardMaterial
          ref={materialRef}
          color="#f2640f"
          wireframe
          transparent
          opacity={0.065}
          emissive="#f2640f"
          emissiveIntensity={0.15}
        />
      </mesh>
    </Float>
  );
}

function FloatingParticles({ count = 60 }) {
  const meshRef = useRef();

  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.02;
    meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.05;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#f2640f"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function WireframeIcosahedron() {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.08;
    meshRef.current.rotation.y = t * 0.12;
    meshRef.current.position.y = Math.sin(t * 0.5) * 0.2;
  });

  return (
    <mesh ref={meshRef} position={[3, -1, -2]} scale={0.5}>
      <icosahedronGeometry args={[1, 1]} />
      <meshStandardMaterial
        color="#f2640f"
        wireframe
        transparent
        opacity={0.035}
        emissive="#f2640f"
        emissiveIntensity={0.08}
      />
    </mesh>
  );
}

export default function HeroScene() {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  // Pause the render loop when the hero is scrolled off-screen so the GPU
  // isn't animating three meshes behind the rest of the page.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        frameloop={isVisible ? 'always' : 'never'}
      >
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} />
        <pointLight position={[-3, 2, 2]} intensity={0.2} color="#f2640f" />

        <GlowingTorus />
        <FloatingParticles />
        <WireframeIcosahedron />
      </Canvas>
    </div>
  );
}
