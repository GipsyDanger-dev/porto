import { RevealOnScroll } from "../RevealOnScroll";
import { FaAward, FaExternalLinkAlt } from "react-icons/fa";
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
    certificateNumber: "10145863",
    isVerified: true,
    credentialUrl: "https://simpli-web.app.link/e/su0diV4wT2b",
    imageUrl: sertif1Img,
    description:
      "Certificate of Completion for Power BI data modeling with DAX, verified by Simplilearn SkillUp.",
  },
  {
    title: "Innovating with Google Cloud AI",
    issuer: "Simplilearn SkillUp (Powered by Google Cloud)",
    issuedDate: "21st April 2026",
    certificateNumber: "10135803",
    isVerified: true,
    credentialUrl: "https://simpli-web.app.link/e/kBH5eFLrT2b",
    imageUrl: sertif2Img,
    description:
      "Declaration of Completion for the Innovating with Google Cloud AI online course from Simplilearn SkillUp, powered by Google Cloud.",
  },
  {
    title: "Dive Deeper into GA4 Data and Reports",
    issuer: "Skillshop",
    issuedDate: "20th April 2026",
    certificateNumber: "91b4ee1f-055f-4837-b66b-de64328ef20e",
    isVerified: true,
    credentialUrl: "https://www.credential.net/91b4ee1f-055f-4837-b66b-de64328ef20e",
    imageUrl: sertif3Img,
    description:
      "Course covering Google Analytics 4 reports, explorations, segments, and integrations with Google Ads.",
  },
  {
    title: "Belajar Penerapan Data Science dengan Microsoft Fabric",
    issuer: "Dicoding Indonesia",
    issuedDate: "20th May 2026",
    certificateNumber: "JMZVOLOJNXN9",
    isVerified: true,
    credentialUrl: "https://www.dicoding.com/certificates/JMZVOLOJNXN9",
    imageUrl: sertif4Img,
    description:
      "Certificate of Completion for implementing end-to-end data science processes using Microsoft Fabric, covering data exploration, ML model training, deployment, and monitoring.",
  },
  {
    title: "Introduction to Artificial Intelligence",
    issuer: "IBM SkillsBuild",
    issuedDate: "20th May 2026",
    certificateNumber: "-",
    isVerified: true,
    credentialUrl: "https://skills.yourlearning.ibm.com/certificate/share/1ace2f45b6ewogICJvYmplY3RJZCIgOiAiQUxNLUNPVVJTRV80MDU4OTE4IiwKICAibGVhcm5lckNOVU0iIDogIjc2NjExMjVSRUciLAogICJvYmplY3RUeXBlIiA6ICJBQ1RJVklUWSIKfQ0ef9d5fa08-10",
    imageUrl: sertif5Img,
    description:
      "eLearning course covering AI history, machine learning fundamentals, structured vs unstructured data, and probabilistic methods for data analysis.",
  },
  {
    title: "AI Ethics",
    issuer: "IBM SkillsBuild",
    issuedDate: "24th May 2026",
    certificateNumber: "-",
    isVerified: true,
    credentialUrl: "https://skills.yourlearning.ibm.com/certificate/share/0f14650bd7ewogICJsZWFybmVyQ05VTSIgOiAiNzY2MTEyNVJFRyIsCiAgIm9iamVjdFR5cGUiIDogIkFDVElWSVRZIiwKICAib2JqZWN0SWQiIDogIkFMTS1DT1VSU0VfNDA1ODkyNyIKfQ3a9df93d8e-10",
    imageUrl: sertif6Img,
    description:
      "eLearning course covering the five pillars of AI ethics: fairness, robustness, explainability, transparency, and privacy, with real-world examples.",
  },
  {
    title: "Introduction to Generative AI",
    issuer: "IBM SkillsBuild",
    issuedDate: "24th May 2026",
    certificateNumber: "-",
    isVerified: true,
    credentialUrl: "https://skills.yourlearning.ibm.com/certificate/share/23925c9565ewogICJvYmplY3RUeXBlIiA6ICJBQ1RJVklUWSIsCiAgImxlYXJuZXJDTlVNIiA6ICI3NjYxMTI1UkVHIiwKICAib2JqZWN0SWQiIDogIkFMTS1DT1VSU0VfNDA1ODg1OSIKfQ3395ddce87-10",
    imageUrl: sertif7Img,
    description:
      "eLearning course covering generative AI fundamentals, deep learning, foundation models, transformers, prompt engineering, and Python programming.",
  },
  {
    title: "Membangun Aplikasi Gen AI dengan Microsoft Azure",
    issuer: "Dicoding Indonesia",
    issuedDate: "24th May 2026",
    certificateNumber: "NVP7N3YRGZR0",
    isVerified: true,
    credentialUrl: "https://www.dicoding.com/certificates/NVP7N3YRGZR0",
    imageUrl: sertif8Img,
    description:
      "Intermediate course covering AI solution development on Azure, including LLM deployment, RAG implementation, fine-tuning, Prompt Flow, and Responsible AI practices.",
  },
];

const getIssuedTimestamp = (issuedDate) => {
  if (!issuedDate || issuedDate === "TBA") return null;

  const normalizedDate = issuedDate.replace(/(\d+)(st|nd|rd|th)/i, "$1");
  const parsed = Date.parse(normalizedDate);

  return Number.isNaN(parsed) ? null : parsed;
};

export const Certification = () => {
  const sortedCertifications = [...certifications].sort((a, b) => {
    const dateA = getIssuedTimestamp(a.issuedDate);
    const dateB = getIssuedTimestamp(b.issuedDate);

    if (dateA == null && dateB == null) return a.title.localeCompare(b.title);
    if (dateA == null) return 1;
    if (dateB == null) return -1;

    return dateB - dateA;
  });

  return (
    <section id="certifications" className="py-20">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Certifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {sortedCertifications.map((item, index) => (
              <article
                key={index}
                className="group rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                <div className="aspect-video w-full bg-linear-to-br from-blue-500/20 via-cyan-500/10 to-transparent border-b border-white/10">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300">
                      <div className="text-center px-4">
                        <FaAward className="mx-auto mb-3 text-2xl text-blue-400" />
                        <p className="text-sm">Add your certificate image in the imageUrl field</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    {item.isVerified && (
                      <span className="shrink-0 rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium tracking-wide text-emerald-300">
                        VERIFIED
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-300 mb-4">{item.description}</p>

                  <div className="space-y-2 text-sm text-gray-300 mb-5">
                    <p>
                      <span className="text-gray-400">Issuer:</span> {item.issuer}
                    </p>
                    <p>
                      <span className="text-gray-400">Issued:</span> {item.issuedDate}
                    </p>
                    <p>
                      <span className="text-gray-400">Certificate No:</span> {item.certificateNumber}
                    </p>
                  </div>

                  {item.credentialUrl ? (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300"
                    >
                      View Credential
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  ) : (
                    <span className="inline-block text-sm text-gray-500">Verification link not available yet</span>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
