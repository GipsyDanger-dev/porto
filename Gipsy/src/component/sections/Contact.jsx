import { useEffect, useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import emailjs from "@emailjs/browser";
import {
  FaCheckCircle,
  FaEnvelope,
  FaExclamationCircle,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaPaperPlane,
  FaTimes,
} from "react-icons/fa";

const COOLDOWN_SECONDS = 15;
const MESSAGE_MIN_LENGTH = 10;
const COOLDOWN_STORAGE_KEY = "contact_last_sent_at";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });

  const [isSending, setIsSending] = useState(false);
  const [cooldownLeft, setCooldownLeft] = useState(0);
  const [notice, setNotice] = useState({ type: "", message: "" });

  const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const toEmail = import.meta.env.VITE_CONTACT_TO_EMAIL;
  const toName = import.meta.env.VITE_CONTACT_TO_NAME || "Website Contact";

  const isInCooldown = cooldownLeft > 0;

  useEffect(() => {
    if (!notice.message) return;

    const timer = setTimeout(() => {
      setNotice({ type: "", message: "" });
    }, 5000);

    return () => clearTimeout(timer);
  }, [notice.message]);

  useEffect(() => {
    const rawTimestamp = window.localStorage.getItem(COOLDOWN_STORAGE_KEY);
    const lastSentAt = Number(rawTimestamp);

    if (!lastSentAt) return;

    const elapsedSeconds = Math.floor((Date.now() - lastSentAt) / 1000);
    const remaining = Math.max(0, COOLDOWN_SECONDS - elapsedSeconds);
    setCooldownLeft(remaining);
  }, []);

  useEffect(() => {
    if (cooldownLeft <= 0) return;

    const timer = setInterval(() => {
      setCooldownLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldownLeft]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!serviceId || !templateId || !publicKey || !toEmail) {
      setNotice({
        type: "error",
        message:
          "Konfigurasi email belum lengkap. Isi VITE_EMAILJS_* dan VITE_CONTACT_TO_EMAIL di file .env.",
      });
      return;
    }

    // Honeypot field: bots often fill hidden inputs.
    if (formData.website.trim()) {
      return;
    }

    if (isInCooldown) {
      setNotice({
        type: "info",
        message: `Tunggu ${cooldownLeft} detik sebelum mengirim pesan lagi.`,
      });
      return;
    }

    if (formData.message.trim().length < MESSAGE_MIN_LENGTH) {
      setNotice({
        type: "error",
        message: `Pesan minimal ${MESSAGE_MIN_LENGTH} karakter.`,
      });
      return;
    }

    setIsSending(true);

    emailjs
      .send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          to_name: toName,
          to_email: toEmail,
          from_email: formData.email,
          reply_to: formData.email,
          message: formData.message,
        },
        publicKey
      )
      .then(() => {
        setFormData({ name: "", email: "", message: "", website: "" });
        setCooldownLeft(COOLDOWN_SECONDS);
        window.localStorage.setItem(COOLDOWN_STORAGE_KEY, String(Date.now()));
        setNotice({
          type: "success",
          message:
            "Pesan berhasil dikirim. Saya akan membalas secepatnya ke email kamu.",
        });
      })
      .catch((error) => {
        console.error("EmailJS error:", error);
        setNotice({
          type: "error",
          message: `Terjadi kesalahan saat mengirim pesan. ${
            error?.text || "Silakan cek konfigurasi EmailJS Anda."
          }`,
        });
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  const noticeStyles = {
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
    error: "border-rose-500/30 bg-rose-500/10 text-rose-200",
    info: "border-sky-500/30 bg-sky-500/10 text-sky-200",
  };

  const noticeIcons = {
    success: <FaCheckCircle className="shrink-0" />,
    error: <FaExclamationCircle className="shrink-0" />,
    info: <FaInfoCircle className="shrink-0" />,
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
                  Let&apos;s Build <br />
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
              {notice.message && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`mb-6 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm leading-relaxed ${noticeStyles[notice.type] || noticeStyles.info}`}
                >
                  <div className="mt-0.5 text-base">{noticeIcons[notice.type] || noticeIcons.info}</div>
                  <p className="flex-1">{notice.message}</p>
                  <button
                    type="button"
                    onClick={() => setNotice({ type: "", message: "" })}
                    className="shrink-0 text-current/80 transition hover:text-current"
                    aria-label="Dismiss notification"
                  >
                    <FaTimes className="text-sm" />
                  </button>
                </div>
              )}

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
                  <input
                    type="text"
                    id="website"
                    name="website"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <textarea
                    id="message"
                    name="message"
                    required
                    minLength={MESSAGE_MIN_LENGTH}
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
                  disabled={isSending || isInCooldown}
                  className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all hover:-translate-y-1 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSending
                    ? "Sending..."
                    : isInCooldown
                      ? `Wait ${cooldownLeft}s`
                      : "Send Inquiry"}
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