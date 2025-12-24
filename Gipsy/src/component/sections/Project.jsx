import { RevealOnScroll } from "../RevealOnScroll";

const projectsData = [
  {
    title: "AI-Powered Inventory System",
    description: "Sistem manajemen gudang berbasis AI untuk optimasi inventaris dan perkiraan permintaan.",
    tags: ["React", "Python", "FastAPI", "MongoDB"],
    imageUrl: "https://placehold.co/600x400/1E293B/9CA3AF/png",
    projectUrl: "#",
  },
  {
    title: "Cinematic Short — Echoes",
    description: "Editor utama untuk film pendek, menangani editing, grading, dan motion graphics.",
    tags: ["Premiere Pro", "After Effects", "Davinci Resolve"],
    imageUrl: "https://placehold.co/600x400/374151/E5E7EB/png",
    projectUrl: "#",
  },
  {
    title: "E-Commerce Platform",
    description: "Platform penjualan online dengan fitur katalog, keranjang, dan checkout.",
    tags: ["Vue.js", "Node.js", "PostgreSQL", "Redis"],
    imageUrl: "https://placehold.co/600x400/111827/F9FAFB/png",
    projectUrl: "#",
  },
  {
    title: "Realtime Chat App",
    description: "Aplikasi chat real-time dengan autentikasi dan storage pesan terpusat.",
    tags: ["Angular", "Firebase", "TypeScript"],
    imageUrl: "https://placehold.co/600x400/0F172A/64748B/png",
    projectUrl: "#",
  },
    {
    title: "Landing Page Modern",
    description: "Landing page produk responsif dengan animasi halus dan CTA kuat.",
    tags: ["Svelte", "TailwindCSS", "Framer Motion"],
    imageUrl: "https://placehold.co/600x400/1e1e1e/ffffff/png",
    projectUrl: "#",
  },
    {
    title: "Personal Portfolio",
    description: "Website portfolio untuk menampilkan proyek, blog kecil, dan kontak.",
    tags: ["HTML", "CSS", "JavaScript"],
    imageUrl: "https://placehold.co/600x400/000000/ffffff/png",
    projectUrl: "#",
  },
];

export const Project = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex flex-col justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projectsData.map((project, index) => (
              <div
                key={index}
                className="group relative h-[300px] border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                  style={{ backgroundImage: `url(${project.imageUrl})` }}
                ></div>

                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent opacity-90 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="absolute bottom-0 p-6 w-full flex flex-col text-left">
                  <h3 className="text-xl font-bold mb-2 text-white">
                    {project.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  <div className="opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-[200px] overflow-hidden transition-all duration-500 ease-in-out">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tech, key) => (
                        <span
                          key={key}
                          className="text-xs font-medium px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <a
                      href={project.projectUrl}
                      className="inline-block w-full bg-blue-600 text-white py-2 rounded-lg font-medium text-center hover:bg-blue-700 transition duration-300"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};