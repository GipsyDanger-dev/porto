import { RevealOnScroll } from "../RevealOnScroll";
import {
  FaReact, FaPython, FaJava, FaHtml5, FaCss3Alt, FaRust, FaBriefcase, FaGraduationCap
} from 'react-icons/fa';
import { 
  SiTailwindcss, SiJavascript, SiMongodb, SiDart
} from 'react-icons/si';


const skills = [
  { name: "React", icon: <FaReact /> },
  { name: "Tailwind CSS", icon: <SiTailwindcss /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "Python", icon: <FaPython /> },
  { name: "Java", icon: <FaJava /> },
  { name: "MongoDB", icon: <SiMongodb /> },
  { name: "Dart", icon: <SiDart /> },
  { name: "Rust", icon: <FaRust /> },
  { name: "HTML", icon: <FaHtml5 /> },
  { name: "CSS", icon: <FaCss3Alt /> },
];

const educationData = [
  {
    icon: <FaGraduationCap />,
    date: '2024 - 2026',
    title: 'Associate Degree in Information Technology',
    institution: 'Brawijaya University',
  },
  {
    icon: <FaGraduationCap />,
    date: '2021 - 2024',
    title: 'Mathematics and Natural Sciences',
    institution: 'State Senior High School 3 of Cilacap',
  },
];

const experienceData = [
  {
    icon: <FaBriefcase />,
    date: '2025 - Sekarang',
    title: 'Staff Expert of Research and Technology',
    institution: 'HMPSTI Brawijaya University',
  },
  {
    icon: <FaBriefcase />,
    date: '2024',
    title: 'Editor & Script Assistant',
    institution: 'State Senior High School 3 of Cilacap',
  },
];

// Komponen bantu untuk Timeline Item agar rapi
const TimelineItem = ({ icon, date, title, institution }) => (
  <div className="relative pl-8 group">
    {/* Lingkaran ikon di timeline */}
    <div className="absolute left-0 top-1 flex items-center justify-center w-6 h-6 bg-gray-800 text-blue-400 rounded-full ring-4 ring-gray-900 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
        {icon}
    </div>
    {/* Latar belakang yang menyala saat hover */}
    <div className="absolute -inset-x-2 -inset-y-1 bg-white/5 opacity-0 group-hover:opacity-100 rounded-lg transition-opacity duration-300"></div>
    {/* Konten teks */}
    <div className="relative">
        <p className="text-xs text-gray-400 mb-1">{date}</p>
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="text-sm text-gray-400">{institution}</p>
    </div>
  </div>
);


export const About = () => {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center py-20">
      <RevealOnScroll>
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            About Me
          </h2>

          {/* Kartu Perkenalan */}
          <div className="bg-gray-800/20 border border-white/10 rounded-2xl p-8 mb-12">
            <p className="text-gray-300 text-lg leading-relaxed text-center">
              Halo! Saya Adam, seorang video editor, developer, dan blockchain enthusiast dengan minat besar dalam dunia teknologi dan kreativitas. Saya selalu terbuka untuk kolaborasi dan proyek baru yang menantang. 🚀
            </p>
          </div>
          
          {/* Kartu Skillset */}
          <div className="bg-gray-800/20 border border-white/10 rounded-2xl p-8 mb-12">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">My Skillset</h3>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-6">
                {skills.map((skill) => (
                  <div key={skill.name} className="group flex flex-col items-center justify-center text-center p-3 transition-all duration-300">
                    <div className="text-4xl text-gray-400 group-hover:text-cyan-400 group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                        {skill.icon}
                    </div>
                    <span className="mt-2 font-medium text-gray-400 group-hover:text-white text-sm transition-colors duration-300">{skill.name}</span>
                  </div>
                ))}
              </div>
          </div>

          {/* 2. LAYOUT BARU: Pendidikan dan Pengalaman berdampingan */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* KOLOM PENDIDIKAN */}
            <div className="group relative bg-gray-800/20 p-8 rounded-2xl border border-white/10 hover:-translate-y-1 transition-all duration-300 hover:border-blue-500/30">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Education</h3>
                <div className="relative space-y-8 border-l-2 border-dashed border-white/10">
                    {educationData.map((item, index) => (
                        <TimelineItem key={index} {...item} />
                    ))}
                </div>
            </div>

            {/* KOLOM PENGALAMAN */}
            <div className="group relative bg-gray-800/20 p-8 rounded-2xl border border-white/10 hover:-translate-y-1 transition-all duration-300 hover:border-blue-500/30">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">Experience</h3>
                <div className="relative space-y-8 border-l-2 border-dashed border-white/10">
                    {experienceData.map((item, index) => (
                        <TimelineItem key={index} {...item} />
                    ))}
                </div>
            </div>

          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};

(() => {
  const els = [...document.querySelectorAll('body *')];
  return els.filter(e => {
    const r = e.getBoundingClientRect();
    return r.width>0 && r.height>0 && r.top<=0 && r.left<=0 && r.bottom>=window.innerHeight && r.right>=window.innerWidth;
  }).map(e => ({tag: e.tagName, id: e.id, cls: e.className, z: getComputedStyle(e).zIndex, bg: getComputedStyle(e).backgroundColor}));
})()