import { useEffect, useRef, useState, createElement, useMemo } from 'react';
import { gsap } from 'gsap';

// The CSS prefers-reduced-motion block cannot reach GSAP's repeat: -1 tweens or
// the setTimeout typing loop, so this component has to opt out itself.
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
  reverseMode = false,
  ...props
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isVisible, setIsVisible] = useState(!startOnVisible);
  const cursorRef = useRef(null);
  const containerRef = useRef(null);
  const gsapTweenRef = useRef(null);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  const getRandomSpeed = () => {
    if (!variableSpeed) return typingSpeed;
    const { min, max } = variableSpeed;
    return Math.random() * (max - min) + min;
  };

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

  // GSAP cursor blink
  useEffect(() => {
    if (!showCursor || !cursorRef.current) return;
    if (reduceMotion()) {
      gsap.set(cursorRef.current, { opacity: 1 });
      return;
    }

    gsap.set(cursorRef.current, { opacity: 1 });
    gsapTweenRef.current = gsap.to(cursorRef.current, {
      opacity: 0,
      duration: cursorBlinkDuration,
      repeat: -1,
      yoyo: true,
      ease: 'power2.inOut'
    });

    return () => {
      if (gsapTweenRef.current) {
        gsapTweenRef.current.kill();
        gsapTweenRef.current = null;
      }
    };
  }, [showCursor, cursorBlinkDuration]);

  // Main typing animation
  useEffect(() => {
    if (!isVisible) return;

    const currentText = textArray[currentTextIndex];

    // Reduced motion: show the first phrase outright and never loop.
    if (reduceMotion()) {
      setDisplayedText(currentText);
      setIsTyping(false);
      return;
    }

    const processedText = reverseMode ? currentText.split('').reverse().join('') : currentText;
    let charIndex = 0;
    let isDeleting = false;
    let timeout;

    const type = () => {
      if (!isDeleting) {
        // Typing forward
        if (charIndex < processedText.length) {
          setIsTyping(true);
          charIndex++;
          setDisplayedText(processedText.slice(0, charIndex));
          timeout = setTimeout(type, variableSpeed ? getRandomSpeed() : typingSpeed);
        } else {
          // Finished typing, wait then start deleting
          setIsTyping(false);
          if (onSentenceComplete) {
            onSentenceComplete(currentText, currentTextIndex);
          }
          timeout = setTimeout(() => {
            isDeleting = true;
            type();
          }, pauseDuration);
        }
      } else {
        // Deleting
        if (charIndex > 0) {
          setIsTyping(true);
          charIndex--;
          setDisplayedText(processedText.slice(0, charIndex));
          timeout = setTimeout(type, deletingSpeed);
        } else {
          // Finished deleting, move to next text
          setIsTyping(false);
          isDeleting = false;
          if (currentTextIndex === textArray.length - 1 && !loop) return;
          setCurrentTextIndex(prev => (prev + 1) % textArray.length);
        }
      }
    };

    // Initial delay before starting
    timeout = setTimeout(type, charIndex === 0 && !isDeleting ? initialDelay : 0);

    return () => {
      clearTimeout(timeout);
      setIsTyping(false);
    };
  }, [currentTextIndex, isVisible]);

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
        ref={cursorRef}
        className={`ml-1 inline-block opacity-100 ${shouldHideCursor ? 'hidden' : ''} ${cursorClassName}`}
      >
        {cursorCharacter}
      </span>
    )
  );
};

export default TextType;
