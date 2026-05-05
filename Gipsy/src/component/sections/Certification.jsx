import { RevealOnScroll } from "../RevealOnScroll";
import { FaAward, FaExternalLinkAlt } from "react-icons/fa";
import sertif1Img from "../../pct/sertif/Sertif1.jpg";
import sertif2Img from "../../pct/sertif/sertif2.jpg";

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
      "Certificate of Completion untuk pembelajaran data modeling Power BI dengan DAX, terverifikasi oleh Simplilearn SkillUp.",
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
      "Declaration of Completion untuk kursus online Innovating with Google Cloud AI dari Simplilearn SkillUp, didukung Google Cloud.",
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
                        <p className="text-sm">Tambahkan gambar sertifikatmu di field imageUrl</p>
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
                      <span className="text-gray-400">Penerbit:</span> {item.issuer}
                    </p>
                    <p>
                      <span className="text-gray-400">Tanggal Terbit:</span> {item.issuedDate}
                    </p>
                    <p>
                      <span className="text-gray-400">Nomor Sertifikat:</span> {item.certificateNumber}
                    </p>
                  </div>

                  {item.credentialUrl ? (
                    <a
                      href={item.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300"
                    >
                      Lihat Kredensial
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  ) : (
                    <span className="inline-block text-sm text-gray-500">Link verifikasi belum tersedia</span>
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
