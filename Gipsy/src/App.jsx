import { useState, lazy, Suspense } from 'react';
import { LoadingScreen } from './component/LoadingScreen';
import { Navbar } from './component/Navbar';
import StaggeredMenu from './component/StaggeredMenu';
import { Home } from './component/sections/Home';
import { Marquee } from './component/Marquee';
import { ErrorBoundary } from './component/ErrorBoundary';
import "./index.css";

const About = lazy(() => import('./component/sections/About').then(m => ({ default: m.About })));
const Project = lazy(() => import('./component/sections/Project').then(m => ({ default: m.Project })));
const Organization = lazy(() => import('./component/sections/Organization').then(m => ({ default: m.Organization })));
const Certification = lazy(() => import('./component/sections/Certification').then(m => ({ default: m.Certification })));
const Contact = lazy(() => import('./component/sections/Contact').then(m => ({ default: m.Contact })));
const Footer = lazy(() => import('./component/Footer').then(m => ({ default: m.Footer })));

const menuItems = [
  { label: 'Home', ariaLabel: 'Go to home section', link: '#home' },
  { label: 'About', ariaLabel: 'Learn about me', link: '#about' },
  { label: 'Projects', ariaLabel: 'View my projects', link: '#projects' },
  { label: 'Experience', ariaLabel: 'View my experience', link: '#experience' },
  { label: 'Certs', ariaLabel: 'View certifications', link: '#certifications' },
  { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' },
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com/GipsyDanger-dev' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/adamfairuz' },
  { label: 'Discord', link: '#' },
];

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div
        // inert while loading: the content is invisible but was still focusable,
        // so Tab walked into it behind the overlay.
        inert={!isLoaded ? '' : undefined}
        className={`relative min-h-screen transition-opacity duration-300 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ background: 'var(--bg)', color: 'var(--on-surface)' }}
      >
        {/* Desktop nav */}
        <Navbar />

        {/* Mobile nav — StaggeredMenu */}
        <div className="md:hidden">
          <StaggeredMenu
            isFixed
            position="right"
            items={menuItems}
            socialItems={socialItems}
            displaySocials
            displayItemNumbering
            logoText="Gipsy.Dev"
            menuButtonColor="#e0e2e8"
            openMenuButtonColor="#ffffff"
            changeMenuColorOnOpen
            colors={['#1c2024', '#272a2e']}
            accentColor="#f2640f"
            closeOnClickAway
          />
        </div>

        {/* Skip to content for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-9999 focus:px-4 focus:py-2 focus:bg-(--secondary) focus:text-white"
          style={{ fontFamily: 'var(--mono)', fontSize: '12px' }}
        >
          Skip to content
        </a>

        <Home />
        <main id="main-content">
          <ErrorBoundary>
            <Suspense fallback={null}>
              <About />
              <Marquee />
              <Project />
              <Organization />
              <Certification />
              <Contact />
            </Suspense>
          </ErrorBoundary>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
