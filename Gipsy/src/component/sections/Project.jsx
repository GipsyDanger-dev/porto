import { RevealOnScroll } from "../RevealOnScroll";

const projectsData = [
  {
    title: "Inventory Management System with AI",
    description: "Developed a warehouse inventory system utilizing AI for optimization.",
    tags: ["React", "Java", "MongoDB", "Python"],
    imageUrl: "https://placehold.co/600x400/1E293B/9CA3AF/png",
    projectUrl: "#",
  },
  {
    title: "Inventory Management System with AI",
    description: "Developed a warehouse inventory system utilizing AI for optimization.",
    tags: ["React", "Java", "MongoDB", "Python"],
    imageUrl: "https://placehold.co/600x400/374151/E5E7EB/png",
    projectUrl: "#",
  },
  {
    title: "Short Movie Project",
    description: "Edited and refined video footage using Adobe Premiere Pro & After Effects. Assisted in writing the script to ensure a compelling storyline.",
    tags: ["PremierePro", "AfterEffects", "Blender"],
    imageUrl: "https://placehold.co/600x400/111827/F9FAFB/png",
    projectUrl: "#",
  },
  {
    title: "Inventory Management System with AI",
    description: "Developed a warehouse inventory system utilizing AI for optimization.",
    tags: ["React", "Java", "MongoDB", "Python"],
    imageUrl: "https://placehold.co/600x400/0F172A/64748B/png",
    projectUrl: "#",
  },
];

export const Project = () => {
  return (
    <section
      id="projects"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projectsData.map((project, index) => (
              <div 
                key={index}
                className="bg-gray-800/20 rounded-xl border border-white/10 flex flex-col hover:-translate-y-1 hover:border-blue-500/30 hover:shadow-[0_2px_8px_rgba(59,130,246,0.2)] transition-all"
              >
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="rounded-t-xl w-full h-48 object-cover bg-gray-700"
                />
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4 flex-grow">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tech, key) => (
                      <span
                        key={key}
                        className="bg-blue-500/10 text-blue-500 px-2 py-1 rounded-full text-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a
                    href={project.projectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto inline-block bg-blue-600 text-white text-center py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};