import { useState, useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { GsapReveal, GsapStagger } from "../GsapReveal";

// Images served from public/sertif/ — not bundled, loaded on demand
const sertifImg = (name) => `./sertif/${name}.webp`;

const certifications = [
  { title: "Learn Power BI Data Modeling with DAX", issuer: "Simplilearn SkillUp", issuedDate: "23rd April 2026", credentialUrl: "https://simpli-web.app.link/e/su0diV4wT2b", image: sertifImg("Sertif1"), category: "Data" },
  { title: "Innovating with Google Cloud AI", issuer: "Simplilearn SkillUp (Google Cloud)", issuedDate: "21st April 2026", credentialUrl: "https://simpli-web.app.link/e/kBH5eFLrT2b", image: sertifImg("sertif2"), category: "AI" },
  { title: "Dive Deeper into GA4 Data and Reports", issuer: "Skillshop", issuedDate: "20th April 2026", credentialUrl: "https://www.credential.net/91b4ee1f-055f-4837-b66b-de64328ef20e", image: sertifImg("Sertif3"), category: "Analytics" },
  { title: "Belajar Penerapan Data Science dengan Microsoft Fabric", issuer: "Dicoding Indonesia", issuedDate: "20th May 2026", credentialUrl: "https://www.dicoding.com/certificates/JMZVOLOJNXN9", image: sertifImg("Sertif4"), category: "Data Science" },
  { title: "Introduction to Artificial Intelligence", issuer: "IBM SkillsBuild", issuedDate: "20th May 2026", credentialUrl: "https://skills.yourlearning.ibm.com/certificate/share/1ace2f45b6ewogICJvYmplY3RJZCIgOiAiQUxNLUNPVVJTRV80MDU4OTE4IiwKICAibGVhcm5lckNOVU0iIDogIjc2NjExMjVSRUciLAogICJvYmplY3RUeXBlIiA6ICJBQ1RJVklUWSIKfQ0ef9d5fa08-10", image: sertifImg("Sertif5"), category: "AI" },
  { title: "AI Ethics", issuer: "IBM SkillsBuild", issuedDate: "24th May 2026", credentialUrl: "https://skills.yourlearning.ibm.com/certificate/share/0f14650bd7ewogICJsZWFybmVyQ05VTSIgOiAiNzY2MTEyNVJFRyIsCiAgIm9iamVjdFR5cGUiIDogIkFDVElWSVRZIiwKICAib2JqZWN0SWQiIDogIkFMTS1DT1VSU0VfNDA1ODkyNyIKfQ3a9df93d8e-10", image: sertifImg("Sertif6"), category: "AI" },
  { title: "Introduction to Generative AI", issuer: "IBM SkillsBuild", issuedDate: "24th May 2026", credentialUrl: "https://skills.yourlearning.ibm.com/certificate/share/23925c9565ewogICJvYmplY3RUeXBlIiA6ICJBQ1RJVklUWSIsCiAgImxlYXJuZXJDTlVNIiA6ICI3NjYxMTI1UkVHIiwKICAib2JqZWN0SWQiIDogIkFMTS1DT1VSU0VfNDA1ODg1OSIKfQ3395ddce87-10", image: sertifImg("Sertif7"), category: "AI" },
  { title: "Membangun Aplikasi Gen AI dengan Microsoft Azure", issuer: "Dicoding Indonesia", issuedDate: "24th May 2026", credentialUrl: "https://www.dicoding.com/certificates/NVP7N3YRGZR0", image: sertifImg("Sertif8"), category: "Cloud / AI" },
  { title: "Microsoft Office Desktop Application", issuer: "Trust Training Partners", issuedDate: "10th October 2024", credentialUrl: null, image: sertifImg("Sertif9"), category: "Office Productivity" },
  { title: "AI Praktis untuk Produktivitas", issuer: "Dicoding Indonesia", issuedDate: "28th May 2026", credentialUrl: "https://www.dicoding.com/certificates/L4PQ9YK9OPO1", image: sertifImg("Sertif10"), category: "AI" },
  { title: "Memulai Pemrograman dengan Python", issuer: "Dicoding Indonesia", issuedDate: "28th May 2026", credentialUrl: "https://www.dicoding.com/certificates/JMZVOOW23XN9", image: sertifImg("Sertif11"), category: "Programming" },
  { title: "Belajar Machine Learning untuk Pemula", issuer: "Dicoding Indonesia", issuedDate: "28th May 2026", credentialUrl: "https://www.dicoding.com/certificates/JMZVOOK13XN9", image: sertifImg("Sertif12"), category: "Machine Learning" },
  { title: "Belajar Dasar AI", issuer: "Dicoding Indonesia", issuedDate: "28th May 2026", credentialUrl: "https://www.dicoding.com/certificates/1OP8RVKYVZQK", image: sertifImg("Sertif13"), category: "AI" },
  { title: "Belajar Strategi Pengembangan Diri", issuer: "Dicoding Indonesia", issuedDate: "6th June 2026", credentialUrl: "https://www.dicoding.com/certificates/MEPJOG3KWZ3V", image: sertifImg("Sertif14"), category: "Personal Development" },
  { title: "Belajar Fundamental Pemrosesan Data", issuer: "Dicoding Indonesia", issuedDate: "6th June 2026", credentialUrl: "https://www.dicoding.com/certificates/4EXG1GOJDPRL", image: sertifImg("Sertif15"), category: "Data Science" },
  { title: "Belajar Dasar Cloud dan Gen AI di AWS", issuer: "Dicoding Indonesia", issuedDate: "6th June 2026", credentialUrl: "https://www.dicoding.com/certificates/N9ZONJQQ6XG5", image: sertifImg("Sertif16"), category: "Cloud / AI" },
  { title: "Introduction to Financial Literacy", issuer: "Dicoding Indonesia", issuedDate: "28th May 2026", credentialUrl: "https://www.dicoding.com/certificates/81P2O6REYZOY", image: sertifImg("Sertif17"), category: "Finance" },
  { title: "Spec-Driven Development dengan Kiro", issuer: "Dicoding Indonesia", issuedDate: "6th June 2026", credentialUrl: "https://www.dicoding.com/certificates/N9ZONJL16XG5", image: sertifImg("Sertif18"), category: "Software Engineering" },
  { title: "Belajar Penggunaan Generative AI", issuer: "Dicoding Indonesia", issuedDate: "28th May 2026", credentialUrl: "https://www.dicoding.com/certificates/ERZRLDOR2ZYV", image: sertifImg("Sertif19"), category: "AI" },
  { title: "LLM-Based Tools and Gemini API Integration for Data Scientists", issuer: "Hacktiv8 Indonesia (Maju Bareng AI Program)", issuedDate: "26th June 2026", credentialUrl: "https://students.hacktiv8.com/certificates/17531927-319e-4b79-a21b-00e9999c50fa", image: sertifImg("Sertif20"), category: "AI" },
  { title: "Productivity with AI Bootcamp (Program Badan Ekraf Digital Talent 2026)", issuer: "Dicoding & BDT (Badan Ekraf Digital Talent)", issuedDate: "31st May 2026", credentialUrl: "https://srikandi.arsip.go.id/result-scan/tU7szXI35CHJZbxgUf4ERQ", image: sertifImg("Sertif21"), category: "AI" },
];

// Enter/Space activation for the div-as-button cards and rows.
const onActivate = (fn) => (e) => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); fn(); }
};

