const techStack = [
  "React", "Laravel", "Python", "JavaScript", "Tailwind CSS",
  "TensorFlow", "FastAPI", "Firebase", "MySQL", "Git",
  "GSAP", "Three.js", "Figma", "Adobe Premiere", "After Effects",
  "Kotlin", "Dart", "Flutter", "Supabase", "Vite",
];

export const Marquee = () => {
  const items = [...techStack, ...techStack];

  return (
    <div
      style={{
        background: 'var(--surface-dim)',
        borderTop: '1px solid var(--outline-variant)',
        borderBottom: '1px solid var(--outline-variant)',
        overflow: 'hidden',
        padding: '16px 0',
      }}
    >
      <div className="animate-marquee flex whitespace-nowrap">
        {items.map((tech, i) => (
          <span key={i} className="flex items-center mx-4" style={{ gap: '16px' }}>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--outline)',
              }}
            >
              {tech}
            </span>
            <span style={{ color: 'var(--secondary)', fontSize: '8px' }}>&#183;</span>
          </span>
        ))}
      </div>
    </div>
  );
};
