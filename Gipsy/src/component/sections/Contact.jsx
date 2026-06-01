import { useEffect, useRef, useState } from "react";
import { GsapReveal } from "../GsapReveal";
import emailjs from "@emailjs/browser";
import gsap from "gsap";

const COOLDOWN_SECONDS = 15;
const MESSAGE_MIN_LENGTH = 10;
const COOLDOWN_STORAGE_KEY = "contact_last_sent_at";

const MetaIcon = ({ children, accent }) => {
  const svgRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('path, circle');
    if (!paths) return;

    paths.forEach(path => {
      const length = path.getTotalLength?.() || 0;
      if (length > 0) {
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      }
    });

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          paths.forEach((path, i) => {
            const length = path.getTotalLength?.() || 0;
            if (length > 0) {
              gsap.to(path, { strokeDashoffset: 0, duration: 1.2, delay: i * 0.2, ease: "power2.out" });
            }
          });
          // Subtle pulse on the container
          gsap.to(containerRef.current, {
            scale: 1.05,
            duration: 0.6,
            delay: 0.5,
            ease: "power2.out",
            yoyo: true,
            repeat: 1,
          });
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
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

const SocialLink = ({ label, href }) => {
  const arrowRef = useRef(null);

  useEffect(() => {
    // Subtle float animation on the arrow
    gsap.to(arrowRef.current, {
      y: -1,
      duration: 1.5,
      ease: "power1.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group/social flex items-center gap-1.5 transition-colors duration-200"
      style={{
        fontFamily: 'var(--mono)',
        fontSize: '10px',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--outline)',
        textDecoration: 'none',
      }}
      onMouseEnter={e => { e.currentTarget.style.color = 'var(--on-surface)'; }}
      onMouseLeave={e => { e.currentTarget.style.color = 'var(--outline)'; }}
    >
      {label}
      <span
        ref={arrowRef}
        className="inline-block transition-transform duration-200 group-hover/social:translate-x-0.5 group-hover/social:-translate-y-0.5"
      >
        &#8599;
      </span>
    </a>
  );
};

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
    borderBottom: '1px solid var(--outline-variant)',
    color: 'var(--on-surface)',
    fontFamily: 'var(--sans)',
    fontSize: '15px',
    fontWeight: 300,
    padding: '0 0 14px 0',
    outline: 'none',
    width: '100%',
    letterSpacing: '-0.01em',
    borderRadius: 0,
    transition: 'border-color 0.25s',
  };

  const labelStyle = {
    fontFamily: 'var(--mono)',
    fontSize: '10px',
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--outline)',
    marginBottom: '12px',
    display: 'block',
    transition: 'color 0.25s',
  };

  const handleFocus = (e) => {
    e.currentTarget.style.borderBottomColor = 'var(--secondary)';
    const label = e.currentTarget.parentElement.querySelector('.field-label');
    if (label) label.style.color = 'var(--secondary)';
  };

  const handleBlur = (e) => {
    e.currentTarget.style.borderBottomColor = 'var(--outline-variant)';
    const label = e.currentTarget.parentElement.querySelector('.field-label');
    if (label) label.style.color = 'var(--outline)';
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
                <h2
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: 'clamp(40px, 6vw, 56px)',
                    fontWeight: 700,
                    lineHeight: 1.05,
                    letterSpacing: '-0.025em',
                    color: 'var(--on-surface)',
                    marginBottom: '48px',
                  }}
                >
                  Let&apos;s Build<br />
                  <em style={{ fontStyle: 'italic', color: 'var(--on-surface-variant)' }}>Something.</em>
                </h2>
              </GsapReveal>

              <GsapReveal delay={0.2}>
                <div style={{ width: '100%', height: '1px', background: 'var(--outline-variant)', marginBottom: '40px' }} />
              </GsapReveal>

              {/* Email */}
              <GsapReveal delay={0.2}>
                <div style={{ marginBottom: '32px' }}>
                  <div
                    style={{
                      fontFamily: 'var(--mono)',
                      fontSize: '10px',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--outline)',
                      marginBottom: '8px',
                    }}
                  >
                    Direct Email
                  </div>
                  <a
                    href="mailto:aryagunaadam@gmail.com"
                    className="group/email"
                    style={{
                      fontFamily: 'var(--serif)',
                      fontSize: '22px',
                      fontWeight: 700,
                      color: 'var(--on-surface)',
                      textDecoration: 'none',
                      letterSpacing: '-0.01em',
                      display: 'inline-block',
                      position: 'relative',
                      transition: 'color 0.25s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--secondary)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--on-surface)'; }}
                  >
                    aryagunaadam@gmail.com
                    <span
                      className="absolute left-0 right-0 h-px origin-left transition-transform duration-400 group-hover/email:scale-x-100"
                      style={{
                        bottom: '-2px',
                        background: 'var(--secondary)',
                        transform: 'scaleX(0)',
                      }}
                    />
                  </a>
                </div>
              </GsapReveal>

              {/* Meta info */}
              <GsapReveal delay={0.3}>
                <div className="flex flex-col gap-3" style={{ marginTop: '40px' }}>
                  <div className="flex items-center gap-3.5">
                    <MetaIcon>
                      <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                      <path d="M12 2a7 7 0 0 1 7 7c0 5.25-7 13-7 13s-7-7.75-7-13a7 7 0 0 1 7-7z" />
                    </MetaIcon>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--on-surface-variant)' }}>
                      Cilacap, Indonesia
                    </span>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <MetaIcon>
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 8v4l2.5 2.5" />
                    </MetaIcon>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--on-surface-variant)' }}>
                      GMT+7 (WIB)
                    </span>
                  </div>
                  <div className="flex items-center gap-3.5">
                    <MetaIcon accent>
                      <circle cx="12" cy="12" r="3" />
                      <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
                    </MetaIcon>
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--secondary)' }}>
                      Available for Work
                    </span>
                  </div>
                </div>
              </GsapReveal>

              {/* Social links */}
              <GsapReveal delay={0.3}>
                <div
                  className="flex gap-4"
                  style={{ marginTop: '40px', paddingTop: '40px', borderTop: '1px solid var(--outline-variant)' }}
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
                <div
                  style={{
                    fontFamily: 'var(--serif)',
                    fontSize: '20px',
                    fontWeight: 700,
                    color: 'var(--on-surface)',
                    letterSpacing: '-0.01em',
                    marginBottom: '40px',
                  }}
                >
                  Send a message.
                </div>
              </GsapReveal>

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

              <form onSubmit={handleSubmit}>
                <GsapReveal delay={0.1}>
                  <div className="grid gap-8 grid-cols-1 sm:grid-cols-2" style={{ marginBottom: '32px' }}>
                    <div className="flex flex-col">
                      <label className="field-label" htmlFor="name" style={labelStyle}>Name</label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        autoComplete="off"
                        style={fieldStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>
                    <div className="flex flex-col">
                      <label className="field-label" htmlFor="email" style={labelStyle}>Email</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        autoComplete="off"
                        style={fieldStyle}
                        onFocus={handleFocus}
                        onBlur={handleBlur}
                      />
                    </div>
                  </div>
                </GsapReveal>

                <GsapReveal delay={0.2}>
                  <div className="flex flex-col" style={{ marginBottom: '32px' }}>
                    <label className="field-label" htmlFor="subject" style={labelStyle}>Subject</label>
                    <input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Project inquiry, collaboration..."
                      style={fieldStyle}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
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
                  <div className="flex flex-col" style={{ marginBottom: '0' }}>
                    <label className="field-label" htmlFor="message" style={labelStyle}>Message</label>
                    <textarea
                      id="message"
                      required
                      minLength={MESSAGE_MIN_LENGTH}
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell me about your project, timeline, and goals..."
                      style={{ ...fieldStyle, resize: 'none', minHeight: '120px', lineHeight: '26px' }}
                      onFocus={handleFocus}
                      onBlur={handleBlur}
                    />
                  </div>
                </GsapReveal>

                <GsapReveal delay={0.3}>
                  <div
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0"
                    style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--outline-variant)' }}
                  >
                    <span style={{ fontFamily: 'var(--mono)', fontSize: '10px', letterSpacing: '0.05em', color: 'var(--outline)' }}>
                      I&apos;ll reply within 24 hours.
                    </span>
                    <button
                      type="submit"
                      disabled={isSending || isInCooldown}
                      className="group/btn flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                      style={{
                        fontFamily: 'var(--mono)',
                        fontSize: '11px',
                        fontWeight: 500,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        background: 'var(--secondary)',
                        color: '#fff',
                        border: 'none',
                        padding: '16px 36px',
                        cursor: 'pointer',
                        transition: 'opacity 0.2s, transform 0.2s',
                      }}
                      onMouseEnter={e => { e.currentTarget.style.opacity = '0.88'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      {isSending ? "Sending..." : isInCooldown ? `Wait ${cooldownLeft}s` : "Send Message"}
                      <span className="inline-block transition-transform duration-200 group-hover/btn:translate-x-1">&#8594;</span>
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
