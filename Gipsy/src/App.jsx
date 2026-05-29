import { useState, lazy, Suspense } from 'react';
import { LoadingScreen } from './component/LoadingScreen'
import { Navbar } from './component/Navbar';
import { MobileMenu } from './component/MobileMenu';
import { Home } from './component/sections/Home';
import { Marquee } from './component/Marquee';
import "./index.css";

const About = lazy(() => import('./component/sections/About').then(m => ({ default: m.About })));
const Project = lazy(() => import('./component/sections/Project').then(m => ({ default: m.Project })));
const Certification = lazy(() => import('./component/sections/Certification').then(m => ({ default: m.Certification })));
const Contact = lazy(() => import('./component/sections/Contact').then(m => ({ default: m.Contact })));
const Footer = lazy(() => import('./component/Footer').then(m => ({ default: m.Footer })));

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}
      <div
        className={`relative min-h-screen transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        style={{ background: 'var(--bg)', color: 'var(--on-surface)' }}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Home />
        <Marquee />
        <Suspense fallback={null}>
          <About />
          <Project />
          <Certification />
          <Contact />
          <Footer />
        </Suspense>
      </div>
    </>
  );
}

export default App