const CountUp = ({ target, suffix = '+', suffixStyle }) => {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const animRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // One-shot: without unobserving, the count replays every time the stat
    // scrolls back into view.
    const obs = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      obs.unobserve(e.target);
      const start = performance.now();
      const dur = 1400;
      const tick = (now) => {
        const t = Math.min((now - start) / dur, 1);
        setVal(Math.round((1 - Math.pow(1 - t, 3)) * target));
        if (t < 1) animRef.current = requestAnimationFrame(tick);
      };
      animRef.current = requestAnimationFrame(tick);
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => { obs.disconnect(); if (animRef.current) cancelAnimationFrame(animRef.current); };
  }, [target]);

  return <span ref={ref}>{val}<span style={suffixStyle ?? { color: 'var(--secondary)' }}>{suffix}</span></span>;
};

// Prev/Next were two 13-line inline blocks with mirrored hover handlers.
const PageButton = ({ onClick, disabled, children }) => (
  <button className="label page-btn" onClick={onClick} disabled={disabled}>
    {children}
  </button>
);

// Three of these existed inline, byte-identical apart from their contents.
const Stat = ({ caption, children }) => (
  <div>
    <div style={{ fontFamily: 'var(--serif)', fontSize: '44px', fontWeight: 700, letterSpacing: '-0.025em', lineHeight: 1 }}>
      {children}
    </div>
    <div className="label" style={{ color: 'var(--outline)', marginTop: 'var(--space-2)' }}>{caption}</div>
  </div>
);

