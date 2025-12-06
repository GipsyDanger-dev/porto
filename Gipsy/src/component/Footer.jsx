import React from "react";
import Marquee from "react-fast-marquee"; 
import { FaGithub, FaInstagram, FaWhatsapp, FaTwitter, FaDiscord } from "react-icons/fa";

// Data untuk ikon sosial media
const socialLinks = [
  { href: 'https://github.com/GipsyDanger-dev', Icon: FaGithub, name: 'GitHub' },
  { href: 'https://www.instagram.com/adamfrzz_/?hl=id', Icon: FaInstagram, name: 'Instagram' },
  { href: 'https://discordapp.com/users/747396909399801856', Icon: FaDiscord, name: 'Discord' },
  { href: 'https://x.com/AdamF184953', Icon: FaTwitter, name: 'Twitter' },
  { href: 'https://wa.me/6281229497848', Icon: FaWhatsapp, name: 'WhatsApp' },
];

const apiEndpoints = [
  "GipsyDanger-dev™",
  "GipsyDanger-dev™",
  "GipsyDanger-dev™",
  "GipsyDanger-dev™",
  "GipsyDanger-dev™",
  "GipsyDanger-dev™",
  "GipsyDanger-dev™",
  "GipsyDanger-dev™",
  "GipsyDanger-dev™",
  "GipsyDanger-dev™",
];

export const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">

      <div className="py-3 bg-gray-50 dark:bg-gray-800/50 border-y border-gray-200 dark:border-gray-700/50">
        <Marquee gradient={false} speed={50}>
          {apiEndpoints.map((api, index) => (
            <code key={index} className="text-gray-500 dark:text-gray-400 text-sm mx-8">
              {api}
            </code>
          ))}
        </Marquee>
      </div>

      <div className="mx-auto w-full max-w-screen-xl p-4 py-6">
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2025 <a href="https://github.com/GipsyDanger-dev" className="hover:underline">GipsyDanger-dev™</a>. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:justify-center sm:mt-0 space-x-5">
             {socialLinks.map(({ href, Icon, name }) => (
                 <a key={name} href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 dark:hover:text-white">
                    <Icon className="w-5 h-5" />
                    <span className="sr-only">{name}</span>
                </a>
            ))}
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;