import { useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import emailjs from "@emailjs/browser";
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const serviceId = "service_yvu9jcv";
    const templateId = "template_2gjdaag";
    const publicKey = "KX1R1GJSFpWD3O97B";

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          to_name: "Adam Fairuz",
          from_email: formData.email,
          message: formData.message,
        },
        publicKey
      )
      .then(() => {
        alert("Pesan berhasil dikirim!");
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((error) => {
        console.log(error);
        alert("Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center py-20 relative overflow-hidden"
    >
      {/* Background Glow for Glassmorphism Effect */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] -z-10"></div>


      <RevealOnScroll>
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            {/* Left Column: Text & Contact Info */}
            <div className="space-y-8">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold leading-tight text-white mb-2">
                  Let's Build <br />
                  <span className="text-blue-500">Something Great.</span>
                </h2>
                <p className="text-gray-400 text-lg mt-6 leading-relaxed w-5/6">
                  Punya ide brilian atau butuh bantuan untuk proyek Anda? Saya
                  siap membantu mewujudkannya. Hubungi saya melalui form di
                  samping.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-gray-300 hover:text-blue-400 transition-colors">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
                    <FaEnvelope className="w-5 h-5" />
                  </div>
                  <span className="text-lg">aryagunaadam@gmail.com</span>
                </div>
                <div className="flex items-center space-x-4 text-gray-300 hover:text-blue-400 transition-colors">
                  <div className="w-10 h-10 bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500">
                     <FaMapMarkerAlt className="w-5 h-5" />
                  </div>
                  <span className="text-lg">Cilacap, Indonesia</span>
                </div>
              </div>
            </div>

            {/* Right Column: Form */}
            <div className="bg-white/5 backdrop-blur-xl p-8 md:p-10 rounded-2xl border border-white/10 shadow-2xl relative z-10 transition-all hover:border-white/20">
              <form className="space-y-8" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative group">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-gray-600 py-3 text-white transition focus:outline-none focus:border-blue-500 placeholder:text-gray-500"
                      placeholder="Name"
                    />
                  </div>

                  <div className="relative group">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-transparent border-b border-gray-600 py-3 text-white transition focus:outline-none focus:border-blue-500 placeholder:text-gray-500"
                      placeholder="Email Address"
                    />
                  </div>
                </div>

                <div className="relative group">
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-transparent border-b border-gray-600 py-3 text-white transition focus:outline-none focus:border-blue-500 placeholder:text-gray-500 resize-none"
                    placeholder="Your Message"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSending ? "Sending..." : "Send Inquiry"}
                  {!isSending && <FaPaperPlane className="w-4 h-4" />}
                </button>
              </form>
            </div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};