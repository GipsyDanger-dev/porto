import { useState, useCallback, useMemo } from "react";
import { GsapReveal } from "../GsapReveal";
import sertif1Img from "../../pct/sertif/Sertif1.webp";
import sertif2Img from "../../pct/sertif/sertif2.webp";
import sertif3Img from "../../pct/sertif/Sertif3.webp";
import sertif4Img from "../../pct/sertif/Sertif4.webp";
import sertif5Img from "../../pct/sertif/Sertif5.webp";
import sertif6Img from "../../pct/sertif/Sertif6.webp";
import sertif7Img from "../../pct/sertif/Sertif7.webp";
import sertif8Img from "../../pct/sertif/Sertif8.webp";
import sertif9Img from "../../pct/sertif/Sertif9.webp";
import sertif10Img from "../../pct/sertif/Sertif10.webp";
import sertif11Img from "../../pct/sertif/Sertif11.webp";
import sertif12Img from "../../pct/sertif/Sertif12.webp";
import sertif13Img from "../../pct/sertif/Sertif13.webp";
import sertif14Img from "../../pct/sertif/Sertif14.webp";
import sertif15Img from "../../pct/sertif/Sertif15.webp";
import sertif16Img from "../../pct/sertif/Sertif16.webp";
import sertif17Img from "../../pct/sertif/Sertif17.webp";
import sertif18Img from "../../pct/sertif/Sertif18.webp";
import sertif19Img from "../../pct/sertif/Sertif19.webp";

