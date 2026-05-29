import { useEffect } from "react";

export const Navbar = ({ menuOpen, setMenuOpen }) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const links = [
    { href: "#projects", label: "Projects" },
    { href: "#about", label: "About" },
    { href: "#certifications", label: "Certs" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      className="fixed top-0 w-full z-40"
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: 'rgba(16, 20, 23, 0.75)',
        borderBottom: '1px solid rgba(68, 71, 72, 0.5)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex justify-between items-center h-16">
          <a
            href="#home"
            style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 700, color: 'var(--on-surface)' }}
          >
            Gipsy<span style={{ color: 'var(--secondary)' }}>.Dev</span>
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(prev => !prev)}
            className="md:hidden flex flex-col gap-1.5 cursor-pointer bg-transparent border-none p-2"
            aria-label="Toggle menu"
          >
            <span className="block w-6 h-px" style={{ background: 'var(--on-surface)' }} />
            <span className="block w-6 h-px" style={{ background: 'var(--on-surface)' }} />
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                style={{
                  fontFamily: 'var(--mono)',
                  fontSize: '11px',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: 'var(--on-surface-variant)',
                  textDecoration: 'none',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--secondary)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--on-surface-variant)'; }}
              >
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary"
              style={{ padding: '10px 20px', fontSize: '10px' }}
            >
              Connect
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
