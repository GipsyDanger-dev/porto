import { useState } from "react";
import { GsapReveal } from "../GsapReveal";

const organizations = [
  {
    name: "PT. Jogja Creative Production",
    period: "Jul 2026 – Sekarang",
    duration: "1 Bulan",
    type: "Magang",
    location: "Sleman, Yogyakarta",
    roles: [
      {
        title: "Artificial Intelligence Engineer",
        period: "Jul 2026 – Sekarang",
        duration: "1 bln",
        description:
          "Designing and developing AI-powered applications by leveraging Large Language Models (LLMs), AI agents, and workflow automation. Responsible for integrating AI models into real-world systems, optimizing business processes, and building scalable intelligent solutions — including developing REST APIs and backend services, designing Retrieval-Augmented Generation (RAG) pipelines, and collaborating with cross-functional teams to deliver production-ready AI solutions.",
        skills: [
          "Python",
          "FastAPI",
          "LangChain",
          "OpenAI API",
          "Gemini API",
          "Claude API",
          "n8n",
          "Docker",
          "PostgreSQL",
          "RAG",
          "REST API",
        ],
      },
    ],
  },
  {
    name: "HMPSTI VOKASI UB",
    period: "Jan 2025 – Des 2025",
    duration: "1 Tahun",
    type: "Purnawaktu",
    location: "Kota Malang, Jawa Timur",
    featuredRoles: [
      {
        title: "Expert Staff of Research and Technology Department",
        period: "Jan 2025 – Des 2025",
        duration: "1 thn",
        description:
          "Contributed to the development and implementation of technology solutions to support organizational programs. Involved in project management, backend development, and team collaboration to improve system effectiveness and efficiency.",
        skills: ["Manajemen Proyek", "Backend Developer"],
      },
      {
        title: "Project Manager – TechFair Vol. 2",
        period: "Nov 2025",
        duration: "1 bln",
        description:
          "Led overall planning, coordination, and execution of a flagship technology exhibition. Managed cross-functional teams, oversaw event timelines, and ensured smooth operations including participant flow and on-site activities.",
        skills: ["SDM", "Manajemen Proyek"],
      },
      {
        title: "Project Manager – TechFair Vol. 1",
        period: "Jun 2025",
        duration: "1 bln",
        description:
          "Managed a student technology exhibition at Vocational UB. Led coordination across 7 organizing divisions and showcased over 100 innovative projects.",
        skills: ["SDM", "Teknologi Informasi"],
      },
    ],
    otherRoles: [
      {
        title: "Deputy Coordinator Project Planner – SAMBA TI",
        period: "Sep 2025 – Des 2025",
        duration: "4 bln",
        description:
          "Supervised the Project Planner division in planning and executing new student orientation programs. Managed event concepts, timelines, and cross-team coordination to ensure structured, efficient, and impactful program delivery.",
        skills: ["SDM", "Koordinator Lapangan"],
      },
      {
        title: "Public Relations Coordinator – Think Solve Innovation",
        period: "Okt 2025",
        duration: "1 bln",
        description:
          "Managed communication, publication, and event branding for an IT seminar for 250+ new students. Coordinated with cross-functional teams to ensure consistent messaging and effective audience engagement.",
        skills: ["SDM", "Hubungan Masyarakat"],
      },
      {
        title: "Deputy Project Planner Coordinator – Techno Cup",
        period: "Okt 2025",
        duration: "1 bln",
        description:
          "Managed event planning and execution for a city-scale Mobile Legends tournament. Coordinated a team of 7 committee members, handled scheduling, and ensured smooth participation of 20 competing teams.",
        skills: ["SDM", "Dukungan Teknis"],
      },
      {
        title: "Project Planner Coordinator – Tech Bridge Academy",
        period: "Mei 2025",
        duration: "1 bln",
        description:
          "Coordinated project planning and execution in a cybersecurity bootcamp environment, ensuring structured program delivery and effective team collaboration.",
        skills: ["Manajemen Proyek", "SDM"],
      },
      {
        title: "Project Planner Staff – TechPlanner",
        period: "Mei 2025",
        duration: "1 bln",
        description:
          "Supported the planning and execution of IT-focused student programs by developing event concepts and timelines, coordinating with cross-functional teams.",
        skills: ["Manajemen Proyek", "SDM"],
      },
    ],
  },
  {
    name: "DPM Vokasi Universitas Brawijaya",
    period: "Okt 2024 – Des 2024",
    duration: "3 Bulan",
    type: "Purnawaktu",
    location: "Kota Malang, Jawa Timur",
    roles: [
      {
        title: "Media, Information & Creative Bureau Intern",
        period: "Okt 2024 – Des 2024",
        duration: "3 bln",
        description:
          "Developed and edited organizational profile content to ensure accurate information, consistent language, and a strong professional representation of the Student Representative Council.",
        skills: ["Adobe Premiere Pro", "Pengeditan Video"],
      },
      {
        title: "Creative Design & Media Coordinator – BPPUM",
        period: "Okt 2024 – Nov 2024",
        duration: "2 bln",
        description:
          "Led the creative design and media division in developing visual content and communication materials to support student election activities. Managed branding, publication strategies, and digital media content.",
        skills: ["Desain Kreatif", "Hubungan Masyarakat"],
      },
    ],
  },
];

