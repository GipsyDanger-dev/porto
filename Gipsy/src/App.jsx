import { useState, lazy, Suspense } from 'react';
import { LoadingScreen } from './component/LoadingScreen'
import { Navbar } from './component/Navbar';
import { MobileMenu } from './component/MobileMenu';
import { Home } from './component/sections/Home';
import "./index.css";

const About = lazy(() => import('./component/sections/About').then(m => ({ default: m.About })));
const FeaturedProject = lazy(() => import('./component/sections/FeaturedProject').then(m => ({ default: m.FeaturedProject })));
const CurrentlyBuilding = lazy(() => import('./component/sections/CurrentlyBuilding').then(m => ({ default: m.CurrentlyBuilding })));
const Project = lazy(() => import('./component/sections/Project').then(m => ({ default: m.Project })));
const Certification = lazy(() => import('./component/sections/Certification').then(m => ({ default: m.Certification })));
const Contact = lazy(() => import('./component/sections/Contact').then(m => ({ default: m.Contact })));
const Footer = lazy(() => import('./component/Footer').then(m => ({ default: m.Footer })));

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
  <>
    {!isLoaded && <LoadingScreen onComplete={() => setIsLoaded(true)} />}{""}
      <div
       className={`relative min-h-screen transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"
      } bg-black text-gray-100 `}
      >
        <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <Home />
        <Suspense fallback={null}>
          <About />
          <FeaturedProject />
          <CurrentlyBuilding />
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
