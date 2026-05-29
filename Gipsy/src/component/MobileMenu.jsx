export const MobileMenu = ({ menuOpen, setMenuOpen }) => {
  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#certifications", label: "Certs" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${
        menuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: 'rgba(16, 20, 23, 0.95)',
      }}
    >
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute cursor-pointer bg-transparent border-none"
        style={{ top: 'calc(1.5rem + env(safe-area-inset-top, 0px))', right: '1.5rem', color: 'var(--on-surface)', fontSize: '28px', fontFamily: 'var(--mono)' }}
        aria-label="Close menu"
      >
        &times;
      </button>

      {links.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          onClick={() => setMenuOpen(false)}
          className={`my-4 transform transition-all duration-300 ${
            menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
          style={{
            fontFamily: 'var(--mono)',
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--on-surface)',
            textDecoration: 'none',
          }}
        >
          {label}
        </a>
      ))}

      <a
        href="#contact"
        onClick={() => setMenuOpen(false)}
        className={`btn-primary mt-6 transform transition-all duration-300 ${
          menuOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        Connect
      </a>
    </div>
  );
};
