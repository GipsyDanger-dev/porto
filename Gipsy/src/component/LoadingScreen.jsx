import { useEffect, useState } from "react";

const FULL_TEXT = "<Hello World/>";
const CHAR_MS = 90;
const HOLD_MS = 650;
const EXIT_MS = 400;

export const LoadingScreen = ({ onReveal, onComplete }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let exitTimer;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const charMs = prefersReducedMotion ? 25 : CHAR_MS;
    const holdMs = prefersReducedMotion ? 100 : HOLD_MS;
    const exitMs = prefersReducedMotion ? 150 : EXIT_MS;
    const holdTimer = setTimeout(() => {
      setIsExiting(true);
      onReveal();
      exitTimer = setTimeout(onComplete, exitMs);
    }, (FULL_TEXT.length + 1) * charMs + holdMs);

    return () => {
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
    };
  }, [onReveal, onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{
        background: 'var(--bg)',
        opacity: isExiting ? 0 : 1,
        transform: isExiting ? 'translateY(-8px)' : 'translateY(0)',
        transition: `opacity ${EXIT_MS}ms var(--ease-out), transform ${EXIT_MS}ms var(--ease-out)`,
        pointerEvents: isExiting ? 'none' : 'auto',
      }}
      role="status"
      aria-label="Loading portfolio"
      aria-live="polite"
    >
      <div
        className="loading-intro-text mb-4"
        style={{
          width: 'min(100%, 16ch)',
          minHeight: '58px',
          textAlign: 'center',
          fontFamily: 'var(--mono)',
          fontWeight: 700,
          color: 'var(--on-surface)',
        }}
      >
        <span className="loading-intro-type" aria-hidden="true" style={{ '--intro-chars': FULL_TEXT.length, '--intro-char-ms': `${CHAR_MS}ms` }}>
          <span className="loading-intro-copy">{FULL_TEXT}</span>
          <span className="loading-intro-cursor"><span className="animate-blink" style={{ color: 'var(--secondary)' }}>|</span></span>
        </span>
      </div>

      <div
        className="relative overflow-hidden"
        style={{ width: '200px', height: '2px', background: 'var(--surface-high)' }}
      >
        <div
          className="animate-loading-bar"
          style={{
            width: '40%',
            height: '100%',
            background: 'var(--secondary)',
            boxShadow: '0 0 12px var(--secondary)',
          }}
        />
      </div>
    </div>
  );
};
