import { useEffect, useState } from "react";
import { RevealOnScroll } from "../RevealOnScroll";
import emailjs from "@emailjs/browser";

const COOLDOWN_SECONDS = 15;
const MESSAGE_MIN_LENGTH = 10;
const COOLDOWN_STORAGE_KEY = "contact_last_sent_at";

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "", website: "" });
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
    const timer = setTimeout(() => setNotice({ type: "", message: "" }), 5000);
    return () => clearTimeout(timer);
  }, [notice.message]);

  useEffect(() => {
    const raw = window.localStorage.getItem(COOLDOWN_STORAGE_KEY);
    const last = Number(raw);
    if (!last) return;
    const remaining = Math.max(0, COOLDOWN_SECONDS - Math.floor((Date.now() - last) / 1000));
    setCooldownLeft(remaining);
  }, []);

  useEffect(() => {
    if (cooldownLeft <= 0) return;
    const timer = setInterval(() => setCooldownLeft(p => (p > 0 ? p - 1 : 0)), 1000);
    return () => clearInterval(timer);
  }, [cooldownLeft]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!serviceId || !templateId || !publicKey || !toEmail) {
      setNotice({ type: "error", message: "Email configuration is incomplete." });
      return;
    }
    if (formData.website.trim()) return;
    if (isInCooldown) {
      setNotice({ type: "info", message: `Please wait ${cooldownLeft}s before sending another message.` });
      return;
    }
    if (formData.message.trim().length < MESSAGE_MIN_LENGTH) {
      setNotice({ type: "error", message: `Message must be at least ${MESSAGE_MIN_LENGTH} characters.` });
      return;
    }

    setIsSending(true);
    emailjs.send(serviceId, templateId, {
      from_name: formData.name,
      to_name: toName,
      to_email: toEmail,
      from_email: formData.email,
      reply_to: formData.email,
      message: formData.message,
    }, publicKey)
      .then(() => {
        setFormData({ name: "", email: "", message: "", website: "" });
        setCooldownLeft(COOLDOWN_SECONDS);
        window.localStorage.setItem(COOLDOWN_STORAGE_KEY, String(Date.now()));
        setNotice({ type: "success", message: "Message sent successfully. I'll get back to you soon." });
      })
      .catch((err) => {
        setNotice({ type: "error", message: `Failed to send. ${err?.text || "Check your EmailJS config."}` });
      })
      .finally(() => setIsSending(false));
  };

  return (
    <section id="contact" style={{ padding: 'var(--section-gap) 0' }}>
      <RevealOnScroll>
        <div className="max-w-4xl mx-auto px-6 md:px-16 text-center">
          <div className="section-label justify-center">
            <span style={{ display: 'block', width: '32px', height: '1px', background: 'var(--secondary)' }} />
            Get in Touch
          </div>

          <h2
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(36px, 5vw, 52px)',
              fontWeight: 700,
              letterSpacing: '-0.015em',
              color: 'var(--on-surface)',
              marginBottom: '48px',
            }}
          >
            Let&apos;s Build Something<em style={{ fontStyle: 'italic', color: 'var(--on-surface-variant)' }}>.</em>
          </h2>

          {/* Giant email link */}
          <a
            href="mailto:aryagunaadam@gmail.com"
            className="block mb-8 group"
            style={{
              fontFamily: 'var(--serif)',
              fontSize: 'clamp(32px, 6vw, 72px)',
              fontWeight: 700,
              color: 'var(--on-surface)',
              textDecoration: 'none',
              lineHeight: 1.2,
              position: 'relative',
              display: 'inline-block',
            }}
          >
            <span className="relative">
              aryagunaadam@gmail.com
              <span
                className="absolute left-0 bottom-0 w-full h-px origin-left transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: 'var(--secondary)', transform: 'scaleX(0)' }}
              />
            </span>
          </a>

          {/* Meta info */}
          <div className="flex items-center justify-center gap-8 mb-12">
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--outline)',
              }}
            >
              Cilacap, Indonesia
            </span>
            <span style={{ color: 'var(--outline-variant)' }}>&middot;</span>
            <span
              style={{
                fontFamily: 'var(--mono)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: 'var(--secondary)',
              }}
            >
              Available for Work
            </span>
          </div>

          {/* Contact form */}
          <div
            className="max-w-2xl mx-auto text-left"
            style={{ borderTop: '1px solid var(--outline-variant)', paddingTop: '48px' }}
          >
            {notice.message && (
              <div
                className="mb-6 px-4 py-3"
                style={{
                  border: `1px solid ${notice.type === 'success' ? '#10b981' : notice.type === 'error' ? '#ef4444' : '#3b82f6'}`,
                  background: notice.type === 'success' ? 'rgba(16,185,129,0.1)' : notice.type === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(59,130,246,0.1)',
                  color: notice.type === 'success' ? '#a7f3d0' : notice.type === 'error' ? '#fca5a5' : '#93c5fd',
                  fontFamily: 'var(--sans)',
                  fontSize: '14px',
                }}
              >
                {notice.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--outline)',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full focus:outline-none"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid var(--outline-variant)',
                      padding: '12px 0',
                      fontFamily: 'var(--sans)',
                      fontSize: '16px',
                      color: 'var(--on-surface)',
                      borderRadius: 0,
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={e => { e.currentTarget.style.borderBottomColor = 'var(--secondary)'; }}
                    onBlur={e => { e.currentTarget.style.borderBottomColor = 'var(--outline-variant)'; }}
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '10px',
                      fontWeight: 500,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--outline)',
                      display: 'block',
                      marginBottom: '8px',
                    }}
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    className="w-full focus:outline-none"
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderBottom: '1px solid var(--outline-variant)',
                      padding: '12px 0',
                      fontFamily: 'var(--sans)',
                      fontSize: '16px',
                      color: 'var(--on-surface)',
                      borderRadius: 0,
                      transition: 'border-color 0.3s',
                    }}
                    onFocus={e => { e.currentTarget.style.borderBottomColor = 'var(--secondary)'; }}
                    onBlur={e => { e.currentTarget.style.borderBottomColor = 'var(--outline-variant)'; }}
                  />
                </div>
              </div>

              {/* Honeypot */}
              <input
                type="text"
                name="website"
                value={formData.website}
                onChange={e => setFormData({ ...formData, website: e.target.value })}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div>
                <label
                  htmlFor="message"
                  style={{
                    fontFamily: 'var(--mono)',
                    fontSize: '10px',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--outline)',
                    display: 'block',
                    marginBottom: '8px',
                  }}
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  minLength={MESSAGE_MIN_LENGTH}
                  rows={4}
                  value={formData.message}
                  onChange={e => setFormData({ ...formData, message: e.target.value })}
                  className="w-full focus:outline-none resize-none"
                  style={{
                    background: 'transparent',
                    border: 'none',
                    borderBottom: '1px solid var(--outline-variant)',
                    padding: '12px 0',
                    fontFamily: 'var(--sans)',
                    fontSize: '16px',
                    color: 'var(--on-surface)',
                    borderRadius: 0,
                    transition: 'border-color 0.3s',
                  }}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = 'var(--secondary)'; }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = 'var(--outline-variant)'; }}
                />
              </div>

              <button
                type="submit"
                disabled={isSending || isInCooldown}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSending ? "Sending..." : isInCooldown ? `Wait ${cooldownLeft}s` : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
