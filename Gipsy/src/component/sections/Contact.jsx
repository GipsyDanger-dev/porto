import { useEffect, useRef, useState } from "react";
import { GsapReveal } from "../GsapReveal";
import emailjs from "@emailjs/browser";
import gsap from "gsap";

const COOLDOWN_SECONDS = 15;
const MESSAGE_MIN_LENGTH = 10;
const COOLDOWN_STORAGE_KEY = "contact_last_sent_at";

const prefersReducedMotion = typeof window !== 'undefined'
  && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const MetaIcon = ({ children, accent }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const paths = svgRef.current?.querySelectorAll('path, circle');
    if (!container || !paths) return;

    if (prefersReducedMotion) return;

    paths.forEach(path => {
      const length = path.getTotalLength?.() || 0;
      if (length > 0) {
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      }
    });

    const tweens = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          paths.forEach((path, i) => {
            const length = path.getTotalLength?.() || 0;
            if (length > 0) {
              tweens.push(gsap.to(path, { strokeDashoffset: 0, duration: 0.9, delay: i * 0.12, ease: 'power3.out' }));
            }
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(container);
    return () => {
      observer.disconnect();
      tweens.forEach(t => t.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center shrink-0"
      style={{
        width: '28px',
        height: '28px',
        border: `1px solid ${accent ? 'rgba(242,100,15,0.4)' : 'var(--outline-variant)'}`,
      }}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 24 24"
        style={{
          width: '12px',
          height: '12px',
          stroke: accent ? 'var(--secondary)' : 'var(--outline)',
          fill: 'none',
          strokeWidth: 1.5,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
        }}
      >
        {children}
      </svg>
    </div>
  );
};

const SocialLink = ({ label, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="social-link"
    style={{ fontFamily: 'var(--mono)' }}
  >
    {label}
    <span aria-hidden="true">&#8599;</span>
  </a>
);

export const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "", website: "" });
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
    setCooldownLeft(Math.max(0, COOLDOWN_SECONDS - Math.floor((Date.now() - last) / 1000)));
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
      subject: formData.subject,
      message: formData.message,
    }, publicKey)
      .then(() => {
        setFormData({ name: "", email: "", subject: "", message: "", website: "" });
        setCooldownLeft(COOLDOWN_SECONDS);
        window.localStorage.setItem(COOLDOWN_STORAGE_KEY, String(Date.now()));
        setNotice({ type: "success", message: "Message sent successfully. I'll get back to you soon." });
      })
      .catch((err) => {
        setNotice({ type: "error", message: `Failed to send. ${err?.text || "Check your EmailJS config."}` });
      })
      .finally(() => setIsSending(false));
  };

  const fieldStyle = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid var(--outline-interactive)',
    color: 'var(--on-surface)',
    fontFamily: 'var(--sans)',
    fontSize: 'var(--body)',
    fontWeight: 300,
    padding: '0 0 14px 0',
    width: '100%',
    letterSpacing: '-0.01em',
    borderRadius: 0,
  };

  return (
    <section id="contact" style={{ padding: 'var(--section-gap) 0' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-16">
        <div
          className="grid items-start"
          style={{ gridTemplateColumns: '1fr', gap: '80px' }}
        >
          {/* 2-column asymmetric layout: 5fr left (info), 7fr right (form) */}
          <div className="grid items-start lg:grid-cols-[5fr_7fr] grid-cols-1" style={{ gap: '80px' }}>
            {/* LEFT: Info */}
            <div>
              <GsapReveal>
                <div className="section-label">Get In Touch</div>
              </GsapReveal>

              <GsapReveal delay={0.1}>
                <h2 className="h2" style={{ marginBottom: 'var(--space-12)' }}>
                  Let&apos;s Build<br />
                  <em className="flourish">Something.</em>
                </h2>
              </GsapReveal>

              <GsapReveal delay={0.2}>
                <div style={{ width: '100%', height: '1px', background: 'var(--outline-variant)', marginBottom: 'var(--space-10)' }} />
              </GsapReveal>

              {/* Email */}
              <GsapReveal delay={0.2}>
                <div style={{ marginBottom: 'var(--space-8)' }}>
                  <div className="label" style={{ color: 'var(--outline)', marginBottom: 'var(--space-2)' }}>
                    Direct Email
                  </div>
                  <a href="mailto:aryagunaadam@gmail.com" className="email-link">
                    aryagunaadam@gmail.com
                  </a>
                </div>
              </GsapReveal>

              {/* Meta info */}
              <GsapReveal delay={0.3}>
                <div className="flex flex-col gap-3" style={{ marginTop: 'var(--space-10)' }}>
                  <div className="flex items-center gap-3.5">
                    <MetaIcon>
                      <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                      <path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13s-7-7.75-7-13a7 7 0 0 1 7-7z" />
                    </MetaIcon>
                    <span className="label" style={{ color: 'var(--on-surface-variant)' }}>
                      Cilacap, Indonesia
                    </span>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <MetaIcon>
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 8v4l2.5 2.5" />
                    </MetaIcon>
                    <span className="label" style={{ color: 'var(--on-surface-variant)' }}>
                      GMT+7 (WIB)
                    </span>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <MetaIcon accent>
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
                    </MetaIcon>
                    <span className="label" style={{ color: 'var(--secondary)' }}>
                      Available for Work
                    </span>
                  </div>
                </div>
              </GsapReveal>

              {/* Social links */}
              <GsapReveal delay={0.3}>
                <div
                  className="flex gap-4"
                  style={{ marginTop: 'var(--space-10)', paddingTop: 'var(--space-10)', borderTop: '1px solid var(--outline-variant)' }}
                >
                  {[
                    { label: 'GitHub', href: 'https://github.com/GipsyDanger-dev' },
                    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/adamfairuz' },
                    { label: 'Read.cv', href: '#' },
                  ].map(({ label, href }) => (
                    <SocialLink key={label} label={label} href={href} />
                  ))}
                </div>
              </GsapReveal>
            </div>

            {/* RIGHT: Form */}
            <div>
              <GsapReveal>
                <div className="h4" style={{ marginBottom: 'var(--space-10)' }}>
                  Send a message.
                </div>
              </GsapReveal>

              {notice.message && (
                <div
                  className="body mb-6 px-4 py-3"
                  role="status"
                  aria-live="polite"
                  style={{
                    border: `1px solid ${notice.type === 'success' ? '#10b981' : notice.type === 'error' ? '#ef4444' : '#3b82f6'}`,
                    background: notice.type === 'success' ? 'rgba(16,185,129,0.1)' : notice.type === 'error' ? 'rgba(239,68,68,0.1)' : 'rgba(59,130,246,0.1)',
                    color: notice.type === 'success' ? '#a7f3d0' : notice.type === 'error' ? '#fca5a5' : '#93c5fd',
                  }}
                >
                  {notice.message}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <GsapReveal delay={0.1}>
                  <div className="grid gap-8 grid-cols-1 sm:grid-cols-2" style={{ marginBottom: 'var(--space-8)' }}>
                    <div className="field">
                      <label className="field-label label" htmlFor="name">Name</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        autoComplete="name"
                        style={fieldStyle}
                      />
                    </div>
                    <div className="field">
                      <label className="field-label label" htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        autoComplete="email"
                        style={fieldStyle}
                      />
                    </div>
                  </div>
                </GsapReveal>

                <GsapReveal delay={0.2}>
                  <div className="field" style={{ marginBottom: 'var(--space-8)' }}>
                    <label className="field-label label" htmlFor="subject">Subject</label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project inquiry, collaboration..."
                      style={fieldStyle}
                    />
                  </div>
                </GsapReveal>

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

                <GsapReveal delay={0.2}>
                  <div className="field">
                    <label className="field-label label" htmlFor="message">Message</label>
                    <textarea
                      id="message"
                      required
                      minLength={MESSAGE_MIN_LENGTH}
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, timeline, and goals..."
                      style={{ ...fieldStyle, resize: 'none', minHeight: '120px', lineHeight: '26px' }}
                    />
                  </div>
                </GsapReveal>

                <GsapReveal delay={0.3}>
                  <div
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0"
                    style={{ marginTop: 'var(--space-10)', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--outline-variant)' }}
                  >
                    <span className="label" style={{ color: 'var(--outline)' }}>
                      I&apos;ll reply within 24 hours.
                    </span>
                    <button
                      type="submit"
                      disabled={isSending || isInCooldown}
                      className="btn-primary send-btn"
                    >
                      {isSending ? "Sending..." : isInCooldown ? `Wait ${cooldownLeft}s` : "Send Message"}
                      <span aria-hidden="true">&#8594;</span>
                    </button>
                  </div>
                </GsapReveal>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
