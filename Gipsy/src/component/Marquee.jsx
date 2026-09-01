import { useEffect, useRef, useState } from "react";

const techStack = [
  "React", "Laravel", "Python", "FastAPI", "TensorFlow",
  "n8n", "Supabase", "Three.js",
];

// The list is rendered twice so the loop can wrap seamlessly. Only the first
// copy is exposed to assistive tech — otherwise every technology is announced
// twice, separators included.
const Half = ({ hidden }) => (
  <div className="flex whitespace-nowrap" aria-hidden={hidden || undefined}>
    {techStack.map((tech) => (
      <span key={tech} className="flex items-center mx-4" style={{ gap: 'var(--space-4)' }}>
        <span className="label-lg" style={{ color: 'var(--outline)' }}>{tech}</span>
        <span aria-hidden="true" style={{ color: 'var(--secondary)', fontSize: '8px' }}>&#183;</span>
      </span>
    ))}
  </div>
);

export const Marquee = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(true);

  // A 25s infinite animation has no business running while it is off screen.
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        background: 'var(--surface-dim)',
        borderTop: '1px solid var(--outline-variant)',
        borderBottom: '1px solid var(--outline-variant)',
        overflow: 'hidden',
        padding: 'var(--space-4) 0',
      }}
    >
      <div className={`animate-marquee flex whitespace-nowrap${visible ? '' : ' is-paused'}`}>
        <Half />
        <Half hidden />
      </div>
    </div>
  );
};