const RoleEntry = ({ role, isLast }) => (
  <div style={{ paddingBottom: isLast ? 0 : 'var(--space-6)', marginBottom: isLast ? 0 : 'var(--space-6)', borderBottom: isLast ? 'none' : '1px solid var(--outline-variant)' }}>
    <div className="flex flex-wrap items-center gap-2 mb-2">
      <h4
        style={{
          fontFamily: 'var(--sans)',
          fontSize: 'var(--body)',
          fontWeight: 600,
          color: 'var(--on-surface)',
          lineHeight: 1.35,
        }}
      >
        {role.title}
      </h4>
    </div>
    <div className="flex flex-wrap items-center gap-2 mb-3">
      <span className="chip">{role.period}</span>
      <span className="label" style={{ color: 'var(--outline)' }}>{role.duration}</span>
    </div>
    <p className="small" style={{ marginBottom: 'var(--space-3)' }}>
      {role.description}
    </p>
    <div className="flex flex-wrap gap-1.5">
      {role.skills.map((skill) => (
        <span
          key={skill}
          className="label-xs"
          style={{
            color: 'var(--on-surface-variant)',
            background: 'var(--surface-high)',
            padding: 'var(--space-1) var(--space-2)',
            border: '1px solid var(--outline-variant)',
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

const OrgCard = ({ org, index }) => {
  const [expanded, setExpanded] = useState(false);
  const hasOtherRoles = org.otherRoles && org.otherRoles.length > 0;
  const featuredRoles = org.featuredRoles || org.roles;

  return (
    <GsapReveal delay={0.1}>
      <div
        style={{
          borderTop: index > 0 ? '1px solid var(--outline-variant)' : 'none',
          paddingTop: index > 0 ? '56px' : 0,
        }}
      >
        {/* Org Header */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-8">
          <div>
            <h3 className="h3" style={{ marginBottom: 'var(--space-2)' }}>
              {org.name}
            </h3>
            <div className="flex flex-wrap items-center gap-3">
              <span className="label" style={{ color: 'var(--outline)' }}>{org.location}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="chip">{org.type}</span>
            <span className="label" style={{ color: 'var(--outline)' }}>{org.duration}</span>
          </div>
        </div>

        {/* Featured Roles */}
        <div>
          {featuredRoles.map((role, i) => (
            <RoleEntry key={i} role={role} isLast={i === featuredRoles.length - 1 && !expanded} />
          ))}
        </div>

        {/* Other Roles (expanded) */}
        {hasOtherRoles && expanded && (
          <div className="reveal-down">
            {org.otherRoles.map((role, i) => (
              <RoleEntry key={`other-${i}`} role={role} isLast={i === org.otherRoles.length - 1} />
            ))}
          </div>
        )}

        {/* Show More Button */}
        {hasOtherRoles && (
          <button
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
            className="label-lg expand-toggle"
            style={{
              color: 'var(--secondary)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 'var(--space-4) 0',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}
          >
            {expanded ? 'Show Less' : `Show All (${org.otherRoles.length + featuredRoles.length} roles)`}
            <span
              aria-hidden="true"
              style={{
                display: 'inline-block',
                transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform var(--dur-base) var(--ease-out)',
              }}
            >
              ↓
            </span>
          </button>
        )}
      </div>
    </GsapReveal>
  );
};

export const Organization = () => {
  return (
    <section id="experience" style={{ padding: 'var(--section-gap) 0' }}>
      <div className="max-w-5xl mx-auto px-6 md:px-16">
        <GsapReveal>
          <div style={{ marginBottom: 'var(--header-gap)' }}>
            <div className="section-label">Experience</div>
            <h2 className="h2">
              Organizations &amp; Work<em className="flourish">.</em>
            </h2>
          </div>
        </GsapReveal>

        {organizations.map((org, i) => (
          <OrgCard key={i} org={org} index={i} />
        ))}
      </div>
    </section>
  );
};
