import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { gsap } from 'gsap';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiChevronDown, FiGithub, FiGrid, FiPause, FiPlay } from 'react-icons/fi';
import { useProjectAutoplay } from './useProjectAutoplay';
import './ProjectGallery.css';

export const ProjectGallery = ({ projects, onSelect, isDialogOpen = false }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [loadImages, setLoadImages] = useState(import.meta.env.SSR);
  const galleryRef = useRef(null);
  const previousIndex = useRef(0);
  const direction = useRef(1);
  const plugins = useMemo(() => [Autoplay({
    delay: 6500,
    playOnInit: false,
    stopOnInteraction: true,
    stopOnMouseEnter: false,
    stopOnFocusIn: false,
  })], []);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    watchFocus: false,
  }, plugins);
  const autoplay = useProjectAutoplay(emblaApi, galleryRef, isDialogOpen);
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;
    if (!('IntersectionObserver' in window)) { setLoadImages(true); return; }
    // Native lazy loading can fetch carousel images several screens ahead.
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setLoadImages(true);
      observer.disconnect();
    }, { rootMargin: '600px' });
    observer.observe(gallery);
    return () => observer.disconnect();
  }, []);

  const syncSelection = useCallback((api) => {
    const index = api.selectedScrollSnap();
    const count = api.scrollSnapList().length;
    const forward = (index - previousIndex.current + count) % count;
    if (forward) direction.current = forward <= count / 2 ? 1 : -1;
    previousIndex.current = index;
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    syncSelection(emblaApi);
    emblaApi.on('select', syncSelection).on('reInit', syncSelection);
    return () => {
      emblaApi.off('select', syncSelection).off('reInit', syncSelection);
    };
  }, [emblaApi, syncSelection]);

  useEffect(() => {
    if (!emblaApi) return;
    const slides = emblaApi.slideNodes();
    const visuals = slides.map(slide => slide.querySelector('.project-gallery-visual'));
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame;
    const update = () => {
      const viewport = emblaApi.rootNode().getBoundingClientRect();
      const center = viewport.left + viewport.width / 2;
      // Read positions together before writing emphasis styles during a drag.
      const distances = slides.map(slide => {
        const rect = slide.getBoundingClientRect();
        return Math.min(1, Math.abs(rect.left + rect.width / 2 - center) / rect.width);
      });
      visuals.forEach((visual, index) => {
        const distance = distances[index];
        visual.style.setProperty('--slide-scale', motion.matches ? 1 : 1 - distance * 0.14);
        visual.style.setProperty('--slide-opacity', 1 - distance * 0.4);
        visual.style.setProperty('--slide-offset', `${motion.matches ? 0 : distance * 12}px`);
      });
    };
    const schedule = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    schedule();
    emblaApi.on('scroll', schedule).on('select', schedule).on('slidesInView', schedule).on('reInit', schedule).on('settle', schedule);
    motion.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      emblaApi.off('scroll', schedule).off('select', schedule).off('slidesInView', schedule).off('reInit', schedule).off('settle', schedule);
      motion.removeEventListener('change', schedule);
      visuals.forEach(visual => {
        ['--slide-scale', '--slide-opacity', '--slide-offset'].forEach(property => visual.style.removeProperty(property));
      });
    };
  }, [emblaApi]);

  useEffect(() => {
    const context = gsap.context(() => {
      const media = gsap.matchMedia();
      media.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.from('.project-gallery-visual.is-active .project-gallery-name', {
          x: direction.current * 10,
          opacity: 0,
          duration: 0.45,
          ease: 'power3.out',
        });
        gsap.from('.is-active .project-gallery-copy > *', {
          y: 10,
          opacity: 0,
          duration: 0.5,
          stagger: 0.06,
          delay: 0.08,
          ease: 'power3.out',
        });
      });
    }, galleryRef);
    return () => context.revert();
  }, [activeIndex]);

  const goTo = (index) => {
    emblaApi?.scrollTo(index, reduceMotion());
    emblaApi?.plugins().autoplay.reset();
  };
  const previous = () => {
    emblaApi?.scrollPrev(reduceMotion());
    emblaApi?.plugins().autoplay.reset();
  };
  const next = () => {
    emblaApi?.scrollNext(reduceMotion());
    emblaApi?.plugins().autoplay.reset();
  };

  const handleKeyDown = (event) => {
    if (event.target.tagName === 'SELECT') return;
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      previous();
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      next();
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      goTo(event.key === 'Home' ? 0 : projects.length - 1);
    }
  };

  return (
    <div className="project-gallery" ref={galleryRef} data-autoplay-running={autoplay.isPlaying} role="region" aria-roledescription={import.meta.env.SSR ? undefined : 'carousel'} aria-label="Portfolio projects" onKeyDown={handleKeyDown}>
      <div className="project-gallery-viewport" ref={emblaRef}>
        <div className="project-gallery-track">
          {projects.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <div className="project-gallery-slide" key={project.title} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${projects.length}: ${project.title}`}>
                <button
                  type="button"
                  className={`project-gallery-visual${isActive ? ' is-active' : ''}`}
                  tabIndex={isActive ? 0 : -1}
                  aria-label={`${isActive ? 'Open' : 'Select'} ${project.title}${isActive ? ' project details' : ''}`}
                  aria-describedby={isActive ? `project-description-${index}` : undefined}
                  onClick={() => {
                    if (isActive) onSelect(project);
                    else goTo(index);
                  }}
                >
                  <span className="project-gallery-preview">
                    <img src={loadImages ? project.imageUrl : undefined} alt={project.title} width={project.imageWidth} height={project.imageHeight} loading="lazy" decoding="async" draggable={false} />
                    <span className="project-gallery-hover-cue" aria-hidden="true">
                      {isActive ? 'View case study' : 'Select project'}
                      {isActive ? <FiArrowUpRight size={16} /> : <FiArrowRight size={16} />}
                    </span>
                  </span>
                  <span className="project-gallery-caption" aria-hidden="true">
                    <span className="project-gallery-name">{project.title}</span>
                    {isActive ? <FiArrowUpRight className="project-gallery-caption-arrow" size={20} /> : <FiArrowRight className="project-gallery-caption-arrow" size={18} />}
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <div className="project-gallery-navigation">
          <div className="project-gallery-position" aria-hidden="true">
            <span className="label project-gallery-count">{String(activeIndex + 1).padStart(2, '0')} <span>/ {String(projects.length).padStart(2, '0')}</span></span>
            <span className="project-gallery-timer">
              {autoplay.timer && <span key={autoplay.timer.key} style={{ animationDuration: `${autoplay.timer.duration}ms` }} />}
            </span>
          </div>
          {/* <div className="project-gallery-picker">
            <FiGrid className="project-gallery-picker-icon" size={16} aria-hidden="true" />
            <select aria-label="Choose a project" title="Choose a project" value="" onChange={event => goTo(Number(event.target.value))}>
              <option value="" disabled hidden>All projects</option>
              {projects.map((project, index) => <option key={project.title} value={index}>{project.title}</option>)}
            </select>
            <FiChevronDown className="project-gallery-picker-chevron" size={14} aria-hidden="true" />
          </div> */}
          {/* <div className="project-gallery-arrows">
            <button type="button" className="project-gallery-arrow project-gallery-previous" onClick={previous} aria-label="Previous project" title="Previous project"><FiArrowLeft size={20} aria-hidden="true" /></button>
            <button type="button" className="project-gallery-arrow project-gallery-next" onClick={next} aria-label="Next project" title="Next project"><FiArrowRight size={20} aria-hidden="true" /></button>
            <button type="button" className="project-gallery-arrow project-gallery-playback" data-autoplay-control onClick={autoplay.toggle} aria-label={autoplay.enabled ? 'Pause automatic scrolling' : 'Start automatic scrolling'} title={autoplay.enabled ? 'Pause automatic scrolling' : 'Start automatic scrolling'}>
              {autoplay.enabled ? <FiPause size={18} aria-hidden="true" /> : <FiPlay size={18} aria-hidden="true" />}
            </button>
          </div> */}
        </div>

        <p className="sr-only" role="status" aria-live={autoplay.isPlaying ? 'off' : 'polite'}>Project {activeIndex + 1} of {projects.length}: {projects[activeIndex].title}</p>
        {/* Overlapping grid panels reserve room for the longest description. */}
        <div className="project-gallery-details">
          {projects.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <div className={`project-gallery-panel${isActive ? ' is-active' : ''}`} key={project.title} aria-hidden={!import.meta.env.SSR && !isActive} inert={!import.meta.env.SSR && !isActive}>
                <h3 className="sr-only">{project.title}</h3>
                <div className="project-gallery-copy">
                  {project.status && <span className="label project-gallery-status">{project.status}</span>}
                  <p id={`project-description-${index}`} className="body">{project.description}</p>
                  <div className="project-gallery-stack">
                    <span className="project-gallery-stack-label" aria-hidden="true">Built with</span>
                    <ul className="project-gallery-tags" aria-label="Technologies">
                      {project.tags.map(tag => <li key={tag}><span>{tag}</span></li>)}
                    </ul>
                  </div>
                  <div className="project-gallery-links">
                    <button type="button" className="label visit-link project-gallery-case-link" onClick={() => onSelect(project)}>View case study <FiArrowUpRight size={16} aria-hidden="true" /></button>
                    {project.projectUrl && <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="label visit-link">{project.linkLabel || 'Visit Website'} <FiArrowRight size={14} aria-hidden="true" /></a>}
                    {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="label repo-link"><FiGithub size={16} aria-hidden="true" />GitHub</a>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
