import { RevealOnScroll } from "../RevealOnScroll";
import { FaGithub, FaHammer } from "react-icons/fa";
import stockPPImg from "../../pct/StockPP.png";

const ongoingProjects = [
  {
    title: "StockPP",
    description:
      "A full-stack application using LSTM Deep Learning to predict stock prices. Built with React, FastAPI, TensorFlow, and Supabase for real-time predictions and model versioning.",
    tags: ["React", "FastAPI", "TensorFlow", "LSTM", "Supabase", "Tailwind CSS", "Recharts"],
    imageUrl: stockPPImg,
    githubUrl: "https://github.com/GipsyDanger-dev/StockPP",
    progress: 55,
  },
  {
    title: "Coming Soon",
    description:
      "Another exciting project in the pipeline. Stay tuned for updates!",
    tags: ["TBD"],
    imageUrl: "",
    githubUrl: "",
    progress: 10,
  },
];

export const CurrentlyBuilding = () => {
  return (
    <section id="currently-building" className="py-20 relative">
      {/* Background accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] -z-10 pointer-events-none" />

      <RevealOnScroll>
        <div className="max-w-5xl mx-auto px-4 z-10 relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-medium tracking-wider uppercase px-4 py-2 rounded-full mb-4">
              <FaHammer className="text-sm" />
              <span>In Progress</span>
            </div>
            <h2 className="text-4xl font-bold bg-linear-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Currently Building
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ongoingProjects.map((project, index) => (
              <div
                key={index}
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10"
              >
                {/* Image placeholder */}
                <div className="aspect-video w-full bg-linear-to-br from-amber-500/10 via-orange-500/5 to-transparent border-b border-white/10 flex items-center justify-center">
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center px-4">
                      <div className="w-16 h-16 mx-auto mb-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                        <FaHammer className="text-2xl text-amber-400/50" />
                      </div>
                      <p className="text-sm text-gray-500">Preview coming soon</p>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    <span className="shrink-0 rounded-full border border-amber-400/40 bg-amber-500/10 px-2.5 py-1 text-[11px] font-medium tracking-wide text-amber-300">
                      IN DEV
                    </span>
                  </div>

                  <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.map((tech, key) => (
                      <span
                        key={key}
                        className="text-xs font-medium px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Progress bar */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-gray-400">Progress</span>
                      <span className="text-xs font-semibold text-amber-400">
                        {project.progress}%
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-700/50 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-linear-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${project.progress}%` }}
                      />
                    </div>
                  </div>

                  {/* GitHub link */}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                    >
                      <FaGithub className="w-4 h-4" />
                      View Repository
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
