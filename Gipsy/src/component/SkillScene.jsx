import { useRef, useState, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import {
  SiReact,
  SiJavascript,
  SiTailwindcss,
  SiPython,
  SiLaravel,
  SiNodedotjs,
  SiThreedotjs,
  SiTensorflow,
  SiDocker,
  SiSupabase,
  SiGit,
  SiTypescript,
  SiN8N,
  SiClaude,
  SiSolidity,
  SiLangchain,
  SiPolygon,
} from "react-icons/si";
import circomLogo from "../pct/logos/circom.png";
import snarkjsLogo from "../pct/logos/snarkjs.png";

const skills = [
  { name: "React", icon: SiReact, col: 0, row: 0, size: 48 },
  { name: "JavaScript", icon: SiJavascript, col: 1, row: 0, size: 46 },
  { name: "Python", icon: SiPython, col: 2, row: 0, size: 48 },
  { name: "Node.js", icon: SiNodedotjs, col: 3, row: 0, size: 44 },
  { name: "Tailwind", icon: SiTailwindcss, col: 4, row: 0, size: 42 },
  { name: "TypeScript", icon: SiTypescript, col: 0, row: 1, size: 40 },
  { name: "Laravel", icon: SiLaravel, col: 1, row: 1, size: 42 },
  { name: "Three.js", icon: SiThreedotjs, col: 2, row: 1, size: 38 },
  { name: "TensorFlow", icon: SiTensorflow, col: 3, row: 1, size: 40 },
  { name: "Git", icon: SiGit, col: 4, row: 1, size: 36 },
  { name: "Docker", icon: SiDocker, col: 0, row: 2, size: 38 },
  { name: "Supabase", icon: SiSupabase, col: 1, row: 2, size: 36 },
  { name: "n8n", icon: SiN8N, col: 2, row: 2, size: 38 },
  { name: "Claude", icon: SiClaude, col: 3, row: 2, size: 42 },
  { name: "Solidity", icon: SiSolidity, col: 4, row: 2, size: 40 },
  { name: "LangChain", icon: SiLangchain, col: 0.5, row: 3, size: 40 },
  { name: "Polygon Amoy", icon: SiPolygon, col: 1.5, row: 3, size: 40 },
  { name: "Circom", logo: circomLogo, col: 2.5, row: 3, width: 88, height: 32 },
  { name: "snarkjs", logo: snarkjsLogo, logoMode: "image", col: 3.5, row: 3, size: 40 },
];

function FloatingLogo({ skill, setRef, containerWidth, containerHeight }) {
  const [hovered, setHovered] = useState(false);

  const cols = 5;
  const rows = 4;
  const spacingX = containerWidth / (cols + 0.5);
  const spacingY = containerHeight / (rows + 0.5);
  const offsetX = spacingX * 0.25;

  const baseX = spacingX * (skill.col + 0.5) + offsetX;
  const baseY = spacingY * (skill.row + 0.5);

  const Icon = skill.icon;
  const logoWidth = skill.width ?? skill.size;
  const logoHeight = skill.height ?? skill.size;
  const visualStyle = {
    width: `${logoWidth}px`,
    height: `${logoHeight}px`,
    color: hovered ? 'var(--secondary)' : 'var(--outline)',
    filter: hovered ? 'drop-shadow(0 0 14px rgba(242, 100, 15, 0.45))' : 'none',
    transform: hovered ? 'scale(1.15)' : 'scale(1)',
    transition: 'filter var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out), color var(--dur-fast) var(--ease-out)',
  };

  return (
    <div
      ref={setRef}
      style={{
        position: 'absolute',
        left: `${baseX}px`,
        top: `${baseY}px`,
        // gsap owns opacity + the centering transform (see SkillScene effect)
        // so it can reveal each logo one by one and scale it without React
        // re-renders (hover/zIndex) stomping the animated values.
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 'var(--space-3)',
        cursor: 'pointer',
        zIndex: hovered ? 10 : 1,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {skill.logoMode === 'image' ? (
        <img
          src={skill.logo}
          alt=""
          aria-hidden="true"
          style={{
            width: `${logoWidth}px`,
            height: `${logoHeight}px`,
            objectFit: 'contain',
            mixBlendMode: 'screen',
            filter: hovered
              ? 'grayscale(1) sepia(1) saturate(7) hue-rotate(335deg) brightness(1.15) drop-shadow(0 0 14px rgba(242, 100, 15, 0.45))'
              : 'grayscale(1) brightness(1.1)',
            transform: hovered ? 'scale(1.15)' : 'scale(1)',
            transition: 'filter var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out)',
          }}
        />
      ) : skill.logo ? (
        <span
          aria-hidden="true"
          style={{
            ...visualStyle,
            backgroundColor: 'currentColor',
            maskImage: `url(${skill.logo})`,
            maskPosition: 'center',
            maskRepeat: 'no-repeat',
            maskSize: 'contain',
            WebkitMaskImage: `url(${skill.logo})`,
            WebkitMaskPosition: 'center',
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskSize: 'contain',
          }}
        />
      ) : (
        <Icon
          style={{
            ...visualStyle,
            fontSize: `${skill.size}px`,
          }}
        />
      )}
      <span
        className="label-xs"
        style={{
          color: hovered ? 'var(--secondary)' : 'var(--outline)',
          opacity: hovered ? 1 : 0.55,
          transition: 'color var(--dur-fast) var(--ease-out), opacity var(--dur-fast) var(--ease-out)',
          whiteSpace: 'nowrap',
        }}
      >
        {skill.name}
      </span>
    </div>
  );
}

export default function SkillScene() {
  const containerRef = useRef();
  const logoRefs = useRef([]);
  const [dimensions, setDimensions] = useState({ width: 800, height: 520 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };
    updateDimensions();
    // Debounced: every raw resize event re-renders all 19 logos.
    let frame;
    const onResize = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateDimensions);
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // Entrance: reveal each logo one by one (stagger), triggered when the
  // skills section scrolls into view. Not a single global fade over the whole block.
  // useLayoutEffect sets the hidden state before paint → no flash of visible logos.
  useLayoutEffect(() => {
    const els = logoRefs.current.filter(Boolean);
    if (!els.length) return;

    // gsap owns the centering transform so scale animates without breaking it.
    gsap.set(els, { xPercent: -50, yPercent: -50 });

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      gsap.set(els, { opacity: 1, scale: 1 });
      return;
    }

    gsap.set(els, { opacity: 0, scale: 0.8 });

    let played = false;
    let tween;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played) {
          played = true;
          // power3.out, not back.out: overshoot made all 19 logos bounce past
          // their resting size and settle back.
          tween = gsap.to(els, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.05,
            ease: 'power3.out',
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(containerRef.current);
    return () => {
      observer.disconnect();
      tween?.kill();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        height: '520px',
        position: 'relative',
      }}
    >
      {skills.map((skill, i) => (
        <FloatingLogo
          key={skill.name}
          skill={skill}
          setRef={(el) => { logoRefs.current[i] = el; }}
          containerWidth={dimensions.width}
          containerHeight={dimensions.height}
        />
      ))}
    </div>
  );
}
