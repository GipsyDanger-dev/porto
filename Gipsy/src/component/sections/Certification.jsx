import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
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

const mono = { fontFamily: 'var(--mono)', letterSpacing: '0.08em', textTransform: 'uppercase' };

const CountUp = ({ target, suffix = '+' }) => {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const animRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        // Cancel any running animation
        if (animRef.current) cancelAnimationFrame(animRef.current);
        const start = performance.now();
        const dur = 1400;
        const tick = (now) => {
          const t = Math.min((now - start) / dur, 1);
          setVal(Math.round((1 - Math.pow(1 - t, 3)) * target));
          if (t < 1) animRef.current = requestAnimationFrame(tick);
        };
        animRef.current = requestAnimationFrame(tick);
      } else {
        // Reset when scrolled out of view
        if (animRef.current) cancelAnimationFrame(animRef.current);
        setVal(0);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => { obs.disconnect(); if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [target]);

  return <span ref={ref}>{val}<span style={{ color: 'var(--secondary)' }}>{suffix}</span></span>;
};

const CertCard = ({ cert, onClick, large, delay = 0 }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={() => onClick(cert)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? 'var(--surface)' : 'var(--bg)',
        padding: large ? '40px 36px' : '32px 28px 28px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: large ? 'space-between' : 'flex-start',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'background 0.3s',
        touchAction: 'manipulation',
        minHeight: large ? '360px' : undefined,
      }}
    >
      {/* Orange left accent */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: 'var(--secondary)', transform: hover ? 'scaleY(1)' : 'scaleY(0)', transformOrigin: 'bottom', transition: 'transform 0.8s cubic-bezier(0.16,1,0.3,1)' }} />

      <div>
        <div style={{ ...mono, fontSize: '9px', letterSpacing: '0.12em', color: 'var(--secondary)', marginBottom: '12px', fontWeight: 500 }}>{cert.category}</div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: large ? '30px' : '18px', fontWeight: 700, lineHeight: large ? 1.15 : 1.25, color: hover ? 'var(--secondary)' : 'var(--on-surface)', transition: 'color 0.5s ease', paddingBottom: large ? '24px' : '20px' }}>{cert.title}</div>
      </div>

      {!large && cert.image && (
        <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.06)', marginBottom: '22px', aspectRatio: '16/10', background: 'var(--surface-high)' }}>
          <img src={cert.image} alt={cert.title} loading="lazy" width={400} height={250} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', filter: hover ? 'saturate(0.82) brightness(0.92)' : 'saturate(0.55) brightness(0.8)', transition: 'filter 0.8s ease, transform 0.9s cubic-bezier(0.16,1,0.3,1)', transform: hover ? 'scale(1.04)' : 'scale(1)' }} />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(ellipse at center, transparent 42%, rgba(16,20,23,0.45) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1, background: 'linear-gradient(to bottom, transparent 50%, rgba(16,20,23,0.4) 100%)' }} />
        </div>
      )}

      {large && (
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '14px', color: 'var(--on-surface-variant)', lineHeight: 1.7, borderLeft: '2px solid var(--secondary)', paddingLeft: '16px', marginBottom: '28px' }}>
          "Committed to mastering AI fundamentals, generative AI, and practical applications across multiple platforms."
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--outline-variant)', paddingTop: '16px', marginTop: 'auto' }}>
        <div style={{ ...mono, fontSize: '10px', color: 'var(--outline)' }}>{cert.issuedDate}</div>
        {cert.credentialUrl && <span style={{ ...mono, fontSize: '10px', letterSpacing: '0.08em', color: 'var(--secondary)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>Verify &rarr;</span>}
      </div>
    </div>
  );
};

const CertRow = ({ cert, onClick, delay = 0 }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="cert-row"
      onClick={() => onClick(cert)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '3fr 1.4fr 1fr 0.8fr',
        alignItems: 'center',
        gap: '24px',
        borderBottom: '1px solid var(--outline-variant)',
        padding: '24px 0',
        position: 'relative',
        cursor: 'pointer',
        touchAction: 'manipulation',
      }}
    >
      {/* Orange bottom line on hover */}
      <div style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, height: '1px', background: 'var(--secondary)', transform: hover ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform 0.7s cubic-bezier(0.16,1,0.3,1)' }} />

      <div>
        <div style={{ ...mono, fontSize: '9px', letterSpacing: '0.1em', color: 'var(--secondary)', marginBottom: '6px', fontWeight: 500 }}>{cert.category}</div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: '18px', fontWeight: 700, color: hover ? 'var(--secondary)' : 'var(--on-surface)', lineHeight: 1.2, letterSpacing: '-0.01em', transition: 'color 0.5s ease' }}>{cert.title}</div>
      </div>
      <div className="cert-row-meta">
        <div style={{ ...mono, fontSize: '9px', color: 'var(--outline)', marginBottom: '5px' }}>Issuer</div>
        <div style={{ fontSize: '13px', color: 'var(--on-surface-variant)' }}>{cert.issuer}</div>
      </div>
      <div className="cert-row-meta" style={{ ...mono, fontSize: '11px', color: 'var(--on-surface-variant)' }}>{cert.issuedDate}</div>
      <div style={{ textAlign: 'right' }}>
        {cert.credentialUrl ? (
          <span style={{ ...mono, fontSize: '10px', letterSpacing: '0.08em', color: 'var(--secondary)', display: 'inline-flex', alignItems: 'center', gap: '5px' }}>Verify &rarr;</span>
        ) : (
          <span style={{ ...mono, fontSize: '10px', color: 'var(--outline)' }}>No. 24UBC10106040</span>
        )}
      </div>
    </div>
  );
};

