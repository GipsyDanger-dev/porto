import { RevealOnScroll } from "../RevealOnScroll";

export const Home = () => {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative" 
    >
      <RevealOnScroll>
        <div className="text-center z-10 px-4">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent loading-right">Hi, I'm Gipsy.Dev</h1>
        
        <p className="text-gray-400 text-lg mb-8 max-w-lg mx-auto">
        Halo, saya Adam Fairuz Akmal Aryaguna
        seorang video editor, developer, dan blockchain enthusiast yang menggabungkan kreativitas dan teknologi dalam setiap proyek. 
        Berpengalaman di Adobe Premiere Pro, After Effects, pengembangan web, dan blockchain.
        Saya selalu tertarik untuk menciptakan solusi digital inovatif. 🚀
        </p>
        <div className="flex justify-center space-x-4">
            <a href="#Project" className="bg-blue-500 text-white py-3 px-6 rounded font-medium transition relative overflow-hidden hover:-translate-y-0.5 hover:shadow[0_0_15px_rgba(59, 130, 246, 0.5]">View Project</a>

            <a href="#Contact" className="border-blue-500/50 text-blue-500 py-3 px-6 rounded font-medium transition-all duration-200 hover:-translate-y-0.5 hover:shadow[0_0_15px_rgba(59, 130, 246, 0.2)] hover:bg-blue-500/10">Contact Me</a>
        </div>
        </div>  
      </RevealOnScroll>   
    </section>

  );
};
