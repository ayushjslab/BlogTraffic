"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Twitter, Github, Instagram, ArrowUp } from 'lucide-react';

const FinalCTA: React.FC = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="relative bg-white dark:bg-black pt-40 pb-10 overflow-hidden">
      
      {/* Massive CTA Section */}
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <h2 className="text-[15vw] md:text-[12vw] font-black tracking-tighter uppercase leading-none text-black dark:text-white mb-12">
            Ready to <br />
            <span className="text-transparent stroke-text dark:stroke-text-white">Dominate?</span>
          </h2>
          
          <button className="group relative overflow-hidden bg-black dark:bg-white text-white dark:text-black px-16 py-8 rounded-full transition-all duration-500 hover:scale-110 active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.1)]">
            <div className="relative z-10 flex items-center gap-4 text-2xl font-black uppercase italic tracking-tighter">
              Start Your Empire <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
            </div>
            {/* Liquid Background Effect on Hover */}
            <div className="absolute inset-0 bg-neutral-800 dark:bg-neutral-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>
        </motion.div>
      </div>

      {/* Sexy "Digital" Footer */}
      <div className="mt-60 border-t border-black/5 dark:border-white/5 pt-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="text-4xl font-black tracking-tighter uppercase mb-6 text-black dark:text-white">
              BlogTraffic<span className="text-black/20 dark:text-white/20">.</span>
            </div>
            <p className="text-black/40 dark:text-white/40 max-w-xs font-medium leading-relaxed">
              The world's first autonomous SEO engine. Built for those who refuse to wait for growth.
            </p>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-30">Navigation</span>
            {['Engine', 'Pricing', 'Docs', 'Affiliates'].map(link => (
              <a key={link} href="#" className="font-bold text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors">{link}</a>
            ))}
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-30">Socials</span>
            <div className="flex gap-6">
              <Twitter size={20} className="hover:opacity-50 cursor-pointer transition-opacity" />
              <Github size={20} className="hover:opacity-50 cursor-pointer transition-opacity" />
              <Instagram size={20} className="hover:opacity-50 cursor-pointer transition-opacity" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:row justify-between items-center gap-6 border-t border-black/5 dark:border-white/5 py-10 text-[10px] font-black uppercase tracking-[0.3em] text-black/30 dark:text-white/20">
          <p>© 2026 BlogTraffic AI. All Rights Reserved.</p>
          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 hover:text-black dark:hover:text-white transition-colors group"
          >
            Back to Top <ArrowUp size={14} className="group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 2px black;
        }
        .stroke-text-white {
          -webkit-text-stroke: 2px white;
        }
      `}</style>
    </footer>
  );
};

export default FinalCTA;