import { useCallback, useEffect, useRef, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { gsap } from 'gsap';
import { FiArrowLeft, FiArrowRight, FiArrowUpRight, FiChevronDown, FiGithub } from 'react-icons/fi';
import './ProjectGallery.css';

export const ProjectGallery = ({ projects, onSelect }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const detailsRef = useRef(null);
  const previousIndex = useRef(0);
  const direction = useRef(1);
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
    skipSnaps: false,
    watchFocus: false,
  });
  const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
        visual.style.setProperty('--slide-scale', motion.matches ? 1 : 1 - distance * 0.1);
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
        gsap.from('.is-active .project-gallery-heading > *', {
          x: direction.current * 18,
          opacity: 0,
          duration: 0.45,
          stagger: 0.045,
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
    }, detailsRef);
    return () => context.revert();
  }, [activeIndex]);

  const goTo = (index) => emblaApi?.scrollTo(index, reduceMotion());
  const previous = () => emblaApi?.scrollPrev(reduceMotion());
  const next = () => emblaApi?.scrollNext(reduceMotion());

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
    <div className="project-gallery" role="region" aria-roledescription="carousel" aria-label="Portfolio projects" onKeyDown={handleKeyDown}>
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
                    <img src={project.imageUrl} alt={project.title} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" draggable={false} />
                    <span className="project-gallery-hover-cue" aria-hidden="true">
                      {isActive ? 'View case study' : 'Select project'}
                      {isActive ? <FiArrowUpRight size={16} /> : <FiArrowRight size={16} />}
                    </span>
                  </span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <div className="project-gallery-navigation">
          <span className="label project-gallery-count" aria-hidden="true">{String(activeIndex + 1).padStart(2, '0')} <span>/ {String(projects.length).padStart(2, '0')}</span></span>
          <div className="project-gallery-picker">
            <select aria-label="Choose a project" value={activeIndex} onChange={event => goTo(Number(event.target.value))}>
              {projects.map((project, index) => <option key={project.title} value={index}>{project.title}</option>)}
            </select>
            <FiChevronDown size={14} aria-hidden="true" />
          </div>
          <div className="project-gallery-arrows">
            <button type="button" className="project-gallery-arrow" onClick={previous} aria-label="Previous project" title="Previous project"><FiArrowLeft size={20} aria-hidden="true" /></button>
            <button type="button" className="project-gallery-arrow" onClick={next} aria-label="Next project" title="Next project"><FiArrowRight size={20} aria-hidden="true" /></button>
          </div>
        </div>

        <p className="sr-only" role="status" aria-live="polite">Project {activeIndex + 1} of {projects.length}: {projects[activeIndex].title}</p>
        {/* Overlapping grid panels reserve room for the longest description. */}
        <div className="project-gallery-details" ref={detailsRef}>
          {projects.map((project, index) => {
            const isActive = index === activeIndex;
            return (
              <div className={`project-gallery-panel${isActive ? ' is-active' : ''}`} key={project.title} aria-hidden={!isActive} inert={!isActive}>
                <div className="project-gallery-heading">
                  {project.status && <span className="label project-gallery-status">{project.status}</span>}
                  <h3 className="project-gallery-title">{project.title}</h3>
                  <button type="button" className="label visit-link project-gallery-case-link" onClick={() => onSelect(project)}>View case study <FiArrowRight size={16} aria-hidden="true" /></button>
                </div>
                <div className="project-gallery-copy">
                  <p id={`project-description-${index}`} className="body">{project.description}</p>
                  <ul className="project-gallery-tags" aria-label="Technologies">
                    {project.tags.map(tag => <li className="label-xs" key={tag}>{tag}</li>)}
                  </ul>
                  <div className="project-gallery-links">
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