const CertCard = ({ cert, onClick, large }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onClick(cert)}
      onKeyDown={onActivate(() => onClick(cert))}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        background: hover ? 'var(--surface)' : 'var(--bg)',
        padding: large ? 'var(--space-10) var(--space-8)' : 'var(--space-8) var(--space-6) var(--space-6)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: large ? 'space-between' : 'flex-start',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
        transition: 'background var(--dur-fast) var(--ease-out)',
        touchAction: 'manipulation',
        minHeight: large ? '360px' : undefined,
      }}
    >
      {/* Orange left accent */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '2px', background: 'var(--secondary)', transform: hover ? 'scaleY(1)' : 'scaleY(0)', transformOrigin: 'bottom', transition: 'transform var(--dur-slow) var(--ease-out)' }} />

      <div>
        <div className="label-xs" style={{ color: 'var(--secondary)', marginBottom: 'var(--space-3)' }}>{cert.category}</div>
        <div
          className={large ? 'h3' : 'h4'}
          style={{ color: hover ? 'var(--secondary)' : 'var(--on-surface)', transition: 'color var(--dur-base) var(--ease-out)', paddingBottom: large ? 'var(--space-6)' : 'var(--space-5)' }}
        >
          {cert.title}
        </div>
      </div>

      {!large && cert.image && (
        <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.06)', marginBottom: 'var(--space-6)', aspectRatio: '16/10', background: 'var(--surface-high)' }}>
          <img src={cert.image} alt={cert.title} loading="lazy" width={400} height={250} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block', filter: hover ? 'saturate(0.82) brightness(0.92)' : 'saturate(0.55) brightness(0.8)', transition: 'filter var(--dur-slow) var(--ease-out), transform var(--dur-slow) var(--ease-out)', transform: hover ? 'scale(1.04)' : 'scale(1)' }} />
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'linear-gradient(to bottom, transparent 50%, rgba(16,20,23,0.4) 100%)' }} />
        </div>
      )}

      {large && (
        <div style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: 'var(--body)', color: 'var(--on-surface-variant)', lineHeight: 1.7, borderLeft: '2px solid var(--secondary)', paddingLeft: 'var(--space-4)', marginBottom: 'var(--space-6)' }}>
          &quot;Committed to mastering AI fundamentals, generative AI, and practical applications across multiple platforms.&quot;
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--outline-variant)', paddingTop: 'var(--space-4)', marginTop: 'auto' }}>
        <div className="label" style={{ color: 'var(--outline)' }}>{cert.issuedDate}</div>
        {cert.credentialUrl && <span className="label verify-cue">Verify &rarr;</span>}
      </div>
    </div>
  );
};

const CertRow = ({ cert, onClick }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="cert-row"
      role="button"
      tabIndex={0}
      onClick={() => onClick(cert)}
      onKeyDown={onActivate(() => onClick(cert))}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '3fr 1.4fr 1fr 0.8fr',
        alignItems: 'center',
        gap: 'var(--space-6)',
        borderBottom: '1px solid var(--outline-variant)',
        padding: 'var(--space-6) 0',
        position: 'relative',
        cursor: 'pointer',
        touchAction: 'manipulation',
      }}
    >
      {/* Orange bottom line on hover */}
      <div style={{ position: 'absolute', bottom: '-1px', left: 0, right: 0, height: '1px', background: 'var(--secondary)', transform: hover ? 'scaleX(1)' : 'scaleX(0)', transformOrigin: 'left', transition: 'transform var(--dur-slow) var(--ease-out)' }} />

      <div>
        <div className="label-xs" style={{ color: 'var(--secondary)', marginBottom: 'var(--space-2)' }}>{cert.category}</div>
        <div className="h4" style={{ color: hover ? 'var(--secondary)' : 'var(--on-surface)', transition: 'color var(--dur-base) var(--ease-out)' }}>{cert.title}</div>
      </div>
      <div className="cert-row-meta">
        <div className="label-xs" style={{ color: 'var(--outline)', marginBottom: 'var(--space-1)' }}>Issuer</div>
        <div className="small">{cert.issuer}</div>
      </div>
      <div className="cert-row-meta label" style={{ color: 'var(--outline)' }}>{cert.issuedDate}</div>
      <div style={{ textAlign: 'right' }}>
        {cert.credentialUrl ? (
          <span className="label verify-cue">Verify &rarr;</span>
        ) : (
          <span className="label" style={{ color: 'var(--outline)' }}>No. 24UBC10106040</span>
        )}
      </div>
    </div>
  );
};

