import { useCallback, useEffect, useRef, useState } from 'react';

export const useProjectAutoplay = (emblaApi, galleryRef, isDialogOpen) => {
  const [enabled, setEnabled] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(null);
  const explicitPlay = useRef(false);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => {
      if (motion.matches) setEnabled(false);
    };
    motion.addEventListener('change', change);
    return () => motion.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    const gallery = galleryRef.current;
    const viewport = emblaApi.rootNode();
    const hoverTargets = [viewport, gallery.querySelector('.project-gallery-details')];
    let visible = false;
    let dragging = false;
    let disposed = false;
    let sequence = 0;
    setIsPlaying(false);
    setTimer(null);

    const reconcile = () => {
      if (disposed) return;
      const autoplay = emblaApi.plugins().autoplay;
      if (!autoplay) return;
      const active = document.activeElement;
      const focused = gallery.contains(active);
      // An explicit Play command may restart rotation while its own button has focus.
      const canIgnoreFocus = explicitPlay.current && active?.matches('[data-autoplay-control]');
      const hovering = window.matchMedia('(hover: hover) and (pointer: fine)').matches
        && hoverTargets.some(target => target.matches(':hover'));
      const canPlay = enabled && !isDialogOpen && visible && !document.hidden
        && !dragging && !hovering && (!focused || canIgnoreFocus);
      if (canPlay && !autoplay.isPlaying()) {
        autoplay.play(window.matchMedia('(prefers-reduced-motion: reduce)').matches);
      } else if (!canPlay) {
        autoplay.stop();
      }
    };
    const focusIn = (event) => {
      if (!event.target.matches('[data-autoplay-control]')) explicitPlay.current = false;
      reconcile();
    };
    const focusOut = () => queueMicrotask(() => {
      if (disposed) return;
      if (!document.activeElement?.matches('[data-autoplay-control]')) explicitPlay.current = false;
      reconcile();
    });
    const pointerDown = () => { dragging = true; reconcile(); };
    const pointerUp = () => { dragging = false; reconcile(); };
    const onPlay = () => setIsPlaying(true);
    const onStop = () => setIsPlaying(false);
    const onTimerSet = () => {
      const remaining = emblaApi.plugins().autoplay.timeUntilNext();
      setTimer(remaining === null ? null : { key: ++sequence, duration: Math.max(0, remaining) });
    };
    const onTimerStopped = () => setTimer(null);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.5;
      reconcile();
    }, { threshold: [0, 0.5] });

    emblaApi.on('autoplay:play', onPlay).on('autoplay:stop', onStop)
      .on('autoplay:timerset', onTimerSet).on('autoplay:timerstopped', onTimerStopped)
      .on('pointerDown', pointerDown).on('pointerUp', pointerUp).on('reInit', reconcile);
    hoverTargets.forEach(target => {
      target.addEventListener('mouseenter', reconcile);
      target.addEventListener('mouseleave', reconcile);
    });
    gallery.addEventListener('focusin', focusIn);
    gallery.addEventListener('focusout', focusOut);
    document.addEventListener('visibilitychange', reconcile);
    observer.observe(viewport);

    return () => {
      disposed = true;
      observer.disconnect();
      hoverTargets.forEach(target => {
        target.removeEventListener('mouseenter', reconcile);
        target.removeEventListener('mouseleave', reconcile);
      });
      gallery.removeEventListener('focusin', focusIn);
      gallery.removeEventListener('focusout', focusOut);
      document.removeEventListener('visibilitychange', reconcile);
      emblaApi.off('autoplay:play', onPlay).off('autoplay:stop', onStop)
        .off('autoplay:timerset', onTimerSet).off('autoplay:timerstopped', onTimerStopped)
        .off('pointerDown', pointerDown).off('pointerUp', pointerUp).off('reInit', reconcile);
      emblaApi.plugins().autoplay?.stop();
    };
  }, [emblaApi, galleryRef, isDialogOpen, enabled]);

  const toggle = useCallback(() => {
    explicitPlay.current = !enabled;
    setEnabled(!enabled);
  }, [enabled]);

  return { enabled, isPlaying, timer, toggle };
};
