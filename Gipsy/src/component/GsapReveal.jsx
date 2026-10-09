import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

const reduceMotion = () => typeof window !== 'undefined'
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

  // useLayoutEffect, not useEffect: the hidden state has to be committed before
  // the browser paints, otherwise every block flashes in at full opacity for a
  // frame and then snaps back to opacity 0 to animate.
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduceMotion()) {
      gsap.set(el, { opacity: 1, y: 0, x: 0 });
      return;
    }

    const distance = direction === 'up' ? 40 : direction === 'down' ? -40 : direction === 'left' ? 40 : -40;
    const isVertical = direction === 'up' || direction === 'down';

    gsap.set(el, {
      opacity: 0,
      [isVertical ? 'y' : 'x']: distance,
    });

    let tween;
    const unobserve = observeOnce(el, () => {
      tween = gsap.to(el, {
        opacity: 1,
        y: 0,
        x: 0,
        duration: 0.65,
        delay,
        // GSAP-native twin of the CSS --ease-out token; GSAP can't parse a raw
        // cubic-bezier() string without CustomEase.
        ease: 'power3.out',
      });
    });

    // Sections are lazy-loaded, so a reveal can unmount mid-tween.
    return () => {
      unobserve();
      tween?.kill();
    };
  }, [delay, direction]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};

export const GsapStagger = ({ children, className = '', style, stagger = 0.1 }) => {
  const ref = useRef(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    const childElements = el.children;

    if (reduceMotion()) {
      gsap.set(childElements, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(childElements, { opacity: 0, y: 24 });

    let tween;
    const unobserve = observeOnce(el, () => {
      tween = gsap.to(childElements, {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger,
        ease: 'power3.out',
      });
    });

    return () => {
      unobserve();
      tween?.kill();
    };
  }, [stagger]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
};
