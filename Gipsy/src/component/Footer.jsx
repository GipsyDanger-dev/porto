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
  return (
    <footer
      style={{
        borderTop: '1px solid var(--outline-variant)',
        padding: 'var(--space-8) 0',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#home" className="h5" style={{ textDecoration: 'none' }}>
            Gipsy<span style={{ color: 'var(--secondary)' }}>.Dev</span>
          </a>

          {/* Copyright */}
          <span className="label" style={{ color: 'var(--outline)' }}>
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
                className="icon-link"
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
