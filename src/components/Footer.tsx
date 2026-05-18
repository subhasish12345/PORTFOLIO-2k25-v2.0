import React from 'react';
import { motion } from 'motion/react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

const socialLinks = [
  { icon: Github, href: 'https://github.com/subhasish12345', label: 'GitHub' },
  { icon: Linkedin, href: 'https://www.linkedin.com/in/subhasish-nayak-67a257280/', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:subahsishnayak38@gmail.com', label: 'Email' },
];

export default function Footer() {
  return (
    <footer className="bg-black border-t border-[#27272a]">
      <div className="max-w-6xl mx-auto px-6 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Branding */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <span className="font-mono text-white font-bold tracking-widest">SN<span className="text-[#a1a1aa]">.dev</span></span>
          <span className="text-xs text-[#52525b]">© {new Date().getFullYear()} Subhasish Nayak. All rights reserved.</span>
        </div>

        {/* Social */}
        <div className="flex items-center gap-3">
          {socialLinks.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              whileHover={{ y: -2 }}
              className="p-2 text-[#a1a1aa] hover:text-white border border-[#27272a] hover:border-[#52525b] rounded transition-all duration-200"
            >
              <social.icon className="h-4 w-4" />
            </motion.a>
          ))}
        </div>

        {/* Back to top */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="p-2 text-[#a1a1aa] hover:text-white border border-[#27272a] hover:border-[#52525b] rounded transition-all duration-200"
          aria-label="Back to top"
        >
          <ArrowUp className="h-4 w-4" />
        </button>
      </div>
    </footer>
  );
}