const certifications = [
  { title: "Learn Power BI Data Modeling with DAX", issuer: "Simplilearn SkillUp", issuedDate: "23rd April 2026", credentialUrl: "https://simpli-web.app.link/e/su0diV4wT2b", image: sertif1Img, category: "Data" },
  { title: "Innovating with Google Cloud AI", issuer: "Simplilearn SkillUp (Google Cloud)", issuedDate: "21st April 2026", credentialUrl: "https://simpli-web.app.link/e/kBH5eFLrT2b", image: sertif2Img, category: "AI" },
  { title: "Dive Deeper into GA4 Data and Reports", issuer: "Skillshop", issuedDate: "20th April 2026", credentialUrl: "https://www.credential.net/91b4ee1f-055f-4837-b66b-de64328ef20e", image: sertif3Img, category: "Analytics" },
  { title: "Belajar Penerapan Data Science dengan Microsoft Fabric", issuer: "Dicoding Indonesia", issuedDate: "20th May 2026", credentialUrl: "https://www.dicoding.com/certificates/JMZVOLOJNXN9", image: sertif4Img, category: "Data Science" },
  { title: "Introduction to Artificial Intelligence", issuer: "IBM SkillsBuild", issuedDate: "20th May 2026", credentialUrl: "https://skills.yourlearning.ibm.com/certificate/share/1ace2f45b6ewogICJvYmplY3RJZCIgOiAiQUxNLUNPVVJTRV80MDU4OTE4IiwKICAibGVhcm5lckNOVU0iIDogIjc2NjExMjVSRUciLAogICJvYmplY3RUeXBlIiA6ICJBQ1RJVklUWSIKfQ0ef9d5fa08-10", image: sertif5Img, category: "AI" },
  { title: "AI Ethics", issuer: "IBM SkillsBuild", issuedDate: "24th May 2026", credentialUrl: "https://skills.yourlearning.ibm.com/certificate/share/0f14650bd7ewogICJsZWFybmVyQ05VTSIgOiAiNzY2MTEyNVJFRyIsCiAgIm9iamVjdFR5cGUiIDogIkFDVElWSVRZIiwKICAib2JqZWN0SWQiIDogIkFMTS1DT1VSU0VfNDA1ODkyNyIKfQ3a9df93d8e-10", image: sertif6Img, category: "AI" },
  { title: "Introduction to Generative AI", issuer: "IBM SkillsBuild", issuedDate: "24th May 2026", credentialUrl: "https://skills.yourlearning.ibm.com/certificate/share/23925c9565ewogICJvYmplY3RUeXBlIiA6ICJBQ1RJVklUWSIsCiAgImxlYXJuZXJDTlVNIiA6ICI3NjYxMTI1UkVHIiwKICAib2JqZWN0SWQiIDogIkFMTS1DT1VSU0VfNDA1ODg1OSIKfQ3395ddce87-10", image: sertif7Img, category: "AI" },
  { title: "Membangun Aplikasi Gen AI dengan Microsoft Azure", issuer: "Dicoding Indonesia", issuedDate: "24th May 2026", credentialUrl: "https://www.dicoding.com/certificates/NVP7N3YRGZR0", image: sertif8Img, category: "Cloud / AI" },
  { title: "Microsoft Office Desktop Application", issuer: "Trust Training Partners", issuedDate: "10th October 2024", credentialUrl: null, image: sertif9Img, category: "Office Productivity" },
  { title: "AI Praktis untuk Produktivitas", issuer: "Dicoding Indonesia", issuedDate: "28th May 2026", credentialUrl: "https://www.dicoding.com/certificates/L4PQ9YK9OPO1", image: sertif10Img, category: "AI" },
  { title: "Memulai Pemrograman dengan Python", issuer: "Dicoding Indonesia", issuedDate: "28th May 2026", credentialUrl: "https://www.dicoding.com/certificates/JMZVOOW23XN9", image: sertif11Img, category: "Programming" },
  { title: "Belajar Machine Learning untuk Pemula", issuer: "Dicoding Indonesia", issuedDate: "28th May 2026", credentialUrl: "https://www.dicoding.com/certificates/JMZVOOK13XN9", image: sertif12Img, category: "Machine Learning" },
  { title: "Belajar Dasar AI", issuer: "Dicoding Indonesia", issuedDate: "28th May 2026", credentialUrl: "https://www.dicoding.com/certificates/1OP8RVKYVZQK", image: sertif13Img, category: "AI" },
  { title: "Belajar Strategi Pengembangan Diri", issuer: "Dicoding Indonesia", issuedDate: "6th June 2026", credentialUrl: "https://www.dicoding.com/certificates/MEPJOG3KWZ3V", image: sertif14Img, category: "Personal Development" },
  { title: "Belajar Fundamental Pemrosesan Data", issuer: "Dicoding Indonesia", issuedDate: "6th June 2026", credentialUrl: "https://www.dicoding.com/certificates/4EXG1GOJDPRL", image: sertif15Img, category: "Data Science" },
  { title: "Belajar Dasar Cloud dan Gen AI di AWS", issuer: "Dicoding Indonesia", issuedDate: "6th June 2026", credentialUrl: "https://www.dicoding.com/certificates/N9ZONJQQ6XG5", image: sertif16Img, category: "Cloud / AI" },
  { title: "Introduction to Financial Literacy", issuer: "Dicoding Indonesia", issuedDate: "28th May 2026", credentialUrl: "https://www.dicoding.com/certificates/81P2O6REYZOY", image: sertif17Img, category: "Finance" },
  { title: "Spec-Driven Development dengan Kiro", issuer: "Dicoding Indonesia", issuedDate: "6th June 2026", credentialUrl: "https://www.dicoding.com/certificates/N9ZONJL16XG5", image: sertif18Img, category: "Software Engineering" },
  { title: "Belajar Penggunaan Generative AI", issuer: "Dicoding Indonesia", issuedDate: "28th May 2026", credentialUrl: "https://www.dicoding.com/certificates/ERZRLDOR2ZYV", image: sertif19Img, category: "AI" },
];

const FILTER_TABS = ["All", "AI", "Data", "Cloud", "Programming", "Other"];

function getFilterCategory(cert) {
  const cat = cert.category.toLowerCase();
  if (cat.includes("ai") || cat.includes("machine learning") || cat.includes("generative")) return "AI";
  if (cat.includes("data")) return "Data";
  if (cat.includes("cloud")) return "Cloud";
  if (cat.includes("programming")) return "Programming";
  return "Other";
}

const mono = { fontFamily: 'var(--mono)', letterSpacing: '0.08em', textTransform: 'uppercase' };
const mono10 = { ...mono, fontSize: '10px' };
const mono11 = { ...mono, fontSize: '11px' };

