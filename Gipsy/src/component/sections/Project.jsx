import { RevealOnScroll } from "../RevealOnScroll";
import fruitCheckImg from "../../pct/FruitCheck.png";
import itSolutionImg from "../../pct/IT-Solution.png";
import remindMeImg from "../../pct/RemindMe.png";
import gipsyDevImg from "../../pct/Porto (2).png";

const projectsData = [
  {
    title: "Freshness FruitCheck",
    description: "Deteksi kesegaran buah berbasis AI dengan akurasi tinggi menggunakan Convolutional Neural Network (CNN).",
    tags: ["Python", "TensorFlow", "Keras", "Flask"],
    imageUrl: fruitCheckImg,
    projectUrl: "#",
  },
  {
    title: "RemindMe App",
    description: "Aplikasi pengingat tugas pintar dengan notifikasi real-time dan sinkronisasi lintas perangkat.",
    tags: ["Kotlin", "Jetpack Compose", "Firebase", "Room"],
    imageUrl: remindMeImg,
    projectUrl: "#",
  },
  {
    title: "IT Solution Website",
    description: "Website profil perusahaan modern dengan desain responsif dan optimasi performa tinggi.",
    tags: ["React", "TailwindCSS", "Framer Motion", "Vite"],
    imageUrl: itSolutionImg,
    projectUrl: "#",
  },
  {
    title: "Gipsy.Dev",
    description: "Platform personal branding dan showcase portofolio interaktif dengan efek visual memukau.",
    tags: ["React", "Three.js", "GSAP", "TailwindCSS"],
    imageUrl: gipsyDevImg,
    projectUrl: "#",
  },
];

export const Project = () => {
  return (
    <section
      id="projects"
      className="py-20"
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
                className="group relative border border-white/10 rounded-2xl overflow-hidden cursor-pointer hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300"
              >
                {/* Image */}
                <img 
                  src={project.imageUrl} 
                  alt={project.title}
                  className="w-full aspect-[3/2] object-cover transition-transform duration-500 group-hover:scale-110"
                />

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