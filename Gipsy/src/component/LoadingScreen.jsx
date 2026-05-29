import { useEffect, useState } from "react";

export const LoadingScreen = ({ onComplete }) => {
  const [text, setText] = useState("");
  const fullText = "<Hello World/>";

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setText(fullText.substring(0, index));
      index++;
      if (index > fullText.length) {
        clearInterval(interval);
        setTimeout(() => onComplete(), 1000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center"
      style={{ background: 'var(--bg)' }}
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
        {text} <span className="animate-blink" style={{ color: 'var(--secondary)' }}>|</span>
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
