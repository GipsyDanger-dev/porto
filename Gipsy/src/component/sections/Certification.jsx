import { RevealOnScroll } from "../RevealOnScroll";
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

export const Certification = () => {
  return (
    <section id="certifications" style={{ padding: 'var(--section-gap) 0' }}>
      <RevealOnScroll>
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="section-label">Credentials</div>
          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(36px, 5vw, 52px)',
              fontWeight: 700,
              letterSpacing: '-0.015em',
              color: 'var(--on-surface)',
              marginBottom: '64px',
            }}
          >
            Certifications<em style={{ fontStyle: 'italic', color: 'var(--on-surface-variant)' }}>.</em>
          </h2>

          <div
            className="grid"
            style={{
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '20px',
            }}
          >
            {certifications.map((cert, index) => (
              <a
                key={index}
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block group transition-all duration-500"
                style={{
                  background: 'linear-gradient(135deg, rgba(28,32,36,0.6), rgba(16,20,23,0.9))',
                  padding: '24px',
                  textDecoration: 'none',
                  boxShadow: '0 2px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.35), 0 0 0 1px rgba(242,100,15,0.06), inset 0 1px 0 rgba(255,255,255,0.04)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.boxShadow = '0 2px 16px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.02)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Certificate image */}
                <div
                  className="overflow-hidden mb-5"
                  style={{
                    boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)',
                  }}
                >
                  <img
                    src={cert.imageUrl}
                    alt={cert.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  />
                </div>

                <span
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--secondary)',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  {cert.category}
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--on-surface)',
                    marginBottom: '12px',
                    lineHeight: 1.3,
                  }}
                >
                  {cert.title}
                </h3>

                <div className="flex items-center justify-between mt-auto">
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
                    Verify &rarr;
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
