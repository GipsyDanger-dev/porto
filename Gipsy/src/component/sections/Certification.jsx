import { useState, useCallback } from "react";
import { GsapReveal } from "../GsapReveal";
import CircularGallery from "../CircularGallery";
import sertif1Img from "../../pct/sertif/Sertif1.webp";
import sertif2Img from "../../pct/sertif/sertif2.webp";
import sertif3Img from "../../pct/sertif/Sertif3.webp";
import sertif4Img from "../../pct/sertif/Sertif4.webp";
import sertif5Img from "../../pct/sertif/Sertif5.webp";
import sertif6Img from "../../pct/sertif/Sertif6.webp";
import sertif7Img from "../../pct/sertif/Sertif7.webp";
import sertif8Img from "../../pct/sertif/Sertif8.webp";

const certifications = [
  {
    title: "Learn Power BI Data Modeling with DAX",
    issuer: "Simplilearn SkillUp",
    issuedDate: "23rd April 2026",
    credentialUrl: "https://simpli-web.app.link/e/su0diV4wT2b",
    image: sertif1Img,
    text: "Power BI & DAX",
    category: "Data",
  },
  {
    title: "Innovating with Google Cloud AI",
    issuer: "Simplilearn SkillUp (Google Cloud)",
    issuedDate: "21st April 2026",
    credentialUrl: "https://simpli-web.app.link/e/kBH5eFLrT2b",
    image: sertif2Img,
    text: "Google Cloud AI",
    category: "AI",
  },
  {
    title: "Dive Deeper into GA4 Data and Reports",
    issuer: "Skillshop",
    issuedDate: "20th April 2026",
    credentialUrl: "https://www.credential.net/91b4ee1f-055f-4837-b66b-de64328ef20e",
    image: sertif3Img,
    text: "GA4 Analytics",
    category: "Analytics",
  },
  {
    title: "Belajar Penerapan Data Science dengan Microsoft Fabric",
    issuer: "Dicoding Indonesia",
    issuedDate: "20th May 2026",
    credentialUrl: "https://www.dicoding.com/certificates/JMZVOLOJNXN9",
    image: sertif4Img,
    text: "Data Science",
    category: "Data Science",
  },
  {
    title: "Introduction to Artificial Intelligence",
    issuer: "IBM SkillsBuild",
    issuedDate: "20th May 2026",
    credentialUrl: "https://skills.yourlearning.ibm.com/certificate/share/1ace2f45b6ewogICJvYmplY3RJZCIgOiAiQUxNLUNPVVJTRV80MDU4OTE4IiwKICAibGVhcm5lckNOVU0iIDogIjc2NjExMjVSRUciLAogICJvYmplY3RUeXBlIiA6ICJBQ1RJVklUWSIKfQ0ef9d5fa08-10",
    image: sertif5Img,
    text: "AI Foundations",
    category: "AI",
  },
  {
    title: "AI Ethics",
    issuer: "IBM SkillsBuild",
    issuedDate: "24th May 2026",
    credentialUrl: "https://skills.yourlearning.ibm.com/certificate/share/0f14650bd7ewogICJsZWFybmVyQ05VTSIgOiAiNzY2MTEyNVJFRyIsCiAgIm9iamVjdFR5cGUiIDogIkFDVElWSVRZIiwKICAib2JqZWN0SWQiIDogIkFMTS1DT1VSU0VfNDA1ODkyNyIKfQ3a9df93d8e-10",
    image: sertif6Img,
    text: "AI Ethics",
    category: "AI",
  },
  {
    title: "Introduction to Generative AI",
    issuer: "IBM SkillsBuild",
    issuedDate: "24th May 2026",
    credentialUrl: "https://skills.yourlearning.ibm.com/certificate/share/23925c9565ewogICJvYmplY3RUeXBlIiA6ICJBQ1RJVklUWSIsCiAgImxlYXJuZXJDTlVNIiA6ICI3NjYxMTI1UkVHIiwKICAib2JqZWN0SWQiIDogIkFMTS1DT1VSU0VfNDA1ODg1OSIKfQ3395ddce87-10",
    image: sertif7Img,
    text: "Generative AI",
    category: "AI",
  },
  {
    title: "Membangun Aplikasi Gen AI dengan Microsoft Azure",
    issuer: "Dicoding Indonesia",
    issuedDate: "24th May 2026",
    credentialUrl: "https://www.dicoding.com/certificates/NVP7N3YRGZR0",
    image: sertif8Img,
    text: "Azure Gen AI",
    category: "Cloud / AI",
  },
];

const galleryItems = certifications.map(({ image, text }) => ({ image, text }));

export const Certification = () => {
  const [selected, setSelected] = useState(null);

  const handleItemClick = useCallback((index) => {
    setSelected(certifications[index]);
  }, []);

  const closeOverlay = useCallback(() => {
    setSelected(null);
  }, []);

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
              Verified credentials across data science, AI, cloud, and analytics. Click to view details.
            </p>
          </div>
        </GsapReveal>
      </div>

      {/* Circular Gallery */}
      <div style={{ height: 'min(600px, 70vh)', position: 'relative' }}>
        <CircularGallery
          items={galleryItems}
          bend={1}
          textColor="#c4c7c7"
          borderRadius={0.06}
          scrollSpeed={2.6}
          scrollEase={0.08}
          font="bold 24px JetBrains Mono"
          planeWidth={900}
          planeHeight={640}
          onClick={handleItemClick}
        />
      </div>

      {/* Detail Overlay */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(10, 12, 14, 0.85)', backdropFilter: 'blur(8px)' }}
          onClick={closeOverlay}
        >
          <div
            className="relative max-w-lg w-full mx-4"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--outline-variant)',
              padding: '0',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Image */}
            <div style={{ overflow: 'hidden' }}>
              <img
                src={selected.image}
                alt={selected.title}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                  filter: 'saturate(0.9) brightness(0.95)',
                }}
              />
            </div>

            {/* Content */}
            <div className="px-5 py-6 sm:px-8 sm:py-7">
              <span
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '10px',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--secondary)',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                {selected.category}
              </span>

              <h3
                style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '24px',
                  fontWeight: 700,
                  color: 'var(--on-surface)',
                  lineHeight: 1.25,
                  marginBottom: '12px',
                }}
              >
                {selected.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '15px',
                  color: 'var(--on-surface-variant)',
                  marginBottom: '8px',
                }}
              >
                {selected.issuer}
              </p>

              <p
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '11px',
                  color: 'var(--outline)',
                  letterSpacing: '0.05em',
                  marginBottom: '28px',
                }}
              >
                Issued {selected.issuedDate}
              </p>

              <div
                className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0"
                style={{
                  borderTop: '1px solid var(--outline-variant)',
                  paddingTop: '20px',
                }}
              >
                <button
                  onClick={closeOverlay}
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '11px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--outline)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                  }}
                >
                  Close
                </button>
                <a
                  href={selected.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '11px',
                    fontWeight: 500,
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--secondary)',
                    textDecoration: 'none',
                    background: 'rgba(242,100,15,0.08)',
                    padding: '12px 24px',
                    border: 'none',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(242,100,15,0.15)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(242,100,15,0.08)'; }}
                >
                  Verify Credential &rarr;
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
