import { RevealOnScroll } from "../RevealOnScroll";
import TextType from "../TextType";
import LightRays from "../LightRays";
import fotoHomeImg from "../../pct/Foto_Home.png";

export const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20"
    >
      {/* Light Rays Background Effect */}
      <div className="absolute inset-0 z-0">
        <LightRays
          raysOrigin="top-center"
          raysColor="#3b82f6"
          raysSpeed={1.2}
          lightSpread={0.6}
          rayLength={1.5}
          followMouse={true}
          mouseInfluence={0.15}
          noiseAmount={0.05}
          distortion={0.03}
          fadeDistance={1.2}
          saturation={0.9}
        />
      </div>
      <RevealOnScroll>
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] items-center gap-12 lg:gap-10 min-h-[calc(100vh-6rem)] py-8 lg:py-0">
            <div className="order-2 lg:order-1 text-center lg:text-left max-w-2xl mx-auto lg:mx-0">
              <div className="inline-flex items-center rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-blue-300 mb-6">
                <TextType
                  text={["Full Stack Developer", "Video Editor", "Blockchain Enthusiast", "Creative Technologist"]}
                  typingSpeed={70}
                  pauseDuration={1700}
                  deletingSpeed={40}
                  showCursor={true}
                  cursorCharacter="|"
                  cursorClassName="text-blue-400"
                  variableSpeed={{ min: 50, max: 100 }}
                  textColors={["#60A5FA", "#22D3EE", "#A78BFA", "#34D399"]}
                />
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-6 bg-linear-to-r from-blue-400 via-cyan-300 to-white bg-clip-text text-transparent">
                Hi, I&apos;m Gipsy.Dev
              </h1>

              <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                Halo, saya Adam Fairuz Akmal Aryaguna seorang video editor,
                developer, dan blockchain enthusiast yang menggabungkan
                kreativitas dan teknologi dalam setiap proyek. Berpengalaman di
                Adobe Premiere Pro, After Effects, pengembangan web, dan
                blockchain. Saya selalu tertarik untuk menciptakan solusi
                digital inovatif. 🚀
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center bg-blue-500 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_18px_rgba(59,130,246,0.45)]"
                >
                  View Projects
                </a>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center border border-blue-500/50 text-blue-300 py-3 px-6 rounded-lg font-medium transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-500/10 hover:text-white"
                >
                  Contact Me
                </a>
              </div>
            </div>

            <div className="order-1 lg:order-2 relative flex items-center justify-center lg:justify-end xl:translate-x-12 2xl:translate-x-16">
              <div className="relative w-full max-w-90 lg:max-w-107.5 xl:max-w-117.5 aspect-3/4 overflow-hidden rounded-4xl">
                <img
                  src={fotoHomeImg}
                  alt="Foto Home"
                  className="h-full w-full object-cover object-center"
                />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-black via-black/65 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
      
      {/* Scroll Down Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-10 hidden md:block">
        <a href="#about" className="text-gray-500 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
        </a>
      </div>
    </section>
  );
};