export const Certification = () => {
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const [featuredIdx, setFeaturedIdx] = useState(0);
  const [featuredKey, setFeaturedKey] = useState(0);
  const overlayOpenTime = useRef(0);
  const aiCerts = certifications.filter(c => c.category === 'AI');
  const otherCerts = certifications.filter(c => c.category !== 'AI');
  const remaining = [...aiCerts.slice(3), ...otherCerts];

  // Build rotating featured groups from different categories
  const featuredGroups = (() => {
    const groups = [];
    const cats = ['AI', 'Data Science', 'Cloud / AI', 'Machine Learning', 'Analytics', 'Data'];
    for (const cat of cats) {
      const group = certifications.filter(c => c.category === cat);
      if (group.length >= 3) groups.push(group.slice(0, 3));
    }
    // Fallback: if not enough full groups, use first 3 AI certs
    if (groups.length === 0) groups.push(aiCerts.slice(0, 3));
    return groups;
  })();
  const featured = featuredGroups[featuredIdx] || featuredGroups[0];

  // Auto-rotate featured every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIdx(prev => (prev + 1) % featuredGroups.length);
      setFeaturedKey(k => k + 1);
    }, 5000);
    return () => clearInterval(timer);
  }, [featuredGroups.length]);

  const PER_PAGE = 8;
  const totalPages = Math.ceil(remaining.length / PER_PAGE);
  const paginatedCerts = remaining.slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE);

  const goToPage = useCallback((page) => {
    setCurrentPage(page);
    setFadeKey(k => k + 1);
  }, []);

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
      overlayOpenTime.current = Date.now();
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  const closeOverlay = useCallback(() => {
    // Prevent closing if overlay just opened (mobile touch event bubbling)
    if (Date.now() - overlayOpenTime.current < 300) return;
    setSelected(null);
  }, []);

  return (
    <section id="certifications" style={{ padding: 'var(--section-gap) 0', position: 'relative' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-16" style={{ position: 'relative' }}>
        {/* Decorative number */}
        <div className="hidden lg:block" style={{ position: 'absolute', right: '40px', top: '-20px', fontFamily: 'var(--serif)', fontSize: '220px', fontWeight: 700, lineHeight: 1, letterSpacing: '-0.05em', color: 'transparent', WebkitTextStroke: '1px rgba(68,71,72,0.25)', pointerEvents: 'none', userSelect: 'none', zIndex: 0 }}>
          {String(certifications.length).padStart(2, '0')}
        </div>

        {/* Header */}
        <GsapReveal>
          <div style={{ position: 'relative', zIndex: 1, marginBottom: '72px' }}>
            <div className="section-label">Credentials</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1, color: 'var(--on-surface)', overflow: 'hidden', marginBottom: '40px' }}>
              Certifications<em style={{ fontStyle: 'italic', color: 'var(--on-surface-variant)' }}>.</em>
            </h2>
            <div className="flex flex-wrap gap-12 sm:gap-14" style={{ paddingTop: '40px', borderTop: '1px solid var(--outline-variant)' }}>
              <div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '44px', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1 }}><CountUp target={certifications.length} /></div>
                <div style={{ ...mono, fontSize: '10px', letterSpacing: '0.1em', color: 'var(--outline)', marginTop: '8px' }}>Total Credentials</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '44px', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1 }}>{aiCerts.length}<span style={{ fontSize: '22px', color: 'var(--outline)' }}> AI</span></div>
                <div style={{ ...mono, fontSize: '10px', letterSpacing: '0.1em', color: 'var(--outline)', marginTop: '8px' }}>AI Engineer Focus</div>
              </div>
              <div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: '44px', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1 }}>2026</div>
                <div style={{ ...mono, fontSize: '10px', letterSpacing: '0.1em', color: 'var(--outline)', marginTop: '8px' }}>Most Recent</div>
              </div>
            </div>
          </div>
        </GsapReveal>

        {/* Featured Grid */}
        <GsapReveal delay={0.1}>
          <div>
            <div key={featuredKey} className="grid gap-px" style={{ background: 'var(--outline-variant)', border: '1px solid var(--outline-variant)', marginBottom: '1px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', animation: 'certFadeIn 0.5s ease-out' }}>
              {featured.map((cert, i) => (
                <CertCard key={featuredKey + '-' + i} cert={cert} onClick={setSelected} large={i === 0} delay={i * 0.12} />
              ))}
            </div>
            {/* Rotation indicators */}
            <div className="flex items-center justify-end gap-2" style={{ padding: '12px 0' }}>
              {featuredGroups.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setFeaturedIdx(i); setFeaturedKey(k => k + 1); }}
                  style={{
                    width: i === featuredIdx ? '20px' : '8px',
                    height: '8px',
                    borderRadius: '4px',
                    background: i === featuredIdx ? 'var(--secondary)' : 'var(--outline-variant)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                    padding: 0,
                    touchAction: 'manipulation',
                  }}
                />
              ))}
            </div>
          </div>
        </GsapReveal>

        {/* Table Rows */}
        <GsapReveal delay={0.2}>
          <div style={{ borderTop: '1px solid var(--outline-variant)' }}>
            <div key={fadeKey} style={{ animation: 'certFadeIn 0.35s ease-out' }}>
              {paginatedCerts.map((cert, i) => (
                <CertRow key={currentPage * PER_PAGE + i} cert={cert} onClick={setSelected} delay={i * 0.06} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between" style={{ padding: '28px 0 8px' }}>
                <div style={{ ...mono, fontSize: '10px', color: 'var(--outline)' }}>
                  {currentPage * PER_PAGE + 1}–{Math.min((currentPage + 1) * PER_PAGE, remaining.length)} of {remaining.length}
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 0}
                    style={{
                      ...mono,
                      fontSize: '10px',
                      letterSpacing: '0.08em',
                      color: currentPage === 0 ? 'var(--surface-high)' : 'var(--on-surface)',
                      background: 'none',
                      border: '1px solid var(--outline-variant)',
                      padding: '8px 16px',
                      cursor: currentPage === 0 ? 'default' : 'pointer',
                      transition: 'all 0.25s ease',
                      opacity: currentPage === 0 ? 0.4 : 1,
                      touchAction: 'manipulation',
                    }}
                    onMouseEnter={e => { if (currentPage > 0) { e.currentTarget.style.borderColor = 'var(--secondary)'; e.currentTarget.style.color = 'var(--secondary)'; } }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--outline-variant)'; e.currentTarget.style.color = currentPage === 0 ? 'var(--surface-high)' : 'var(--on-surface)'; }}
                  >Prev</button>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => goToPage(i)}
                        style={{
                          width: i === currentPage ? '24px' : '8px',
                          height: '8px',
                          borderRadius: '4px',
                          background: i === currentPage ? 'var(--secondary)' : 'var(--outline-variant)',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.35s cubic-bezier(0.16,1,0.3,1)',
                          padding: 0,
                          touchAction: 'manipulation',
                        }}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages - 1}
                    style={{
                      ...mono,
                      fontSize: '10px',
                      letterSpacing: '0.08em',
                      color: currentPage === totalPages - 1 ? 'var(--surface-high)' : 'var(--on-surface)',
                      background: 'none',
                      border: '1px solid var(--outline-variant)',
                      padding: '8px 16px',
                      cursor: currentPage === totalPages - 1 ? 'default' : 'pointer',
                      transition: 'all 0.25s ease',
                      opacity: currentPage === totalPages - 1 ? 0.4 : 1,
                      touchAction: 'manipulation',
                    }}
                    onMouseEnter={e => { if (currentPage < totalPages - 1) { e.currentTarget.style.borderColor = 'var(--secondary)'; e.currentTarget.style.color = 'var(--secondary)'; } }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--outline-variant)'; e.currentTarget.style.color = currentPage === totalPages - 1 ? 'var(--surface-high)' : 'var(--on-surface)'; }}
                  >Next</button>
                </div>
              </div>
            )}
          </div>
        </GsapReveal>
      </div>

      {/* Detail Overlay — rendered to body via portal */}
      {selected && createPortal(
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(10, 12, 14, 0.85)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)', padding: '16px', touchAction: 'pan-y' }} onClick={closeOverlay}>
          <div className="relative max-w-lg w-full" style={{ background: 'var(--surface)', border: '1px solid var(--outline-variant)' }} onClick={e => e.stopPropagation()}>
            <div style={{ overflow: 'hidden' }}>
              <img src={selected.image} alt={selected.title} style={{ width: '100%', height: 'auto', display: 'block', filter: 'saturate(0.9) brightness(0.95)' }} />
            </div>
            <div className="px-5 py-6 sm:px-8 sm:py-7">
              <span style={{ ...mono, fontSize: '10px', fontWeight: 500, letterSpacing: '0.1em', color: 'var(--secondary)', display: 'block', marginBottom: '12px' }}>{selected.category}</span>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 700, color: 'var(--on-surface)', lineHeight: 1.25, marginBottom: '12px' }}>{selected.title}</h3>
              <p style={{ fontSize: '15px', color: 'var(--on-surface-variant)', marginBottom: '8px' }}>{selected.issuer}</p>
              <p style={{ ...mono, fontSize: '11px', color: 'var(--outline)', letterSpacing: '0.05em', marginBottom: '28px' }}>Issued {selected.issuedDate}</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0" style={{ borderTop: '1px solid var(--outline-variant)', paddingTop: '20px' }}>
                <button onClick={closeOverlay} style={{ ...mono, fontSize: '11px', color: 'var(--outline)', background: 'none', border: 'none', cursor: 'pointer', padding: 0, touchAction: 'manipulation' }}>Close</button>
                {selected.credentialUrl && (
                  <a href={selected.credentialUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2" style={{ ...mono, fontSize: '11px', fontWeight: 500, color: 'var(--secondary)', textDecoration: 'none', background: 'rgba(242,100,15,0.08)', padding: '12px 24px', border: 'none', transition: 'background 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(242,100,15,0.15)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(242,100,15,0.08)'; }}
                  >Verify Credential &rarr;</a>
                )}
                {!selected.credentialUrl && (
                  <span style={{ ...mono, fontSize: '10px', color: 'var(--outline)', padding: '12px 24px' }}>Certificate No. 24UBC10106040</span>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        @media (max-width: 768px) {
          #certifications .cert-row-wrap { grid-template-columns: 1fr !important; gap: 8px !important; }
          #certifications .cert-row { grid-template-columns: 1fr !important; gap: 6px !important; padding: 18px 0 !important; }
          #certifications .cert-row .cert-row-meta { display: none !important; }
        }
        @keyframes certFadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};
