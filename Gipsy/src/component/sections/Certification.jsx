import { GsapReveal, GsapStagger } from "../GsapReveal";
import sertif1Img from "../../pct/sertif/Sertif1.jpg";
import sertif2Img from "../../pct/sertif/sertif2.jpg";
import sertif3Img from "../../pct/sertif/Sertif3.png";
import sertif4Img from "../../pct/sertif/Sertif4.png";
import sertif5Img from "../../pct/sertif/Sertif5.png";
import sertif6Img from "../../pct/sertif/Sertif6.png";
import sertif7Img from "../../pct/sertif/Sertif7.png";
import sertif8Img from "../../pct/sertif/Sertif8.png";

const certifications = [
  {
    title: "Learn Power BI Data Modeling with DAX",
    issuer: "Simplilearn SkillUp",
    issuedDate: "23rd April 2026",
    credentialUrl: "https://simpli-web.app.link/e/su0diV4wT2b",
    imageUrl: sertif1Img,
    category: "Data",
  },
  {
    title: "Innovating with Google Cloud AI",
    issuer: "Simplilearn SkillUp (Google Cloud)",
    issuedDate: "21st April 2026",
    credentialUrl: "https://simpli-web.app.link/e/kBH5eFLrT2b",
    imageUrl: sertif2Img,
    category: "AI",
  },
  {
    title: "Dive Deeper into GA4 Data and Reports",
    issuer: "Skillshop",
    issuedDate: "20th April 2026",
    credentialUrl: "https://www.credential.net/91b4ee1f-055f-4837-b66b-de64328ef20e",
    imageUrl: sertif3Img,
    category: "Analytics",
  },
  {
    title: "Belajar Penerapan Data Science dengan Microsoft Fabric",
    issuer: "Dicoding Indonesia",
    issuedDate: "20th May 2026",
    credentialUrl: "https://www.dicoding.com/certificates/JMZVOLOJNXN9",
    imageUrl: sertif4Img,
    category: "Data Science",
  },
  {
    title: "Introduction to Artificial Intelligence",
    issuer: "IBM SkillsBuild",
    issuedDate: "20th May 2026",
    credentialUrl: "https://skills.yourlearning.ibm.com/certificate/share/1ace2f45b6ewogICJvYmplY3RJZCIgOiAiQUxNLUNPVVJTRV80MDU4OTE4IiwKICAibGVhcm5lckNOVU0iIDogIjc2NjExMjVSRUciLAogICJvYmplY3RUeXBlIiA6ICJBQ1RJVklUWSIKfQ0ef9d5fa08-10",
    imageUrl: sertif5Img,
    category: "AI",
  },
  {
    title: "AI Ethics",
    issuer: "IBM SkillsBuild",
    issuedDate: "24th May 2026",
    credentialUrl: "https://skills.yourlearning.ibm.com/certificate/share/0f14650bd7ewogICJsZWFybmVyQ05VTSIgOiAiNzY2MTEyNVJFRyIsCiAgIm9iamVjdFR5cGUiIDogIkFDVElWSVRZIiwKICAib2JqZWN0SWQiIDogIkFMTS1DT1VSU0VfNDA1ODkyNyIKfQ3a9df93d8e-10",
    imageUrl: sertif6Img,
    category: "AI",
  },
  {
    title: "Introduction to Generative AI",
    issuer: "IBM SkillsBuild",
    issuedDate: "24th May 2026",
    credentialUrl: "https://skills.yourlearning.ibm.com/certificate/share/23925c9565ewogICJvYmplY3RUeXBlIiA6ICJBQ1RJVklUWSIsCiAgImxlYXJuZXJDTlVNIiA6ICI3NjYxMTI1UkVHIiwKICAib2JqZWN0SWQiIDogIkFMTS1DT1VSU0VfNDA1ODg1OSIKfQ3395ddce87-10",
    imageUrl: sertif7Img,
    category: "AI",
  },
  {
    title: "Membangun Aplikasi Gen AI dengan Microsoft Azure",
    issuer: "Dicoding Indonesia",
    issuedDate: "24th May 2026",
    credentialUrl: "https://www.dicoding.com/certificates/NVP7N3YRGZR0",
    imageUrl: sertif8Img,
    category: "Cloud / AI",
  },
];

