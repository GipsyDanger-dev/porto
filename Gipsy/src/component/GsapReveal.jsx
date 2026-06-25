import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const prefersReducedMotion = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(el, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1,
            delay,
            ease: 'power3.out',
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
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

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          gsap.to(childElements, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger,
            ease: 'power3.out',
          });
          observer.unobserve(el);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
