import { GsapReveal } from "../GsapReveal";
import CircularGallery from "../CircularGallery";
import sertif1Img from "../../pct/sertif/Sertif1.jpg";
import sertif2Img from "../../pct/sertif/sertif2.jpg";
import sertif3Img from "../../pct/sertif/Sertif3.png";
import sertif4Img from "../../pct/sertif/Sertif4.png";
import sertif5Img from "../../pct/sertif/Sertif5.png";
import sertif6Img from "../../pct/sertif/Sertif6.png";
import sertif7Img from "../../pct/sertif/Sertif7.png";
import sertif8Img from "../../pct/sertif/Sertif8.png";

const galleryItems = [
  { image: sertif1Img, text: "Power BI & DAX" },
  { image: sertif2Img, text: "Google Cloud AI" },
  { image: sertif3Img, text: "GA4 Analytics" },
  { image: sertif4Img, text: "Data Science" },
  { image: sertif5Img, text: "AI Foundations" },
  { image: sertif6Img, text: "AI Ethics" },
  { image: sertif7Img, text: "Generative AI" },
  { image: sertif8Img, text: "Azure Gen AI" },
];

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
      </div>

      {/* Circular Gallery */}
      <div style={{ height: '600px', position: 'relative' }}>
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
        />
      </div>
    </section>
  );
};
