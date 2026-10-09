import { Canvas } from '@react-three/fiber';
import HeroSceneContent from './HeroSceneContent';

export default function HeroSceneFallback({ active, onReady }) {
  return <Canvas
    camera={{ position: [0, 0, 5], fov: 45 }}
    dpr={[1, 1.5]}
    gl={{ antialias: true, alpha: true }}
    style={{ background: 'transparent' }}
    frameloop={active ? 'always' : 'never'}
  >
    <HeroSceneContent onReady={onReady} />
  </Canvas>;
}