const CertCard = ({ cert, index }) => {
  const num = String(index + 1).padStart(2, '0');

  return (
    <a
      href={cert.credentialUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="cert-card group block"
      style={{
        textDecoration: 'none',
        background: 'var(--surface)',
        border: '1px solid var(--outline-variant)',
        overflow: 'hidden',
        transition: 'border-color 0.4s ease, box-shadow 0.4s ease, transform 0.4s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(242,100,15,0.2)';
        e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.3), 0 0 24px rgba(242,100,15,0.06)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--outline-variant)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '16 / 10', background: 'var(--surface-high)' }}
      >
        <img
          src={cert.imageUrl}
          alt={cert.title}
          loading="lazy"
          decoding="async"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            filter: 'saturate(0.85) brightness(0.9)',
            transition: 'filter 0.5s ease, transform 0.6s cubic-bezier(0.4,0,0.2,1)',
          }}
          className="group-hover:scale-[1.04]"
          onMouseEnter={e => { e.currentTarget.style.filter = 'saturate(1) brightness(1)'; }}
          onMouseLeave={e => { e.currentTarget.style.filter = 'saturate(0.85) brightness(0.9)'; }}
        />
        {/* Bottom fade */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-1"
          style={{ height: '50%', background: 'linear-gradient(to top, var(--surface), transparent)' }}
        />
      </div>

      {/* Content */}
      <div style={{ padding: '20px 22px 22px' }}>
        {/* Number + Category */}
        <div className="flex items-center justify-between" style={{ marginBottom: '12px' }}>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '9px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--outline)',
            }}
          >
            {num}
          </span>
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '9px',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--secondary)',
              background: 'rgba(242,100,15,0.08)',
              padding: '3px 8px',
            }}
          >
            {cert.category}
          </span>
        </div>

        {/* Title */}
        <h3
          className="transition-colors duration-300"
          style={{
            fontFamily: 'var(--serif)',
            fontSize: '17px',
            fontWeight: 700,
            color: 'var(--on-surface)',
            lineHeight: 1.3,
            marginBottom: '8px',
          }}
        >
          {cert.title}
        </h3>

        {/* Issuer */}
        <p
          style={{
            fontFamily: 'var(--sans)',
            fontSize: '13px',
            color: 'var(--on-surface-variant)',
            marginBottom: '16px',
          }}
        >
          {cert.issuer}
        </p>

        {/* Footer divider */}
        <div
          style={{
            borderTop: '1px solid var(--outline-variant)',
            paddingTop: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '10px',
              color: 'var(--outline)',
              letterSpacing: '0.05em',
            }}
          >
            {cert.issuedDate}
          </span>
          <span
            className="inline-flex items-center gap-1 transition-all duration-300"
            style={{
              fontFamily: 'var(--mono)',
              fontSize: '10px',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--secondary)',
            }}
          >
            Verify <span className="inline-block group-hover:translate-x-0.5 transition-transform duration-200">&rarr;</span>
          </span>
        </div>
      </div>
    </a>
  );
};

export const Certification = () => {
  return (
    <section id="certifications" style={{ padding: 'var(--section-gap) 0' }}>
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <GsapReveal>
          <div className="flex justify-between items-end" style={{ marginBottom: '64px' }}>
            <div>
              <div className="section-label">Credentials</div>
              <h2
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(36px, 5vw, 52px)',
                  fontWeight: 700,
                  letterSpacing: '-0.015em',
                  color: 'var(--on-surface)',
                }}
              >
                Certifications<em style={{ fontStyle: 'italic', color: 'var(--on-surface-variant)' }}>.</em>
              </h2>
            </div>
            <p
              className="hidden md:block"
              style={{
                maxWidth: '260px',
                fontFamily: 'var(--sans)',
                fontSize: '14px',
                lineHeight: '23px',
                color: 'var(--on-surface-variant)',
                letterSpacing: '-0.01em',
              }}
            >
              Verified credentials across data science, AI, cloud, and analytics.
            </p>
          </div>
        </GsapReveal>

        <GsapStagger
          className="grid"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}
          stagger={0.08}
        >
          {certifications.map((cert, index) => (
            <CertCard key={index} cert={cert} index={index} />
          ))}
        </GsapStagger>
      </div>
    </section>
  );
};