const CertCard = ({ cert, onClick }) => (
  <div
    onClick={() => onClick(cert)}
    style={{ background: 'var(--bg)', padding: '36px 28px', display: 'flex', flexDirection: 'column', cursor: 'pointer', transition: 'background 0.25s' }}
    onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface)'; }}
    onMouseLeave={e => { e.currentTarget.style.background = 'var(--bg)'; }}
  >
    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '24px', aspectRatio: '4/3', background: 'var(--surface-high)' }}>
      <img
        src={cert.image}
        alt={cert.title}
        loading="lazy"
        width={400}
        height={300}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', filter: 'saturate(0.6) brightness(0.82)', transition: 'filter 0.4s ease' }}
        onMouseEnter={e => { e.currentTarget.style.filter = 'saturate(0.8) brightness(0.9)'; }}
        onMouseLeave={e => { e.currentTarget.style.filter = 'saturate(0.6) brightness(0.82)'; }}
      />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at center, transparent 45%, rgba(16,20,23,0.4) 100%)' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(to bottom, transparent 50%, rgba(16,20,23,0.35) 100%)' }} />
    </div>
    <div style={{ ...mono10, color: 'var(--secondary)', marginBottom: '12px', fontWeight: 500, letterSpacing: '0.12em' }}>{cert.category}</div>
    <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 700, lineHeight: '24px', color: 'var(--on-surface)', marginBottom: 'auto', paddingBottom: '24px' }}>{cert.title}</div>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--outline-variant)', paddingTop: '18px' }}>
      <div style={{ ...mono, fontSize: '10px', letterSpacing: '0.05em', color: 'var(--outline)' }}>{cert.issuedDate}</div>
      {cert.credentialUrl && <span style={{ ...mono11, color: 'var(--secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>Verify &rarr;</span>}
    </div>
  </div>
);

const CertRow = ({ cert, onClick }) => (
  <div
    onClick={() => onClick(cert)}
    style={{ display: 'grid', gridTemplateColumns: '3fr 1.5fr 1.2fr 1fr', alignItems: 'center', borderBottom: '1px solid var(--outline-variant)', padding: '28px 0', gap: '24px', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}
    className="cert-row-wrap"
    onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface)'; }}
    onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
  >
    <div>
      <div style={{ ...mono10, color: 'var(--secondary)', marginBottom: '8px', fontWeight: 500, letterSpacing: '0.1em' }}>{cert.category}</div>
      <div style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 700, lineHeight: 1.2, color: 'var(--on-surface)', letterSpacing: '-0.01em' }}>{cert.title}</div>
    </div>
    <div>
      <div style={{ ...mono, fontSize: '10px', color: 'var(--outline)', marginBottom: '6px' }}>Issuer</div>
      <div style={{ fontSize: '14px', color: 'var(--on-surface-variant)' }}>{cert.issuer}</div>
    </div>
    <div>
      <div style={{ ...mono, fontSize: '12px', letterSpacing: '0.05em', color: 'var(--on-surface-variant)' }}>{cert.issuedDate}</div>
    </div>
    <div style={{ textAlign: 'right' }}>
      {cert.credentialUrl ? (
        <span style={{ ...mono11, color: 'var(--secondary)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>Verify &rarr;</span>
      ) : (
        <span style={{ ...mono, fontSize: '10px', color: 'var(--outline)' }}>No. 24UBC10106040</span>
      )}
    </div>
  </div>
);

export const Certification = () => {
  const [selected, setSelected] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = useMemo(() => {
    if (activeFilter === "All") return certifications;
    return certifications.filter(c => getFilterCategory(c) === activeFilter);
  }, [activeFilter]);

  const featured = filtered.slice(0, 3);
  const remaining = filtered.slice(3);

  const categoryCounts = useMemo(() => {
    const counts = { All: certifications.length };
    FILTER_TABS.slice(1).forEach(tab => {
      counts[tab] = certifications.filter(c => getFilterCategory(c) === tab).length;
    });
    return counts;
  }, []);

  const closeOverlay = useCallback(() => setSelected(null), []);

  return (
    <section id="certifications" style={{ padding: 'var(--section-gap) 0' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        {/* Header */}
        <GsapReveal>
          <div className="certs-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--outline-variant)', paddingBottom: '40px', marginBottom: 0 }}>
            <div>
              <div className="section-label">Credentials</div>
              <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 700, letterSpacing: '-0.015em', color: 'var(--on-surface)' }}>
                Certifications<em style={{ fontStyle: 'italic', color: 'var(--on-surface-variant)' }}>.</em>
              </h2>
            </div>
            <p className="hidden md:block" style={{ maxWidth: '260px', fontSize: '14px', lineHeight: '23px', color: 'var(--on-surface-variant)', textAlign: 'right' }}>
              Verified credentials across data science, AI, cloud, and analytics.
            </p>
          </div>
        </GsapReveal>

        {/* Filter Tabs */}
        <GsapReveal delay={0.1}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 0 32px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', gap: 0, border: '1px solid var(--outline-variant)', width: 'fit-content' }}>
              {FILTER_TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  style={{
                    ...mono10,
                    color: activeFilter === tab ? 'var(--secondary)' : 'var(--outline)',
                    background: activeFilter === tab ? 'var(--surface)' : 'transparent',
                    border: 'none',
                    borderRight: '1px solid var(--outline-variant)',
                    padding: '10px 18px',
                    cursor: 'pointer',
                    transition: 'color 0.2s, background 0.2s',
                  }}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span style={{ ...mono10, color: 'var(--outline)' }}>{filtered.length} credentials</span>
          </div>
        </GsapReveal>

        {/* Featured Cards (top 3) */}
        <GsapReveal delay={0.1}>
          <div
            className="grid gap-px"
            style={{ background: 'var(--outline-variant)', border: '1px solid var(--outline-variant)', marginBottom: '1px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
          >
            {featured.map((cert, i) => (
              <CertCard key={i} cert={cert} onClick={setSelected} />
            ))}
          </div>
        </GsapReveal>

        {/* Table List (remaining) */}
        <GsapReveal delay={0.2}>
          <div>
            {remaining.map((cert, i) => (
              <CertRow key={i} cert={cert} onClick={setSelected} />
            ))}
          </div>
        </GsapReveal>
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
            style={{ background: 'var(--surface)', border: '1px solid var(--outline-variant)' }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ overflow: 'hidden' }}>
              <img src={selected.image} alt={selected.title} style={{ width: '100%', height: 'auto', display: 'block', filter: 'saturate(0.9) brightness(0.95)' }} />
            </div>
            <div className="px-5 py-6 sm:px-8 sm:py-7">
              <span style={{ ...mono10, fontWeight: 500, letterSpacing: '0.1em', color: 'var(--secondary)', display: 'block', marginBottom: '12px' }}>{selected.category}</span>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 700, color: 'var(--on-surface)', lineHeight: 1.25, marginBottom: '12px' }}>{selected.title}</h3>
              <p style={{ fontSize: '15px', color: 'var(--on-surface-variant)', marginBottom: '8px' }}>{selected.issuer}</p>
              <p style={{ ...mono, fontSize: '11px', color: 'var(--outline)', letterSpacing: '0.05em', marginBottom: '28px' }}>Issued {selected.issuedDate}</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0" style={{ borderTop: '1px solid var(--outline-variant)', paddingTop: '20px' }}>
                <button onClick={closeOverlay} style={{ ...mono11, color: 'var(--outline)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>Close</button>
                {selected.credentialUrl && (
                  <a href={selected.credentialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2" style={{ ...mono11, fontWeight: 500, color: 'var(--secondary)', textDecoration: 'none', background: 'rgba(242,100,15,0.08)', padding: '12px 24px', border: 'none', transition: 'background 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(242,100,15,0.15)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(242,100,15,0.08)'; }}
                  >
                    Verify Credential &rarr;
                  </a>
                )}
                {!selected.credentialUrl && (
                  <span style={{ ...mono10, color: 'var(--outline)', padding: '12px 24px' }}>Certificate No. 24UBC10106040</span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .cert-row-wrap { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
    </section>
  );
};
