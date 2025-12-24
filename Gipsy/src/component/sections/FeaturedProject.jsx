import { RevealOnScroll } from "../RevealOnScroll";

export const FeaturedProject = () => {
  return (
    <section
      id="featured-project"
      className="min-h-screen flex items-center justify-center py-20 relative"
    >
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4 z-10 relative">
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-2 text-purple-400">
              Featured Project
            </h2>
            <h3 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              PasarNgalam
            </h3>
          </div>

          <div className="flex flex-col md:flex-row items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300">
            {/* Left Content */}
            <div className="md:w-1/2 p-8 md:p-12 z-10">
              <p className="text-gray-300 mb-6 text-lg leading-relaxed">
                PasarNgalam is a web app for visualizing personalized Spotify data. View your
                top artists, top tracks, recently played tracks, and detailed
                audio information about each track. Create and save new playlists
                of recommended tracks based on your existing playlists and more.
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                 {["React", "Node.js", "Spotify API", "TailwindCSS"].map((tech, key) => (
                    <span 
                        key={key}
                        className="bg-blue-500/10 text-blue-500 py-1 px-3 rounded-full text-sm hover:bg-blue-500/20 hover:shadow-[0_2px_8px_rgba(59,130,246,0.1)] transition-all"
                    >
                        {tech}
                    </span>
                 ))}
              </div>

              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg font-medium transition hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]"
                >
                  View Project
                </a>
                <a
                  href="#"
                  className="border border-white/30 text-white hover:border-white/50 py-2 px-6 rounded-lg font-medium transition hover:-translate-y-0.5 hover:bg-white/5"
                >
                  Github Code
                </a>
              </div>
            </div>

            {/* Right Image Placeholder */}
            <div className="md:w-1/2 h-full min-h-[300px] bg-gradient-to-br from-blue-900/20 to-purple-900/20 relative group">
                {/* Overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent z-10 opacity-60"></div>
                
                {/* Placeholder content for visualization */}
                <div className="absolute inset-0 flex items-center justify-center z-0">
                    <span className="text-6xl animate-pulse">⚡</span>
                </div>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
