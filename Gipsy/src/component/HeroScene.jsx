import { lazy, Suspense, useRef, useState, useEffect, useCallback } from 'react';

const HeroSceneFallback = lazy(() => import('./HeroSceneFallback'));

export default function HeroScene() {
  const containerRef = useRef(null);
  const surfaceRef = useRef(null);
  const workerRef = useRef(null);
  const [fallback, setFallback] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [pageVisible, setPageVisible] = useState(!document.hidden);
  const ready = useCallback(() => setIsReady(true), []);

  useEffect(() => {
    if (!window.Worker || !HTMLCanvasElement.prototype.transferControlToOffscreen) {
      setFallback(true);
      return;
    }
    // A fresh canvas per effect also handles React StrictMode's setup/cleanup.
    const surface = surfaceRef.current;
    const canvas = document.createElement('canvas');
    Object.assign(canvas.style, { width: '100%', height: '100%', display: 'block' });
    surface.appendChild(canvas);
    let worker;
    let observer;
    let resize;
    let stopped = false;
    const stop = () => {
      stopped = true;
      observer?.disconnect();
      if (resize) window.removeEventListener('resize', resize);
      worker?.terminate();
      workerRef.current = null;
      canvas.remove();
    };
    const recover = error => {
      if (stopped) return;
      console.warn('Hero worker unavailable; using the regular 3D renderer.', error);
      stop();
      setIsReady(false);
      setFallback(true);
    };
    try {
      worker = new Worker(new URL('./hero-scene.worker.jsx', import.meta.url), { type: 'module' });
      workerRef.current = worker;
      worker.addEventListener('message', ({ data }) => {
        if (stopped) return;
        if (data.type === 'ready') ready();
        if (data.type === 'error') recover(data.message);
      });
      worker.addEventListener('error', event => {
        event.preventDefault();
        recover(event.message);
      });
      const drawingSurface = canvas.transferControlToOffscreen();
      worker.postMessage({
        type: 'init', canvas: drawingSurface,
        width: surface.clientWidth, height: surface.clientHeight,
        dpr: window.devicePixelRatio, active: !document.hidden,
      }, [drawingSurface]);
      resize = () => {
        worker.postMessage({ type: 'resize', width: surface.clientWidth, height: surface.clientHeight, dpr: window.devicePixelRatio });
      };
      observer = new ResizeObserver(resize);
      observer.observe(surface);
      window.addEventListener('resize', resize);
    } catch (error) {
      recover(error);
    }
    return stop;
  }, [ready]);

  useEffect(() => {
    workerRef.current?.postMessage({ type: 'active', active: isVisible && pageVisible });
  }, [isVisible, pageVisible]);

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
    const onVisibility = () => setPageVisible(!document.hidden);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
      data-scene-ready={isReady}
      data-scene-renderer={fallback ? 'main' : 'worker'}
    >
      {fallback ? <Suspense fallback={null}>
        <HeroSceneFallback active={isReady && isVisible && pageVisible} onReady={ready} />
      </Suspense> : <div ref={surfaceRef} className="absolute inset-0" />}
    </div>
  );
}
