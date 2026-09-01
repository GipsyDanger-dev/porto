import { useEffect, useState } from "react";

const FULL_TEXT = "<Hello World/>";
const CHAR_MS = 60;
const HOLD_MS = 150;

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");

  useEffect(() => {
    let index = 0;
    let holdTimer;
    const interval = setInterval(() => {
      setText(FULL_TEXT.substring(0, index));
      index++;
      if (index > FULL_TEXT.length) {
        clearInterval(interval);
        // A short beat to let the finished word land — not a full second of
        // nothing, which is what this used to be.
        holdTimer = setTimeout(() => onComplete(), HOLD_MS);
      }
    }, CHAR_MS);

    return () => { clearInterval(interval); clearTimeout(holdTimer); };
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'var(--bg)' }}
      role="status"
      aria-label="Loading"
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
