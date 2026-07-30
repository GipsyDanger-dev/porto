import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const prefersReducedMotion = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// A single shared IntersectionObserver for every reveal on the page, instead
// of one observer per <GsapReveal>/<GsapStagger>. Each element registers a
// one-shot callback that fires when it first scrolls into view.
const revealCallbacks = new Map();
let sharedObserver = null;

const getObserver = () => {
  if (sharedObserver) return sharedObserver;
  if (typeof IntersectionObserver === 'undefined') return null;
  sharedObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const cb = revealCallbacks.get(entry.target);
          if (cb) cb();
          sharedObserver.unobserve(entry.target);
          revealCallbacks.delete(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  return sharedObserver;
};

const observeOnce = (el, callback) => {
  const observer = getObserver();
  if (!observer) { callback(); return () => {}; }
  revealCallbacks.set(el, callback);
  observer.observe(el);
  return () => {
    observer.unobserve(el);
    revealCallbacks.delete(el);
  };
};

export const GsapReveal = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion) {
      gsap.set(el, { opacity: 1, y: 0, x: 0 });
      return;
    }

    const distance = direction === 'up' ? 40 : direction === 'down' ? -40 : direction === 'left' ? 40 : -40;
    const isVertical = direction === 'up' || direction === 'down';

    gsap.set(el, {
      opacity: 0,
      [isVertical ? 'y' : 'x']: distance,
    });

    return observeOnce(el, () => {
      gsap.to(el, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 1,
        delay,
        ease: 'power3.out',
      });
    });
  }, [delay, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export const GsapStagger = ({ children, className = '', stagger = 0.1 }) => {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion) {
      gsap.set(el.children, { opacity: 1, y: 0 });
      return;
    }

    const childElements = el.children;

    gsap.set(childElements, { opacity: 0, y: 30 });

    return observeOnce(el, () => {
      gsap.to(childElements, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger,
        ease: 'power3.out',
      });
    });
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
