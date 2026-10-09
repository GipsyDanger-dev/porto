import { useEffect, useRef, useState, createElement, useMemo } from 'react';

// The typing timer also respects the browser's reduced-motion preference.
const reduceMotion = () => typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const TextType = ({
  text,
  as: Component = 'div',
  typingSpeed = 50,
  initialDelay = 0,
  pauseDuration = 2000,
  deletingSpeed = 30,
  loop = true,
  className = '',
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = '|',
  cursorClassName = '',
  cursorBlinkDuration = 0.5,
  textColors = [],
  variableSpeed,
  onSentenceComplete,
  startOnVisible = false,
  enabled = true,
  reverseMode = false,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState(import.meta.env.SSR ? (Array.isArray(text) ? text[0] : text) : '');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const containerRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const progressRef = useRef({ charIndex: 0, isDeleting: false, waiting: false });

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const minSpeed = variableSpeed?.min;
  const maxSpeed = variableSpeed?.max;

  const getCurrentTextColor = () => {
    if (textColors.length === 0) return 'inherit';
    return textColors[currentTextIndex % textColors.length];
  };

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;
    let intersecting = true;
    const updateActivity = () => setIsActive(enabled && intersecting && !document.hidden);
    const observer = new IntersectionObserver(([entry]) => {
      intersecting = entry.isIntersecting;
      updateActivity();
    });
    observer.observe(element);
    document.addEventListener('visibilitychange', updateActivity);
    updateActivity();
    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', updateActivity);
    };
  }, [enabled]);

  // Main typing animation
  useEffect(() => {
    if (!isVisible || !isActive) return;

    const currentText = textArray[currentTextIndex];
    if (!currentText) return;

    // Reduced motion: show the first phrase outright and never loop.
    if (reduceMotion()) {
      setDisplayedText(currentText);
      setIsTyping(false);
      return;
    }

    const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;
    const progress = progressRef.current;
    let timeout;

    const type = () => {
      if (!progress.isDeleting) {
        // Typing forward
        if (progress.charIndex < processedText.length) {
          setIsTyping(true);
          progress.charIndex++;
          setDisplayedText(processedText.slice(0, progress.charIndex));
          const speed = minSpeed === undefined ? typingSpeed : Math.random() * (maxSpeed - minSpeed) + minSpeed;
          timeout = setTimeout(type, speed);
        } else {
          // Finished typing, wait then start deleting
          setIsTyping(false);
          if (!progress.waiting && onSentenceComplete) {
            onSentenceComplete(currentText, currentTextIndex);
          }
          progress.waiting = true;
          timeout = setTimeout(() => {
            progress.isDeleting = true;
            progress.waiting = false;
            type();
          }, pauseDuration);
        }
      } else {
        // Deleting
        if (progress.charIndex > 0) {
          setIsTyping(true);
          progress.charIndex--;
          setDisplayedText(processedText.slice(0, progress.charIndex));
          timeout = setTimeout(type, deletingSpeed);
        } else {
          // Finished deleting, move to next text
          setIsTyping(false);
          progress.isDeleting = false;
          if (currentTextIndex === textArray.length - 1 && !loop) return;
          setCurrentTextIndex(prev => (prev + 1) % textArray.length);
        }
      }
    };

    // Initial delay before starting
    timeout = setTimeout(type, progress.charIndex === 0 && !progress.isDeleting ? initialDelay : 0);

    return () => {
      clearTimeout(timeout);
    };
  }, [currentTextIndex, isVisible, isActive, textArray, reverseMode, typingSpeed, minSpeed, maxSpeed, deletingSpeed, pauseDuration, initialDelay, loop, onSentenceComplete]);

  const shouldHideCursor = hideCursorWhileTyping && isTyping;

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
      ...props
    },
    <span className="inline" style={{ color: getCurrentTextColor() || 'inherit' }}>
      {displayedText}
    </span>,
    showCursor && (
      <span
        aria-hidden="true"
        className={`text-type-cursor ml-1 inline-block ${shouldHideCursor ? 'hidden' : ''} ${cursorClassName}`}
        style={{ animationDuration: `${cursorBlinkDuration}s`, animationPlayState: isActive && isVisible ? 'running' : 'paused' }}
      >
        {cursorCharacter}
      </span>
    )
  );
};

export default TextType;
