"use client"
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'; // For the "Sexy" animations

const Navbar: React.FC = () => {
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const navLinks = [
    { name: 'Product', href: '#' },
    { name: 'AI Engine', href: '#' },
    { name: 'Showcase', href: '#' },
    { name: 'Pricing', href: '#' },
  ];

  return (
    <header className="fixed top-6 left-0 right-0 z-100 flex justify-center px-4">
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex items-center justify-between w-full max-w-5xl px-3 py-2 border rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-2xl border-white/20 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.1)]"
      >
        {/* Logo - Minimalist & Bold */}
        <div className="flex items-center gap-2 pl-4">
          <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-white dark:bg-black rotate-45" />
          </div>
          <span className="text-lg font-black tracking-tighter uppercase dark:text-white text-black">
            BT<span className="opacity-40">.</span>
          </span>
        </div>

        {/* Floating Nav Links */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onMouseEnter={() => setIsHovered(link.name)}
              onMouseLeave={() => setIsHovered(null)}
              className="relative px-5 py-2 text-sm font-medium transition-colors text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white"
            >
              {isHovered === link.name && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-full -z-10"
                  transition={{ type: 'spring', bounce: 0.3, duration: 0.6 }}
                />
              )}
              {link.name}
            </a>
          ))}
        </div>

        {/* The "Sexy" Action Button */}
        <div className="flex items-center gap-2">
          <button className="hidden sm:block px-6 py-2 text-sm font-bold text-black/80 dark:text-white/80 hover:opacity-60 transition-opacity">
            Sign In
          </button>
          <button className="relative group overflow-hidden bg-black dark:bg-white px-8 py-3 rounded-full transition-all duration-300 active:scale-95">
            <span className="relative z-10 text-xs font-black uppercase tracking-widest text-white dark:text-black group-hover:tracking-[0.2em] transition-all">
              Join the Fleet
            </span>
            {/* Shimmer Effect */}
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-500 bg-linear-to-r from-transparent via-white/20 dark:via-black/20 to-transparent" />
          </button>
        </div>
      </motion.nav>
    </header>
  );
};

export default Navbar;