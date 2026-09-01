export const Navbar = () => {
  const links = [
    { href: "#projects", label: "Projects" },
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#certifications", label: "Certs" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <nav
      aria-label="Main"
      className="hidden md:block fixed top-0 w-full z-40"
      style={{
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        background: 'rgba(16, 20, 23, 0.75)',
        borderBottom: '1px solid var(--outline-variant)',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex justify-between items-center h-16">
          <a
            href="#home"
            className="h5"
            style={{ fontSize: '20px', textDecoration: 'none' }}
          >
            Gipsy<span style={{ color: 'var(--secondary)' }}>.Dev</span>
          </a>

          <div className="flex items-center gap-8">
            {links.map(({ href, label }) => (
              <a key={href} href={href} className="label-lg quiet-link">
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="btn-primary"
              style={{ padding: '10px 20px' }}
            >
              Connect
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};