export const Certification = () => {
  const [selected, setSelected] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [fadeKey, setFadeKey] = useState(0);
  const overlayOpenTime = useRef(0);
  const aiCerts = certifications.filter(c => c.category === 'AI');
  const otherCerts = certifications.filter(c => c.category !== 'AI');
  const featured = [aiCerts[0], aiCerts[1], aiCerts[2]].filter(Boolean);
  const remaining = [...aiCerts.slice(3), ...otherCerts];

  const PER_PAGE = 5;
  const totalPages = Math.ceil(remaining.length / PER_PAGE);
  const paginatedCerts = remaining.slice(currentPage * PER_PAGE, (currentPage + 1) * PER_PAGE);

  const goToPage = useCallback((page) => {
    setCurrentPage(page);
    setFadeKey(k => k + 1);
  }, []);

  const closeOverlay = useCallback(() => {
    // Prevent closing if overlay just opened (mobile touch event bubbling)
    if (Date.now() - overlayOpenTime.current < 300) return;
    setSelected(null);
  }, []);

  // Lock body scroll when overlay is open + Escape key handler
  useEffect(() => {
    if (selected) {
      document.body.style.overflow = 'hidden';
      overlayOpenTime.current = Date.now();
      const handleEsc = (e) => { if (e.key === 'Escape') closeOverlay(); };
      window.addEventListener('keydown', handleEsc);
      return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', handleEsc); };
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [selected, closeOverlay]);

  return (
    <section id="certifications" style={{ padding: 'var(--section-gap) 0', position: 'relative' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-16" style={{ position: 'relative' }}>
        {/* Header */}
        <GsapReveal>
          <div style={{ position: 'relative', zIndex: 1, marginBottom: 'var(--header-gap)' }}>
            <div className="section-label">Credentials</div>
            <h2 className="h2" style={{ overflow: 'hidden', marginBottom: 'var(--space-10)' }}>
              Certifications<em className="flourish">.</em>
            </h2>
            <div className="flex flex-wrap gap-12" style={{ paddingTop: 'var(--space-10)', borderTop: '1px solid var(--outline-variant)' }}>
              <Stat caption="Total Credentials">
                <CountUp target={certifications.length} />
              </Stat>
              <Stat caption="AI Engineer Focus">
                <CountUp target={aiCerts.length} suffix=" AI" suffixStyle={{ fontSize: '22px', color: 'var(--outline)' }} />
              </Stat>
              {/* A year is a label, not a quantity — nothing to count toward. */}
              <Stat caption="Most Recent">2026</Stat>
            </div>
          </div>
        </GsapReveal>

        {/* Featured Grid — GsapStagger reveals each card in turn */}
        <GsapStagger
          className="grid gap-px"
          style={{ background: 'var(--outline-variant)', border: '1px solid var(--outline-variant)', marginBottom: '1px', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}
          stagger={0.08}
        >
          {featured.map((cert, i) => (
            <CertCard key={i} cert={cert} onClick={setSelected} large={i === 0} />
          ))}
        </GsapStagger>

        {/* Table Rows */}
        <GsapReveal delay={0.2}>
          <div style={{ borderTop: '1px solid var(--outline-variant)' }}>
            <div key={fadeKey} style={{ animation: 'certFadeIn 0.35s ease-out' }}>
              {paginatedCerts.map((cert, i) => (
                <CertRow key={currentPage * PER_PAGE + i} cert={cert} onClick={setSelected} />
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between" style={{ padding: 'var(--space-6) 0 var(--space-2)' }}>
                <div className="label" style={{ color: 'var(--outline)' }}>
                  {currentPage * PER_PAGE + 1}–{Math.min((currentPage + 1) * PER_PAGE, remaining.length)} of {remaining.length}
                </div>
                <div className="flex items-center gap-4">
                  <PageButton onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 0}>Prev</PageButton>

                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => goToPage(i)}
                        aria-label={`Page ${i + 1}`}
                        aria-current={i === currentPage ? 'true' : undefined}
                        style={{
                          width: i === currentPage ? '24px' : '8px',
                          height: '8px',
                          background: i === currentPage ? 'var(--secondary)' : 'var(--outline-interactive)',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'width var(--dur-base) var(--ease-out), background var(--dur-base) var(--ease-out)',
                          padding: 0,
                          touchAction: 'manipulation',
                        }}
                      />
                    ))}
                  </div>

                  <PageButton onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages - 1}>Next</PageButton>
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
              <span className="label" style={{ color: 'var(--secondary)', display: 'block', marginBottom: 'var(--space-3)' }}>{selected.category}</span>
              <h3 className="h3" style={{ marginBottom: 'var(--space-3)' }}>{selected.title}</h3>
              <p className="body" style={{ marginBottom: 'var(--space-2)' }}>{selected.issuer}</p>
              <p className="label" style={{ color: 'var(--outline)', marginBottom: 'var(--space-6)' }}>Issued {selected.issuedDate}</p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0" style={{ borderTop: '1px solid var(--outline-variant)', paddingTop: 'var(--space-5)' }}>
                <button className="label quiet-btn" onClick={closeOverlay}>Close</button>
                {selected.credentialUrl && (
                  <a href={selected.credentialUrl} target="_blank" rel="noopener noreferrer" className="label tint-btn">Verify Credential &rarr;</a>
                )}
                {!selected.credentialUrl && (
                  <span className="label" style={{ color: 'var(--outline)', padding: 'var(--space-3) var(--space-6)' }}>Certificate No. 24UBC10106040</span>
                )}
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        @media (max-width: 768px) {
          #certifications .cert-row { grid-template-columns: 1fr !important; gap: 8px !important; padding: 20px 0 !important; }
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
