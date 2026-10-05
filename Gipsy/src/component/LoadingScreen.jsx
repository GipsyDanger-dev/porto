import { useEffect, useState } from "react";

const FULL_TEXT = "<Hello World/>";
const CHAR_MS = 90;
const HOLD_MS = 650;
const EXIT_MS = 400;

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    let index = 0;
    let holdTimer;
    let exitTimer;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const charMs = prefersReducedMotion ? 25 : CHAR_MS;
    const holdMs = prefersReducedMotion ? 100 : HOLD_MS;
    const exitMs = prefersReducedMotion ? 150 : EXIT_MS;
    const interval = setInterval(() => {
      setText(FULL_TEXT.substring(0, index));
      index++;
      if (index > FULL_TEXT.length) {
        clearInterval(interval);
        holdTimer = setTimeout(() => {
          setIsExiting(true);
          exitTimer = setTimeout(onComplete, exitMs);
        }, holdMs);
      }
    }, charMs);

    return () => {
      clearInterval(interval);
      clearTimeout(holdTimer);
      clearTimeout(exitTimer);
    };
  }, [onComplete]);

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
        className="mb-4"
        style={{
          fontFamily: 'var(--mono)',
          fontSize: '36px',
          fontWeight: 700,
          color: 'var(--on-surface)',
        }}
      >
        {text} <span className="animate-blink" aria-hidden="true" style={{ color: 'var(--secondary)' }}>|</span>
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
