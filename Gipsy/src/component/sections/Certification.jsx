import { RevealOnScroll } from "../RevealOnScroll";
import { FaAward, FaExternalLinkAlt } from "react-icons/fa";

const certifications = [
  {
    title: "Contoh Sertifikasi 1",
    issuer: "Nama Lembaga/Penyelenggara",
    issuedDate: "Jan 2026",
    certificateNumber: "CERT-XXXX-0001",
    credentialUrl: "",
    imageUrl: "",
    description:
      "Tulis deskripsi singkat tentang materi atau kompetensi dari sertifikasi ini.",
  },
  {
    title: "Contoh Sertifikasi 2",
    issuer: "Nama Lembaga/Penyelenggara",
    issuedDate: "Feb 2026",
    certificateNumber: "CERT-XXXX-0002",
    credentialUrl: "",
    imageUrl: "",
    description:
      "Kamu bisa isi detail tambahan seperti level, durasi, atau ruang lingkup kompetensi.",
  },
];

export const Certification = () => {
  return (
    <section id="certifications" className="py-20">
      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 bg-linear-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent text-center">
            Certifications
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certifications.map((item, index) => (
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
                  <h3 className="text-xl font-semibold text-white mb-2">{item.title}</h3>
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
                    <span className="inline-block text-sm text-gray-500">Link kredensial belum ditambahkan</span>
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
