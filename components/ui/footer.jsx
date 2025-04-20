"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Github, Mail, Heart } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Privacy", href: "#" },
    { name: "Terms", href: "#" },
    { name: "Contact", href: "#" },
  ];

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="border-t border-zinc-800 bg-zinc-950"
    >
      <div className="container px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and tagline */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Vidsync</h3>
            <p className="text-sm text-zinc-400">
              Watch YouTube videos together with friends in perfect synchronization, no login required.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-zinc-400 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Connect</h4>
            <div className="flex gap-4">
              <a href="https://github.com" className="text-zinc-400 hover:text-white transition-colors">
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a href="mailto:contact@vidsync.app" className="text-zinc-400 hover:text-white transition-colors">
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-500">&copy; {currentYear} Vidsync. All rights reserved.</p>
          <p className="text-xs text-zinc-500 flex items-center gap-1">
            Made with <Heart size={12} className="text-red-500" /> by Mohammed Hamza
          </p>
        </div>
      </div>
    </motion.footer>
  );
}
