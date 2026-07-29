import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp, FaTwitter, FaDiscord } from "react-icons/fa";

const socialLinks = [
  { href: "https://github.com/GipsyDanger-dev", Icon: FaGithub, name: "GitHub" },
  { href: "https://www.linkedin.com/in/adamfairuz/", Icon: FaLinkedin, name: "LinkedIn" },
  { href: "https://www.instagram.com/adamfrzz_/?hl=id", Icon: FaInstagram, name: "Instagram" },
  { href: "https://discordapp.com/users/747396909399801856", Icon: FaDiscord, name: "Discord" },
  { href: "https://x.com/AdamF184953", Icon: FaTwitter, name: "Twitter" },
  { href: "https://wa.me/6281229497848", Icon: FaWhatsapp, name: "WhatsApp" },
];

export const Footer = () => {
  const monoStyle = {
    fontFamily: 'var(--mono)',
    fontSize: '10px',
    fontWeight: 500,
    letterSpacing: '0.08em',
    color: 'var(--outline)',
  };

  return (
    <footer
      style={{
        borderTop: '1px solid var(--outline-variant)',
        padding: '32px 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="#home"
            style={{
              fontFamily: 'var(--serif)',
              fontSize: '16px',
              fontWeight: 700,
              color: 'var(--on-surface)',
              textDecoration: 'none',
            }}
          >
            Gipsy<span style={{ color: 'var(--secondary)' }}>.Dev</span>
          </a>

          {/* Copyright */}
          <span style={{ ...monoStyle, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            &copy; {new Date().getFullYear()} GipsyDanger-dev. All Rights Reserved.
          </span>

          {/* Social links */}
          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, Icon, name }) => (
              <a
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--outline)', transition: 'color 0.3s' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--on-surface)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--outline)'; }}
                aria-label={name}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
